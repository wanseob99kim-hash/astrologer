/**
 * 사이트 전역 SEO 설정.
 *
 * 벤치마크(horasat.sowonary.com)는 sitemap.xml 에 개발 도메인이 그대로 남아
 * 색인이 엉뚱한 주소를 가리키고 있었다. 같은 실수를 막기 위해
 * 기준 주소를 여기 한 곳에서만 정하고, 배포 환경에서 환경 변수로 덮어쓴다.
 */

const FALLBACK_ORIGIN = 'http://localhost:3000'

const stripTrailingSlash = (value: string) => value.replace(/\/+$/, '')

function resolveOrigin(): string {
  /*
   * SITE_URL 을 먼저 본다.
   *
   * NEXT_PUBLIC_ 접두사가 붙은 값은 빌드 시점에 문자열로 치환되기 때문에,
   * 이미지 빌드 후 배포 환경에서 주입해도 반영되지 않는다.
   * sitemap·robots·canonical 은 모두 서버에서만 쓰이므로 런타임 변수로 읽는 편이 안전하다.
   * (벤치마크 사이트가 개발 도메인을 sitemap 에 그대로 노출한 것이 이 계열의 사고다.)
   */
  const runtime = process.env.SITE_URL?.trim()
  if (runtime) return stripTrailingSlash(runtime)

  const buildTime = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (buildTime) return stripTrailingSlash(buildTime)

  // Vercel 등에서 자동 주입되는 배포 도메인
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL
  if (vercel) return `https://${stripTrailingSlash(vercel)}`

  return FALLBACK_ORIGIN
}

export const SITE = {
  origin: resolveOrigin(),
  name: '베딕 점성술',
  tagline: '생년월일로 보는 나의 탄생별',
  description:
    '인도 전통 점성술(죠티쉬)을 무료로 확인해 보세요. 생년월일만 넣으면 수호 행성이 나오고, 태어난 시간을 더하면 27개 탄생별(나크샤트라)까지 확정됩니다.',
  locale: 'ko_KR',
} as const

/**
 * 크롤러가 들어가면 안 되는 경로.
 *
 * /star/[key] 와 /graha/[slug] 자체는 쿼리 없이 열면 유형 설명 페이지라 색인 가치가 있다.
 * 대신 쿼리에 생년월일이 실린 개인 결과 주소가 따로 색인되지 않도록
 * 각 페이지에서 canonical 을 쿼리 없는 주소로 고정한다.
 */
export const DISALLOWED_PATHS = ['/refine', '/star?'] as const

export function absoluteUrl(path: string): string {
  return `${SITE.origin}${path.startsWith('/') ? path : `/${path}`}`
}

interface ArticleSchemaInput {
  path: string
  headline: string
  description: string
  /** ISO 날짜 */
  datePublished: string
  dateModified?: string
}

/** 해설 문서용 Article 스키마. */
export function articleSchema(input: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    inLanguage: 'ko',
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(input.path) },
    publisher: { '@type': 'Organization', name: SITE.name },
  }
}

/** 상위 경로를 알려주는 빵부스러기 스키마. */
export function breadcrumbSchema(trail: ReadonlyArray<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: absoluteUrl(step.path),
    })),
  }
}

export function faqSchema(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}
