import type { Metadata } from 'next'
import Link from 'next/link'
import { NAKSHATRAS } from '@/content/index'
import { Footer } from '../../components/Footer'

export const metadata: Metadata = {
  title: '27 탄생별(나크샤트라) 사전',
  description:
    '베딕 점성술의 27개 탄생별을 지배 행성, 신격, 상징, 기질과 함께 정리했습니다. 달이 하늘을 한 바퀴 도는 길을 27등분한 체계입니다.',
}

const deg = (value: number) => {
  const whole = Math.floor(value)
  return `${whole}°${String(Math.round((value - whole) * 60)).padStart(2, '0')}′`
}

export default function NakshatraIndexPage() {
  return (
    <div className="shell" style={{ maxWidth: 760 }}>
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Tradition · Nakshatra</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>
          27 탄생별 사전
        </h1>
        <p className="lede" style={{ marginTop: 12 }}>
          달이 하늘을 한 바퀴 도는 데 약 27일이 걸립니다. 인도에서는 그 길을 27등분해 구간마다 이름과 신격,
          상징, 지배 행성을 두었습니다. 태어난 순간 달이 머문 구간이 나의 탄생별입니다.
        </p>
      </header>

      <main>
        <ol style={{ listStyle: 'none', padding: 0, margin: '32px 0 0', display: 'grid', gap: 1, background: 'var(--line-soft)' }}>
          {NAKSHATRAS.map((n) => (
            <li key={n.key} style={{ background: 'var(--bg)', padding: '16px 4px' }}>
              <Link href={`/star/${n.key}`} style={{ textDecoration: 'none', display: 'grid', gridTemplateColumns: '52px 1fr', gap: 14 }}>
                <span
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: 'var(--step-1)',
                    color: 'var(--marigold)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {String(n.index + 1).padStart(2, '0')}
                </span>
                <span>
                  <span style={{ display: 'block', fontFamily: '"Gowun Batang", serif', fontWeight: 700, fontSize: 'var(--step-1)' }}>
                    {n.archetype}
                  </span>
                  <span className="small" style={{ display: 'block', marginTop: 2 }}>{n.tagline}</span>
                  <span
                    className="small"
                    style={{ display: 'block', marginTop: 6, fontFamily: '"IBM Plex Mono", monospace', opacity: .8 }}
                  >
                    {n.sanskrit} · {deg(n.range[0])}–{deg(n.range[1])} · {n.rashi.join(' · ')}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <Link href="/birth" className="btn" style={{ marginTop: 44 }}>
          내 탄생별 찾기
        </Link>
      </main>

      <Footer />
    </div>
  )
}
