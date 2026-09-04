import type { Metadata } from 'next'
import { Footer } from '../components/Footer'

export const metadata: Metadata = {
  title: '이용약관',
  description: '베딕 점성술 서비스의 이용약관입니다.',
}

export default function TermsPage() {
  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Terms</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>이용약관</h1>
      </header>
      <main style={{ marginTop: 28, color: 'var(--ink-2)', display: 'grid', gap: 20 }}>
        <section>
          <h2 style={{ fontSize: 'var(--step-1)', color: 'var(--ink)' }}>제1조 (서비스의 성격)</h2>
          <p>
            본 서비스는 인도 전통 점성술(죠티쉬) 문화를 바탕으로 한 오락용 콘텐츠를 제공합니다.
            제공되는 모든 결과는 실제 점술·상담·의료·법률·투자 조언이 아니며, 이용자의 판단과 결정에 대한
            책임은 이용자 본인에게 있습니다.
          </p>
        </section>
        <section>
          <h2 style={{ fontSize: 'var(--step-1)', color: 'var(--ink)' }}>제2조 (이용)</h2>
          <p>회원가입 없이 이용할 수 있으며, 입력한 생년월일과 시간은 결과 계산에만 사용합니다.</p>
        </section>
        <section>
          <h2 style={{ fontSize: 'var(--step-1)', color: 'var(--ink)' }}>제3조 (책임의 한계)</h2>
          <p>
            천재지변, 통신 장애 등 회사의 통제를 벗어난 사유로 인한 서비스 중단에 대하여 책임이 면제됩니다.
          </p>
        </section>
        <p className="small">
          유료 상품 도입 시 결제·청약철회 조항이 추가됩니다. 현재는 무료 콘텐츠만 제공합니다.
        </p>
      </main>
      <Footer />
    </div>
  )
}
