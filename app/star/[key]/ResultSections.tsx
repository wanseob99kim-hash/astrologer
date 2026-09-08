import Link from 'next/link'
import { nakshatraByKey } from '@/content/index'
import type { Nakshatra, NakshatraRatings } from '@/content/types'
import { NakshatraGlyph } from '../../components/NakshatraGlyph'

/**
 * 결과 화면의 읽을거리 묶음.
 *
 * 벤치마크(태국 점성술)의 결과 화면을 기준으로 삼았다.
 * 등급표, 겉모습과 속마음의 대비, 항목별 상세, 인생 3막, 다음 전성기,
 * 조심할 것, 행운 아이템, 잘 맞는 조합 — 사람들이 실제로 오래 읽는 것들이다.
 */

/** 1~5 를 등급으로. 벤치마크가 쓰는 표기를 따랐다. */
const GRADE = ['C', 'B', 'A', 'A+', 'S'] as const

function grade(score: number): string {
  return GRADE[Math.min(Math.max(score, 1), 5) - 1] ?? 'B'
}

const AXES: ReadonlyArray<{ key: keyof NakshatraRatings; ko: string; lead: string }> = [
  { key: 'wealth', ko: '재물운', lead: '모으고 불리는 힘' },
  { key: 'career', ko: '직업운', lead: '자리에서 성과를 내는 힘' },
  { key: 'love', ko: '연애운', lead: '끌어당기고 표현하는 힘' },
  { key: 'bond', ko: '인연복', lead: '오래 이어가는 힘' },
  { key: 'helper', ko: '귀인운', lead: '도와줄 사람이 나타나는 힘' },
]

export function GradeTable({ ratings }: { ratings: NakshatraRatings }) {
  return (
    <ul className="grades">
      {AXES.map((axis) => (
        <li key={axis.key}>
          <span className="grades__name">
            {axis.ko}
            <span className="grades__lead">{axis.lead}</span>
          </span>
          <span className={`grades__badge grades__badge--${grade(ratings[axis.key]).replace('+', 'p')}`}>
            {grade(ratings[axis.key])}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function SelfContrast({ nakshatra }: { nakshatra: Nakshatra }) {
  return (
    <div className="contrast">
      <div className="contrast__row">
        <p className="contrast__label">사람들이 보는 나</p>
        <p className="contrast__value">{nakshatra.publicSelf}</p>
      </div>
      <div className="contrast__row contrast__row--true">
        <p className="contrast__label">진짜 나</p>
        <p className="contrast__value">{nakshatra.trueSelf}</p>
      </div>
    </div>
  )
}

interface ThreeActsProps {
  /** 전성기 시작 나이. 3막의 경계를 여기서 끌어온다. */
  peakFrom: number
}

export function ThreeActs({ peakFrom }: ThreeActsProps) {
  const acts = [
    { label: '1막', range: `~${peakFrom - 2}세`, title: '재료를 모으는 시기', body: '많이 겪고 많이 옮깁니다. 낭비 같지만 나중에 전부 재료가 됩니다.' },
    { label: '2막', range: `${peakFrom - 1}~${peakFrom + 5}세`, title: '하나로 모이는 시기', body: '흩어져 있던 경험과 인맥이 처음으로 한 기회에 모입니다.' },
    { label: '3막', range: `${peakFrom + 6}세~`, title: '남길 것을 고르는 시기', body: '넓히기보다 무엇을 남길지 정할 차례입니다.' },
  ]

  return (
    <ol className="acts">
      {acts.map((act) => (
        <li key={act.label}>
          <span className="acts__meta">{act.label} · {act.range}</span>
          <span className="acts__title">{act.title}</span>
          <span className="acts__body">{act.body}</span>
        </li>
      ))}
    </ol>
  )
}

/** 전성기 곡선. 값은 유형의 전성기 구간에서 만든다. */
export function PeakChart({ from, to }: { from: number; to: number }) {
  const points = [from - 8, from - 4, from, to, to + 4, to + 9]
  const heights = [34, 46, 78, 84, 58, 44]
  const width = 300
  const height = 96
  const step = width / (points.length - 1)
  const path = heights.map((h, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)} ${(height - h).toFixed(1)}`).join(' ')
  const area = `${path} L${width} ${height} L0 ${height} Z`

  return (
    <figure className="peak">
      <svg viewBox={`0 0 ${width} ${height + 22}`} width="100%" role="img" aria-label={`${from}세부터 ${to}세까지 흐름이 올라갑니다`}>
        <path d={area} className="peak__area" />
        <path d={path} className="peak__line" fill="none" />
        {heights.map((h, i) => (
          <circle
            key={points[i]}
            cx={(i * step).toFixed(1)}
            cy={(height - h).toFixed(1)}
            r={i === 2 || i === 3 ? 5 : 3.2}
            className={i === 2 || i === 3 ? 'peak__dot peak__dot--on' : 'peak__dot'}
          />
        ))}
        {points.map((age, i) => (
          <text
            key={`label-${age}`}
            x={Math.min(Math.max(i * step, 12), width - 12)}
            y={height + 17}
            className={i === 2 || i === 3 ? 'peak__tick peak__tick--on' : 'peak__tick'}
          >
            {age}세
          </text>
        ))}
      </svg>
    </figure>
  )
}

export function LuckyItems({ nakshatra }: { nakshatra: Nakshatra }) {
  const items = [
    { label: '행운의 색', value: nakshatra.luckyColor, swatch: nakshatra.luckyColorHex },
    { label: '행운의 숫자', value: String(nakshatra.luckyNumber) },
    { label: '행운의 방향', value: nakshatra.direction },
    { label: '행운의 보석', value: nakshatra.gemstone },
  ]

  return (
    <>
      <dl className="itemGrid">
        {items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              {item.swatch ? <span className="swatch" style={{ background: item.swatch }} /> : null}
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="eyebrow" style={{ marginTop: 20, color: 'var(--lapis)' }}>잘 맞는 일</p>
      <ul className="chips" style={{ marginTop: 10 }}>
        {nakshatra.career.map((item) => <li key={item} className="chip">{item}</li>)}
      </ul>
    </>
  )
}

export function MatchPreview({ nakshatra, matchHref }: { nakshatra: Nakshatra; matchHref: string }) {
  const good = nakshatra.compatible
    .map((key) => nakshatraByKey(key))
    .filter((item): item is Nakshatra => item !== undefined)
  const bad = nakshatraByKey(nakshatra.caution)

  return (
    <>
      <ul className="matchList">
        {good.map((item) => (
          <li key={item.key}>
            <Link href={`/star/${item.key}`}>
              <span className="matchList__glyph glyphTint" style={{ ['--glyph' as string]: item.luckyColorHex }}>
                <NakshatraGlyph nakshatra={item.key} size={26} />
              </span>
              <span>
                <span className="matchList__name">{item.archetype}</span>
                <span className="small" style={{ display: 'block' }}>{item.tagline}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {bad ? (
        <div className="matchList__warn">
          <p className="eyebrow" style={{ color: 'var(--marigold)' }}>제일 조심할 조합</p>
          <p style={{ margin: '8px 0 0', fontWeight: 600 }}>{bad.archetype}</p>
          <p className="small" style={{ marginTop: 2 }}>{bad.tagline}</p>
        </div>
      ) : null}

      <Link href={matchHref} className="btn" style={{ marginTop: 18 }}>
        연인 궁합 보러 가기
      </Link>
    </>
  )
}
