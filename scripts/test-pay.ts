/**
 * 결제 코어 검증. 실제 토스 서버는 부르지 않고 가짜 fetch 로 응답을 흉내 낸다.
 * 실행: npm run test:pay
 */
import { canonicalPair, createOrderId, orderMatchesPair, signReport, verifyReport } from '../lib/pay/token'
import { confirmPayment } from '../lib/pay/toss'
import { levelOf, pairTimeline } from '../lib/astro/report'
import type { DashaPeriod } from '../lib/astro/types'

const SECRET = 'x'.repeat(40)
const PAIR = { aDate: '1995-05-05', aTime: '09:30', bDate: '1993-11-20', bTime: '06:00' }
const SWAPPED = { aDate: PAIR.bDate, aTime: PAIR.bTime, bDate: PAIR.aDate, bTime: PAIR.aTime }
const OTHER = { ...PAIR, bDate: '1993-11-21' }

let passed = 0
const failures: string[] = []
async function check(name: string, fn: () => Promise<boolean> | boolean) {
  try {
    if (await fn()) passed += 1
    else failures.push(name)
  } catch (error) {
    failures.push(`${name} — ${error instanceof Error ? error.message : String(error)}`)
  }
}

/** 순서대로 응답을 내주는 가짜 fetch. 호출 기록도 남긴다. */
function fakeFetch(responses: Array<{ status: number; body: unknown }>) {
  const calls: Array<{ url: string; init?: RequestInit }> = []
  const impl = (async (url: string, init?: RequestInit) => {
    calls.push({ url, init })
    const next = responses.shift()
    if (!next) throw new Error('unexpected fetch')
    return new Response(JSON.stringify(next.body), { status: next.status, headers: { 'Content-Type': 'application/json' } })
  }) as unknown as typeof fetch
  return { impl, calls }
}

async function main() {
  // ---------- 토큰 ----------
  await check('두 사람 순서를 바꿔도 같은 문자열', () => canonicalPair(PAIR) === canonicalPair(SWAPPED))
  await check('서명은 32자 hex', async () => /^[0-9a-f]{32}$/.test(await signReport(SECRET, PAIR)))
  await check('같은 입력이면 같은 서명', async () => (await signReport(SECRET, PAIR)) === (await signReport(SECRET, PAIR)))
  await check('올바른 토큰은 통과', async () => verifyReport(SECRET, PAIR, await signReport(SECRET, PAIR)))
  await check('순서 바꾼 주소도 통과', async () => verifyReport(SECRET, SWAPPED, await signReport(SECRET, PAIR)))
  await check('생년월일을 하루 바꾸면 거부', async () => !(await verifyReport(SECRET, OTHER, await signReport(SECRET, PAIR))))
  await check('시간을 바꾸면 거부', async () => !(await verifyReport(SECRET, { ...PAIR, aTime: '09:31' }, await signReport(SECRET, PAIR))))
  await check('다른 비밀로 만든 토큰 거부', async () => !(await verifyReport(SECRET, PAIR, await signReport('y'.repeat(40), PAIR))))
  await check('토큰 없음 거부', async () => !(await verifyReport(SECRET, PAIR, undefined)))
  await check('hex 아닌 토큰 거부', async () => !(await verifyReport(SECRET, PAIR, 'zzzz')))
  await check('잘린 토큰 거부', async () => !(await verifyReport(SECRET, PAIR, (await signReport(SECRET, PAIR)).slice(0, 31))))

  // ---------- 주문번호 ----------
  const orderId = await createOrderId(PAIR)
  await check('주문번호 형식 (토스 6~64자)', () => /^m[0-9a-f]{32}$/.test(orderId) && orderId.length <= 64)
  await check('주문번호는 매번 다르다', async () => orderId !== (await createOrderId(PAIR)))
  await check('주문번호가 두 사람과 맞는다', () => orderMatchesPair(orderId, PAIR))
  await check('순서 바꿔도 맞는다', () => orderMatchesPair(orderId, SWAPPED))
  await check('다른 두 사람과는 안 맞는다', async () => !(await orderMatchesPair(orderId, OTHER)))
  await check('형식이 틀린 주문번호 거부', async () => !(await orderMatchesPair('abc', PAIR)))

  // ---------- 승인 ----------
  const base = { secretKey: 'test_sk_dummy', paymentKey: 'pk_1', orderId, amount: 4900, expectedAmount: 4900 }
  const done = { paymentKey: 'pk_1', orderId, status: 'DONE', totalAmount: 4900 }

  await check('정상 승인', async () => {
    const { impl, calls } = fakeFetch([{ status: 200, body: done }])
    const result = await confirmPayment({ ...base, fetchImpl: impl })
    const auth = new Headers(calls[0]?.init?.headers).get('Authorization')
    return result.ok && calls[0]?.url.endsWith('/confirm') === true && auth === `Basic ${btoa('test_sk_dummy:')}`
  })
  await check('금액이 다르면 토스를 부르지도 않고 거부', async () => {
    const { impl, calls } = fakeFetch([])
    const result = await confirmPayment({ ...base, amount: 100, fetchImpl: impl })
    return !result.ok && result.code === 'AMOUNT_MISMATCH' && calls.length === 0
  })
  await check('토스가 거절하면 실패', async () => {
    const { impl } = fakeFetch([{ status: 400, body: { code: 'REJECT_CARD_COMPANY', message: '카드사 거절' } }])
    const result = await confirmPayment({ ...base, fetchImpl: impl })
    return !result.ok && result.code === 'REJECT_CARD_COMPANY'
  })
  await check('승인 응답의 금액이 다르면 실패', async () => {
    const { impl } = fakeFetch([{ status: 200, body: { ...done, totalAmount: 100 } }])
    return !(await confirmPayment({ ...base, fetchImpl: impl })).ok
  })
  await check('승인 응답의 주문번호가 다르면 실패', async () => {
    const { impl } = fakeFetch([{ status: 200, body: { ...done, orderId: 'mOTHER' } }])
    return !(await confirmPayment({ ...base, fetchImpl: impl })).ok
  })
  await check('새로고침(이미 승인됨) — 조회해서 끝난 결제면 통과', async () => {
    const { impl, calls } = fakeFetch([
      { status: 400, body: { code: 'ALREADY_PROCESSED_PAYMENT', message: '이미 처리된 결제' } },
      { status: 200, body: done },
    ])
    const result = await confirmPayment({ ...base, fetchImpl: impl })
    return result.ok && calls.length === 2 && calls[1]?.url.endsWith('/pk_1') === true
  })
  await check('이미 승인됐지만 다른 주문이면 거부', async () => {
    const { impl } = fakeFetch([
      { status: 400, body: { code: 'ALREADY_PROCESSED_PAYMENT' } },
      { status: 200, body: { ...done, orderId: 'mSOMETHINGELSE' } },
    ])
    return !(await confirmPayment({ ...base, fetchImpl: impl })).ok
  })
  await check('네트워크 오류는 실패로', async () => {
    const impl = (async () => { throw new Error('offline') }) as unknown as typeof fetch
    const result = await confirmPayment({ ...base, fetchImpl: impl })
    return !result.ok && result.code === 'NETWORK_ERROR'
  })

  // ---------- 리포트 계산 ----------
  await check('단계: 1점 항목 0 / 0.5 / 1', () => levelOf(0) === 'low' && levelOf(0.5) === 'mid' && levelOf(1) === 'high')
  await check('단계: 경계 0.75 는 high, 0.74 는 mid', () => levelOf(0.75) === 'high' && levelOf(0.74) === 'mid')

  const period = (planet: string, from: number, to: number): DashaPeriod => ({
    planet, planetKo: planet, startAge: 0, endAge: 0,
    start: new Date(Date.UTC(from, 0, 1)), end: new Date(Date.UTC(to, 0, 1)), isCurrent: false,
  })
  const A = [period('Ketu', 1990, 1996), period('Venus', 1996, 2016), period('Sun', 2016, 2022), period('Moon', 2022, 2032), period('Mars', 2032, 2039)]
  const B = [period('Rahu', 1992, 2000), period('Jupiter', 2000, 2028), period('Saturn', 2028, 2047)]
  const rows = pairTimeline(A, B, 2026, 10)

  await check('10년치 행', () => rows.length === 10 && rows[0]?.year === 2026 && rows[9]?.year === 2035)
  await check('2026: 달 × 목성 → 같이 풀리는 해', () => rows[0]?.a.planet === 'Moon' && rows[0]?.b.planet === 'Jupiter' && rows[0]?.tone === 'good')
  await check('2028: B 만 구간 바뀜', () => rows[2]?.b.changes === true && rows[2]?.a.changes === false)
  await check('2032: 화성 × 토성 → 같이 흔들리는 해', () => rows[6]?.a.planet === 'Mars' && rows[6]?.b.planet === 'Saturn' && rows[6]?.tone === 'shaky')
  await check('태어난 첫 구간 시작은 "바뀜"으로 안 센다', () => pairTimeline(A, B, 1990, 1).every((r) => !r.a.changes))
  await check('같은 해 둘 다 바뀌면 흔들림', () => {
    const X = [period('Moon', 2000, 2030), period('Venus', 2030, 2050)]
    const Y = [period('Jupiter', 2000, 2030), period('Mercury', 2030, 2050)]
    return pairTimeline(X, Y, 2030, 1)[0]?.tone === 'shaky'
  })

  const total = passed + failures.length
  console.log(`결제 코어: ${passed}/${total}`)
  if (failures.length > 0) {
    for (const f of failures) console.log(`  ✗ ${f}`)
    process.exitCode = 1
  } else {
    console.log('결제 코어: PASS')
  }
}

main()
