import type { Metadata } from 'next'
import Link from 'next/link'
import { MATCH_REPORT_KO } from '@/content/match-report'
import { MATCH_REPORT_EN } from '@/content/en/match-report'
import { LOCALES, localePath, resolveLocale, type Locale } from '@/lib/i18n'
import { REPORT_PRICE_KRW, REPORT_PRICE_USD } from '@/lib/pay/config'
import { absoluteUrl } from '@/lib/seo'
import { Footer } from '@/app/components/Footer'
import { JsonLd } from '@/app/components/JsonLd'

const PATH = '/report'

/**
 * 판매 상품 페이지 — 궁합 상세 리포트.
 * 결제대행사 심사는 "이미지가 있는 판매 상품"을 사이트에서 직접 확인한다.
 * 두 사람의 생년월일을 받아 바로 결제 화면(/match/checkout)으로 보낸다.
 */
const COPY: Record<Locale, {
  title: string; description: string; eyebrow: string; lede: string; priceLabel: string; price: string; priceNote: string
  includesTitle: string; includes: string[]; sampleTitle: string; sampleSub: string; buyTitle: string; buySub: string
  a: string; b: string; date: string; time: string; datePh: string; timePh: string; dateHint: string; submit: string
  refundTitle: string; refund: string; terms: string; imageAlt: string
}> = {
  ko: {
    title: '궁합 상세 리포트',
    description: '두 사람의 베딕 궁합(아쉬타쿠타 36점)을 여덟 항목마다 풀어 쓴 디지털 리포트. 항목별 해설과 할 일, 전통 처방, 두 사람의 10년 흐름을 담았습니다.',
    eyebrow: 'Product · Report',
    lede: '무료 결과에서 보이는 총점과 가장 조심할 항목 하나를 넘어, 여덟 항목 전부를 두 사람의 실제 생활 장면으로 풀어 드립니다.',
    priceLabel: '가격',
    price: `${REPORT_PRICE_KRW.toLocaleString('ko-KR')}원`,
    priceNote: '1회 결제 · 결제 즉시 열람 · 링크로 언제든 다시 보기',
    includesTitle: '리포트에 들어 있는 것',
    includes: [
      '요약: 가장 잘 맞는 항목과 가장 조심할 두 항목',
      '여덟 항목(가치관·이끌림·별자리 거리·생활 리듬·행성 우정·기질·살림·기운)마다 두 사람에게 실제로 나타나는 모습과 할 일',
      '점수가 낮은 항목의 전통 해소법과 현대식 처방',
      '두 사람의 인생 구간(다샤)을 겹친 앞으로 10년 흐름표 — 함께 좋은 해와 함께 흔들리는 해 표시',
    ],
    sampleTitle: '미리 보기',
    sampleSub: '"생활 리듬" 항목이 보통일 때의 실제 리포트 문안입니다.',
    buyTitle: '두 사람의 생년월일을 넣어 주세요',
    buySub: '결제 화면에서 두 사람의 궁합 점수를 확인한 뒤 결제할 수 있습니다.',
    a: '나', b: '상대', date: '생년월일', time: '태어난 시간(선택)', datePh: '19950505', timePh: '0930', dateHint: '숫자 8자리 · 양력',
    submit: '결제 화면으로',
    refundTitle: '환불',
    refund: '디지털 콘텐츠 특성상 리포트가 열린 뒤에는 청약철회가 제한됩니다(전자상거래법 제17조 제2항 제5호). 결제 오류, 중복 결제, 리포트가 열리지 않는 경우에는 결제일로부터 7일 안에 요청하시면 전액 환불합니다.',
    terms: '이용약관 전문',
    imageAlt: '두 장의 탄생별 카드 — 궁합 상세 리포트',
  },
  en: {
    title: 'Detailed Compatibility Report',
    description: 'A digital report that walks through all eight items of your Vedic compatibility (Ashtakoota, out of 36): what each means for the two of you, what to do, traditional remedies, and a ten-year outlook.',
    eyebrow: 'Product · Report',
    lede: 'The free result shows your total and the one item to watch. The report goes through all eight, written as scenes from your shared life.',
    priceLabel: 'Price',
    price: `₩${REPORT_PRICE_KRW.toLocaleString('en-US')}`,
    priceNote: `About US$${REPORT_PRICE_USD} · one-time payment · opens instantly · reopen anytime from your link`,
    includesTitle: 'What the report includes',
    includes: [
      'Summary: your strongest item and the two to watch',
      'All eight items (Values, Pull, Star distance, Daily rhythm, Planet friendship, Temperament, Household, Energy): how each shows up between you, and what to do',
      'Traditional remedies and modern equivalents for low-scoring items',
      'A ten-year table laying your two dasha periods side by side, marking years that support you both and years that test you both',
    ],
    sampleTitle: 'Preview',
    sampleSub: 'Actual report text for a moderate "Daily rhythm" score.',
    buyTitle: 'Enter both birth dates',
    buySub: 'You will see your compatibility score on the checkout page before paying.',
    a: 'You', b: 'Partner', date: 'Date of birth', time: 'Birth time (optional)', datePh: '19950505', timePh: '0930', dateHint: '8 digits · Gregorian calendar',
    submit: 'Continue to checkout',
    refundTitle: 'Refunds',
    refund: 'As digital content, withdrawal is limited once the report has been opened (Korean E-Commerce Act, Art. 17(2)(5)). For payment errors, duplicate charges, or a report that will not open, request within 7 days of payment for a full refund.',
    terms: 'Full terms of use',
    imageAlt: 'Two birth-star cards — Detailed Compatibility Report',
  },
}

const SAMPLE = { ko: MATCH_REPORT_KO.kootas.yoni?.mid, en: MATCH_REPORT_EN.kootas.yoni?.mid }

interface PageProps {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const copy = COPY[locale]
  const url = absoluteUrl(localePath(locale, PATH))
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: url },
    openGraph: { type: 'website', title: copy.title, description: copy.description, url, images: [absoluteUrl(`/shop/report-${locale}.webp`)] },
  }
}

function PersonFields({ prefix, label, copy }: { prefix: 'a' | 'b'; label: string; copy: (typeof COPY)[Locale] }) {
  return (
    <fieldset className="buyForm__person">
      <legend>{label}</legend>
      <div className="field">
        <label htmlFor={`${prefix}d`}>{copy.date}</label>
        <input id={`${prefix}d`} name={`${prefix}d`} className="input" placeholder={copy.datePh} inputMode="numeric" maxLength={10} required aria-describedby={`${prefix}d-hint`} />
        <p className="hint" id={`${prefix}d-hint`}>{copy.dateHint}</p>
      </div>
      <div className="field">
        <label htmlFor={`${prefix}t`}>{copy.time}</label>
        <input id={`${prefix}t`} name={`${prefix}t`} className="input" placeholder={copy.timePh} inputMode="numeric" maxLength={5} />
      </div>
    </fieldset>
  )
}

export default async function ReportProductPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const copy = COPY[locale]
  const sample = SAMPLE[locale]

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">{copy.eyebrow}</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{copy.title}</h1>
        <p className="lede" style={{ marginTop: 12 }}>{copy.lede}</p>
      </header>

      <main>
        <figure className="product__image">
          <img src={`/shop/report-${locale}.webp`} alt={copy.imageAlt} width={1200} height={900} />
        </figure>

        <dl className="itemGrid" style={{ marginTop: 18, gridTemplateColumns: '1fr' }}>
          <div>
            <dt>{copy.priceLabel}</dt>
            <dd style={{ fontSize: 'var(--step-2)', fontWeight: 700 }}>{copy.price}</dd>
          </div>
        </dl>
        <p className="small" style={{ marginTop: 8 }}>{copy.priceNote}</p>

        <section className="sect">
          <h2 className="sect__title">{copy.includesTitle}</h2>
          <ul className="bullets">
            {copy.includes.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        {sample ? (
          <section className="sect">
            <h2 className="sect__title">{copy.sampleTitle}</h2>
            <p className="small">{copy.sampleSub}</p>
            <div className="card" style={{ marginTop: 12 }}>
              <p style={{ margin: 0, lineHeight: 1.8 }}>{sample.scene}</p>
              <ul className="bullets" style={{ marginTop: 10 }}>
                {sample.tips.map((tip) => <li key={tip}>{tip}</li>)}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="sect" id="buy">
          <h2 className="sect__title">{copy.buyTitle}</h2>
          <p className="small">{copy.buySub}</p>
          <form action={localePath(locale, '/match/checkout')} method="get" className="buyForm">
            <PersonFields prefix="a" label={copy.a} copy={copy} />
            <PersonFields prefix="b" label={copy.b} copy={copy} />
            <button type="submit" className="btn">{copy.submit}</button>
          </form>
        </section>

        <section style={{ marginTop: 30 }}>
          <h2 className="eyebrow">{copy.refundTitle}</h2>
          <p className="small" style={{ marginTop: 8, lineHeight: 1.75 }}>{copy.refund}</p>
          <Link href={localePath(locale, '/terms')} className="small" style={{ color: 'var(--lapis)' }}>{copy.terms} →</Link>
        </section>
      </main>

      <Footer locale={locale} path={PATH} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: copy.title,
          description: copy.description,
          image: absoluteUrl(`/shop/report-${locale}.webp`),
          offers: { '@type': 'Offer', price: REPORT_PRICE_KRW, priceCurrency: 'KRW', availability: 'https://schema.org/InStock', url: absoluteUrl(localePath(locale, PATH)) },
        }}
      />
    </div>
  )
}
