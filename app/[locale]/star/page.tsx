import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { computeLevelOne } from '@/lib/astro/engine'
import { parseBirthInput } from '@/lib/astro/input'
import { localePath, resolveLocale } from '@/lib/i18n'

/**
 * 리졸버. 폼에서 넘어온 값으로 탄생별을 계산해 공유 가능한 주소로 보낸다.
 * 결과 화면 자체는 /star/[key] 가 담당한다.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value

export default async function StarResolverPage({ params, searchParams }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const query = await searchParams

  let target: string
  try {
    const input = parseBirthInput({
      date: first(query.d),
      time: first(query.t),
      place: first(query.p),
      nickname: first(query.n),
    })
    const result = computeLevelOne(input, locale)

    const qs = new URLSearchParams({ d: input.date })
    if (input.time) qs.set('t', input.time)
    if (input.placeName) qs.set('p', input.placeName)
    if (input.nickname) qs.set('n', input.nickname)

    target = localePath(locale, `/star/${result.nakshatra.key}?${qs}`)
  } catch {
    redirect(localePath(locale, '/birth'))
  }

  redirect(target)
}
