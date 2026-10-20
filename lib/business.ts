/**
 * 판매자(사업자) 정보.
 *
 * 전자상거래법상 사이버몰 첫 화면에 표시해야 하는 공개 정보다. 비밀이 아니므로 코드에 둔다.
 * 환경 변수로 두면 빌드 시점에 굳는 정적 페이지 하단에 나오지 않는다.
 *
 * 값이 null 인 항목은 화면에 내지 않는다. 라이브 결제는 모든 항목이 채워져야 켜진다(lib/pay/config.ts).
 */
import { CONTACT_EMAIL } from '@/lib/seo'

export interface Business {
  /** 상호 */
  name: string
  /** 대표자 */
  owner: string | null
  /** 사업자등록번호 */
  registrationNo: string
  /** 통신판매업 신고번호 */
  mailOrderNo: string | null
  /** 사업장 주소 */
  address: string | null
  /** 고객 연락 전화(유선·070·휴대폰) */
  phone: string | null
  email: string
}

export const BUSINESS: Business = {
  name: '달비(Dalbi)',
  owner: null,
  registrationNo: '262-17-02701',
  mailOrderNo: null,
  address: null,
  phone: null,
  email: CONTACT_EMAIL,
}

/** 라이브 결제에 필요한 항목이 모두 채워졌는가. */
export function isBusinessComplete(b: Business = BUSINESS): boolean {
  return Boolean(b.owner && b.mailOrderNo && b.address && b.phone)
}
