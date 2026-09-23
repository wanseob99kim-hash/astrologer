import { NextResponse, type NextRequest } from 'next/server'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'

/**
 * 주소 정리.
 *
 * 1. 호스트 — www 로 들어오면 정식 주소(SITE_URL 의 호스트)로 308.
 *    같은 페이지가 두 주소로 색인되면 검색 점수가 갈린다.
 * 2. 언어 접두사
 *    - /en/...  → 그대로 (app/[locale]=en)
 *    - /ko/...  → 접두사 없는 주소로 보낸다 (기본 언어는 접두사를 쓰지 않는다)
 *    - 그 외    → 내부적으로 /ko/... 로 다시 쓴다. 주소창은 그대로다.
 *
 * 정적 파일·sitemap·robots·API 는 건드리지 않는다.
 */

/** 정식 호스트. 로컬 개발(localhost)에서는 리다이렉트하지 않는다. */
function canonicalHost(): string | null {
  const raw = process.env.SITE_URL?.trim()
  if (!raw) return null
  try {
    const host = new URL(raw).host
    return host.startsWith('localhost') ? null : host
  } catch {
    return null
  }
}

/** 정식 주소로 보내야 하는 호스트인가. */
function isAliasHost(host: string, canonical: string): boolean {
  return host === `www.${canonical}`
}

export function middleware(request: NextRequest) {
  const canonical = canonicalHost()
  const host = request.headers.get('host')
  if (canonical && host && host !== canonical && isAliasHost(host, canonical)) {
    const target = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, `https://${canonical}`)
    return NextResponse.redirect(target, 308)
  }

  const { pathname } = request.nextUrl
  const [, first = ''] = pathname.split('/')

  if (isLocale(first)) {
    if (first !== DEFAULT_LOCALE) return NextResponse.next()
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(`/${first}`.length) || '/'
    return NextResponse.redirect(url, 308)
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // _next, API, 파일 확장자가 있는 정적 자산, sitemap/robots 는 제외
  matcher: ['/((?!_next|api|cards|og|sitemap\\.xml|robots\\.txt|favicon\\.ico|.*\\..*).*)'],
}
