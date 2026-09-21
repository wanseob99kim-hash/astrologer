import type { Locale } from '@/lib/i18n'
import { en } from './en'
import { ko, type Messages } from './ko'

const MESSAGES: Record<Locale, Messages> = { ko, en }

/** 언어별 화면 문자열. */
export function messagesFor(locale: Locale): Messages {
  return MESSAGES[locale]
}

export type { Messages }
