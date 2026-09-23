import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { contentFor, grahaLore } from '@/content/index'
import { grahaBySlug, grahaSlug } from '@/lib/astro/engine'
import { normalizeDate, normalizeNickname } from '@/lib/astro/input'
import { LOCALES, localePath, resolveLocale } from '@/lib/i18n'
import { absoluteUrl } from '@/lib/seo'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { GrahaGlyph } from '@/app/components/GrahaGlyph'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => contentFor(locale).grahas.map((graha) => ({ locale, slug: grahaSlug(graha) })))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale = resolveLocale(raw)
  const t = messagesFor(locale)
  const graha = grahaBySlug(slug, locale)
  if (!graha) return { title: t.site.notFoundTitle }
  return {
    title: t.graha.metaTitle(graha.ko),
    description: graha.copy,
    alternates: { canonical: absoluteUrl(localePath(locale, `/graha/${grahaSlug(graha)}`)) },
  }
}

export default async function GrahaPage({ params, searchParams }: PageProps) {
  const { locale: raw, slug } = await params
  const locale = resolveLocale(raw)
  const t = messagesFor(locale).graha
  const href = (p: string) => localePath(locale, p)
  const graha = grahaBySlug(slug, locale)
  if (!graha) notFound()

  const query = await searchParams
  const nickname = normalizeNickname(first(query.n))

  // 날짜가 없어도 페이지 자체는 읽을 수 있어야 한다(공유 링크). 다음 단계로만 못 넘어간다.
  let isoDate: string | undefined
  try {
    isoDate = normalizeDate(first(query.d) ?? '')
  } catch {
    isoDate = undefined
  }

  const nextHref = isoDate
    ? href(`/star?${new URLSearchParams({ d: isoDate, ...(nickname ? { n: nickname } : {}) })}`)
    : href('/birth')

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow">{t.eyebrow}</p>
        <div className="heroGlyph glyphTint" style={{ ['--glyph' as string]: graha.colorHex }}>
          <GrahaGlyph graha={graha.key} size={92} title={t.glyphTitle(graha.ko)} />
        </div>
        {nickname ? <p className="small" style={{ marginTop: 12 }}>{t.yourGraha(nickname)}</p> : null}
        <h1 className="display" style={{ fontSize: 'var(--step-4)', marginTop: nickname ? 4 : 14 }}>{graha.ko}</h1>
        <p style={{ margin: '8px 0 0', color: 'var(--muted)', fontFamily: '"IBM Plex Mono", monospace', fontSize: 'var(--step--1)' }}>
          {graha.sanskrit} · {t.moolank(graha.moolank)}
        </p>

        <ul className="chips" style={{ marginTop: 16 }}>
          <li className="chip chip--accent">{graha.keyword}</li>
          <li className="chip">{graha.deityKo.split(' —')[0]}</li>
        </ul>
      </header>

      <main>
        <p style={{ marginTop: 26, fontSize: 'var(--step-1)', lineHeight: 1.75 }}>{graha.copy}</p>

        <section style={{ marginTop: 28 }}>
          <h2 className="eyebrow" style={{ color: 'var(--lapis)' }}>{t.lore}</h2>
          <div className="lore">
            {grahaLore(graha.key, locale).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <hr className="rule" style={{ margin: '30px 0' }} />

        <section>
          <h2 className="eyebrow" style={{ color: 'var(--lapis)' }}>{t.strengths}</h2>
          <ul style={{ margin: '12px 0 0', paddingLeft: 18, display: 'grid', gap: 5 }}>
            {graha.strengths.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section style={{ marginTop: 26 }}>
          <h2 className="eyebrow">{t.shadows}</h2>
          <ul style={{ margin: '12px 0 0', paddingLeft: 18, display: 'grid', gap: 5, color: 'var(--ink-2)' }}>
            {graha.shadows.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2 className="eyebrow" style={{ color: 'var(--lapis)' }}>{t.lucky}</h2>
          <dl className="itemGrid">
            <div><dt>{t.color}</dt><dd><span className="swatch" style={{ background: graha.colorHex }} />{graha.color}</dd></div>
            <div><dt>{t.gemstone}</dt><dd>{graha.gemstone}</dd></div>
            <div><dt>{t.weekday}</dt><dd>{graha.weekday ?? t.none}</dd></div>
            <div><dt>{t.direction}</dt><dd>{graha.direction ?? t.none}</dd></div>
            <div><dt>{t.number}</dt><dd>{graha.luckyNumber}</dd></div>
            <div><dt>{t.deity}</dt><dd>{graha.deityKo}</dd></div>
          </dl>
        </section>

        <section style={{ marginTop: 30 }}>
          <h2 className="eyebrow">{t.remedy}</h2>
          <p style={{ marginTop: 10, color: 'var(--ink-2)' }}>{graha.remedy}</p>
        </section>

        <section style={{ marginTop: 40 }}>
          <div className="notice">
            <span aria-hidden="true">✦</span>
            <span>{t.noticeA}<b>{t.noticeB}</b>{t.noticeC}</span>
          </div>

          <Link href={nextHref} className="btn" style={{ marginTop: 18 }}>{isoDate ? t.next : t.nextNoDate}</Link>
          <p className="small" style={{ textAlign: 'center', marginTop: 10 }}>{t.nextSub}</p>
        </section>
      </main>

      <Footer locale={locale} path={`/graha/${grahaSlug(graha)}`} />
    </div>
  )
}
