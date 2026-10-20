/**
 * 첫 화면 밤하늘. 달이 지나는 길(황도) 위에 탄생별 세 개의 실제 별 모양을 잇는다.
 *
 * 별 배치는 실제 성도를 단순화한 것이다.
 *  - 마가: 사자자리의 낫(레굴루스에서 시작하는 거꾸로 된 물음표)
 *  - 웃타라 아샤다: 궁수자리 눈키·아스켈라 쪽의 상아 모양 곡선
 *  - 로히니: 황소자리 히아데스의 V 자와 알데바란
 * 배경 별은 고정 시드로 뿌려 서버·클라이언트 렌더가 같다.
 * 좁은 화면에서는 좌우가 잘리므로(slice) 별자리와 달은 가운데 약 460 폭 안에 둔다.
 */

interface Star { x: number; y: number; r: number }
interface Asterism { key: string; at: [number, number]; scale: number; stars: Star[]; lines: Array<[number, number]>; bright: number }

const ASTERISMS: Asterism[] = [
  {
    key: 'magha', at: [172, 178], scale: 2.1, bright: 0,
    stars: [{ x: 0, y: 30, r: 2.6 }, { x: 4, y: 12, r: 1.5 }, { x: 12, y: -2, r: 2 }, { x: 6, y: -16, r: 1.4 }, { x: -8, y: -21, r: 1.3 }, { x: -19, y: -13, r: 1.5 }],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
  },
  {
    key: 'uttara-ashadha', at: [320, 104], scale: 2.4, bright: 2,
    stars: [{ x: -26, y: -9, r: 1.3 }, { x: -12, y: -3, r: 1.6 }, { x: 0, y: 0, r: 2.6 }, { x: 11, y: 10, r: 1.6 }, { x: 15, y: 26, r: 2.1 }],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    key: 'rohini', at: [466, 176], scale: 2.1, bright: 4,
    stars: [{ x: -14, y: 4, r: 1.6 }, { x: -4, y: -9, r: 1.4 }, { x: 6, y: -22, r: 1.5 }, { x: 4, y: 0, r: 1.4 }, { x: 18, y: -6, r: 2.8 }],
    lines: [[0, 1], [1, 2], [0, 3], [3, 4]],
  },
]

/** 결정적 의사 난수(mulberry32). */
function rng(seed: number) {
  let a = seed
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const BACKGROUND: Star[] = (() => {
  const next = rng(27)
  return Array.from({ length: 140 }, () => ({ x: next() * 640, y: next() * 300, r: 0.3 + next() * next() * 1.3 }))
})()

export interface NightSkyLabel { key: string; name: string; sub: string }

export function NightSky({ labels }: { labels: readonly NightSkyLabel[] }) {
  const labelOf = new Map(labels.map((l) => [l.key, l]))
  return (
    <svg className="nightSky" viewBox="0 0 640 300" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="nightSkyBg" cx="50%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#1B2350" />
          <stop offset="55%" stopColor="#0B0F26" />
          <stop offset="100%" stopColor="#05060F" />
        </radialGradient>
        <radialGradient id="nightSkyGlow">
          <stop offset="0%" stopColor="#FFF4D6" stopOpacity=".9" />
          <stop offset="100%" stopColor="#FFF4D6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="640" height="300" fill="url(#nightSkyBg)" />

      {BACKGROUND.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#DDE3FF" opacity={0.35 + s.r * 0.35} className={i % 9 === 0 ? 'nightSky__twinkle' : undefined} style={i % 9 === 0 ? { animationDelay: `${(i % 7) * 0.6}s` } : undefined} />
      ))}

      {/* 달이 지나는 길 */}
      <path d="M -10 250 Q 320 20 650 250" fill="none" stroke="#C9A961" strokeOpacity=".28" strokeWidth="1" strokeDasharray="2 6" />

      {/* 초승달 */}
      <g transform="translate(522 58)">
        <circle r="13" fill="#F3E7C3" />
        <circle r="12" cx="5" cy="-3" fill="#0D1230" />
      </g>

      {ASTERISMS.map((a) => {
        const pt = (s: Star) => [a.at[0] + s.x * a.scale, a.at[1] + s.y * a.scale] as const
        const label = labelOf.get(a.key)
        const bottom = Math.max(...a.stars.map((s) => pt(s)[1]))
        return (
          <g key={a.key}>
            {a.lines.map(([from, to]) => {
              const start = a.stars[from]
              const end = a.stars[to]
              if (!start || !end) return null
              const [x1, y1] = pt(start)
              const [x2, y2] = pt(end)
              return <line key={`${from}-${to}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9A961" strokeOpacity=".55" strokeWidth="1" />
            })}
            {a.stars.map((s, i) => {
              const [x, y] = pt(s)
              return (
                <g key={i}>
                  {i === a.bright ? <circle cx={x} cy={y} r={s.r * 5} fill="url(#nightSkyGlow)" opacity=".55" /> : null}
                  <circle cx={x} cy={y} r={s.r} fill={i === a.bright ? '#FFF4D6' : '#E8ECFF'} />
                </g>
              )
            })}
            {label ? (
              <text x={a.at[0]} y={bottom + 26} textAnchor="middle" className="nightSky__label">
                <tspan className="nightSky__name">{label.name}</tspan>
                <tspan x={a.at[0]} dy="16" className="nightSky__sub">{label.sub}</tspan>
              </text>
            ) : null}
          </g>
        )
      })}
    </svg>
  )
}
