import { defineCloudflareConfig } from '@opennextjs/cloudflare'

/**
 * OpenNext → Cloudflare 변환 설정.
 * 캐시 저장소(R2·KV)는 아직 붙이지 않는다. 페이지가 전부 서버 계산이라 ISR 이 없다.
 */
export default defineCloudflareConfig({})
