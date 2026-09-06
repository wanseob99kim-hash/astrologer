/**
 * 화면 캡처. 실행 중인 서버를 돌면서 주요 화면을 찍는다.
 * 실행: npm run shoot  (먼저 next start 로 서버가 떠 있어야 한다)
 */

import { mkdirSync } from 'node:fs'
import { chromium, type Browser } from 'playwright'

const BASE = process.env.SHOOT_BASE ?? 'http://localhost:3113'
const OUT = 'review/shots'

const SHOTS = [
  { file: '01-landing', path: '/', label: '랜딩' },
  { file: '02-birth', path: '/birth', label: 'L0 입력' },
  { file: '03-graha', path: '/graha/budha?d=1995-05-05&n=%ED%99%8D%EA%B8%B8%EB%8F%99', label: 'L0 결과' },
  { file: '04-refine', path: '/refine?d=1995-05-05&n=%ED%99%8D%EA%B8%B8%EB%8F%99', label: 'L1 입력' },
  { file: '05-star', path: '/star/ardra?d=1995-05-05&t=09:30&n=%ED%99%8D%EA%B8%B8%EB%8F%99', label: 'L1 결과 (시간 있음)' },
  { file: '06-star-provisional', path: '/star/ardra?d=1995-05-05', label: 'L1 결과 (시간 모름)' },
  { file: '07-tradition', path: '/tradition/nakshatra', label: '27수 사전' },
  { file: '08-compare-saju', path: '/compare/saju', label: '사주 비교' },
  { file: '09-navagraha', path: '/tradition/navagraha', label: '아홉 행성' },
  { file: '10-dasha', path: '/tradition/dasha', label: '다샤 해설' },
] as const

async function shoot(browser: Browser, theme: 'light' | 'dark') {
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
    colorScheme: theme,
    locale: 'ko-KR',
  })
  const page = await context.newPage()

  for (const target of SHOTS) {
    await page.goto(`${BASE}${target.path}`, { waitUntil: 'networkidle' })
    // 웹폰트가 실제로 적용된 뒤에 찍는다
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: `${OUT}/${target.file}-${theme}.png`, fullPage: true })
    console.log(`  ${theme.padEnd(5)} ${target.label} → ${target.file}-${theme}.png`)
  }
  await context.close()
}

const browser = await chromium.launch()
mkdirSync(OUT, { recursive: true })
console.log(`캡처 시작 — ${BASE}`)
await shoot(browser, 'dark')
await shoot(browser, 'light')
await browser.close()
console.log(`완료 — ${OUT}/`)
