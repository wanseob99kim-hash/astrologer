/**
 * 수비학 계산 — 생년월일만으로 확정되며 천체 계산이 필요 없다.
 *
 * 콘텐츠 본문과 분리해 둔다. 이 파일은 클라이언트 번들에 들어가도 무겁지 않다.
 */

/** 물랑크 → 그라하 URL 슬러그. 화면에 쓰는 본문 없이 식별자만 담는다. */
export const GRAHA_SLUG_BY_MOOLANK: Readonly<Record<number, string>> = {
  1: 'surya',
  2: 'chandra',
  3: 'guru',
  4: 'rahu',
  5: 'budha',
  6: 'shukra',
  7: 'ketu',
  8: 'shani',
  9: 'mangala',
}

function digitSum(value: string): number {
  let total = value.split('').reduce((sum, digit) => sum + Number(digit), 0)
  while (total > 9) {
    total = String(total).split('').reduce((sum, digit) => sum + Number(digit), 0)
  }
  return total
}

/**
 * 물랑크 = 태어난 '일(日)'의 자릿수를 한 자리가 될 때까지 더한 값.
 * 27일생 → 2+7 = 9
 */
export function moolankOf(dayOfMonth: number): number {
  return digitSum(String(dayOfMonth))
}

/**
 * 바갼크 = 생년월일 전체 자릿수를 한 자리가 될 때까지 더한 값.
 * @param isoDate 'YYYY-MM-DD'
 */
export function bhagyankOf(isoDate: string): number {
  return digitSum(isoDate.replace(/\D/g, ''))
}
