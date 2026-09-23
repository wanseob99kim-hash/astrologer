import type { Metadata } from 'next'
import Link from 'next/link'
import { LOCALES, localePath, resolveLocale, type Locale } from '@/lib/i18n'
import { CONTACT_EMAIL, absoluteUrl } from '@/lib/seo'
import { Footer } from '@/app/components/Footer'

interface PageProps {
  params: Promise<{ locale: string }>
}

interface Block {
  h: string
  p: string[]
}

/**
 * 서비스 소개. 누가, 무엇을, 어떤 기준으로 만드는지.
 * 계산 방식과 검증 과정은 실제로 한 일만 적는다.
 */
const COPY: Record<Locale, { title: string; description: string; lede: string; blocks: Block[]; contact: string; cta: string }> = {
  ko: {
    title: '서비스 소개',
    description: '베딕 점성술(birthstar.uk)이 무엇을 하는 곳인지, 어떤 방식으로 계산하고 어떤 원칙으로 글을 쓰는지 소개합니다.',
    lede: '인도 전통 점성술(죠티쉬)을 한국어와 영어로, 누구나 알아들을 수 있는 말로 풀어 주는 서비스입니다.',
    blocks: [
      {
        h: '무엇을 하나요',
        p: [
          '생년월일과 태어난 시간을 넣으면, 태어난 순간 달이 머문 자리를 계산해 27개 탄생별(나크샤트라) 중 하나를 알려 드립니다. 여기에 아홉 행성, 인생 구간(다샤), 두 사람의 궁합(아쉬타쿠타 36점)을 더해 보여 드립니다.',
          '인도에서는 수천 년 동안 쓰여 온 체계지만, 한국어로 된 자료는 대부분 산스크리트 용어를 그대로 옮겨 놓아 읽기 어렵습니다. 이 서비스는 전통의 내용은 지키되, 말은 오늘의 생활 언어로 바꿉니다.',
        ],
      },
      {
        h: '어떻게 계산하나요',
        p: [
          '달의 위치는 천문 계산 라이브러리로 구합니다. 기준은 인도 정부 표준인 라히리(Chitrapaksha) 아야남샤입니다.',
          '계산이 맞는지 확인하려고, 서로 다른 두 계산 엔진으로 무작위 생년월일 500건을 대조했고 탄생별이 한 건도 어긋나지 않았습니다. 인생 구간(빔쇼타리 다샤) 합계가 120년이 되는지, 궁합 여덟 항목의 배점 합이 36점이 되는지도 배포할 때마다 자동으로 검사합니다.',
          '태어난 시간을 모르면 정오를 기준으로 계산하되, 그 경우 네 명 중 한 명꼴로 탄생별이 달라진다는 사실을 결과 맨 위에 밝힙니다.',
        ],
      },
      {
        h: '어떤 원칙으로 쓰나요',
        p: [
          '겁주지 않습니다. 궁합 점수가 낮아도 "안 맞는다"가 아니라 "여기를 조심하라"로 씁니다. 결혼 가부를 판정하지 않습니다.',
          '열 명 중 일곱 명에게 붙는 "망글릭(화성 흠)" 같은 판정은 정보가 아니라 불안만 남긴다고 보아 다루지 않습니다.',
          '성별을 묻지 않습니다. 전통 궁합은 남녀 역할을 나눠 계산해 순서에 따라 점수가 달라지는데, 이 서비스는 양쪽 방향으로 계산해 평균을 냅니다.',
          '모든 결과는 재미로 즐기는 콘텐츠이며 실제 점술·상담·의료·법률·투자 조언이 아닙니다.',
        ],
      },
      {
        h: '누가 만드나요',
        p: [
          '점성술과 소프트웨어에 관심 있는 개인이 운영합니다. 콘텐츠는 인도 전통 문헌과 현대 해설서를 바탕으로 직접 쓰고, 계산 코드와 문안을 함께 검수합니다.',
          '잘못된 내용이나 개선할 점을 알려 주시면 확인 후 반영합니다.',
        ],
      },
    ],
    contact: `문의: ${CONTACT_EMAIL}`,
    cta: '내 탄생별 보기',
  },
  en: {
    title: 'About',
    description: 'What Vedic Astrology (birthstar.uk) does, how it calculates, and the principles behind what it writes.',
    lede: 'A service that explains traditional Indian astrology (Jyotish) in plain English and Korean.',
    blocks: [
      {
        h: 'What it does',
        p: [
          'Enter your date and time of birth, and we calculate where the Moon stood at that moment to tell you which of the 27 birth stars (nakshatras) is yours. On top of that we show the nine planets, your life periods (dasha), and compatibility between two people (Ashtakoota, 36 points).',
          'The system has been used in India for millennia, but most material in English is either dense with untranslated Sanskrit or reduced to horoscope clichés. We keep the substance of the tradition and put it into everyday language.',
        ],
      },
      {
        h: 'How it calculates',
        p: [
          'The Moon’s position comes from an astronomical calculation library, using the Lahiri (Chitrapaksha) ayanamsa — the Indian government standard.',
          'To check the math, we cross-checked 500 random birth dates against a second, independent engine; not a single birth star disagreed. Every deployment also automatically checks that the life-period (Vimshottari dasha) cycle totals 120 years and that the eight compatibility items total 36 points.',
          'Without a birth time we calculate from noon — and say plainly at the top of the result that about one in four people would get a different birth star.',
        ],
      },
      {
        h: 'How it writes',
        p: [
          'No fear. A low compatibility item is written as "handle this with care," never "you do not match." We do not issue verdicts on marriage.',
          'We leave out verdicts like "Manglik" (Mars affliction), which land on roughly seven people in ten — at that rate they create anxiety, not information.',
          'No gender. Traditional compatibility assigns male and female roles, so the score changes with the order; we calculate both directions and average.',
          'Everything here is for entertainment. It is not fortune-telling, counseling, medical, legal, or financial advice.',
        ],
      },
      {
        h: 'Who makes it',
        p: [
          'An individual with an interest in astrology and software runs the site. The content is written from traditional Indian texts and modern commentaries, and the calculation code and the copy are reviewed together.',
          'If you spot an error or have a suggestion, let us know and we will look into it.',
        ],
      },
    ],
    contact: `Contact: ${CONTACT_EMAIL}`,
    cta: 'Find my birth star',
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
    alternates: { canonical: absoluteUrl(localePath(locale, '/about')) },
  }
}

export default async function AboutPage({ params }: PageProps) {
  const locale = resolveLocale((await params).locale)
  const copy = COPY[locale]

  return (
    <div className="shell" style={{ maxWidth: 720 }}>
      <header style={{ paddingTop: 56 }}>
        <p className="eyebrow eyebrow--latin">About</p>
        <h1 className="display" style={{ fontSize: 'var(--step-3)', marginTop: 12 }}>{copy.title}</h1>
        <p className="lede" style={{ marginTop: 14, fontSize: 'var(--step-1)', color: 'var(--ink)' }}>{copy.lede}</p>
      </header>
      <main className="legal">
        {copy.blocks.map((block) => (
          <section key={block.h}>
            <h2>{block.h}</h2>
            {block.p.map((line) => <p key={line}>{line}</p>)}
          </section>
        ))}
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{copy.contact}</a>
        </p>
        <Link href={localePath(locale, '/birth')} className="btn" style={{ marginTop: 18 }}>{copy.cta}</Link>
      </main>
      <Footer locale={locale} path="/about" />
    </div>
  )
}
