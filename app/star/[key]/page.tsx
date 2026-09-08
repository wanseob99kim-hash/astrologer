import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { nakshatraByKey } from '@/content/index'
import { PLANET_KO, computeLevelOne, computeLevelZero } from '@/lib/astro/engine'
import { absoluteUrl } from '@/lib/seo'
import { parseBirthInput } from '@/lib/astro/input'
import type { LevelOneResult } from '@/lib/astro/types'
import { Footer } from '../../components/Footer'
import { NakshatraCard } from '../../components/NakshatraCard'
import { NakshatraWheel } from '../../components/NakshatraWheel'
import { RatingBars } from './RatingBars'
import { DashaTimeline } from './DashaTimeline'

interface PageProps {
  params: Promise<{ key: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

/** 분류값은 화면에 영문으로 노출하지 않는다. */
const GANA_KO: Record<string, string> = { Deva: '데바 — 신의 결', Manushya: '마누샤 — 사람의 결', Rakshasa: '락샤사 — 거센 결' }
const NADI_KO: Record<string, string> = { Adi: '아디', Madhya: '마디아', Antya: '안티아' }

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { key } = await params
  const nakshatra = nakshatraByKey(key)
  if (!nakshatra) return { title: '결과를 찾을 수 없습니다' }
  return {
    title: `${nakshatra.archetype} — ${nakshatra.tagline}`,
    description: nakshatra.copy,
    // 쿼리에 생년월일이 실린 개인 결과 주소가 따로 색인되지 않도록 정규 주소를 고정한다.
    alternates: { canonical: absoluteUrl(`/star/${nakshatra.key}`) },
    openGraph: {
      title: `나의 탄생별은 '${nakshatra.archetype}'`,
      description: nakshatra.tagline,
    },
  }
}

export default async function StarPage({ params, searchParams }: PageProps) {
  const { key } = await params
  const nakshatra = nakshatraByKey(key)
  if (!nakshatra) notFound()

  const query = await searchParams
  let result: LevelOneResult | null = null
  let nickname: string | undefined
  let zeroLabel: string | undefined
  let correctedHref: string | null = null

  try {
    const input = parseBirthInput({
      date: first(query.d),
      time: first(query.t),
      place: first(query.p),
      nickname: first(query.n),
    })
    nickname = input.nickname
    result = computeLevelOne(input)
    zeroLabel = computeLevelZero(input).graha.ko

    // 주소의 탄생별과 계산 결과가 다르면 올바른 주소로 보낸다.
    if (result.nakshatra.key !== nakshatra.key) {
      const corrected = new URLSearchParams(
        Object.entries(query).flatMap(([k, v]) => {
          const value = first(v)
          return value ? [[k, value] as [string, string]] : []
        }),
      )
      correctedHref = `/star/${result.nakshatra.key}?${corrected}`
    }
  } catch {
    // 생년월일 없이 열린 공유 링크. 유형 설명만 보여준다.
    result = null
  }

  // redirect() 는 특수 예외를 던지므로 반드시 try 밖에서 호출한다.
  if (correctedHref) redirect(correctedHref)

  const matchParams = new URLSearchParams()
  if (result) {
    matchParams.set('d', first(query.d) ?? '')
    const time = first(query.t)
    if (time) matchParams.set('t', time)
    if (nickname) matchParams.set('n', nickname)
  }
  const matchHref = `/match?${matchParams}`

  const isProvisional = result !== null && !result.isTimeKnown

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow">
          {result ? '나의 탄생별' : '탄생별 사전'} · 나크샤트라 {String(nakshatra.index + 1).padStart(2, '0')}
        </p>
        {nickname ? <p className="small" style={{ marginTop: 12 }}>{nickname} 님의 탄생별</p> : null}
        <h1 className="display" style={{ fontSize: 'var(--step-4)', marginTop: nickname ? 4 : 14 }}>
          {nakshatra.archetype}
        </h1>
        <p style={{ margin: '10px 0 0', fontSize: 'var(--step-1)', color: 'var(--ink-2)' }}>
          {nakshatra.tagline}
        </p>
        <p className="names">
          {nakshatra.ko} · {nakshatra.sanskrit} · <span className="dev">{nakshatra.devanagari}</span>
        </p>

        <div className="cardHero">
          <NakshatraCard
            index={nakshatra.index}
            glyphKey={nakshatra.key}
            archetype={nakshatra.archetype}
            keyword={nakshatra.keyword}
            accent={nakshatra.luckyColorHex}
          />
        </div>

        <NakshatraWheel
          activeIndex={nakshatra.index}
          glyphKey={nakshatra.key}
          moonLongitude={result?.moonLongitude}
          archetype={nakshatra.archetype}
        />

        <ul className="chips" style={{ marginTop: 16 }}>
          <li className="chip chip--accent">{nakshatra.keyword}</li>
          <li className="chip">{nakshatra.luckyColor}</li>
          <li className="chip">{nakshatra.gemstone}</li>
          <li className="chip">행운의 수 {nakshatra.luckyNumber}</li>
        </ul>
      </header>

      <main>
        {isProvisional ? (
          <div className="notice" style={{ marginTop: 24 }}>
            <span aria-hidden="true">✦</span>
            <span>
              태어난 시간을 몰라 <b>정오 기준</b>으로 계산했습니다. 이 경우 4명 중 1명꼴로 탄생별이 달라지니
              <b> 확정된 결과가 아닙니다.</b> 시간을 알게 되면 다시 확인해 보세요.
            </span>
          </div>
        ) : null}

        <p style={{ marginTop: 26, fontSize: 'var(--step-1)', lineHeight: 1.75 }}>{nakshatra.copy}</p>

        {result ? (
          <div className="card" style={{ marginTop: 24 }}>
            <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 16px', fontSize: 'var(--step--1)' }}>
              <dt style={{ color: 'var(--muted)' }}>수호 행성</dt>
              <dd style={{ margin: 0 }}>{zeroLabel}</dd>
              <dt style={{ color: 'var(--muted)' }}>지배성</dt>
              <dd style={{ margin: 0 }}>{PLANET_KO[nakshatra.lord] ?? nakshatra.lord}</dd>
              <dt style={{ color: 'var(--muted)' }}>달의 자리</dt>
              <dd style={{ margin: 0, fontFamily: '"IBM Plex Mono", monospace' }}>
                {result.moonRashi} {result.moonLongitude.toFixed(2)}°
              </dd>
              <dt style={{ color: 'var(--muted)' }}>파다</dt>
              <dd style={{ margin: 0 }}>
                {result.isPadaReliable ? `${result.pada}번째` : '시간을 알아야 정해집니다'}
              </dd>
            </dl>
          </div>
        ) : null}

        <hr className="rule" style={{ margin: '32px 0' }} />

        <section>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>다섯 축</h2>
          <p className="small" style={{ marginTop: 8 }}>
            전통 성격 서술을 근거로 매긴 값입니다. 계산으로 나온 수치는 아니에요.
          </p>
          <RatingBars ratings={nakshatra.ratings} />
        </section>

        <section style={{ marginTop: 34 }}>
          <h2 className="eyebrow" style={{ color: 'var(--lapis)' }}>이런 점이 강합니다</h2>
          <ul style={{ margin: '12px 0 0', paddingLeft: 18, display: 'grid', gap: 5 }}>
            {nakshatra.strengths.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section style={{ marginTop: 26 }}>
          <h2 className="eyebrow">이런 점을 조심하세요</h2>
          <ul style={{ margin: '12px 0 0', paddingLeft: 18, display: 'grid', gap: 5, color: 'var(--ink-2)' }}>
            {nakshatra.shadows.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section style={{ marginTop: 30, display: 'grid', gap: 14 }}>
          <div className="card">
            <p className="eyebrow" style={{ color: 'var(--lapis)' }}>연애</p>
            <p style={{ margin: '8px 0 0' }}>{nakshatra.love}</p>
          </div>
          <div className="card">
            <p className="eyebrow" style={{ color: 'var(--lapis)' }}>재물</p>
            <p style={{ margin: '8px 0 0' }}>{nakshatra.wealth}</p>
          </div>
        </section>

        {result ? (
          <section style={{ marginTop: 40 }}>
            <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>인생의 흐름</h2>
            <p className="small" style={{ marginTop: 8 }}>
              빔쇼타리 다샤 — 아홉 행성이 6년에서 20년씩, 120년을 나눠 맡습니다.
            </p>
            <DashaTimeline timeline={result.dasha.timeline} />
          </section>
        ) : null}

        <section style={{ marginTop: 40 }}>
          <h2 className="eyebrow">전통</h2>
          <p style={{ marginTop: 10, color: 'var(--ink-2)' }}>{nakshatra.ritual}</p>
          <dl className="itemGrid" style={{ marginTop: 14 }}>
            <div><dt>색</dt><dd><span className="swatch" style={{ background: nakshatra.luckyColorHex }} />{nakshatra.luckyColor}</dd></div>
            <div><dt>보석</dt><dd>{nakshatra.gemstone}</dd></div>
            <div><dt>방위</dt><dd>{nakshatra.direction}</dd></div>
            <div><dt>숫자</dt><dd>{nakshatra.luckyNumber}</dd></div>
            <div><dt>신격</dt><dd>{nakshatra.deityKo}</dd></div>
            <div><dt>상징</dt><dd>{nakshatra.symbolKo}</dd></div>
            <div><dt>기질</dt><dd>{GANA_KO[nakshatra.gana] ?? nakshatra.gana}</dd></div>
            <div><dt>동물</dt><dd>{nakshatra.yoniKo}</dd></div>
            <div><dt>기운</dt><dd>{NADI_KO[nakshatra.nadi] ?? nakshatra.nadi}</dd></div>
            <div><dt>라시</dt><dd>{nakshatra.rashi.join(' · ')}</dd></div>
          </dl>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 className="eyebrow">어울리는 일</h2>
          <ul className="chips" style={{ marginTop: 12 }}>
            {nakshatra.career.map((item) => <li key={item} className="chip">{item}</li>)}
          </ul>
        </section>

        {result ? (
          <section style={{ marginTop: 44 }}>
            <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>연인과의 궁합</h2>
            <p className="small" style={{ marginTop: 8 }}>
              인도 전통 아쉬타쿠타 36점. 여덟 항목의 점수를 그대로 보여드립니다.
            </p>
            <Link href={matchHref} className="btn" style={{ marginTop: 16 }}>
              궁합 보기
            </Link>
          </section>
        ) : null}

        <Link href="/birth" className="btn btn--ghost" style={{ marginTop: 24 }}>
          다시 해보기
        </Link>
      </main>

      <Footer />
    </div>
  )
}
