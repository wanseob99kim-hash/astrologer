import Link from 'next/link'
import type { LongSection } from '@/content/longform/types'
import { linkLabel } from '@/content/longform/links'
import { localePath, type Locale } from '@/lib/i18n'

/** 긴 글 본문. 소제목 + 문단 + (선택) 목록. */
export function LongSections({ sections }: { sections: readonly LongSection[] }) {
  return (
    <div className="longform">
      {sections.map((section) => (
        <section key={section.h}>
          <h2>{section.h}</h2>
          {section.p.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.list ? (
            <ul className="bullets">
              {section.list.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  )
}

const READ_MORE: Record<Locale, string> = { en: 'Read next', ko: '이어서 읽기' }

/** 글 끝 "이어서 읽기". 막다른 페이지를 없애 사이트 안에서 다음 글로 넘어가게 한다. */
export function RelatedLinks({ locale, paths }: { locale: Locale; paths: readonly string[] }) {
  if (paths.length === 0) return null
  return (
    <nav className="related" aria-label={READ_MORE[locale]}>
      <h2 className="eyebrow">{READ_MORE[locale]}</h2>
      <ul>
        {paths.map((path) => (
          <li key={path}>
            <Link href={localePath(locale, path)}>{linkLabel(path, locale)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
