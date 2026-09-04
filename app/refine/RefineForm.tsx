'use client'

import { useState } from 'react'

interface RefineFormProps {
  isoDate: string
  nickname?: string
}

/**
 * L1 입력. 시간과 장소를 받는다.
 *
 * 시간을 모르면 정오로 계산하는데 그때 탄생별이 23% 틀린다.
 * 그래서 '시간 모름'을 숨기지 않고 선택지로 두고, 결과 화면에서 확정 표기를 뺀다.
 * GET 으로 /star 에 보내면 서버가 계산해 탄생별 주소로 넘긴다.
 */
export function RefineForm({ isoDate, nickname }: RefineFormProps) {
  const [unknownTime, setUnknownTime] = useState(false)
  const [time, setTime] = useState('')

  return (
    <form action="/star" method="get" style={{ display: 'grid', gap: 22, marginTop: 30 }}>
      <input type="hidden" name="d" value={isoDate} />
      {nickname ? <input type="hidden" name="n" value={nickname} /> : null}

      <div className="field">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <label htmlFor="time">태어난 시간</label>
          <label className="checkline">
            <input
              type="checkbox"
              checked={unknownTime}
              onChange={(e) => { setUnknownTime(e.target.checked); if (e.target.checked) setTime('') }}
            />
            시간 모름
          </label>
        </div>
        <input
          id="time"
          name="t"
          className="input"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="0930"
          inputMode="numeric"
          maxLength={5}
          disabled={unknownTime}
          aria-describedby="time-hint"
        />
        <p className="hint" id="time-hint">
          {unknownTime
            ? '정오를 기준으로 계산하고, 결과에 "확정 아님"으로 표시합니다.'
            : '24시간제 숫자 4자리 · 예) 오전 9시 30분 → 0930'}
        </p>
      </div>

      <div className="field">
        <label htmlFor="place">태어난 곳 <span className="small">(선택)</span></label>
        <input
          id="place"
          name="p"
          className="input"
          placeholder="서울"
          maxLength={40}
          autoComplete="off"
          aria-describedby="place-hint"
        />
        <p className="hint" id="place-hint">
          도시 이름만 적어도 충분해요. 비워두면 서울 기준으로 계산합니다.
        </p>
      </div>

      <button type="submit" className="btn">내 탄생별 보기</button>
    </form>
  )
}
