import Link from 'next/link'

/**
 * 전 페이지 하단 고정 고지.
 * 기획서 §9 — "실제 점술·상담·의료·법률·투자 조언이 아니다" 문구는 반드시 노출한다.
 */
export function Footer() {
  return (
    <footer className="footer">
      <hr className="rule" style={{ marginBottom: 20 }} />
      <nav aria-label="약관">
        <Link href="/compare/saju">사주와 뭐가 다른가</Link>
        <Link href="/tradition/nakshatra">27 탄생별</Link>
        <Link href="/tradition/navagraha">아홉 행성</Link>
        <Link href="/tradition/dasha">다샤</Link>
        <Link href="/terms">이용약관</Link>
        <Link href="/privacy">개인정보처리방침</Link>
      </nav>
      <p className="disclaimer">
        실제 점술·상담·의료·법률·투자 조언이 아닌, 재미로 즐기는 콘텐츠입니다.
      </p>
    </footer>
  )
}
