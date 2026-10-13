import type { Locale } from '@/lib/i18n'
import type { GrahaKey } from './dignity'
import { GRAHA_LONG_EN } from './graha-en'
import { GRAHA_LONG_KO } from './graha-ko'
import { ARTICLE_EXTRA_EN, type ArticleExtra } from './extras-en'
import { ARTICLE_EXTRA_KO } from './extras-ko'
import { GUIDES_EN_1 } from './guides-en-1'
import { GUIDES_EN_2 } from './guides-en-2'
import { GUIDES_KO_1 } from './guides-ko-1'
import { GUIDES_KO_2 } from './guides-ko-2'
import type { Guide, GuideList, LongSection } from './types'

const GRAHA_LONG: Record<Locale, Record<GrahaKey, readonly LongSection[]>> = { en: GRAHA_LONG_EN, ko: GRAHA_LONG_KO }

/** 행성 페이지의 긴 글. */
export function grahaLong(key: GrahaKey, locale: Locale): readonly LongSection[] {
  return GRAHA_LONG[locale][key]
}

const ARTICLE_EXTRA: Record<Locale, Record<string, ArticleExtra>> = { en: ARTICLE_EXTRA_EN, ko: ARTICLE_EXTRA_KO }

/** 해설 글 보강분. 경로는 접두사 없는 기본 경로. */
export function articleExtra(path: string, locale: Locale): ArticleExtra {
  const extra = ARTICLE_EXTRA[locale][path]
  if (!extra) throw new Error(`해설 보강 없음: ${locale} ${path}`)
  return extra
}

const GUIDES: Record<Locale, GuideList> = {
  en: [...GUIDES_EN_1, ...GUIDES_EN_2],
  ko: [...GUIDES_KO_1, ...GUIDES_KO_2],
}

/** 가이드 목록. 두 언어의 slug 순서가 같다. */
export function guidesFor(locale: Locale): GuideList {
  return GUIDES[locale]
}

export function guideBySlug(slug: string, locale: Locale): Guide | undefined {
  return GUIDES[locale].find((guide) => guide.slug === slug)
}

/** 가이드 게시일. 글을 크게 고치면 dateModified 로 따로 둔다. */
export const GUIDES_PUBLISHED = '2026-10-13'
