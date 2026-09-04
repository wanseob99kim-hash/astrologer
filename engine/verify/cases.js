/**
 * 검증 기준 케이스.
 * 공개된 베딕 차트 자료가 널리 인용되는 인물만 사용한다.
 * date 는 항상 UTC 순간으로 환산해 둔다 (LMT/IST 보정 완료).
 */

export const ANCHOR_CASES = [
  {
    id: 'modi',
    label: 'Narendra Modi',
    localTime: '1950-09-17 11:00 IST (UTC+5:30)',
    date: new Date(Date.UTC(1950, 8, 17, 5, 30, 0)),
    lat: 23.7833,
    lon: 72.6333,
    expected: { moonNakshatra: 'Anuradha', moonRashi: 'Scorpio', ascendantRashi: 'Scorpio', ascendantNakshatra: 'Vishakha' },
  },
  {
    id: 'gandhi',
    label: 'Mahatma Gandhi',
    // Porbandar 경도 69.6293° → LMT 오프셋 +4h38m31s. 07:11:44 LMT → 02:33:13 UTC
    localTime: '1869-10-02 07:11:44 LMT (UTC+4:38:31)',
    date: new Date(Date.UTC(1869, 9, 2, 2, 33, 13)),
    lat: 21.6417,
    lon: 69.6293,
    // 출처: astrosage / astroficial 공개 차트 — 달 게자리 Ashlesha, 라그나 천칭 Swati
    expected: { moonNakshatra: 'Ashlesha', moonRashi: 'Cancer', ascendantRashi: 'Libra', ascendantNakshatra: 'Swati' },
  },
]

/** 무작위 표본 생성 — 라이브러리 간 교차 대조용. */
export function randomSamples(count, seed = 20260903) {
  let state = seed
  const next = () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
  const startMs = Date.UTC(1940, 0, 1)
  const endMs = Date.UTC(2012, 0, 1)
  const samples = []
  for (let i = 0; i < count; i += 1) {
    samples.push({
      date: new Date(startMs + next() * (endMs - startMs)),
      lat: 33 + next() * 5, // 한국 위도대
      lon: 126 + next() * 4, // 한국 경도대
    })
  }
  return samples
}
