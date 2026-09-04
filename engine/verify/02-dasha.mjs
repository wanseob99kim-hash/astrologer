/**
 * 검증 2 — 빔쇼타리 다샤
 * 라이브러리 출력이 전통 규칙과 내부적으로 모순이 없는지 확인한다.
 *   - 9개 대운, 합 120년
 *   - 구간이 끊김·겹침 없이 연속
 *   - 첫 대운 지배성 = 출생 나크샤트라 지배성
 *   - 출생 잔여(balance) = 지배성 주기 × (1 − 나크샤트라 내 진행률)
 *   - 순환 순서 = Ketu→Venus→Sun→Moon→Mars→Rahu→Jupiter→Saturn→Mercury
 */

import pkg from '@ishubhamx/panchangam-js'
import { VIMSHOTTARI_YEARS, VIMSHOTTARI_ORDER, NAKSHATRA_SPAN_DEG, nakshatraIndexOf, nakshatraLord } from '../src/nakshatras.js'
import { ANCHOR_CASES, randomSamples } from './cases.js'

const { getKundli, Observer } = pkg

const SAMPLE_COUNT = 200
const YEAR_DAYS = 365.25
const MS_PER_YEAR = YEAR_DAYS * 86400000
const BALANCE_TOLERANCE_YEARS = 0.02 // 약 7일. 라이브러리의 년/월/일 반올림 여유

/** "Saturn: 11y 2m 11 d" → { planet, years } */
function parseBalance(text) {
  const planet = String(text).split(':')[0].trim()
  const y = Number(/(\d+)\s*y/.exec(text)?.[1] ?? 0)
  const m = Number(/(\d+)\s*m/.exec(text)?.[1] ?? 0)
  const d = Number(/(\d+)\s*d/.exec(text)?.[1] ?? 0)
  return { planet, years: y + (m * (YEAR_DAYS / 12) + d) / YEAR_DAYS }
}

function checkOne({ date, lat, lon }) {
  const k = getKundli(date, new Observer(lat, lon, 0), { ayanamsa: 'lahiri', houseSystem: 'whole_sign' })
  const moon = k.planets.Moon
  const dasha = k.dasha
  const problems = []

  const moonIdx = nakshatraIndexOf(moon.nakshatra)
  const expectedLord = nakshatraLord(moonIdx)
  const cycle = dasha.fullCycle

  if (cycle.length !== 9) problems.push(`대운 개수 ${cycle.length} (기대 9)`)

  // 첫 대운은 출생 시점에 이미 일부 지나간 상태라 잔여분만 들어간다.
  // 따라서 출생~마지막 종료까지의 총합은 120년이 아니라 120 − (첫 대운 경과분)이다.
  const totalYears = (new Date(cycle.at(-1).endTime) - new Date(cycle[0].startTime)) / MS_PER_YEAR

  for (let i = 1; i < cycle.length; i += 1) {
    const gap = Math.abs(new Date(cycle[i].startTime) - new Date(cycle[i - 1].endTime))
    if (gap > 1000) problems.push(`구간 ${i} 불연속 ${gap}ms`)
  }

  // 각 대운 길이가 규정 연수와 일치하는가 (첫 대운은 잔여분이라 제외)
  for (let i = 1; i < cycle.length; i += 1) {
    const span = (new Date(cycle[i].endTime) - new Date(cycle[i].startTime)) / MS_PER_YEAR
    const want = VIMSHOTTARI_YEARS[cycle[i].planet]
    if (want === undefined) problems.push(`알 수 없는 행성 ${cycle[i].planet}`)
    else if (Math.abs(span - want) > 0.02) problems.push(`${cycle[i].planet} 대운 ${span.toFixed(3)}년 (기대 ${want})`)
  }

  // 순환 순서
  const startPos = VIMSHOTTARI_ORDER.indexOf(cycle[0].planet)
  for (let i = 0; i < cycle.length; i += 1) {
    const want = VIMSHOTTARI_ORDER[(startPos + i) % 9]
    if (cycle[i].planet !== want) problems.push(`순서 ${i}: ${cycle[i].planet} (기대 ${want})`)
  }

  if (cycle[0].planet !== expectedLord) problems.push(`첫 대운 ${cycle[0].planet} (나크샤트라 ${moon.nakshatra} 지배성 ${expectedLord})`)

  // 잔여 대운 = 주기 × (1 − 진행률)
  const within = ((moon.longitude % NAKSHATRA_SPAN_DEG) + NAKSHATRA_SPAN_DEG) % NAKSHATRA_SPAN_DEG
  const fraction = within / NAKSHATRA_SPAN_DEG
  const expectedBalance = VIMSHOTTARI_YEARS[expectedLord] * (1 - fraction)
  const expectedTotal = 120 - VIMSHOTTARI_YEARS[expectedLord] * fraction
  if (Math.abs(totalYears - expectedTotal) > 0.05) {
    problems.push(`전체 주기 ${totalYears.toFixed(3)}년 (기대 ${expectedTotal.toFixed(3)} = 120 − 첫 대운 경과분)`)
  }
  const parsed = parseBalance(dasha.dashaBalance)
  if (parsed.planet !== expectedLord) problems.push(`잔여 표기 행성 ${parsed.planet} (기대 ${expectedLord})`)
  const balanceDiff = Math.abs(parsed.years - expectedBalance)
  if (balanceDiff > BALANCE_TOLERANCE_YEARS) {
    problems.push(`잔여 ${parsed.years.toFixed(4)}년 vs 계산 ${expectedBalance.toFixed(4)}년 (차 ${(balanceDiff * YEAR_DAYS).toFixed(2)}일)`)
  }

  return { problems, balanceDiff, dasha, moon }
}

console.log('\n[2a] 기준 케이스 다샤')
let anchorProblems = 0
for (const c of ANCHOR_CASES) {
  const { problems, dasha } = checkOne(c)
  anchorProblems += problems.length
  console.log(`  ${problems.length === 0 ? 'PASS' : 'FAIL'}  ${c.label}`)
  console.log(`        출생 나크샤트라 ${dasha.birthNakshatra} pada ${dasha.nakshatraPada} | 잔여 ${dasha.dashaBalance}`)
  console.log(`        대운 순서 ${dasha.fullCycle.map((p) => p.planet).join(' → ')}`)
  for (const p of problems) console.log(`        ${p}`)
}

console.log(`\n[2b] 무작위 표본 ${SAMPLE_COUNT}건 내부 정합성`)
let failed = 0
let maxBalanceDiffDays = 0
const firstFailures = []
for (const s of randomSamples(SAMPLE_COUNT, 777)) {
  const { problems, balanceDiff } = checkOne(s)
  maxBalanceDiffDays = Math.max(maxBalanceDiffDays, balanceDiff * YEAR_DAYS)
  if (problems.length > 0) {
    failed += 1
    if (firstFailures.length < 3) firstFailures.push({ t: s.date.toISOString(), problems })
  }
}
console.log(`  정합성 위반 표본        : ${failed} / ${SAMPLE_COUNT}`)
console.log(`  잔여 대운 최대 오차     : ${maxBalanceDiffDays.toFixed(2)}일`)
for (const f of firstFailures) console.log(`    ${f.t}: ${f.problems.join(' | ')}`)

const ok = anchorProblems === 0 && failed === 0
console.log(`\n[2] 결과: ${ok ? 'PASS' : 'FAIL'}`)
process.exitCode = ok ? 0 : 1
