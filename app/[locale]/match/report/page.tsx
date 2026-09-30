import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { computeLevelOne } from '@/lib/astro/engine'
import { computeMatch, formatScore, type KootaScore } from '@/lib/astro/match'
import { pairTimeline } from '@/lib/astro/report'
import { localePath, resolveLocale } from '@/lib/i18n'
import { payConfig } from '@/lib/pay/config'
import { getterFromRecord, parsePair } from '@/lib/pay/pair'
import { verifyReport } from '@/lib/pay/token'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { ReportSections } from '../ReportSections'

/** 요청마다 새로 그린다 — 주문번호·서명·환경 변수를 빌드 시점에 굳히면 안 된다. */
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export const metadata: Metadata = {
  // 결제한 사람의 리포트. 두 사람의 생년월일과 열람 토큰이 주소에 담긴다.
  robots: { index: false, follow: false },
}

/** 비율 순으로 정렬한 사본. 원본 순서(배점 순)는 항목 풀이에서 그대로 쓴다. */
const byRatio = (kootas: readonly KootaScore[]) => [...kootas].sort((x, y) => y.ratio - x.ratio)

export default async function MatchReportPage({ params, searchParams }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale)
  const query = await searchParams
  const get = getterFromRecord(query)

  let parsed: ReturnType<typeof parsePair>
  try {
    parsed = parsePair(get)
  } catch {
    redirect(localePath(locale, '/birth'))
  }

  // 서명이 맞지 않으면 무료 결과로 돌려보낸다. 결제가 꺼져 있어도(비밀이 없으면) 열 수 없다.
  const config = payConfig()
  const isValid = config ? await verifyReport(config.signingSecret, parsed.pair, get('k')) : false
  if (!isValid) redirect(localePath(locale, `/match/result?${parsed.query}`))

  const outcome = computeMatch(parsed.a, parsed.b, locale)
  const levelA = computeLevelOne(parsed.a, locale)
  const levelB = computeLevelOne(parsed.b, locale)
  const nameA = parsed.a.nickname ?? t.match.me
  const nameB = parsed.b.nickname ?? t.match.partner
  const ranked = byRatio(outcome.kootas)
  const strongest = ranked[0]
  const weakest = ranked.slice(-2).reverse()
  const timeline = pairTimeline(levelA.dasha.timeline, levelB.dasha.timeline, new Date().getUTCFullYear(), 10)

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Ashtakoota · Report</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{t.pay.reportTitle}</h1>
        <p className="small" style={{ marginTop: 10 }}>{nameA} × {nameB}</p>
        <p className="matchScore">
          <span className="matchScore__value">{formatScore(outcome.total)}</span>
          <span className="matchScore__max">/ {outcome.maxTotal}</span>
        </p>
        <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{outcome.band.ko}</p>
        <p className="small" style={{ marginTop: 6 }}>{levelA.nakshatra.archetype} × {levelB.nakshatra.archetype}</p>
      </header>

      <main>
        <div className="notice" style={{ marginTop: 22 }}>
          <span aria-hidden="true">✦</span>
          <span>{t.pay.reportSaved}</span>
        </div>

        <section className="sect">
          <h2 className="sect__title">{t.pay.summary}</h2>
          {strongest ? (
            <div className="peakBox peakBox--do">
              <p className="peakBox__title" style={{ color: 'var(--marigold)' }}>{t.pay.strongest}</p>
              <p style={{ margin: '8px 0 0', fontWeight: 600 }}>
                {strongest.koota.ko} · {formatScore(strongest.score)}/{strongest.maxScore}
              </p>
              <p className="small" style={{ marginTop: 4 }}>{strongest.koota.high}</p>
            </div>
          ) : null}
          <div className="peakBox">
            <p className="peakBox__title" style={{ color: 'var(--lapis)' }}>{t.pay.weakestTwo}</p>
            <ul className="bullets" style={{ marginTop: 8 }}>
              {weakest.map((entry) => (
                <li key={entry.koota.key}>
                  <strong>{entry.koota.ko}</strong> · {formatScore(entry.score)}/{entry.maxScore} — {entry.koota.low}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ReportSections locale={locale} outcome={outcome} timeline={timeline} nameA={nameA} nameB={nameB} />

        <section style={{ marginTop: 32 }}>
          <p className="small" style={{ lineHeight: 1.75 }}>{t.match.howE}</p>
        </section>

        <Link href={localePath(locale, `/match/result?${parsed.query}`)} className="btn btn--ghost" style={{ marginTop: 28 }}>{t.pay.back}</Link>
      </main>

      <Footer locale={locale} path="/match" />
    </div>
  )
}
