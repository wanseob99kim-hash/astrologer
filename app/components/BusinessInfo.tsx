import { BUSINESS } from '@/lib/business'
import type { Locale } from '@/lib/i18n'

const LABELS: Record<Locale, { title: string; name: string; owner: string; reg: string; mailOrder: string; address: string; phone: string; email: string }> = {
  ko: { title: '사업자 정보', name: '상호', owner: '대표자', reg: '사업자등록번호', mailOrder: '통신판매업 신고', address: '주소', phone: '전화', email: '이메일' },
  en: { title: 'Business information', name: 'Business name', owner: 'Representative', reg: 'Business registration no.', mailOrder: 'Mail-order business reg.', address: 'Address', phone: 'Phone', email: 'Email' },
}

/** 전자상거래법 표시 사항. 값이 비어 있는 항목은 내지 않는다. */
export function BusinessInfo({ locale }: { locale: Locale }) {
  const t = LABELS[locale]
  const rows: Array<[string, string | null]> = [
    [t.name, BUSINESS.name],
    [t.owner, BUSINESS.owner],
    [t.reg, BUSINESS.registrationNo],
    [t.mailOrder, BUSINESS.mailOrderNo],
    [t.address, BUSINESS.address],
    [t.phone, BUSINESS.phone],
    [t.email, BUSINESS.email],
  ]
  return (
    <section className="bizInfo" aria-label={t.title}>
      <p className="bizInfo__title">{t.title}</p>
      <p className="bizInfo__rows">
        {rows.filter((row): row is [string, string] => Boolean(row[1])).map(([label, value]) => (
          <span key={label} className="bizInfo__row">{label} {value}</span>
        ))}
      </p>
    </section>
  )
}
