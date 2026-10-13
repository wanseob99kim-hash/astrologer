import Link from 'next/link'
import { localePath, type Locale } from '@/lib/i18n'
import { messagesFor } from '@/messages/index'

const ITEMS: Record<Locale, ReadonlyArray<{ path: string; label: string }>> = {
  en: [
    { path: '/birth', label: 'Find your star' },
    { path: '/tradition/nakshatra', label: '27 Stars' },
    { path: '/tradition/navagraha', label: 'Planets' },
    { path: '/tradition/dasha', label: 'Dasha' },
    { path: '/tradition/ashtakoota', label: 'Compatibility' },
    { path: '/guides', label: 'Guides' },
  ],
  ko: [
    { path: '/birth', label: '탄생별 찾기' },
    { path: '/tradition/nakshatra', label: '27 탄생별' },
    { path: '/tradition/navagraha', label: '아홉 행성' },
    { path: '/tradition/dasha', label: '다샤' },
    { path: '/tradition/ashtakoota', label: '궁합' },
    { path: '/guides', label: '가이드' },
  ],
}

const NAV_LABEL: Record<Locale, string> = { en: 'Main', ko: '주 메뉴' }

/**
 * 모든 화면 위쪽의 사이트 메뉴. 푸터에만 링크가 있으면 첫 화면에서 사이트 구조가 보이지 않는다.
 * 오른쪽 위는 고정된 언어 토글이 차지하므로 브랜드 줄의 오른쪽을 비워 둔다.
 */
export function SiteNav({ locale }: { locale: Locale }) {
  const href = (path: string) => localePath(locale, path)
  return (
    <header className="siteNav">
      <div className="siteNav__inner">
        <Link href={href('/')} className="siteNav__brand">{messagesFor(locale).site.name}</Link>
        <nav aria-label={NAV_LABEL[locale]}>
          <ul className="siteNav__list">
            {ITEMS[locale].map((item) => (
              <li key={item.path}><Link href={href(item.path)}>{item.label}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
