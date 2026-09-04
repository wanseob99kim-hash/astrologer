import { createRequire } from 'node:module'
import { GRAHAS, NAKSHATRAS, bhagyankOf, grahaByMoolank, moolankOf } from '@/content/index'
import type { Graha } from '@/content/types'
import { DEFAULT_PLACE, toUtcInstant } from './input'
import type { BirthInput, DashaPeriod, LevelOneResult, LevelZeroResult } from './types'

/**
 * 계산 엔진 래퍼. 서버 전용 — node:module 을 쓰므로 클라이언트 번들에 들어가면 빌드가 실패한다.
 * 앱은 반드시 이 파일을 통해서만 계산에 접근한다.
 *
 * P2 검증(docs/03-analysis)에서 확인된 두 가지를 여기서 강제한다.
 *  - 시간을 모르면 나크샤트라가 23% 틀린다 → isTimeKnown 을 결과에 실어 보낸다
 *  - 파다는 ±30분에 8.7% 바뀐다 → isPadaReliable 로 따로 표시한다
 */

const require = createRequire(import.meta.url)

interface PanchangamModule {
  getKundli: (date: Date, observer: unknown, config?: Record<string, string>) => KundliShape
  Observer: new (lat: number, lon: number, elevation: number) => unknown
}

interface KundliShape {
  planets: Record<string, { longitude: number; rashiName: string; nakshatra?: string; pada?: number }>
  dasha: {
    birthNakshatra: string
    dashaBalance: string
    currentMahadasha: { planet: string; endTime: Date } | null
    fullCycle: Array<{ planet: string; startTime: Date | string; endTime: Date | string }>
  }
}

const panchangam = require('@ishubhamx/panchangam-js') as PanchangamModule

const NAKSHATRA_SPAN_DEG = 360 / 27
const MS_PER_YEAR = 365.25 * 86400000

/** 행성 영문명 → 한글. 화면에 영문이 노출되지 않도록 한다. */
export const PLANET_KO: Record<string, string> = {
  Ketu: '케투', Venus: '금성', Sun: '태양', Moon: '달', Mars: '화성',
  Rahu: '라후', Jupiter: '목성', Saturn: '토성', Mercury: '수성',
}

const WEEKDAY_KO = ['일', '월', '화', '수', '목', '금', '토'] as const

/** L0 — 생년월일만으로 확정된다. 천체 계산이 없어 오류율 0%. */
export function computeLevelZero(input: BirthInput): LevelZeroResult {
  const day = Number(input.date.slice(8, 10))
  const moolank = moolankOf(day)
  const bhagyank = bhagyankOf(input.date)
  const graha = grahaByMoolank(moolank)
  const destinyGraha = grahaByMoolank(bhagyank)

  if (!graha || !destinyGraha) {
    throw new Error(`물랑크 ${moolank} / 바갼크 ${bhagyank} 에 해당하는 그라하가 없습니다.`)
  }

  const [year, month, dayOfMonth] = input.date.split('-').map(Number)
  const weekdayIndex = new Date(Date.UTC(year ?? 2000, (month ?? 1) - 1, dayOfMonth ?? 1)).getUTCDay()

  return {
    moolank,
    bhagyank,
    graha,
    destinyGraha,
    weekdayKo: `${WEEKDAY_KO[weekdayIndex] ?? '일'}요일`,
  }
}

function toDate(value: Date | string): Date {
  return value instanceof Date ? value : new Date(value)
}

function buildTimeline(
  cycle: KundliShape['dasha']['fullCycle'],
  birth: Date,
  now: Date,
): DashaPeriod[] {
  return cycle.map((period) => {
    const start = toDate(period.startTime)
    const end = toDate(period.endTime)
    return {
      planet: period.planet,
      planetKo: PLANET_KO[period.planet] ?? period.planet,
      startAge: Math.max(0, (start.getTime() - birth.getTime()) / MS_PER_YEAR),
      endAge: (end.getTime() - birth.getTime()) / MS_PER_YEAR,
      start,
      end,
      isCurrent: now >= start && now < end,
    }
  })
}

/**
 * L1 — 시간·장소까지 반영한 결과.
 * 장소를 모르면 서울로 계산한다. 달 위치는 지역 영향이 작아 문제가 되지 않는다.
 */
export function computeLevelOne(input: BirthInput, now: Date = new Date()): LevelOneResult {
  const instant = toUtcInstant(input)
  const lat = input.lat ?? DEFAULT_PLACE.lat
  const lon = input.lon ?? DEFAULT_PLACE.lon

  const kundli = panchangam.getKundli(instant, new panchangam.Observer(lat, lon, 0), {
    ayanamsa: 'lahiri',
    houseSystem: 'whole_sign',
  })

  const moon = kundli.planets.Moon
  if (!moon) throw new Error('달 위치를 계산하지 못했습니다.')

  const index = Math.floor((((moon.longitude % 360) + 360) % 360) / NAKSHATRA_SPAN_DEG)
  const nakshatra = NAKSHATRAS[index]
  if (!nakshatra) throw new Error(`나크샤트라 인덱스 ${index} 가 범위를 벗어났습니다.`)

  const isTimeKnown = Boolean(input.time)
  const timeline = buildTimeline(kundli.dasha.fullCycle, instant, now)

  return {
    nakshatra,
    pada: moon.pada ?? 1,
    moonLongitude: moon.longitude,
    moonRashi: moon.rashiName,
    isTimeKnown,
    isPadaReliable: isTimeKnown,
    dasha: {
      balanceLabel: kundli.dasha.dashaBalance,
      current: timeline.find((period) => period.isCurrent) ?? null,
      timeline,
    },
  }
}

/** URL 슬러그로 쓰는 그라하 식별자. 예) Surya → surya */
export function grahaSlug(graha: Graha): string {
  return graha.sanskrit.toLowerCase()
}

export function grahaBySlug(slug: string): Graha | undefined {
  return GRAHAS.find((graha) => grahaSlug(graha) === slug.toLowerCase())
}
