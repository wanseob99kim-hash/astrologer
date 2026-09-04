'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GRAHA_SLUG_BY_MOOLANK, moolankOf } from '@/content/numerology'
import { normalizeDate, normalizeNickname } from '@/lib/astro/input'
import { BirthInputError } from '@/lib/astro/types'

/**
 * L0 입력.
 * 물랑크는 생년월일만으로 정해지므로 서버를 거치지 않고 바로 결과로 이동한다.
 * "계산이 필요 없다"는 설명을 화면 동작으로도 지킨다.
 */
export function BirthForm() {
  const router = useRouter()
  const [date, setDate] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState<string | null>(null)

  const digits = date.replace(/\D/g, '')
  const canSubmit = digits.length === 8

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    try {
      const isoDate = normalizeDate(date)
      const day = Number(isoDate.slice(8, 10))
      const slug = GRAHA_SLUG_BY_MOOLANK[moolankOf(day)]
      if (!slug) throw new Error('결과를 찾지 못했습니다.')

      const params = new URLSearchParams({ d: isoDate })
      const name = normalizeNickname(nickname)
      if (name) params.set('n', name)

      setError(null)
      router.push(`/graha/${slug}?${params}`)
    } catch (caught: unknown) {
      setError(caught instanceof BirthInputError ? caught.message : '입력을 다시 확인해 주세요.')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 22, marginTop: 30 }} noValidate>
      <div className="field">
        <label htmlFor="nickname">닉네임 <span className="small">(선택)</span></label>
        <input
          id="nickname"
          className="input"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="결과에 불러드릴 이름"
          maxLength={20}
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor="birthdate">생년월일</label>
        <input
          id="birthdate"
          className="input"
          value={date}
          onChange={(e) => { setDate(e.target.value); setError(null) }}
          placeholder="19950505"
          inputMode="numeric"
          maxLength={10}
          autoComplete="bday"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby="birthdate-hint"
        />
        <p className="hint" id="birthdate-hint">
          숫자 8자리 · 예) 1995년 5월 5일 → 19950505
        </p>
        {error ? <p className="error" role="alert">{error}</p> : null}
      </div>

      <button type="submit" className="btn" disabled={!canSubmit}>
        내 수호 행성 보기
      </button>
      <p className="small" style={{ textAlign: 'center', margin: 0 }}>
        태어난 시간은 다음 단계에서 물어봅니다.
      </p>
    </form>
  )
}
