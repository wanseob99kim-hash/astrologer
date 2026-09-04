import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { normalizeDate, normalizeNickname } from '@/lib/astro/input'
import { Footer } from '../components/Footer'
import { RefineForm } from './RefineForm'

export const metadata: Metadata = {
  title: '태어난 시간 입력',
  description: '태어난 시간과 장소를 더하면 27개 탄생별이 확정됩니다.',
}

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value

export default async function RefinePage({ searchParams }: PageProps) {
  const query = await searchParams

  let isoDate: string
  try {
    isoDate = normalizeDate(first(query.d) ?? '')
  } catch {
    redirect('/birth')
  }

  const nickname = normalizeNickname(first(query.n))

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Step 2 / 2</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>
          태어난 시간을 더하면
          <br />
          탄생별이 정해집니다
        </h1>
        <p className="lede" style={{ marginTop: 12 }}>
          달은 하루에도 자리를 옮깁니다. 그래서 시간을 모르면 4명 중 1명꼴로 탄생별이 달라져요.
          모르셔도 볼 수는 있지만, 그때는 확정해서 알려드리지 않습니다.
        </p>
      </header>

      <main>
        <RefineForm isoDate={isoDate} nickname={nickname} />
      </main>

      <Footer />
    </div>
  )
}
