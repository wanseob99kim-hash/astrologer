import { NextResponse, type NextRequest } from 'next/server'
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n'

/**
 * 언어 접두사 처리.
 *
 * - /en/...  → 그대로 (app/[locale]=en)
 * - /ko/...  → 접두사 없는 주소로 보낸다 (기본 언어는 접두사를 쓰지 않는다)
 * - 그 외    → 내부적으로 /ko/... 로 다시 쓴다. 주소창은 그대로다.
 *
 * 정적 파일·sitemap·robots 는 건드리지 않는다.
 */
export function middleware(request: NextRequest) {
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
