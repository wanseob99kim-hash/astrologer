import { NakshatraGlyph } from './NakshatraGlyph'

/**
 * 탄생별 카드.
 *
 * 벤치마크(태국 점성술)의 삽화는 타로 카드 형식이다.
 * 이중 테두리, 상단 로마 숫자, 주인공 뒤의 아치형 만다라, 해와 달, 밑동의 연꽃,
 * 그리고 하단의 키워드 배너. 화려함의 대부분은 이 '틀'에서 나온다.
 * 그림 자체는 하나뿐이고 나머지는 모두 반복되는 장식이다.
 *
 * 그래서 여기서도 틀을 SVG 로 짜고 가운데에 27종 상징을 끼운다.
 * 카드마다 달라지는 것은 넷뿐이다 — 번호, 상징, 키워드, 강조색.
 */

const ROMAN: ReadonlyArray<[number, string]> = [
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

function toRoman(value: number): string {
  let remaining = value
  let out = ''
  for (const [amount, symbol] of ROMAN) {
    while (remaining >= amount) {
      out += symbol
      remaining -= amount
    }
  }
  return out
}

/** 사방으로 뻗는 해. 원본의 왼쪽 위 장식. */
function SunMark({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="7.5" className="tarot__ink" fill="none" strokeWidth="1.2" />
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        return (
          <line
            key={i}
            x1={Math.cos(angle) * 10}
            y1={Math.sin(angle) * 10}
            x2={Math.cos(angle) * (i % 2 === 0 ? 15 : 12.5)}
            y2={Math.sin(angle) * (i % 2 === 0 ? 15 : 12.5)}
            className="tarot__ink"
            strokeWidth="1.1"
          />
        )
      })}
    </g>
  )
}

/** 초승달. 원본의 오른쪽 위 장식. */
function MoonMark({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x + 5} ${y - 10}a11 11 0 1 0 0 20 13 13 0 0 1 0-20z`}
      className="tarot__ink"
      strokeWidth="1.2"
      fill="none"
    />
  )
}

/** 네 갈래 별. */
function Sparkle({ x, y, r = 4 }: { x: number; y: number; r?: number }) {
  return (
    <path
      d={`M${x} ${y - r}q${r * 0.28} ${r * 0.72} ${r} ${r}q-${r * 0.72} ${r * 0.28} -${r} ${r}q-${r * 0.28} -${r * 0.72} -${r} -${r}q${r * 0.72} -${r * 0.28} ${r} -${r}z`}
      className="tarot__fillInk"
      stroke="none"
    />
  )
}

interface NakshatraCardProps {
  index: number
  glyphKey: string
  archetype: string
  keyword: string
  /** 강조색. 유형의 행운색을 쓴다. */
  accent: string
  /** 좁은 자리에 놓을 때 잔장식을 줄인다. */
  compact?: boolean
  width?: number | string
}

export function NakshatraCard({
  index,
  glyphKey,
  archetype,
  keyword,
  accent,
  compact = false,
  width = '100%',
}: NakshatraCardProps) {
  const numeral = toRoman(index + 1)

  return (
    <svg
      viewBox="0 0 300 420"
      width={width}
      className="tarot"
      style={{ ['--accent' as string]: accent }}
      role="img"
      aria-label={`${archetype} 카드`}
    >
      <title>{`${numeral} · ${archetype}`}</title>

      <defs>
        <linearGradient id={`arch-${glyphKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="tarot__archTop" />
          <stop offset="100%" className="tarot__archBottom" />
        </linearGradient>
      </defs>

      {/* 바탕 */}
      <rect width="300" height="420" className="tarot__ground" />

      {/* 이중 테두리 */}
      <rect x="9" y="9" width="282" height="402" rx="4" className="tarot__ink" fill="none" strokeWidth="1.6" />
      <rect x="16" y="16" width="268" height="388" rx="2" className="tarot__ink" fill="none" strokeWidth="0.7" />

      {/* 모서리 마름모 */}
      {[[16, 16], [284, 16], [16, 404], [284, 404]].map(([cx, cy]) => (
        <path
          key={`${cx}-${cy}`}
          d={`M${cx} ${(cy as number) - 5}l5 5-5 5-5-5z`}
          className="tarot__fillInk"
          stroke="none"
        />
      ))}

      {/* 상단 로마 숫자 */}
      <text x="150" y="49" className="tarot__numeral">{numeral}</text>

      {/* 해·달·별 — 좁은 자리에서는 뺀다 */}
      {!compact ? (
        <>
          <SunMark x={52} y={92} />
          <MoonMark x={244} y={92} />
          <Sparkle x={88} y={70} r={4} />
          <Sparkle x={212} y={66} r={3.4} />
          <Sparkle x={70} y={132} r={2.8} />
          <Sparkle x={230} y={136} r={3.2} />
        </>
      ) : null}

      {/* 아치형 만다라 */}
      <path
        d="M92 268V186c0-46 26-74 58-88 32 14 58 42 58 88v82z"
        fill={`url(#arch-${glyphKey})`}
        className="tarot__archEdge"
        strokeWidth="1.6"
      />
      <path
        d="M102 262V188c0-40 22-64 48-76 26 12 48 36 48 76v74z"
        className="tarot__ink"
        fill="none"
        strokeWidth="0.7"
      />

      {/* 만다라 안쪽 27 눈금 — 27등분 체계를 장식으로 옮긴 것 */}
      {Array.from({ length: 27 }, (_, i) => {
        const angle = (i * (360 / 27) - 90) * (Math.PI / 180)
        return (
          <circle
            key={i}
            cx={150 + Math.cos(angle) * 76}
            cy={196 + Math.sin(angle) * 76}
            r="1.1"
            className="tarot__fillAccent"
            stroke="none"
          />
        )
      })}

      {/* 상징 */}
      <foreignObject x="84" y="128" width="132" height="132">
        <div className="tarot__glyph">
          <NakshatraGlyph nakshatra={glyphKey} size={124} />
        </div>
      </foreignObject>

      {/* 밑동의 연꽃 */}
      <g transform="translate(150 302)">
        <path d="M0 0c-7 0-12-6-12-11 5-1 10 2 12 8 2-6 7-9 12-8 0 5-5 11-12 11z" className="tarot__fillAccent" stroke="none" />
        <path d="M0 0c-4-5-4-13 0-18 4 5 4 13 0 18z" className="tarot__ink" fill="none" strokeWidth="1.2" />
        <path d="M-40 2c10-4 16 2 18 6M40 2c-10-4-16 2-18 6" className="tarot__ink" fill="none" strokeWidth="1.1" />
        <path d="M-62 6h124" className="tarot__ink" strokeWidth="0.7" />
      </g>

      {/* 키워드 배너 */}
      <g>
        <path d="M46 356h208v30H46z" className="tarot__banner" strokeWidth="1.2" />
        <path d="M52 361h196v20H52z" className="tarot__ink" fill="none" strokeWidth="0.5" />
        <text x="150" y="376" className="tarot__keyword">{keyword}</text>
      </g>

      {/* 하단 아키타입 */}
      <text x="150" y="404" className="tarot__archetype">{archetype}</text>
    </svg>
  )
}
