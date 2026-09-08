/**
 * 콘텐츠 데이터 타입 정의.
 *
 * 분류 필드(gana/yoni/nadi/lord)는 계산 엔진의 내부 테이블과 반드시 일치해야 한다.
 * `content/validate.ts` 가 매 빌드마다 대조한다.
 */

export type Gana = 'Deva' | 'Manushya' | 'Rakshasa'
export type Nadi = 'Adi' | 'Madhya' | 'Antya'

export type Yoni =
  | 'Horse' | 'Elephant' | 'Sheep' | 'Snake' | 'Dog' | 'Cat' | 'Rat'
  | 'Cow' | 'Buffalo' | 'Tiger' | 'Deer' | 'Monkey' | 'Mongoose' | 'Lion'

export type GrahaKey =
  | 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Jupiter'
  | 'Venus' | 'Saturn' | 'Rahu' | 'Ketu'

/** 9행성. L0(생년월일만) 단계의 결과 유형이자 나크샤트라의 지배성. */
export interface Graha {
  key: GrahaKey
  sanskrit: string
  ko: string
  /** 물랑크(생일 자릿수 합) 1~9 중 이 행성에 배정된 수. 라후/케투는 각각 4, 7. */
  moolank: number
  /** 대응 요일. 라후·케투는 요일 없음. */
  weekday: string | null
  /** 빔쇼타리 대운 연수. 합 120. */
  dashaYears: number
  color: string
  colorHex: string
  gemstone: string
  /** 이 행성을 모시는 신격. */
  deityKo: string
  /** 전통 방위. 라후·케투는 고정 방위가 없다. */
  direction: string | null
  luckyNumber: number
  /** 전통 처방 한 줄. 한국어로만 쓴다. */
  remedy: string
  keyword: string
  /** L0 결과 화면 본문. */
  copy: string
  /** 타고난 강점. */
  strengths: string[]
  /** 과하면 독이 되는 면. */
  shadows: string[]
}

/**
 * 다섯 축 성향 강도 (1~5).
 * 전통 자료의 성격 서술을 근거로 작성한 값이며, 계산으로 나온 수치가 아니다.
 */
export interface NakshatraRatings {
  wealth: number
  career: number
  love: number
  bond: number
  helper: number
}

/**
 * 운세 한 축의 상세.
 * 굵은 한 줄로 결론을 먼저 주고, 짧은 항목으로 풀어 쓴다.
 */
export interface FortuneAxis {
  /** 한 줄 결론. */
  headline: string
  /** 짧은 항목 3개. */
  points: string[]
}

/** 전성기 구간. 나이는 다샤가 아니라 유형 성향에서 온 값이다. */
export interface PeakPeriod {
  from: number
  to: number
  /** 전성기가 오기 전에 나타나는 신호 3개. */
  signals: string[]
}

/** 27 나크샤트라. 결과 화면의 메인 정체성. */
export interface Nakshatra {
  /** 0-based. 계산 엔진의 인덱스와 동일해야 한다. */
  index: number
  key: string
  sanskrit: string
  devanagari: string
  ko: string
  /** 공유용 한글 아키타입. 벤치마크의 "황금 코끼리" 자리. */
  archetype: string
  /** 아키타입 한 줄 설명. */
  tagline: string
  lord: GrahaKey
  /** 주재 신격. */
  deity: string
  deityKo: string
  /** 상징물. */
  symbol: string
  symbolKo: string
  gana: Gana
  yoni: Yoni
  yoniKo: string
  nadi: Nadi
  /** 황경 구간 [시작, 끝) — 항성 기준 도(度). */
  range: readonly [number, number]
  /** 구간이 걸치는 라시(들). */
  rashi: string[]
  luckyColor: string
  luckyColorHex: string
  gemstone: string
  luckyNumber: number
  /** 전통 방위. */
  direction: string
  ratings: NakshatraRatings
  keyword: string
  /** 결과 화면 도입 본문. */
  copy: string
  /** 전통 의식·처방 한 줄. */
  ritual: string
  strengths: string[]
  shadows: string[]
  career: string[]
  /** 연애에서 드러나는 방식. */
  love: FortuneAxis
  /** 돈을 대하는 방식. */
  wealth: FortuneAxis
  /** 일에서 드러나는 방식. */
  work: FortuneAxis
  /** 사람을 오래 이어가는 방식. */
  bond: string
  /** 도와줄 사람이 어떻게 나타나는가. */
  helper: string
  /** 남들이 보는 나. */
  publicSelf: string
  /** 정작 나는 이런 사람. */
  trueSelf: string
  peak: PeakPeriod
  /** 미리 알면 피할 수 있는 것 3개. */
  cautions: string[]
  /** 잘 맞는 유형 key 3개. */
  compatible: string[]
  /** 제일 조심할 조합 key 1개. */
  caution: string
}

/** 아쉬타쿠타 8쿠타 메타데이터. 점수 계산은 엔진이 하고, 표기는 여기서 한다. */
export interface Koota {
  key: string
  sanskrit: string
  /** 한국형 표기. 카스트 용어(Varna)는 여기서 추상화한다. */
  ko: string
  maxScore: number
  /** 무엇을 보는가. */
  measures: string
  /** 점수가 높을 때. */
  high: string
  /** 점수가 낮을 때 — "안 맞는다"가 아니라 "이런 점을 조심하라"로 쓴다. */
  low: string
}
