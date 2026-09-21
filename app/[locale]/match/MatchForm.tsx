'use client'

import { useState } from 'react'
import { localePath, type Locale } from '@/lib/i18n'

/** 폼에 필요한 문자열만. 함수가 섞인 사전 전체는 클라이언트로 넘길 수 없다. */
export type MatchFormLabels = Pick<
  import('@/messages/index').Messages['match'],
  | 'partnerNickname' | 'partnerNicknamePlaceholder' | 'partnerDate' | 'partnerDatePlaceholder' | 'partnerDateHint'
  | 'partnerTime' | 'unknown' | 'partnerTimePlaceholder' | 'timeHintUnknown' | 'timeHint' | 'submit' | 'submitSub'
>

interface MatchFormProps {
  locale: Locale
  labels: MatchFormLabels
  optionalLabel: string
  /** 초대한 사람의 정보. 쿼리로 넘어온 값을 그대로 실어 보낸다. */
  inviter: { date: string; time?: string; nickname?: string }
}

/**
 * 상대방 생년월일 입력.
 * 성별은 받지 않는다. 아쉬타쿠타의 남/녀 비대칭은 양방향 평균으로 없앴다.
 */
export function MatchForm({ locale, labels: t, optionalLabel, inviter }: MatchFormProps) {
  const [unknownTime, setUnknownTime] = useState(false)
  const [time, setTime] = useState('')

  return (
    <form action={localePath(locale, '/match/result')} method="get" style={{ display: 'grid', gap: 22, marginTop: 28 }}>
      <input type="hidden" name="ad" value={inviter.date} />
      {inviter.time ? <input type="hidden" name="at" value={inviter.time} /> : null}
      {inviter.nickname ? <input type="hidden" name="an" value={inviter.nickname} /> : null}

      <div className="field">
        <label htmlFor="bn">{t.partnerNickname} <span className="small">{optionalLabel}</span></label>
        <input id="bn" name="bn" className="input" placeholder={t.partnerNicknamePlaceholder} maxLength={20} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="bd">{t.partnerDate}</label>
        <input
          id="bd"
          name="bd"
          className="input"
          placeholder={t.partnerDatePlaceholder}
          inputMode="numeric"
          maxLength={10}
          required
          aria-describedby="bd-hint"
        />
        <p className="hint" id="bd-hint">{t.partnerDateHint}</p>
      </div>

      <div className="field">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <label htmlFor="bt">{t.partnerTime}</label>
          <label className="checkline">
            <input
              type="checkbox"
              checked={unknownTime}
              onChange={(e) => { setUnknownTime(e.target.checked); if (e.target.checked) setTime('') }}
            />
            {t.unknown}
          </label>
        </div>
        <input
          id="bt"
          name="bt"
          className="input"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder={t.partnerTimePlaceholder}
          inputMode="numeric"
          maxLength={5}
          disabled={unknownTime}
          aria-describedby="bt-hint"
        />
        <p className="hint" id="bt-hint">{unknownTime ? t.timeHintUnknown : t.timeHint}</p>
      </div>

      <button type="submit" className="btn">{t.submit}</button>
      <p className="small" style={{ textAlign: 'center', margin: 0 }}>{t.submitSub}</p>
    </form>
  )
}
