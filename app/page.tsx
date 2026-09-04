import Link from 'next/link'
import { NAKSHATRAS } from '@/content/index'
import { Footer } from './components/Footer'

const FAQ = [
  {
    q: '사주와 뭐가 다른가요?',
    a: '사주는 태어난 연·월·일·시의 간지로 오행의 균형을 봅니다. 베딕 점성술은 태어난 순간 달이 어느 별자리에 있었는지를 가장 중요한 축으로 삼고, 27개 탄생별(나크샤트라)로 나눠 봅니다. 인생의 흐름은 10년씩 기계적으로 나누지 않고, 행성마다 6년에서 20년까지 길이가 다른 다샤(Dasha) 주기로 읽습니다.',
  },
  {
    q: '생년월일만 알아도 되나요?',
    a: '됩니다. 생년월일만으로 수호 행성(나바그라하)이 바로 나옵니다. 여기까지는 계산이 필요 없어 100% 확정입니다. 다만 27개 탄생별은 달의 위치로 정해지기 때문에, 태어난 시간을 모르면 4명 중 1명꼴로 결과가 달라집니다. 그래서 시간을 넣기 전까지는 탄생별을 확정해서 보여드리지 않습니다.',
  },
  {
    q: '태어난 시간을 모르면요?',
    a: '수호 행성까지는 그대로 보실 수 있습니다. 탄생별은 정오 기준으로 계산하되 "확정 아님"으로 표시합니다. 시간을 아는 분과 같은 화면을 보여드리면서 정확한 척하지는 않겠다는 뜻입니다.',
  },
  {
    q: '왜 27개인가요?',
    a: '달이 하늘을 한 바퀴 도는 데 약 27일이 걸립니다. 인도에서는 그 길을 27등분해 각 구간에 이름과 신격, 상징, 지배 행성을 두었습니다. 서양 별자리 12개보다 촘촘해서, 같은 별자리라도 사람이 갈립니다.',
  },
  {
    q: '무료인가요?',
    a: '수호 행성과 탄생별 결과는 회원가입 없이 무료입니다.',
  },
]

/** 랜딩에 미리 보여줄 네 유형. 성향이 서로 겹치지 않는 것으로 골랐다. */
const SAMPLE_KEYS = ['rohini', 'ashlesha', 'uttara-ashadha', 'uttara-bhadrapada']

export default function HomePage() {
  const samples = NAKSHATRAS.filter((n) => SAMPLE_KEYS.includes(n.key))

  return (
    <div className="shell">
      <header style={{ paddingTop: 64 }}>
        <p className="eyebrow eyebrow--latin">Vedic Astrology · Jyotish</p>
        <h1 className="display" style={{ fontSize: 'var(--step-4)', marginTop: 14 }}>
          인도 점성술
          <span
            className="display"
            style={{ display: 'block', fontSize: 'var(--step-1)', fontWeight: 400, color: 'var(--ink-2)', marginTop: 10 }}
          >
            생년월일로 보는 무료 탄생별 테스트
          </span>
        </h1>

        <p className="lede" style={{ marginTop: 22, fontSize: 'var(--step-1)', color: 'var(--ink)' }}>
          사주는 봤는데 인도 점성술은 아직이라면.
        </p>
        <p className="lede" style={{ marginTop: 12 }}>
          생년월일만 넣으면 나를 지키는 행성이 나오고, 태어난 시간을 더하면 27개 탄생별까지 확정됩니다.
        </p>

        <hr className="rule" style={{ margin: '32px 0' }} />

        <Link href="/birth" className="btn">
          무료로 내 탄생별 보기
        </Link>
        <p className="small" style={{ textAlign: 'center', marginTop: 12 }}>
          회원가입 없이 30초면 끝나요.
        </p>
      </header>

      <main>
        <section style={{ marginTop: 60 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>두 단계로 읽습니다</h2>
          <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
            <div className="card">
              <p className="eyebrow" style={{ color: 'var(--lapis)' }}>Step 1 · 생년월일</p>
              <p style={{ margin: '8px 0 0', fontWeight: 600 }}>나를 지키는 행성</p>
              <p className="small" style={{ marginTop: 6 }}>
                태어난 날짜의 숫자를 더해 아홉 행성(나바그라하) 중 하나를 찾습니다. 계산이 필요 없어 오차가 없습니다.
              </p>
            </div>
            <div className="card">
              <p className="eyebrow" style={{ color: 'var(--lapis)' }}>Step 2 · 시간과 장소</p>
              <p style={{ margin: '8px 0 0', fontWeight: 600 }}>27개 탄생별과 인생 흐름</p>
              <p className="small" style={{ marginTop: 6 }}>
                태어난 순간 달의 위치를 계산해 탄생별을 확정하고, 120년 다샤 주기에서 지금 어느 구간인지 짚습니다.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginTop: 52 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>이런 유형이 나옵니다</h2>
          <p className="small" style={{ marginTop: 8 }}>27개 중 네 개만 미리 보면</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'grid', gap: 10 }}>
            {samples.map((n) => (
              <li key={n.key} className="card" style={{ padding: '14px 16px' }}>
                <p style={{ margin: 0, fontFamily: '"Gowun Batang", serif', fontWeight: 700, fontSize: 'var(--step-1)' }}>
                  {n.archetype}
                </p>
                <p className="small" style={{ marginTop: 2 }}>{n.tagline}</p>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 14 }}>
            <Link href="/tradition/nakshatra" className="small" style={{ color: 'var(--lapis)', fontWeight: 500 }}>
              27개 전체 보기 →
            </Link>
          </p>
        </section>

        <section style={{ marginTop: 52 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>자주 묻는 질문</h2>
          <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
            {FAQ.map((item) => (
              <details key={item.q} className="card" style={{ padding: '14px 16px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600 }}>{item.q}</summary>
                <p className="small" style={{ marginTop: 10 }}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <Link href="/birth" className="btn" style={{ marginTop: 44 }}>
          내 탄생별 무료로 보기
        </Link>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />
    </div>
  )
}
