'use client'

import { useState } from 'react'

export interface ShareLabels {
  title: string
  native: string
  copy: string
  copied: string
  prompt: string
  x: string
  facebook: string
  note: string
}

interface ShareButtonsProps {
  /** 공유할 주소. 접두사 포함 경로만 받고, 도메인은 브라우저에서 붙인다. */
  path: string
  /** 공유 카드에 실릴 제목 — 네이티브 공유 시트와 X 글에 쓴다. */
  shareTitle: string
  shareText: string
  labels: ShareLabels
}

/**
 * 결과 공유.
 *
 * 모바일에서는 기기 공유 시트를 띄운다 — 카카오톡·인스타 등 설치된 앱이 그대로 뜨므로
 * 앱별 SDK(카카오 JS 키 등)를 붙이지 않아도 된다. 데스크톱에는 링크 복사와 X·페이스북만 둔다.
 * 링크에는 생년월일이 담기므로 그 사실을 화면에 밝힌다.
 */
export function ShareButtons({ path, shareTitle, shareText, labels }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const fullUrl = () => `${window.location.origin}${path}`

  async function shareNative() {
    const url = fullUrl()
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url })
        return
      } catch {
        // 사용자가 닫았거나 실패 — 복사로 넘어간다
      }
    }
    await copyLink()
  }

  async function copyLink() {
    const url = fullUrl()
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt(labels.prompt, url)
    }
  }

  function openWindow(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=540')
  }

  return (
    <div className="share">
      <p className="share__title">{labels.title}</p>
      <div className="share__row">
        <button type="button" className="share__btn share__btn--primary" onClick={shareNative}>
          <span aria-hidden="true">↗</span> {labels.native}
        </button>
        <button type="button" className="share__btn" onClick={copyLink}>
          <span aria-hidden="true">⧉</span> {copied ? labels.copied : labels.copy}
        </button>
        <button
          type="button"
          className="share__btn"
          onClick={() => openWindow(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl())}`)}
        >
          <span aria-hidden="true">𝕏</span> {labels.x}
        </button>
        <button
          type="button"
          className="share__btn"
          onClick={() => openWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl())}`)}
        >
          <span aria-hidden="true">f</span> {labels.facebook}
        </button>
      </div>
      <p className="small share__note">{labels.note}</p>
    </div>
  )
}
