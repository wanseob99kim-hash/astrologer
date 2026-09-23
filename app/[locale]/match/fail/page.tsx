import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { localePath, resolveLocale } from '@/lib/i18n'
import { getterFromRecord, parsePair } from '@/lib/pay/pair'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'

/** 요청마다 새로 그린다 — 주문번호·서명·환경 변수를 빌드 시점에 굳히면 안 된다. */
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export const metadata: Metadata = { robots: { index: false, follow: false } }

/** 결제창에서 취소·실패했거나 승인 단계에서 거절된 경우. 돈은 빠져나가지 않았다. */
export default async function PayFailPage({ params, searchParams }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale).pay
  const query = await searchParams
  const get = getterFromRecord(query)

  let parsed: ReturnType<typeof parsePair>
  try {
    parsed = parsePair(get)
  } catch {
    redirect(localePath(locale, '/birth'))
  }

  // 토스는 code 를, 우리 승인 단계는 code 를 붙여 보낸다. 화면에 보여줄 수 있는 문자만 남긴다.
  const code = (get('code') ?? '').replace(/[^A-Z0-9_]/g, '').slice(0, 40)

  return (
    <div className="shell">
      <header style={{ paddingTop: 72 }}>
        <p className="eyebrow eyebrow--latin">Payment</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{t.failTitle}</h1>
        <p className="lede" style={{ marginTop: 12 }}>{t.failBody}</p>
        {code ? <p className="small" style={{ marginTop: 10 }}>{t.failCode(code)}</p> : null}
      </header>
      <main>
        <Link href={localePath(locale, `/match/checkout?${parsed.query}`)} className="btn" style={{ marginTop: 28 }}>{t.retry}</Link>
        <Link href={localePath(locale, `/match/result?${parsed.query}`)} className="btn btn--ghost" style={{ marginTop: 12 }}>{t.back}</Link>
      </main>
      <Footer locale={locale} path="/match" />
    </div>
  )
}
