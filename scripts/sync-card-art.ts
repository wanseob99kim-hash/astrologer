/**
 * public/cards/ 와 public/cards-en/ 를 훑어 content/cardArt.ts 의 목록을 다시 쓴다.
 * 실행: npm run cards:sync
 *
 * 파일명은 <나크샤트라 key>.webp 여야 한다. 모르는 이름은 경고만 하고 넘긴다.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { NAKSHATRA_GLYPH_KEYS } from '../app/components/nakshatraGlyphKeys'

const TARGET = path.join(process.cwd(), 'content', 'cardArt.ts')
const known = new Set<string>(NAKSHATRA_GLYPH_KEYS)

function scan(dir: string): string[] {
  const files = existsSync(dir) ? readdirSync(dir) : []
  const found: string[] = []
  for (const file of files) {
    if (!file.endsWith('.webp')) continue
    const key = file.slice(0, -'.webp'.length)
    if (!known.has(key)) {
      process.stderr.write(`[cards] 모르는 파일 건너뜀: ${dir}/${file}\n`)
      continue
    }
    found.push(key)
  }
  return found.sort((a, b) => NAKSHATRA_GLYPH_KEYS.indexOf(a as never) - NAKSHATRA_GLYPH_KEYS.indexOf(b as never))
}

/** `export const NAME ... new Set<string>([ ... ])` 의 대괄호 안을 다시 쓴다. */
function rewrite(source: string, constName: string, keys: string[]): string {
  const anchor = source.indexOf(`export const ${constName}`)
  if (anchor === -1) throw new Error(`${constName} 를 찾지 못했습니다.`)
  const start = source.indexOf('new Set<string>([', anchor)
  const end = source.indexOf('])', start)
  if (start === -1 || end === -1) throw new Error('cardArt.ts 형식이 예상과 다릅니다.')
  const body = keys.length === 0
    ? '\n  // cards:sync 가 채운다\n'
    : '\n' + keys.map((key) => `  '${key}',`).join('\n') + '\n'
  return source.slice(0, start + 'new Set<string>(['.length) + body + source.slice(end)
}

const ko = scan(path.join(process.cwd(), 'public', 'cards'))
const en = scan(path.join(process.cwd(), 'public', 'cards-en'))

let source = readFileSync(TARGET, 'utf8')
source = rewrite(source, 'CARD_ART_KEYS', ko)
source = rewrite(source, 'CARD_ART_KEYS_EN', en)
writeFileSync(TARGET, source)

for (const [label, found] of [['ko', ko], ['en', en]] as const) {
  process.stdout.write(`[cards:${label}] ${found.length} / ${NAKSHATRA_GLYPH_KEYS.length}\n`)
  if (found.length > 0 && found.length < NAKSHATRA_GLYPH_KEYS.length) {
    const missing = NAKSHATRA_GLYPH_KEYS.filter((key) => !found.includes(key))
    process.stdout.write(`[cards:${label}] 없음: ${missing.join(', ')}\n`)
  }
}
