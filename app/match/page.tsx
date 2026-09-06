import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { normalizeDate, normalizeNickname, normalizeTime } from '@/lib/astro/input'
import { absoluteUrl } from '@/lib/seo'
import { Footer } from '../components/Footer'
import { InviteLink } from './InviteLink'
import { MatchForm } from './MatchForm'

export const metadata: Metadata = {
  title: '연인 궁합 보기',
  description:
    '인도 전통 아쉬타쿠타 36점으로 두 사람의 궁합을 봅니다. 여덟 항목에 배점이 정해져 있어 점수가 어떻게 나왔는지 항목별로 확인할 수 있습니다.',
  alternates: { canonical: absoluteUrl('/match') },
  robots: { index: false, follow: true },
}

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value

export default async function MatchPage({ searchParams }: PageProps) {
  const query = await searchParams

  let inviterDate: string
  try {
    inviterDate = normalizeDate(first(query.d) ?? '')
  } catch {
    redirect('/birth')
  }

  const inviterTime = (() => {
    try {
      return normalizeTime(first(query.t))
    } catch {
      return undefined
    }
  })()
  const inviterNickname = normalizeNickname(first(query.n))

  const inviteParams = new URLSearchParams({ d: inviterDate })
  if (inviterTime) inviteParams.set('t', inviterTime)
  if (inviterNickname) inviteParams.set('n', inviterNickname)

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Ashtakoota · 36</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>
          두 사람의 궁합
        </h1>
        <p className="lede" style={{ marginTop: 14 }}>
          인도에서 오래 쓰인 <strong>아쉬타쿠타</strong> 방식입니다. 여덟 항목에 1점부터 8점까지
          배점이 정해져 있어, 총점이 어떻게 나왔는지 항목별로 뜯어볼 수 있습니다.
        </p>
      </header>

      <main>
        <div className="notice" style={{ marginTop: 24 }}>
          <span aria-hidden="true">✦</span>
          <span>
            낮은 점수도 그대로 보여드립니다. 점수를 좋게만 나오게 만들면 그건 궁합이 아니라
            <b> 덕담</b>이니까요.
          </span>
        </div>

        <MatchForm
          inviter={{ date: inviterDate, time: inviterTime, nickname: inviterNickname }}
        />

        <hr className="rule" style={{ margin: '34px 0 22px' }} />

        <section>
          <h2 className="eyebrow">상대가 옆에 없다면</h2>
          <p className="small" style={{ margin: '10px 0 14px' }}>
            링크를 보내면 상대가 자기 생년월일만 넣고 같은 결과를 볼 수 있어요.
          </p>
          <InviteLink path={`/match?${inviteParams}`} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
