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

const STYLE =
  'ornate fantasy tarot card illustration, single glowing subject centered, ' +
  'hyper-detailed digital painting, luminous magical light, cosmic starry background with nebula, ' +
  'intricate gold filigree accents, rich jewel tones, dramatic rim lighting, ' +
  'no text, no letters, no border, no frame, portrait 2:3'

const NEGATIVE = 'text, watermark, letters, frame, border, multiple subjects, human face, photo, blurry'

/** 주제와 배경색. 전통 상징을 그대로 쓰되 그림이 되게 한 줄로 푼다. */
const SUBJECTS: Record<string, { subject: string; palette: string }> = {
  ashwini: { subject: 'a majestic horse head with a flowing mane made of white light, galloping through sparks', palette: 'crimson red and gold on deep space' },
  bharani: { subject: 'a mystical stone gateway with a dark portal, an ember glowing in the threshold', palette: 'blood purple and bronze' },
  krittika: { subject: 'a sacred flaming blade standing upright, sparks and fire wreathing the edge', palette: 'orange fire and gold' },
  rohini: { subject: 'an ornate ox-drawn cart overflowing with fruit and grain, gilded wheels', palette: 'warm rose and amber' },
  mrigashira: { subject: 'a luminous deer head with antlers of starlight, searching through a moonlit forest', palette: 'silver green and moonlight' },
  ardra: { subject: 'a single giant crystalline teardrop with a storm swirling inside, lightning', palette: 'storm grey, electric blue' },
  punarvasu: { subject: 'a golden quiver of arrows, one arrow returning in an arc of light', palette: 'gold and soft yellow' },
  pushya: { subject: 'a fully bloomed lotus with milk-white petals, a drop of nectar glowing at the center', palette: 'cream white and honey' },
  ashlesha: { subject: 'a coiled serpent with iridescent scales, eyes glowing, guarding a hidden gem', palette: 'emerald green and black' },
  magha: { subject: 'an empty ancient royal throne of carved gold under a crown of light', palette: 'royal gold and deep crimson' },
  'purva-phalguni': { subject: 'a sunlit garden hammock draped in silk, flowers and warm sunbeams', palette: 'sunny gold and peach' },
  'uttara-phalguni': { subject: 'a gold signet ring with a glowing gem, two ribbons tied in a knot beneath', palette: 'ivory and gold' },
  hasta: { subject: 'an open palm made of light, sacred lines glowing, tools and threads floating', palette: 'jade green and gold' },
  chitra: { subject: 'a brilliant faceted gemstone floating and refracting rainbow light', palette: 'rainbow prismatic on midnight blue' },
  swati: { subject: 'a young sprout bending in a powerful wind, leaves and light streaming', palette: 'fresh green and pale sky' },
  vishakha: { subject: 'a triumphal archway wreathed in laurel, light bursting through the gate', palette: 'gold and forest green' },
  anuradha: { subject: 'a lotus on a long stem rising from calm water, fireflies around it', palette: 'deep red and warm gold' },
  jyeshtha: { subject: 'a round amulet talisman of gold and garnet, hanging from a chain, protective glow', palette: 'garnet red and gold' },
  mula: { subject: 'an ancient tree stump with vast roots reaching deep into glowing earth', palette: 'earth brown and ember orange' },
  'purva-ashadha': { subject: 'a great ornate fan spread open, waves and water spray behind it', palette: 'ocean blue and silver' },
  'uttara-ashadha': { subject: 'a single curved elephant tusk of ivory carved with gold, standing proud', palette: 'ivory and bronze' },
  shravana: { subject: 'three glowing footprints of light ascending into the sky, moonlight', palette: 'moon silver and indigo' },
  dhanishta: { subject: 'a golden ceremonial drum with cords, sound waves rippling as light', palette: 'gold and violet' },
  shatabhisha: { subject: 'a hundred tiny stars arranged in a perfect circle around an empty center, healing light', palette: 'teal and starlight' },
  'purva-bhadrapada': { subject: 'a one-legged flame figure on a funeral pyre, fire rising to the stars', palette: 'fire orange and black' },
  'uttara-bhadrapada': { subject: 'a serpent resting in deep still water, ripples of light on the surface', palette: 'deep blue and silver' },
  revati: { subject: 'two fish swimming in a circle of light, guiding stars, ocean glow', palette: 'sea green and pearl' },
}

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
