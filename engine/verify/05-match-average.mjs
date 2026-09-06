/**
 * 검증 5 — 양방향 평균 궁합
 *
 * 아쉬타쿠타는 전통상 남/녀 역할이 대칭이 아니다(P2 측정: 150쌍 중 103쌍에서 점수가 달라짐).
 * 성별을 입력받지 않기 위해 양방향 평균을 쓰기로 했으므로,
 * 그 결과가 정말 순서와 무관한지가 이 검증의 핵심이다.
 *
 * 확인 항목
 *  - computeMatch(a, b) 와 computeMatch(b, a) 가 완전히 같은가
 *  - 총점이 쿠타 점수의 합과 일치하는가
 *  - 각 쿠타 점수가 0..만점 범위인가
 *  - 평균값이 원래 두 방향 점수 사이에 있는가
 *  - 같은 입력에 항상 같은 출력인가
 */

import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const runner = resolve(here, 'match-average-runner.ts')

// 계산 레이어가 TypeScript 라 tsx 로 실행하고 결과만 받아온다.
const result = spawnSync('npx', ['tsx', runner], {
  stdio: 'inherit',
  cwd: resolve(here, '../..'),
  shell: process.platform === 'win32',
})

process.exitCode = result.status ?? 1
