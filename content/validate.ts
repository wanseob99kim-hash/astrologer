/**
 * 콘텐츠 정합성 검사.
 *
 * 핵심 목적: **화면에 표시하는 분류값이 엔진이 점수를 매길 때 쓰는 분류값과 같은가.**
 * 이게 어긋나면 "당신은 데바 기질" 이라고 써놓고 점수는 락샤사로 계산하는 사고가 난다.
 * 엔진 내부 테이블을 정본으로 삼아 대조한다.
 *
 * 실행: npm run content:validate
 */

import { createRequire } from 'node:module'
import { NAKSHATRA_GLYPH_KEYS } from '../app/components/nakshatraGlyphKeys'
import { GRAHAS, KOOTAS, MAX_TOTAL_SCORE, NAKSHATRAS, bhagyankOf, moolankOf } from './index'

const require = createRequire(import.meta.url)
const engineConstants = require('@ishubhamx/panchangam-js/dist/matching/constants.js')

const NAKSHATRA_SPAN = 360 / 27
const RANGE_TOLERANCE = 0.001

const problems: string[] = []
const fail = (message: string) => problems.push(message)

/** 엔진 표기 'Adi (Start)' → 'Adi' */
const shortNadi = (raw: string) => raw.split(' ')[0]

// ---------- 나크샤트라 ----------

if (NAKSHATRAS.length !== 27) fail(`나크샤트라 개수 ${NAKSHATRAS.length} (기대 27)`)

const seenIndexes = new Set<number>()
const seenKeys = new Set<string>()
const seenArchetypes = new Set<string>()

NAKSHATRAS.forEach((n, position) => {
  const label = `[${n.index}] ${n.sanskrit}`

  if (n.index !== position) fail(`${label}: index ${n.index} 가 배열 위치 ${position} 와 다름`)
  if (seenIndexes.has(n.index)) fail(`${label}: index 중복`)
  if (seenKeys.has(n.key)) fail(`${label}: key '${n.key}' 중복`)
  if (seenArchetypes.has(n.archetype)) fail(`${label}: 아키타입 '${n.archetype}' 중복`)
  seenIndexes.add(n.index)
  seenKeys.add(n.key)
  seenArchetypes.add(n.archetype)

  // 엔진 분류 테이블과 대조 — 여기가 이 파일의 존재 이유
  const engineYoni = engineConstants.YONI_NAMES[engineConstants.NAKSHATRA_YONI[n.index]]
  const engineGana = engineConstants.GANA_NAMES[engineConstants.NAKSHATRA_GANA[n.index]]
  const engineNadi = shortNadi(engineConstants.NADI_NAMES[engineConstants.NAKSHATRA_NADI[n.index]])
  if (n.yoni !== engineYoni) fail(`${label}: yoni '${n.yoni}' ≠ 엔진 '${engineYoni}'`)
  if (n.gana !== engineGana) fail(`${label}: gana '${n.gana}' ≠ 엔진 '${engineGana}'`)
  if (n.nadi !== engineNadi) fail(`${label}: nadi '${n.nadi}' ≠ 엔진 '${engineNadi}'`)

  // 지배성은 빔쇼타리 순환 순서로 결정된다
  const VIMSHOTTARI_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury']
  const expectedLord = VIMSHOTTARI_ORDER[n.index % 9]
  if (n.lord !== expectedLord) fail(`${label}: lord '${n.lord}' ≠ 빔쇼타리 순환 '${expectedLord}'`)

  // 황경 구간
  const [start, end] = n.range
  if (Math.abs(start - n.index * NAKSHATRA_SPAN) > RANGE_TOLERANCE) fail(`${label}: range 시작 ${start} (기대 ${(n.index * NAKSHATRA_SPAN).toFixed(4)})`)
  if (Math.abs(end - (n.index + 1) * NAKSHATRA_SPAN) > RANGE_TOLERANCE) fail(`${label}: range 끝 ${end} (기대 ${((n.index + 1) * NAKSHATRA_SPAN).toFixed(4)})`)

  // 필수 한글 필드
  const requiredText: Array<[string, string]> = [
    ['ko', n.ko], ['archetype', n.archetype], ['tagline', n.tagline],
    ['deityKo', n.deityKo], ['symbolKo', n.symbolKo], ['yoniKo', n.yoniKo],
    ['keyword', n.keyword], ['copy', n.copy], ['ritual', n.ritual],
    ['love', n.love], ['wealth', n.wealth], ['luckyColor', n.luckyColor], ['gemstone', n.gemstone],
  ]
  for (const [field, value] of requiredText) {
    if (!value || value.trim().length === 0) fail(`${label}: ${field} 비어 있음`)
  }
  if (n.copy.length < 40) fail(`${label}: copy 가 너무 짧음 (${n.copy.length}자)`)
  if (n.strengths.length < 3) fail(`${label}: strengths ${n.strengths.length}개 (최소 3)`)
  if (n.shadows.length < 2) fail(`${label}: shadows ${n.shadows.length}개 (최소 2)`)
  if (n.career.length < 3) fail(`${label}: career ${n.career.length}개 (최소 3)`)
  if (!/^#[0-9A-Fa-f]{6}$/.test(n.luckyColorHex)) fail(`${label}: luckyColorHex '${n.luckyColorHex}' 형식 오류`)
  if (!n.direction || n.direction.trim().length === 0) fail(`${label}: direction 비어 있음`)
  for (const [axis, value] of Object.entries(n.ratings)) {
    if (!Number.isInteger(value) || value < 1 || value > 5) fail(`${label}: ratings.${axis} = ${value} 가 1~5 정수가 아님`)
  }
  if (n.rashi.length === 0) fail(`${label}: rashi 비어 있음`)
})

// 27종 전부 상징 도상이 있는지 — 하나라도 빠지면 그 유형만 그림 없이 나온다
const glyphKeys = new Set<string>(NAKSHATRA_GLYPH_KEYS)
for (const n of NAKSHATRAS) {
  if (!glyphKeys.has(n.key)) fail(`[${n.index}] ${n.sanskrit}: 상징 도상 없음 (key '${n.key}')`)
}
if (NAKSHATRA_GLYPH_KEYS.length !== 27) {
  fail(`상징 도상 ${NAKSHATRA_GLYPH_KEYS.length}종 (기대 27)`)
}

// ---------- 나바그라하 ----------

const VIMSHOTTARI_YEARS: Record<string, number> = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17,
}

if (GRAHAS.length !== 9) fail(`그라하 개수 ${GRAHAS.length} (기대 9)`)

const seenMoolank = new Set<number>()
for (const g of GRAHAS) {
  const label = `[${g.moolank}] ${g.sanskrit}`
  if (g.moolank < 1 || g.moolank > 9) fail(`${label}: moolank 범위 오류`)
  if (seenMoolank.has(g.moolank)) fail(`${label}: moolank 중복`)
  seenMoolank.add(g.moolank)
  if (VIMSHOTTARI_YEARS[g.key] !== g.dashaYears) fail(`${label}: dashaYears ${g.dashaYears} ≠ 빔쇼타리 규정 ${VIMSHOTTARI_YEARS[g.key]}`)
  if (!/^#[0-9A-Fa-f]{6}$/.test(g.colorHex)) fail(`${label}: colorHex 형식 오류`)
  if (g.strengths.length < 3) fail(`${label}: strengths ${g.strengths.length}개 (최소 3)`)
  if (g.shadows.length < 2) fail(`${label}: shadows ${g.shadows.length}개 (최소 2)`)
  if (!g.copy || g.copy.length < 30) fail(`${label}: copy 가 너무 짧음`)
  if (!g.deityKo || !g.remedy) fail(`${label}: deityKo/remedy 누락`)
  if (g.luckyNumber !== g.moolank) fail(`${label}: luckyNumber ${g.luckyNumber} ≠ moolank ${g.moolank}`)
}
const dashaSum = GRAHAS.reduce((sum, g) => sum + g.dashaYears, 0)
if (dashaSum !== 120) fail(`빔쇼타리 대운 합 ${dashaSum}년 (기대 120)`)

// 모든 나크샤트라 지배성이 그라하 목록에 존재하는가
const grahaKeys = new Set(GRAHAS.map((g) => g.key))
for (const n of NAKSHATRAS) {
  if (!grahaKeys.has(n.lord)) fail(`[${n.index}] ${n.sanskrit}: lord '${n.lord}' 가 그라하 목록에 없음`)
}

// ---------- 쿠타 ----------

const ENGINE_KOOTA_MAX: Record<string, number> = {
  varna: 1, vashya: 2, tara: 3, yoni: 4, 'graha-maitri': 5, gana: 6, bhakoot: 7, nadi: 8,
}

if (KOOTAS.length !== 8) fail(`쿠타 개수 ${KOOTAS.length} (기대 8)`)
for (const k of KOOTAS) {
  const expected = ENGINE_KOOTA_MAX[k.key]
  if (expected === undefined) fail(`쿠타 '${k.key}' 는 알 수 없는 키`)
  else if (k.maxScore !== expected) fail(`쿠타 '${k.key}' 만점 ${k.maxScore} (기대 ${expected})`)
  if (!k.high || !k.low) fail(`쿠타 '${k.key}': high/low 문구 누락`)
  if (/mismatch|맞지\s*않|불일치/i.test(k.low)) fail(`쿠타 '${k.key}': low 문구가 단정적임. "조심하라" 표현으로 바꿀 것`)
}
const kootaSum = KOOTAS.reduce((sum, k) => sum + k.maxScore, 0)
if (kootaSum !== MAX_TOTAL_SCORE) fail(`쿠타 만점 합 ${kootaSum} (기대 ${MAX_TOTAL_SCORE})`)

// ---------- 수비학 헬퍼 ----------

if (moolankOf(27) !== 9) fail(`moolankOf(27) = ${moolankOf(27)} (기대 9)`)
if (moolankOf(5) !== 5) fail(`moolankOf(5) = ${moolankOf(5)} (기대 5)`)
if (moolankOf(19) !== 1) fail(`moolankOf(19) = ${moolankOf(19)} (기대 1)`)
if (bhagyankOf('1990-03-27') !== 4) fail(`bhagyankOf('1990-03-27') = ${bhagyankOf('1990-03-27')} (기대 4)`)
for (let day = 1; day <= 31; day += 1) {
  const m = moolankOf(day)
  if (m < 1 || m > 9) fail(`moolankOf(${day}) = ${m} 가 1~9 범위 밖`)
}

// ---------- 결과 ----------

console.log(`나크샤트라 ${NAKSHATRAS.length}종 · 그라하 ${GRAHAS.length}종 · 쿠타 ${KOOTAS.length}종 검사`)
if (problems.length === 0) {
  console.log('콘텐츠 정합성: PASS (엔진 분류 테이블과 완전 일치)')
} else {
  console.log(`콘텐츠 정합성: FAIL — ${problems.length}건`)
  for (const p of problems) console.log(`  - ${p}`)
  process.exitCode = 1
}
