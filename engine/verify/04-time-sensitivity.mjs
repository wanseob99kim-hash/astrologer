/**
 * 검증 4 — 출생시각 민감도
 *
 * 기획서의 L0(시간 없이) / L1(시간 포함) 퍼널이 성립하는지 판정한다.
 * 시각을 흔들었을 때 각 산출물이 얼마나 바뀌는지 측정한다.
 *   - 달 나크샤트라 / 파다
 *   - 다샤 첫 지배성 (인생 타임라인의 기준)
 *   - 상승궁 라시
 * '시간 모름' 은 정오 12:00 KST 로 대체했을 때의 오류율로 본다.
 */

import pkg from '@ishubhamx/panchangam-js'
import { nakshatraIndexOf } from '../src/nakshatras.js'
import { randomSamples } from './cases.js'

const { getKundli, Observer } = pkg

const SAMPLE_COUNT = 300
const KST_OFFSET_MS = 9 * 3600000
const OFFSETS_MIN = [15, 30, 60, 120]

const snapshot = ({ date, lat, lon }) => {
  const k = getKundli(date, new Observer(lat, lon, 0), { ayanamsa: 'lahiri', houseSystem: 'whole_sign' })
  return {
    nakshatra: nakshatraIndexOf(k.planets.Moon.nakshatra),
    pada: k.planets.Moon.pada,
    dashaLord: k.dasha.fullCycle[0].planet,
    ascendantRashi: k.ascendant.rashi,
  }
}

/** 같은 날 KST 정오로 치환 — '태어난 시간 모름' 처리 시나리오 */
function noonKst(date) {
  const kst = new Date(date.getTime() + KST_OFFSET_MS)
  return new Date(Date.UTC(kst.getUTCFullYear(), kst.getUTCMonth(), kst.getUTCDate(), 12) - KST_OFFSET_MS)
}

const samples = randomSamples(SAMPLE_COUNT, 31337)
const baseline = samples.map(snapshot)

function measure(label, transform) {
  const changed = { nakshatra: 0, pada: 0, dashaLord: 0, ascendantRashi: 0 }
  samples.forEach((s, i) => {
    const got = snapshot({ ...s, date: transform(s.date) })
    for (const key of Object.keys(changed)) {
      if (got[key] !== baseline[i][key]) changed[key] += 1
    }
  })
  const pct = (n) => `${((n / SAMPLE_COUNT) * 100).toFixed(1)}%`.padStart(6)
  console.log(`  ${label.padEnd(22)} 나크샤트라 ${pct(changed.nakshatra)} | 파다 ${pct(changed.pada)} | 다샤지배성 ${pct(changed.dashaLord)} | 상승궁 ${pct(changed.ascendantRashi)}`)
  return changed
}

console.log(`\n[4] 출생시각 민감도 (표본 ${SAMPLE_COUNT}건) — 기준 대비 결과가 바뀐 비율`)
for (const min of OFFSETS_MIN) {
  measure(`±${min}분 (평균)`, (d) => new Date(d.getTime() + min * 60000))
}
console.log('')
const unknown = measure('시간 모름 → 정오 대체', noonKst)

console.log('\n  판정 기준')
console.log('    · 나크샤트라가 정오 대체로 20% 이상 바뀌면 L0 단계에서 나크샤트라를 확정 표기해서는 안 된다.')
console.log('    · 상승궁이 크게 흔들리면 상승궁 기반 콘텐츠는 L1(시간 입력) 전용이어야 한다.')

const nakshatraUnstable = unknown.nakshatra / SAMPLE_COUNT
const ascendantUnstable = unknown.ascendantRashi / SAMPLE_COUNT
console.log('\n  결론')
console.log(`    · 시간 모름 시 나크샤트라 오류율 ${(nakshatraUnstable * 100).toFixed(1)}% → ${nakshatraUnstable >= 0.2 ? 'L0 에서 나크샤트라 확정 금지 (기획서 하이브리드 설계가 옳음)' : 'L0 에서도 근사 표기 가능'}`)
console.log(`    · 시간 모름 시 상승궁 오류율 ${(ascendantUnstable * 100).toFixed(1)}% → 상승궁 콘텐츠는 ${ascendantUnstable >= 0.2 ? 'L1 전용' : 'L0 노출 가능'}`)
