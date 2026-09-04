/**
 * 27 나크샤트라 기준 상수.
 * Vimshottari 지배성 순서: Ketu → Venus → Sun → Moon → Mars → Rahu → Jupiter → Saturn → Mercury (반복)
 */

export const NAKSHATRA_SPAN_DEG = 360 / 27 // 13.333...
export const PADA_SPAN_DEG = NAKSHATRA_SPAN_DEG / 4 // 3.333...

export const NAKSHATRA_NAMES = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
]

/**
 * 라이브러리마다 로마자 표기가 제각각이라 별칭을 명시 매핑한다.
 * 키는 소문자·구분자 제거 형태. 값은 NAKSHATRA_NAMES 인덱스.
 */
const ALIASES = {
  ashwini: 0, ashvini: 0, aswini: 0,
  bharani: 1, dwija: 1, bharni: 1,
  krittika: 2, kritika: 2, karthika: 2, krithika: 2,
  rohini: 3,
  mrigashira: 4, mrigashirsha: 4, mrigasira: 4, mrugasira: 4, mrigshira: 4,
  ardra: 5, aardra: 5, arudra: 5, thiruvathirai: 5,
  punarvasu: 6, punarvasoo: 6,
  pushya: 7, pushyami: 7, poosam: 7,
  ashlesha: 8, aslesha: 8, ayilyam: 8,
  magha: 9, makha: 9, magham: 9,
  purvaphalguni: 10, poorvaphalguni: 10, pubba: 10, puram: 10,
  uttaraphalguni: 11, uttaraphalgun: 11, uttara: 11, uthiram: 11,
  hasta: 12, hastha: 12,
  chitra: 13, chithra: 13, chitta: 13,
  swati: 14, svati: 14, swathi: 14,
  vishakha: 15, visakha: 15, vishaka: 15,
  anuradha: 16, anusham: 16,
  jyeshtha: 17, jyestha: 17, jyeshta: 17, kettai: 17,
  mula: 18, moola: 18, moolam: 18,
  purvaashadha: 19, poorvaashadha: 19, purvashadha: 19, pooradam: 19,
  uttaraashadha: 20, uttarashadha: 20, uthradam: 20,
  shravana: 21, sravana: 21, shravan: 21, thiruvonam: 21,
  dhanishta: 22, dhanishtha: 22, dhanista: 22, avittam: 22,
  shatabhisha: 23, shatabisha: 23, satabhisha: 23, shatataraka: 23, sadayam: 23,
  purvabhadrapada: 24, poorvabhadrapada: 24, purvabhadra: 24, pooruttathi: 24,
  uttarabhadrapada: 25, uttarabhadra: 25, uthrattathi: 25,
  revati: 26, rebati: 26, revathi: 26,
}

/** Vimshottari 대운 주기 (년). 합 120. */
export const VIMSHOTTARI_YEARS = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7,
  Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17,
}

export const VIMSHOTTARI_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury']

/** 나크샤트라 인덱스(0-26) → 지배성 */
export function nakshatraLord(index) {
  return VIMSHOTTARI_ORDER[index % 9]
}

/** 항성 황경(deg) → { index, name, lord, pada, fraction } */
export function nakshatraFromLongitude(siderealLon) {
  const lon = ((siderealLon % 360) + 360) % 360
  const index = Math.floor(lon / NAKSHATRA_SPAN_DEG)
  const within = lon - index * NAKSHATRA_SPAN_DEG
  return {
    index,
    name: NAKSHATRA_NAMES[index],
    lord: nakshatraLord(index),
    pada: Math.floor(within / PADA_SPAN_DEG) + 1,
    fraction: within / NAKSHATRA_SPAN_DEG,
  }
}

/** 임의 표기 → 표준 인덱스(0-26). 해석 실패 시 -1. */
export function nakshatraIndexOf(raw) {
  const key = String(raw ?? '').toLowerCase().replace(/[^a-z]/g, '')
  return key in ALIASES ? ALIASES[key] : -1
}

/** 임의 표기 → 표준 이름. 해석 실패 시 원문 반환. */
export function canonicalName(raw) {
  const index = nakshatraIndexOf(raw)
  return index >= 0 ? NAKSHATRA_NAMES[index] : `UNRESOLVED(${raw})`
}
