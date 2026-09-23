import type { Metadata } from 'next'
import Link from 'next/link'
import { LOCALES, localePath, resolveLocale } from '@/lib/i18n'
import { absoluteUrl, articleSchema, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { articlesFor, messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'

const PATH = '/compare/western'
const PUBLISHED = '2026-09-23'

interface PageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const t = articlesFor(locale).western
  const url = absoluteUrl(localePath(locale, PATH))
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: t.metaTitle, description: t.ogDescription, url },
  }
}

export default async function CompareWesternPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const messages = messagesFor(locale)
  const t = articlesFor(locale).western
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
        <p className="lede" style={{ marginTop: 14, fontSize: 'var(--step-1)', color: 'var(--ink)' }}>{t.lede1}</p>
        <p className="lede" style={{ marginTop: 12 }}>{t.lede2}</p>
      </header>

      <main>
        <section style={{ marginTop: 44 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.whyTitle}</h2>
          <p style={{ marginTop: 14, color: 'var(--ink-2)' }}>{t.whyA}</p>
          <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>{t.whyB}</p>
          <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>
            {t.whyC}<strong>{t.whyD}</strong>{t.whyE}
          </p>
          <p className="small" style={{ marginTop: 12 }}>{t.note}</p>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.tableTitle}</h2>
          <p className="small" style={{ marginTop: 8 }}>{t.tableSub}</p>
          <div className="tablewrap" style={{ marginTop: 18 }}>
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col">{t.colWestern}</th>
                  <th scope="col">{t.colDates}</th>
                  <th scope="col">{t.colVedic}</th>
                </tr>
              </thead>
              <tbody>
                {t.signs.map((sign) => (
                  <tr key={sign.western}>
                    <th scope="row">{sign.western}</th>
                    <td data-label={t.colDates}>{sign.dates}</td>
                    <td data-label={t.colVedic} className="vedic">{sign.vedic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.moonTitle}</h2>
          <p style={{ marginTop: 14, color: 'var(--ink-2)' }}>
            {t.moonA}<strong>{t.moonB}</strong>{t.moonC}<strong>{t.moonD}</strong>{t.moonE}
          </p>
          <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>{t.moonF}</p>
          <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>{t.moonG}</p>
          <p style={{ marginTop: 14 }}>
            <Link href={href('/tradition/nakshatra')} className="small" style={{ color: 'var(--lapis)', fontWeight: 500 }}>
              {messages.home.typesMore}
            </Link>
          </p>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.whichTitle}</h2>
          <p style={{ marginTop: 14, color: 'var(--ink-2)' }}>{t.whichA}</p>
          <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>{t.whichB}</p>
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
