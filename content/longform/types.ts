/**
 * 긴 글(해설 보강·가이드·행성 심화) 공용 형식.
 *
 * 문단은 문자열 배열로만 둔다. 마크업을 섞지 않아야 두 언어 파일을 나란히 고치기 쉽다.
 */

export interface LongSection {
  /** 소제목. */
  h: string
  /** 문단. */
  p: readonly string[]
  /** 문단 뒤에 붙는 짧은 목록(선택). */
  list?: readonly string[]
}

/** 가이드 글 하나. 경로는 /guides/<slug>. */
export interface Guide {
  slug: string
  title: string
  description: string
  lede: string
  sections: readonly LongSection[]
  /** 글 끝 "더 읽기"에 걸 사이트 안 경로(접두사 없는 기본 경로). */
  related: readonly string[]
}

/** 언어별 가이드 목록. 두 언어의 slug 순서가 같아야 한다(validate 가 확인). */
export type GuideList = readonly Guide[]
