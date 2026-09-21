import type { Metadata } from 'next'
import { localePath, resolveLocale } from '@/lib/i18n'
import { absoluteUrl } from '@/lib/seo'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { BirthForm } from './BirthForm'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale)
  return {
    title: t.birth.metaTitle,
    description: t.birth.metaDescription,
    alternates: { canonical: absoluteUrl(localePath(locale, '/birth')) },
  }
}

export default async function BirthPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale)

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">{t.birth.step}</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{t.birth.h1}</h1>
        <p className="lede" style={{ marginTop: 12 }}>{t.birth.lede}</p>
      </header>

      <main>
        <BirthForm locale={locale} labels={t.birth} />
      </main>

      <Footer locale={locale} path="/birth" />
    </div>
  )
}
