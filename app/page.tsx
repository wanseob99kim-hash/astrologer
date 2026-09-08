import type { Metadata } from 'next'
import Link from 'next/link'
import { GRAHAS, NAKSHATRAS } from '@/content/index'
import { SITE, absoluteUrl, faqSchema } from '@/lib/seo'
import { Footer } from './components/Footer'
import { GrahaGlyph } from './components/GrahaGlyph'
import { JsonLd } from './components/JsonLd'
import { NakshatraCard } from './components/NakshatraCard'
import { NakshatraGlyph } from './components/NakshatraGlyph'

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
  openGraph: { url: absoluteUrl('/'), title: `${SITE.name} | ${SITE.tagline}`, description: SITE.description },
}

const FAQ = [
  {
    q: '사주와 뭐가 다른가요?',
    a: '사주는 태어난 연·월·일·시의 간지로 오행의 균형을 봅니다. 베딕 점성술은 태어난 순간 달이 어느 별자리에 있었는지를 가장 중요한 축으로 삼고, 27개 탄생별(나크샤트라)로 나눠 봅니다. 인생의 흐름은 10년씩 기계적으로 나누지 않고, 행성마다 6년에서 20년까지 길이가 다른 다샤(Dasha) 주기로 읽습니다.',
  },
  {
    q: '생년월일만 알아도 되나요?',
    a: '됩니다. 생년월일만 넣어도 결과는 전부 나옵니다. 다만 27개 탄생별은 태어난 순간 달의 위치로 정해지기 때문에, 시간을 모르면 4명 중 1명꼴로 결과가 달라집니다. 그래서 시간을 안 넣으신 경우에는 결과 맨 위에 확정이 아니라고 표시해 드립니다.',
  },
  {
    q: '태어난 시간을 모르면요?',
    a: '그대로 보실 수 있습니다. 정오를 기준으로 계산하되 "확정 아님"으로 표시합니다. 시간을 아는 분과 같은 화면을 보여드리면서 정확한 척하지는 않겠다는 뜻입니다.',
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

/** 히어로 카드 세 장. 가운데가 정면에 온다. */
const HERO_KEYS = ['magha', 'uttara-ashadha', 'rohini']

export default function HomePage() {
  const samples = NAKSHATRAS.filter((n) => SAMPLE_KEYS.includes(n.key))
  // 히어로에 부채꼴로 펼칠 세 장. 가운데가 주인공이다.
  const heroCards = HERO_KEYS.map((key) => NAKSHATRAS.find((n) => n.key === key)).filter(
    (n): n is NonNullable<typeof n> => n !== undefined,
  )

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

        <div className="heroDeck" aria-hidden="true">
          {heroCards.map((n, i) => (
            <div key={n.key} className={`heroDeck__slot heroDeck__slot--${i}`}>
              <NakshatraCard
                index={n.index}
                glyphKey={n.key}
                archetype={n.archetype}
                keyword={n.keyword}
                accent={n.luckyColorHex}
                compact={i !== 1}
              />
            </div>
          ))}
        </div>

        <hr className="rule" style={{ margin: '28px 0' }} />

        <Link href="/birth" className="btn">
          무료로 내 탄생별 보기
        </Link>
        <p className="small" style={{ textAlign: 'center', marginTop: 12 }}>
          회원가입 없이 30초면 끝나요.
        </p>
      </header>

      <main>
        <section style={{ marginTop: 60 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>한 번에 다 나옵니다</h2>
          <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
            <div className="card">
              <p className="eyebrow" style={{ color: 'var(--lapis)' }}>입력</p>
              <p style={{ margin: '8px 0 0', fontWeight: 600 }}>생년월일 · 시간 · 태어난 곳</p>
              <p className="small" style={{ marginTop: 6 }}>
                시간은 몰라도 됩니다. 대신 결과에 확정이 아니라고 표시해 드려요.
              </p>
            </div>
            <div className="card">
              <p className="eyebrow" style={{ color: 'var(--lapis)' }}>결과</p>
              <p style={{ margin: '8px 0 0', fontWeight: 600 }}>탄생별 카드와 열두 가지 이야기</p>
              <p className="small" style={{ marginTop: 6 }}>
                운명 능력치, 겉모습과 속마음, 인생 3막, 다음 전성기, 행운 아이템,
                그리고 나와 잘 맞는 탄생별까지 한 화면에서 봅니다.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginTop: 52 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>아홉 행성</h2>
          <p className="small" style={{ marginTop: 8 }}>
            눈으로 보이는 일곱 천체에 라후와 케투를 더해 아홉으로 봅니다.
          </p>
          <ul className="grahaGrid">
            {GRAHAS.map((graha) => (
              <li key={graha.key}>
                <Link href={`/graha/${graha.sanskrit.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                  <span className="grahaGrid__glyph glyphTint" style={{ ['--glyph' as string]: graha.colorHex }}>
                    <GrahaGlyph graha={graha.key} size={34} title={graha.ko} />
                  </span>
                  <span className="grahaGrid__name">{graha.ko}</span>
                  <span className="grahaGrid__meta">{graha.keyword}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 14 }}>
            <Link href="/tradition/navagraha" className="small" style={{ color: 'var(--lapis)', fontWeight: 500 }}>
              아홉 행성 자세히 보기 →
            </Link>
          </p>
        </section>

        <section style={{ marginTop: 52 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>이런 유형이 나옵니다</h2>
          <p className="small" style={{ marginTop: 8 }}>27개 중 네 개만 미리 보면</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'grid', gap: 10 }}>
            {samples.map((n) => (
              <li key={n.key} className="card sampleRow">
                <span className="sampleRow__glyph glyphTint" style={{ ['--glyph' as string]: n.luckyColorHex }}>
                  <NakshatraGlyph nakshatra={n.key} size={40} />
                </span>
                <span>
                  <span className="sampleRow__name">{n.archetype}</span>
                  <span className="small" style={{ display: 'block', marginTop: 2 }}>{n.tagline}</span>
                </span>
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

      <JsonLd data={faqSchema(FAQ)} />
    </div>
  )
}
