/**
 * 27 탄생별 상징 도상.
 *
 * 각 나크샤트라의 전통 상징(말 머리, 소달구지, 눈물방울 …)을 선화로 그린다.
 * 이미지 파일 대신 SVG 로 두는 이유는 셋이다.
 *  - 색과 굵기가 currentColor 를 따라가 밝은 테마·어두운 테마 양쪽에서 읽힌다
 *  - 어느 크기로 키워도 뭉개지지 않는다
 *  - 27장을 따로 받아오지 않아 요청이 늘지 않는다
 *
 * 상징이 겹치는 짝은 전통의 차이를 살려 구분했다.
 *  - 침대 앞다리/뒷다리(11·12) 와 상여 앞다리/뒷다리(25·26) → 가로대 위치를 뒤집고,
 *    상여 쪽에는 신격의 표식(외발의 불, 심연의 물)을 더했다
 *  - 연꽃이 겹치는 푸쉬야(8)·아누라다(17) → 앞은 젖방울을 단 만개한 꽃, 뒤는 줄기 달린 꽃
 */

import { NAKSHATRA_GLYPH_KEYS, type NakshatraGlyphKey } from './nakshatraGlyphKeys'

// Record 키를 27종 union 으로 묶어 두면 빠진 도상이 타입 검사에서 걸린다.
const SYMBOLS: Record<NakshatraGlyphKey, React.ReactNode> = {
  // 1 말의 머리
  ashwini: (
    <>
      <path d="M18 40V24c0-4 3-8 7-9l9-5-2 6 5 2-4 3c0 7-3 10-7 11" />
      <circle cx="27" cy="18" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  // 2 통과의 문
  bharani: (
    <>
      <path d="M11 40V21a13 13 0 0 1 26 0v19" />
      <path d="M24 19c4 4 4 12 0 16-4-4-4-12 0-16z" />
    </>
  ),
  // 3 날선 칼
  krittika: (
    <>
      <path d="M13 37 31 11l4 3-15 25z" />
      <path d="M33 33c2-3 5-2 5 1s-2 4-5 3" />
    </>
  ),
  // 4 소달구지
  rohini: (
    <>
      <path d="M11 27h26l-3-9H14z" />
      <circle cx="17" cy="35" r="4.5" />
      <circle cx="31" cy="35" r="4.5" />
      <path d="M37 27h5" />
    </>
  ),
  // 5 사슴의 머리
  mrigashira: (
    <>
      <path d="M18 41c0-9 3-13 6-13s6 4 6 13" />
      <path d="M21 27 17 16m0 0-4 3m4-3v-5M27 27l4-11m0 0 4 3m-4-3v-5" />
    </>
  ),
  // 6 눈물방울
  ardra: <path d="M24 9c6 9 10 13 10 19a10 10 0 0 1-20 0c0-6 4-10 10-19z" />,
  // 7 화살통
  punarvasu: (
    <>
      <path d="M16 23h16v15a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4z" />
      <path d="M20 23V8m0 0-3 3m3-3 3 3M28 23V13m0 0-3 3m3-3 3 3" />
    </>
  ),
  // 8 젖을 내는 소, 연꽃 — 만개한 꽃에 젖방울
  pushya: (
    <>
      <path d="M24 36c-7 0-11-4-11-8 3 0 7 1 9 3M24 36c7 0 11-4 11-8-3 0-7 1-9 3" />
      <path d="M24 36c-4-5-4-12 0-17 4 5 4 12 0 17z" />
      <circle cx="24" cy="10" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  // 9 똬리 튼 뱀
  ashlesha: (
    <>
      <path d="M24 29a4 4 0 1 0 4-4 8 8 0 1 0-8 8 12 12 0 1 0 12-12" />
      <circle cx="34" cy="20" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  // 10 왕좌
  magha: (
    <>
      <path d="M15 42V19a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v23M15 31h18" />
      <path d="M19 15V8l3 3 2-4 2 4 3-3v7" />
    </>
  ),
  // 11 침대의 앞다리 — 가로대가 위
  'purva-phalguni': (
    <>
      <path d="M13 17h22" />
      <path d="M17 17v20m14-20v20M14 37h6m8 0h6" />
    </>
  ),
  // 12 침대의 뒷다리 — 가로대가 아래
  'uttara-phalguni': (
    <>
      <path d="M13 37h22" />
      <path d="M17 37V17m14 20V17M14 17h6m8 0h6" />
    </>
  ),
  // 13 펼친 손
  hasta: (
    <>
      <path d="M14 33V24m5 9V16m5 17V12m5 21V16m5 17v-9" />
      <path d="M14 33c0 6 4 10 10 10s10-4 10-10" />
    </>
  ),
  // 14 빛나는 보석
  chitra: (
    <>
      <path d="M24 11 35 22 24 39 13 22z" />
      <path d="M13 22h22M24 11v28" />
    </>
  ),
  // 15 바람에 흔들리는 새싹
  swati: (
    <>
      <path d="M23 42c0-11 1-17 5-22" />
      <path d="M29 19c4-3 8-1 9 2-3 3-7 2-9-2z" />
      <path d="M25 29c-4-2-7 0-7 3 3 2 6 1 7-3z" />
    </>
  ),
  // 16 개선문
  vishakha: (
    <>
      <path d="M10 41V23a14 14 0 0 1 28 0v18" />
      <path d="M18 41V25a6 6 0 0 1 12 0v16" />
      <path d="M8 23h32" />
    </>
  ),
  // 17 연꽃 — 줄기 달린 꽃
  anuradha: (
    <>
      <path d="M24 25c-5 0-9-4-9-7 3 0 6 1 9 4 3-3 6-4 9-4 0 3-4 7-9 7z" />
      <path d="M24 25c-2-4-2-9 0-13 2 4 2 9 0 13z" />
      <path d="M24 25v14" />
      <path d="M24 33c-5 0-8-2-8-5 4-1 7 1 8 5z" />
    </>
  ),
  // 18 둥근 부적
  jyeshtha: (
    <>
      <circle cx="24" cy="27" r="10" />
      <circle cx="24" cy="27" r="4" />
      <path d="M17 19 12 11m19 8 5-8" />
    </>
  ),
  // 19 묶인 뿌리 다발
  mula: (
    <>
      <path d="M24 8v12" />
      <path d="M24 20c-4 4-6 10-7 20M24 20c4 4 6 10 7 20M24 20c-1 6-1 13 0 20" />
      <path d="M16 26h16" />
    </>
  ),
  // 20 부채
  'purva-ashadha': (
    <>
      <path d="M24 41 10 21a17 17 0 0 1 28 0z" />
      <path d="M24 41 17 23m7 18 7-18m-7 18V23" />
    </>
  ),
  // 21 코끼리의 엄니
  'uttara-ashadha': (
    <>
      <path d="M11 15c13 1 24 11 26 26-4 1-7-1-8-4-3-12-10-18-18-18z" />
      <path d="M11 15v3" />
    </>
  ),
  // 22 귀
  shravana: (
    <>
      <path d="M31 42c-7 0-11-5-11-11V21a9 9 0 0 1 18 0c0 5-3 8-7 8s-5-3-5-5" />
      <path d="M20 30h-4" />
    </>
  ),
  // 23 북
  dhanishta: (
    <>
      <path d="M15 19h18v12H15z" />
      <path d="M15 19a9 4 0 0 1 18 0M15 31a9 4 0 0 0 18 0" />
      <path d="M9 12l6 6m24-6-6 6" />
    </>
  ),
  // 24 텅 빈 원
  shatabhisha: (
    <>
      <circle cx="24" cy="25" r="12" />
      <circle cx="24" cy="9" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="40" cy="25" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="24" cy="41" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="8" cy="25" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  // 25 상여의 앞다리 — 가로대가 위, 외발의 불
  'purva-bhadrapada': (
    <>
      <path d="M13 22h22" />
      <path d="M17 22v18m14-18v18M14 40h6m8 0h6" />
      <path d="M24 18c-3-4 0-6 0-9 2 3 4 5 4 9" />
    </>
  ),
  // 26 상여의 뒷다리 — 가로대가 아래, 심연의 물
  'uttara-bhadrapada': (
    <>
      <path d="M13 34h22" />
      <path d="M17 34V16m14 18V16M14 16h6m8 0h6" />
      <path d="M12 42c4-3 6 1 10-1s6 1 10-1" />
    </>
  ),
  // 27 두 마리 물고기
  revati: (
    <>
      <path d="M12 20c5-6 12-6 17 0-5 6-12 6-17 0z" />
      <path d="M29 20 38 14v12z" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none" />
      <path d="M14 34c5-5 12-5 17 0" />
    </>
  ),
}

interface NakshatraGlyphProps {
  /** 나크샤트라 key (예: 'ashwini') */
  nakshatra: string
  size?: number
  title?: string
}

export function NakshatraGlyph({ nakshatra, size = 48, title }: NakshatraGlyphProps) {
  const symbol = SYMBOLS[nakshatra as NakshatraGlyphKey]
  if (!symbol) return null

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
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {symbol}
      </g>
    </svg>
  )
}

export { NAKSHATRA_GLYPH_KEYS }
