import type { Metadata } from 'next'
import { LOCALES, resolveLocale, type Locale } from '@/lib/i18n'
import { Footer } from '@/app/components/Footer'

interface PageProps {
  params: Promise<{ locale: string }>
}

/** 법적 고지는 짧고 페이지 하나뿐이라 사전 대신 여기서 언어별로 둔다. */
const COPY: Record<Locale, { title: string; description: string; sections: Array<{ h: string; p: string }>; note: string }> = {
  ko: {
    title: '이용약관',
    description: '베딕 점성술 서비스의 이용약관입니다.',
    sections: [
      { h: '제1조 (서비스의 성격)', p: '본 서비스는 인도 전통 점성술(죠티쉬) 문화를 바탕으로 한 오락용 콘텐츠를 제공합니다. 제공되는 모든 결과는 실제 점술·상담·의료·법률·투자 조언이 아니며, 이용자의 판단과 결정에 대한 책임은 이용자 본인에게 있습니다.' },
      { h: '제2조 (이용)', p: '회원가입 없이 이용할 수 있으며, 입력한 생년월일과 시간은 결과 계산에만 사용합니다.' },
      { h: '제3조 (책임의 한계)', p: '천재지변, 통신 장애 등 회사의 통제를 벗어난 사유로 인한 서비스 중단에 대하여 책임이 면제됩니다.' },
      { h: '제4조 (유료 콘텐츠)', p: '궁합 상세 리포트는 결제 즉시 열람되는 디지털 콘텐츠입니다. 결제는 토스페이먼츠를 통해 이뤄지며, 서비스는 카드 번호 등 결제 정보를 저장하지 않습니다.' },
      { h: '제5조 (청약철회와 환불)', p: '리포트가 열린 뒤에는 전자상거래법 제17조 제2항 제5호에 따라 청약철회가 제한됩니다. 다만 결제 오류, 중복 결제, 리포트가 열리지 않는 경우에는 결제일로부터 7일 안에 요청하시면 전액 환불합니다.' },
    ],
    note: '열람 링크를 잃어버린 경우 결제 영수증의 주문번호로 다시 열어 드립니다.',
  },
  en: {
    title: 'Terms of Use',
    description: 'Terms of use for the Vedic Astrology service.',
    sections: [
      { h: '1. Nature of the service', p: 'This service provides entertainment content based on the traditional Indian astrology (Jyotish) tradition. Nothing here is fortune-telling, counseling, medical, legal, or investment advice. Responsibility for your judgments and decisions rests with you.' },
      { h: '2. Use', p: 'No account is required. The date and time of birth you enter are used only to compute your result.' },
      { h: '3. Limitation of liability', p: 'We are not liable for service interruptions caused by events beyond our control, such as natural disasters or network failures.' },
      { h: '4. Paid content', p: 'The detailed compatibility report is digital content that opens immediately after payment. Payment is processed by Toss Payments; this service does not store card numbers or other payment details.' },
      { h: '5. Withdrawal and refunds', p: 'Once the report has been opened, withdrawal is limited under the Korean E-Commerce Act, Art. 17(2)(5). For payment errors, duplicate charges, or a report that will not open, request within 7 days of payment for a full refund.' },
    ],
    note: 'If you lose the report link, we can reopen it using the order number on your payment receipt.',
  },
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  return { title: COPY[locale].title, description: COPY[locale].description }
}

export default async function TermsPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const copy = COPY[locale]

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Terms</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{copy.title}</h1>
      </header>
      <main style={{ marginTop: 28, color: 'var(--ink-2)', display: 'grid', gap: 20 }}>
        {copy.sections.map((section) => (
          <section key={section.h}>
            <h2 style={{ fontSize: 'var(--step-1)', color: 'var(--ink)' }}>{section.h}</h2>
            <p>{section.p}</p>
          </section>
        ))}
        <p className="small">{copy.note}</p>
      </main>
      <Footer locale={locale} path="/terms" />
    </div>
  )
}
