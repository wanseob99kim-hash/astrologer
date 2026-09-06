import type { Metadata } from 'next'
import Link from 'next/link'
import { GRAHAS } from '@/content/index'
import { absoluteUrl, articleSchema, breadcrumbSchema, faqSchema } from '@/lib/seo'
import { Footer } from '../../components/Footer'
import { JsonLd } from '../../components/JsonLd'

const PATH = '/tradition/dasha'
const PUBLISHED = '2026-09-06'
const TOTAL_YEARS = 120

export const metadata: Metadata = {
  title: '빔쇼타리 다샤 — 120년 인생 주기',
  description:
    '베딕 점성술이 인생의 흐름을 읽는 방식입니다. 아홉 행성이 6년에서 20년씩 120년을 나눠 맡고, 시작점은 태어날 때 달이 머문 탄생별이 정합니다.',
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: { type: 'article', title: '빔쇼타리 다샤 — 120년 인생 주기', url: absoluteUrl(PATH) },
}

/** 빔쇼타리 순환 순서. 이 순서는 전통으로 고정돼 있다. */
const CYCLE_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'] as const

const FAQ = [
  {
    q: '왜 하필 120년인가요?',
    a: '아홉 행성에 배정된 기간을 모두 더한 값이 120년입니다. 사람의 온전한 수명을 120년으로 보던 관점에서 나온 체계라, 대부분은 이 주기를 한 바퀴 다 돌지 않고 일부 구간만 지나갑니다.',
  },
  {
    q: '대운 시작이 사람마다 다른 이유는요?',
    a: '태어날 때 달이 어느 탄생별의 어디쯤에 있었는지로 정해집니다. 탄생별마다 담당 행성이 있고, 그 구간을 이미 얼마나 지나왔는지만큼을 빼고 남은 기간부터 인생이 시작됩니다. 그래서 같은 해에 태어나도 첫 대운이 다릅니다.',
  },
  {
    q: '사주의 대운과 뭐가 다른가요?',
    a: '사주 대운은 10년씩 균등하게 끊습니다. 다샤는 행성마다 길이가 달라 케투는 7년, 금성은 20년입니다. 그래서 "지금 몇 대운"이라는 표현이 성립하지 않고, 어느 행성 구간을 지나고 있는지로 말합니다.',
  },
  {
    q: '태어난 시간을 모르면 다샤도 못 보나요?',
    a: '볼 수는 있지만 정확하지 않습니다. 다샤의 시작점은 달의 위치가 정하는데, 달은 하루에도 자리를 옮깁니다. 시간을 모르면 4명 중 1명꼴로 시작 행성 자체가 달라집니다. 그래서 이 서비스는 시간을 모르는 분께 다샤를 확정해서 보여드리지 않습니다.',
  },
] as const

export default function DashaPage() {
  const ordered = CYCLE_ORDER.map((key) => GRAHAS.find((graha) => graha.key === key)).filter(
    (graha): graha is NonNullable<typeof graha> => graha !== undefined,
  )
  const sum = ordered.reduce((total, graha) => total + graha.dashaYears, 0)

  return (
    <div className="shell" style={{ maxWidth: 720 }}>
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Tradition · Vimshottari Dasha</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>
          빔쇼타리 다샤
        </h1>
        <p className="lede" style={{ marginTop: 14, fontSize: 'var(--step-1)', color: 'var(--ink)' }}>
          아홉 행성이 120년을 나눠 맡습니다. 각자 맡은 기간의 길이가 다릅니다.
        </p>
        <p className="lede" style={{ marginTop: 12 }}>
          베딕 점성술이 인생의 흐름을 읽는 방식입니다. 지금 어느 행성의 구간을 지나고 있는지가
          그 시기의 색을 정한다고 봅니다.
        </p>
      </header>

      <main>
        <section style={{ marginTop: 40 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>순환 순서와 기간</h2>
          <p className="small" style={{ marginTop: 8 }}>
            이 순서와 길이는 전통으로 고정돼 있어 사람마다 달라지지 않습니다.
          </p>
          <ul className="dashaBars" style={{ marginTop: 18 }}>
            {ordered.map((graha) => (
              <li key={graha.key}>
                <span className="dashaBars__name">{graha.ko}</span>
                <span className="dashaBars__track">
                  <span
                    className="dashaBars__fill"
                    style={{ width: `${(graha.dashaYears / 20) * 100}%`, background: graha.colorHex }}
                  />
                </span>
                <span className="dashaBars__value">{graha.dashaYears}년</span>
              </li>
            ))}
          </ul>
          <p className="small" style={{ marginTop: 14, textAlign: 'right' }}>
            합계 {sum}년 {sum === TOTAL_YEARS ? '' : '(확인 필요)'}
          </p>
        </section>

        <section style={{ marginTop: 44 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>시작점은 탄생별이 정합니다</h2>
          <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>
            27개 탄생별에는 각각 담당 행성이 있습니다. 첫 번째 아쉬위니는 케투, 두 번째 바라니는 금성 —
            이렇게 아홉 행성이 세 바퀴 돕니다. 태어날 때 달이 머문 탄생별의 담당 행성이 첫 대운이 됩니다.
          </p>
          <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>
            여기서 한 번 더 나눕니다. 그 탄생별 구간을 이미 절반쯤 지나서 태어났다면, 첫 대운도 절반만
            남은 상태로 시작합니다. 그래서 같은 탄생별이어도 시작 나이가 다릅니다.
          </p>
          <div className="notice" style={{ marginTop: 18 }}>
            <span aria-hidden="true">✦</span>
            <span>
              예를 들어 아누라다(담당 토성)의 41% 지점에서 태어났다면, 토성 대운 19년 중
              <b> 11.2년만 남은 상태</b>로 인생이 시작됩니다. 만 11세부터는 다음 행성인 수성 구간입니다.
            </span>
          </div>
        </section>

        <section style={{ marginTop: 44 }}>
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
          내 다샤 확인하기
        </Link>
        <p className="small" style={{ textAlign: 'center', marginTop: 10 }}>
          태어난 시간까지 넣으면 지금 구간이 표시됩니다.
        </p>
      </main>

      <Footer />

      <JsonLd
        data={articleSchema({
          path: PATH,
          headline: '빔쇼타리 다샤 — 120년 인생 주기',
          description: metadata.description ?? '',
          datePublished: PUBLISHED,
        })}
      />
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: '홈', path: '/' },
          { name: '빔쇼타리 다샤', path: PATH },
        ])}
      />
    </div>
  )
}
