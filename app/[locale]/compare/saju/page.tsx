import type { Metadata } from 'next'
import Link from 'next/link'
import { LOCALES, localePath, resolveLocale } from '@/lib/i18n'
import { absoluteUrl, articleSchema, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'

const PATH = '/compare/saju'
const PUBLISHED = '2026-09-06'

/** 다샤 연수. 표시용이라 콘텐츠와 별도로 둔다 — 순서가 전통 순환 순서다. */
const DASHA_YEARS: ReadonlyArray<{ key: string; years: number }> = [
  { key: 'Ketu', years: 7 }, { key: 'Venus', years: 20 }, { key: 'Sun', years: 6 },
  { key: 'Moon', years: 10 }, { key: 'Mars', years: 7 }, { key: 'Rahu', years: 18 },
  { key: 'Jupiter', years: 16 }, { key: 'Saturn', years: 19 }, { key: 'Mercury', years: 17 },
]

interface PageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale).compare
  const url = absoluteUrl(localePath(locale, PATH))
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: t.metaTitle, description: t.ogDescription, url },
  }
}

export default async function CompareSajuPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const messages = messagesFor(locale)
  const t = messages.compare
  const href = (p: string) => localePath(locale, p)

  return (
    <div className="shell" style={{ maxWidth: 720 }}>
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">{t.eyebrow}</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>
          {t.h1a}
          <br />
          {t.h1b}
        </h1>
        <p className="lede" style={{ marginTop: 14, fontSize: 'var(--step-1)', color: 'var(--ink)' }}>
          {t.ledeA}<strong>{t.ledeB}</strong>
        </p>
        <p className="lede" style={{ marginTop: 12 }}>{t.lede2}</p>
      </header>

      <main>
        <section style={{ marginTop: 44 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.seven}</h2>
          <div className="tablewrap" style={{ marginTop: 18 }}>
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col">{t.colAxis}</th>
                  <th scope="col">{t.colSaju}</th>
                  <th scope="col">{t.colVedic}</th>
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row) => (
                  <tr key={row.axis}>
                    <th scope="row">{row.axis}</th>
                    <td data-label={t.colSaju}>{row.saju}</td>
                    <td data-label={t.colVedic} className="vedic">{row.vedic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.drift}</h2>
          <p className="lede" style={{ marginTop: 12 }}>{t.driftLede}</p>
          <p style={{ marginTop: 14, color: 'var(--ink-2)' }}>
            {t.driftA}<strong>{t.driftB}</strong>{t.driftC}<strong>{t.driftD}</strong>{t.driftE}
          </p>
          <p className="small" style={{ marginTop: 12 }}>{t.driftNote}</p>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.flow}</h2>
          <p className="lede" style={{ marginTop: 12 }}>{t.flowLede}</p>
          <p style={{ marginTop: 14, color: 'var(--ink-2)' }}>{t.flowBody}</p>
          <ul className="dashaBars" style={{ marginTop: 18 }}>
            {DASHA_YEARS.map((planet) => (
              <li key={planet.key}>
                <span className="dashaBars__name">{messages.planets[planet.key] ?? planet.key}</span>
                <span className="dashaBars__track">
                  <span className="dashaBars__fill" style={{ width: `${(planet.years / 20) * 100}%` }} />
                </span>
                <span className="dashaBars__value">{t.years(planet.years)}</span>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 14 }}>
            <Link href={href('/tradition/dasha')} className="small" style={{ color: 'var(--lapis)', fontWeight: 500 }}>
              {t.dashaMore}
            </Link>
          </p>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.faq}</h2>
          <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
            {t.faqItems.map((item) => (
              <details key={item.q} className="card" style={{ padding: '14px 16px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600 }}>{item.q}</summary>
                <p className="small" style={{ marginTop: 10 }}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <Link href={href('/birth')} className="btn" style={{ marginTop: 44 }}>{t.cta}</Link>
        <p className="small" style={{ textAlign: 'center', marginTop: 10 }}>{t.ctaSub}</p>
      </main>

      <Footer locale={locale} path={PATH} />

      <JsonLd
        data={articleSchema({
          path: localePath(locale, PATH),
          headline: t.metaTitle,
          description: t.metaDescription,
          datePublished: PUBLISHED,
          locale,
          publisher: messages.site.name,
        })}
      />
      <JsonLd data={faqSchema(t.faqItems)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: messages.common.home, path: localePath(locale, '/') },
          { name: t.crumb, path: localePath(locale, PATH) },
        ])}
      />
    </div>
  )
}
