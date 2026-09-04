import { NAKSHATRAS, GRAHAS, KOOTAS, nakshatraByKey, grahaByMoolank } from '../content/index'
const line = (s='') => console.log(s)
const show = (key: string) => {
  const n = nakshatraByKey(key)!
  line(`━━━ ${n.archetype}  (${n.ko} · ${n.sanskrit})`)
  line(`    ${n.tagline}`)
  line(`    지배성 ${n.lord} · 신격 ${n.deityKo} · 상징 ${n.symbolKo}`)
  line(`    행운색 ${n.luckyColor} · 보석 ${n.gemstone} · 숫자 ${n.luckyNumber} · 키워드 ${n.keyword}`)
  line()
  line(`  ${n.copy}`)
  line()
  line(`  [이런 점이 강합니다]`); n.strengths.forEach(s=>line(`    · ${s}`))
  line(`  [이런 점을 조심하세요]`); n.shadows.forEach(s=>line(`    · ${s}`))
  line(`  [어울리는 일]  ${n.career.join(' / ')}`)
  line()
  line(`  연애 — ${n.love}`)
  line(`  재물 — ${n.wealth}`)
  line(`  전통 — ${n.ritual}`)
  line()
}
line('════════ 나크샤트라 결과 화면 (L1) ════════'); line()
;['rohini','ardra','ashlesha','revati'].forEach(show)
line('════════ 그라하 결과 화면 (L0) ════════'); line()
for (const m of [8, 6]) {
  const g = grahaByMoolank(m)!
  line(`━━━ ${g.ko} (${g.sanskrit}) · 물랑크 ${g.moolank} · ${g.weekday ?? '요일 없음'}`)
  line(`    ${g.color} · ${g.gemstone} · 키워드 ${g.keyword}`)
  line(); line(`  ${g.copy}`); line()
  line(`  [강점]`); g.strengths.forEach(s=>line(`    · ${s}`))
  line(`  [그림자]`); g.shadows.forEach(s=>line(`    · ${s}`))
  line()
}
line('════════ 궁합 쿠타 문구 (낮은 점수일 때) ════════'); line()
for (const k of KOOTAS) line(`  ${k.ko.padEnd(8)} (${k.maxScore}점) — ${k.low}`)
line()
line('════════ 통계 ════════')
const copyLens = NAKSHATRAS.map(n=>n.copy.length)
line(`  copy 길이  최소 ${Math.min(...copyLens)}자 / 평균 ${Math.round(copyLens.reduce((a,b)=>a+b)/27)}자 / 최대 ${Math.max(...copyLens)}자`)
line(`  아키타입   ${NAKSHATRAS.map(n=>n.archetype).join(', ')}`)
