/**
 * 궁합 상세 리포트 계산.
 *
 * 무료 화면의 점수표 위에 두 가지를 더한다.
 *  1. 항목별 단계(high / mid / low) — 본문 문안을 고르는 기준
 *  2. 두 사람의 다샤를 달력 연도로 겹친 10년 흐름
 *
 * 다샤는 각자 계산한 값(computeLevelOne)을 그대로 쓴다. 새로 점치는 게 아니라
 * 이미 나온 두 사람의 인생 구간을 같은 달력 위에 올려놓는 것이다.
 */
import type { DashaPeriod } from './types'
import type { ReportLevel } from '@/content/match-report'

/** 만점 대비 비율로 단계를 나눈다. 1점짜리 항목은 0 / 0.5 / 1 이 그대로 low / mid / high. */
export function levelOf(ratio: number): ReportLevel {
  if (ratio >= 0.75) return 'high'
  if (ratio >= 0.5) return 'mid'
  return 'low'
}

/**
 * 전통 분류. 목성·금성·수성·달은 길성, 토성·화성·라후·케투는 흉성으로 본다.
 * 태양은 전통에서도 해석이 갈려 어느 쪽에도 넣지 않는다.
 */
const BENEFIC = new Set(['Jupiter', 'Venus', 'Mercury', 'Moon'])
const MALEFIC = new Set(['Saturn', 'Mars', 'Rahu', 'Ketu'])

export type YearTone = 'good' | 'shaky' | null

export interface TimelineYear {
  year: number
  a: { planet: string; planetKo: string; changes: boolean }
  b: { planet: string; planetKo: string; changes: boolean }
  tone: YearTone
}

/** 그 해 한가운데(7월 1일)에 걸쳐 있는 구간. */
function periodAt(timeline: readonly DashaPeriod[], year: number): DashaPeriod | undefined {
  const mid = Date.UTC(year, 6, 1)
  return timeline.find((p) => p.start.getTime() <= mid && mid < p.end.getTime())
}

/** 그 해 안에 새 구간이 시작되는가. 태어난 순간 시작하는 첫 구간은 세지 않는다. */
function changesIn(timeline: readonly DashaPeriod[], year: number): boolean {
  const from = Date.UTC(year, 0, 1)
  const to = Date.UTC(year + 1, 0, 1)
  return timeline.slice(1).some((p) => p.start.getTime() >= from && p.start.getTime() < to)
}

function toneOf(a: string, b: string, aChanges: boolean, bChanges: boolean): YearTone {
  // 둘 다 구간이 바뀌는 해는 흔들림이 겹친다
  if (aChanges && bChanges) return 'shaky'
  if (MALEFIC.has(a) && MALEFIC.has(b)) return 'shaky'
  if (BENEFIC.has(a) && BENEFIC.has(b)) return 'good'
  return null
}

/** 올해부터 years 년 동안 두 사람의 다샤를 나란히 놓는다. */
export function pairTimeline(
  a: readonly DashaPeriod[],
  b: readonly DashaPeriod[],
  fromYear: number,
  years = 10,
): TimelineYear[] {
  const rows: TimelineYear[] = []
  for (let year = fromYear; year < fromYear + years; year += 1) {
    const pa = periodAt(a, year)
    const pb = periodAt(b, year)
    if (!pa || !pb) continue
    const aChanges = changesIn(a, year)
    const bChanges = changesIn(b, year)
    rows.push({
      year,
      a: { planet: pa.planet, planetKo: pa.planetKo, changes: aChanges },
      b: { planet: pb.planet, planetKo: pb.planetKo, changes: bChanges },
      tone: toneOf(pa.planet, pb.planet, aChanges, bChanges),
    })
  }
  return rows
}
