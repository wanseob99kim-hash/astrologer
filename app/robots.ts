import type { MetadataRoute } from 'next'
import { DISALLOWED_PATHS, absoluteUrl } from '@/lib/seo'

/** 기준 주소를 런타임 환경변수에서 읽으므로 요청 시점에 생성한다. */
export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: [...DISALLOWED_PATHS] }],
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
