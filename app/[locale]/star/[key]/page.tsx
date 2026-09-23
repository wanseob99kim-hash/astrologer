import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { nakshatraByKey } from '@/content/index'
import { cardArtUrl } from '@/content/cardArt'
import { computeLevelOne, computeLevelZero, planetName } from '@/lib/astro/engine'
import { parseBirthInput } from '@/lib/astro/input'
import type { LevelOneResult, LevelZeroResult } from '@/lib/astro/types'
import { localePath, resolveLocale } from '@/lib/i18n'
import { absoluteUrl } from '@/lib/seo'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { NakshatraCard } from '@/app/components/NakshatraCard'
import { NakshatraWheel } from '@/app/components/NakshatraWheel'
import { ShareButtons } from '@/app/components/ShareButtons'
import { DashaTimeline } from './DashaTimeline'
import {
  FortuneCards,
  GradeSummary,
  LuckyItems,
  MoonPlacement,
  PersonalityCards,
  MatchPreview,
  PeakChart,
  RETURN_CYCLE_YEARS,
  SelfContrast,
  ThreeActs,
  upcomingPeak,
} from './ResultSections'

interface PageProps {
  params: Promise<{ locale: string; key: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

/** 인도에서 쓰는 샤카력. 서기에서 78을 뺀다. */
const SHAKA_OFFSET = 78

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, key } = await params
  const locale = resolveLocale(raw)
  const t = messagesFor(locale)
  const nakshatra = nakshatraByKey(key, locale)
  if (!nakshatra) return { title: t.site.notFoundTitle }
  return {
    title: t.star.metaTitle(nakshatra.archetype, nakshatra.tagline),
    description: nakshatra.copy,
    // 쿼리에 생년월일이 실린 개인 결과 주소가 따로 색인되지 않도록 정규 주소를 고정한다.
    alternates: { canonical: absoluteUrl(localePath(locale, `/star/${nakshatra.key}`)) },
    openGraph: {
      title: t.star.ogTitle(nakshatra.archetype),
      description: nakshatra.tagline,
      images: [{ url: absoluteUrl(`/og/${locale}/${nakshatra.key}.jpg`), width: 1200, height: 630, alt: nakshatra.archetype }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.star.ogTitle(nakshatra.archetype),
      description: nakshatra.tagline,
      images: [absoluteUrl(`/og/${locale}/${nakshatra.key}.jpg`)],
    },
  }
}

export default async function StarPage({ params, searchParams }: PageProps) {
  const { locale: raw, key } = await params
  const locale = resolveLocale(raw)
  const t = messagesFor(locale)
  const href = (p: string) => localePath(locale, p)
  const nakshatra = nakshatraByKey(key, locale)
  if (!nakshatra) notFound()

  const query = await searchParams
  let result: LevelOneResult | null = null
  let zero: LevelZeroResult | null = null
  let nickname: string | undefined
  let birthYear: number | undefined
  let age: number | undefined
  let correctedHref: string | null = null

  try {
    const input = parseBirthInput({
      date: first(query.d),
      time: first(query.t),
      place: first(query.p),
      nickname: first(query.n),
    })
    nickname = input.nickname
    result = computeLevelOne(input, locale)
    zero = computeLevelZero(input, locale)
    birthYear = Number(input.date.slice(0, 4))
    age = new Date().getUTCFullYear() - birthYear

    // 주소의 탄생별과 계산 결과가 다르면 올바른 주소로 보낸다.
    if (result.nakshatra.key !== nakshatra.key) {
      const corrected = new URLSearchParams(
        Object.entries(query).flatMap(([k, v]) => {
          const value = first(v)
          return value ? [[k, value] as [string, string]] : []
        }),
      )
      correctedHref = href(`/star/${result.nakshatra.key}?${corrected}`)
    }
  } catch {
    // 생년월일 없이 열린 공유 링크. 유형 설명만 보여준다.
    result = null
  }

  // redirect() 는 특수 예외를 던지므로 반드시 try 밖에서 호출한다.
  if (correctedHref) redirect(correctedHref)

  const matchParams = new URLSearchParams()
  if (result) {
    matchParams.set('d', first(query.d) ?? '')
    const time = first(query.t)
    if (time) matchParams.set('t', time)
    if (nickname) matchParams.set('n', nickname)
  }
  const matchHref = href(`/match?${matchParams}`)
  // 공유 주소. 결과가 있으면 생년월일 쿼리를 실어 상대도 같은 결과를 본다.
  const shareQuery = new URLSearchParams()
  if (result) {
    shareQuery.set('d', first(query.d) ?? '')
    const time = first(query.t)
    if (time) shareQuery.set('t', time)
  }
  const sharePath = href(`/star/${nakshatra.key}${shareQuery.toString() ? `?${shareQuery}` : ''}`)
  const who = nickname ? t.star.honorific(nickname) : t.star.you
  const peak = upcomingPeak(nakshatra.peak.from, nakshatra.peak.to, age)
  const isProvisional = result !== null && !result.isTimeKnown
  const isInPeak = age !== undefined && age >= peak.from && age <= peak.to

  return (
    <div className="shell">
      <header className="resultHead">
        <p className="eyebrow eyebrow--latin">{t.star.nakshatraNo(String(nakshatra.index + 1).padStart(2, '0'))}</p>
        {result ? <p className="small" style={{ marginTop: 10 }}>{t.star.yourStarIs(who)}</p> : null}

        <div className="cardHero">
          <NakshatraCard
            index={nakshatra.index}
            glyphKey={nakshatra.key}
            artUrl={cardArtUrl(nakshatra.key, locale)}
            archetype={nakshatra.archetype}
            keyword={nakshatra.keyword}
            accent={nakshatra.luckyColorHex}
          />
        </div>

        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 18 }}>{nakshatra.archetype}</h1>
        <p style={{ margin: '8px 0 0', fontSize: 'var(--step-1)', color: 'var(--ink-2)' }}>{nakshatra.tagline}</p>
        <p className="names">
          {nakshatra.ko !== nakshatra.sanskrit ? `${nakshatra.ko} · ` : ''}{nakshatra.sanskrit} · <span className="dev">{nakshatra.devanagari}</span>
        </p>
      </header>

      <main>
        {isProvisional ? (
          <div className="notice" style={{ marginTop: 22 }}>
            <span aria-hidden="true">✦</span>
            <span>
              {t.star.provisionalA}<b>{t.star.provisionalB}</b>{t.star.provisionalC}<b>{t.star.provisionalD}</b>
            </span>
          </div>
        ) : null}

        <p className="resultLede">{nakshatra.copy}</p>

        {result && zero ? (
          <section className="sect">
            <h2 className="sect__title">{t.star.vedicView(who)}</h2>
            <p className="small">{t.star.vedicViewSub}</p>
            <dl className="itemGrid itemGrid--wide">
              <div><dt>{t.star.grid.star}</dt><dd>{nakshatra.ko} · {nakshatra.archetype}</dd></div>
              <div><dt>{t.star.grid.lord}</dt><dd>{planetName(nakshatra.lord, locale)}</dd></div>
              <div><dt>{t.star.grid.deity}</dt><dd>{nakshatra.deityKo}</dd></div>
              <div><dt>{t.star.grid.symbol}</dt><dd>{nakshatra.symbolKo}</dd></div>
              <div><dt>{t.star.grid.graha}</dt><dd>{zero.graha.ko}</dd></div>
              <div><dt>{t.star.grid.weekday}</dt><dd>{zero.weekdayKo}</dd></div>
              <div><dt>{t.star.grid.moon}</dt><dd>{result.moonRashi} {result.moonLongitude.toFixed(1)}°</dd></div>
              <div><dt>{t.star.grid.gana}</dt><dd>{t.star.gana[nakshatra.gana] ?? nakshatra.gana}</dd></div>
              <div><dt>{t.star.grid.yoni}</dt><dd>{nakshatra.yoniKo}</dd></div>
              <div><dt>{t.star.grid.moolank}</dt><dd>{zero.moolank} · {zero.graha.keyword}</dd></div>
              <div><dt>{t.star.grid.bhagyank}</dt><dd>{zero.bhagyank} · {zero.destinyGraha.keyword}</dd></div>
              <div><dt>{t.star.grid.color}</dt><dd><span className="swatch" style={{ background: nakshatra.luckyColorHex }} />{nakshatra.luckyColor}</dd></div>
              <div><dt>{t.star.grid.direction}</dt><dd>{nakshatra.direction}</dd></div>
              <div><dt>{t.star.grid.pada}</dt><dd>{result.isPadaReliable ? t.star.grid.padaValue(result.pada) : t.star.grid.padaUnknown}</dd></div>
              <div><dt>{t.star.grid.calendar}</dt><dd>{t.star.grid.shaka((birthYear ?? 0) - SHAKA_OFFSET)}</dd></div>
            </dl>
          </section>
        ) : null}

        <section className="sect">
          <h2 className="sect__title">{t.star.thisPerson(who)}</h2>
          <SelfContrast nakshatra={nakshatra} locale={locale} />
        </section>

        <section className="sect">
          <h2 className="sect__title">{t.star.personality}</h2>
          <p className="small">{t.star.personalitySub}</p>
          <PersonalityCards nakshatra={nakshatra} />
        </section>

        <section className="sect">
          <h2 className="sect__title">{t.star.stats}</h2>
          <p className="small">{t.star.statsSub}</p>
          <GradeSummary ratings={nakshatra.ratings} locale={locale} />
        </section>

        <section className="sect">
          <h2 className="sect__title">{t.star.byAxis}</h2>
          <FortuneCards nakshatra={nakshatra} locale={locale} />
        </section>

        <section className="sect">
          <h2 className="sect__title">{t.star.threeActs}</h2>
          <ThreeActs peakFrom={nakshatra.peak.from} locale={locale} />
        </section>

        <section className="sect">
          <h2 className="sect__title">{isInPeak ? t.star.peakNow : t.star.peakNext}</h2>
          <p className="peakRange">{t.star.ageRange(peak.from, peak.to)}</p>
          {age !== undefined ? (
            <p className="small">
              {t.star.ageNow(age)} · {age < peak.from ? t.star.yearsLeft(peak.from - age) : age <= peak.to ? t.star.inMiddle : ''}
            </p>
          ) : null}
          {!peak.isFirst ? (
            <p className="small" style={{ marginTop: 6 }}>
              {t.star.firstPeakPassed(nakshatra.peak.from, nakshatra.peak.to, RETURN_CYCLE_YEARS)}
            </p>
          ) : null}
          <PeakChart from={peak.from} to={peak.to} locale={locale} />

          <p className="peakStory">{t.star.peakIntro(peak.from, peak.to)} {nakshatra.peak.story}</p>

          {!peak.isFirst ? <p className="peakStory">{t.star.peakNth(peak.passed + 1)}</p> : null}

          <div className="peakBox">
            <p className="peakBox__title" style={{ color: 'var(--lapis)' }}>{t.star.signals}</p>
            <ul className="bullets" style={{ marginTop: 10 }}>
              {nakshatra.peak.signals.map((v) => <li key={v}>{v}</li>)}
            </ul>
          </div>

          <div className="peakBox peakBox--do">
            <p className="peakBox__title" style={{ color: 'var(--marigold)' }}>{t.star.actions}</p>
            <ul className="bullets" style={{ marginTop: 10 }}>
              {nakshatra.peak.actions.map((v) => <li key={v}>{v}</li>)}
            </ul>
          </div>

          <p className="peakMiss">
            <strong>{t.star.miss}</strong> · {nakshatra.peak.miss}
          </p>
        </section>

        <section className="sect sect--warn">
          <h2 className="sect__title">{t.star.cautions}</h2>
          <ul className="bullets bullets--warn">
            {nakshatra.cautions.map((v) => <li key={v}>{v}</li>)}
          </ul>
        </section>

        {result ? (
          <section className="sect">
            <h2 className="sect__title">{t.star.lifeFlow}</h2>
            <p className="small">{t.star.lifeFlowSub}</p>
            <DashaTimeline timeline={result.dasha.timeline} locale={locale} />
          </section>
        ) : null}

        <section className="sect">
          <h2 className="sect__title">{t.star.lucky}</h2>
          <LuckyItems nakshatra={nakshatra} locale={locale} />
          <div className="ritual">
            <p className="eyebrow" style={{ color: 'var(--marigold)' }}>{t.star.ritual}</p>
            <p style={{ margin: '8px 0 0' }}>{nakshatra.ritual}</p>
            <p className="small" style={{ marginTop: 10 }}>{t.star.ritualNote}</p>
          </div>
        </section>

        <section className="sect">
          <h2 className="sect__title">{t.star.matches}</h2>
          <MatchPreview nakshatra={nakshatra} matchHref={result ? matchHref : href('/birth')} locale={locale} />
        </section>

        <section className="sect">
          <h2 className="sect__title">{t.star.moonPlace}</h2>
          <NakshatraWheel
            activeIndex={nakshatra.index}
            glyphKey={nakshatra.key}
            moonLongitude={result?.moonLongitude}
            archetype={nakshatra.archetype}
            locale={locale}
          />
          <MoonPlacement nakshatra={nakshatra} result={result ?? undefined} locale={locale} />
        </section>

        <ShareButtons
          path={sharePath}
          imagePath={`/og/${locale}/${nakshatra.key}.jpg`}
          shareTitle={t.star.ogTitle(nakshatra.archetype)}
          shareText={t.share.text(nakshatra.archetype, nakshatra.tagline)}
          labels={{
            title: t.share.title,
            native: t.share.native,
            copy: t.share.copy,
            copied: t.share.copied,
            prompt: t.share.prompt,
            x: t.share.x,
            facebook: t.share.facebook,
            instagram: t.share.instagram,
            instagramReady: t.share.instagramReady,
            instagramHint: t.share.instagramHint,
            note: t.share.note,
          }}
        />

        <Link href={href('/birth')} className="btn btn--ghost" style={{ marginTop: 34 }}>{t.star.retry}</Link>
      </main>

      <Footer locale={locale} path={`/star/${nakshatra.key}`} />
    </div>
  )
}
