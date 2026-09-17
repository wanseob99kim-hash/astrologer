/**
 * 27장 카드 삽화용 이미지 생성 프롬프트를 docs/card-art-prompts.md 로 뽑는다.
 * 실행: npm run cards:prompts
 *
 * 스타일은 한 문장으로 고정하고 주제·색만 바꾼다. 그래야 27장이 한 벌로 보인다.
 * 생성한 그림은 public/cards/<key>.webp 로 저장하고 npm run cards:sync.
 */
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { NAKSHATRAS } from '../content/index'

import { NEGATIVE, STYLE, SUBJECTS } from './card-art-spec'

const lines: string[] = [
  '# 카드 삽화 프롬프트 27장',
  '',
  '스타일 문장은 고정, 주제와 색만 바뀐다. 한 도구로 27장을 한 번에 뽑아야 한 벌로 보인다.',
  '',
  '- 생성 후 `public/cards/<key>.webp` 로 저장 (권장 600×900, webp 품질 80)',
  '- `npm run cards:sync` 로 목록 갱신 → 카드가 자동으로 그림을 쓴다',
  '- 부정 프롬프트(지원 시): `' + NEGATIVE + '`',
  '',
]

for (const n of NAKSHATRAS) {
  const spec = SUBJECTS[n.key]
  if (!spec) throw new Error(`주제 없음: ${n.key}`)
  lines.push(`## ${n.index + 1}. ${n.key} — ${n.archetype}`)
  lines.push('')
  lines.push('```')
  lines.push(`${spec.subject}, ${spec.palette}, ${STYLE}`)
  lines.push('```')
  lines.push('')
}

const target = path.join(process.cwd(), 'docs', 'card-art-prompts.md')
writeFileSync(target, lines.join('\n'))
process.stdout.write(`[cards] ${target}\n`)
