/** OG 이미지 생성기(make-og.py)가 읽는 데이터. 언어별 27종의 이름·한 줄 설명. */
import { contentFor } from '../content/index'
import { LOCALES } from '../lib/i18n'
const out = LOCALES.flatMap((locale) =>
  contentFor(locale).nakshatras.map((n) => ({ locale, key: n.key, index: n.index, archetype: n.archetype, tagline: n.tagline, keyword: n.keyword })),
)
process.stdout.write(JSON.stringify(out))
