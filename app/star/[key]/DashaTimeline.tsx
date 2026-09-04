import type { DashaPeriod } from '@/lib/astro/types'

/**
 * 다샤 120년 띠.
 * 각 행성 구간의 길이가 실제 연수에 비례하도록 그린다 — 눈금이 곧 데이터다.
 */
export function DashaTimeline({ timeline }: { timeline: readonly DashaPeriod[] }) {
  const start = timeline[0]?.startAge ?? 0
  const end = timeline[timeline.length - 1]?.endAge ?? 120
  const span = Math.max(end - start, 1)

  return (
    <div style={{ marginTop: 18 }}>
      <div
        style={{
          display: 'flex',
          height: 34,
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid var(--line)',
        }}
      >
        {timeline.map((period) => (
          <div
            key={`${period.planet}-${period.startAge}`}
            title={`${period.planetKo} ${Math.round(period.startAge)}~${Math.round(period.endAge)}세`}
            style={{
              flex: `${(period.endAge - period.startAge) / span} 0 0`,
              background: period.isCurrent ? 'var(--marigold)' : 'var(--surface)',
              borderRight: '1px solid var(--line)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 10,
              color: period.isCurrent ? 'var(--bg)' : 'var(--muted)',
              fontWeight: period.isCurrent ? 600 : 400,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {period.endAge - period.startAge > 9 ? period.planetKo : ''}
          </div>
        ))}
      </div>

      <ol
        style={{
          listStyle: 'none',
          margin: '16px 0 0',
          padding: 0,
          display: 'grid',
          gap: 4,
          fontSize: 'var(--step--1)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {timeline.map((period) => (
          <li
            key={`${period.planet}-row-${period.startAge}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '92px 1fr auto',
              gap: 12,
              padding: '5px 8px',
              borderRadius: 4,
              background: period.isCurrent ? 'var(--marigold-soft)' : 'transparent',
              color: period.isCurrent ? 'var(--ink)' : 'var(--ink-2)',
              fontWeight: period.isCurrent ? 600 : 400,
            }}
          >
            <span style={{ color: 'var(--muted)' }}>
              {Math.round(period.startAge)}–{Math.round(period.endAge)}세
            </span>
            <span>{period.planetKo}</span>
            {period.isCurrent ? <span style={{ color: 'var(--marigold)' }}>지금</span> : <span />}
          </li>
        ))}
      </ol>
    </div>
  )
}
