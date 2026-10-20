/**
 * 첫 화면 밤하늘 배경 한 장 생성 (Gemini 이미지 모델).
 *
 * 별자리 선은 그리지 않게 한다 — 실제 별 모양은 NightSky.tsx 가 SVG 로 위에 겹친다.
 * 결과: .cards-tmp/hero-sky.png → scripts/crop 없이 PIL 로 public/hero/night-sky.webp 변환.
 *
 *   npx tsx scripts/gen-hero-sky.ts
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const MODEL = process.env.CARD_ART_MODEL ?? 'gemini-3.1-flash-image'
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`
const OUT = path.join(process.cwd(), '.cards-tmp', 'hero-sky.png')

const PROMPT = [
  'A breathtaking wide panoramic night sky, digital painting, high detail.',
  'A luminous blue and violet Milky Way band sweeps diagonally across the upper sky, dense with countless tiny stars and soft nebula glow.',
  'Near the horizon, a thin band of warm orange and gold twilight glows beneath dark purple and indigo clouds lit softly from below.',
  'At the very bottom, a dark rocky foreground silhouette on both sides, and a distant valley sprinkled with tiny warm city lights.',
  'The middle and upper sky must stay mostly open and dark so that constellation lines can be drawn on top later.',
  'Do NOT draw any constellation lines, figures, symbols, text, letters, logos or watermarks. No people. No moon.',
  'Cinematic, magical, calm. Deep navy and black as the dominant colors.',
].join(' ')

function readKey(): string {
  const envPath = path.join(process.cwd(), '.env.local')
  if (!existsSync(envPath)) throw new Error('.env.local 이 없습니다.')
  const match = readFileSync(envPath, 'utf8').match(/GEMINI_API_KEY=\s*(\S+)/)
  if (!match?.[1]) throw new Error('.env.local 에 GEMINI_API_KEY 가 비어 있습니다.')
  return match[1]
}

interface GenerateResponse {
  candidates?: Array<{ content?: { parts?: Array<{ inlineData?: { mimeType: string; data: string }; text?: string }> } }>
  error?: { code: number; message: string }
}

async function main() {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': readKey() },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: PROMPT }] }],
      generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '21:9' } },
    }),
  })
  const json = (await response.json()) as GenerateResponse
  if (!response.ok || json.error) throw new Error(`${response.status} ${json.error?.message ?? response.statusText}`)
  const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)
  if (!part?.inlineData) throw new Error('이미지가 없음')
  mkdirSync(path.dirname(OUT), { recursive: true })
  writeFileSync(OUT, Buffer.from(part.inlineData.data, 'base64'))
  console.log(`저장: ${OUT}`)
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
