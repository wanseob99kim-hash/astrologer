import type { FortuneAxis, Graha, Koota, Nakshatra, PeakPeriod } from '../types'

/**
 * 영어 문안 오버레이.
 *
 * 분류·수치 필드(index, lord, gana, range, ratings, compatible …)는 한국어 원본과
 * 공유하고, 사람이 읽는 글자만 여기서 바꾼다. 그래서 영어판이 엔진 테이블과
 * 어긋날 길이 없다 — validate.ts 는 병합된 결과를 검사한다.
 *
 * 필드 이름의 `ko` 접미는 원본 타입을 그대로 쓰기 위한 것이다. 값은 영어다.
 */

export type NakshatraTextKeys =
  | 'ko' | 'archetype' | 'tagline' | 'deityKo' | 'symbolKo' | 'yoniKo' | 'rashi'
  | 'luckyColor' | 'gemstone' | 'direction' | 'keyword' | 'copy' | 'ritual'
  | 'strengths' | 'shadows' | 'career' | 'bond' | 'helper' | 'publicSelf' | 'trueSelf' | 'cautions'

export interface NakshatraText extends Pick<Nakshatra, NakshatraTextKeys> {
  love: FortuneAxis
  wealth: FortuneAxis
  work: FortuneAxis
  peak: Pick<PeakPeriod, 'signals' | 'story' | 'actions' | 'miss'>
}

export type GrahaTextKeys =
  | 'ko' | 'weekday' | 'color' | 'gemstone' | 'deityKo' | 'direction' | 'remedy'
  | 'keyword' | 'copy' | 'strengths' | 'shadows'

export type GrahaText = Pick<Graha, GrahaTextKeys>

export type KootaText = Pick<Koota, 'ko' | 'measures' | 'high' | 'low'>
