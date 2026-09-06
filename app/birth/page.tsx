import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/seo'
import { Footer } from '../components/Footer'
import { BirthForm } from './BirthForm'

export const metadata: Metadata = {
  title: '생년월일 입력',
  description: '생년월일 8자리만 넣으면 나를 지키는 행성이 바로 나옵니다.',
  alternates: { canonical: absoluteUrl('/birth') },
}

export default function BirthPage() {
  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Step 1 / 2</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>
          태어난 날만 알면 됩니다
        </h1>
        <p className="lede" style={{ marginTop: 12 }}>
          여기까지는 계산이 없습니다. 날짜의 숫자를 더해 아홉 행성 중 하나를 찾을 뿐이라 오차가 생기지 않아요.
        </p>
      </header>

      <main>
        <BirthForm />
      </main>

      <Footer />
    </div>
  )
}
