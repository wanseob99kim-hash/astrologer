'use client'

import { useState } from 'react'

/**
 * 출생 정보 입력 — 한 화면에서 전부 받는다.
 *
 * 생년월일 · 시간 · 장소를 나눠 받으면 화면이 둘로 갈리고 이탈이 생긴다.
 * 시간은 선택으로 두되, 모르면 결과에 '확정 아님'을 표시한다.
 * 서버가 탄생별을 계산해야 하므로 /star 로 보내고 거기서 결과 주소로 넘긴다.
 */
export function BirthForm() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [unknownTime, setUnknownTime] = useState(false)

  const canSubmit = date.replace(/\D/g, '').length === 8

  return (
    <form action="/star" method="get" style={{ display: 'grid', gap: 20, marginTop: 28 }}>
      <div className="field">
        <label htmlFor="nickname">닉네임 <span className="small">(선택)</span></label>
        <input
          id="nickname"
          name="n"
          className="input"
          placeholder="결과에 불러드릴 이름"
          maxLength={20}
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor="birthdate">생년월일</label>
        <input
          id="birthdate"
          name="d"
          className="input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="19950505"
          inputMode="numeric"
          maxLength={10}
          autoComplete="bday"
          required
          aria-describedby="birthdate-hint"
        />
        <p className="hint" id="birthdate-hint">숫자 8자리 · 예) 1995년 5월 5일 → 19950505</p>
      </div>

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
            ? '정오를 기준으로 계산하고, 결과에 확정 아님으로 표시합니다.'
            : '24시간제 숫자 4자리 · 몰라도 결과는 나와요'}
        </p>
      </div>

      <div className="field">
        <label htmlFor="place">태어난 곳 <span className="small">(선택)</span></label>
        <input id="place" name="p" className="input" placeholder="서울" maxLength={40} autoComplete="off" />
      </div>

      <button type="submit" className="btn" disabled={!canSubmit}>
        내 탄생별 보기
      </button>
      <p className="small" style={{ textAlign: 'center', margin: 0 }}>
        회원가입 없이 바로 결과가 나옵니다.
      </p>
    </form>
  )
}
