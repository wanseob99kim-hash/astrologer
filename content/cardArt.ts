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
  // cards:sync 가 채운다
])

export function cardArtUrl(key: string): string | undefined {
  return CARD_ART_KEYS.has(key) ? `/cards/${key}.webp` : undefined
}
