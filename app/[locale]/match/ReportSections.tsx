import { MATCH_REPORT_KO, type MatchReportCopy } from '@/content/match-report'
import { MATCH_REPORT_EN } from '@/content/en/match-report'
import { formatScore, type computeMatch } from '@/lib/astro/match'
import { levelOf, type pairTimeline } from '@/lib/astro/report'
import type { Locale } from '@/lib/i18n'
import { messagesFor } from '@/messages/index'

const REPORT_COPY: Record<Locale, MatchReportCopy> = { ko: MATCH_REPORT_KO, en: MATCH_REPORT_EN }

const LEVEL_LABEL: Record<Locale, Record<'high' | 'mid' | 'low', string>> = {
  ko: { high: '잘 맞음', mid: '보통', low: '조심' },
  en: { high: 'Strong', mid: 'Moderate', low: 'Watch' },
}

interface ReportSectionsProps {
  locale: Locale
  outcome: ReturnType<typeof computeMatch>
  timeline: ReturnType<typeof pairTimeline>
  nameA: string
  nameB: string
}

/**
 * 궁합 상세 리포트 본문 — 여덟 항목 풀이와 처방, 두 사람의 10년 흐름.
 * 결제 리포트 페이지와, 결제가 꺼져 있을 때의 무료 결과 페이지가 같이 쓴다.
 */
export function ReportSections({ locale, outcome, timeline, nameA, nameB }: ReportSectionsProps) {
  const t = messagesFor(locale)
  const copy = REPORT_COPY[locale]

  return (
    <>
      <section className="sect">
        <h2 className="sect__title">{t.pay.itemsTitle}</h2>
        <div className="rpt">
          {outcome.kootas.map((entry) => {
            const level = levelOf(entry.ratio)
            const body = copy.kootas[entry.koota.key]
            const section = body?.[level]
            return (
              <article key={entry.koota.key} className={`rpt__item rpt__item--${level}`}>
                <header className="rpt__head">
                  <span>
                    <span className="rpt__name">{entry.koota.ko}</span>
                    <span className="rpt__sub">{entry.koota.sanskrit} · {entry.koota.measures}</span>
                  </span>
                  <span className="rpt__score">
                    {formatScore(entry.score)}<span className="rpt__max">/{entry.maxScore}</span>
                    <span className={`rpt__level rpt__level--${level}`}>{LEVEL_LABEL[locale][level]}</span>
                  </span>
                </header>
                <span className="kootaBoard__track" style={{ display: 'block', marginTop: 10 }}>
                  <span className="kootaBoard__fill" style={{ width: `${Math.max(entry.ratio * 100, 2)}%` }} />
                </span>
                {section ? (
                  <>
                    <p className="rpt__label">{t.pay.scene}</p>
                    <p className="rpt__scene">{section.scene}</p>
                    <p className="rpt__label">{t.pay.tips}</p>
                    <ul className="bullets" style={{ marginTop: 6 }}>
                      {section.tips.map((tip) => <li key={tip}>{tip}</li>)}
                    </ul>
                  </>
                ) : null}
                {level === 'low' && body?.remedy ? (
                  <div className="ritual">
                    <p className="eyebrow" style={{ color: 'var(--marigold)' }}>{t.pay.remedyTitle}</p>
                    <p style={{ margin: '8px 0 0' }}>{body.remedy.tradition}</p>
                    <p className="eyebrow" style={{ color: 'var(--marigold)', marginTop: 12 }}>{t.pay.remedyModern}</p>
                    <p style={{ margin: '8px 0 0' }}>{body.remedy.modern}</p>
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </section>

      <section className="sect">
        <h2 className="sect__title">{t.pay.timelineTitle}</h2>
        <p className="small">{t.pay.timelineSub}</p>
        {!outcome.isTimeKnown ? <p className="small" style={{ marginTop: 6, color: 'var(--marigold)' }}>{t.pay.timeUnknown}</p> : null}
        <div className="tablewrap" style={{ marginTop: 16 }}>
          <table className="rptTimeline">
            <thead>
              <tr>
                <th scope="col">{t.pay.timelineYear}</th>
                <th scope="col">{nameA}</th>
                <th scope="col">{nameB}</th>
                <th scope="col" aria-label="tone" />
              </tr>
            </thead>
            <tbody>
              {timeline.map((row) => (
                <tr key={row.year} className={row.tone ? `is-${row.tone}` : undefined}>
                  <th scope="row">{row.year}</th>
                  <td>{row.a.planetKo}{row.a.changes ? <span className="rptTimeline__change" title={copy.timeline.transition}>↻</span> : null}</td>
                  <td>{row.b.planetKo}{row.b.changes ? <span className="rptTimeline__change" title={copy.timeline.transition}>↻</span> : null}</td>
                  <td>
                    {row.tone === 'good' ? <span className="rptTimeline__tone rptTimeline__tone--good">{copy.timeline.good}</span> : null}
                    {row.tone === 'shaky' ? <span className="rptTimeline__tone rptTimeline__tone--shaky">{copy.timeline.shaky}</span> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="bullets" style={{ marginTop: 14 }}>
          <li>{t.pay.legendGood}</li>
          <li>{t.pay.legendShaky}</li>
          <li>↻ {copy.timeline.transition}</li>
        </ul>
      </section>
    </>
  )
}
