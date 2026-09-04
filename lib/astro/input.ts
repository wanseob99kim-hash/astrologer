import { BirthInputError, type BirthInput } from './types'

/** 시간을 모를 때 대체할 시각. P2 검증에서 이 경우 나크샤트라가 23% 틀린다. */
export const FALLBACK_HOUR_KST = 12
export const KST_OFFSET_MINUTES = 9 * 60

/** 장소를 모를 때 기본값 — 서울. */
export const DEFAULT_PLACE = { name: '서울', lat: 37.5665, lon: 126.978 } as const

const MIN_YEAR = 1900
const MAX_YEAR = new Date().getUTCFullYear()

/** 화면에 그대로 출력되는 값에서 제어문자를 제거한다. */
const PRINTABLE_MIN = 32
const DELETE_CHAR = 127

/** 제어문자를 제거한다. 정규식 이스케이프 대신 코드포인트로 거른다. */
function stripControlChars(value: string): string {
  return Array.from(value)
    .filter((ch) => {
      const code = ch.codePointAt(0) ?? 0
      return code >= PRINTABLE_MIN && code !== DELETE_CHAR
    })
    .join('')
}

/** '19950505' 또는 '1995-05-05' → 'YYYY-MM-DD'. 실제 존재하는 날짜인지까지 확인한다. */
export function normalizeDate(raw: string): string {
  const digits = String(raw ?? '').replace(/\D/g, '')
  if (digits.length !== 8) {
    throw new BirthInputError('생년월일은 숫자 8자리로 입력해 주세요. 예) 19950505', 'date')
  }
  const year = Number(digits.slice(0, 4))
  const month = Number(digits.slice(4, 6))
  const day = Number(digits.slice(6, 8))

  if (year < MIN_YEAR || year > MAX_YEAR) {
    throw new BirthInputError(`연도는 ${MIN_YEAR}년부터 ${MAX_YEAR}년까지 입력할 수 있어요.`, 'date')
  }
  const probe = new Date(Date.UTC(year, month - 1, day))
  if (probe.getUTCFullYear() !== year || probe.getUTCMonth() !== month - 1 || probe.getUTCDate() !== day) {
    throw new BirthInputError('그런 날짜는 없어요. 다시 확인해 주세요.', 'date')
  }
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`
}

/** '0930' 또는 '09:30' → 'HH:MM'. 빈 값이면 undefined (시간 모름). */
export function normalizeTime(raw: string | undefined | null): string | undefined {
  if (raw === undefined || raw === null) return undefined
  const digits = String(raw).replace(/\D/g, '')
  if (digits.length === 0) return undefined
  if (digits.length !== 4) {
    throw new BirthInputError('시간은 24시간제 숫자 4자리로 입력해 주세요. 예) 0930', 'time')
  }
  const hour = Number(digits.slice(0, 2))
  const minute = Number(digits.slice(2, 4))
  if (hour > 23 || minute > 59) {
    throw new BirthInputError('그런 시각은 없어요. 24시간제로 입력해 주세요.', 'time')
  }
  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`
}

/** 닉네임 — 화면에 그대로 출력되므로 길이를 제한하고 제어문자를 제거한다. */
export function normalizeNickname(raw: string | undefined | null): string | undefined {
  if (!raw) return undefined
  const cleaned = stripControlChars(String(raw)).trim().slice(0, 20)
  return cleaned.length > 0 ? cleaned : undefined
}

export function normalizePlaceName(raw: string | undefined | null): string | undefined {
  if (!raw) return undefined
  const cleaned = stripControlChars(String(raw)).trim().slice(0, 40)
  return cleaned.length > 0 ? cleaned : undefined
}

interface RawBirthFields {
  date?: string | null
  time?: string | null
  place?: string | null
  nickname?: string | null
  lat?: string | number | null
  lon?: string | number | null
}

function parseCoordinate(raw: string | number | null | undefined, limit: number): number | undefined {
  if (raw === undefined || raw === null || raw === '') return undefined
  const value = Number(raw)
  return Number.isFinite(value) && Math.abs(value) <= limit ? value : undefined
}

/** 폼·쿼리스트링에서 받은 값을 안전한 BirthInput 으로 만든다. */
export function parseBirthInput(raw: RawBirthFields): BirthInput {
  return {
    date: normalizeDate(raw.date ?? ''),
    time: normalizeTime(raw.time),
    placeName: normalizePlaceName(raw.place),
    nickname: normalizeNickname(raw.nickname),
    lat: parseCoordinate(raw.lat, 90),
    lon: parseCoordinate(raw.lon, 180),
  }
}

/**
 * 한국 시간 기준 출생 순간을 UTC 로 변환한다.
 * 시간을 모르면 정오(KST)로 대체한다 — 하루 중 오차가 가장 작은 지점이다.
 */
export function toUtcInstant(input: BirthInput): Date {
  const [year, month, day] = input.date.split('-').map(Number)
  const [hour, minute] = input.time ? input.time.split(':').map(Number) : [FALLBACK_HOUR_KST, 0]
  const localMinutes = (hour ?? 0) * 60 + (minute ?? 0)
  return new Date(
    Date.UTC(year ?? 2000, (month ?? 1) - 1, day ?? 1) + (localMinutes - KST_OFFSET_MINUTES) * 60000,
  )
}
