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
  instagram: string
  /** 인스타로 넘길 준비가 끝났을 때 — 이미지가 저장되고 링크가 복사된 상태. */
  instagramReady: string
  instagramHint: string
  note: string
}

interface ShareButtonsProps {
  /** 공유할 주소. 접두사 포함 경로만 받고, 도메인은 브라우저에서 붙인다. */
  path: string
  /** 공유 카드 이미지 경로. 인스타에는 링크가 아니라 이 이미지를 넘긴다. */
  imagePath: string
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
 *
 * 인스타그램만 따로 두는 이유: 인스타는 웹에서 링크를 받는 공유 주소가 없다.
 * 그래서 카드 이미지를 파일로 넘기거나(Web Share Level 2), 안 되면 이미지를 내려받고
 * 링크를 복사해 둔다 — 사용자가 올린 뒤 링크만 붙이면 되게.
 *
 * 링크에는 생년월일이 담기므로 그 사실을 화면에 밝힌다.
 */
export function ShareButtons({ path, imagePath, shareTitle, shareText, labels }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [igReady, setIgReady] = useState(false)

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
      return true
    } catch {
      window.prompt(labels.prompt, url)
      return false
    }
  }

  /** 카드 이미지를 파일로 받아 온다. 실패하면 undefined. */
  async function fetchImageFile(): Promise<File | undefined> {
    try {
      const response = await fetch(imagePath)
      if (!response.ok) return undefined
      const blob = await response.blob()
      const name = imagePath.split('/').pop() ?? 'card.jpg'
      return new File([blob], name, { type: blob.type || 'image/jpeg' })
    } catch {
      return undefined
    }
  }

  async function shareInstagram() {
    const file = await fetchImageFile()

    // 1) 파일 공유가 되는 기기면 공유 시트에 인스타가 뜬다
    if (file && typeof navigator !== 'undefined' && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: shareTitle, text: `${shareText}\n${fullUrl()}` })
        return
      } catch {
        // 닫았거나 실패 — 아래 경로로
      }
    }

    // 2) 안 되면 이미지를 내려받고 링크를 복사해 둔다
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      const anchor = document.createElement('a')
      anchor.href = objectUrl
      anchor.download = file.name
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
    }
    await copyLink()
    setIgReady(true)
    window.setTimeout(() => setIgReady(false), 6000)
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
        <button type="button" className="share__btn share__btn--ig" onClick={shareInstagram}>
          <span aria-hidden="true">◎</span> {labels.instagram}
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
      {igReady ? <p className="small share__ig">{labels.instagramReady}</p> : null}
      <p className="small share__note">{labels.instagramHint}</p>
      <p className="small share__note">{labels.note}</p>
    </div>
  )
}
