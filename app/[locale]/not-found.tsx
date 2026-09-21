import Link from 'next/link'
import { Footer } from '@/app/components/Footer'
import { messagesFor } from '@/messages/index'

/**
 * not-found 는 params 를 받지 못한다. 기본 언어로 그린다.
 * 영어 경로의 404 는 드물고, 어느 언어든 홈으로 가는 링크 하나면 충분하다.
 */
export default function NotFound() {
  const t = messagesFor('ko')
  return (
    <div className="shell">
      <header style={{ paddingTop: 80 }}>
        <p className="eyebrow eyebrow--latin">404</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{t.notFound.title}</h1>
        <p className="lede" style={{ marginTop: 12 }}>{t.notFound.body}</p>
        <Link href="/" className="btn btn--ghost" style={{ marginTop: 26 }}>{t.notFound.home}</Link>
      </header>
      <Footer locale="ko" />
    </div>
  )
}
