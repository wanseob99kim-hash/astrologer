import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 천체 계산 라이브러리는 CJS 라 번들링하지 않고 Node 런타임에서 그대로 require 한다.
  serverExternalPackages: ['@ishubhamx/panchangam-js', 'astronomy-engine'],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
