/**
 * 빌드 전 기준 주소 점검.
 *
 * canonical 과 og:url 은 빌드 시점에 문자열로 박히기 때문에,
 * 주소를 지정하지 않고 배포하면 localhost 가 그대로 색인된다.
 * 벤치마크 사이트가 개발 도메인을 sitemap 에 노출한 것이 이 사고다.
 */

const configured =
  process.env.SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL

if (configured) {
  process.stdout.write(`[site-url] 기준 주소: ${configured}\n`)
} else {
  process.stdout.write(
    '[site-url] 경고: SITE_URL 이 없어 canonical 과 og:url 이 http://localhost:3000 으로 박힙니다.\n' +
      '           배포용 빌드라면 SITE_URL=https://도메인 을 지정하세요.\n',
  )
}
