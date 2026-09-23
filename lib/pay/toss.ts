/**
 * 토스페이먼츠 결제 승인.
 *
 * 흐름: 브라우저 결제창 → 토스가 successUrl 로 paymentKey·orderId·amount 를 붙여 보냄
 *       → 서버가 여기서 승인 API 를 호출 → 성공해야 비로소 돈이 빠져나간다.
 *
 * 승인 전에 금액을 서버 가격과 대조한다. 주소의 amount 는 사용자가 바꿀 수 있다.
 */

const TOSS_API = 'https://api.tosspayments.com/v1/payments'

export type ConfirmResult =
  | { ok: true; paymentKey: string; orderId: string; amount: number }
  | { ok: false; code: string; message: string }

interface TossPayment {
  paymentKey: string
  orderId: string
  status: string
  totalAmount: number
}

interface TossError {
  code?: string
  message?: string
}

function authHeader(secretKey: string): string {
  // 토스 규칙: 시크릿 키 뒤에 콜론을 붙여 base64 로 인코딩한다
  return `Basic ${btoa(`${secretKey}:`)}`
}

async function readJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T
  } catch {
    return null
  }
}

/** 이미 승인된 결제를 다시 조회한다 — 새로고침으로 승인이 두 번 호출된 경우. */
async function fetchPayment(secretKey: string, paymentKey: string, fetchImpl: typeof fetch): Promise<TossPayment | null> {
  const response = await fetchImpl(`${TOSS_API}/${encodeURIComponent(paymentKey)}`, {
    headers: { Authorization: authHeader(secretKey) },
  })
  if (!response.ok) return null
  return readJson<TossPayment>(response)
}

export interface ConfirmInput {
  secretKey: string
  paymentKey: string
  orderId: string
  amount: number
  expectedAmount: number
  /** 테스트에서 가짜 fetch 를 넣기 위한 자리. */
  fetchImpl?: typeof fetch
}

export async function confirmPayment(input: ConfirmInput): Promise<ConfirmResult> {
  const { secretKey, paymentKey, orderId, amount, expectedAmount } = input
  const fetchImpl = input.fetchImpl ?? fetch

  if (amount !== expectedAmount) {
    return { ok: false, code: 'AMOUNT_MISMATCH', message: '결제 금액이 상품 가격과 다릅니다.' }
  }

  let response: Response
  try {
    response = await fetchImpl(`${TOSS_API}/confirm`, {
      method: 'POST',
      headers: { Authorization: authHeader(secretKey), 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    })
  } catch {
    return { ok: false, code: 'NETWORK_ERROR', message: '결제 서버에 연결하지 못했습니다.' }
  }

  if (response.ok) {
    const payment = await readJson<TossPayment>(response)
    if (payment && payment.status === 'DONE' && payment.totalAmount === expectedAmount && payment.orderId === orderId) {
      return { ok: true, paymentKey, orderId, amount: payment.totalAmount }
    }
    return { ok: false, code: 'UNEXPECTED_RESPONSE', message: '결제 결과를 확인하지 못했습니다.' }
  }

  const error = (await readJson<TossError>(response)) ?? {}

  // 새로고침 등으로 같은 결제를 두 번 승인하려 한 경우 — 조회해서 이미 끝난 결제면 통과시킨다
  if (error.code === 'ALREADY_PROCESSED_PAYMENT') {
    const payment = await fetchPayment(secretKey, paymentKey, fetchImpl)
    if (payment && payment.status === 'DONE' && payment.orderId === orderId && payment.totalAmount === expectedAmount) {
      return { ok: true, paymentKey, orderId, amount: payment.totalAmount }
    }
  }

  return {
    ok: false,
    code: error.code ?? `HTTP_${response.status}`,
    message: error.message ?? '결제 승인에 실패했습니다.',
  }
}
