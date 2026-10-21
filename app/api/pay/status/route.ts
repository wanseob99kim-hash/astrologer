import { NextResponse } from 'next/server'
import { isTestKey, payConfig } from '@/lib/pay/config'

/**
 * 결제 설정 점검용. 키 값은 절대 내보내지 않고 "있는가 · 형식이 맞는가"만 알려준다.
 * 결제를 켜는 과정에서 Cloudflare 에 넣은 값이 읽히는지 확인하려고 둔다.
 */
export const dynamic = 'force-dynamic'

export function GET() {
  const client = process.env.TOSS_CLIENT_KEY?.trim() ?? ''
  const secret = process.env.TOSS_SECRET_KEY?.trim() ?? ''
  const signing = process.env.REPORT_SIGNING_SECRET?.trim() ?? ''
  return NextResponse.json(
    {
      enabled: payConfig() !== null,
      clientKey: { present: client.length > 0, test: client ? isTestKey(client) : null },
      secretKey: { present: secret.length > 0, test: secret ? isTestKey(secret) : null },
      signingSecret: { present: signing.length > 0, longEnough: signing.length >= 32 },
    },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
