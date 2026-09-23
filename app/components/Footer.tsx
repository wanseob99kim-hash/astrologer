import Link from 'next/link'
import { localePath, otherLocale, type Locale } from '@/lib/i18n'
import { messagesFor } from '@/messages/index'

interface FooterProps {
  locale: Locale
  /** 언어를 바꿔도 같은 화면에 머물도록, 현재 경로(접두사 없는)를 받는다. */
  path?: string
}

/**
 * 전 페이지 하단 고정 고지.
 * 기획서 §9 — "실제 점술·상담·의료·법률·투자 조언이 아니다" 문구는 반드시 노출한다.
 */
export function Footer({ locale, path = '/' }: FooterProps) {
  const t = messagesFor(locale)
  const href = (p: string) => localePath(locale, p)
  const other = otherLocale(locale)

  return (
    <footer className="footer">
      <hr className="rule" style={{ marginBottom: 20 }} />
      <nav aria-label={t.footer.navLabel}>
        <Link href={href('/compare/saju')}>{t.footer.compare}</Link>
        <Link href={href('/compare/western')}>{t.footer.western}</Link>
        <Link href={href('/tradition/ashtakoota')}>{t.footer.ashtakoota}</Link>
        <Link href={href('/tradition/nakshatra')}>{t.footer.nakshatra}</Link>
        <Link href={href('/tradition/navagraha')}>{t.footer.navagraha}</Link>
        <Link href={href('/tradition/dasha')}>{t.footer.dasha}</Link>
        <Link href={href('/about')}>{t.footer.about}</Link>
        <Link href={href('/contact')}>{t.footer.contact}</Link>
        <Link href={href('/terms')}>{t.footer.terms}</Link>
        <Link href={href('/privacy')}>{t.footer.privacy}</Link>
        <Link href={localePath(other, path)} lang={other} className="footer__lang">
          {t.site.languageSwitch}
        </Link>
      </nav>
      <p className="disclaimer">{t.footer.disclaimer}</p>
    </footer>
  )
}
