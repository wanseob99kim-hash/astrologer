'use client'

import { useState } from 'react'

/** 토스 SDK v2 가 window 에 올리는 전역. 필요한 부분만 타입을 둔다. */
interface TossPaymentsGlobal {
  (clientKey: string): {
    payment: (options: { customerKey: string }) => {
      requestPayment: (request: {
        method: 'CARD'
        amount: { currency: 'KRW'; value: number }
        orderId: string
        orderName: string
        successUrl: string
        failUrl: string
      }) => Promise<void>
    }
  }
  ANONYMOUS: string
}

declare global {
  interface Window {
    TossPayments?: TossPaymentsGlobal
  }
}

const SDK_URL = 'https://js.tosspayments.com/v2/standard'

/** SDK 를 한 번만 불러온다. 결제 페이지에서만 쓰므로 전역 레이아웃에 넣지 않는다. */
function loadSdk(): Promise<TossPaymentsGlobal> {
  if (window.TossPayments) return Promise.resolve(window.TossPayments)
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SDK_URL
    script.async = true
    script.onload = () => (window.TossPayments ? resolve(window.TossPayments) : reject(new Error('sdk missing')))
    script.onerror = () => reject(new Error('sdk load failed'))
    document.head.appendChild(script)
  })
}

interface PayButtonProps {
  clientKey: string
  orderId: string
  orderName: string
  amount: number
  /** 경로만 받는다. 도메인은 브라우저에서 붙인다 — 로컬·배포 어디서든 같은 코드로 돈다. */
  successPath: string
  failPath: string
  labels: { pay: string; paying: string; loadFail: string; agree: string }
}

export function PayButton({ clientKey, orderId, orderName, amount, successPath, failPath, labels }: PayButtonProps) {
  const [agreed, setAgreed] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function pay() {
    setBusy(true)
    setError(null)
    try {
      const TossPayments = await loadSdk()
      const payment = TossPayments(clientKey).payment({ customerKey: TossPayments.ANONYMOUS })
      await payment.requestPayment({
        method: 'CARD',
        amount: { currency: 'KRW', value: amount },
        orderId,
        orderName,
        successUrl: `${window.location.origin}${successPath}`,
        failUrl: `${window.location.origin}${failPath}`,
      })
      // 성공하면 토스가 successUrl 로 페이지를 옮긴다. 여기까지 오면 사용자가 창을 닫은 것이다.
    } catch (cause) {
      const code = (cause as { code?: string })?.code
      // 사용자가 결제창을 닫은 건 오류로 보이지 않는다
      if (code !== 'USER_CANCEL') setError(labels.loadFail)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 12, marginTop: 20 }}>
      <label className="checkline" style={{ alignItems: 'flex-start' }}>
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
        <span>{labels.agree}</span>
      </label>
      <button type="button" className="btn" onClick={pay} disabled={!agreed || busy}>
        {busy ? labels.paying : labels.pay}
      </button>
      {error ? <p className="small" role="alert" style={{ color: 'var(--marigold)', margin: 0 }}>{error}</p> : null}
    </div>
  )
}
