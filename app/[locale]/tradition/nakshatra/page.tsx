import type { Metadata } from 'next'
import Link from 'next/link'
import { contentFor } from '@/content/index'
import { cardArtUrl } from '@/content/cardArt'
import { LOCALES, localePath, resolveLocale } from '@/lib/i18n'
import { absoluteUrl, articleSchema, breadcrumbSchema } from '@/lib/seo'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'
import { NakshatraCard } from '@/app/components/NakshatraCard'

const PATH = '/tradition/nakshatra'
const PUBLISHED = '2026-09-06'

interface PageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale).tradition.nakshatra
  const url = absoluteUrl(localePath(locale, PATH))
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: t.metaTitle, url },
  }
}

const deg = (value: number) => {
  const whole = Math.floor(value)
  return `${whole}°${String(Math.round((value - whole) * 60)).padStart(2, '0')}′`
}

export default async function NakshatraIndexPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const messages = messagesFor(locale)
  const t = messages.tradition.nakshatra
  const { nakshatras } = contentFor(locale)
  const href = (p: string) => localePath(locale, p)

  return (
    <div className="shell" style={{ maxWidth: 760 }}>
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">{t.eyebrow}</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{t.h1}</h1>
        <p className="lede" style={{ marginTop: 12 }}>{t.lede}</p>
      </header>

      <main>
        <ol className="cardDeck">
          {nakshatras.map((n) => (
            <li key={n.key}>
              <Link href={href(`/star/${n.key}`)}>
                <NakshatraCard
                  index={n.index}
                  glyphKey={n.key}
                  artUrl={cardArtUrl(n.key, locale)}
                  archetype={n.archetype}
                  keyword={n.keyword}
                  accent={n.luckyColorHex}
                  compact
                />
                <span className="cardDeck__caption">
                  <span className="cardDeck__name">{n.archetype}</span>
                  <span className="small">{n.tagline}</span>
                  <span className="small" style={{ display: 'block', marginTop: 4, fontFamily: '"IBM Plex Mono", monospace', opacity: .8 }}>
                    {n.sanskrit} · {deg(n.range[0])}–{deg(n.range[1])}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <section className="legal" style={{ marginTop: 48 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)', margin: 0 }}>{t.guideTitle}</h2>
          {t.guide.map((block) => (
            <section key={block.h}>
              <h2>{block.h}</h2>
              <p>{block.p}</p>
            </section>
          ))}
        </section>

        <Link href={href('/birth')} className="btn" style={{ marginTop: 44 }}>{t.cta}</Link>
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
      <JsonLd
        data={breadcrumbSchema([
          { name: messages.common.home, path: localePath(locale, '/') },
          { name: t.crumb, path: localePath(locale, PATH) },
        ])}
      />
    </div>
  )
}
