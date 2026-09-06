'use client'

import { useState } from 'react'

/**
 * 초대 링크 복사.
 * 링크에는 초대한 사람의 생년월일이 담긴다. 그 사실을 화면에 밝힌다.
 */
export function InviteLink({ path }: { path: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    const url = `${window.location.origin}${path}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('아래 주소를 복사해 전달하세요', url)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <button type="button" className="btn btn--ghost" onClick={copy}>
        {copied ? '복사했어요' : '초대 링크 복사하기'}
      </button>
      <p className="small" style={{ margin: 0 }}>
        이 링크에는 내 생년월일이 담깁니다. 상대가 열면 자기 생일만 넣으면 돼요.
      </p>
    </div>
  )
}
