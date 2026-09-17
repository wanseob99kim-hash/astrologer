/**
 * Gemini 이미지 모델로 카드 삽화를 생성해 public/cards/<key>.webp 로 저장한다.
 *
 * 실행: npm run cards:generate            (없는 것만)
 *       npm run cards:generate -- --only ashwini,rohini
 *       npm run cards:generate -- --force  (전부 다시)
 *
 * 키는 .env.local 의 GEMINI_API_KEY. 저장소에 올라가지 않는다.
 * PNG 를 받아 python(PIL) 으로 600×900 webp 로 바꾼다 — 카드 아치가 2:3 이라 비율을 맞춘다.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { NAKSHATRAS } from '../content/index'
import { STYLE, SUBJECTS } from './card-art-spec'

const MODEL = process.env.CARD_ART_MODEL ?? 'gemini-3.1-flash-image'
const OUT_DIR = path.join(process.cwd(), 'public', 'cards')
const TMP_DIR = path.join(process.cwd(), '.cards-tmp')
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`
/** 무료 쿼터가 분당 요청 수로 걸린다. 장 사이에 쉬어 429 를 피한다. */
const PAUSE_MS = 4000
const MAX_RETRY = 3

function readKey(): string {
  const envPath = path.join(process.cwd(), '.env.local')
  if (!existsSync(envPath)) throw new Error('.env.local 이 없습니다.')
  const match = readFileSync(envPath, 'utf8').match(/GEMINI_API_KEY=\s*(\S+)/)
  if (!match?.[1]) throw new Error('.env.local 에 GEMINI_API_KEY 가 비어 있습니다.')
  return match[1]
}

function parseArgs() {
  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const onlyIndex = args.indexOf('--only')
  const only = onlyIndex !== -1 ? new Set((args[onlyIndex + 1] ?? '').split(',').filter(Boolean)) : undefined
  return { force, only }
}

interface GenerateResponse {
  candidates?: Array<{ content?: { parts?: Array<{ inlineData?: { mimeType: string; data: string }; text?: string }> } }>
  error?: { code: number; message: string }
}

async function generateOnce(key: string, prompt: string): Promise<Buffer> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: '2:3' },
      },
    }),
  })
  const json = (await response.json()) as GenerateResponse
  if (!response.ok || json.error) {
    throw new Error(`${response.status} ${json.error?.message ?? response.statusText}`)
  }
  const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)
  if (!part?.inlineData) {
    const text = json.candidates?.[0]?.content?.parts?.map((p) => p.text).filter(Boolean).join(' ')
    throw new Error(`이미지가 없음. 모델 응답: ${text ?? '(없음)'}`)
  }
  return Buffer.from(part.inlineData.data, 'base64')
}

async function generateWithRetry(key: string, prompt: string): Promise<Buffer> {
  let lastError: unknown
  for (let attempt = 1; attempt <= MAX_RETRY; attempt += 1) {
    try {
      return await generateOnce(key, prompt)
    } catch (error) {
      lastError = error
      const message = error instanceof Error ? error.message : String(error)
      const isRateLimited = message.startsWith('429')
      process.stderr.write(`    시도 ${attempt} 실패: ${message.slice(0, 160)}\n`)
      if (attempt < MAX_RETRY) await sleep(isRateLimited ? 30000 : 5000)
    }
  }
  throw lastError
}

function toWebp(pngPath: string, webpPath: string) {
  // 아치에 맞춰 2:3 으로 중앙 자르고 600×900 으로 줄인다
  const script = [
    'import sys',
    'from PIL import Image',
    'src, dst = sys.argv[1], sys.argv[2]',
    'im = Image.open(src).convert("RGB")',
    'w, h = im.size',
    'target = 2 / 3',
    'if w / h > target:',
    '    nw = int(h * target); x = (w - nw) // 2; im = im.crop((x, 0, x + nw, h))',
    'else:',
    '    nh = int(w / target); y = (h - nh) // 2; im = im.crop((0, y, w, y + nh))',
    'im = im.resize((600, 900), Image.LANCZOS)',
    'im.save(dst, "WEBP", quality=82, method=6)',
  ].join('\n')
  execFileSync('python', ['-c', script, pngPath, webpPath], { stdio: 'inherit' })
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function main() {
  const key = readKey()
  const { force, only } = parseArgs()
  mkdirSync(OUT_DIR, { recursive: true })
  mkdirSync(TMP_DIR, { recursive: true })

  const targets = NAKSHATRAS.filter((n) => {
    if (only && !only.has(n.key)) return false
    if (!force && existsSync(path.join(OUT_DIR, `${n.key}.webp`))) return false
    return true
  })
  process.stdout.write(`[cards] 모델 ${MODEL} · 생성 대상 ${targets.length}장\n`)

  let done = 0
  const failed: string[] = []
  for (const n of targets) {
    const spec = SUBJECTS[n.key]
    if (!spec) throw new Error(`주제 없음: ${n.key}`)
    const prompt = `${spec.subject}, ${spec.palette}, ${STYLE}`
    process.stdout.write(`  ${String(n.index + 1).padStart(2)}. ${n.key} (${n.archetype}) … `)
    try {
      const png = await generateWithRetry(key, prompt)
      const pngPath = path.join(TMP_DIR, `${n.key}.png`)
      writeFileSync(pngPath, png)
      toWebp(pngPath, path.join(OUT_DIR, `${n.key}.webp`))
      done += 1
      process.stdout.write('완료\n')
    } catch (error) {
      failed.push(n.key)
      process.stdout.write(`실패 — ${error instanceof Error ? error.message.slice(0, 120) : String(error)}\n`)
    }
    if (targets.indexOf(n) < targets.length - 1) await sleep(PAUSE_MS)
  }

  process.stdout.write(`\n[cards] 완료 ${done} · 실패 ${failed.length}${failed.length ? ` (${failed.join(', ')})` : ''}\n`)
  process.stdout.write('[cards] 다음: npm run cards:sync\n')
  if (failed.length > 0) process.exitCode = 1
}

main().catch((error) => {
  process.stderr.write(`[cards] ${error instanceof Error ? error.message : String(error)}\n`)
  process.exitCode = 1
})
