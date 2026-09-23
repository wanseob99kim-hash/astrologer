/**
 * 결제 설정.
 *
 * 키와 사업자 정보는 전부 환경 변수에서 읽는다. 코드에는 아무 비밀도 두지 않는다.
 *  - 로컬: .env.local (저장소에 올라가지 않는다)
 *  - 배포: `npx wrangler secret put TOSS_SECRET_KEY` 처럼 Cloudflare 시크릿으로 넣는다
 *
 * 결제 버튼은 필요한 값이 모두 있을 때만 뜬다. 하나라도 없으면 화면은 지금처럼
 * "준비 중"으로 남는다 — 키를 넣기 전까지 라이브 사이트에 영향이 없다.
 */

/**
 * 궁합 상세 리포트 가격.
 *
 * 정한 가격은 $2 다. 달러를 받는 결제 대행사(Stripe · Lemon Squeezy)는 아직 정하지 않았고,
 * 지금 붙어 있는 토스는 원화만 받는다. 그래서 토스로 결제할 때는 $2 에 맞춘 원화 금액을 쓴다.
 * 달러 결제로 바꾸면 REPORT_PRICE_USD 를 그대로 청구하면 된다.
 */
export const REPORT_PRICE_USD = 2

/** 토스(원화) 결제 금액. $2 상당. 바꾸면 결제 요청과 승인 검증이 함께 바뀐다. */
export const REPORT_PRICE_KRW = 2900

export const REPORT_PRODUCT_NAME = '궁합 상세 리포트'

/** 토스 테스트 키는 test_ 로 시작한다. 라이브 키면 사업자 고지가 반드시 있어야 한다. */
export function isTestKey(key: string): boolean {
  return key.startsWith('test_')
}

export interface BusinessInfo {
  name: string
  owner: string
  registrationNo: string
  mailOrderNo: string
  contact: string
}

export interface PayConfig {
  clientKey: string
  secretKey: string
  signingSecret: string
  isTest: boolean
  business: BusinessInfo | null
}

const read = (name: string): string => process.env[name]?.trim() ?? ''

function readBusiness(): BusinessInfo | null {
  const info: BusinessInfo = {
    name: read('BIZ_NAME'),
    owner: read('BIZ_OWNER'),
    registrationNo: read('BIZ_REG_NO'),
    mailOrderNo: read('BIZ_MAIL_ORDER_NO'),
    contact: read('BIZ_CONTACT'),
  }
  return Object.values(info).every(Boolean) ? info : null
}

/**
 * 결제를 켤 수 있으면 설정을, 아니면 null 을 돌려준다.
 *
 * 전자상거래법상 결제 화면에는 상호·대표자·사업자번호·통신판매업 신고번호가 있어야 한다.
 * 그래서 라이브 키인데 사업자 정보가 비어 있으면 결제를 켜지 않는다.
 * 테스트 키는 실제 돈이 오가지 않으니 사업자 정보 없이도 켠다.
 */
export function payConfig(): PayConfig | null {
  const clientKey = read('TOSS_CLIENT_KEY')
  const secretKey = read('TOSS_SECRET_KEY')
  const signingSecret = read('REPORT_SIGNING_SECRET')
  if (!clientKey || !secretKey || signingSecret.length < 32) return null

  const isTest = isTestKey(clientKey) && isTestKey(secretKey)
  const business = readBusiness()
  if (!isTest && !business) return null

  return { clientKey, secretKey, signingSecret, isTest, business }
}
