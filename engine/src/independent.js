/**
 * 독립 검증용 계산기.
 * 라이브러리를 신뢰하지 않고 astronomy-engine(범용 천체 계산)만으로
 * 항성 달 황경 → 나크샤트라를 직접 구한다.
 *
 * 아야남샤는 두 방식으로 각각 구해 서로 대조한다.
 *  A) 정의식: 치트라(Spica)를 정확히 180°에 두는 Chitrapaksha 정의
 *  B) 선형식: J2000 기준값 + 연간 세차율
 */

import * as Astronomy from 'astronomy-engine'
import { nakshatraFromLongitude } from './nakshatras.js'

// Spica (Alpha Virginis) J2000 좌표
const SPICA_RA_HOURS = 13 + 25 / 60 + 11.579 / 3600
const SPICA_DEC_DEG = -(11 + 9 / 60 + 40.75 / 3600)
const SPICA_DISTANCE_LY = 250

// J2000.0 시점의 라히리 아야남샤와 연간 세차율
const LAHIRI_AT_J2000_DEG = 23.85675
const PRECESSION_DEG_PER_YEAR = 50.2888 / 3600

let spicaDefined = false

function ensureSpica() {
  if (spicaDefined) return
  Astronomy.DefineStar(Astronomy.Body.Star1, SPICA_RA_HOURS, SPICA_DEC_DEG, SPICA_DISTANCE_LY)
  spicaDefined = true
}

function normalizeDeg(deg) {
  return ((deg % 360) + 360) % 360
}

/** 그 시점의 진춘분점 기준 황경(deg). */
function eclipticLongitudeOfDate(body, date) {
  const vector = Astronomy.GeoVector(body, date, false)
  const rotation = Astronomy.Rotation_EQJ_ECT(date)
  const rotated = Astronomy.RotateVector(rotation, vector)
  return normalizeDeg((Math.atan2(rotated.y, rotated.x) * 180) / Math.PI)
}

/** A) Chitrapaksha 정의에 따른 아야남샤. */
export function ayanamsaFromSpica(date) {
  ensureSpica()
  return normalizeDeg(eclipticLongitudeOfDate(Astronomy.Body.Star1, date) - 180)
}

/** B) J2000 기준 선형 근사 아야남샤. */
export function ayanamsaLinear(date) {
  const yearsFromJ2000 = (date.getTime() - Date.UTC(2000, 0, 1, 12)) / (365.25 * 86400000)
  return LAHIRI_AT_J2000_DEG + PRECESSION_DEG_PER_YEAR * yearsFromJ2000
}

/** 회귀(춘분점 기준) 달 황경. */
export function tropicalMoonLongitude(date) {
  return normalizeDeg(Astronomy.EclipticGeoMoon(date).lon)
}

/**
 * 독립 계산 결과.
 * @param {Date} date UTC 순간
 * @param {'spica'|'linear'} ayanamsaMode
 */
export function computeMoonNakshatra(date, ayanamsaMode = 'spica') {
  const tropical = tropicalMoonLongitude(date)
  const ayanamsa = ayanamsaMode === 'linear' ? ayanamsaLinear(date) : ayanamsaFromSpica(date)
  const sidereal = normalizeDeg(tropical - ayanamsa)
  return { tropical, ayanamsa, sidereal, ...nakshatraFromLongitude(sidereal) }
}
