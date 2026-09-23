# -*- coding: utf-8 -*-
"""
공유 미리보기(Open Graph) 이미지 54장을 만든다 — 27 탄생별 × 2 언어.
실행: npm run og:build

카드 그림을 왼쪽에 놓고 오른쪽에 이름·한 줄 설명을 얹는다.
1200×630 은 카카오톡·X·페이스북이 공통으로 쓰는 비율이다.
런타임에 만들지 않고 파일로 구워 둔다 — Workers 에서 이미지 합성은 비싸고 느리다.
"""
import io
import json
import os
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (239, 234, 224)      # --bg 종이색
INK = (33, 28, 20)
INK2 = (74, 66, 52)
GOLD = (154, 117, 38)

FONT_DIR = 'C:/Windows/Fonts'
TITLE_FONT = os.path.join(FONT_DIR, 'malgunbd.ttf')
BODY_FONT = os.path.join(FONT_DIR, 'malgun.ttf')


def load_content():
    """scripts/og-data.ts 를 tsx 로 실행해 필요한 필드만 JSON 으로 받는다."""
    raw = subprocess.run(
        ['npx', 'tsx', os.path.join('scripts', 'og-data.ts')],
        capture_output=True, check=True, shell=True,
    ).stdout
    return json.loads(raw.decode('utf-8'))


def wrap(draw, text, font, max_width):
    """공백 기준으로 줄을 나눈다. 한글은 공백이 드물어 글자 단위로도 자른다."""
    words = text.split(' ')
    lines, line = [], ''
    for word in words:
        probe = f'{line} {word}'.strip()
        if draw.textlength(probe, font=font) <= max_width:
            line = probe
            continue
        if line:
            lines.append(line)
        # 한 단어가 통째로 넘치면 글자 단위로 자른다
        while draw.textlength(word, font=font) > max_width:
            cut = len(word)
            while cut > 1 and draw.textlength(word[:cut], font=font) > max_width:
                cut -= 1
            lines.append(word[:cut])
            word = word[cut:]
        line = word
    if line:
        lines.append(line)
    return lines


def build(entry, card_path, out_path):
    canvas = Image.new('RGB', (W, H), BG)
    draw = ImageDraw.Draw(canvas)

    # 왼쪽 카드
    card = Image.open(card_path).convert('RGB')
    card_h = 540
    card_w = int(card.width * card_h / card.height)
    card = card.resize((card_w, card_h), Image.LANCZOS)
    card_x, card_y = 70, (H - card_h) // 2
    shadow = Image.new('RGB', (card_w + 12, card_h + 12), (214, 205, 190))
    canvas.paste(shadow, (card_x - 6, card_y - 4))
    canvas.paste(card, (card_x, card_y))

    # 오른쪽 글
    x = card_x + card_w + 60
    max_w = W - x - 60

    eyebrow = ImageFont.truetype(BODY_FONT, 24)
    title = ImageFont.truetype(TITLE_FONT, 62)
    body = ImageFont.truetype(BODY_FONT, 28)

    label = f"NAKSHATRA {entry['index'] + 1:02d} · {entry['keyword']}"
    draw.text((x, 128), label, font=eyebrow, fill=GOLD)

    y = 176
    for line in wrap(draw, entry['archetype'], title, max_w)[:2]:
        draw.text((x, y), line, font=title, fill=INK)
        y += 78

    y += 14
    draw.line((x, y, x + 64, y), fill=GOLD, width=3)
    y += 28

    for line in wrap(draw, entry['tagline'], body, max_w)[:4]:
        draw.text((x, y), line, font=body, fill=INK2)
        y += 42

    site = 'Vedic Astrology' if entry['locale'] == 'en' else '베딕 점성술'
    draw.text((x, H - 96), site, font=body, fill=GOLD)

    canvas.save(out_path, 'JPEG', quality=86, optimize=True)


def main():
    entries = load_content()
    made, skipped = 0, []
    for entry in entries:
        locale, key = entry['locale'], entry['key']
        card_dir = 'public/cards' if locale == 'ko' else 'public/cards-en'
        card_path = os.path.join(card_dir, key + '.webp')
        if not os.path.exists(card_path):
            skipped.append(f'{locale}/{key}')
            continue
        out_dir = os.path.join('public', 'og', locale)
        os.makedirs(out_dir, exist_ok=True)
        build(entry, card_path, os.path.join(out_dir, key + '.jpg'))
        made += 1
    print('og images:', made, 'skipped:', len(skipped))
    if skipped:
        print('  ', ', '.join(skipped))


if __name__ == '__main__':
    sys.exit(main())
