import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { LOCALES, LOCALE_META, isLocale, localePath, type Locale } from '@/lib/i18n'
import { SITE, absoluteUrl } from '@/lib/seo'
import { messagesFor } from '@/messages/index'
import '../globals.css'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'ko'
  const t = messagesFor(locale)
  return {
    metadataBase: new URL(SITE.origin),
    title: { default: t.site.titleDefault, template: `%s | ${t.site.name}` },
    description: t.site.description,
    alternates: {
      languages: {
        ko: absoluteUrl(localePath('ko', '/')),
        en: absoluteUrl(localePath('en', '/')),
        'x-default': absoluteUrl('/'),
      },
    },
    openGraph: {
      type: 'website',
      locale: LOCALE_META[locale].og,
      title: t.site.titleDefault,
      description: t.site.ogDescription,
    },
    twitter: { card: 'summary_large_image' },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#EFEAE0' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0D19' },
  ],
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html lang={LOCALE_META[locale].lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=IBM+Plex+Sans+KR:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Noto+Serif+Devanagari:wght@400;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
