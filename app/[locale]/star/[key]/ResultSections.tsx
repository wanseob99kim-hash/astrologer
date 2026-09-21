import Link from 'next/link'
import { contentFor, nakshatraByKey } from '@/content/index'
import type { Nakshatra, NakshatraRatings } from '@/content/types'
import { localePath, type Locale } from '@/lib/i18n'
import { messagesFor } from '@/messages/index'
import { NakshatraGlyph } from '@/app/components/NakshatraGlyph'

/**
 * 결과 화면의 읽을거리 묶음.
 *
 * 벤치마크(태국 점성술)의 결과 화면을 기준으로 삼았다.
 * 등급표, 겉모습과 속마음의 대비, 항목별 상세, 인생 3막, 다음 전성기,
 * 조심할 것, 행운 아이템, 잘 맞는 조합 — 사람들이 실제로 오래 읽는 것들이다.
 *
 * 모든 컴포넌트가 locale 을 받는다. 문자열은 messages 에서, 콘텐츠는 contentFor 에서 온다.
 */

/** 1~5 를 등급으로. 벤치마크가 쓰는 표기를 따랐다. */
const GRADE = ['C', 'B', 'A', 'A+', 'S'] as const

function grade(score: number): string {
  return GRADE[Math.min(Math.max(score, 1), 5) - 1] ?? 'B'
}

const AXIS_ICONS: Record<keyof NakshatraRatings, string> = {
  wealth: '💰', career: '💼', love: '❤️', bond: '🔗', helper: '🍀',
}
const AXIS_ORDER: ReadonlyArray<keyof NakshatraRatings> = ['wealth', 'career', 'love', 'bond', 'helper']

interface LocaleProps {
  locale: Locale
}

function Badge({ score }: { score: number }) {
  return (
    <span className={`grades__badge grades__badge--${grade(score).replace('+', 'p')}`}>{grade(score)}</span>
  )
}

/** 다섯 축을 한눈에 보는 요약표. 상세는 아래 카드가 맡는다. */
export function GradeSummary({ ratings, locale }: { ratings: NakshatraRatings } & LocaleProps) {
  const t = messagesFor(locale).sections
  return (
    <ul className="grades">
      {AXIS_ORDER.map((key) => (
        <li key={key}>
          <span className="grades__name">
            <span aria-hidden="true">{AXIS_ICONS[key]}</span> {t.axes[key]}
          </span>
          <Badge score={ratings[key]} />
        </li>
      ))}
    </ul>
  )
}

/** 한 축의 상세. 결론을 굵게 먼저 주고 항목으로 푼다. */
export function FortuneCards({ nakshatra, locale }: { nakshatra: Nakshatra } & LocaleProps) {
  const t = messagesFor(locale).sections
  const blocks = [
    { key: 'wealth' as const, axis: nakshatra.wealth },
    { key: 'career' as const, axis: nakshatra.work },
    { key: 'love' as const, axis: nakshatra.love },
  ]

  return (
    <div className="fortune">
      {blocks.map((block) => (
        <section key={block.key} className="fortune__item">
          <header className="fortune__head">
            <span className="fortune__name">
              <span aria-hidden="true">{AXIS_ICONS[block.key]}</span> {t.axes[block.key]}
            </span>
            <Badge score={nakshatra.ratings[block.key]} />
          </header>
          <p className="fortune__headline">{block.axis.headline}</p>
          <ul className="fortune__points">
            {block.axis.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </section>
      ))}

      <section className="fortune__item">
        <header className="fortune__head">
          <span className="fortune__name"><span aria-hidden="true">🔗</span> {t.axes.bond}</span>
          <Badge score={nakshatra.ratings.bond} />
        </header>
        <p className="fortune__body">{nakshatra.bond}</p>
      </section>

      <section className="fortune__item">
        <header className="fortune__head">
          <span className="fortune__name"><span aria-hidden="true">🍀</span> {t.axes.helper}</span>
          <Badge score={nakshatra.ratings.helper} />
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
    ...nakshatra.strengths.slice(0, 3).map((body, i) => ({ icon: strengthIcons[i] ?? '🎯', tone: 'good' as const, body })),
    ...nakshatra.shadows.slice(0, 3).map((body, i) => ({ icon: shadowIcons[i] ?? '🌘', tone: 'watch' as const, body })),
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

export function SelfContrast({ nakshatra, locale }: { nakshatra: Nakshatra } & LocaleProps) {
  const t = messagesFor(locale).sections
  return (
    <div className="contrast">
      <div className="contrast__row">
        <p className="contrast__label">{t.publicSelf}</p>
        <p className="contrast__value">{nakshatra.publicSelf}</p>
      </div>
      <div className="contrast__row contrast__row--true">
        <p className="contrast__label">{t.trueSelf}</p>
        <p className="contrast__value">{nakshatra.trueSelf}</p>
      </div>
    </div>
  )
}

interface ThreeActsProps extends LocaleProps {
  /** 전성기 시작 나이. 3막의 경계를 여기서 끌어온다. */
  peakFrom: number
}

export function ThreeActs({ peakFrom, locale }: ThreeActsProps) {
  const t = messagesFor(locale).sections
  const ranges = [
    t.actRangeBefore(peakFrom - 2),
    t.actRangeBetween(peakFrom - 1, peakFrom + 5),
    t.actRangeAfter(peakFrom + 6),
  ]

  return (
    <ol className="acts">
      {t.acts.map((act, i) => (
        <li key={act.label}>
          <span className="acts__meta">{act.label} · {ranges[i]}</span>
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
export function PeakChart({ from, to, locale }: { from: number; to: number } & LocaleProps) {
  const t = messagesFor(locale).sections
  const points = [from - 8, from - 4, from, to, to + 4, to + 9]
  const heights = [34, 46, 78, 84, 58, 44]
  const width = 300
  const height = 96
  const step = width / (points.length - 1)
  const path = heights.map((h, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)} ${(height - h).toFixed(1)}`).join(' ')
  const area = `${path} L${width} ${height} L0 ${height} Z`

  return (
    <figure className="peak">
      <svg viewBox={`0 0 ${width} ${height + 22}`} width="100%" role="img" aria-label={t.peakChartLabel(from, to)}>
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
            {t.ageTick(age)}
          </text>
        ))}
      </svg>
    </figure>
  )
}

export function LuckyItems({ nakshatra, locale }: { nakshatra: Nakshatra } & LocaleProps) {
  const t = messagesFor(locale).sections
  const items = [
    { label: t.luckyColor, value: nakshatra.luckyColor, swatch: nakshatra.luckyColorHex },
    { label: t.luckyNumber, value: String(nakshatra.luckyNumber) },
    { label: t.luckyDirection, value: nakshatra.direction },
    { label: t.luckyGem, value: nakshatra.gemstone },
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
      <p className="eyebrow" style={{ marginTop: 20, color: 'var(--lapis)' }}>{t.goodWork}</p>
      <ul className="chips" style={{ marginTop: 10 }}>
        {nakshatra.career.map((item) => <li key={item} className="chip">{item}</li>)}
      </ul>
    </>
  )
}

export function MatchPreview({ nakshatra, matchHref, locale }: { nakshatra: Nakshatra; matchHref: string } & LocaleProps) {
  const t = messagesFor(locale).sections
  const good = nakshatra.compatible
    .map((key) => nakshatraByKey(key, locale))
    .filter((item): item is Nakshatra => item !== undefined)
  const bad = nakshatraByKey(nakshatra.caution, locale)

  return (
    <>
      <ul className="matchList">
        {good.map((item) => (
          <li key={item.key}>
            <Link href={localePath(locale, `/star/${item.key}`)}>
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
          <p className="eyebrow" style={{ color: 'var(--marigold)' }}>{t.worstMatch}</p>
          <p style={{ margin: '8px 0 0', fontWeight: 600 }}>{bad.archetype}</p>
          <p className="small" style={{ marginTop: 2 }}>{bad.tagline}</p>
        </div>
      ) : null}

      <Link href={matchHref} className="btn" style={{ marginTop: 18 }}>{t.goMatch}</Link>
    </>
  )
}

/** 황도 360도를 27칸으로 나눈 한 칸의 크기. 계산 엔진이 쓰는 값과 같다. */
const SEGMENT_DEGREES = 360 / 27

interface MoonPlacementProps extends LocaleProps {
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
export function MoonPlacement({ nakshatra, result, locale }: MoonPlacementProps) {
  const t = messagesFor(locale).sections
  if (!result) {
    return <p className="peakStory">{t.moonIntro(nakshatra.archetype)}</p>
  }

  const into = ((result.moonLongitude % SEGMENT_DEGREES) + SEGMENT_DEGREES) % SEGMENT_DEGREES
  const ratio = into / SEGMENT_DEGREES

  const { nakshatras } = contentFor(locale)
  const prev = nakshatras[(nakshatra.index + 26) % 27]
  const next = nakshatras[(nakshatra.index + 1) % 27]

  const stage = ratio < 1 / 3
    ? { label: t.stageEarly.label, body: t.stageEarly.body(nakshatra.archetype, prev?.archetype ?? '') }
    : ratio < 2 / 3
      ? { label: t.stageMiddle.label, body: t.stageMiddle.body(nakshatra.archetype) }
      : { label: t.stageLate.label, body: t.stageLate.body(nakshatra.archetype, next?.archetype ?? '') }

  const pada = t.pada[Math.min(Math.max(result.pada, 1), 4) - 1]

  return (
    <>
      <p className="peakStory">{t.moonMine(nakshatra.archetype)}</p>

      <div className="peakBox">
        <p className="peakBox__title" style={{ color: 'var(--lapis)' }}>{t.stageTitle(stage.label)}</p>
        <p style={{ margin: '10px 0 0', lineHeight: 1.8 }}>{stage.body}</p>
      </div>

      {pada ? (
        <div className="peakBox peakBox--do">
          <p className="peakBox__title" style={{ color: 'var(--marigold)' }}>{t.padaTitle(pada.ko)}</p>
          <p style={{ margin: '10px 0 0', lineHeight: 1.8 }}>{pada.body}</p>
          <p className="small" style={{ marginTop: 10 }}>{result.isPadaReliable ? t.padaReliable : t.padaUnreliable}</p>
        </div>
      ) : null}
    </>
  )
}
