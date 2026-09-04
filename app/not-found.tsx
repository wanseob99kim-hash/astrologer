import Link from 'next/link'
import { Footer } from './components/Footer'

export default function NotFound() {
  return (
    <div className="shell">
      <header style={{ paddingTop: 80 }}>
        <p className="eyebrow eyebrow--latin">404</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>
          그 페이지는 없습니다
        </h1>
        <p className="lede" style={{ marginTop: 12 }}>
          주소가 바뀌었거나, 링크가 잘못 전달됐을 수 있어요.
        </p>
        <Link href="/" className="btn btn--ghost" style={{ marginTop: 26 }}>
          처음으로
        </Link>
      </header>
      <Footer />
    </div>
  )
}
