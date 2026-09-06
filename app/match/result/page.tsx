import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { computeLevelOne } from '@/lib/astro/engine'
import { parseBirthInput } from '@/lib/astro/input'
import { computeMatch, formatScore } from '@/lib/astro/match'
import { absoluteUrl } from '@/lib/seo'
import { Footer } from '../../components/Footer'
import { ScoreBoard } from './ScoreBoard'

export const metadata: Metadata = {
  title: '궁합 결과',
  description: '아쉬타쿠타 36점 궁합 결과입니다.',
  alternates: { canonical: absoluteUrl('/match') },
  // 두 사람의 생년월일이 주소에 담기므로 색인하지 않는다.
  robots: { index: false, follow: false },
}

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value

export default async function MatchResultPage({ searchParams }: PageProps) {
  const query = await searchParams

  let outcome: ReturnType<typeof computeMatch>
  let nameA: string
  let nameB: string
  let starA: string
  let starB: string
  let retryHref: string

  try {
    const a = parseBirthInput({ date: first(query.ad), time: first(query.at), nickname: first(query.an) })
    const b = parseBirthInput({ date: first(query.bd), time: first(query.bt), nickname: first(query.bn) })

    outcome = computeMatch(a, b)
    nameA = a.nickname ?? '나'
    nameB = b.nickname ?? '상대'
    starA = computeLevelOne(a).nakshatra.archetype
    starB = computeLevelOne(b).nakshatra.archetype

    const back = new URLSearchParams({ d: a.date })
    if (a.time) back.set('t', a.time)
    if (a.nickname) back.set('n', a.nickname)
    retryHref = `/match?${back}`
  } catch {
    redirect('/birth')
  }

  const percent = Math.round((outcome.total / outcome.maxTotal) * 100)

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Ashtakoota · 36</p>
        <p className="small" style={{ marginTop: 12 }}>
          {nameA} × {nameB}
        </p>

        <p className="matchScore">
          <span className="matchScore__value">{formatScore(outcome.total)}</span>
          <span className="matchScore__max">/ {outcome.maxTotal}</span>
        </p>
        <h1 className="display" style={{ fontSize: 'var(--step-2)', marginTop: 6 }}>
          {outcome.band.ko}
        </h1>
        <p className="small" style={{ marginTop: 8 }}>
          {starA} × {starB} · 만점의 {percent}%
        </p>
      </header>

      <main>
        {!outcome.isTimeKnown ? (
          <div className="notice" style={{ marginTop: 24 }}>
            <span aria-hidden="true">✦</span>
            <span>
              두 사람 중 <b>태어난 시간을 모르는 쪽</b>이 있어 정오 기준으로 계산했습니다.
              탄생별이 달라질 수 있어 <b>확정된 결과가 아닙니다.</b>
            </span>
          </div>
        ) : null}

        <section style={{ marginTop: 30 }}>
          <h2 className="display" style={{ fontSize: 'var(--step-2)' }}>여덟 항목</h2>
          <p className="small" style={{ marginTop: 8 }}>
            항목마다 배점이 다릅니다. 막대 길이는 그 항목의 만점 대비 비율이에요.
          </p>
          <ScoreBoard kootas={outcome.kootas} />
        </section>

        {outcome.weakest ? (
          <section style={{ marginTop: 32 }}>
            <h2 className="eyebrow">가장 조심할 축</h2>
            <div className="card" style={{ marginTop: 12 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>
                {outcome.weakest.koota.ko}
                <span className="small" style={{ marginLeft: 8, fontWeight: 400 }}>
                  {outcome.weakest.koota.measures}
                </span>
              </p>
              <p style={{ margin: '10px 0 0' }}>{outcome.weakest.koota.low}</p>
            </div>
          </section>
        ) : (
          <section style={{ marginTop: 32 }}>
            <div className="card">
              <p style={{ margin: 0 }}>
                여덟 항목 모두 절반 이상입니다. 크게 걸리는 축이 없는 조합이에요.
              </p>
            </div>
          </section>
        )}

        <section style={{ marginTop: 32 }}>
          <div className="locked">
            <p className="eyebrow" style={{ color: 'var(--lapis)' }}>아직 잠겨 있어요</p>
            <p style={{ margin: '10px 0 0', fontWeight: 600 }}>여덟 항목 전체 해설과 처방</p>
            <ul className="locked__list">
              <li>항목마다 두 사람에게 실제로 어떻게 나타나는지</li>
              <li>기운(나디)과 살림(바쿠트)이 겹칠 때의 전통 해소법</li>
              <li>관계 타임라인과 배경화면용 얀트라</li>
            </ul>
            <p className="small" style={{ marginTop: 14 }}>준비 중입니다.</p>
          </div>
        </section>

        <section style={{ marginTop: 32 }}>
          <h2 className="eyebrow">이 점수는 이렇게 나왔습니다</h2>
          <p className="small" style={{ marginTop: 10, lineHeight: 1.75 }}>
            아쉬타쿠타는 전통적으로 남녀 역할을 나눠 계산해서, 누구를 먼저 넣느냐에 따라 점수가
            달라집니다{outcome.wasAsymmetric ? ' (이 조합도 그랬습니다)' : ''}. 저희는 성별을 묻지 않기 위해
            <strong> 양쪽 방향으로 계산해 평균</strong>을 냈습니다. 그래서 누가 먼저든 결과가 같고,
            점수 끝자리에 0.5가 나오기도 합니다.
          </p>
          <p className="small" style={{ marginTop: 10, lineHeight: 1.75 }}>
            결혼 가부를 판정하는 용도로 쓰지 않습니다. 낮게 나온 항목은 &ldquo;맞지 않는다&rdquo;가 아니라
            &ldquo;여기를 조심하라&rdquo;는 뜻으로 읽어 주세요.
          </p>
        </section>

        <Link href={retryHref} className="btn btn--ghost" style={{ marginTop: 40 }}>
          다른 사람과 보기
        </Link>
      </main>

      <Footer />
    </div>
  )
}
