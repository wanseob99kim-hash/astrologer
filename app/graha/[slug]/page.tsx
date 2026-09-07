import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GRAHAS } from '@/content/index'
import { grahaBySlug, grahaSlug } from '@/lib/astro/engine'
import { absoluteUrl } from '@/lib/seo'
import { normalizeDate, normalizeNickname } from '@/lib/astro/input'
import { Footer } from '../../components/Footer'
import { GrahaGlyph } from '../../components/GrahaGlyph'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value

export function generateStaticParams() {
  return GRAHAS.map((graha) => ({ slug: grahaSlug(graha) }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const graha = grahaBySlug(slug)
  if (!graha) return { title: '결과를 찾을 수 없습니다' }
  return {
    title: `${graha.ko} — 나를 지키는 행성`,
    description: graha.copy,
    alternates: { canonical: absoluteUrl(`/graha/${grahaSlug(graha)}`) },
  }
}

export default async function GrahaPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const graha = grahaBySlug(slug)
  if (!graha) notFound()

  const query = await searchParams
  const nickname = normalizeNickname(first(query.n))

  // 날짜가 없어도 페이지 자체는 읽을 수 있어야 한다(공유 링크). 다음 단계로만 못 넘어간다.
  let isoDate: string | undefined
  try {
    isoDate = normalizeDate(first(query.d) ?? '')
  } catch {
    isoDate = undefined
  }

  const refineHref = isoDate
    ? `/refine?${new URLSearchParams({ d: isoDate, ...(nickname ? { n: nickname } : {}) })}`
    : '/birth'

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow">Step 1 결과 · 나바그라하</p>
        <div className="heroGlyph glyphTint" style={{ ['--glyph' as string]: graha.colorHex }}>
          <GrahaGlyph graha={graha.key} size={92} title={`${graha.ko} 기호`} />
        </div>
        {nickname ? (
          <p className="small" style={{ marginTop: 12 }}>{nickname} 님을 지키는 행성은</p>
        ) : null}
        <h1 className="display" style={{ fontSize: 'var(--step-4)', marginTop: nickname ? 4 : 14 }}>
          {graha.ko}
        </h1>
        <p style={{ margin: '8px 0 0', color: 'var(--muted)', fontFamily: '"IBM Plex Mono", monospace', fontSize: 'var(--step--1)' }}>
          {graha.sanskrit} · 물랑크 {graha.moolank}
        </p>

        <ul className="chips" style={{ marginTop: 16 }}>
          <li className="chip chip--accent">{graha.keyword}</li>
          <li className="chip">{graha.deityKo.split(' —')[0]}</li>
        </ul>
      </header>

      <main>
        <p style={{ marginTop: 26, fontSize: 'var(--step-1)', lineHeight: 1.75 }}>{graha.copy}</p>

        <hr className="rule" style={{ margin: '30px 0' }} />

        <section>
          <h2 className="eyebrow" style={{ color: 'var(--lapis)' }}>타고난 힘</h2>
          <ul style={{ margin: '12px 0 0', paddingLeft: 18, display: 'grid', gap: 5 }}>
            {graha.strengths.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section style={{ marginTop: 26 }}>
          <h2 className="eyebrow">그림자</h2>
          <ul style={{ margin: '12px 0 0', paddingLeft: 18, display: 'grid', gap: 5, color: 'var(--ink-2)' }}>
            {graha.shadows.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2 className="eyebrow" style={{ color: 'var(--lapis)' }}>행운 아이템</h2>
          <dl className="itemGrid">
            <div><dt>색</dt><dd><span className="swatch" style={{ background: graha.colorHex }} />{graha.color}</dd></div>
            <div><dt>보석</dt><dd>{graha.gemstone}</dd></div>
            <div><dt>요일</dt><dd>{graha.weekday ?? '없음'}</dd></div>
            <div><dt>방위</dt><dd>{graha.direction ?? '없음'}</dd></div>
            <div><dt>숫자</dt><dd>{graha.luckyNumber}</dd></div>
            <div><dt>신격</dt><dd>{graha.deityKo}</dd></div>
          </dl>
        </section>

        <section style={{ marginTop: 30 }}>
          <h2 className="eyebrow">전통 처방</h2>
          <p style={{ marginTop: 10, color: 'var(--ink-2)' }}>{graha.remedy}</p>
          <div className="mantra">
            <p className="eyebrow" style={{ color: 'var(--marigold)' }}>비자 만트라</p>
            <p className="mantra__text">{graha.mantra}</p>
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <div className="notice">
            <span aria-hidden="true">✦</span>
            <span>
              여기까지는 <b>생년월일만으로 확정</b>된 결과입니다.
              27개 탄생별은 태어난 순간 달의 위치로 정해져서, 시간을 알아야 확정할 수 있어요.
            </span>
          </div>

          <Link href={refineHref} className="btn" style={{ marginTop: 18 }}>
            {isoDate ? '탄생별까지 확인하기' : '생년월일 입력하러 가기'}
          </Link>
          <p className="small" style={{ textAlign: 'center', marginTop: 10 }}>
            태어난 시간을 몰라도 볼 수 있어요.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
