import { NextResponse, type NextRequest } from 'next/server'
import { isLocale, localePath, type Locale } from '@/lib/i18n'
import { REPORT_PRICE_KRW, payConfig } from '@/lib/pay/config'
import { parsePair } from '@/lib/pay/pair'
import { orderMatchesPair, signReport } from '@/lib/pay/token'
import { confirmPayment } from '@/lib/pay/toss'

/**
 * 토스 결제창이 성공하면 이 주소로 돌아온다.
 *   ?paymentKey&orderId&amount  ← 토스가 붙임
 *   &ad&at&an&bd&bt&bn&locale    ← 결제 전에 우리가 successUrl 에 실어 둔 것
 *
 * 여기서 승인까지 끝나야 돈이 빠져나간다. 순서:
 *   1. 두 사람 입력을 정규화
 *   2. 주문번호가 이 두 사람 것인지 확인 (다른 사람 리포트를 여는 재사용 방지)
 *   3. 금액을 서버 가격과 대조하고 토스에 승인 요청
 *   4. 성공하면 서명 토큰을 붙여 리포트로 보낸다
 */
export const dynamic = 'force-dynamic'

function redirectTo(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, request.nextUrl.origin), 303)
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const get = (name: string) => params.get(name) ?? undefined
  const rawLocale = get('locale') ?? 'ko'
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'ko'

  const config = payConfig()
  if (!config) return redirectTo(request, localePath(locale, '/'))

  let parsed: ReturnType<typeof parsePair>
  try {
    parsed = parsePair(get)
  } catch {
    return redirectTo(request, localePath(locale, '/birth'))
  }

  const fail = (code: string) => {
    const failQuery = new URLSearchParams(parsed.query)
    failQuery.set('code', code)
    return redirectTo(request, localePath(locale, `/match/fail?${failQuery}`))
  }

  const paymentKey = get('paymentKey')
  const orderId = get('orderId')
  const amount = Number(get('amount'))
  if (!paymentKey || !orderId || !Number.isFinite(amount)) return fail('MISSING_PARAMS')

  if (!(await orderMatchesPair(orderId, parsed.pair))) return fail('ORDER_MISMATCH')

  const result = await confirmPayment({
    secretKey: config.secretKey,
    paymentKey,
    orderId,
    amount,
    expectedAmount: REPORT_PRICE_KRW,
  })
  if (!result.ok) return fail(result.code)

  const reportQuery = new URLSearchParams(parsed.query)
  reportQuery.set('k', await signReport(config.signingSecret, parsed.pair))
  return redirectTo(request, localePath(locale, `/match/report?${reportQuery}`))
}
