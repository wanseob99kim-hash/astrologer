import type { MetadataRoute } from 'next'
import { GRAHAS, NAKSHATRAS } from '@/content/index'
import { SITE, absoluteUrl } from '@/lib/seo'

/** 기준 주소를 런타임 환경변수에서 읽으므로 요청 시점에 생성한다. */
export const dynamic = 'force-dynamic'

/**
 * 색인 대상은 설명 문서와 사전 페이지뿐이다.
 * 개인 결과 페이지(/star, /graha)는 쿼리에 생년월일이 실려 있어 넣지 않는다.
 * 단, 탄생별 사전 항목은 쿼리 없이도 유형 설명으로 열리므로 포함한다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.origin, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/compare/saju'), lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/tradition/nakshatra'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/tradition/navagraha'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/tradition/dasha'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/birth'), lastModified, changeFrequency: 'yearly', priority: 0.6 },
    { url: absoluteUrl('/terms'), lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/privacy'), lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const nakshatraPages: MetadataRoute.Sitemap = NAKSHATRAS.map((nakshatra) => ({
    url: absoluteUrl(`/star/${nakshatra.key}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const grahaPages: MetadataRoute.Sitemap = GRAHAS.map((graha) => ({
    url: absoluteUrl(`/graha/${graha.sanskrit.toLowerCase()}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...nakshatraPages, ...grahaPages]
}
