/** 검증 스위트 일괄 실행. 하나라도 실패하면 비정상 종료한다. */
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const SCRIPTS = [
  ['01-nakshatra.mjs', '나크샤트라 판정'],
  ['02-dasha.mjs', '빔쇼타리 다샤'],
  ['03-match.mjs', '아쉬타쿠타 궁합'],
  ['04-time-sensitivity.mjs', '출생시각 민감도'],
]

const failures = []
for (const [file, label] of SCRIPTS) {
  console.log(`\n${'='.repeat(70)}\n${label}  (${file})\n${'='.repeat(70)}`)
  // Windows 에서 URL.pathname 은 드라이브 접두사와 퍼센트 인코딩이 깨진다. fileURLToPath 를 쓴다.
  const scriptPath = fileURLToPath(new URL(file, import.meta.url))
  const result = spawnSync(process.execPath, [scriptPath], { stdio: 'inherit' })
  if (result.status !== 0) failures.push(label)
}

console.log(`\n${'='.repeat(70)}`)
console.log(failures.length === 0 ? '전체 PASS' : `실패: ${failures.join(', ')}`)
process.exitCode = failures.length === 0 ? 0 : 1
