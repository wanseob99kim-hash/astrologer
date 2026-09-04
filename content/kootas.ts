import type { Koota } from './types'

/**
 * 아쉬타쿠타 8쿠타 메타데이터.
 *
 * 점수 계산은 엔진(panchangam-js)이 하고, 이 파일은 표기만 담당한다.
 *
 * 두 가지 원칙:
 *  1. Varna 는 원래 카스트(브라만/크샤트리아/바이샤/수드라) 기반이다.
 *     한국 서비스에 등급 서열을 그대로 노출하지 않는다. "결의 층" 으로 추상화한다.
 *  2. 낮은 점수를 "안 맞는다" 로 쓰지 않는다. "이런 점을 조심하라" 로 쓴다.
 *     P2 검증에서 라이브러리 기본 판정 문구가 점수 18점 이상 커플의 27% 에
 *     "Mismatch" 를 붙이는 것이 확인됐다. 그 문구는 쓰지 않는다.
 */
export const KOOTAS: readonly Koota[] = [
  {
    key: 'varna',
    sanskrit: 'Varna',
    ko: '결의 층',
    maxScore: 1,
    measures: '두 사람이 삶에서 무엇을 우선하는지의 결',
    high: '중요하게 여기는 것이 비슷해 큰 방향에서 부딪히지 않습니다.',
    low: '우선순위가 달라, 무엇을 먼저 할지 매번 조율이 필요합니다.',
  },
  {
    key: 'vashya',
    sanskrit: 'Vashya',
    ko: '이끌림',
    maxScore: 2,
    measures: '서로에게 끌리는 힘과 관계의 주도권',
    high: '자연스럽게 끌리고, 주도권 다툼이 적습니다.',
    low: '한쪽이 끌고 가는 구도가 되기 쉽습니다. 결정 방식을 미리 정해두면 좋습니다.',
  },
  {
    key: 'tara',
    sanskrit: 'Tara',
    ko: '별자리 거리',
    maxScore: 3,
    measures: '두 사람의 탄생별 사이 거리가 만드는 운의 흐름',
    high: '함께 있을 때 일이 잘 풀리고 건강도 안정적입니다.',
    low: '한쪽이 힘든 시기에 다른 쪽도 같이 흔들릴 수 있습니다. 서로의 컨디션을 챙기세요.',
  },
  {
    key: 'yoni',
    sanskrit: 'Yoni',
    ko: '본능',
    maxScore: 4,
    measures: '몸과 본능의 결이 얼마나 맞는가 (14종 동물 상징으로 판정)',
    high: '말이 없어도 편안하고, 함께 있는 시간이 회복이 됩니다.',
    low: '리듬이 달라 피로해질 수 있습니다. 각자의 속도를 인정하는 것이 핵심입니다.',
  },
  {
    key: 'graha-maitri',
    sanskrit: 'Graha Maitri',
    ko: '행성 우정',
    maxScore: 5,
    measures: '두 사람 지배 행성이 서로 친구인가 적인가',
    high: '생각의 회로가 비슷해 대화가 잘 통합니다.',
    low: '사고 방식이 달라 같은 말을 다르게 알아듣습니다. 확인하는 습관이 필요합니다.',
  },
  {
    key: 'gana',
    sanskrit: 'Gana',
    ko: '기질',
    maxScore: 6,
    measures: '타고난 기질 유형 (데바·마누샤·락샤사)',
    high: '기본 성향이 어울려 함께 있는 것이 자연스럽습니다.',
    low: '기질 차가 큽니다. 상대를 고치려 들면 반드시 부딪힙니다. 다름을 전제로 두세요.',
  },
  {
    key: 'bhakoot',
    sanskrit: 'Bhakoot',
    ko: '살림',
    maxScore: 7,
    measures: '함께 살아갈 때의 안정과 번영',
    high: '같이 하는 일이 잘 되고, 생활이 안정적으로 굴러갑니다.',
    low: '현실적인 문제에서 마찰이 생기기 쉽습니다. 돈·거주·가족 문제를 미리 합의해두세요.',
  },
  {
    key: 'nadi',
    sanskrit: 'Nadi',
    ko: '기운',
    maxScore: 8,
    measures: '체질과 기운의 결 (아디·마디아·안티아)',
    high: '서로의 부족한 기운을 채워주는 조합입니다.',
    low: '기운의 결이 겹칩니다. 같이 지치기 쉬우니, 쉬는 타이밍을 따로 두는 것이 좋습니다.',
  },
] as const

/** 총점 구간별 표기. 라이브러리 verdict 대신 이것을 쓴다. */
export const SCORE_BANDS = [
  { min: 0, max: 17, ko: '조율이 많이 필요한 조합', tone: 'caution' },
  { min: 18, max: 24, ko: '무난한 조합', tone: 'neutral' },
  { min: 25, max: 32, ko: '잘 맞는 조합', tone: 'good' },
  { min: 33, max: 36, ko: '드물게 잘 맞는 조합', tone: 'best' },
] as const

export const MAX_TOTAL_SCORE = 36
