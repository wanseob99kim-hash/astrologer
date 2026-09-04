import type { Graha, Nakshatra } from '@/content/types'

/** 사용자가 입력하는 출생 정보. 모두 문자열로 받아 경계에서 검증한다. */
export interface BirthInput {
  /** 'YYYY-MM-DD' (양력 기준. 음력은 변환 후 전달) */
  date: string
  /** 'HH:MM' 24시간제. 모르면 undefined */
  time?: string
  /** 태어난 곳 표시명 */
  placeName?: string
  /** 위도. 미상이면 서울 기본값 */
  lat?: number
  /** 경도 */
  lon?: number
  /** 닉네임 */
  nickname?: string
}

/** L0 — 생년월일만으로 확정. 천체 계산 없음. 오류율 0%. */
export interface LevelZeroResult {
  moolank: number
  bhagyank: number
  graha: Graha
  destinyGraha: Graha
  weekdayKo: string
}

export interface DashaPeriod {
  planet: string
  planetKo: string
  startAge: number
  endAge: number
  start: Date
  end: Date
  isCurrent: boolean
}

/**
 * L1 — 시간·장소까지 받아야 확정.
 * 시간을 모르면 정오로 대체하는데, 그때 나크샤트라가 23% 틀린다.
 * 그래서 `isTimeKnown` 이 false 면 화면에서 확정 표기를 하지 않는다.
 */
export interface LevelOneResult {
  nakshatra: Nakshatra
  pada: number
  /** 항성 달 황경 */
  moonLongitude: number
  moonRashi: string
  /** 시간을 실제로 입력받았는가 */
  isTimeKnown: boolean
  /** 파다는 ±30분에 8.7% 바뀐다. 시간 미상이면 신뢰 불가. */
  isPadaReliable: boolean
  dasha: {
    balanceLabel: string
    current: DashaPeriod | null
    timeline: DashaPeriod[]
  }
}

export class BirthInputError extends Error {
  constructor(
    message: string,
    readonly field: keyof BirthInput,
  ) {
    super(message)
    this.name = 'BirthInputError'
  }
}
