'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { LOCALES, LOCALE_META, isLocale, localePath, type Locale } from '@/lib/i18n'

/**
 * 상단 고정 언어 토글. 모든 화면 오른쪽 위에 뜬다.
 * 현재 경로에서 언어 접두사만 바꿔 같은 화면의 다른 언어로 보낸다. 쿼리(생년월일)도 유지한다.
 */
export function LangSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? '/'
  const search = useSearchParams()?.toString()

  // 접두사 없는 경로로 정규화한다. /en/star/x → /star/x
  const [, first = '', ...rest] = pathname.split('/')
  const bare = isLocale(first) ? `/${rest.join('/')}` : pathname
  const suffix = search ? `?${search}` : ''

  return (
    <nav className="langSwitch" aria-label="Language">
      {LOCALES.map((target) => (
        <Link
          key={target}
          href={`${localePath(target, bare || '/')}${suffix}`}
          lang={LOCALE_META[target].lang}
          hrefLang={LOCALE_META[target].lang}
          className={target === locale ? 'langSwitch__item is-active' : 'langSwitch__item'}
          aria-current={target === locale ? 'true' : undefined}
        >
          {LOCALE_META[target].label}
        </Link>
      ))}
    </nav>
  )
}
