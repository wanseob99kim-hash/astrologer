import type { Metadata } from 'next'
import Link from 'next/link'
import { contentFor } from '@/content/index'
import { LOCALES, localePath, resolveLocale } from '@/lib/i18n'
import { absoluteUrl, articleSchema, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { articlesFor, messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'

const PATH = '/tradition/ashtakoota'
const PUBLISHED = '2026-09-23'

interface PageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const t = articlesFor(locale).ashtakoota
  const url = absoluteUrl(localePath(locale, PATH))
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: t.metaTitle, description: t.ogDescription, url },
  }
}

export default async function AshtakootaPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const messages = messagesFor(locale)
  const t = articlesFor(locale).ashtakoota
  // 항목 이름·배점·설명은 궁합 계산에 쓰는 콘텐츠를 그대로 가져온다 — 화면과 점수가 어긋날 수 없다.
  const { kootas } = contentFor(locale)
  const href = (p: string) => localePath(locale, p)
  const total = kootas.reduce((sum, k) => sum + k.maxScore, 0)

  return (
    <div className="shell" style={{ maxWidth: 720 }}>
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">{t.eyebrow}</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{t.h1}</h1>
        <p className="lede" style={{ marginTop: 14, fontSize: 'var(--step-1)', color: 'var(--ink)' }}>{t.lede1}</p>
        <p className="lede" style={{ marginTop: 12 }}>{t.lede2}</p>
      </header>

      <main>
        <section style={{ marginTop: 44 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.howTitle}</h2>
          <p style={{ marginTop: 14, color: 'var(--ink-2)' }}>{t.howA}</p>
          <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>{t.howB}</p>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.tableTitle}</h2>
          <div className="tablewrap" style={{ marginTop: 18 }}>
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col">{t.colName}</th>
                  <th scope="col">{t.colMax}</th>
                  <th scope="col">{t.colWhat}</th>
                </tr>
              </thead>
              <tbody>
                {kootas.map((koota) => (
                  <tr key={koota.key}>
                    <th scope="row">
                      {koota.ko}
                      <span className="small" style={{ display: 'block', fontWeight: 400, opacity: .75 }}>{koota.sanskrit}</span>
                    </th>
                    <td data-label={t.colMax}>{messages.match.points(koota.maxScore)}</td>
                    <td data-label={t.colWhat} className="vedic">{koota.measures}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="small" style={{ marginTop: 12, textAlign: 'right' }}>{messages.tradition.dasha.sum(total).replace(/\d+/, String(total))}</p>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.bandTitle}</h2>
          <p className="small" style={{ marginTop: 8 }}>{t.bandSub}</p>
          <ol className="acts" style={{ marginTop: 18 }}>
            {t.bands.map((band) => (
              <li key={band.range}>
                <span className="acts__meta">{band.range}</span>
                <span className="acts__title">{band.label}</span>
                <span className="acts__body">{band.body}</span>
              </li>
            ))}
          </ol>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.genderTitle}</h2>
          <p style={{ marginTop: 14, color: 'var(--ink-2)' }}>{t.genderA}</p>
          <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>
            {t.genderB}<strong>{t.genderC}</strong>{t.genderD}
          </p>
        </section>

        <section className="sect sect--warn" style={{ marginTop: 44 }}>
          <h2 className="sect__title">{t.cautionTitle}</h2>
          <p style={{ marginTop: 12 }}>{t.cautionA}</p>
          <p style={{ marginTop: 12 }}>{t.cautionB}</p>
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
