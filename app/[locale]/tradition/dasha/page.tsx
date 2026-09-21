import type { Metadata } from 'next'
import Link from 'next/link'
import { contentFor } from '@/content/index'
import { LOCALES, localePath, resolveLocale } from '@/lib/i18n'
import { absoluteUrl, articleSchema, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'

const PATH = '/tradition/dasha'
const PUBLISHED = '2026-09-06'
const TOTAL_YEARS = 120

/** 빔쇼타리 순환 순서. 이 순서는 전통으로 고정돼 있다. */
const CYCLE_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'] as const

interface PageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale).tradition.dasha
  const url = absoluteUrl(localePath(locale, PATH))
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: t.metaTitle, url },
  }
}

export default async function DashaPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const messages = messagesFor(locale)
  const t = messages.tradition.dasha
  const { grahas } = contentFor(locale)
  const href = (p: string) => localePath(locale, p)

  const ordered = CYCLE_ORDER.map((key) => grahas.find((graha) => graha.key === key)).filter(
    (graha): graha is NonNullable<typeof graha> => graha !== undefined,
  )
  const sum = ordered.reduce((total, graha) => total + graha.dashaYears, 0)

  return (
    <div className="shell" style={{ maxWidth: 720 }}>
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">{t.eyebrow}</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{t.h1}</h1>
        <p className="lede" style={{ marginTop: 14, fontSize: 'var(--step-1)', color: 'var(--ink)' }}>{t.lede1}</p>
        <p className="lede" style={{ marginTop: 12 }}>{t.lede2}</p>
      </header>

      <main>
        <section style={{ marginTop: 40 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.order}</h2>
          <p className="small" style={{ marginTop: 8 }}>{t.orderSub}</p>
          <ul className="dashaBars" style={{ marginTop: 18 }}>
            {ordered.map((graha) => (
              <li key={graha.key}>
                <span className="dashaBars__name">{graha.ko}</span>
                <span className="dashaBars__track">
                  <span className="dashaBars__fill" style={{ width: `${(graha.dashaYears / 20) * 100}%`, background: graha.colorHex }} />
                </span>
                <span className="dashaBars__value">{t.years(graha.dashaYears)}</span>
              </li>
            ))}
          </ul>
          <p className="small" style={{ marginTop: 14, textAlign: 'right' }}>
            {t.sum(sum)} {sum === TOTAL_YEARS ? '' : t.sumCheck}
          </p>
        </section>

        <section style={{ marginTop: 44 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.start}</h2>
          <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>{t.startA}</p>
          <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>{t.startB}</p>
          <div className="notice" style={{ marginTop: 18 }}>
            <span aria-hidden="true">✦</span>
            <span>{t.exampleA}<b>{t.exampleB}</b>{t.exampleC}</span>
          </div>
        </section>

        <section style={{ marginTop: 44 }}>
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
