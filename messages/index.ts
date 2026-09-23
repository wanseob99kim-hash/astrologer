import type { Locale } from '@/lib/i18n'
import { en } from './en'
import { ko, type Messages } from './ko'
import { articlesEn } from './articles-en'
import { articlesKo, type Articles } from './articles-ko'

const MESSAGES: Record<Locale, Messages> = { ko, en }
const ARTICLES: Record<Locale, Articles> = { ko: articlesKo, en: articlesEn }

/** 언어별 화면 문자열. */
export function messagesFor(locale: Locale): Messages {
  return MESSAGES[locale]
}

/** 언어별 해설 문서 본문. 분량이 커서 화면 문자열과 파일을 나눴다. */
export function articlesFor(locale: Locale): Articles {
  return ARTICLES[locale]
}

export type { Messages, Articles }
