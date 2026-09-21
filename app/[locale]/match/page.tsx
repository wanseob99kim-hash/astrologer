import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { normalizeDate, normalizeNickname, normalizeTime } from '@/lib/astro/input'
import { localePath, resolveLocale } from '@/lib/i18n'
import { absoluteUrl } from '@/lib/seo'
import { messagesFor } from '@/messages/index'
import { Footer } from '@/app/components/Footer'
import { InviteLink } from './InviteLink'
import { MatchForm } from './MatchForm'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale).match
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: absoluteUrl(localePath(locale, '/match')) },
    robots: { index: false, follow: true },
  }
}

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value

export default async function MatchPage({ params, searchParams }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const t = messagesFor(locale)
  const m = t.match
  const query = await searchParams

  let inviterDate: string
  try {
    inviterDate = normalizeDate(first(query.d) ?? '')
  } catch {
    redirect(localePath(locale, '/birth'))
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
        <p className="eyebrow eyebrow--latin">{m.eyebrow}</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{m.h1}</h1>
        <p className="lede" style={{ marginTop: 14 }}>
          {m.ledeA}<strong>{m.ledeB}</strong>{m.ledeC}
        </p>
      </header>

      <main>
        <div className="notice" style={{ marginTop: 24 }}>
          <span aria-hidden="true">✦</span>
          <span>{m.noticeA}<b>{m.noticeB}</b>{m.noticeC}</span>
        </div>

        <MatchForm
          locale={locale}
          labels={{
            partnerNickname: m.partnerNickname,
            partnerNicknamePlaceholder: m.partnerNicknamePlaceholder,
            partnerDate: m.partnerDate,
            partnerDatePlaceholder: m.partnerDatePlaceholder,
            partnerDateHint: m.partnerDateHint,
            partnerTime: m.partnerTime,
            unknown: m.unknown,
            partnerTimePlaceholder: m.partnerTimePlaceholder,
            timeHintUnknown: m.timeHintUnknown,
            timeHint: m.timeHint,
            submit: m.submit,
            submitSub: m.submitSub,
          }}
          optionalLabel={t.birth.optional}
          inviter={{ date: inviterDate, time: inviterTime, nickname: inviterNickname }}
        />

        <hr className="rule" style={{ margin: '34px 0 22px' }} />

        <section>
          <h2 className="eyebrow">{m.inviteTitle}</h2>
          <p className="small" style={{ margin: '10px 0 14px' }}>{m.inviteBody}</p>
          <InviteLink
            path={localePath(locale, `/match?${inviteParams}`)}
            labels={{ copy: m.copy, copied: m.copied, prompt: m.copyPrompt, note: m.inviteNote }}
          />
        </section>
      </main>

      <Footer locale={locale} path="/match" />
    </div>
  )
}
