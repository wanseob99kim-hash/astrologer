'use client'

import { useState } from 'react'

interface InviteLinkProps {
  path: string
  labels: { copy: string; copied: string; prompt: string; note: string }
}

/**
 * 초대 링크 복사.
 * 링크에는 초대한 사람의 생년월일이 담긴다. 그 사실을 화면에 밝힌다.
 */
export function InviteLink({ path, labels }: InviteLinkProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    const url = `${window.location.origin}${path}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt(labels.prompt, url)
    }
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <button type="button" className="btn btn--ghost" onClick={copy}>
        {copied ? labels.copied : labels.copy}
      </button>
      <p className="small" style={{ margin: 0 }}>{labels.note}</p>
    </div>
  )
}
