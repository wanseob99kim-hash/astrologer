/**
 * 검증 1 — 나크샤트라 판정
 *  (a) 공개 차트 기준 케이스 대조
 *  (b) panchangam-js vs mhah-panchang vs 자체 아야남샤 계산 교차 대조
 *
 * 주의: panchangam-js 는 내부적으로 astronomy-engine 을 쓴다.
 * 따라서 자체 계산은 '달 위치'가 아니라 '아야남샤'에 대해서만 독립이다.
 * 달 위치까지 독립인 대조 상대는 의존성이 없는 mhah-panchang 뿐이다.
 */

import pkg from '@ishubhamx/panchangam-js'
import mhahPkg from 'mhah-panchang'
import { computeMoonNakshatra, ayanamsaFromSpica, ayanamsaLinear } from '../src/independent.js'
import { nakshatraIndexOf, canonicalName, NAKSHATRA_SPAN_DEG } from '../src/nakshatras.js'
import { ANCHOR_CASES, randomSamples } from './cases.js'

const { getKundli, Observer, getAyanamsa } = pkg
const { MhahPanchang } = mhahPkg
const mhah = new MhahPanchang()

const SAMPLE_COUNT = 500
const BOUNDARY_MARGIN_DEG = 0.05

function libKundli({ date, lat, lon }) {
  return getKundli(date, new Observer(lat, lon, 0), { ayanamsa: 'lahiri', houseSystem: 'whole_sign' })
}

function runAnchors() {
  console.log('\n[1a] 공개 차트 기준 케이스')
  let failed = 0
  for (const c of ANCHOR_CASES) {
    const k = libKundli(c)
    const moon = k.planets.Moon
    const mine = computeMoonNakshatra(c.date)
    // 상승궁 나크샤트라는 단정하지 않는다. 상승궁은 4분당 1° 이동해
    // 옛 기록의 출생시각 오차만으로 갈리므로 참고값으로만 출력한다.
    const checks = [
      ['moon nakshatra', canonicalName(moon.nakshatra), canonicalName(c.expected.moonNakshatra)],
      ['moon rashi', moon.rashiName, c.expected.moonRashi],
      ['ascendant rashi', k.ascendant.rashiName, c.expected.ascendantRashi],
      ['self-calc nakshatra', canonicalName(mine.name), canonicalName(c.expected.moonNakshatra)],
    ]
    const softAscendant = canonicalName(k.ascendant.nakshatra) === canonicalName(c.expected.ascendantNakshatra)
    const bad = checks.filter(([, got, want]) => got !== want)
    failed += bad.length
    console.log(`  ${bad.length === 0 ? 'PASS' : 'FAIL'}  ${c.label}  (${c.localTime})`)
    console.log(`        lib  moon ${moon.nakshatra} pada ${moon.pada} / ${moon.rashiName}, lagna ${k.ascendant.rashiName} ${k.ascendant.nakshatra}`)
    console.log(`        self moon ${mine.name} pada ${mine.pada}`)
    for (const [field, got, want] of bad) console.log(`        MISMATCH ${field}: got ${got}, want ${want}`)
    if (!softAscendant) console.log(`        NOTE 상승궁 나크샤트라 참고 불일치: got ${k.ascendant.nakshatra}, ref ${c.expected.ascendantNakshatra} (출생시각 오차 범위)`)
  }
  return failed
}

function runCrossCheck() {
  console.log(`\n[1b] 교차 대조 (표본 ${SAMPLE_COUNT}건, 1940~2011, 한국 위경도)`)
  const samples = randomSamples(SAMPLE_COUNT)
  const stats = { libVsMhah: 0, libVsSelf: 0, unresolved: 0, boundary: 0, padaMismatch: 0 }
  let maxAyanamsaSpread = 0
  let maxSiderealDiff = 0
  const disagreements = []

  for (const s of samples) {
    const moon = libKundli(s).planets.Moon
    const mhahResult = mhah.calculate(s.date)
    const mine = computeMoonNakshatra(s.date)

    const libIdx = nakshatraIndexOf(moon.nakshatra)
    const mhahIdx = nakshatraIndexOf(mhahResult.Nakshatra?.name_en_IN)
    const selfIdx = mine.index

    if (libIdx < 0 || mhahIdx < 0) stats.unresolved += 1
    else if (libIdx !== mhahIdx) {
      stats.libVsMhah += 1
      if (disagreements.length < 5) {
        disagreements.push({ t: s.date.toISOString(), lib: moon.nakshatra, mhah: mhahResult.Nakshatra.name_en_IN, lon: moon.longitude.toFixed(4) })
      }
    }
    if (libIdx !== selfIdx) stats.libVsSelf += 1
    if (mine.pada !== moon.pada) stats.padaMismatch += 1

    const spread = Math.max(
      Math.abs(getAyanamsa(s.date) - ayanamsaFromSpica(s.date)),
      Math.abs(getAyanamsa(s.date) - ayanamsaLinear(s.date)),
    )
    maxAyanamsaSpread = Math.max(maxAyanamsaSpread, spread)

    let siderealDiff = Math.abs(mine.sidereal - moon.longitude)
    if (siderealDiff > 180) siderealDiff = 360 - siderealDiff
    maxSiderealDiff = Math.max(maxSiderealDiff, siderealDiff)

    const within = moon.longitude % NAKSHATRA_SPAN_DEG
    if (within < BOUNDARY_MARGIN_DEG || within > NAKSHATRA_SPAN_DEG - BOUNDARY_MARGIN_DEG) stats.boundary += 1
  }

  console.log(`  이름 해석 실패                       : ${stats.unresolved} / ${SAMPLE_COUNT}`)
  console.log(`  panchangam-js vs mhah-panchang 불일치 : ${stats.libVsMhah} / ${SAMPLE_COUNT}`)
  console.log(`  panchangam-js vs 자체 아야남샤 불일치 : ${stats.libVsSelf} / ${SAMPLE_COUNT}`)
  console.log(`  파다 불일치                          : ${stats.padaMismatch} / ${SAMPLE_COUNT}`)
  console.log(`  아야남샤 최대 편차                   : ${(maxAyanamsaSpread * 3600).toFixed(1)}"`)
  console.log(`  항성 달 황경 최대 편차               : ${(maxSiderealDiff * 3600).toFixed(1)}"`)
  console.log(`  경계 ±${BOUNDARY_MARGIN_DEG}° 이내 표본            : ${stats.boundary} / ${SAMPLE_COUNT}`)
  for (const d of disagreements) console.log(`    불일치 예: ${JSON.stringify(d)}`)
  return stats
}

const anchorFailures = runAnchors()
const cross = runCrossCheck()

const ok = anchorFailures === 0
  && cross.unresolved === 0
  && cross.libVsMhah <= cross.boundary
  && cross.libVsSelf <= cross.boundary

console.log(`\n[1] 결과: ${ok ? 'PASS' : 'FAIL'}`)
process.exitCode = ok ? 0 : 1
