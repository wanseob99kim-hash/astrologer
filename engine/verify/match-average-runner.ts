/** 검증 5 본체. 05-match-average.mjs 가 tsx 로 실행한다. */

import { computeMatch, formatScore } from '@/lib/astro/match'
import { SCORE_BANDS } from '@/content/index'
import { parseBirthInput } from '@/lib/astro/input'
import type { BirthInput } from '@/lib/astro/types'

const PAIR_COUNT = 200
const MAX_TOTAL = 36

/** 결정론적 표본 — 한국 위경도, 1960~2005 */
function samples(count: number, seed = 90210): BirthInput[] {
  let state = seed
  const next = () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
  const start = Date.UTC(1960, 0, 1)
  const end = Date.UTC(2005, 0, 1)
  const list: BirthInput[] = []
  for (let i = 0; i < count; i += 1) {
    const when = new Date(start + next() * (end - start))
    list.push(
      parseBirthInput({
        date: when.toISOString().slice(0, 10),
        time: `${String(when.getUTCHours()).padStart(2, '0')}${String(when.getUTCMinutes()).padStart(2, '0')}`,
      }),
    )
  }
  return list
}

const people = samples(PAIR_COUNT * 2)
const problems: string[] = []
let asymmetricPairs = 0
let halfPointPairs = 0
const distribution: Record<string, number> = {}

for (let i = 0; i < people.length; i += 2) {
  const a = people[i]
  const b = people[i + 1]
  if (!a || !b) continue

  const forward = computeMatch(a, b)
  const reverse = computeMatch(b, a)
  const repeat = computeMatch(a, b)
  const label = `${a.date}/${a.time} × ${b.date}/${b.time}`

  // 핵심: 순서를 바꿔도 결과가 같아야 한다
  if (forward.total !== reverse.total) {
    problems.push(`${label}: 순서 바꾸면 총점이 다름 ${forward.total} vs ${reverse.total}`)
  }
  for (let k = 0; k < forward.kootas.length; k += 1) {
    const f = forward.kootas[k]
    const r = reverse.kootas[k]
    if (!f || !r) continue
    if (f.koota.key !== r.koota.key || f.score !== r.score) {
      problems.push(`${label}: ${f.koota.key} 쿠타가 순서에 따라 다름 ${f.score} vs ${r.score}`)
    }
    if (f.score < 0 || f.score > f.maxScore) {
      problems.push(`${label}: ${f.koota.key} 점수 ${f.score} 가 0..${f.maxScore} 범위 밖`)
    }
  }

  if (forward.total !== repeat.total) problems.push(`${label}: 같은 입력에 다른 결과`)

  const sum = forward.kootas.reduce((acc, entry) => acc + entry.score, 0)
  if (Math.abs(sum - forward.total) > 1e-9) {
    problems.push(`${label}: 총점 ${forward.total} ≠ 쿠타 합 ${sum}`)
  }
  if (forward.total < 0 || forward.total > MAX_TOTAL) {
    problems.push(`${label}: 총점 ${forward.total} 가 0..${MAX_TOTAL} 범위 밖`)
  }
  // 구간은 하한만 본다. 상한은 다음 구간의 하한이다.
  const bandIndex = SCORE_BANDS.findIndex((band) => band.ko === forward.band.ko)
  const nextBand = SCORE_BANDS[bandIndex + 1]
  if (forward.total < forward.band.min || (nextBand && forward.total >= nextBand.min)) {
    problems.push(`${label}: 구간 판정 불일치 (${forward.total} → ${forward.band.ko})`)
  }
  if (forward.weakest && !forward.weakest.isWeak) {
    problems.push(`${label}: weakest 가 약한 축이 아님`)
  }

  if (forward.wasAsymmetric) asymmetricPairs += 1
  if (!Number.isInteger(forward.total)) halfPointPairs += 1

  distribution[forward.band.ko] = (distribution[forward.band.ko] ?? 0) + 1
}

console.log(`\n[5] 양방향 평균 궁합 — 무작위 ${PAIR_COUNT}쌍`)
console.log(`  순서 무관 위반            : ${problems.filter((p) => p.includes('순서')).length}`)
console.log(`  원본이 비대칭이던 쌍      : ${asymmetricPairs} / ${PAIR_COUNT} (평균으로 흡수됨)`)
console.log(`  총점이 .5 로 나온 쌍      : ${halfPointPairs} / ${PAIR_COUNT}`)
console.log('  점수 구간 분포:')
for (const [band, count] of Object.entries(distribution).sort()) {
  console.log(`    ${band.padEnd(22)} ${count}`)
}

const sampleA = people[0]
const sampleB = people[1]
if (sampleA && sampleB) {
  const demo = computeMatch(sampleA, sampleB)
  console.log(`\n  예시 ${sampleA.date} × ${sampleB.date} → ${formatScore(demo.total)} / 36 · ${demo.band.ko}`)
  for (const entry of demo.kootas) {
    console.log(`    ${entry.koota.ko.padEnd(8)} ${formatScore(entry.score)} / ${entry.maxScore}${entry.isWeak ? '  (약한 축)' : ''}`)
  }
}

if (problems.length > 0) {
  console.log(`\n  위반 ${problems.length}건:`)
  for (const problem of problems.slice(0, 8)) console.log(`    ${problem}`)
}

console.log(`\n[5] 결과: ${problems.length === 0 ? 'PASS' : 'FAIL'}`)
process.exitCode = problems.length === 0 ? 0 : 1
