import type { NakshatraRatings } from '@/content/types'

const AXES: ReadonlyArray<{ key: keyof NakshatraRatings; ko: string; hint: string }> = [
  { key: 'wealth', ko: '재물', hint: '모으고 불리는 힘' },
  { key: 'career', ko: '일', hint: '자리에서 성과를 내는 힘' },
  { key: 'love', ko: '연애', hint: '끌어당기고 표현하는 힘' },
  { key: 'bond', ko: '인연', hint: '오래 이어가는 힘' },
  { key: 'helper', ko: '귀인', hint: '도와줄 사람이 나타나는 힘' },
]

const MAX = 5

/** 다섯 축 성향. 값은 전통 성격 서술을 근거로 작성한 것이라 계산 결과가 아니다. */
export function RatingBars({ ratings }: { ratings: NakshatraRatings }) {
  return (
    <ul className="axisBars">
      {AXES.map((axis) => {
        const value = ratings[axis.key]
        return (
          <li key={axis.key}>
            <span className="axisBars__name">
              {axis.ko}
              <span className="axisBars__hint">{axis.hint}</span>
            </span>
            <span className="axisBars__dots" aria-label={`${MAX}점 만점에 ${value}점`}>
              {Array.from({ length: MAX }, (_, i) => (
                <span key={i} className={i < value ? 'is-on' : undefined} />
              ))}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
