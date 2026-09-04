import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '베딕 점성술 무료 | 생년월일로 보는 나의 탄생별',
    template: '%s | 베딕 점성술',
  },
  description:
    '인도 전통 점성술(죠티쉬)을 무료로 확인해 보세요. 생년월일만 넣으면 수호 행성이 나오고, 태어난 시간을 더하면 27개 탄생별(나크샤트라)까지 확정됩니다.',
  openGraph: {
    type: 'website',
    title: '베딕 점성술 무료 | 생년월일로 보는 나의 탄생별',
    description: '생년월일만 넣으면 끝. 나의 수호 행성과 탄생별을 1분 안에 확인해 보세요.',
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#EBEEF4' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0D19' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
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
