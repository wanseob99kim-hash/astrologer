import type { MetadataRoute } from 'next'
import { GRAHAS, NAKSHATRAS } from '@/content/index'
import { LOCALES, localePath } from '@/lib/i18n'
import { absoluteUrl } from '@/lib/seo'

/** 기준 주소를 런타임 환경변수에서 읽으므로 요청 시점에 생성한다. */
export const dynamic = 'force-dynamic'

const STATIC: ReadonlyArray<{ path: string; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number }> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/compare/saju', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tradition/nakshatra', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/tradition/navagraha', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/tradition/dasha', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/birth', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
]

/**
 * 색인 대상은 설명 문서와 사전 페이지뿐이다.
 * 개인 결과 페이지(/star, /graha)는 쿼리에 생년월일이 실려 있어 넣지 않는다.
 * 단, 탄생별 사전 항목은 쿼리 없이도 유형 설명으로 열리므로 포함한다.
 * 두 언어를 모두 싣고, 각 항목에 hreflang 대체 주소를 단다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const paths = [
    ...STATIC,
    ...NAKSHATRAS.map((n) => ({ path: `/star/${n.key}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...GRAHAS.map((g) => ({ path: `/graha/${g.sanskrit.toLowerCase()}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]

  return paths.flatMap((entry) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(localePath(locale, entry.path)),
      lastModified,
      changeFrequency: entry.changeFrequency,
      priority: locale === 'ko' ? entry.priority : entry.priority * 0.9,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, absoluteUrl(localePath(l, entry.path))])),
      },
    })),
  )
}
