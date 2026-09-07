/**
 * 상징 도상이 있어야 하는 27종 key.
 *
 * NakshatraGlyph.tsx 의 SYMBOLS 는 이 목록을 Record 키로 쓰기 때문에,
 * 하나라도 빠지거나 오타가 나면 타입 검사에서 걸린다.
 * validate.ts 는 이 목록이 실제 콘텐츠 27종과 일치하는지 대조한다.
 */
export const NAKSHATRA_GLYPH_KEYS = [
  'ashwini', 'bharani', 'krittika', 'rohini', 'mrigashira', 'ardra',
  'punarvasu', 'pushya', 'ashlesha', 'magha', 'purva-phalguni', 'uttara-phalguni',
  'hasta', 'chitra', 'swati', 'vishakha', 'anuradha', 'jyeshtha',
  'mula', 'purva-ashadha', 'uttara-ashadha', 'shravana', 'dhanishta', 'shatabhisha',
  'purva-bhadrapada', 'uttara-bhadrapada', 'revati',
] as const

export type NakshatraGlyphKey = (typeof NAKSHATRA_GLYPH_KEYS)[number]
