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
  /** 회화 삽화 주소. 있으면 아치 안이 벡터 상징 대신 이 그림으로 채워진다. */
  artUrl?: string
  width?: number | string
}

export function NakshatraCard({
  index,
  glyphKey,
  archetype,
  keyword,
  accent,
  compact = false,
  artUrl,
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
        {/* 상징 뒤에서 번지는 빛. 원본 삽화의 후광을 옮긴 것. */}
        <radialGradient id={`halo-${glyphKey}`}>
          <stop offset="0%" className="tarot__haloIn" />
          <stop offset="100%" className="tarot__haloOut" />
        </radialGradient>
        {/* 아치 위에 얹는 마름모 격자. 자주색 바탕에 비단 결을 준다. */}
        <pattern id={`lattice-${glyphKey}`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 6h12M6 0v12" className="tarot__lattice" />
        </pattern>
        <radialGradient id={`star-${glyphKey}`}>
          <stop offset="0%" className="tarot__starIn" />
          <stop offset="70%" className="tarot__starMid" />
          <stop offset="100%" className="tarot__starOut" />
        </radialGradient>
        <clipPath id={`archclip-${glyphKey}`}>
          <path d="M76 274V182c0-52 32-84 74-98 42 14 74 46 74 98v92z" />
        </clipPath>
        <linearGradient id={`gild-${glyphKey}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" className="tarot__gildA" />
          <stop offset="50%" className="tarot__gildB" />
          <stop offset="100%" className="tarot__gildA" />
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

      {/* 테두리 중앙의 매듭 장식 */}
      {[[150, 16], [16, 210], [284, 210]].map(([cx, cy]) => (
        <g key={`knot-${cx}-${cy}`} transform={`translate(${cx} ${cy})`}>
          <path d="M-7 0 0-6 7 0 0 6z" className="tarot__ink" fill="none" strokeWidth="1" />
          <circle r="1.6" className="tarot__fillInk" stroke="none" />
        </g>
      ))}

      {/* 모서리 당초문 — 네 귀퉁이를 돌려 찍는다 */}
      {[[22, 22, 0], [278, 22, 90], [278, 398, 180], [22, 398, 270]].map(([x, y, rot]) => (
        <g key={`scroll-${x}-${y}`} transform={`translate(${x} ${y}) rotate(${rot})`}>
          <path d="M0 14C0 6 6 0 14 0" className="tarot__ink" fill="none" strokeWidth="0.9" />
          <path d="M2 22c0-8 4-14 10-16M22 2c-8 0-14 4-16 10" className="tarot__ink" fill="none" strokeWidth="0.7" />
          <circle cx="5" cy="5" r="1.4" className="tarot__fillInk" stroke="none" />
          <path d="M9 12c2-2 5-2 6 1-3 1-5 1-6-1zM12 9c-2 2-2 5 1 6 1-3 1-5-1-6z" className="tarot__fillAccent" stroke="none" />
        </g>
      ))}

      {/* 상단 로마 숫자 */}
      <text x="150" y="49" className="tarot__numeral">{numeral}</text>
      <path d="M62 44h50M188 44h50" className="tarot__ink" strokeWidth="0.6" />
      <circle cx="58" cy="44" r="1.4" className="tarot__fillInk" stroke="none" />
      <circle cx="242" cy="44" r="1.4" className="tarot__fillInk" stroke="none" />

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
        d="M76 274V182c0-52 32-84 74-98 42 14 74 46 74 98v92z"
        fill={`url(#arch-${glyphKey})`}
        className="tarot__archEdge"
        strokeWidth="1.6"
      />
      <path
        d="M76 274V182c0-52 32-84 74-98 42 14 74 46 74 98v92z"
        fill={`url(#lattice-${glyphKey})`}
        stroke="none"
      />
      <path
        d="M86 268V184c0-46 28-74 64-86 36 12 64 40 64 86v84z"
        className="tarot__ink"
        fill="none"
        strokeWidth="0.7"
      />
      <path
        d="M70 274V180c0-56 34-90 80-104 46 14 80 48 80 104v94"
        className="tarot__ink"
        fill="none"
        strokeWidth="0.6"
        strokeDasharray="2 3"
      />

      {artUrl ? (
        <>
          {/* 회화 삽화. 아치 모양으로 잘라 넣고 가장자리를 금선으로 마감한다. */}
          <image
            href={artUrl}
            x="76"
            y="84"
            width="148"
            height="190"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#archclip-${glyphKey})`}
          />
          <path
            d="M76 274V182c0-52 32-84 74-98 42 14 74 46 74 98v92z"
            fill="none"
            className="tarot__archEdge"
            strokeWidth="1.6"
          />
        </>
      ) : null}

      {/* 상징 뒤 후광 — 꽃잎·고리·빛살은 아치 안에서만 보인다 */}
      <g clipPath={`url(#archclip-${glyphKey})`} display={artUrl ? 'none' : undefined}>
      <circle cx="150" cy="196" r="62" fill={`url(#halo-${glyphKey})`} />

      {/* 팔각 별 — 두 정사각형을 45도로 겹친다. 인도 얀트라의 기본 도형. */}
      <g transform="translate(150 196)">
        <rect x="-58" y="-58" width="116" height="116" fill={`url(#star-${glyphKey})`} className="tarot__starEdge" transform="rotate(45)" />
        <rect x="-58" y="-58" width="116" height="116" fill={`url(#star-${glyphKey})`} className="tarot__starEdge" />
        <rect x="-40" y="-40" width="80" height="80" fill="none" className="tarot__starEdge2" transform="rotate(45)" />
        <rect x="-40" y="-40" width="80" height="80" fill="none" className="tarot__starEdge2" />
        {/* 큰 연꽃잎 8장 */}
        {Array.from({ length: 8 }, (_, i) => (
          <path
            key={`lotus-${i}`}
            d="M0-30c9-14 22-30 24-56-14 8-24 24-24 56zM0-30c-9-14-22-30-24-56 14 8 24 24 24 56z"
            transform={`rotate(${i * 45})`}
            className="tarot__lotus"
          />
        ))}
      </g>

      {/* 꽃잎 만다라 — 16잎 두 겹 */}
      {Array.from({ length: 16 }, (_, i) => (
        <ellipse
          key={`petal-${i}`}
          cx="150"
          cy="140"
          rx="7"
          ry="20"
          transform={`rotate(${i * 22.5} 150 196)`}
          className="tarot__petal"
        />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <ellipse
          key={`petal2-${i}`}
          cx="150"
          cy="150"
          rx="4.5"
          ry="13"
          transform={`rotate(${i * 22.5 + 11.25} 150 196)`}
          className="tarot__petalIn"
        />
      ))}
      <circle cx="150" cy="196" r="46" className="tarot__ring" fill="none" />
      <circle cx="150" cy="196" r="52" className="tarot__ring" fill="none" strokeDasharray="1.5 4" />

      {/* 아치 안에서 뻗는 빛살 */}
      {Array.from({ length: 36 }, (_, i) => {
        const angle = (i * 10 - 90) * (Math.PI / 180)
        return (
          <line
            key={`ray-${i}`}
            x1={150 + Math.cos(angle) * 40}
            y1={196 + Math.sin(angle) * 40}
            x2={150 + Math.cos(angle) * (i % 2 === 0 ? 70 : 62)}
            y2={196 + Math.sin(angle) * (i % 2 === 0 ? 70 : 62)}
            className="tarot__ray"
          />
        )
      })}

      </g>

      {/* 만다라 안쪽 27 눈금 — 27등분 체계를 장식으로 옮긴 것 */}
      {Array.from({ length: 27 }, (_, i) => {
        const angle = (i * (360 / 27) - 90) * (Math.PI / 180)
        return (
          <circle
            key={i}
            cx={150 + Math.cos(angle) * 86}
            cy={196 + Math.sin(angle) * 86}
            r="1.1"
            className="tarot__fillAccent"
            stroke="none"
          />
        )
      })}

      {/* 아치 안 반짝임 */}
      <g className="tarot__spark" display={artUrl ? 'none' : undefined}>
        <Sparkle x={112} y={150} r={3.2} />
        <Sparkle x={190} y={142} r={2.6} />
        <Sparkle x={106} y={236} r={2.4} />
        <Sparkle x={196} y={240} r={3} />
        <Sparkle x={150} y={116} r={2.2} />
      </g>

      {/* 상징 — 삽화가 있으면 뺀다 */}
      {!artUrl ? (
        <foreignObject x="84" y="128" width="132" height="132">
          <div className="tarot__glyph">
            <NakshatraGlyph nakshatra={glyphKey} size={128} ornate />
          </div>
        </foreignObject>
      ) : null}

      {/* 밑동의 연꽃 */}
      <g transform="translate(150 308)">
        <path d="M0 0c-7 0-12-6-12-11 5-1 10 2 12 8 2-6 7-9 12-8 0 5-5 11-12 11z" className="tarot__fillAccent" stroke="none" />
        <path d="M0 0c-4-5-4-13 0-18 4 5 4 13 0 18z" className="tarot__ink" fill="none" strokeWidth="1.2" />
        <path d="M-40 2c10-4 16 2 18 6M40 2c-10-4-16 2-18 6" className="tarot__ink" fill="none" strokeWidth="1.1" />
        <path d="M-58 4c6-6 12-4 16 0M58 4c-6-6-12-4-16 0" className="tarot__ink" fill="none" strokeWidth="0.9" />
        <path d="M-30 -2c-2-3-5-3-7 0 2 2 5 2 7 0zM30 -2c2-3 5-3 7 0-2 2-5 2-7 0z" className="tarot__fillAccent" stroke="none" />
        <path d="M-62 6h124" className="tarot__ink" strokeWidth="0.7" />
      </g>

      {/* 키워드 배너 */}
      <g>
        <path d="M46 346h208v30H46z" className="tarot__banner" strokeWidth="1.2" />
        <path d="M52 351h196v20H52z" className="tarot__ink" fill="none" strokeWidth="0.5" />
        <text x="150" y="366" className="tarot__keyword">{keyword}</text>
        <path d="M40 361l6-5 6 5-6 5zM248 361l6-5 6 5-6 5z" className="tarot__fillInk" stroke="none" />
        <path d="M46 361h-12M254 361h12" className="tarot__ink" strokeWidth="0.8" />
      </g>

      {/* 하단 아키타입 */}
      <text x="150" y="392" className="tarot__archetype">{archetype}</text>
    </svg>
  )
}
