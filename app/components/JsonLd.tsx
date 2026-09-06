/**
 * 구조화 데이터 삽입.
 * 값은 우리가 만든 객체를 JSON.stringify 한 것이라 외부 입력이 섞이지 않는다.
 * </script> 로 문서가 조기 종료되는 것만 막아 둔다.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
