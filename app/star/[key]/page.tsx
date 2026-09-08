import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { nakshatraByKey } from '@/content/index'
import { PLANET_KO, computeLevelOne, computeLevelZero } from '@/lib/astro/engine'
import { parseBirthInput } from '@/lib/astro/input'
import type { LevelOneResult, LevelZeroResult } from '@/lib/astro/types'
import { absoluteUrl } from '@/lib/seo'
import { Footer } from '../../components/Footer'
import { NakshatraCard } from '../../components/NakshatraCard'
import { NakshatraWheel } from '../../components/NakshatraWheel'
import { DashaTimeline } from './DashaTimeline'
import {
  FortuneCards,
  GradeSummary,
  LuckyItems,
  PersonalityCards,
  MatchPreview,
  PeakChart,
  RETURN_CYCLE_YEARS,
  SelfContrast,
  ThreeActs,
  upcomingPeak,
} from './ResultSections'

interface PageProps {
  params: Promise<{ key: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

/**
 * 기질 표기.
 * 원어(데바·마누샤·락샤사)를 그대로 두면 읽는 사람에게 아무 뜻도 전해지지 않아
 * 우리말 설명만 남긴다. 기운(나디)은 궁합 계산에만 쓰이고 개인 결과에서는
 * 뜻이 서지 않아 화면에서 뺐다.
 */
const GANA_KO: Record<string, string> = {
  Deva: '부드럽고 잘 맞춰주는 결',
  Manushya: '재고 따지는 현실적인 결',
  Rakshasa: '세고 밀어붙이는 결',
}

/** 인도에서 쓰는 샤카력. 서기에서 78을 뺀다. */
const SHAKA_OFFSET = 78

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
  let zero: LevelZeroResult | null = null
  let nickname: string | undefined
  let birthYear: number | undefined
  let age: number | undefined
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
    zero = computeLevelZero(input)
    birthYear = Number(input.date.slice(0, 4))
    age = new Date().getUTCFullYear() - birthYear

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
  const who = nickname ? `${nickname} 님` : '당신'
  const peak = upcomingPeak(nakshatra.peak.from, nakshatra.peak.to, age)
  const isProvisional = result !== null && !result.isTimeKnown

  return (
    <div className="shell">
      <header className="resultHead">
        <p className="eyebrow eyebrow--latin">Nakshatra {String(nakshatra.index + 1).padStart(2, '0')}</p>
        {result ? <p className="small" style={{ marginTop: 10 }}>{who}의 탄생별은</p> : null}

        <div className="cardHero">
          <NakshatraCard
            index={nakshatra.index}
            glyphKey={nakshatra.key}
            archetype={nakshatra.archetype}
            keyword={nakshatra.keyword}
            accent={nakshatra.luckyColorHex}
          />
        </div>

        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 18 }}>
          {nakshatra.archetype}
        </h1>
        <p style={{ margin: '8px 0 0', fontSize: 'var(--step-1)', color: 'var(--ink-2)' }}>
          {nakshatra.tagline}
        </p>
        <p className="names">
          {nakshatra.ko} · {nakshatra.sanskrit} · <span className="dev">{nakshatra.devanagari}</span>
        </p>
      </header>

      <main>
        {isProvisional ? (
          <div className="notice" style={{ marginTop: 22 }}>
            <span aria-hidden="true">✦</span>
            <span>
              태어난 시간을 몰라 <b>정오 기준</b>으로 계산했습니다. 이 경우 4명 중 1명꼴로 탄생별이 달라지니
              <b> 확정된 결과가 아닙니다.</b>
            </span>
          </div>
        ) : null}

        <p className="resultLede">{nakshatra.copy}</p>

        {result && zero ? (
          <section className="sect">
            <h2 className="sect__title">베딕으로 본 {who}</h2>
            <p className="small">
              베딕 점성술은 탄생별(나크샤트라)·지배 행성·달의 자리·기질·생일 숫자에
              인생 구간(다샤)까지 여섯 축으로 봅니다.
            </p>
            <dl className="itemGrid itemGrid--wide">
              <div><dt>탄생별</dt><dd>{nakshatra.ko} · {nakshatra.archetype}</dd></div>
              <div><dt>지배 행성</dt><dd>{PLANET_KO[nakshatra.lord] ?? nakshatra.lord}</dd></div>
              <div><dt>수호 신격</dt><dd>{nakshatra.deityKo}</dd></div>
              <div><dt>상징</dt><dd>{nakshatra.symbolKo}</dd></div>
              <div><dt>수호 행성</dt><dd>{zero.graha.ko}</dd></div>
              <div><dt>태어난 요일</dt><dd>{zero.weekdayKo}</dd></div>
              <div><dt>달의 자리</dt><dd>{result.moonRashi} {result.moonLongitude.toFixed(1)}°</dd></div>
              <div><dt>기질</dt><dd>{GANA_KO[nakshatra.gana] ?? nakshatra.gana}</dd></div>
              <div><dt>상징 동물</dt><dd>{nakshatra.yoniKo}</dd></div>
              <div><dt>생일 숫자</dt><dd>{zero.moolank} · {zero.graha.keyword}</dd></div>
              <div><dt>운명 숫자</dt><dd>{zero.bhagyank} · {zero.destinyGraha.keyword}</dd></div>
              <div><dt>행운의 색</dt><dd><span className="swatch" style={{ background: nakshatra.luckyColorHex }} />{nakshatra.luckyColor}</dd></div>
              <div><dt>행운의 방향</dt><dd>{nakshatra.direction}</dd></div>
              <div><dt>파다</dt><dd>{result.isPadaReliable ? `${result.pada}번째` : '시간을 알아야 정해집니다'}</dd></div>
              <div><dt>인도 달력</dt><dd>샤카력 {(birthYear ?? 0) - SHAKA_OFFSET}년생</dd></div>
            </dl>
          </section>
        ) : null}

        <section className="sect">
          <h2 className="sect__title">{who}, 이런 사람입니다</h2>
          <SelfContrast nakshatra={nakshatra} />
        </section>

        <section className="sect">
          <h2 className="sect__title">성격 깊게 보기</h2>
          <p className="small">위 세 개는 타고난 힘, 아래 세 개는 조심할 결입니다.</p>
          <PersonalityCards nakshatra={nakshatra} />
        </section>

        <section className="sect">
          <h2 className="sect__title">운명 능력치</h2>
          <p className="small">눌러보면 아래에 설명이 이어집니다. 전통 성격 서술을 근거로 매긴 값이라 계산 결과는 아니에요.</p>
          <GradeSummary ratings={nakshatra.ratings} />
        </section>

        <section className="sect">
          <h2 className="sect__title">항목별로 보면</h2>
          <FortuneCards nakshatra={nakshatra} />
        </section>

        <section className="sect">
          <h2 className="sect__title">인생 3막 흐름</h2>
          <ThreeActs peakFrom={nakshatra.peak.from} />
        </section>

        <section className="sect">
          <h2 className="sect__title">
            {age !== undefined && age >= peak.from && age <= peak.to ? '지금이 전성기입니다' : '다음 전성기'}
          </h2>
          <p className="peakRange">{peak.from}–{peak.to}세</p>
          {age !== undefined ? (
            <p className="small">
              지금 {age}세 · {age < peak.from
                ? `${peak.from - age}년 남았습니다`
                : age <= peak.to
                  ? '이 구간 한가운데입니다'
                  : ''}
            </p>
          ) : null}
          {!peak.isFirst ? (
            <p className="small" style={{ marginTop: 6 }}>
              타고난 첫 전성기 {nakshatra.peak.from}–{nakshatra.peak.to}세는 이미 지나왔습니다.
              전통에서는 목성이 하늘을 한 바퀴 도는 {RETURN_CYCLE_YEARS}년마다 같은 기운이 다시 온다고 봅니다.
            </p>
          ) : null}
          <PeakChart from={peak.from} to={peak.to} />
          <p className="eyebrow" style={{ marginTop: 14, color: 'var(--lapis)' }}>전성기가 오기 전 신호</p>
          <ul className="bullets" style={{ marginTop: 10 }}>
            {nakshatra.peak.signals.map((v) => <li key={v}>{v}</li>)}
          </ul>
        </section>

        <section className="sect sect--warn">
          <h2 className="sect__title">이건 조심하세요</h2>
          <ul className="bullets bullets--warn">
            {nakshatra.cautions.map((v) => <li key={v}>{v}</li>)}
          </ul>
        </section>

        {result ? (
          <section className="sect">
            <h2 className="sect__title">인생의 흐름</h2>
            <p className="small">빔쇼타리 다샤 — 아홉 행성이 6년에서 20년씩, 120년을 나눠 맡습니다.</p>
            <DashaTimeline timeline={result.dasha.timeline} />
          </section>
        ) : null}

        <section className="sect">
          <h2 className="sect__title">행운 아이템 &amp; 잘 맞는 일</h2>
          <LuckyItems nakshatra={nakshatra} />
          <div className="ritual">
            <p className="eyebrow" style={{ color: 'var(--marigold)' }}>전통 처방</p>
            <p style={{ margin: '8px 0 0' }}>{nakshatra.ritual}</p>
            <p className="small" style={{ marginTop: 10 }}>
              인도에서 오래 해오던 방식입니다. 효험을 믿어서라기보다, 중요한 날에
              마음을 다잡는 장치로 씁니다. 안 해도 결과가 달라지지는 않아요.
            </p>
          </div>
        </section>

        <section className="sect">
          <h2 className="sect__title">나와 잘 맞는 탄생별</h2>
          <MatchPreview nakshatra={nakshatra} matchHref={result ? matchHref : '/birth'} />
        </section>

        <section className="sect">
          <h2 className="sect__title">달이 있던 자리</h2>
          <NakshatraWheel
            activeIndex={nakshatra.index}
            glyphKey={nakshatra.key}
            moonLongitude={result?.moonLongitude}
            archetype={nakshatra.archetype}
          />
        </section>

        <Link href="/birth" className="btn btn--ghost" style={{ marginTop: 34 }}>
          다시 해보기
        </Link>
      </main>

      <Footer />
    </div>
  )
}
