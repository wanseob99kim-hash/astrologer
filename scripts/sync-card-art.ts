/**
 * public/cards/ 를 훑어 content/cardArt.ts 의 목록을 다시 쓴다.
 * 실행: npm run cards:sync
 *
 * 파일명은 <나크샤트라 key>.webp 여야 한다. 모르는 이름은 경고만 하고 넘긴다.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { NAKSHATRA_GLYPH_KEYS } from '../app/components/nakshatraGlyphKeys'

const CARDS_DIR = path.join(process.cwd(), 'public', 'cards')
const TARGET = path.join(process.cwd(), 'content', 'cardArt.ts')

const known = new Set<string>(NAKSHATRA_GLYPH_KEYS)
const files = existsSync(CARDS_DIR) ? readdirSync(CARDS_DIR) : []

const found: string[] = []
for (const file of files) {
  if (!file.endsWith('.webp')) continue
  const key = file.slice(0, -'.webp'.length)
  if (!known.has(key)) {
    process.stderr.write(`[cards] 모르는 파일 건너뜀: ${file}\n`)
    continue
  }
  found.push(key)
}
found.sort((a, b) => NAKSHATRA_GLYPH_KEYS.indexOf(a as never) - NAKSHATRA_GLYPH_KEYS.indexOf(b as never))

const source = readFileSync(TARGET, 'utf8')
const start = source.indexOf('new Set<string>([')
const end = source.indexOf('])', start)
if (start === -1 || end === -1) throw new Error('cardArt.ts 형식이 예상과 다릅니다.')

const body = found.length === 0
  ? '\n  // cards:sync 가 채운다\n'
  : '\n' + found.map((key) => `  '${key}',`).join('\n') + '\n'

const next = source.slice(0, start + 'new Set<string>(['.length) + body + source.slice(end)
writeFileSync(TARGET, next)

process.stdout.write(`[cards] 삽화 ${found.length} / ${NAKSHATRA_GLYPH_KEYS.length}\n`)
if (found.length < NAKSHATRA_GLYPH_KEYS.length) {
  const missing = NAKSHATRA_GLYPH_KEYS.filter((key) => !found.includes(key))
  process.stdout.write(`[cards] 없음: ${missing.join(', ')}\n`)
}
