import type { GrahaKey } from '@/content/types'

/**
 * 나바그라하 도상.
 *
 * 전통 천문 기호를 직접 그린다. 유니코드 문자(☉ ☽ ♂ …)로 넣으면
 * 기기에 따라 글꼴이 없어 네모로 깨지거나 이모지로 치환된다.
 * 선 굵기와 색은 currentColor 를 따라가므로 테마와 함께 움직인다.
 */

const STROKE = 'currentColor'

const PATHS: Record<GrahaKey, React.ReactNode> = {
  // 태양 — 원 안의 점
  Sun: (
    <>
      <circle cx="24" cy="24" r="13" fill="none" stroke={STROKE} strokeWidth="2" />
      <circle cx="24" cy="24" r="3.4" fill={STROKE} />
    </>
  ),
  // 달 — 초승달
  Moon: <path d="M30 11a14.5 14.5 0 1 0 0 26 15.5 15.5 0 0 1 0-26z" fill={STROKE} />,
  // 화성 — 원과 비스듬한 화살
  Mars: (
    <>
      <circle cx="20" cy="28" r="10" fill="none" stroke={STROKE} strokeWidth="2" />
      <path d="M27 21 37 11m-8 0h8v8" fill="none" stroke={STROKE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // 수성 — 뿔 달린 원과 십자
  Mercury: (
    <>
      <path d="M17 9a7 7 0 0 0 14 0" fill="none" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="9" fill="none" stroke={STROKE} strokeWidth="2" />
      <path d="M24 33v7m-5-3.5h10" fill="none" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  // 목성 — 숫자 4 모양의 전통 기호
  Jupiter: (
    <path
      d="M14 15h9m0 0v18c0 3 2 5 5 5h6M23 15c0-3.5 2.5-6 6-6"
      fill="none"
      stroke={STROKE}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  // 금성 — 원과 십자
  Venus: (
    <>
      <circle cx="24" cy="19" r="9" fill="none" stroke={STROKE} strokeWidth="2" />
      <path d="M24 28v12m-6-6h12" fill="none" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  // 토성 — 십자와 낫
  Saturn: (
    <path
      d="M13 13h11M18 9v18c0 6 4 9 8 9s7-3 7-7-2-6-5-6-5 2-5 4"
      fill="none"
      stroke={STROKE}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  // 라후 — 위를 향한 승교점
  Rahu: (
    <path
      d="M15 38c0-10 2-16 5-19a5.5 5.5 0 0 1 8 0c3 3 5 9 5 19M13 38h8m6 0h8"
      fill="none"
      stroke={STROKE}
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),
  // 케투 — 라후를 뒤집은 강교점
  Ketu: (
    <path
      d="M15 10c0 10 2 16 5 19a5.5 5.5 0 0 0 8 0c3-3 5-9 5-19M13 10h8m6 0h8"
      fill="none"
      stroke={STROKE}
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),
}

interface GrahaGlyphProps {
  graha: GrahaKey
  size?: number
  title?: string
}

export function GrahaGlyph({ graha, size = 48, title }: GrahaGlyphProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {PATHS[graha]}
    </svg>
  )
}
