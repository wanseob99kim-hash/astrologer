import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '../../components/JsonLd'
import { Footer } from '../../components/Footer'
import { articleSchema, breadcrumbSchema, faqSchema, absoluteUrl } from '@/lib/seo'

const PATH = '/compare/saju'
const PUBLISHED = '2026-09-06'

export const metadata: Metadata = {
  title: '사주와 인도 점성술은 뭐가 다른가',
  description:
    '사주는 태어난 시각의 간지를 보고, 인도 점성술(베딕)은 달이 머문 별자리를 봅니다. 기준·유형 수·인생 주기·궁합 방식이 어떻게 갈리는지 표로 정리했습니다.',
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: {
    type: 'article',
    title: '사주와 인도 점성술은 뭐가 다른가',
    description: '기준부터 다릅니다. 사주는 간지, 베딕은 달의 위치.',
    url: absoluteUrl(PATH),
  },
}

const ROWS = [
  {
    axis: '무엇을 기준으로 보나',
    saju: '태어난 연·월·일·시를 60갑자로 바꾼 여덟 글자',
    vedic: '태어난 순간 달이 머문 하늘의 구간',
  },
  {
    axis: '하늘을 재는 방식',
    saju: '절기 — 태양의 움직임으로 달을 나눔',
    vedic: '항성 황도대 — 실제 별자리 위치. 서양 점성술과 약 24° 어긋남',
  },
  {
    axis: '기본 유형 수',
    saju: '일간 10개 / 조합하면 60갑자',
    vedic: '27개 탄생별(나크샤트라)',
  },
  {
    axis: '인생의 흐름',
    saju: '대운 — 10년씩 균등하게 나눔',
    vedic: '다샤 — 행성마다 6년에서 20년까지 길이가 다름',
  },
  {
    axis: '태어난 시간의 무게',
    saju: '시주가 통째로 빠짐. 여덟 글자 중 두 글자를 잃음',
    vedic: '탄생별이 4명 중 1명꼴로 달라짐',
  },
  {
    axis: '궁합 방식',
    saju: '합·충 등 관계를 해석으로 읽음',
    vedic: '아쉬타쿠타 36점 — 여덟 항목에 배점이 정해진 계산',
  },
  {
    axis: '색·보석 같은 처방',
    saju: '오행의 부족을 보완하는 방식',
    vedic: '탄생별과 지배 행성에 정해진 색·보석·요일이 있음',
  },
] as const

const FAQ = [
  {
    q: '사주를 봤는데 베딕도 봐야 하나요?',
    a: '둘은 같은 것을 다르게 재는 체계가 아니라, 아예 다른 기준을 씁니다. 사주는 태어난 시각을 간지로 바꿔 오행의 균형을 보고, 베딕은 그 순간 달이 하늘 어디에 있었는지를 봅니다. 그래서 결과가 겹치지 않고, 사주에서 안 나오던 이야기가 나옵니다.',
  },
  {
    q: '서양 별자리와 베딕은 왜 다르게 나오나요?',
    a: '기준점이 다릅니다. 서양 점성술은 춘분점을 0도로 두는 회귀 황도대를 쓰고, 베딕은 실제 별의 위치를 따르는 항성 황도대를 씁니다. 지구 자전축이 천천히 흔들리면서 두 기준이 벌어져 지금은 약 24도 차이가 납니다. 그래서 서양에서 사자자리인 사람이 베딕에서는 게자리가 되는 일이 흔합니다.',
  },
  {
    q: '태어난 시간을 모르면 어느 쪽이 낫나요?',
    a: '사주는 여덟 글자 중 시주 두 글자가 통째로 빠집니다. 베딕은 달이 하루에 한 구간을 넘어가기도 해서, 시간을 모르면 탄생별이 4명 중 1명꼴로 달라집니다. 이 서비스는 그래서 시간을 모르는 분께 탄생별을 확정해서 알려드리지 않고, 생년월일만으로 정해지는 수호 행성까지만 확정으로 보여드립니다.',
  },
  {
    q: '어느 쪽이 더 정확한가요?',
    a: '정확도를 비교할 수 있는 종류의 것이 아닙니다. 둘 다 오래된 관찰과 해석의 체계이고, 재미로 즐기는 콘텐츠입니다. 다만 계산의 투명성 면에서는 차이가 있습니다. 베딕의 궁합은 여덟 항목에 배점이 정해져 있어 점수가 어떻게 나왔는지 항목별로 확인할 수 있습니다.',
  },
] as const

export default function CompareSajuPage() {
  return (
    <div className="shell" style={{ maxWidth: 720 }}>
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Saju vs Jyotish</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>
          사주와 인도 점성술은
          <br />
          뭐가 다른가
        </h1>
        <p className="lede" style={{ marginTop: 14, fontSize: 'var(--step-1)', color: 'var(--ink)' }}>
          한 줄로 줄이면, <strong>사주는 태어난 시각의 간지를 보고 베딕은 달이 머문 자리를 봅니다.</strong>
        </p>
        <p className="lede" style={{ marginTop: 12 }}>
          그래서 두 체계는 서로를 검증하지 않습니다. 사주에서 안 나오던 이야기가 베딕에서 나오는 건
          더 맞아서가 아니라 다른 걸 재기 때문입니다.
        </p>
      </header>

      <main>
        <section style={{ marginTop: 44 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>일곱 가지 축으로 비교</h2>
          <div className="tablewrap" style={{ marginTop: 18 }}>
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col">기준</th>
                  <th scope="col">사주</th>
                  <th scope="col">베딕</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.axis}>
                    <th scope="row">{row.axis}</th>
                    <td data-label="사주">{row.saju}</td>
                    <td data-label="베딕" className="vedic">{row.vedic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>24도의 어긋남</h2>
          <p className="lede" style={{ marginTop: 12 }}>
            서양 별자리에서 사자자리였는데 베딕에서 게자리가 나오면 대개 이것 때문입니다.
          </p>
          <p style={{ marginTop: 14, color: 'var(--ink-2)' }}>
            서양 점성술은 춘분점을 0도로 삼습니다. 그런데 지구 자전축이 약 2만 6천 년에 걸쳐 한 바퀴
            흔들리면서, 춘분점이 실제 별자리에서 조금씩 밀려납니다. 베딕은 이 밀림을 보정해 실제 별의
            위치를 따라갑니다. 그 보정값을 <strong>아야남샤</strong>라고 하고, 지금은 약 <strong>24.2도</strong>입니다.
          </p>
          <p className="small" style={{ marginTop: 12 }}>
            이 서비스는 인도 정부 표준인 라히리(Chitrapaksha) 아야남샤를 씁니다.
          </p>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>인생 흐름을 읽는 방식</h2>
          <p className="lede" style={{ marginTop: 12 }}>
            사주 대운은 10년씩 균등하게 끊습니다. 베딕 다샤는 끊는 길이가 제각각입니다.
          </p>
          <p style={{ marginTop: 14, color: 'var(--ink-2)' }}>
            아홉 행성이 120년을 나눠 맡는데, 케투는 7년이고 금성은 20년입니다. 어느 행성 구간에서
            태어났는지, 그 구간을 얼마나 지나서 태어났는지에 따라 시작점이 사람마다 다릅니다.
            그래서 같은 나이라도 서 있는 자리가 갈립니다.
          </p>
          <ul className="dashaBars" style={{ marginTop: 18 }}>
            {[
              { ko: '케투', years: 7 }, { ko: '금성', years: 20 }, { ko: '태양', years: 6 },
              { ko: '달', years: 10 }, { ko: '화성', years: 7 }, { ko: '라후', years: 18 },
              { ko: '목성', years: 16 }, { ko: '토성', years: 19 }, { ko: '수성', years: 17 },
            ].map((planet) => (
              <li key={planet.ko}>
                <span className="dashaBars__name">{planet.ko}</span>
                <span className="dashaBars__track">
                  <span className="dashaBars__fill" style={{ width: `${(planet.years / 20) * 100}%` }} />
                </span>
                <span className="dashaBars__value">{planet.years}년</span>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 14 }}>
            <Link href="/tradition/dasha" className="small" style={{ color: 'var(--lapis)', fontWeight: 500 }}>
              다샤 체계 자세히 보기 →
            </Link>
          </p>
        </section>

        <section style={{ marginTop: 48 }}>
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
        <p className="small" style={{ textAlign: 'center', marginTop: 10 }}>
          생년월일만 넣으면 30초면 끝나요.
        </p>
      </main>

      <Footer />

      <JsonLd
        data={articleSchema({
          path: PATH,
          headline: '사주와 인도 점성술은 뭐가 다른가',
          description: metadata.description ?? '',
          datePublished: PUBLISHED,
        })}
      />
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: '홈', path: '/' },
          { name: '사주와 베딕 비교', path: PATH },
        ])}
      />
    </div>
  )
}
