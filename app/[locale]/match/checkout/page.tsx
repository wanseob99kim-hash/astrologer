import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { computeLevelOne } from '@/lib/astro/engine'
import { computeMatch, formatScore } from '@/lib/astro/match'
import { localePath, resolveLocale } from '@/lib/i18n'
import { REPORT_PRICE_KRW, REPORT_PRODUCT_NAME, payConfig } from '@/lib/pay/config'
import { getterFromRecord, parsePair } from '@/lib/pay/pair'
import { createOrderId } from '@/lib/pay/token'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { PayButton } from './PayButton'

/** 요청마다 새로 그린다 — 주문번호·서명·환경 변수를 빌드 시점에 굳히면 안 된다. */
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export const metadata: Metadata = {
  // 두 사람의 생년월일이 주소에 담긴다
  robots: { index: false, follow: false },
}

/** 결제가 켜져 있지 않으면 들어올 수 없다. 금액·주문번호는 여기 서버에서 정한다. */
export default async function CheckoutPage({ params, searchParams }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale)
  const query = await searchParams
  const config = payConfig()

  let parsed: ReturnType<typeof parsePair>
  try {
    parsed = parsePair(getterFromRecord(query))
  } catch {
    redirect(localePath(locale, '/birth'))
  }

  const resultHref = localePath(locale, `/match/result?${parsed.query}`)
  if (!config) redirect(resultHref)

  const outcome = computeMatch(parsed.a, parsed.b, locale)
  const starA = computeLevelOne(parsed.a, locale).nakshatra.archetype
  const starB = computeLevelOne(parsed.b, locale).nakshatra.archetype
  const nameA = parsed.a.nickname ?? t.match.me
  const nameB = parsed.b.nickname ?? t.match.partner

  const orderId = await createOrderId(parsed.pair)
  const confirmQuery = new URLSearchParams(parsed.query)
  confirmQuery.set('locale', locale)
  const won = REPORT_PRICE_KRW.toLocaleString('ko-KR')
  const business = config.business

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Ashtakoota · Report</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{t.pay.checkoutTitle}</h1>
        <p className="small" style={{ marginTop: 10 }}>
          {nameA} × {nameB} · {starA} × {starB} · {formatScore(outcome.total)} / {outcome.maxTotal}
        </p>
        <p className="lede" style={{ marginTop: 14 }}>{t.pay.checkoutLede}</p>
      </header>

      <main>
        {config.isTest ? (
          <div className="notice" style={{ marginTop: 22 }}>
            <span aria-hidden="true">✦</span>
            <span>{t.pay.testBadge}</span>
          </div>
        ) : null}

        <section className="sect">
          <h2 className="sect__title">{t.pay.includes}</h2>
          <ul className="bullets">
            {t.match.lockedItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <dl className="itemGrid" style={{ marginTop: 18 }}>
            <div>
              <dt>{t.pay.price}</dt>
              <dd style={{ fontSize: 'var(--step-1)', fontWeight: 600 }}>{t.pay.priceValue(won)}</dd>
            </div>
          </dl>

          <PayButton
            clientKey={config.clientKey}
            orderId={orderId}
            orderName={REPORT_PRODUCT_NAME}
            amount={REPORT_PRICE_KRW}
            successPath={`/api/pay/confirm?${confirmQuery}`}
            failPath={localePath(locale, `/match/fail?${parsed.query}`)}
            labels={{ pay: t.pay.pay(won), paying: t.pay.paying, loadFail: t.pay.loadFail, agree: t.pay.agree }}
          />
        </section>

        <section style={{ marginTop: 28 }}>
          <h2 className="eyebrow">{t.pay.refundTitle}</h2>
          <p className="small" style={{ marginTop: 8, lineHeight: 1.75 }}>{t.pay.refundBody}</p>
          {business ? (
            <>
              <h2 className="eyebrow" style={{ marginTop: 18 }}>{t.pay.sellerTitle}</h2>
              <p className="small" style={{ marginTop: 8, lineHeight: 1.75 }}>
                {t.pay.seller(business.name, business.owner, business.registrationNo, business.mailOrderNo, business.contact)}
              </p>
            </>
          ) : null}
        </section>

        <Link href={resultHref} className="btn btn--ghost" style={{ marginTop: 34 }}>{t.pay.back}</Link>
      </main>

      <Footer locale={locale} path="/match" />
    </div>
  )
}
