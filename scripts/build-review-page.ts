/**
 * 문안 검토 페이지 생성기.
 *
 * content/ 의 실제 데이터를 그대로 읽어 HTML 로 만든다.
 * 손으로 옮겨 적으면 검토판과 실제 데이터가 어긋나므로 반드시 생성해서 쓴다.
 *
 * 실행: npm run review
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { GRAHAS, KOOTAS, NAKSHATRAS } from '../content/index'
import type { Nakshatra } from '../content/types'

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../review/copy-review.html')

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** 13.3333 → 13°20′ */
function deg(value: number): string {
  const whole = Math.floor(value)
  const minutes = Math.round((value - whole) * 60)
  return `${whole}°${String(minutes).padStart(2, '0')}′`
}

const GANA_KO: Record<string, string> = { Deva: '데바', Manushya: '마누샤', Rakshasa: '락샤사' }
const NADI_KO: Record<string, string> = { Adi: '아디', Madhya: '마디아', Antya: '안티아' }
const LORD_KO: Record<string, string> = {
  Ketu: '케투', Venus: '금성', Sun: '태양', Moon: '달', Mars: '화성',
  Rahu: '라후', Jupiter: '목성', Saturn: '토성', Mercury: '수성',
}

const list = (items: readonly string[], cls: string) =>
  `<ul class="${cls}">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`

function entry(n: Nakshatra): string {
  const seq = String(n.index + 1).padStart(2, '0')
  return `
<article class="entry" id="${n.key}" data-gana="${n.gana}" data-lord="${n.lord}">
  <div class="rail">
    <span class="seq">${seq}</span>
    <span class="deg">${deg(n.range[0])}<br>${deg(n.range[1])}</span>
    <span class="rashi">${esc(n.rashi.join(' · '))}</span>
    <label class="mark" title="고칠 항목으로 표시">
      <input type="checkbox" data-mark="${n.key}"><span>표시</span>
    </label>
  </div>
  <div class="body">
    <div class="idblock">
      <h3 class="archetype">${esc(n.archetype)}</h3>
      <p class="tagline">${esc(n.tagline)}</p>
      <p class="names"><span class="ko">${esc(n.ko)}</span><span class="sep">·</span>${esc(n.sanskrit)}<span class="sep">·</span><span class="dev">${esc(n.devanagari)}</span></p>
      <ul class="chips">
        <li class="chip chip--lord">${esc(LORD_KO[n.lord] ?? n.lord)}</li>
        <li class="chip chip--gana" data-g="${n.gana}">${esc(GANA_KO[n.gana] ?? n.gana)}</li>
        <li class="chip">${esc(n.yoniKo)}</li>
        <li class="chip">${esc(NADI_KO[n.nadi] ?? n.nadi)}</li>
        <li class="chip chip--quiet">${esc(n.keyword)}</li>
      </ul>
      <p class="copy">${esc(n.copy)}</p>
      <p class="deity"><span class="lbl">신격</span>${esc(n.deityKo)}<span class="sep">·</span><span class="lbl">상징</span>${esc(n.symbolKo)}</p>
    </div>
    <div class="detail">
      <section class="pos">
        <h4>강점</h4>
        ${list(n.strengths, 'bul')}
      </section>
      <section class="neg">
        <h4>조심</h4>
        ${list(n.shadows, 'bul')}
      </section>
      <dl class="lines">
        <dt>연애</dt><dd class="sharp">${esc(n.love)}</dd>
        <dt>재물</dt><dd>${esc(n.wealth)}</dd>
        <dt>전통</dt><dd class="rit">${esc(n.ritual)}</dd>
      </dl>
      <p class="career">${n.career.map((c) => `<span>${esc(c)}</span>`).join('')}</p>
    </div>
  </div>
</article>`
}

const grahaCard = (g: (typeof GRAHAS)[number]) => `
<article class="graha">
  <div class="graha__head">
    <span class="num" style="--dot:${g.colorHex}">${g.moolank}</span>
    <div>
      <h3>${esc(g.ko)} <span class="lat">${esc(g.sanskrit)}</span></h3>
      <p class="gmeta">${esc(g.weekday ?? '요일 없음')}<span class="sep">·</span>${esc(g.gemstone)}<span class="sep">·</span>대운 ${g.dashaYears}년</p>
    </div>
  </div>
  <p class="copy">${esc(g.copy)}</p>
  <div class="graha__cols">
    <section class="pos"><h4>강점</h4>${list(g.strengths, 'bul')}</section>
    <section class="neg"><h4>그림자</h4>${list(g.shadows, 'bul')}</section>
  </div>
</article>`

const kootaRow = (k: (typeof KOOTAS)[number]) => `
<tr>
  <th scope="row">${esc(k.ko)}<span class="san">${esc(k.sanskrit)}</span></th>
  <td class="pts">${k.maxScore}</td>
  <td>${esc(k.low)}</td>
</tr>`

const lords = [...new Set(NAKSHATRAS.map((n) => n.lord))]

const html = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=IBM+Plex+Sans+KR:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<title>나크샤트라 문안 검토</title>
<style>
:root{
  --bg:#F3F3F7; --surface:#FFFFFF; --surface-2:#ECECF2;
  --ink:#1A1922; --ink-2:#4A4857; --muted:#77758A;
  --line:#DEDDE6; --line-soft:#EAE9F0;
  --lapis:#2E4A8C; --gold:#9C6F16;
  --deva:#2F6B57; --manushya:#3C5580; --rakshasa:#8A3B3B;
  --pos:#2F6B57; --neg:#8A3B3B;
  --rail:#E6E5EE;
}
@media (prefers-color-scheme:dark){
  :root:not([data-theme="light"]){
    --bg:#121118; --surface:#1A1922; --surface-2:#22212C;
    --ink:#EDECF2; --ink-2:#C3C1D0; --muted:#8F8DA1;
    --line:#2E2C3A; --line-soft:#26242F;
    --lapis:#93A9E4; --gold:#D9A94A;
    --deva:#6FBFA0; --manushya:#8FA8E0; --rakshasa:#D98787;
    --pos:#6FBFA0; --neg:#D98787;
    --rail:#232230;
  }
}
:root[data-theme="dark"]{
  --bg:#121118; --surface:#1A1922; --surface-2:#22212C;
  --ink:#EDECF2; --ink-2:#C3C1D0; --muted:#8F8DA1;
  --line:#2E2C3A; --line-soft:#26242F;
  --lapis:#93A9E4; --gold:#D9A94A;
  --deva:#6FBFA0; --manushya:#8FA8E0; --rakshasa:#D98787;
  --pos:#6FBFA0; --neg:#D98787;
  --rail:#232230;
}

*{box-sizing:border-box}
body{
  background:var(--bg); color:var(--ink);
  font-family:"IBM Plex Sans KR","Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif;
  font-weight:400; line-height:1.65; -webkit-font-smoothing:antialiased;
}
.wrap{max-width:1120px;margin:0 auto;padding:0 24px 96px}

/* ── 머리말 ── */
.masthead{padding:56px 0 28px;border-bottom:2px solid var(--ink)}
.eyebrow{
  font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.22em;
  text-transform:uppercase;color:var(--gold);margin:0 0 14px
}
h1{
  font-family:"Gowun Batang",Georgia,serif;font-weight:700;
  font-size:clamp(30px,4.4vw,50px);line-height:1.15;margin:0;text-wrap:balance
}
.lede{margin:16px 0 0;max-width:62ch;color:var(--ink-2);font-size:15.5px}
.lede strong{color:var(--ink);font-weight:600}

/* ── 조작부 ── */
.controls{
  position:sticky;top:0;z-index:20;background:var(--bg);
  border-bottom:1px solid var(--line);
  padding:12px 0;margin-bottom:8px;
  display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center
}
.ctl-label{
  font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted)
}
.filters{display:flex;flex-wrap:wrap;gap:6px}
button.f{
  font:inherit;font-size:12.5px;cursor:pointer;
  background:transparent;color:var(--ink-2);
  border:1px solid var(--line);border-radius:2px;padding:4px 10px;
  transition:background .12s,border-color .12s,color .12s
}
button.f:hover{border-color:var(--muted);color:var(--ink)}
button.f[aria-pressed="true"]{background:var(--ink);color:var(--bg);border-color:var(--ink)}
button.f:focus-visible{outline:2px solid var(--lapis);outline-offset:2px}
.toggle{display:flex;align-items:center;gap:7px;font-size:12.5px;color:var(--ink-2);cursor:pointer}
.toggle input{accent-color:var(--lapis);width:15px;height:15px}
.count{margin-left:auto;font-family:"IBM Plex Mono",monospace;font-size:12px;color:var(--muted);font-variant-numeric:tabular-nums}

/* ── 항목 ── */
.entry{
  display:grid;grid-template-columns:88px 1fr;gap:0;
  border-bottom:1px solid var(--line-soft);
  padding:26px 0;scroll-margin-top:76px
}
.entry.hide{display:none}
.entry.marked{background:linear-gradient(90deg,color-mix(in srgb,var(--gold) 12%,transparent),transparent 42%)}

.rail{
  display:flex;flex-direction:column;gap:8px;padding-right:20px;
  border-right:1px solid var(--rail)
}
.seq{
  font-family:"IBM Plex Mono",monospace;font-size:22px;font-weight:500;
  color:var(--gold);line-height:1;font-variant-numeric:tabular-nums
}
.deg{
  font-family:"IBM Plex Mono",monospace;font-size:11px;color:var(--muted);
  line-height:1.5;font-variant-numeric:tabular-nums
}
.rashi{font-size:11.5px;color:var(--muted)}
.mark{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--muted);cursor:pointer;margin-top:auto}
.mark input{accent-color:var(--gold);width:13px;height:13px}

.body{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:32px;padding-left:24px}

.archetype{
  font-family:"Gowun Batang",Georgia,serif;font-weight:700;
  font-size:26px;line-height:1.25;margin:0;letter-spacing:-.01em
}
.tagline{
  margin:6px 0 0;font-size:16.5px;line-height:1.5;color:var(--ink);
  font-weight:500;text-wrap:balance
}
.names{
  margin:10px 0 0;font-size:12px;color:var(--muted);
  font-family:"IBM Plex Mono",monospace
}
.names .ko{font-family:"IBM Plex Sans KR",sans-serif}
.names .dev{font-size:13px}
.sep{margin:0 7px;opacity:.45}

.chips{display:flex;flex-wrap:wrap;gap:5px;list-style:none;margin:12px 0 0;padding:0}
.chip{
  font-size:11px;padding:2px 8px;border-radius:999px;
  border:1px solid var(--line);color:var(--ink-2);background:var(--surface)
}
.chip--lord{border-color:color-mix(in srgb,var(--lapis) 45%,transparent);color:var(--lapis)}
.chip--gana[data-g="Deva"]{border-color:color-mix(in srgb,var(--deva) 45%,transparent);color:var(--deva)}
.chip--gana[data-g="Manushya"]{border-color:color-mix(in srgb,var(--manushya) 45%,transparent);color:var(--manushya)}
.chip--gana[data-g="Rakshasa"]{border-color:color-mix(in srgb,var(--rakshasa) 45%,transparent);color:var(--rakshasa)}
.chip--quiet{background:var(--surface-2);border-color:transparent;color:var(--muted)}

.copy{margin:14px 0 0;font-size:14.5px;line-height:1.75;color:var(--ink-2);max-width:52ch}
.deity{margin:12px 0 0;font-size:11.5px;color:var(--muted)}
.lbl{
  font-family:"IBM Plex Mono",monospace;font-size:9.5px;letter-spacing:.12em;
  text-transform:uppercase;margin-right:6px;opacity:.75
}

.detail{display:flex;flex-direction:column;gap:16px;min-width:0}
.detail h4{
  font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.18em;
  text-transform:uppercase;margin:0 0 6px;font-weight:500
}
.pos h4{color:var(--pos)}
.neg h4{color:var(--neg)}
.bul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:3px}
.bul li{font-size:13.5px;line-height:1.55;color:var(--ink-2);padding-left:13px;position:relative}
.bul li::before{content:"";position:absolute;left:0;top:.62em;width:5px;height:1px;background:currentColor;opacity:.5}
.neg .bul li{color:var(--ink)}

.lines{margin:0;display:grid;grid-template-columns:38px 1fr;gap:5px 12px;align-items:start}
.lines dt{
  font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.1em;
  color:var(--muted);padding-top:3px
}
.lines dd{margin:0;font-size:13.5px;line-height:1.6;color:var(--ink-2)}
.lines dd.sharp{color:var(--ink)}
.lines dd.rit{color:var(--muted);font-size:12.5px}

.career{margin:0;display:flex;flex-wrap:wrap;gap:5px}
.career span{
  font-size:11px;color:var(--muted);background:var(--surface-2);
  padding:2px 8px;border-radius:2px
}

/* 저격 모드 — 검토 대상 문장만 남긴다 */
body.sharp .copy,body.sharp .chips,body.sharp .names,body.sharp .deity,
body.sharp .pos,body.sharp .career,body.sharp .lines dd.rit,
body.sharp .lines dt:nth-of-type(2),body.sharp .lines dd:nth-of-type(2),
body.sharp .lines dt:nth-of-type(3){display:none}
body.sharp .archetype{font-size:21px}
body.sharp .entry{padding:16px 0}

/* ── 구획 제목 ── */
.sect{margin:64px 0 4px;padding-top:22px;border-top:2px solid var(--ink)}
.sect h2{
  font-family:"Gowun Batang",Georgia,serif;font-size:27px;font-weight:700;margin:0
}
.sect p{margin:8px 0 22px;color:var(--ink-2);font-size:14.5px;max-width:60ch}

/* ── 그라하 ── */
.grahas{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:1px;background:var(--line-soft)}
.graha{background:var(--bg);padding:22px 20px;display:flex;flex-direction:column;gap:12px}
.graha__head{display:flex;gap:13px;align-items:flex-start}
.num{
  font-family:"IBM Plex Mono",monospace;font-size:15px;font-weight:500;
  width:32px;height:32px;flex:none;display:grid;place-items:center;border-radius:50%;
  color:var(--bg);background:var(--dot);
  box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--ink) 18%,transparent)
}
.graha h3{font-family:"Gowun Batang",Georgia,serif;font-size:19px;font-weight:700;margin:0}
.graha h3 .lat{font-family:"IBM Plex Mono",monospace;font-size:11.5px;color:var(--muted);font-weight:400;margin-left:6px}
.gmeta{margin:2px 0 0;font-size:11.5px;color:var(--muted)}
.graha .copy{margin:0;font-size:13.5px;max-width:none}
.graha__cols{display:grid;grid-template-columns:1fr 1fr;gap:16px}

/* ── 쿠타 표 ── */
.tablewrap{overflow-x:auto;border:1px solid var(--line);border-radius:3px}
table{border-collapse:collapse;width:100%;min-width:560px;background:var(--surface)}
th,td{text-align:left;padding:11px 14px;border-bottom:1px solid var(--line-soft);font-size:13.5px;vertical-align:top}
tr:last-child th,tr:last-child td{border-bottom:0}
thead th{
  font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);font-weight:500;background:var(--surface-2)
}
tbody th{font-weight:600;white-space:nowrap;color:var(--ink)}
tbody th .san{display:block;font-family:"IBM Plex Mono",monospace;font-size:10px;color:var(--muted);font-weight:400}
.pts{font-family:"IBM Plex Mono",monospace;font-variant-numeric:tabular-nums;color:var(--gold);width:1%}

.foot{margin-top:56px;padding-top:20px;border-top:1px solid var(--line);font-size:12px;color:var(--muted)}
.foot code{font-family:"IBM Plex Mono",monospace;background:var(--surface-2);padding:1px 5px;border-radius:2px}

@media (max-width:860px){
  .body{grid-template-columns:1fr;gap:18px}
  .entry{grid-template-columns:60px 1fr}
  .body{padding-left:16px}
  .rail{padding-right:12px}
  .graha__cols{grid-template-columns:1fr}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
</style>

<div class="wrap">
  <header class="masthead">
    <p class="eyebrow">Copy Review · 2026-09-04</p>
    <h1>나크샤트라 문안 검토</h1>
    <p class="lede">
      구어체 + 저격형으로 재작성한 <strong>27 나크샤트라</strong>와 <strong>9 그라하</strong> 문안 전체입니다.
      분류값(지배성·가나·요니·나디)과 황경 구간은 계산 엔진 테이블과 대조를 마친 값이고,
      해석 문안은 전통 자료를 근거로 새로 쓴 것이라 이번 검토 대상입니다.
      고칠 항목은 왼쪽 <strong>표시</strong>에 체크해 두시면 됩니다.
    </p>
  </header>

  <div class="controls">
    <span class="ctl-label">가나</span>
    <div class="filters" data-group="gana">
      <button class="f" aria-pressed="true" data-v="all">전체</button>
      <button class="f" aria-pressed="false" data-v="Deva">데바</button>
      <button class="f" aria-pressed="false" data-v="Manushya">마누샤</button>
      <button class="f" aria-pressed="false" data-v="Rakshasa">락샤사</button>
    </div>
    <span class="ctl-label">지배성</span>
    <div class="filters" data-group="lord">
      <button class="f" aria-pressed="true" data-v="all">전체</button>
      ${lords.map((l) => `<button class="f" aria-pressed="false" data-v="${l}">${esc(LORD_KO[l] ?? l)}</button>`).join('')}
    </div>
    <label class="toggle"><input type="checkbox" id="sharp"> 저격 문장만</label>
    <span class="count" id="count">27 / 27</span>
  </div>

  <main id="entries">
    ${NAKSHATRAS.map(entry).join('')}
  </main>

  <section class="sect">
    <h2>나바그라하 9종</h2>
    <p>생년월일만으로 확정되는 L0 결과입니다. 물랑크(태어난 일의 자릿수 합)로 배정되며 천체 계산이 필요 없습니다.</p>
    <div class="grahas">
      ${GRAHAS.map(grahaCard).join('')}
    </div>
  </section>

  <section class="sect">
    <h2>궁합 쿠타 — 낮은 점수 문구</h2>
    <p>가장 조심스러운 영역입니다. 라이브러리가 주는 “Mismatch” 판정을 쓰지 않고, 전부 “이런 점을 조심하라”로 씁니다. 이 규칙은 <code>validate.ts</code>가 검사로 강제합니다.</p>
    <div class="tablewrap">
      <table>
        <thead><tr><th scope="col">쿠타</th><th scope="col">배점</th><th scope="col">점수가 낮을 때 문구</th></tr></thead>
        <tbody>${KOOTAS.map(kootaRow).join('')}</tbody>
      </table>
    </div>
  </section>

  <p class="foot">
    이 페이지는 <code>content/</code> 의 실제 데이터에서 생성됩니다 — <code>npm run review</code>.
    문안을 고치면 다시 생성해야 최신 상태가 됩니다.
  </p>
</div>

<script>
(function(){
  var entries = Array.prototype.slice.call(document.querySelectorAll('.entry'));
  var state = { gana:'all', lord:'all' };
  var count = document.getElementById('count');

  function apply(){
    var shown = 0;
    entries.forEach(function(el){
      var ok = (state.gana === 'all' || el.dataset.gana === state.gana)
            && (state.lord === 'all' || el.dataset.lord === state.lord);
      el.classList.toggle('hide', !ok);
      if (ok) shown++;
    });
    count.textContent = shown + ' / ' + entries.length;
  }

  document.querySelectorAll('.filters').forEach(function(group){
    group.addEventListener('click', function(e){
      var btn = e.target.closest('button.f');
      if (!btn) return;
      group.querySelectorAll('button.f').forEach(function(b){
        b.setAttribute('aria-pressed', String(b === btn));
      });
      state[group.dataset.group] = btn.dataset.v;
      apply();
    });
  });

  var sharp = document.getElementById('sharp');
  sharp.addEventListener('change', function(){
    document.body.classList.toggle('sharp', sharp.checked);
    try { localStorage.setItem('sharp', sharp.checked ? '1' : '0'); } catch (err) {}
  });

  document.querySelectorAll('input[data-mark]').forEach(function(box){
    var key = 'mark:' + box.dataset.mark;
    try { if (localStorage.getItem(key) === '1') box.checked = true; } catch (err) {}
    box.closest('.entry').classList.toggle('marked', box.checked);
    box.addEventListener('change', function(){
      box.closest('.entry').classList.toggle('marked', box.checked);
      try { localStorage.setItem(key, box.checked ? '1' : '0'); } catch (err) {}
    });
  });

  try {
    if (localStorage.getItem('sharp') === '1'){ sharp.checked = true; document.body.classList.add('sharp'); }
  } catch (err) {}

  apply();
})();
</script>
`

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, html, 'utf8')
console.log(`생성 완료: ${OUT}`)
console.log(`나크샤트라 ${NAKSHATRAS.length}종 · 그라하 ${GRAHAS.length}종 · 쿠타 ${KOOTAS.length}종`)
