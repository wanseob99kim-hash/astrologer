import type { Graha, GrahaKey, Koota, Nakshatra } from './types'
import { GRAHAS as GRAHAS_KO } from './grahas'
import { KOOTAS as KOOTAS_KO, SCORE_BANDS as SCORE_BANDS_KO } from './kootas'
import { NAKSHATRAS_01_09 } from './nakshatras-01-09'
import { NAKSHATRAS_10_18 } from './nakshatras-10-18'
import { NAKSHATRAS_19_27 } from './nakshatras-19-27'
import { GRAHA_TEXT_EN, KOOTA_TEXT_EN, SCORE_BAND_TEXT_EN } from './en/grahas'
import { NAKSHATRA_TEXT_EN_01_09 } from './en/nakshatras-01-09'
import { NAKSHATRA_TEXT_EN_10_18 } from './en/nakshatras-10-18'
import { NAKSHATRA_TEXT_EN_19_27 } from './en/nakshatras-19-27'
import type { Locale } from '@/lib/i18n'

export * from './types'
export { moolankOf, bhagyankOf, GRAHA_SLUG_BY_MOOLANK } from './numerology'
export { MAX_TOTAL_SCORE } from './kootas'

/*
 * 언어별 콘텐츠.
 *
 * 한국어가 원본이다. 영어는 문안 필드만 오버레이로 덮어쓴다 — 분류·수치는
 * 한 곳(원본)에만 있어 두 언어가 엔진과 어긋날 수 없다.
 * 영어 문안이 빠진 항목은 빌드 시 validate.ts 가 잡는다.
 */

/** 27종 전체 — 한국어. index 순으로 정렬되어 있다. */
export const NAKSHATRAS: readonly Nakshatra[] = [
  ...NAKSHATRAS_01_09,
  ...NAKSHATRAS_10_18,
  ...NAKSHATRAS_19_27,
]

const NAKSHATRA_TEXT_EN = {
  ...NAKSHATRA_TEXT_EN_01_09,
  ...NAKSHATRA_TEXT_EN_10_18,
  ...NAKSHATRA_TEXT_EN_19_27,
}

function overlayNakshatra(base: Nakshatra): Nakshatra {
  const text = NAKSHATRA_TEXT_EN[base.key]
  if (!text) throw new Error(`영어 문안 없음: nakshatra ${base.key}`)
  const { peak, ...rest } = text
  return { ...base, ...rest, peak: { ...base.peak, ...peak } }
}

function overlayGraha(base: Graha): Graha {
  const text = GRAHA_TEXT_EN[base.key]
  if (!text) throw new Error(`영어 문안 없음: graha ${base.key}`)
  return { ...base, ...text }
}

function overlayKoota(base: Koota): Koota {
  const text = KOOTA_TEXT_EN[base.key]
  if (!text) throw new Error(`영어 문안 없음: koota ${base.key}`)
  return { ...base, ...text }
}

export type ScoreBand = { min: number; max: number; ko: string; tone: 'caution' | 'neutral' | 'good' | 'best' }

interface LocaleContent {
  nakshatras: readonly Nakshatra[]
  grahas: readonly Graha[]
  kootas: readonly Koota[]
  scoreBands: readonly ScoreBand[]
  byIndex: Map<number, Nakshatra>
  byKey: Map<string, Nakshatra>
  grahaByKey: Map<GrahaKey, Graha>
  grahaByMoolank: Map<number, Graha>
}

function build(nakshatras: readonly Nakshatra[], grahas: readonly Graha[], kootas: readonly Koota[], scoreBands: readonly ScoreBand[]): LocaleContent {
  return {
    nakshatras,
    grahas,
    kootas,
    scoreBands,
    byIndex: new Map(nakshatras.map((n) => [n.index, n])),
    byKey: new Map(nakshatras.map((n) => [n.key, n])),
    grahaByKey: new Map(grahas.map((g) => [g.key, g])),
    grahaByMoolank: new Map(grahas.map((g) => [g.moolank, g])),
  }
}

const CONTENT: Record<Locale, LocaleContent> = {
  ko: build(NAKSHATRAS, GRAHAS_KO, KOOTAS_KO, SCORE_BANDS_KO),
  en: build(
    NAKSHATRAS.map(overlayNakshatra),
    GRAHAS_KO.map(overlayGraha),
    KOOTAS_KO.map(overlayKoota),
    SCORE_BANDS_KO.map((band, i) => ({ ...band, ko: SCORE_BAND_TEXT_EN[i] ?? band.ko })),
  ),
}

export function contentFor(locale: Locale = 'ko'): LocaleContent {
  return CONTENT[locale]
}

/** 한국어 기본 — 기존 호출부 호환. */
export const GRAHAS = GRAHAS_KO
export const KOOTAS = KOOTAS_KO
export const SCORE_BANDS = SCORE_BANDS_KO

/** 계산 엔진이 준 0-based 인덱스로 조회. */
export function nakshatraByIndex(index: number, locale: Locale = 'ko'): Nakshatra | undefined {
  return CONTENT[locale].byIndex.get(index)
}

/** URL 슬러그로 조회. */
export function nakshatraByKey(key: string, locale: Locale = 'ko'): Nakshatra | undefined {
  return CONTENT[locale].byKey.get(key)
}

export function grahaByKey(key: GrahaKey, locale: Locale = 'ko'): Graha | undefined {
  return CONTENT[locale].grahaByKey.get(key)
}

/** 물랑크(1~9)로 조회 — L0 결과. */
export function grahaByMoolank(moolank: number, locale: Locale = 'ko'): Graha | undefined {
  return CONTENT[locale].grahaByMoolank.get(moolank)
}
