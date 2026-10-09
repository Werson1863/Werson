#!/usr/bin/env python3
"""Loopient – vektoros arculati elemek generálása.

Kimenet:
  brand/logo/*.svg          logó-lockupok (jel, vízszintes, egymás alatti, wordmark) minden színváltozatban
  brand/favicon/*.svg       favicon.svg (sötét módot is kezel), safari-pinned-tab.svg
  brand/icons/*.svg         egységes 24 px-es vonalikon-készlet
  brand/pattern/*.svg       L-jelből épített háttérmotívum
  site/lib/brand.generated.ts  ugyanezek path-adatai a weboldalnak (nincs kézi duplikálás)

A jel geometriája kötött (100×100 doboz), nem módosítjuk. A wordmark az Inter Bold
körvonalaiból készül, az E betű három vízszintes vonal.
Futtatás: python3 tools/build_brand.py  (fonttools szükséges: pip install fonttools)
"""
from __future__ import annotations

import json
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "brand"
SITE_LIB = ROOT / "site" / "lib"
FONT_DIR = Path("/usr/share/fonts/opentype/inter")

# ---------------------------------------------------------------- színek
ORANGE = "#F97316"
ORANGE_DEEP = "#C2410C"
ORANGE_LIGHT = "#FDBA74"
GRAPHITE = "#0F1115"
DARK_GRAY = "#1F2330"
LIGHT_GRAY = "#F5F5F7"
BG = "#F9F9F8"
WHITE = "#FFFFFF"

# ---------------------------------------------------------------- kötött jel
BLADE1 = "M43 16 C30 18 23.6 28 23.6 37 L23.6 62 C23.6 74 33 82 52 82 L50 82 C45 79 43 72 43 64 Z"
BLADE2 = "M43 64.6 L81.3 64.6 C80 76 72 82 62 82 L50 82 C45 79 43 72 43 64.6 Z"
MARK_BOX = (23.6, 16.0, 81.3, 82.0)  # a festett terület határai a 100×100 dobozban
MARK_W = MARK_BOX[2] - MARK_BOX[0]
MARK_H = MARK_BOX[3] - MARK_BOX[1]

# színváltozatok: (blade1, blade2, szöveg, tagline)
VARIANTS = {
    "light": (ORANGE, ORANGE_DEEP, GRAPHITE, "#4B5160"),   # világos háttérre
    "dark": (ORANGE, ORANGE_LIGHT, WHITE, "#A9AEBB"),      # sötét háttérre
    "mono-black": (GRAPHITE, GRAPHITE, GRAPHITE, GRAPHITE),
    "mono-white": (WHITE, WHITE, WHITE, WHITE),
    "mono-orange": (ORANGE_DEEP, ORANGE_DEEP, ORANGE_DEEP, ORANGE_DEEP),
}


# ---------------------------------------------------------------- wordmark
class Wordmark:
    """LOOPIENT + BUSINESS AUTOMATION körvonalakból, cap height = 100 egység."""

    CAP = 100.0

    def __init__(self) -> None:
        self.bold = TTFont(FONT_DIR / "Inter-Bold.otf")
        self.medium = TTFont(FONT_DIR / "Inter-SemiBold.otf")
        self.word_d, self.word_w = self._build_word()
        self.tag_cap = 25.0
        self.gap = 40.0  # LOOPIENT alapvonala és a tagline teteje között
        self.tag_d = self._build_tagline()
        self.height = self.CAP + self.gap + self.tag_cap

    def _glyph_d(self, font: TTFont, ch: str, x: float, baseline: float, scale: float) -> tuple[str, float, tuple]:
        gs = font.getGlyphSet()
        name = font.getBestCmap()[ord(ch)]
        pen = SVGPathPen(gs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
        tpen = TransformPen(pen, (scale, 0, 0, -scale, x, baseline))
        gs[name].draw(tpen)
        bp = BoundsPen(gs)
        gs[name].draw(bp)
        return pen.getCommands(), gs[name].width * scale, bp.bounds

    def _build_word(self) -> tuple[str, float]:
        font = self.bold
        scale = self.CAP / font["OS/2"].sCapHeight
        gs = font.getGlyphSet()
        cmap = font.getBestCmap()
        tracking = 0.035 * 100 / 0.727  # ~0.035em (em ≈ 137.5 egység cap=100 mellett)
        # optikai alávágás a nyitott formák mellett
        kern = {("L", "O"): -9.0, ("P", "I"): -2.0, ("N", "T"): -3.0}
        stem_bounds = BoundsPen(gs)
        gs[cmap[ord("I")]].draw(stem_bounds)
        stem = (stem_bounds.bounds[2] - stem_bounds.bounds[0]) * scale
        bar = stem * 0.86  # vízszintes vonalvastagság (Inter: a vízszintesek vékonyabbak)

        parts: list[str] = []
        x = 0.0
        first_left = None
        text = "LOOPIENT"
        for i, ch in enumerate(text):
            if i:
                x += tracking + kern.get((text[i - 1], ch), 0.0)
            if ch == "E":
                # az E: három azonos hosszú vízszintes vonal, a valódi E szélességével
                eb = BoundsPen(gs)
                gs[cmap[ord("E")]].draw(eb)
                xmin, _, xmax, _ = (v * scale for v in eb.bounds)
                left = x + xmin
                w = xmax - xmin
                for top in (0.0, (self.CAP - bar) / 2, self.CAP - bar):
                    parts.append(f"M{left:.2f} {top:.2f}h{w:.2f}v{bar:.2f}h{-w:.2f}Z")
                x += gs[cmap[ord("E")]].width * scale
                continue
            d, adv, b = self._glyph_d(font, ch, x, self.CAP, scale)
            if first_left is None:
                first_left = b[0] * scale
            parts.append(d)
            x += adv
        # jobb oldali oldalcsapágy levágása: T jobb széle
        tb = BoundsPen(gs)
        gs[cmap[ord("T")]].draw(tb)
        right = x - gs[cmap[ord("T")]].width * scale + tb.bounds[2] * scale
        self.word_left = first_left or 0.0
        return "".join(parts), right

    def _build_tagline(self) -> str:
        font = self.medium
        text = "BUSINESS AUTOMATION"
        scale = self.tag_cap / font["OS/2"].sCapHeight
        gs = font.getGlyphSet()
        cmap = font.getBestCmap()
        # természetes szélesség, majd a betűköz úgy, hogy pontosan a LOOPIENT szélességét fedje
        advs = [gs[cmap[ord(c)]].width * scale for c in text]
        lb = BoundsPen(gs); gs[cmap[ord(text[0])]].draw(lb)
        rb = BoundsPen(gs); gs[cmap[ord(text[-1])]].draw(rb)
        lsb = lb.bounds[0] * scale
        ink_natural = sum(advs[:-1]) + rb.bounds[2] * scale - lsb
        target = self.word_w - self.word_left
        tracking = (target - ink_natural) / (len(text) - 1)
        self.tag_tracking_em = tracking / (font["head"].unitsPerEm * scale)
        baseline = self.CAP + self.gap + self.tag_cap
        x = self.word_left - lsb
        parts = []
        for i, ch in enumerate(text):
            if ch != " ":
                d, _, _ = self._glyph_d(font, ch, x, baseline, scale)
                parts.append(d)
            x += advs[i] + tracking
        return "".join(parts)


# ---------------------------------------------------------------- SVG segédek
def svg(w: float, h: float, body: str, title: str = "Loopient", vb: str | None = None, pad: float = 0) -> str:
    """pad: körben hozzáadott biztonsági sáv (viewBox-egységben), hogy a renderelők ne vágják le a széleket."""
    if pad:
        vb = f"{-pad:g} {-pad:g} {w + 2 * pad:g} {h + 2 * pad:g}"
        w, h = round(w + 2 * pad, 2), round(h + 2 * pad, 2)
    vb = vb or f"0 0 {w:g} {h:g}"
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{w:g}" height="{h:g}" role="img" aria-label="{title}">'
        f"<title>{title}</title>{body}</svg>\n"
    )


def mark_group(b1: str, b2: str, x: float, y: float, h: float) -> str:
    """A jel elhelyezése: (x, y) a festett terület bal-felső sarka, h a festett magasság."""
    s = h / MARK_H
    tx = x - MARK_BOX[0] * s
    ty = y - MARK_BOX[1] * s
    return (
        f'<g transform="translate({tx:.3f} {ty:.3f}) scale({s:.5f})">'
        f'<path d="{BLADE1}" fill="{b1}"/><path d="{BLADE2}" fill="{b2}"/></g>'
    )


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


# ---------------------------------------------------------------- logók
def build_logos(wm: Wordmark) -> dict:
    out = BRAND / "logo"
    meta = {}
    pad = 0.0  # a fájlok szorosan vágottak; a védőteret a brand guide írja elő
    for name, (b1, b2, txt, tag) in VARIANTS.items():
        # 1) csak jel (négyzetes vászon, középre)
        size = 100
        body = mark_group(b1, b2, (size - MARK_W) / 2, (size - MARK_H) / 2, MARK_H)
        write(out / f"loopient-mark-{name}.svg", svg(size, size, body, "Loopient jel"))

        # 2) vízszintes: jel + LOOPIENT / BUSINESS AUTOMATION
        mh = wm.height * 1.06
        mw = MARK_W * mh / MARK_H
        gap = 46.0
        tx = mw + gap - wm.word_left
        ty = (mh - wm.height) / 2
        w = tx + wm.word_w
        body = (
            mark_group(b1, b2, 0, 0, mh)
            + f'<g transform="translate({tx:.2f} {ty:.2f})"><path d="{wm.word_d}" fill="{txt}"/>'
            f'<path d="{wm.tag_d}" fill="{tag}"/></g>'
        )
        write(out / f"loopient-horizontal-{name}.svg", svg(round(w, 2), round(mh, 2), body, pad=3))
        meta["horizontal"] = {"width": round(w, 2), "height": round(mh, 2), "markHeight": round(mh, 3),
                              "textX": round(tx, 3), "textY": round(ty, 3)}

        # 3) egymás alatti: jel felül, szöveg alatta középre
        mh2 = 300.0
        mw2 = MARK_W * mh2 / MARK_H
        tw = wm.word_w - wm.word_left
        w2 = max(tw, mw2)
        gap2 = 64.0
        body = (
            mark_group(b1, b2, (w2 - mw2) / 2, 0, mh2)
            + f'<g transform="translate({(w2 - tw) / 2 - wm.word_left:.2f} {mh2 + gap2:.2f})">'
            f'<path d="{wm.word_d}" fill="{txt}"/><path d="{wm.tag_d}" fill="{tag}"/></g>'
        )
        h2 = mh2 + gap2 + wm.height
        write(out / f"loopient-stacked-{name}.svg", svg(round(w2, 2), round(h2, 2), body, pad=3))
        meta["stacked"] = {"width": round(w2, 2), "height": round(h2, 2)}

        # 4) csak wordmark (tagline-nal és nélküle)
        body = f'<g transform="translate({-wm.word_left:.2f} 0)"><path d="{wm.word_d}" fill="{txt}"/><path d="{wm.tag_d}" fill="{tag}"/></g>'
        write(out / f"loopient-wordmark-{name}.svg", svg(round(tw, 2), round(wm.height, 2), body, pad=3))
        body = f'<g transform="translate({-wm.word_left:.2f} 0)"><path d="{wm.word_d}" fill="{txt}"/></g>'
        write(out / f"loopient-wordmark-only-{name}.svg", svg(round(tw, 2), wm.CAP, body, pad=3))

    # 5) app-ikonok (1024 vászon, a jel optikailag középre)
    def app_icon(bg: str, b1: str, b2: str, radius: float) -> str:
        s = 1024
        mh = s * 0.56
        mw = MARK_W * mh / MARK_H
        x = (s - mw) / 2 + s * 0.012  # az L nehezebb bal oldala miatt kicsit jobbra
        y = (s - mh) / 2
        rect = f'<rect width="{s}" height="{s}" rx="{radius}" fill="{bg}"/>'
        return svg(s, s, rect + mark_group(b1, b2, x, y, mh), "Loopient app-ikon")

    write(out / "loopient-app-icon-dark.svg", app_icon(GRAPHITE, ORANGE, ORANGE_LIGHT, 224))
    write(out / "loopient-app-icon-light.svg", app_icon(BG, ORANGE, ORANGE_DEEP, 224))
    write(out / "loopient-app-icon-dark-square.svg", app_icon(GRAPHITE, ORANGE, ORANGE_LIGHT, 0))
    write(out / "loopient-app-icon-light-square.svg", app_icon(BG, ORANGE, ORANGE_DEEP, 0))
    write(out / "loopient-app-icon-orange-square.svg", app_icon(ORANGE, WHITE, GRAPHITE, 0))
    return meta


def build_favicons() -> None:
    out = BRAND / "favicon"
    # favicon.svg: szoros vágás, sötét böngészőtémában a sötét változat színei
    pad = 4
    vb = f"{MARK_BOX[0] - pad - 4.35:.2f} {MARK_BOX[1] - pad:.2f} {MARK_H + 2 * pad:.2f} {MARK_H + 2 * pad:.2f}"
    body = (
        "<style>.a{fill:%s}.b{fill:%s}@media (prefers-color-scheme:dark){.b{fill:%s}}</style>"
        % (ORANGE, ORANGE_DEEP, ORANGE_LIGHT)
        + f'<path class="a" d="{BLADE1}"/><path class="b" d="{BLADE2}"/>'
    )
    write(out / "favicon.svg", svg(32, 32, body, "Loopient", vb))
    # safari pinned tab: egyszínű, egyetlen fekete forma
    write(
        out / "safari-pinned-tab.svg",
        svg(16, 16, f'<path d="{BLADE1} {BLADE2}" fill="#000"/>', "Loopient", "0 0 100 100"),
    )
    # monokróm favicon változatok
    for name, col in (("black", GRAPHITE), ("white", WHITE), ("orange", ORANGE)):
        write(out / f"favicon-mono-{name}.svg", svg(32, 32, f'<path d="{BLADE1}" fill="{col}"/><path d="{BLADE2}" fill="{col}"/>', "Loopient", vb))


# ---------------------------------------------------------------- ikonkészlet
# 24 px rács, 2 px biztonsági margó, 1.5 px vonal, kerek végek – currentColor
ICONS: dict[str, dict] = {
    "report": {"label": "Riport", "els": [
        ("rect", {"x": 3, "y": 3, "width": 18, "height": 18, "rx": 3}),
        ("path", {"d": "M8 16.5v-3M12 16.5v-8M16 16.5v-5.5"})]},
    "document": {"label": "Dokumentum", "els": [
        ("path", {"d": "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"}),
        ("path", {"d": "M14 3v5h5M9 13h6M9 17h4"})]},
    "systems": {"label": "Rendszerek", "els": [
        ("rect", {"x": 3, "y": 4, "width": 18, "height": 6.5, "rx": 2}),
        ("rect", {"x": 3, "y": 13.5, "width": 18, "height": 6.5, "rx": 2}),
        ("path", {"d": "M7 7.25h.01M7 16.75h.01M11 7.25h6M11 16.75h6"})]},
    "approval": {"label": "Jóváhagyás", "els": [
        ("circle", {"cx": 12, "cy": 12, "r": 9}),
        ("path", {"d": "M8.25 12.25l2.5 2.5 5-5"})]},
    "time": {"label": "Idő", "els": [
        ("circle", {"cx": 12, "cy": 12, "r": 9}),
        ("path", {"d": "M12 7.5V12l3 2"})]},
    "security": {"label": "Biztonság", "els": [
        ("path", {"d": "M12 3l7 2.8v5.4c0 4.4-2.9 8.2-7 9.8-4.1-1.6-7-5.4-7-9.8V5.8z"}),
        ("path", {"d": "M9.25 12l2 2 3.5-3.75"})]},
    "integration": {"label": "Integráció", "els": [
        ("path", {"d": "M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66l-1 1"}),
        ("path", {"d": "M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1-1"})]},
    # kiegészítő felületi ikonok ugyanabban a stílusban
    "sync": {"label": "Szinkron", "els": [
        ("path", {"d": "M19.5 10.5A7.5 7.5 0 0 0 6 6.6L4.5 8M4.5 4v4h4"}),
        ("path", {"d": "M4.5 13.5A7.5 7.5 0 0 0 18 17.4l1.5-1.4M19.5 20v-4h-4"})]},
    "inbox": {"label": "Beérkező", "els": [
        ("path", {"d": "M3 13l2.6-7.2A2 2 0 0 1 7.5 4.5h9a2 2 0 0 1 1.9 1.3L21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}),
        ("path", {"d": "M3 13h5l1.5 2.5h5L16 13h5"})]},
    "users": {"label": "Csapat", "els": [
        ("circle", {"cx": 9, "cy": 8, "r": 3.5}),
        ("path", {"d": "M3 20a6 6 0 0 1 12 0M15.5 4.7a3.5 3.5 0 0 1 0 6.6M17.5 14.4A6 6 0 0 1 21 20"})]},
    "chat": {"label": "Üzenet", "els": [
        ("path", {"d": "M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z"})]},
    "mail": {"label": "E-mail", "els": [
        ("rect", {"x": 3, "y": 5, "width": 18, "height": 14, "rx": 2}),
        ("path", {"d": "M3.5 7l8.5 6 8.5-6"})]},
    "phone": {"label": "Telefon", "els": [
        ("path", {"d": "M5 4h3l1.5 4-2 1.5a11 11 0 0 0 7 7l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"})]},
    "map-pin": {"label": "Helyszín", "els": [
        ("path", {"d": "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"}),
        ("circle", {"cx": 12, "cy": 9.5, "r": 2.5})]},
    "arrow-right": {"label": "Tovább", "els": [("path", {"d": "M5 12h14M13 6l6 6-6 6"})]},
    "arrow-up-right": {"label": "Külső hivatkozás", "els": [("path", {"d": "M7 17L17 7M8 7h9v9"})]},
    "check": {"label": "Kész", "els": [("path", {"d": "M5 12.5l4.5 4.5L19 7.5"})]},
    "chevron-down": {"label": "Lenyitás", "els": [("path", {"d": "M6 9l6 6 6-6"})]},
    # a menü ikon szándékosan a logó E-jét idézi: három azonos vonal
    "menu": {"label": "Menü", "els": [("path", {"d": "M4 6.5h16M4 12h16M4 17.5h16"})]},
    "close": {"label": "Bezárás", "els": [("path", {"d": "M6 6l12 12M18 6L6 18"})]},
}


def attrs(a: dict) -> str:
    return " ".join(f'{k}="{v}"' for k, v in a.items())


def build_icons() -> None:
    out = BRAND / "icons"
    sprite = []
    for name, icon in ICONS.items():
        inner = "".join(f"<{t} {attrs(a)}/>" for t, a in icon["els"])
        common = 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'
        write(out / f"{name}.svg",
              f'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {common} aria-hidden="true">{inner}</svg>\n')
        sprite.append(f'<symbol id="i-{name}" viewBox="0 0 24 24">{inner}</symbol>')
    write(out / "sprite.svg",
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" '
          'stroke-linecap="round" stroke-linejoin="round">' + "".join(sprite) + "</svg>\n")


# ---------------------------------------------------------------- mintázat
def pattern_tile(b1: str, b2: str, opacity: float, size: int = 160) -> str:
    """Négy L-jel 90°-onként elforgatva egy közös középpont körül → zárt „hurok”."""
    s = size
    h = s * 0.26
    sc = h / MARK_H
    g = s * 0.035  # rés a négy L között, hogy a „hurok” lélegezzen
    # 0°-nál a jel a bal-alsó negyedben ül, sarka kifelé néz; elforgatva zárt keretet adnak
    x0 = s / 2 - g - MARK_W * sc - MARK_BOX[0] * sc
    y0 = s / 2 + g - MARK_BOX[1] * sc
    groups = []
    for rot in (0, 90, 180, 270):
        groups.append(
            f'<g transform="rotate({rot} {s/2} {s/2}) translate({x0:.2f} {y0:.2f}) scale({sc:.4f})">'
            f'<path d="{BLADE1}" fill="{b1}"/><path d="{BLADE2}" fill="{b2}"/></g>'
        )
    return f'<g opacity="{opacity}">' + "".join(groups) + "</g>"


def build_patterns() -> dict:
    out = BRAND / "pattern"
    variants = {
        "light": (ORANGE, ORANGE_DEEP, 0.10, None),
        "dark": (ORANGE, ORANGE_LIGHT, 0.12, None),
        "orange": (ORANGE_DEEP, ORANGE_LIGHT, 0.32, None),
    }
    css = {}
    for name, (b1, b2, op, _) in variants.items():
        tile = pattern_tile(b1, b2, op)
        content = f'<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">{tile}</svg>\n'
        write(out / f"pattern-tile-{name}.svg", content)
        css[name] = content
    # nagy, látványos változat (1600×900) a hero/CTA mögé és prezentációkhoz
    for name, bg in (("light", BG), ("dark", GRAPHITE), ("orange", ORANGE)):
        b1, b2, op, _ = variants[name]
        tiles = "".join(
            f'<g transform="translate({x * 160} {y * 160})">{pattern_tile(b1, b2, op)}</g>'
            for x in range(10) for y in range(6)
        )
        write(out / f"pattern-{name}-1600x900.svg",
              f'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">'
              f'<rect width="1600" height="900" fill="{bg}"/>{tiles}</svg>\n')
    return css


# ---------------------------------------------------------------- weboldal-adat
def build_site_module(wm: Wordmark, meta: dict) -> None:
    icons = {
        name: [[t, {k: str(v) for k, v in a.items()}] for t, a in icon["els"]]
        for name, icon in ICONS.items()
    }
    data = {
        "blade1": BLADE1,
        "blade2": BLADE2,
        "markBox": list(MARK_BOX),
        "wordmark": {"d": wm.word_d, "tagline": wm.tag_d, "left": round(wm.word_left, 2),
                     "width": round(wm.word_w, 2), "height": round(wm.height, 2), "cap": wm.CAP},
        "horizontal": meta["horizontal"],
        "icons": icons,
    }
    SITE_LIB.mkdir(parents=True, exist_ok=True)
    (SITE_LIB / "brand.generated.ts").write_text(
        "// GENERÁLT FÁJL – ne szerkeszd kézzel. Forrás: tools/build_brand.py\n"
        "/* eslint-disable */\n"
        f"export const brand = {json.dumps(data, ensure_ascii=False)} as const;\n"
        "export type IconName = keyof typeof brand.icons;\n",
        encoding="utf-8",
    )


def main() -> None:
    wm = Wordmark()
    meta = build_logos(wm)
    build_favicons()
    build_icons()
    build_patterns()
    build_site_module(wm, meta)
    print(f"Wordmark szélesség: {wm.word_w:.1f}, tagline betűköz: {wm.tag_tracking_em:.3f} em")
    print("Lockup méretek:", meta)


if __name__ == "__main__":
    main()
