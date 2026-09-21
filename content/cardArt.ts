/**
 * 카드 삽화 목록.
 *
 * public/cards/<key>.webp 가 있는 탄생별만 여기 적는다.
 * 런타임(Cloudflare Workers)에는 파일 시스템이 없어 존재 여부를 그때 확인할 수 없다.
 * 대신 `npm run cards:sync` 가 폴더를 훑어 이 목록을 다시 쓴다 — 손으로 고치지 말 것.
 *
 * 목록에 없는 탄생별은 카드가 벡터 상징으로 그려진다.
 */
export const CARD_ART_KEYS: ReadonlySet<string> = new Set<string>([
  'ashwini',
  'bharani',
  'krittika',
  'rohini',
  'mrigashira',
  'ardra',
  'punarvasu',
  'pushya',
  'ashlesha',
  'magha',
  'purva-phalguni',
  'uttara-phalguni',
  'hasta',
  'chitra',
  'swati',
  'vishakha',
  'anuradha',
  'jyeshtha',
  'mula',
  'purva-ashadha',
  'uttara-ashadha',
  'shravana',
  'dhanishta',
  'shatabhisha',
  'purva-bhadrapada',
  'uttara-bhadrapada',
  'revati',
])

/** 영어 카드. public/cards-en/<key>.webp. cards:sync 가 채운다. */
export const CARD_ART_KEYS_EN: ReadonlySet<string> = new Set<string>([
  'ashwini',
  'bharani',
  'krittika',
  'rohini',
  'mrigashira',
  'ardra',
  'punarvasu',
  'pushya',
  'ashlesha',
  'magha',
  'purva-phalguni',
  'uttara-phalguni',
  'hasta',
  'chitra',
  'swati',
  'vishakha',
  'anuradha',
  'jyeshtha',
  'mula',
  'purva-ashadha',
  'uttara-ashadha',
  'shravana',
  'dhanishta',
  'shatabhisha',
  'purva-bhadrapada',
  'uttara-bhadrapada',
  'revati',
])

/**
 * 카드 그림 주소. 영어판은 영어 배너가 박힌 그림이 있을 때만 쓰고,
 * 없으면 undefined 를 돌려 벡터 카드로 그린다 — 한글 배너를 영어 화면에 내지 않는다.
 */
export function cardArtUrl(key: string, locale: 'ko' | 'en' = 'ko'): string | undefined {
  if (locale === 'en') return CARD_ART_KEYS_EN.has(key) ? `/cards-en/${key}.webp` : undefined
  return CARD_ART_KEYS.has(key) ? `/cards/${key}.webp` : undefined
}
