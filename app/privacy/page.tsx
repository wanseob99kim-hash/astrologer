import type { Metadata } from 'next'
import { Footer } from '../components/Footer'

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '베딕 점성술 서비스의 개인정보처리방침입니다.',
}

export default function PrivacyPage() {
  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Privacy</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>개인정보처리방침</h1>
      </header>
      <main style={{ marginTop: 28, color: 'var(--ink-2)', display: 'grid', gap: 20 }}>
        <section>
          <h2 style={{ fontSize: 'var(--step-1)', color: 'var(--ink)' }}>수집하는 정보</h2>
          <p>
            닉네임, 생년월일, 태어난 시간, 태어난 곳을 입력받습니다. 이 값들은 결과를 계산하기 위해서만
            쓰이며, 주소창(URL)에 담겨 전달됩니다.
          </p>
        </section>
        <section>
          <h2 style={{ fontSize: 'var(--step-1)', color: 'var(--ink)' }}>저장 여부</h2>
          <p>
            회원가입이 없고, 입력값을 서버에 저장하지 않습니다. 결과 주소를 남에게 공유하면 그 주소에 담긴
            생년월일도 함께 전달되니 주의해 주세요.
          </p>
        </section>
        <section>
          <h2 style={{ fontSize: 'var(--step-1)', color: 'var(--ink)' }}>문의</h2>
          <p>개인정보 관련 문의는 서비스 운영자에게 연락해 주세요.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
