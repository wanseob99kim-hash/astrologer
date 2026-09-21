import type { Metadata } from 'next'
import Link from 'next/link'
import { contentFor } from '@/content/index'
import { cardArtUrl } from '@/content/cardArt'
import { localePath, resolveLocale } from '@/lib/i18n'
import { absoluteUrl, faqSchema } from '@/lib/seo'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { GrahaGlyph } from '@/app/components/GrahaGlyph'
import { JsonLd } from '@/app/components/JsonLd'
import { NakshatraCard } from '@/app/components/NakshatraCard'
import { NakshatraGlyph } from '@/app/components/NakshatraGlyph'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale)
  const url = absoluteUrl(localePath(locale, '/'))
  return {
    alternates: { canonical: url },
    openGraph: { url, title: `${t.site.name} | ${t.site.tagline}`, description: t.site.description },
  }
}

/** 랜딩에 미리 보여줄 네 유형. 성향이 서로 겹치지 않는 것으로 골랐다. */
const SAMPLE_KEYS = ['rohini', 'ashlesha', 'uttara-ashadha', 'uttara-bhadrapada']

/** 히어로 카드 세 장. 가운데가 정면에 온다. */
const HERO_KEYS = ['magha', 'uttara-ashadha', 'rohini']

export default async function HomePage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale)
  const { nakshatras, grahas } = contentFor(locale)
  const href = (p: string) => localePath(locale, p)

  const samples = nakshatras.filter((n) => SAMPLE_KEYS.includes(n.key))
  const heroCards = HERO_KEYS.map((key) => nakshatras.find((n) => n.key === key)).filter(
    (n): n is NonNullable<typeof n> => n !== undefined,
  )

  return (
    <div className="shell">
      <header style={{ paddingTop: 64 }}>
        <p className="eyebrow eyebrow--latin">{t.home.eyebrow}</p>
        <h1 className="display" style={{ fontSize: 'var(--step-4)', marginTop: 14 }}>
          {t.home.h1}
          <span
            className="display"
            style={{ display: 'block', fontSize: 'var(--step-1)', fontWeight: 400, color: 'var(--ink-2)', marginTop: 10 }}
          >
            {t.home.h1Sub}
          </span>
        </h1>

        <p className="lede" style={{ marginTop: 22, fontSize: 'var(--step-1)', color: 'var(--ink)' }}>{t.home.lede1}</p>
        <p className="lede" style={{ marginTop: 12 }}>{t.home.lede2}</p>

        <div className="heroDeck" aria-hidden="true">
          {heroCards.map((n, i) => (
            <div key={n.key} className={`heroDeck__slot heroDeck__slot--${i}`}>
              <NakshatraCard
                index={n.index}
                glyphKey={n.key}
                artUrl={cardArtUrl(n.key, locale)}
                archetype={n.archetype}
                keyword={n.keyword}
                accent={n.luckyColorHex}
                compact={i !== 1}
              />
            </div>
          ))}
        </div>

        <hr className="rule" style={{ margin: '28px 0' }} />

        <Link href={href('/birth')} className="btn">{t.home.cta}</Link>
        <p className="small" style={{ textAlign: 'center', marginTop: 12 }}>{t.home.ctaSub}</p>
      </header>

      <main>
        <section style={{ marginTop: 60 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.home.allAtOnce}</h2>
          <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
            <div className="card">
              <p className="eyebrow" style={{ color: 'var(--lapis)' }}>{t.home.inputLabel}</p>
              <p style={{ margin: '8px 0 0', fontWeight: 600 }}>{t.home.inputTitle}</p>
              <p className="small" style={{ marginTop: 6 }}>{t.home.inputBody}</p>
            </div>
            <div className="card">
              <p className="eyebrow" style={{ color: 'var(--lapis)' }}>{t.home.resultLabel}</p>
              <p style={{ margin: '8px 0 0', fontWeight: 600 }}>{t.home.resultTitle}</p>
              <p className="small" style={{ marginTop: 6 }}>{t.home.resultBody}</p>
            </div>
          </div>
        </section>

        <section style={{ marginTop: 52 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.home.nineGrahas}</h2>
          <p className="small" style={{ marginTop: 8 }}>{t.home.nineGrahasSub}</p>
          <ul className="grahaGrid">
            {grahas.map((graha) => (
              <li key={graha.key}>
                <Link href={href(`/graha/${graha.sanskrit.toLowerCase()}`)} style={{ textDecoration: 'none' }}>
                  <span className="grahaGrid__glyph glyphTint" style={{ ['--glyph' as string]: graha.colorHex }}>
                    <GrahaGlyph graha={graha.key} size={34} title={graha.ko} />
                  </span>
                  <span className="grahaGrid__name">{graha.ko}</span>
                  <span className="grahaGrid__meta">{graha.keyword}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 14 }}>
            <Link href={href('/tradition/navagraha')} className="small" style={{ color: 'var(--lapis)', fontWeight: 500 }}>
              {t.home.nineGrahasMore}
            </Link>
          </p>
        </section>

        <section style={{ marginTop: 52 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.home.types}</h2>
          <p className="small" style={{ marginTop: 8 }}>{t.home.typesSub}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'grid', gap: 10 }}>
            {samples.map((n) => (
              <li key={n.key} className="card sampleRow">
                <span className="sampleRow__glyph glyphTint" style={{ ['--glyph' as string]: n.luckyColorHex }}>
                  <NakshatraGlyph nakshatra={n.key} size={40} />
                </span>
                <span>
                  <span className="sampleRow__name">{n.archetype}</span>
                  <span className="small" style={{ display: 'block', marginTop: 2 }}>{n.tagline}</span>
                </span>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 14 }}>
            <Link href={href('/tradition/nakshatra')} className="small" style={{ color: 'var(--lapis)', fontWeight: 500 }}>
              {t.home.typesMore}
            </Link>
          </p>
        </section>

        <section style={{ marginTop: 52 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>{t.home.faq}</h2>
          <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
            {t.home.faqItems.map((item) => (
              <details key={item.q} className="card" style={{ padding: '14px 16px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600 }}>{item.q}</summary>
                <p className="small" style={{ marginTop: 10 }}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <Link href={href('/birth')} className="btn" style={{ marginTop: 44 }}>{t.home.ctaBottom}</Link>
      </main>

      <Footer locale={locale} path="/" />

      <JsonLd data={faqSchema(t.home.faqItems)} />
    </div>
  )
}
