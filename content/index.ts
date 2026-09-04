import type { Graha, GrahaKey, Nakshatra } from './types'
import { GRAHAS } from './grahas'
import { NAKSHATRAS_01_09 } from './nakshatras-01-09'
import { NAKSHATRAS_10_18 } from './nakshatras-10-18'
import { NAKSHATRAS_19_27 } from './nakshatras-19-27'

export * from './types'
export { moolankOf, bhagyankOf, GRAHA_SLUG_BY_MOOLANK } from './numerology'
export { GRAHAS } from './grahas'
export { KOOTAS, SCORE_BANDS, MAX_TOTAL_SCORE } from './kootas'

/** 27종 전체. index 순으로 정렬되어 있다. */
export const NAKSHATRAS: readonly Nakshatra[] = [
  ...NAKSHATRAS_01_09,
  ...NAKSHATRAS_10_18,
  ...NAKSHATRAS_19_27,
]

const BY_INDEX = new Map(NAKSHATRAS.map((n) => [n.index, n]))
const BY_KEY = new Map(NAKSHATRAS.map((n) => [n.key, n]))
const GRAHA_BY_KEY = new Map(GRAHAS.map((g) => [g.key, g]))
const GRAHA_BY_MOOLANK = new Map(GRAHAS.map((g) => [g.moolank, g]))

/** 계산 엔진이 준 0-based 인덱스로 조회. */
export function nakshatraByIndex(index: number): Nakshatra | undefined {
  return BY_INDEX.get(index)
}

/** URL 슬러그로 조회. */
export function nakshatraByKey(key: string): Nakshatra | undefined {
  return BY_KEY.get(key)
}

export function grahaByKey(key: GrahaKey): Graha | undefined {
  return GRAHA_BY_KEY.get(key)
}

/** 물랑크(1~9)로 조회 — L0 결과. */
export function grahaByMoolank(moolank: number): Graha | undefined {
  return GRAHA_BY_MOOLANK.get(moolank)
}
