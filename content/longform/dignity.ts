/**
 * 행성의 품위(dignity) 표 — 파라샤라 전통의 표준값.
 *
 * 언어와 상관없는 사실만 담는다. 별자리는 0(양자리)~11(물고기자리) 번호, 행성은 엔진 키.
 * 라후·케투의 고양·약화는 학파마다 다르다. 여기서는 가장 널리 쓰는 값을 두고 본문에서 이견을 밝힌다.
 */

export type GrahaKey = 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Jupiter' | 'Venus' | 'Saturn' | 'Rahu' | 'Ketu'

export interface Dignity {
  /** 고양 별자리와 최고 고양 도수. */
  exalted: { sign: number; degree: number | null }
  debilitated: { sign: number; degree: number | null }
  /** 자기 별자리(지배). 라후·케투는 없음. */
  own: readonly number[]
  friends: readonly GrahaKey[]
  neutral: readonly GrahaKey[]
  enemies: readonly GrahaKey[]
  /** 빔쇼타리 다샤 기간(년). */
  dashaYears: number
  /** 방향 힘(딕 발라)이 가장 센 하우스. 라후·케투는 없음. */
  digBalaHouse: number | null
}

export const DIGNITY: Record<GrahaKey, Dignity> = {
  Sun: { exalted: { sign: 0, degree: 10 }, debilitated: { sign: 6, degree: 10 }, own: [4], friends: ['Moon', 'Mars', 'Jupiter'], neutral: ['Mercury'], enemies: ['Venus', 'Saturn'], dashaYears: 6, digBalaHouse: 10 },
  Moon: { exalted: { sign: 1, degree: 3 }, debilitated: { sign: 7, degree: 3 }, own: [3], friends: ['Sun', 'Mercury'], neutral: ['Mars', 'Jupiter', 'Venus', 'Saturn'], enemies: [], dashaYears: 10, digBalaHouse: 4 },
  Mars: { exalted: { sign: 9, degree: 28 }, debilitated: { sign: 3, degree: 28 }, own: [0, 7], friends: ['Sun', 'Moon', 'Jupiter'], neutral: ['Venus', 'Saturn'], enemies: ['Mercury'], dashaYears: 7, digBalaHouse: 10 },
  Mercury: { exalted: { sign: 5, degree: 15 }, debilitated: { sign: 11, degree: 15 }, own: [2, 5], friends: ['Sun', 'Venus'], neutral: ['Mars', 'Jupiter', 'Saturn'], enemies: ['Moon'], dashaYears: 17, digBalaHouse: 1 },
  Jupiter: { exalted: { sign: 3, degree: 5 }, debilitated: { sign: 9, degree: 5 }, own: [8, 11], friends: ['Sun', 'Moon', 'Mars'], neutral: ['Saturn'], enemies: ['Mercury', 'Venus'], dashaYears: 16, digBalaHouse: 1 },
  Venus: { exalted: { sign: 11, degree: 27 }, debilitated: { sign: 5, degree: 27 }, own: [1, 6], friends: ['Mercury', 'Saturn'], neutral: ['Mars', 'Jupiter'], enemies: ['Sun', 'Moon'], dashaYears: 20, digBalaHouse: 4 },
  Saturn: { exalted: { sign: 6, degree: 20 }, debilitated: { sign: 0, degree: 20 }, own: [9, 10], friends: ['Mercury', 'Venus'], neutral: ['Jupiter'], enemies: ['Sun', 'Moon', 'Mars'], dashaYears: 19, digBalaHouse: 7 },
  Rahu: { exalted: { sign: 1, degree: null }, debilitated: { sign: 7, degree: null }, own: [], friends: ['Mercury', 'Venus', 'Saturn'], neutral: ['Jupiter'], enemies: ['Sun', 'Moon', 'Mars'], dashaYears: 18, digBalaHouse: null },
  Ketu: { exalted: { sign: 7, degree: null }, debilitated: { sign: 1, degree: null }, own: [], friends: ['Mars', 'Venus', 'Saturn'], neutral: ['Jupiter', 'Mercury'], enemies: ['Sun', 'Moon'], dashaYears: 7, digBalaHouse: null },
}

export const SIGN_NAMES: Record<'ko' | 'en', readonly string[]> = {
  ko: ['양자리', '황소자리', '쌍둥이자리', '게자리', '사자자리', '처녀자리', '천칭자리', '전갈자리', '사수자리', '염소자리', '물병자리', '물고기자리'],
  en: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
}

/** 표와 본문에서 쓰는 행성 이름. 행성 페이지 제목(산스크리트 이름)과 달리 일상어로 쓴다. */
export const PLANET_NAMES: Record<'ko' | 'en', Record<GrahaKey, string>> = {
  ko: { Sun: '태양', Moon: '달', Mars: '화성', Mercury: '수성', Jupiter: '목성', Venus: '금성', Saturn: '토성', Rahu: '라후', Ketu: '케투' },
  en: { Sun: 'Sun', Moon: 'Moon', Mars: 'Mars', Mercury: 'Mercury', Jupiter: 'Jupiter', Venus: 'Venus', Saturn: 'Saturn', Rahu: 'Rahu', Ketu: 'Ketu' },
}
