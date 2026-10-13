import type { Metadata } from 'next'
import Link from 'next/link'
import { guidesFor, GUIDES_PUBLISHED } from '@/content/longform/index'
import { LOCALES, localePath, resolveLocale, type Locale } from '@/lib/i18n'
import { absoluteUrl, articleSchema, breadcrumbSchema } from '@/lib/seo'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'
import { RelatedLinks } from '@/app/components/LongForm'

const PATH = '/guides'

const COPY: Record<Locale, { title: string; description: string; eyebrow: string; h1: string; lede: string; crumb: string }> = {
  en: {
    title: 'Vedic Astrology Guides',
    description: 'Plain-language guides to Vedic astrology: Moon sign vs. Sun sign, finding your birth star, padas, ayanamsa, dasha periods, compatibility scores, gandanta and remedies.',
    eyebrow: 'Guides',
    h1: 'Guides',
    lede: 'Longer explanations of the ideas behind your results, written for people who are curious about how Vedic astrology actually works. Each guide stands on its own; read them in any order.',
    crumb: 'Guides',
  },
  ko: {
    title: '베딕 점성술 가이드',
    description: '베딕 점성술을 쉬운 말로 풀었습니다. 달 별자리와 태양 별자리, 탄생별 찾기, 파다, 아야남샤, 다샤, 궁합 점수, 간단타, 처방까지.',
    eyebrow: 'Guides',
    h1: '가이드',
    lede: '결과 뒤에 있는 생각들을 길게 풀어 쓴 글입니다. 베딕 점성술이 실제로 어떻게 돌아가는지 궁금한 분을 위해 썼습니다. 글마다 따로 읽어도 되니 순서는 상관없습니다.',
    crumb: '가이드',
  },
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const copy = COPY[locale]
  const url = absoluteUrl(localePath(locale, PATH))
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: url },
    openGraph: { type: 'website', title: copy.title, url },
  }
}

export default async function GuidesPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const messages = messagesFor(locale)
  const copy = COPY[locale]
  const guides = guidesFor(locale)

  return (
    <div className="shell" style={{ maxWidth: 760 }}>
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">{copy.eyebrow}</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{copy.h1}</h1>
        <p className="lede" style={{ marginTop: 12 }}>{copy.lede}</p>
      </header>

      <main>
        <ul className="guideList">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link href={localePath(locale, `${PATH}/${guide.slug}`)}>
                <span className="guideList__title">{guide.title}</span>
                <span className="guideList__desc">{guide.description}</span>
              </Link>
            </li>
          ))}
        </ul>

        <RelatedLinks locale={locale} paths={['/tradition/nakshatra', '/tradition/navagraha', '/tradition/dasha', '/tradition/ashtakoota']} />
      </main>

      <Footer locale={locale} path={PATH} />

      <JsonLd
        data={articleSchema({
          path: localePath(locale, PATH),
          headline: copy.title,
          description: copy.description,
          datePublished: GUIDES_PUBLISHED,
          locale,
          publisher: messages.site.name,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: messages.common.home, path: localePath(locale, '/') },
          { name: copy.crumb, path: localePath(locale, PATH) },
        ])}
      />
    </div>
  )
}
