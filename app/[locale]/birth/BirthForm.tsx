'use client'

import { useState } from 'react'
import { localePath, type Locale } from '@/lib/i18n'
import type { Messages } from '@/messages/index'

interface BirthFormProps {
  locale: Locale
  labels: Messages['birth']
}

/**
 * 출생 정보 입력 — 한 화면에서 전부 받는다.
 *
 * 생년월일 · 시간 · 장소를 나눠 받으면 화면이 둘로 갈리고 이탈이 생긴다.
 * 시간은 선택으로 두되, 모르면 결과에 '확정 아님'을 표시한다.
 * 서버가 탄생별을 계산해야 하므로 /star 로 보내고 거기서 결과 주소로 넘긴다.
 * 문자열은 서버 컴포넌트가 사전에서 골라 내려준다 — 클라이언트 번들에 두 언어를 싣지 않는다.
 */
export function BirthForm({ locale, labels: t }: BirthFormProps) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [unknownTime, setUnknownTime] = useState(false)

  const canSubmit = date.replace(/\D/g, '').length === 8

  return (
    <form action={localePath(locale, '/star')} method="get" style={{ display: 'grid', gap: 20, marginTop: 28 }}>
      <div className="field">
        <label htmlFor="nickname">{t.nickname} <span className="small">{t.optional}</span></label>
        <input id="nickname" name="n" className="input" placeholder={t.nicknamePlaceholder} maxLength={20} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="birthdate">{t.date}</label>
        <input
          id="birthdate"
          name="d"
          className="input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder={t.datePlaceholder}
          inputMode="numeric"
          maxLength={10}
          autoComplete="bday"
          required
          aria-describedby="birthdate-hint"
        />
        <p className="hint" id="birthdate-hint">{t.dateHint}</p>
      </div>

      <div className="field">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <label htmlFor="time">{t.time}</label>
          <label className="checkline">
            <input
              type="checkbox"
              checked={unknownTime}
              onChange={(e) => { setUnknownTime(e.target.checked); if (e.target.checked) setTime('') }}
            />
            {t.timeUnknown}
          </label>
        </div>
        <input
          id="time"
          name="t"
          className="input"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder={t.timePlaceholder}
          inputMode="numeric"
          maxLength={5}
          disabled={unknownTime}
          aria-describedby="time-hint"
        />
        <p className="hint" id="time-hint">{unknownTime ? t.timeHintUnknown : t.timeHint}</p>
      </div>

      <div className="field">
        <label htmlFor="place">{t.place} <span className="small">{t.optional}</span></label>
        <input id="place" name="p" className="input" placeholder={t.placePlaceholder} maxLength={40} autoComplete="off" />
      </div>

      <button type="submit" className="btn" disabled={!canSubmit}>{t.submit}</button>
      <p className="small" style={{ textAlign: 'center', margin: 0 }}>{t.submitSub}</p>
    </form>
  )
}
