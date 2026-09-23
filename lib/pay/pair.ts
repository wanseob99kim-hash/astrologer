/**
 * 궁합 주소의 쿼리(ad/at/an · bd/bt/bn)를 읽어 두 사람의 입력으로 바꾼다.
 * 결제 전(checkout)·승인(confirm)·리포트(report) 세 곳이 같은 규칙으로 읽어야
 * 서명이 어긋나지 않는다 — 그래서 한 곳에 둔다.
 */
import { parseBirthInput } from '@/lib/astro/input'
import type { BirthInput } from '@/lib/astro/types'
import type { PairInput } from './token'

export interface ParsedPair {
  a: BirthInput
  b: BirthInput
  pair: PairInput
  /** 정규화한 쿼리. 다음 화면으로 넘길 때 이걸 쓴다. */
  query: URLSearchParams
}

type Getter = (name: string) => string | undefined

/** 입력이 잘못됐으면 예외를 던진다(BirthInputError). */
export function parsePair(get: Getter): ParsedPair {
  const a = parseBirthInput({ date: get('ad'), time: get('at'), nickname: get('an') })
  const b = parseBirthInput({ date: get('bd'), time: get('bt'), nickname: get('bn') })

  const query = new URLSearchParams({ ad: a.date, bd: b.date })
  if (a.time) query.set('at', a.time)
  if (b.time) query.set('bt', b.time)
  if (a.nickname) query.set('an', a.nickname)
  if (b.nickname) query.set('bn', b.nickname)

  return {
    a,
    b,
    pair: { aDate: a.date, aTime: a.time, bDate: b.date, bTime: b.time },
    query,
  }
}

/** Next 의 searchParams 객체용. 배열이면 첫 값만 쓴다. */
export function getterFromRecord(record: Record<string, string | string[] | undefined>): Getter {
  return (name) => {
    const value = record[name]
    return Array.isArray(value) ? value[0] : value
  }
}
