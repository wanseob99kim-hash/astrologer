import { DIGNITY, PLANET_NAMES, SIGN_NAMES, type GrahaKey } from '@/content/longform/dignity'
import type { Locale } from '@/lib/i18n'

const LABELS: Record<Locale, {
  title: string; exalted: string; debilitated: string; own: string; friends: string; neutral: string; enemies: string
  dasha: string; digBala: string; none: string; years: (n: number) => string; house: (n: number) => string; disputed: string
}> = {
  en: {
    title: 'Dignity at a glance', exalted: 'Exalted', debilitated: 'Debilitated', own: 'Own sign(s)', friends: 'Friends', neutral: 'Neutral',
    enemies: 'Enemies', dasha: 'Vimshottari dasha', digBala: 'Directional strength', none: '—',
    years: (n) => `${n} years`, house: (n) => `${n === 1 ? '1st' : `${n}th`} house`, disputed: ' (schools differ)',
  },
  ko: {
    title: '품위 한눈에 보기', exalted: '고양', debilitated: '약화', own: '자기 별자리', friends: '친구', neutral: '중립',
    enemies: '적', dasha: '빔쇼타리 다샤', digBala: '방향의 힘', none: '—',
    years: (n) => `${n}년`, house: (n) => `${n}하우스`, disputed: ' (학파마다 다름)',
  },
}

/** 행성의 고양·약화·자기 별자리·친구·적·다샤 기간을 표로. 값은 content/longform/dignity.ts. */
export function DignityTable({ graha, locale }: { graha: GrahaKey; locale: Locale }) {
  const d = DIGNITY[graha]
  const t = LABELS[locale]
  const signs = SIGN_NAMES[locale]
  const names = PLANET_NAMES[locale]
  const list = (keys: readonly GrahaKey[]) => (keys.length ? keys.map((k) => names[k]).join(', ') : t.none)
  const at = (sign: number, degree: number | null) => (degree === null ? signs[sign] + t.disputed : `${signs[sign]} ${degree}°`)

  return (
    <section style={{ marginTop: 30 }}>
      <h2 className="eyebrow" style={{ color: 'var(--lapis)' }}>{t.title}</h2>
      <table className="dignity">
        <tbody>
          <tr><th scope="row">{t.exalted}</th><td>{at(d.exalted.sign, d.exalted.degree)}</td></tr>
          <tr><th scope="row">{t.debilitated}</th><td>{at(d.debilitated.sign, d.debilitated.degree)}</td></tr>
          <tr><th scope="row">{t.own}</th><td>{d.own.length ? d.own.map((s) => signs[s]).join(', ') : t.none}</td></tr>
          <tr><th scope="row">{t.friends}</th><td>{list(d.friends)}</td></tr>
          <tr><th scope="row">{t.neutral}</th><td>{list(d.neutral)}</td></tr>
          <tr><th scope="row">{t.enemies}</th><td>{list(d.enemies)}</td></tr>
          <tr><th scope="row">{t.dasha}</th><td>{t.years(d.dashaYears)}</td></tr>
          <tr><th scope="row">{t.digBala}</th><td>{d.digBalaHouse ? t.house(d.digBalaHouse) : t.none}</td></tr>
        </tbody>
      </table>
    </section>
  )
}
