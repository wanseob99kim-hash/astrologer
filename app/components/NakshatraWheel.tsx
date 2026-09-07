import { NAKSHATRAS } from '@/content/index'

/**
 * 황도 27등분 휠.
 *
 * 달이 하늘을 한 바퀴 도는 길을 27로 나눈 그림이다.
 * 눈금은 실제 황경이고, 표시된 점은 태어난 순간 달이 있던 자리다 — 장식이 아니라 데이터다.
 */

const SIZE = 260
const CENTER = SIZE / 2
const OUTER = 112
const INNER = 84
const SEGMENT_DEG = 360 / 27

/** 황경(0°가 12시 방향, 시계 방향)을 화면 좌표로. */
function pointAt(longitude: number, radius: number) {
  const radians = ((longitude - 90) * Math.PI) / 180
  return { x: CENTER + radius * Math.cos(radians), y: CENTER + radius * Math.sin(radians) }
}

function arcPath(startDeg: number, endDeg: number, outer: number, inner: number) {
  const a = pointAt(startDeg, outer)
  const b = pointAt(endDeg, outer)
  const c = pointAt(endDeg, inner)
  const d = pointAt(startDeg, inner)
  return [
    `M ${a.x.toFixed(2)} ${a.y.toFixed(2)}`,
    `A ${outer} ${outer} 0 0 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`,
    `L ${c.x.toFixed(2)} ${c.y.toFixed(2)}`,
    `A ${inner} ${inner} 0 0 0 ${d.x.toFixed(2)} ${d.y.toFixed(2)}`,
    'Z',
  ].join(' ')
}

interface NakshatraWheelProps {
  /** 강조할 나크샤트라 인덱스 (0~26) */
  activeIndex: number
  /** 달의 항성 황경. 있으면 정확한 위치에 표식을 찍는다. */
  moonLongitude?: number
  archetype: string
}

export function NakshatraWheel({ activeIndex, moonLongitude, archetype }: NakshatraWheelProps) {
  const marker = moonLongitude === undefined ? undefined : pointAt(moonLongitude, (OUTER + INNER) / 2)
  const label = moonLongitude === undefined
    ? `27등분 황도에서 ${archetype}의 자리`
    : `27등분 황도에서 달이 있던 자리 — ${archetype}, 황경 ${moonLongitude.toFixed(1)}도`

  return (
    <figure className="wheel">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" role="img" aria-label={label}>
        <title>{label}</title>

        {NAKSHATRAS.map((nakshatra) => {
          const start = nakshatra.index * SEGMENT_DEG
          const isActive = nakshatra.index === activeIndex
          return (
            <path
              key={nakshatra.key}
              d={arcPath(start + 0.6, start + SEGMENT_DEG - 0.6, OUTER, INNER)}
              className={isActive ? 'wheel__seg wheel__seg--active' : 'wheel__seg'}
            />
          )
        })}

        {/* 라시 경계 — 30도마다 긋는다 */}
        {Array.from({ length: 12 }, (_, i) => {
          const outerPoint = pointAt(i * 30, OUTER + 9)
          const innerPoint = pointAt(i * 30, INNER - 5)
          return (
            <line
              key={`tick-${i}`}
              x1={innerPoint.x}
              y1={innerPoint.y}
              x2={outerPoint.x}
              y2={outerPoint.y}
              className="wheel__tick"
            />
          )
        })}

        {marker ? (
          <>
            <line
              x1={CENTER}
              y1={CENTER}
              x2={marker.x}
              y2={marker.y}
              className="wheel__ray"
            />
            <circle cx={marker.x} cy={marker.y} r="6" className="wheel__moon" />
          </>
        ) : null}

        <text x={CENTER} y={CENTER - 4} className="wheel__count">27</text>
        <text x={CENTER} y={CENTER + 14} className="wheel__unit">탄생별</text>
      </svg>
      <figcaption className="small">
        {moonLongitude === undefined
          ? '달이 도는 길을 27등분한 그림입니다.'
          : `태어난 순간 달은 황경 ${moonLongitude.toFixed(1)}° 에 있었습니다.`}
      </figcaption>
    </figure>
  )
}
