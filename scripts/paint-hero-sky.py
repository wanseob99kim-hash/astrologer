"""
첫 화면 밤하늘 배경을 코드로 그린다 (Gemini 무료 이미지 쿼터가 0이라 대신 쓴다).

은하수 띠, 별, 지평선 노을, 아래에서 비친 구름, 바위 실루엣, 계곡의 도시 불빛.
별자리 선은 그리지 않는다 — NightSky.tsx 가 SVG 로 위에 겹친다.

  python scripts/paint-hero-sky.py        →  public/hero/night-sky.webp (1600×750)
"""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image

W, H = 1600, 750
OUT = Path(__file__).resolve().parent.parent / 'public' / 'hero' / 'night-sky.webp'
rng = np.random.default_rng(27)

yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
v = yy / H  # 0 위 → 1 아래
u = xx / W


def fbm(octaves: int = 6, base: int = 4, gain: float = 0.55) -> np.ndarray:
    """해상도를 키워 가며 더한 부드러운 잡음, 0~1."""
    total = np.zeros((H, W), np.float32)
    amp, norm = 1.0, 0.0
    for i in range(octaves):
        gw, gh = base * 2 ** i + 1, max(2, int(base * 2 ** i * H / W) + 1)
        grid = Image.fromarray(rng.random((gh, gw)).astype(np.float32), 'F')
        total += amp * np.asarray(grid.resize((W, H), Image.BICUBIC), np.float32)
        norm += amp
        amp *= gain
    out = total / norm
    return (out - out.min()) / (out.max() - out.min())


def blur(a: np.ndarray, sigma: float) -> np.ndarray:
    """가우시안 흐림(FFT). PIL 은 실수 이미지 흐림을 지원하지 않는다."""
    fy = np.fft.fftfreq(a.shape[0])[:, None]
    fx = np.fft.fftfreq(a.shape[1])[None, :]
    kernel = np.exp(-2 * (np.pi * sigma) ** 2 * (fx ** 2 + fy ** 2))
    return np.real(np.fft.ifft2(np.fft.fft2(a) * kernel)).astype(np.float32)


def lerp(a, b, t):
    return a + (b - a) * t[..., None]


def hexrgb(h: str) -> np.ndarray:
    return np.array([int(h[i:i + 2], 16) for i in (1, 3, 5)], np.float32) / 255


def smooth(edge0: float, edge1: float, x: np.ndarray) -> np.ndarray:
    t = np.clip((x - edge0) / (edge1 - edge0), 0, 1)
    return t * t * (3 - 2 * t)


# ── 하늘 바탕: 위는 검정에 가까운 남색, 지평선으로 갈수록 보라 → 주황 ──
sky = lerp(hexrgb('#04050E')[None, None], hexrgb('#0C1A4A')[None, None], smooth(0.0, 0.55, v))
sky = lerp(sky, hexrgb('#2B1B55')[None, None], smooth(0.5, 0.74, v))
glow = np.exp(-((v - 0.80 - 0.012 * (fbm(4, 3) - 0.5)) / 0.05) ** 2) * (0.45 + 0.55 * np.exp(-((u - 0.5) / 0.3) ** 2))
sky = lerp(sky, hexrgb('#F2994A')[None, None], glow * 0.85)
sky = lerp(sky, hexrgb('#FFE2A8')[None, None], np.exp(-((v - 0.805) / 0.012) ** 2) * np.exp(-((u - 0.5) / 0.22) ** 2) * 0.8)

# ── 은하수: 왼쪽 위에서 오른쪽 가운데로 비스듬한 띠 ──
d = (v - (0.12 + 0.42 * u)) / 0.16  # 띠 중심에서의 거리
band = np.exp(-d ** 2)
cloud = fbm(7, 3)
dust = fbm(6, 6)
mw = band * (0.35 + 0.9 * cloud) * (1 - 0.55 * smooth(0.55, 0.85, dust) * band)
mw *= 1 - smooth(0.55, 0.78, v)  # 지평선 근처로는 내려오지 않게
mw_color = lerp(hexrgb('#3B5BDB')[None, None], hexrgb('#9CC9FF')[None, None], smooth(0.3, 1.0, cloud * band))
mw_color = lerp(mw_color, hexrgb('#8B5CF6')[None, None], smooth(0.6, 0.9, fbm(5, 2)) * 0.45)
sky = sky + mw_color * mw[..., None] * 0.75

# ── 별: 작은 별은 많이, 은하수 안에서 더 촘촘히 ──
stars = np.zeros((H, W), np.float32)
n_small = 9000
sx = rng.integers(0, W, n_small)
sy = (rng.random(n_small) ** 1.15 * H * 0.78).astype(int)
keep = rng.random(n_small) < (0.35 + 0.65 * band[sy, sx])
stars[sy[keep], sx[keep]] = rng.random(keep.sum()) ** 3 * 0.9 + 0.1
stars = blur(stars, 0.6) * 2.2
big = np.zeros((H, W), np.float32)
for _ in range(40):
    x, y = rng.integers(20, W - 20), int(rng.random() ** 1.2 * H * 0.7)
    big[y, x] = 1.0 + rng.random() * 2
halo = blur(big, 5) * 18
core = blur(big, 1.2) * 3
star_light = (stars + halo + core)[..., None] * hexrgb('#F4F6FF')[None, None]
sky = sky + star_light * (1 - smooth(0.62, 0.8, v))[..., None]

# ── 구름: 지평선 위 낮게, 아래쪽 가장자리가 노을빛 ──
cl = fbm(6, 5)
cloud_mask = smooth(0.52, 0.72, cl) * np.exp(-((v - 0.70) / 0.075) ** 2)
cloud_mask = np.clip(cloud_mask * (0.6 + 0.6 * (np.abs(u - 0.5) * 2)), 0, 1)  # 가장자리일수록 두껍게
lit = smooth(0.66, 0.76, v)
cloud_col = lerp(hexrgb('#1C1638')[None, None], hexrgb('#E07A5F')[None, None], lit * 0.85)
sky = lerp(sky, cloud_col, cloud_mask * 0.9)

# ── 땅: 가운데는 낮은 계곡, 양옆은 높은 바위 ──
edge = np.abs(u - 0.5) * 2  # 0 가운데 → 1 가장자리
ridge = 0.865 + 0.012 * (fbm(5, 10) - 0.5) - 0.22 * smooth(0.62, 1.0, edge) ** 1.6
ridge = ridge - 0.05 * smooth(0.7, 1.0, edge) * (fbm(6, 14) - 0.3)
ground = smooth(ridge - 0.002, ridge + 0.002, v)
ground_col = lerp(hexrgb('#0B0E20')[None, None], hexrgb('#020308')[None, None], smooth(0.85, 1.0, v))
# 바위 윗면에 노을이 살짝 걸린다
rim = np.exp(-((v - ridge) / 0.006) ** 2) * smooth(0.6, 1.0, edge)
sky = lerp(sky, ground_col, ground)
sky = sky + rim[..., None] * hexrgb('#E08A5A')[None, None] * 0.35

# ── 계곡의 도시 불빛: 마을 덩어리 몇 개와 그 사이를 잇는 길 ──
city = np.zeros((H, W), np.float32)
def dot(x: float, y: float, b: float) -> None:
    ix, iy = int(x), int(y)
    if 0 <= ix < W and 0 <= iy < H and v[iy, ix] > ridge[iy, ix] + 0.012 and edge[iy, ix] < 0.7:
        city[iy, ix] = max(city[iy, ix], b)
towns = [(rng.normal(0.5, 0.16), 0.885 + rng.random() * 0.09, 6 + rng.random() * 34) for _ in range(22)]
for tx, ty, size in towns:
    count = int(size * 9)
    for _ in range(count):
        dot(tx * W + rng.normal(0, size), ty * H + rng.normal(0, size * 0.22), 0.25 + rng.random() * 0.75)
for (ax, ay, _), (bx, by, _) in zip(towns, towns[1:]):
    for t in np.linspace(0, 1, 60):
        if rng.random() < 0.55:
            dot((ax + (bx - ax) * t) * W + rng.normal(0, 1.5), (ay + (by - ay) * t) * H + rng.normal(0, 0.8), 0.2 + rng.random() * 0.4)
city_glow = blur(city, 4) * 5
city_core = blur(city, 0.6) * 1.3
sky = sky + (city_glow[..., None] * hexrgb('#FF9F43')[None, None] + city_core[..., None] * hexrgb('#FFE8B0')[None, None])

# ── 마감: 가장자리 어둡게, 감마 ──
vignette = 1 - 0.35 * ((u - 0.5) ** 2 * 2.2 + (v - 0.45) ** 2 * 1.4)
img = np.clip(sky * vignette[..., None], 0, 1) ** 0.95
OUT.parent.mkdir(parents=True, exist_ok=True)
Image.fromarray((img * 255).astype(np.uint8), 'RGB').save(OUT, 'WEBP', quality=86, method=6)
print(f'저장: {OUT}  {OUT.stat().st_size // 1024} KB')
