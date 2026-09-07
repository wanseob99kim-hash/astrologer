import type { Metadata } from 'next'
import Link from 'next/link'
import { GRAHAS } from '@/content/index'
import { absoluteUrl, articleSchema, breadcrumbSchema } from '@/lib/seo'
import { Footer } from '../../components/Footer'
import { GrahaGlyph } from '../../components/GrahaGlyph'
import { JsonLd } from '../../components/JsonLd'

const PATH = '/tradition/navagraha'
const PUBLISHED = '2026-09-06'

export const metadata: Metadata = {
  title: '나바그라하 — 아홉 행성',
  description:
    '베딕 점성술의 아홉 행성(나바그라하)을 지배 요일, 상징색, 보석, 다샤 주기와 함께 정리했습니다. 태양·달·화성·수성·목성·금성·토성에 라후와 케투가 더해집니다.',
  alternates: { canonical: absoluteUrl(PATH) },
  openGraph: { type: 'article', title: '나바그라하 — 아홉 행성', url: absoluteUrl(PATH) },
}

export default function NavagrahaPage() {
  return (
    <div className="shell" style={{ maxWidth: 760 }}>
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Tradition · Navagraha</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>
          아홉 행성
        </h1>
        <p className="lede" style={{ marginTop: 12 }}>
          베딕 점성술은 눈으로 볼 수 있는 일곱 천체에 라후와 케투를 더해 아홉으로 봅니다.
          라후와 케투는 실제 천체가 아니라, 달의 궤도가 태양의 길과 만나는 두 지점입니다.
          일식과 월식이 이 자리에서 일어나기 때문에 예로부터 특별하게 다뤘습니다.
        </p>
      </header>

      <main>
        <section style={{ marginTop: 36 }}>
          <ol className="grahaList">
            {GRAHAS.map((graha) => (
              <li key={graha.key}>
                <Link href={`/graha/${graha.sanskrit.toLowerCase()}`} className="grahaList__link">
                  <span className="grahaList__glyph" style={{ color: graha.colorHex }}>
                    <GrahaGlyph graha={graha.key} size={36} />
                  </span>
                  <span className="grahaList__body">
                    <span className="grahaList__name">
                      {graha.ko}
                      <span className="grahaList__lat">{graha.sanskrit}</span>
                    </span>
                    <span className="grahaList__meta">
                      물랑크 {graha.moolank} · {graha.weekday ?? '요일 없음'} · {graha.gemstone} · {graha.direction ?? '방위 없음'}
                    </span>
                    <span className="grahaList__copy">{graha.copy}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section style={{ marginTop: 44 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>다샤 주기는 왜 다른가</h2>
          <p style={{ marginTop: 12, color: 'var(--ink-2)' }}>
            아홉 행성이 나눠 맡는 기간을 모두 더하면 정확히 120년이 됩니다. 케투가 7년으로 가장 짧고
            금성이 20년으로 가장 깁니다. 이 길이는 전통으로 정해진 값이라 사람마다 달라지지 않습니다.
            달라지는 건 <strong>어느 행성 구간에서 태어났는가</strong>입니다.
          </p>
          <p style={{ marginTop: 12 }}>
            <Link href="/tradition/dasha" className="small" style={{ color: 'var(--lapis)', fontWeight: 500 }}>
              다샤 체계 자세히 보기 →
            </Link>
          </p>
        </section>

        <section style={{ marginTop: 40 }}>
          <div className="notice">
            <span aria-hidden="true">✦</span>
            <span>
              생년월일의 <b>일(日)</b> 자릿수를 더하면 이 아홉 중 하나가 나옵니다. 27일생이면 2+7=9,
              화성입니다. 계산이 필요 없어 태어난 시간을 몰라도 확정됩니다.
            </span>
          </div>
          <Link href="/birth" className="btn" style={{ marginTop: 18 }}>
            내 수호 행성 확인하기
          </Link>
        </section>
      </main>

      <Footer />

      <JsonLd
        data={articleSchema({
          path: PATH,
          headline: '나바그라하 — 베딕 점성술의 아홉 행성',
          description: metadata.description ?? '',
          datePublished: PUBLISHED,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: '홈', path: '/' },
          { name: '아홉 행성', path: PATH },
        ])}
      />
    </div>
  )
}
