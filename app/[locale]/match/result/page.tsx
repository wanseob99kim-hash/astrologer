import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { computeLevelOne } from '@/lib/astro/engine'
import { parseBirthInput } from '@/lib/astro/input'
import { computeMatch, formatScore } from '@/lib/astro/match'
import { localePath, resolveLocale } from '@/lib/i18n'
import { absoluteUrl } from '@/lib/seo'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { ScoreBoard } from './ScoreBoard'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale).match
  return {
    title: t.resultTitle,
    description: t.resultDescription,
    alternates: { canonical: absoluteUrl(localePath(locale, '/match')) },
    // 두 사람의 생년월일이 주소에 담기므로 색인하지 않는다.
    robots: { index: false, follow: false },
  }
}

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value

export default async function MatchResultPage({ params, searchParams }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale).match
  const query = await searchParams

  let outcome: ReturnType<typeof computeMatch>
  let nameA: string
  let nameB: string
  let starA: string
  let starB: string
  let retryHref: string

  try {
    const a = parseBirthInput({ date: first(query.ad), time: first(query.at), nickname: first(query.an) })
    const b = parseBirthInput({ date: first(query.bd), time: first(query.bt), nickname: first(query.bn) })

    outcome = computeMatch(a, b, locale)
    nameA = a.nickname ?? t.me
    nameB = b.nickname ?? t.partner
    starA = computeLevelOne(a, locale).nakshatra.archetype
    starB = computeLevelOne(b, locale).nakshatra.archetype

    const back = new URLSearchParams({ d: a.date })
    if (a.time) back.set('t', a.time)
    if (a.nickname) back.set('n', a.nickname)
    retryHref = localePath(locale, `/match?${back}`)
  } catch {
    redirect(localePath(locale, '/birth'))
  }

  const percent = Math.round((outcome.total / outcome.maxTotal) * 100)

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">{t.eyebrow}</p>
        <p className="small" style={{ marginTop: 12 }}>{nameA} × {nameB}</p>

        <p className="matchScore">
          <span className="matchScore__value">{formatScore(outcome.total)}</span>
          <span className="matchScore__max">/ {outcome.maxTotal}</span>
        </p>
        <h1 className="display" style={{ fontSize: 'var(--step-2)', marginTop: 6 }}>{outcome.band.ko}</h1>
        <p className="small" style={{ marginTop: 8 }}>
          {starA} × {starB} · {t.percentOfMax(percent)}
        </p>
      </header>

      <main>
        {!outcome.isTimeKnown ? (
          <div className="notice" style={{ marginTop: 24 }}>
            <span aria-hidden="true">✦</span>
            <span>{t.provisionalA}<b>{t.provisionalB}</b>{t.provisionalC}<b>{t.provisionalD}</b></span>
          </div>
        ) : null}

        <section style={{ marginTop: 30 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.eight}</h2>
          <p className="small" style={{ marginTop: 8 }}>{t.eightSub}</p>
          <ScoreBoard kootas={outcome.kootas} pointsLabel={t.points} />
        </section>

        {outcome.weakest ? (
          <section style={{ marginTop: 32 }}>
            <h2 className="eyebrow">{t.weakest}</h2>
            <div className="card" style={{ marginTop: 12 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>
                {outcome.weakest.koota.ko}
                <span className="small" style={{ marginLeft: 8, fontWeight: 400 }}>{outcome.weakest.koota.measures}</span>
              </p>
              <p style={{ margin: '10px 0 0' }}>{outcome.weakest.koota.low}</p>
            </div>
          </section>
        ) : (
          <section style={{ marginTop: 32 }}>
            <div className="card"><p style={{ margin: 0 }}>{t.noWeak}</p></div>
          </section>
        )}

        <section style={{ marginTop: 32 }}>
          <div className="locked">
            <p className="eyebrow" style={{ color: 'var(--lapis)' }}>{t.locked}</p>
            <p style={{ margin: '10px 0 0', fontWeight: 600 }}>{t.lockedTitle}</p>
            <ul className="locked__list">
              {t.lockedItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="small" style={{ marginTop: 14 }}>{t.lockedSoon}</p>
          </div>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2 className="eyebrow">{t.how}</h2>
          <p className="small" style={{ marginTop: 10, lineHeight: 1.75 }}>
            {t.howA}{outcome.wasAsymmetric ? t.howAsym : ''}{t.howB}<strong>{t.howC}</strong>{t.howD}
          </p>
          <p className="small" style={{ marginTop: 10, lineHeight: 1.75 }}>{t.howE}</p>
        </section>

        <Link href={retryHref} className="btn btn--ghost" style={{ marginTop: 40 }}>{t.retry}</Link>
      </main>

      <Footer locale={locale} path="/match" />
    </div>
  )
}
