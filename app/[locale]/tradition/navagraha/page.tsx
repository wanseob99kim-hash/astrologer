import type { Metadata } from 'next'
import Link from 'next/link'
import { contentFor } from '@/content/index'
import { LOCALES, localePath, resolveLocale } from '@/lib/i18n'
import { absoluteUrl, articleSchema, breadcrumbSchema } from '@/lib/seo'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { GrahaGlyph } from '@/app/components/GrahaGlyph'
import { JsonLd } from '@/app/components/JsonLd'

const PATH = '/tradition/navagraha'
const PUBLISHED = '2026-09-06'

interface PageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale).tradition.navagraha
  const url = absoluteUrl(localePath(locale, PATH))
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: t.metaTitle, url },
  }
}

export default async function NavagrahaPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const messages = messagesFor(locale)
  const t = messages.tradition.navagraha
  const { grahas } = contentFor(locale)
  const href = (p: string) => localePath(locale, p)

  return (
    <div className="shell" style={{ maxWidth: 760 }}>
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">{t.eyebrow}</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{t.h1}</h1>
        <p className="lede" style={{ marginTop: 12 }}>{t.lede}</p>
      </header>

      <main>
        <section style={{ marginTop: 36 }}>
          <ol className="grahaList">
            {grahas.map((graha) => (
              <li key={graha.key}>
                <Link href={href(`/graha/${graha.sanskrit.toLowerCase()}`)} className="grahaList__link">
                  <span className="grahaList__glyph glyphTint" style={{ ['--glyph' as string]: graha.colorHex }}>
                    <GrahaGlyph graha={graha.key} size={36} />
                  </span>
                  <span className="grahaList__body">
                    <span className="grahaList__name">
                      {graha.ko}
                      <span className="grahaList__lat">{graha.sanskrit}</span>
                    </span>
                    <span className="grahaList__meta">
                      {t.moolank(graha.moolank)} · {graha.weekday ?? t.noWeekday} · {graha.gemstone} · {graha.direction ?? t.noDirection}
                    </span>
                    <span className="grahaList__copy">{graha.copy}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section style={{ marginTop: 44 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.whyDasha}</h2>
          <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>
            {t.whyDashaA}<strong>{t.whyDashaB}</strong>{t.whyDashaC}
          </p>
          <p style={{ marginTop: 12 }}>
            <Link href={href('/tradition/dasha')} className="small" style={{ color: 'var(--lapis)', fontWeight: 500 }}>
              {t.dashaMore}
            </Link>
          </p>
        </section>

        <section style={{ marginTop: 40 }}>
          <div className="notice">
            <span aria-hidden="true">✦</span>
            <span>{t.noticeA}<b>{t.noticeB}</b>{t.noticeC}</span>
          </div>
          <Link href={href('/birth')} className="btn" style={{ marginTop: 18 }}>{t.cta}</Link>
        </section>
      </main>

      <Footer locale={locale} path={PATH} />

      <JsonLd
        data={articleSchema({
          path: localePath(locale, PATH),
          headline: t.headline,
          description: t.metaDescription,
          datePublished: PUBLISHED,
          locale,
          publisher: messages.site.name,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: messages.common.home, path: localePath(locale, '/') },
          { name: t.crumb, path: localePath(locale, PATH) },
        ])}
      />
    </div>
  )
}
