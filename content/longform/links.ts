/**
 * 사이트 안 링크의 이름. "더 읽기" 목록에서 경로만 적으면 이름은 여기서 찾는다.
 * 경로는 언어 접두사 없는 기본 경로다. 화면에 낼 때 localePath 로 바꾼다.
 */
import type { Locale } from '@/lib/i18n'

const LABELS: Record<string, Record<Locale, string>> = {
  '/birth': { en: 'Find your birth star', ko: '내 탄생별 찾기' },
  '/guides': { en: 'All guides', ko: '가이드 전체 보기' },
  '/report': { en: 'Detailed compatibility report', ko: '궁합 상세 리포트' },
  '/tradition/nakshatra': { en: 'The 27 birth stars', ko: '27 탄생별 사전' },
  '/tradition/navagraha': { en: 'The nine planets (Navagraha)', ko: '아홉 행성(나바그라하)' },
  '/tradition/dasha': { en: 'Dasha: the periods of a life', ko: '다샤: 인생의 구간' },
  '/tradition/ashtakoota': { en: 'Ashtakoota: the eight-part match', ko: '아쉬타쿠타: 여덟 항목 궁합' },
  '/compare/saju': { en: 'Vedic astrology vs. Saju', ko: '베딕 점성술과 사주' },
  '/compare/western': { en: 'Your Western sign in Vedic astrology', ko: '내 별자리, 인도 점성술에서는' },
  '/about': { en: 'About this site', ko: '이 사이트에 대하여' },
  '/guides/moon-sign-vs-sun-sign': { en: 'Moon sign vs. Sun sign', ko: '달 별자리와 태양 별자리' },
  '/guides/find-your-nakshatra': { en: 'How to find your birth star', ko: '내 탄생별 찾는 법' },
  '/guides/nakshatra-padas': { en: 'The four padas of a birth star', ko: '탄생별의 네 파다' },
  '/guides/what-is-ayanamsa': { en: 'What is ayanamsa?', ko: '아야남샤란 무엇인가' },
  '/guides/reading-your-dasha': { en: 'Reading your dasha periods', ko: '다샤로 인생 구간 읽기' },
  '/guides/compatibility-score-explained': { en: 'How to read a compatibility score', ko: '궁합 점수 제대로 읽기' },
  '/guides/gandanta': { en: 'Gandanta: the knots of the zodiac', ko: '간단타: 황도의 매듭' },
  '/guides/vedic-remedies': { en: 'Vedic remedies: myths and facts', ko: '베딕 처방의 오해와 사실' },
  '/graha/surya': { en: 'Sun (Surya)', ko: '태양(수리야)' },
  '/graha/chandra': { en: 'Moon (Chandra)', ko: '달(찬드라)' },
  '/graha/mangala': { en: 'Mars (Mangala)', ko: '화성(망갈라)' },
  '/graha/budha': { en: 'Mercury (Budha)', ko: '수성(부다)' },
  '/graha/guru': { en: 'Jupiter (Guru)', ko: '목성(구루)' },
  '/graha/shukra': { en: 'Venus (Shukra)', ko: '금성(슈크라)' },
  '/graha/shani': { en: 'Saturn (Shani)', ko: '토성(샤니)' },
  '/graha/rahu': { en: 'Rahu', ko: '라후' },
  '/graha/ketu': { en: 'Ketu', ko: '케투' },
}

export function linkLabel(path: string, locale: Locale): string {
  const entry = LABELS[path]
  if (!entry) throw new Error(`링크 이름 없음: ${path}`)
  return entry[locale]
}

export function hasLinkLabel(path: string): boolean {
  return path in LABELS
}
