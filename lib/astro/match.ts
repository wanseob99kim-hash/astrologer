import { createRequire } from 'node:module'
import { KOOTAS, MAX_TOTAL_SCORE, SCORE_BANDS } from '@/content/index'
import type { Koota } from '@/content/types'
import { DEFAULT_PLACE, toUtcInstant } from './input'
import type { BirthInput } from './types'

/**
 * 아쉬타쿠타 36점 궁합. 서버 전용.
 *
 * 기획서 §5.3 의 네 가지 방침을 여기서 강제한다.
 *  1. 망갈(Manglik) 도샤를 쓰지 않는다 — 라이브러리 기본 규칙은 검출률 70.3% 라 경고로서 무의미하다
 *  2. 라이브러리의 verdict 문자열을 쓰지 않는다 — 점수 18점 이상 커플의 27% 에 "Mismatch" 가 붙는다
 *  3. 남/녀 역할 비대칭을 양방향 평균으로 없앤다 — 성별을 입력받지 않기 위해서다
 *  4. 낮은 점수를 숨기지 않는다
 */

const require = createRequire(import.meta.url)

interface KootaRaw {
  name: string
  score: number
  maxScore: number
}

interface MatchRaw {
  ashtakoot: { totalScore: number; kootas: KootaRaw[] }
}

interface PanchangamMatchModule {
  getKundli: (date: Date, observer: unknown, config?: Record<string, string>) => unknown
  Observer: new (lat: number, lon: number, elevation: number) => unknown
  matchKundli: (boy: unknown, girl: unknown) => MatchRaw
}

const panchangam = require('@ishubhamx/panchangam-js') as PanchangamMatchModule

/** 라이브러리의 쿠타 이름 → 우리 콘텐츠의 키. */
const KOOTA_KEY_BY_NAME: Readonly<Record<string, string>> = {
  Varna: 'varna',
  Vashya: 'vashya',
  Tara: 'tara',
  Yoni: 'yoni',
  'Graha Maitri': 'graha-maitri',
  Gana: 'gana',
  Bhakoot: 'bhakoot',
  Nadi: 'nadi',
}

export interface KootaScore {
  koota: Koota
  /** 양방향 평균 점수. 두 방향이 다르면 .5 가 나올 수 있다. */
  score: number
  maxScore: number
  /** 만점 대비 비율 0~1 */
  ratio: number
  /** 이 항목이 관계에서 약한 축인가 (절반 미만) */
  isWeak: boolean
}

export interface MatchOutcome {
  /** 양방향 평균 총점 */
  total: number
  maxTotal: number
  band: (typeof SCORE_BANDS)[number]
  kootas: KootaScore[]
  /** 순서를 바꾸면 점수가 달라졌는가 — 평균을 낸 근거를 화면에 밝히기 위해 남긴다 */
  wasAsymmetric: boolean
  /** 두 사람 모두 시간을 입력했는가. 하나라도 없으면 확정 결과가 아니다. */
  isTimeKnown: boolean
  /** 가장 약한 축 — 무료 화면에서 티저로 한 줄 보여준다 */
  weakest: KootaScore | null
}

function buildKundli(input: BirthInput): unknown {
  return panchangam.getKundli(
    toUtcInstant(input),
    new panchangam.Observer(input.lat ?? DEFAULT_PLACE.lat, input.lon ?? DEFAULT_PLACE.lon, 0),
    { ayanamsa: 'lahiri', houseSystem: 'whole_sign' },
  )
}

function scoresByKey(raw: MatchRaw): Map<string, number> {
  const scores = new Map<string, number>()
  for (const koota of raw.ashtakoot.kootas) {
    const key = KOOTA_KEY_BY_NAME[koota.name]
    if (key) scores.set(key, koota.score)
  }
  return scores
}

/**
 * 총점이 속한 구간.
 *
 * 양방향 평균이라 24.5 같은 값이 나온다. 구간 경계를 정수 범위로 잡고 찾으면
 * 이런 값이 어디에도 걸리지 않는데, 그때 마지막 구간으로 떨어뜨리면
 * 애매한 점수에 최고 등급이 붙는다. 하한만 보고 위에서부터 내려오며 찾는다.
 */
function bandFor(total: number): (typeof SCORE_BANDS)[number] {
  for (let index = SCORE_BANDS.length - 1; index >= 0; index -= 1) {
    const band = SCORE_BANDS[index]
    if (band && total >= band.min) return band
  }
  return SCORE_BANDS[0]
}

/** 소수 둘째자리에서 생기는 부동소수 오차를 없앤다. */
const roundHalf = (value: number) => Math.round(value * 2) / 2

/**
 * 두 사람의 궁합을 계산한다.
 *
 * 아쉬타쿠타는 전통상 남/녀 역할이 대칭이 아니라, 누구를 먼저 넣느냐로 점수가 달라진다
 * (P2 측정: 150쌍 중 103쌍에서 최대 2점 차). 성별을 입력받지 않기 위해
 * 양방향으로 계산해 평균을 낸다. 그래서 결과는 넣는 순서와 무관하다.
 */
export function computeMatch(inputA: BirthInput, inputB: BirthInput): MatchOutcome {
  const kundliA = buildKundli(inputA)
  const kundliB = buildKundli(inputB)

  const forward = scoresByKey(panchangam.matchKundli(kundliA, kundliB))
  const reverse = scoresByKey(panchangam.matchKundli(kundliB, kundliA))

  let wasAsymmetric = false

  const kootas: KootaScore[] = KOOTAS.map((koota) => {
    const a = forward.get(koota.key) ?? 0
    const b = reverse.get(koota.key) ?? 0
    if (a !== b) wasAsymmetric = true
    const score = roundHalf((a + b) / 2)
    return {
      koota,
      score,
      maxScore: koota.maxScore,
      ratio: score / koota.maxScore,
      isWeak: score / koota.maxScore < 0.5,
    }
  })

  const total = roundHalf(kootas.reduce((sum, entry) => sum + entry.score, 0))
  const weak = kootas.filter((entry) => entry.isWeak)
  const weakest = weak.length === 0
    ? null
    : weak.reduce((lowest, entry) => (entry.ratio < lowest.ratio ? entry : lowest))

  return {
    total,
    maxTotal: MAX_TOTAL_SCORE,
    band: bandFor(total),
    kootas,
    wasAsymmetric,
    isTimeKnown: Boolean(inputA.time) && Boolean(inputB.time),
    weakest,
  }
}

/** 점수를 화면 표기용 문자열로. 정수면 소수점을 붙이지 않는다. */
export function formatScore(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}
