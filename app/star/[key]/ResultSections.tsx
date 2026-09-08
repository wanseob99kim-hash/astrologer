import Link from 'next/link'
import { NAKSHATRAS, nakshatraByKey } from '@/content/index'
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

const AXES: ReadonlyArray<{ key: keyof NakshatraRatings; icon: string; ko: string }> = [
  { key: 'wealth', icon: '💰', ko: '재물운' },
  { key: 'career', icon: '💼', ko: '직업운' },
  { key: 'love', icon: '❤️', ko: '연애운' },
  { key: 'bond', icon: '🔗', ko: '인연운' },
  { key: 'helper', icon: '🍀', ko: '귀인운' },
]

/** 다섯 축을 한눈에 보는 요약표. 상세는 아래 카드가 맡는다. */
export function GradeSummary({ ratings }: { ratings: NakshatraRatings }) {
  return (
    <ul className="grades">
      {AXES.map((axis) => (
        <li key={axis.key}>
          <span className="grades__name">
            <span aria-hidden="true">{axis.icon}</span> {axis.ko}
          </span>
          <span className={`grades__badge grades__badge--${grade(ratings[axis.key]).replace('+', 'p')}`}>
            {grade(ratings[axis.key])}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** 한 축의 상세. 결론을 굵게 먼저 주고 항목으로 푼다. */
export function FortuneCards({ nakshatra }: { nakshatra: Nakshatra }) {
  const blocks = [
    { key: 'wealth' as const, icon: '💰', ko: '재물운', axis: nakshatra.wealth },
    { key: 'career' as const, icon: '💼', ko: '직업운', axis: nakshatra.work },
    { key: 'love' as const, icon: '❤️', ko: '연애운', axis: nakshatra.love },
  ]

  return (
    <div className="fortune">
      {blocks.map((block) => (
        <section key={block.key} className="fortune__item">
          <header className="fortune__head">
            <span className="fortune__name">
              <span aria-hidden="true">{block.icon}</span> {block.ko}
            </span>
            <span className={`grades__badge grades__badge--${grade(nakshatra.ratings[block.key]).replace('+', 'p')}`}>
              {grade(nakshatra.ratings[block.key])}
            </span>
          </header>
          <p className="fortune__headline">{block.axis.headline}</p>
          <ul className="fortune__points">
            {block.axis.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </section>
      ))}

      <section className="fortune__item">
        <header className="fortune__head">
          <span className="fortune__name"><span aria-hidden="true">🔗</span> 인연운</span>
          <span className={`grades__badge grades__badge--${grade(nakshatra.ratings.bond).replace('+', 'p')}`}>
            {grade(nakshatra.ratings.bond)}
          </span>
        </header>
        <p className="fortune__body">{nakshatra.bond}</p>
      </section>

      <section className="fortune__item">
        <header className="fortune__head">
          <span className="fortune__name"><span aria-hidden="true">🍀</span> 귀인운</span>
          <span className={`grades__badge grades__badge--${grade(nakshatra.ratings.helper).replace('+', 'p')}`}>
            {grade(nakshatra.ratings.helper)}
          </span>
        </header>
        <p className="fortune__body">{nakshatra.helper}</p>
      </section>
    </div>
  )
}

/** 성격 깊게 보기. 강점과 그림자를 이모지 카드로 나눠 보여준다. */
export function PersonalityCards({ nakshatra }: { nakshatra: Nakshatra }) {
  const strengthIcons = ['🎯', '🌱', '🔥']
  const shadowIcons = ['🌘', '🫧', '🧩']

  const cards = [
    ...nakshatra.strengths.slice(0, 3).map((body, i) => ({
      icon: strengthIcons[i] ?? '🎯',
      tone: 'good' as const,
      body,
    })),
    ...nakshatra.shadows.slice(0, 3).map((body, i) => ({
      icon: shadowIcons[i] ?? '🌘',
      tone: 'watch' as const,
      body,
    })),
  ]

  return (
    <div className="traits">
      {cards.map((card) => (
        <article key={card.body} className={`traits__card traits__card--${card.tone}`}>
          <span className="traits__icon" aria-hidden="true">{card.icon}</span>
          <p className="traits__body">{card.body}</p>
        </article>
      ))}
    </div>
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

/**
 * 목성이 하늘을 한 바퀴 도는 데 12년.
 * 전통에서 같은 기운이 다시 돌아오는 주기로 본다.
 */
export const RETURN_CYCLE_YEARS = 12

/**
 * 지금 나이 기준으로 아직 오지 않은 전성기 구간.
 *
 * 타고난 전성기가 이미 지났으면 12년 주기를 더해 다음 구간을 찾는다.
 * 그러지 않으면 46세인 사람에게 34~42세를 '다음 전성기'라고 부르게 된다.
 */
export function upcomingPeak(from: number, to: number, age?: number) {
  if (age === undefined) return { from, to, isFirst: true, passed: 0 }
  let start = from
  let end = to
  let passed = 0
  while (age > end) {
    start += RETURN_CYCLE_YEARS
    end += RETURN_CYCLE_YEARS
    passed += 1
  }
  return { from: start, to: end, isFirst: passed === 0, passed }
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

/** 황도 360도를 27칸으로 나눈 한 칸의 크기. 계산 엔진이 쓰는 값과 같다. */
const SEGMENT_DEGREES = 360 / 27

/** 한 칸을 넷으로 나눈 파다. 전통에서 인생의 네 가지 목적에 붙여 읽는다. */
const PADA_MEANING = [
  {
    ko: '방향',
    body: '무엇이 옳은지부터 정하고 나서야 몸이 움직입니다. 명분이 안 서면 아무리 좋은 조건이어도 손이 안 갑니다.',
  },
  {
    ko: '현실',
    body: '먹고사는 쪽에 힘이 실려 있습니다. 손에 잡히는 결과로 확인돼야 마음이 놓이고, 그래서 실속을 잘 챙깁니다.',
  },
  {
    ko: '관계',
    body: '사람과 하고 싶은 마음에 힘이 실려 있습니다. 무엇을 하느냐보다 누구와 하느냐가 결과를 더 크게 바꿉니다.',
  },
  {
    ko: '비움',
    body: '쥐고 있던 것을 한 번 놓는 자리입니다. 크게 정리하고 난 뒤에야 진짜 자기 것이 보이는 흐름을 탑니다.',
  },
] as const

interface MoonPlacementProps {
  nakshatra: Nakshatra
  /** 계산 결과. 없으면(유형 설명 페이지) 일반 설명만 보여준다. */
  result?: { moonLongitude: number; pada: number; isPadaReliable: boolean }
}

/**
 * 달이 있던 자리가 내 운명에서 무엇을 뜻하는지.
 *
 * 각도나 세차 같은 천문 설명은 읽는 사람에게 쓸모가 없다.
 * 대신 전통이 실제로 해석에 쓰는 것 — 칸 안에서의 위치(초입·한가운데·끝자락)와
 * 파다(네 등분) — 만 남긴다.
 */
export function MoonPlacement({ nakshatra, result }: MoonPlacementProps) {
  if (!result) {
    return (
      <p className="peakStory">
        인도에서는 태어난 순간 <strong>달</strong>이 있던 자리를 가장 중요하게 봅니다.
        태양이 밖으로 드러나는 자리라면, 달은 마음이 움직이는 방식입니다.
        위 그림에서 표시된 칸이 {nakshatra.archetype} — 이 사람의 마음이 기본으로 돌아오는 자리입니다.
      </p>
    )
  }

  const into = ((result.moonLongitude % SEGMENT_DEGREES) + SEGMENT_DEGREES) % SEGMENT_DEGREES
  const ratio = into / SEGMENT_DEGREES

  const prev = NAKSHATRAS[(nakshatra.index + 26) % 27]
  const next = NAKSHATRAS[(nakshatra.index + 1) % 27]

  const stage = ratio < 1 / 3
    ? {
        label: '칸의 초입',
        body: `${nakshatra.archetype}의 성질이 다듬어지기 전의 날것으로 나옵니다. 좋을 때는 거침없고, 나쁠 때는 조절이 안 됩니다. 앞 칸인 ${prev?.archetype ?? ''}의 여운이 남아 있어 마무리하는 습관이 같이 붙어 있습니다.`,
      }
    : ratio < 2 / 3
      ? {
          label: '칸의 한가운데',
          body: `${nakshatra.archetype}의 성질이 가장 진하게 나옵니다. 위에서 읽은 설명이 거의 그대로 맞는 자리입니다. 흔들림이 적은 대신, 이 유형의 약점도 그만큼 선명하게 나타납니다.`,
        }
      : {
          label: '칸의 끝자락',
          body: `${nakshatra.archetype}의 성질에 다음 칸인 ${next?.archetype ?? ''}의 기운이 섞입니다. 두 방향 사이에서 자주 흔들리지만, 한쪽만 가진 사람이 못 하는 일을 해냅니다. 나이가 들수록 뒤쪽 성질이 강해집니다.`,
        }

  const pada = PADA_MEANING[Math.min(Math.max(result.pada, 1), 4) - 1]

  return (
    <>
      <p className="peakStory">
        인도에서는 태어난 순간 <strong>달</strong>이 있던 자리를 가장 중요하게 봅니다.
        태양이 밖으로 드러나는 자리라면, 달은 마음이 움직이는 방식입니다.
        내 달은 {nakshatra.archetype} 칸에 있었습니다. 힘들 때 돌아오는 자리,
        아무도 안 볼 때 나오는 반응이 여기서 정해집니다.
      </p>

      <div className="peakBox">
        <p className="peakBox__title" style={{ color: 'var(--lapis)' }}>{stage.label}에 있습니다</p>
        <p style={{ margin: '10px 0 0', lineHeight: 1.8 }}>{stage.body}</p>
      </div>

      {pada ? (
        <div className="peakBox peakBox--do">
          <p className="peakBox__title" style={{ color: 'var(--marigold)' }}>
            힘이 실린 곳 · {pada.ko}
          </p>
          <p style={{ margin: '10px 0 0', lineHeight: 1.8 }}>{pada.body}</p>
          <p className="small" style={{ marginTop: 10 }}>
            {result.isPadaReliable
              ? '한 칸을 다시 넷으로 나눈 자리(파다)로 봤습니다. 같은 탄생별이라도 여기서 사람이 갈립니다.'
              : '태어난 시간을 모르면 이 자리는 정해지지 않습니다. 정오 기준으로 잡은 값이라 참고만 하세요.'}
          </p>
        </div>
      ) : null}
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
