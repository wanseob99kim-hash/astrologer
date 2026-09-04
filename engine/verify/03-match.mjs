/**
 * 검증 3 — 아쉬타쿠타 36점 궁합
 *   - 8쿠타의 만점 합이 36인가
 *   - 각 쿠타 점수가 0..만점 범위인가
 *   - 총점이 각 쿠타 합과 일치하는가
 *   - 같은 입력에 항상 같은 출력인가 (결정론)
 *   - 순서를 바꾸면 점수가 달라지는가 (전통상 남/녀 역할 비대칭 — 제품 결정 필요)
 */

import pkg from '@ishubhamx/panchangam-js'
import { randomSamples } from './cases.js'

const { getKundli, Observer, matchKundli } = pkg

const PAIR_COUNT = 150
const EXPECTED_MAX_TOTAL = 36
const EXPECTED_MAXES = { Varna: 1, Vashya: 2, Tara: 3, Yoni: 4, 'Graha Maitri': 5, Gana: 6, Bhakoot: 7, Nadi: 8 }

const kundliOf = ({ date, lat, lon }) => getKundli(date, new Observer(lat, lon, 0), { ayanamsa: 'lahiri', houseSystem: 'whole_sign' })

const samples = randomSamples(PAIR_COUNT * 2, 4242)
const pairs = []
for (let i = 0; i < samples.length; i += 2) pairs.push([kundliOf(samples[i]), kundliOf(samples[i + 1])])

const first = matchKundli(pairs[0][0], pairs[0][1])
console.log('\n[3a] 쿠타 구성 확인')
console.log(`  쿠타 개수 : ${first.ashtakoot.kootas.length}`)
for (const k of first.ashtakoot.kootas) console.log(`    ${k.name.padEnd(14)} ${k.score} / ${k.maxScore}   (${k.area})`)
const maxSum = first.ashtakoot.kootas.reduce((a, k) => a + k.maxScore, 0)
console.log(`  만점 합   : ${maxSum} (기대 ${EXPECTED_MAX_TOTAL})`)
console.log(`  판정 문구 : ${first.verdict}`)

const problems = []
if (first.ashtakoot.kootas.length !== 8) problems.push(`쿠타 개수 ${first.ashtakoot.kootas.length} (기대 8)`)
if (maxSum !== EXPECTED_MAX_TOTAL) problems.push(`만점 합 ${maxSum} (기대 ${EXPECTED_MAX_TOTAL})`)
for (const [name, want] of Object.entries(EXPECTED_MAXES)) {
  const found = first.ashtakoot.kootas.find((k) => k.name.toLowerCase().replace(/[^a-z]/g, '') === name.toLowerCase().replace(/[^a-z]/g, ''))
  if (!found) problems.push(`쿠타 '${name}' 없음`)
  else if (found.maxScore !== want) problems.push(`${name} 만점 ${found.maxScore} (기대 ${want})`)
}

console.log(`\n[3b] 무작위 커플 ${PAIR_COUNT}쌍 불변식`)
let rangeViolations = 0
let totalMismatch = 0
let nonDeterministic = 0
let asymmetric = 0
let maxAsymmetryGap = 0
const distribution = {}
let doshaCount = 0

for (const [a, b] of pairs) {
  const r1 = matchKundli(a, b)
  const r2 = matchKundli(a, b)
  const rev = matchKundli(b, a)

  const sum = r1.ashtakoot.kootas.reduce((acc, k) => acc + k.score, 0)
  if (Math.abs(sum - r1.ashtakoot.totalScore) > 1e-9) totalMismatch += 1
  for (const k of r1.ashtakoot.kootas) {
    if (k.score < 0 || k.score > k.maxScore) rangeViolations += 1
  }
  if (r1.ashtakoot.totalScore !== r2.ashtakoot.totalScore) nonDeterministic += 1
  if (r1.ashtakoot.totalScore !== rev.ashtakoot.totalScore) {
    asymmetric += 1
    maxAsymmetryGap = Math.max(maxAsymmetryGap, Math.abs(r1.ashtakoot.totalScore - rev.ashtakoot.totalScore))
  }
  if (r1.dosha.boy.hasDosha || r1.dosha.girl.hasDosha) doshaCount += 1

  const bucket = r1.ashtakoot.totalScore < 18 ? '0-17 비추'
    : r1.ashtakoot.totalScore < 25 ? '18-24 무난'
      : r1.ashtakoot.totalScore < 33 ? '25-32 좋음' : '33-36 최상'
  distribution[bucket] = (distribution[bucket] ?? 0) + 1
}

console.log(`  점수 범위 위반        : ${rangeViolations}`)
console.log(`  총점 ≠ 쿠타합         : ${totalMismatch}`)
console.log(`  비결정적 출력         : ${nonDeterministic}`)
console.log(`  순서 바꾸면 점수 변함 : ${asymmetric} / ${PAIR_COUNT} (최대 차 ${maxAsymmetryGap}점)`)
console.log(`  망갈 도샤 검출 커플   : ${doshaCount} / ${PAIR_COUNT}`)
console.log('  점수 분포:')
for (const [k, v] of Object.entries(distribution).sort()) console.log(`    ${k.padEnd(12)} ${v}`)

if (rangeViolations > 0) problems.push(`점수 범위 위반 ${rangeViolations}`)
if (totalMismatch > 0) problems.push(`총점 불일치 ${totalMismatch}`)
if (nonDeterministic > 0) problems.push(`비결정적 출력 ${nonDeterministic}`)

if (asymmetric > 0) {
  console.log(`\n  ⚠ 제품 결정 필요: 아쉬타쿠타는 전통상 남/녀 역할이 비대칭이다.`)
  console.log(`    누구를 boy 로 넣느냐에 따라 최대 ${maxAsymmetryGap}점 차이가 난다.`)
  console.log(`    동성 커플·성별 미입력 처리 방침을 정해야 한다 (예: 양방향 평균, 또는 초대자 고정).`)
}

for (const p of problems) console.log(`  FAIL ${p}`)
console.log(`\n[3] 결과: ${problems.length === 0 ? 'PASS' : 'FAIL'}`)
process.exitCode = problems.length === 0 ? 0 : 1
