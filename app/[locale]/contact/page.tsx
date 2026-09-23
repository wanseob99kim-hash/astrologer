import type { Metadata } from 'next'
import { LOCALES, localePath, resolveLocale, type Locale } from '@/lib/i18n'
import { CONTACT_EMAIL, absoluteUrl } from '@/lib/seo'
import { Footer } from '@/app/components/Footer'

interface PageProps {
  params: Promise<{ locale: string }>
}

const COPY: Record<Locale, {
  title: string
  description: string
  lede: string
  emailLabel: string
  topicsTitle: string
  topics: Array<{ h: string; p: string }>
  includeTitle: string
  include: string[]
  response: string
}> = {
  ko: {
    title: '문의하기',
    description: '베딕 점성술(birthstar.uk)에 오류 신고, 결제·환불, 제휴 문의를 보내는 방법입니다.',
    lede: '궁금한 점이나 잘못된 내용이 있으면 이메일로 알려 주세요.',
    emailLabel: '이메일',
    topicsTitle: '이런 문의를 받습니다',
    topics: [
      { h: '내용 오류', p: '탄생별 해설, 계산 결과, 번역이 이상하다고 느끼셨다면 어느 페이지인지 함께 알려 주세요.' },
      { h: '결제·환불', p: '결제 오류, 중복 결제, 리포트가 열리지 않는 경우. 결제일로부터 7일 안에 요청하시면 전액 환불합니다.' },
      { h: '제휴·기타', p: '콘텐츠 제휴, 인용, 그 밖의 문의.' },
    ],
    includeTitle: '보내실 때 적어 주시면 빨라요',
    include: ['문제가 있던 페이지 주소', '결제 문의라면 주문번호(결제 영수증에 있음)', '사용한 기기와 브라우저'],
    response: '보통 영업일 기준 3일 안에 답장드립니다.',
  },
  en: {
    title: 'Contact',
    description: 'How to report an error, ask about payments and refunds, or get in touch with Vedic Astrology (birthstar.uk).',
    lede: 'Questions, or something that looks wrong? Email us.',
    emailLabel: 'Email',
    topicsTitle: 'What we can help with',
    topics: [
      { h: 'Content errors', p: 'If a birth-star reading, a calculation, or a translation seems off, tell us which page.' },
      { h: 'Payments and refunds', p: 'Payment errors, duplicate charges, or a report that will not open. Request within 7 days of payment for a full refund.' },
      { h: 'Partnerships and other', p: 'Content partnerships, citations, and anything else.' },
    ],
    includeTitle: 'Including these helps us answer faster',
    include: ['The address of the page with the problem', 'For payments, the order number (on your receipt)', 'The device and browser you used'],
    response: 'We usually reply within three business days.',
  },
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  return {
    title: COPY[locale].title,
    description: COPY[locale].description,
    alternates: { canonical: absoluteUrl(localePath(locale, '/contact')) },
  }
}

export default async function ContactPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const copy = COPY[locale]

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Contact</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{copy.title}</h1>
        <p className="lede" style={{ marginTop: 14 }}>{copy.lede}</p>
      </header>
      <main className="legal">
        <div className="card" style={{ marginTop: 8 }}>
          <p className="eyebrow" style={{ color: 'var(--lapis)' }}>{copy.emailLabel}</p>
          <p style={{ margin: '8px 0 0', fontSize: 'var(--step-1)', fontWeight: 600 }}>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
          <p className="small" style={{ marginTop: 8 }}>{copy.response}</p>
        </div>

        <section>
          <h2>{copy.topicsTitle}</h2>
          {copy.topics.map((topic) => (
            <p key={topic.h}><strong>{topic.h}</strong> — {topic.p}</p>
          ))}
        </section>

        <section>
          <h2>{copy.includeTitle}</h2>
          <ul>
            {copy.include.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      </main>
      <Footer locale={locale} path="/contact" />
    </div>
  )
}
