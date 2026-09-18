# -*- coding: utf-8 -*-
"""
art-src/ 의 생성 시트에서 카드 한 장(테두리·보석·배너 포함)을 잘라 public/cards/<key>.webp 로 저장한다.
기본은 카드 전체 5:7(600×840). --arch 를 주면 아치 안 그림만 2:3 으로 자른다.

좌표는 900px 폭 프리뷰 기준 (cx, top, bottom, half_w). 원본 크기에 맞춰 비율로 환산한다.
각 그림은 2:3 으로 중앙 크롭 후 600×900. 카드 아치 clipPath 가 나머지를 정리한다.
"""
import glob
import os
import sys

from PIL import Image

SRC = 'art-src'
OUT = 'public/cards'
PREVIEW_W = 900

# 파일명 접미(6자) → 시트 번호. 파일명은 Gemini 가 붙인 임의 문자열이라 여기서 고정한다.
SHEETS = {
    'a2yycd': 'sheet_a',  # I~IV
    'e6ipot': 'sheet_b',  # V~VIII
    '7w5qbx': 'sheet_c',  # IX~XII
    '7703ih': 'sheet_d',  # XIII~XVI
    '4mhu4p': 'sheet_e',  # XVII (+XVIII~XX 다른 버전, 미사용)
    'mfpngp': 'sheet_f',  # XVIII~XX
    '8iuqdf': 'sheet_g',  # XXI~XXIV
    'ykcjey': 'sheet_h',  # XXV~XXVII
}

# 카드 전체(테두리·보석·배너 포함). 4장 시트는 폭 ~200, 3장 시트는 ~280.
FULL = {
    'ashwini':           ('sheet_a', 131, 30, 296, 102),
    'bharani':           ('sheet_a', 348, 30, 296, 102),
    'krittika':          ('sheet_a', 565, 30, 296, 102),
    'rohini':            ('sheet_a', 781, 30, 296, 102),
    'mrigashira':        ('sheet_b', 129, 30, 284, 102),
    'ardra':             ('sheet_b', 346, 30, 284, 102),
    'punarvasu':         ('sheet_b', 562, 30, 284, 102),
    'pushya':            ('sheet_b', 779, 30, 284, 102),
    'ashlesha':          ('sheet_c', 129, 28, 284, 102),
    'magha':             ('sheet_c', 347, 28, 284, 102),
    'purva-phalguni':    ('sheet_c', 563, 28, 284, 102),
    'uttara-phalguni':   ('sheet_c', 779, 28, 284, 102),
    'hasta':             ('sheet_d', 129, 30, 284, 102),
    'chitra':            ('sheet_d', 347, 30, 284, 102),
    'swati':             ('sheet_d', 563, 30, 284, 102),
    'vishakha':          ('sheet_d', 779, 30, 284, 102),
    'anuradha':          ('sheet_e', 129, 30, 290, 102),
    'jyeshtha':          ('sheet_f', 150, 40, 408, 140),
    'mula':              ('sheet_f', 450, 40, 408, 140),
    'purva-ashadha':     ('sheet_f', 750, 40, 408, 140),
    'uttara-ashadha':    ('sheet_g', 129, 30, 284, 102),
    'shravana':          ('sheet_g', 347, 30, 284, 102),
    'dhanishta':         ('sheet_g', 563, 30, 284, 102),
    'shatabhisha':       ('sheet_g', 779, 30, 284, 102),
    'purva-bhadrapada':  ('sheet_h', 150, 44, 412, 140),
    'uttara-bhadrapada': ('sheet_h', 450, 44, 412, 140),
    'revati':            ('sheet_h', 750, 44, 412, 140),
}

# 아치 안 그림만 (예전 방식, --arch 로 선택)
CARDS = {
    'ashwini':           ('sheet_a', 128, 62, 238, 86),
    'bharani':           ('sheet_a', 347, 62, 238, 86),
    'krittika':          ('sheet_a', 565, 62, 238, 86),
    'rohini':            ('sheet_a', 781, 62, 238, 86),
    'mrigashira':        ('sheet_b', 128, 62, 228, 86),
    'ardra':             ('sheet_b', 347, 62, 228, 86),
    'punarvasu':         ('sheet_b', 562, 62, 228, 86),
    'pushya':            ('sheet_b', 779, 62, 228, 86),
    'ashlesha':          ('sheet_c', 128, 60, 228, 86),
    'magha':             ('sheet_c', 347, 60, 228, 86),
    'purva-phalguni':    ('sheet_c', 562, 60, 228, 86),
    'uttara-phalguni':   ('sheet_c', 779, 60, 228, 86),
    'hasta':             ('sheet_d', 128, 62, 226, 86),
    'chitra':            ('sheet_d', 347, 62, 226, 86),
    'swati':             ('sheet_d', 562, 62, 226, 86),
    'vishakha':          ('sheet_d', 779, 62, 226, 86),
    'anuradha':          ('sheet_e', 128, 62, 230, 86),
    'jyeshtha':          ('sheet_f', 150, 82, 322, 118),
    'mula':              ('sheet_f', 450, 82, 322, 118),
    'purva-ashadha':     ('sheet_f', 750, 82, 322, 118),
    'uttara-ashadha':    ('sheet_g', 128, 62, 226, 86),
    'shravana':          ('sheet_g', 347, 62, 226, 86),
    'dhanishta':         ('sheet_g', 562, 62, 226, 86),
    'shatabhisha':       ('sheet_g', 779, 62, 226, 86),
    'purva-bhadrapada':  ('sheet_h', 150, 90, 332, 118),
    'uttara-bhadrapada': ('sheet_h', 450, 90, 332, 118),
    'revati':            ('sheet_h', 750, 90, 332, 118),
}


def load_sheets():
    sheets = {}
    for path in glob.glob(os.path.join(SRC, '*')):
        name = os.path.basename(path)
        for tag, sheet in SHEETS.items():
            if tag in name:
                sheets[sheet] = Image.open(path).convert('RGB')
    missing = set(SHEETS.values()) - set(sheets)
    if missing:
        raise SystemExit('시트 없음: ' + ', '.join(sorted(missing)))
    return sheets


def crop(im, cx, top, bottom, half_w, target=2 / 3, size=(600, 900)):
    scale = im.width / PREVIEW_W
    x0, x1 = int((cx - half_w) * scale), int((cx + half_w) * scale)
    y0, y1 = int(top * scale), int(bottom * scale)
    box = im.crop((x0, y0, x1, y1))
    # 목표 비율로 중앙 크롭
    w, h = box.size
    if w / h > target:
        nw = int(h * target)
        x = (w - nw) // 2
        box = box.crop((x, 0, x + nw, h))
    else:
        nh = int(w / target)
        y = (h - nh) // 2
        box = box.crop((0, y, w, y + nh))
    return box.resize(size, Image.LANCZOS)


def main():
    preview_only = '--preview' in sys.argv
    arch_only = '--arch' in sys.argv
    table = CARDS if arch_only else FULL
    target = (2 / 3) if arch_only else (5 / 7)
    size = (600, 900) if arch_only else (600, 840)
    sheets = load_sheets()
    os.makedirs(OUT, exist_ok=True)
    tiles = []
    for key, (sheet, cx, top, bottom, half_w) in table.items():
        img = crop(sheets[sheet], cx, top, bottom, half_w, target, size)
        if not preview_only:
            img.save(os.path.join(OUT, key + '.webp'), 'WEBP', quality=82, method=6)
        tiles.append((key, img))
    # 검토용 컨택트 시트
    cols = 9
    tw, th = (200, 300) if arch_only else (200, 280)
    rows = (len(tiles) + cols - 1) // cols
    contact = Image.new('RGB', (cols * tw, rows * th), (30, 30, 30))
    for i, (key, img) in enumerate(tiles):
        contact.paste(img.resize((tw, th)), ((i % cols) * tw, (i // cols) * th))
    out = sys.argv[-1] if sys.argv[-1].endswith('.png') else 'contact.png'
    contact.save(out)
    print('cards:', len(tiles), 'contact:', out)


if __name__ == '__main__':
    main()
