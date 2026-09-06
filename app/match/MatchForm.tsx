'use client'

import { useState } from 'react'

interface MatchFormProps {
  /** 초대한 사람의 정보. 쿼리로 넘어온 값을 그대로 실어 보낸다. */
  inviter: { date: string; time?: string; nickname?: string }
}

/**
 * 상대방 생년월일 입력.
 * 성별은 받지 않는다. 아쉬타쿠타의 남/녀 비대칭은 양방향 평균으로 없앴다.
 */
export function MatchForm({ inviter }: MatchFormProps) {
  const [unknownTime, setUnknownTime] = useState(false)
  const [time, setTime] = useState('')

  return (
    <form action="/match/result" method="get" style={{ display: 'grid', gap: 22, marginTop: 28 }}>
      <input type="hidden" name="ad" value={inviter.date} />
      {inviter.time ? <input type="hidden" name="at" value={inviter.time} /> : null}
      {inviter.nickname ? <input type="hidden" name="an" value={inviter.nickname} /> : null}

      <div className="field">
        <label htmlFor="bn">상대 닉네임 <span className="small">(선택)</span></label>
        <input id="bn" name="bn" className="input" placeholder="결과에 부를 이름" maxLength={20} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="bd">상대 생년월일</label>
        <input
          id="bd"
          name="bd"
          className="input"
          placeholder="19931120"
          inputMode="numeric"
          maxLength={10}
          required
          aria-describedby="bd-hint"
        />
        <p className="hint" id="bd-hint">숫자 8자리 · 예) 1993년 11월 20일 → 19931120</p>
      </div>

      <div className="field">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <label htmlFor="bt">상대가 태어난 시간</label>
          <label className="checkline">
            <input
              type="checkbox"
              checked={unknownTime}
              onChange={(e) => { setUnknownTime(e.target.checked); if (e.target.checked) setTime('') }}
            />
            모름
          </label>
        </div>
        <input
          id="bt"
          name="bt"
          className="input"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="0600"
          inputMode="numeric"
          maxLength={5}
          disabled={unknownTime}
          aria-describedby="bt-hint"
        />
        <p className="hint" id="bt-hint">
          {unknownTime
            ? '정오 기준으로 계산하고, 결과에 확정 아님으로 표시합니다.'
            : '24시간제 숫자 4자리 · 몰라도 볼 수 있어요'}
        </p>
      </div>

      <button type="submit" className="btn">궁합 점수 보기</button>
      <p className="small" style={{ textAlign: 'center', margin: 0 }}>
        성별은 묻지 않습니다. 누구를 먼저 넣든 결과가 같아요.
      </p>
    </form>
  )
}
