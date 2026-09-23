/**
 * 리포트 열람권.
 *
 * 회원·DB 없이 "이 두 사람의 리포트는 결제됐다"를 증명하려고 서명 토큰을 쓴다.
 *  - 토큰 = HMAC-SHA256(서버 비밀, 두 사람의 생년월일·시간)
 *  - 주소에 실린 생년월일을 바꾸면 서명이 맞지 않아 열리지 않는다
 *  - 두 사람 순서를 바꿔도 같은 토큰이 나온다 — 궁합은 순서와 무관하다
 *
 * 닉네임은 서명에 넣지 않는다. 화면에 부르는 이름일 뿐 결과를 바꾸지 않는다.
 * Web Crypto 만 쓰므로 Node 와 Cloudflare Workers 양쪽에서 같은 코드가 돈다.
 */

const TOKEN_VERSION = 'v1'
/** 주소가 너무 길어지지 않게 자른다. 128비트면 추측 불가능하다. */
const TOKEN_HEX_LENGTH = 32

export interface PairInput {
  aDate: string
  aTime?: string
  bDate: string
  bTime?: string
}

/** 서명 대상 문자열. 두 사람을 정렬해 순서를 없앤다. */
export function canonicalPair(pair: PairInput): string {
  const a = `${pair.aDate}T${pair.aTime ?? ''}`
  const b = `${pair.bDate}T${pair.bTime ?? ''}`
  const [first, second] = [a, b].sort()
  return `${TOKEN_VERSION}|${first}|${second}`
}

const encoder = new TextEncoder()

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(message)))
}

async function sha256Hex(message: string): Promise<string> {
  return toHex(await crypto.subtle.digest('SHA-256', encoder.encode(message)))
}

export async function signReport(secret: string, pair: PairInput): Promise<string> {
  return (await hmacHex(secret, canonicalPair(pair))).slice(0, TOKEN_HEX_LENGTH)
}

/** 길이가 같을 때 끝까지 비교한다 — 앞에서 틀린 곳을 찾자마자 멈추지 않는다. */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function verifyReport(secret: string, pair: PairInput, token: string | undefined): Promise<boolean> {
  if (!token || !/^[0-9a-f]+$/.test(token)) return false
  return constantTimeEqual(await signReport(secret, pair), token)
}

/**
 * 주문번호. 토스 규칙(6~64자, 영숫자·-_=)을 따른다.
 *
 * 앞 16자리에 두 사람의 해시를 넣어 둔다. 승인 단계에서 주소의 생년월일과
 * 주문번호의 해시가 맞는지 확인해, 한 번 결제한 paymentKey 로 다른 사람의
 * 리포트를 여는 것을 막는다.
 */
export async function createOrderId(pair: PairInput): Promise<string> {
  const pairHash = (await sha256Hex(canonicalPair(pair))).slice(0, 16)
  const nonce = toHex(crypto.getRandomValues(new Uint8Array(8)).buffer)
  return `m${pairHash}${nonce}`
}

export async function orderMatchesPair(orderId: string, pair: PairInput): Promise<boolean> {
  if (!/^m[0-9a-f]{32}$/.test(orderId)) return false
  const pairHash = (await sha256Hex(canonicalPair(pair))).slice(0, 16)
  return constantTimeEqual(orderId.slice(1, 17), pairHash)
}
