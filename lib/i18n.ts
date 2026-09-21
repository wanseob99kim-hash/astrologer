/**
 * 언어 설정.
 *
 * 한국어가 기본이고 주소에 접두사가 없다(/star, /birth …).
 * 영어는 /en 아래에 산다(/en/star …). 미들웨어가 접두사 없는 요청을
 * 내부적으로 /ko 로 돌려 app/[locale] 하나로 두 언어를 처리한다.
 */

export const LOCALES = ['ko', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'ko'

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/** 화면에 내보낼 주소. 기본 언어는 접두사를 붙이지 않는다. */
export function localePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return normalized
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'ko' ? 'en' : 'ko'
}

/** html lang 과 Open Graph locale. */
export const LOCALE_META: Record<Locale, { lang: string; og: string; label: string }> = {
  ko: { lang: 'ko', og: 'ko_KR', label: '한국어' },
  en: { lang: 'en', og: 'en_US', label: 'English' },
}

/** 라우트 파라미터의 locale 을 검증한다. 잘못된 값은 notFound 로 보낸다. */
export function resolveLocale(raw: string): Locale {
  if (!isLocale(raw)) {
    // 미들웨어가 걸러주지만, 직접 접근을 대비한다
    throw new Error(`unknown locale: ${raw}`)
  }
  return raw
}
