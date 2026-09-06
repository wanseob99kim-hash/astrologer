import type { KootaScore } from '@/lib/astro/match'
import { formatScore } from '@/lib/astro/match'

/**
 * 8쿠타 점수판.
 * 막대 길이는 만점 대비 비율이다 — 배점이 항목마다 달라서(1~8점)
 * 점수만 나열하면 어느 항목이 무거운지 알 수 없다.
 */
export function ScoreBoard({ kootas }: { kootas: readonly KootaScore[] }) {
  return (
    <ul className="kootaBoard">
      {kootas.map((entry) => (
        <li key={entry.koota.key} className={entry.isWeak ? 'is-weak' : undefined}>
          <span className="kootaBoard__name">
            {entry.koota.ko}
            <span className="kootaBoard__max">{entry.maxScore}점</span>
          </span>
          <span className="kootaBoard__track">
            <span className="kootaBoard__fill" style={{ width: `${Math.max(entry.ratio * 100, 2)}%` }} />
          </span>
          <span className="kootaBoard__score">{formatScore(entry.score)}</span>
        </li>
      ))}
    </ul>
  )
}
