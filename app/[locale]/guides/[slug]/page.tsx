import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { guideBySlug, guidesFor, GUIDES_PUBLISHED } from '@/content/longform/index'
import { LOCALES, localePath, resolveLocale, type Locale } from '@/lib/i18n'
import { absoluteUrl, articleSchema, breadcrumbSchema } from '@/lib/seo'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'
import { LongSections, RelatedLinks } from '@/app/components/LongForm'

const CRUMB: Record<Locale, string> = { en: 'Guides', ko: '가이드' }
const CTA: Record<Locale, string> = { en: 'Find my birth star — free', ko: '내 탄생별 무료로 찾기' }

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => guidesFor(locale).map((guide) => ({ locale, slug: guide.slug })))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params
  const locale = resolveLocale(raw)
  const guide = guideBySlug(slug, locale)
  if (!guide) return { title: messagesFor(locale).site.notFoundTitle }
  const url = absoluteUrl(localePath(locale, `/guides/${guide.slug}`))
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: guide.title, description: guide.description, url },
  }
}

export default async function GuidePage({ params }: PageProps) {
  const { locale: raw, slug } = await params
  const locale = resolveLocale(raw)
  const guide = guideBySlug(slug, locale)
  if (!guide) notFound()
  const messages = messagesFor(locale)
  const path = `/guides/${guide.slug}`

  return (
    <div className="shell" style={{ maxWidth: 760 }}>
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">
          <Link href={localePath(locale, '/guides')} style={{ color: 'inherit', textDecoration: 'none' }}>{CRUMB[locale]}</Link>
        </p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{guide.title}</h1>
        <p className="lede" style={{ marginTop: 14 }}>{guide.lede}</p>
      </header>

      <main>
        <LongSections sections={guide.sections} />

        <Link href={localePath(locale, '/birth')} className="btn" style={{ marginTop: 40 }}>{CTA[locale]}</Link>

        <RelatedLinks locale={locale} paths={[...guide.related, '/guides']} />
      </main>

      <Footer locale={locale} path={path} />

      <JsonLd
        data={articleSchema({
          path: localePath(locale, path),
          headline: guide.title,
          description: guide.description,
          datePublished: GUIDES_PUBLISHED,
          locale,
          publisher: messages.site.name,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: messages.common.home, path: localePath(locale, '/') },
          { name: CRUMB[locale], path: localePath(locale, '/guides') },
          { name: guide.title, path: localePath(locale, path) },
        ])}
      />
    </div>
  )
}
