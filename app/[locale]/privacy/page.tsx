import type { Metadata } from 'next'
import { LOCALES, localePath, resolveLocale, type Locale } from '@/lib/i18n'
import { CONTACT_EMAIL, absoluteUrl } from '@/lib/seo'
import { Footer } from '@/app/components/Footer'

interface PageProps {
  params: Promise<{ locale: string }>
}

/** 시행일. 내용을 바꾸면 함께 바꾼다. */
const EFFECTIVE = { ko: '2026년 9월 24일', en: 'September 24, 2026' } as const

interface Section {
  h: string
  p: string[]
  links?: Array<{ label: string; href: string }>
}

/**
 * 개인정보처리방침.
 *
 * 광고(Google AdSense)를 싣기 위한 필수 고지를 담는다 —
 * 제3자 공급업체의 쿠키 사용, 맞춤 광고, 해제 방법(Google 광고 설정 등).
 * 법적 고지는 짧고 페이지 하나뿐이라 사전 대신 여기서 언어별로 둔다.
 */
const COPY: Record<Locale, { title: string; description: string; intro: string; sections: Section[] }> = {
  ko: {
    title: '개인정보처리방침',
    description: '베딕 점성술(birthstar.uk)이 어떤 정보를 어떻게 다루는지, 광고와 쿠키를 포함해 설명합니다.',
    intro:
      '베딕 점성술(birthstar.uk, 이하 "서비스")은 이용자의 개인정보를 소중히 다룹니다. 이 방침은 서비스가 어떤 정보를 받고, 어디에 쓰며, 제3자와 무엇을 공유하는지 설명합니다.',
    sections: [
      {
        h: '1. 입력받는 정보',
        p: [
          '결과를 계산하기 위해 닉네임(선택), 생년월일, 태어난 시간(선택), 태어난 곳(선택)을 입력받습니다. 궁합을 볼 때는 상대방의 같은 정보를 입력받습니다.',
          '회원가입이 없어 이름·전화번호·주소 같은 신원 정보는 받지 않습니다.',
        ],
      },
      {
        h: '2. 정보가 저장되는 곳',
        p: [
          '입력값은 결과 계산에만 쓰이고 서버 데이터베이스에 저장하지 않습니다. 대신 결과 페이지 주소(URL)에 담겨 전달됩니다.',
          '그래서 결과 링크를 다른 사람에게 보내면 그 링크에 담긴 생년월일도 함께 전달됩니다. 공유하기 전에 확인해 주세요.',
          '서비스를 운영하는 Cloudflare는 보안과 장애 대응을 위해 접속 기록(IP 주소, 요청 주소, 시각, 브라우저 정보)을 일정 기간 보관할 수 있습니다.',
        ],
      },
      {
        h: '3. 광고와 쿠키',
        p: [
          '서비스는 운영비를 마련하기 위해 Google AdSense 광고를 게재할 수 있습니다.',
          'Google을 포함한 제3자 공급업체는 쿠키를 사용해 이용자가 이 사이트나 다른 사이트를 방문한 기록을 바탕으로 광고를 게재합니다.',
          'Google은 광고 쿠키를 사용해 이용자가 이 사이트 및 인터넷의 다른 사이트를 방문한 기록을 바탕으로 Google과 파트너가 이용자에게 광고를 게재할 수 있게 합니다.',
          '이용자는 Google 광고 설정에서 맞춤 광고를 해제할 수 있습니다. 또한 aboutads.info 에서 맞춤 광고에 쿠키를 쓰는 제3자 공급업체의 쿠키를 해제할 수 있습니다.',
          '유럽경제지역(EEA)·영국·스위스 이용자에게는 광고 쿠키를 쓰기 전에 동의를 묻는 안내가 표시되며, 언제든 선택을 바꿀 수 있습니다.',
          '브라우저 설정에서 쿠키를 차단할 수도 있습니다. 쿠키를 막아도 서비스의 계산 기능은 그대로 쓸 수 있습니다.',
        ],
        links: [
          { label: 'Google 광고 설정', href: 'https://adssettings.google.com' },
          { label: 'Google의 광고 쿠키 사용 방식', href: 'https://policies.google.com/technologies/ads' },
          { label: 'aboutads.info 맞춤 광고 해제', href: 'https://www.aboutads.info/choices' },
          { label: 'Your Online Choices (유럽)', href: 'https://www.youronlinechoices.eu' },
        ],
      },
      {
        h: '4. 서비스 자체의 쿠키',
        p: ['서비스는 로그인·추적용 자체 쿠키를 쓰지 않습니다. 언어 선택은 주소(/en)로 구분합니다.'],
      },
      {
        h: '5. 유료 콘텐츠 결제',
        p: [
          '유료 리포트를 구매할 때 결제는 결제 대행사(토스페이먼츠 등)가 처리합니다. 카드 번호 등 결제 정보는 서비스가 받거나 저장하지 않으며, 대행사의 개인정보처리방침을 따릅니다.',
          '서비스는 결제가 끝났는지 확인하기 위해 주문번호와 결제 금액만 대행사로부터 받습니다.',
        ],
      },
      {
        h: '6. 아동의 개인정보',
        p: ['서비스는 만 14세 미만 아동을 대상으로 하지 않으며, 아동의 개인정보를 알면서 수집하지 않습니다.'],
      },
      {
        h: '7. 이용자의 권리',
        p: [
          '서비스는 입력값을 저장하지 않으므로 열람·삭제할 기록이 따로 없습니다. 공유한 링크를 더 이상 쓰지 않으려면 그 링크를 받은 사람에게 삭제를 요청해 주세요.',
          '광고 쿠키에 관한 선택은 위 3항의 링크에서 바꿀 수 있습니다.',
        ],
      },
      {
        h: '8. 방침의 변경',
        p: ['이 방침을 바꾸면 이 페이지에 새 시행일과 함께 게시합니다.'],
      },
      {
        h: '9. 문의',
        p: [`개인정보에 관한 문의는 ${CONTACT_EMAIL} 로 보내 주세요.`],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    description: 'How Vedic Astrology (birthstar.uk) handles information, including advertising and cookies.',
    intro:
      'Vedic Astrology (birthstar.uk, "the Service") takes your privacy seriously. This policy explains what information the Service receives, how it is used, and what is shared with third parties.',
    sections: [
      {
        h: '1. Information you enter',
        p: [
          'To compute a result, we ask for a nickname (optional), date of birth, time of birth (optional), and place of birth (optional). For compatibility, we ask for the same details about the other person.',
          'There is no account, so we do not collect identifying details such as your name, phone number, or address.',
        ],
      },
      {
        h: '2. Where information is kept',
        p: [
          'Your input is used only to compute the result and is not stored in a server database. Instead, it is carried in the result page address (URL).',
          'If you send a result link to someone, the date of birth in that link goes with it. Please check before sharing.',
          'Cloudflare, which hosts the Service, may keep access logs (IP address, requested URL, time, browser information) for a limited period for security and troubleshooting.',
        ],
      },
      {
        h: '3. Advertising and cookies',
        p: [
          'The Service may display Google AdSense ads to cover running costs.',
          "Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.",
          "Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites on the Internet.",
          'You may opt out of personalized advertising by visiting Google Ads Settings. You can also opt out of third-party vendors’ use of cookies for personalized advertising at aboutads.info.',
          'Visitors in the European Economic Area, the UK, and Switzerland are asked for consent before advertising cookies are used, and can change their choice at any time.',
          'You can also block cookies in your browser settings. The Service’s calculations work the same with cookies blocked.',
        ],
        links: [
          { label: 'Google Ads Settings', href: 'https://adssettings.google.com' },
          { label: 'How Google uses advertising cookies', href: 'https://policies.google.com/technologies/ads' },
          { label: 'aboutads.info opt-out', href: 'https://www.aboutads.info/choices' },
          { label: 'Your Online Choices (Europe)', href: 'https://www.youronlinechoices.eu' },
        ],
      },
      {
        h: '4. The Service’s own cookies',
        p: ['The Service does not set its own login or tracking cookies. Language is distinguished by the address (/en).'],
      },
      {
        h: '5. Paid content',
        p: [
          'When you buy a paid report, payment is handled by a payment provider (such as Toss Payments). The Service never receives or stores card numbers or other payment details; the provider’s privacy policy applies.',
          'To confirm a payment, the Service receives only the order number and amount from the provider.',
        ],
      },
      {
        h: '6. Children',
        p: ['The Service is not directed at children under 13 and does not knowingly collect their personal information.'],
      },
      {
        h: '7. Your rights',
        p: [
          'Because the Service does not store your input, there is no stored record to access or delete. If you no longer want a shared link used, ask the people you sent it to to delete it.',
          'You can change your advertising cookie choices through the links in section 3.',
        ],
      },
      {
        h: '8. Changes',
        p: ['If we change this policy, we will post it here with a new effective date.'],
      },
      {
        h: '9. Contact',
        p: [`For privacy questions, email ${CONTACT_EMAIL}.`],
      },
    ],
  },
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  return {
    title: COPY[locale].title,
    description: COPY[locale].description,
    alternates: { canonical: absoluteUrl(localePath(locale, '/privacy')) },
  }
}

export default async function PrivacyPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const copy = COPY[locale]

  return (
    <div className="shell">
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">Privacy</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{copy.title}</h1>
        <p className="small" style={{ marginTop: 10 }}>{locale === 'ko' ? '시행일' : 'Effective'}: {EFFECTIVE[locale]}</p>
        <p className="lede" style={{ marginTop: 14 }}>{copy.intro}</p>
      </header>
      <main className="legal">
        {copy.sections.map((section) => (
          <section key={section.h}>
            <h2>{section.h}</h2>
            {section.p.map((line) => <p key={line}>{line}</p>)}
            {section.links ? (
              <ul>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </main>
      <Footer locale={locale} path="/privacy" />
    </div>
  )
}
