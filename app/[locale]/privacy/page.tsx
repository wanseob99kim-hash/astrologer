import type { Metadata } from 'next'
import { LOCALES, resolveLocale, type Locale } from '@/lib/i18n'
import { Footer } from '@/app/components/Footer'

interface PageProps {
  params: Promise<{ locale: string }>
}

/** 법적 고지는 짧고 페이지 하나뿐이라 사전 대신 여기서 언어별로 둔다. */
const COPY: Record<Locale, { title: string; description: string; sections: Array<{ h: string; p: string }> }> = {
  ko: {
    title: '개인정보처리방침',
    description: '베딕 점성술 서비스의 개인정보처리방침입니다.',
    sections: [
      { h: '수집하는 정보', p: '닉네임, 생년월일, 태어난 시간, 태어난 곳을 입력받습니다. 이 값들은 결과를 계산하기 위해서만 쓰이며, 주소창(URL)에 담겨 전달됩니다.' },
      { h: '저장 여부', p: '회원가입이 없고, 입력값을 서버에 저장하지 않습니다. 결과 주소를 남에게 공유하면 그 주소에 담긴 생년월일도 함께 전달되니 주의해 주세요.' },
      { h: '문의', p: '개인정보 관련 문의는 서비스 운영자에게 연락해 주세요.' },
    ],
  },
  en: {
    title: 'Privacy Policy',
    description: 'Privacy policy for the Vedic Astrology service.',
    sections: [
      { h: 'What we collect', p: 'You enter a nickname, date of birth, time of birth, and place of birth. These values are used only to compute your result and are passed in the page address (URL).' },
      { h: 'Storage', p: 'There is no account and we do not store your input on a server. If you share a result link, the date of birth in that link is shared with it — please be aware.' },
      { h: 'Contact', p: 'For privacy questions, contact the service operator.' },
    ],
  },
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  return { title: COPY[locale].title, description: COPY[locale].description }
}

export default async function PrivacyPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const copy = COPY[locale]

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Privacy</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{copy.title}</h1>
      </header>
      <main style={{ marginTop: 28, color: 'var(--ink-2)', display: 'grid', gap: 20 }}>
        {copy.sections.map((section) => (
          <section key={section.h}>
            <h2 style={{ fontSize: 'var(--step-1)', color: 'var(--ink)' }}>{section.h}</h2>
            <p>{section.p}</p>
          </section>
        ))}
      </main>
      <Footer locale={locale} path="/privacy" />
    </div>
  )
}
