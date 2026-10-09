#!/usr/bin/env python3
"""Inter OTF (CFF) → TTF (quadratic) a nyomdai PDF-ekhez: így a Chromium CID TrueType-ként ágyazza be (nem Type 3)."""
import sys
from pathlib import Path
from fontTools.ttLib import TTFont, newTable
from fontTools.pens.cu2quPen import Cu2QuPen
from fontTools.pens.ttGlyphPen import TTGlyphPen

SRC = Path("/usr/share/fonts/opentype/inter")
OUT = Path(__file__).resolve().parent / ".cache"
OUT.mkdir(exist_ok=True)

for w in ("Regular", "Medium", "SemiBold", "Bold"):
    font = TTFont(SRC / f"Inter-{w}.otf")
    gs = font.getGlyphSet()
    glyf = newTable("glyf"); glyf.glyphOrder = font.getGlyphOrder(); glyf.glyphs = {}
    for name in font.getGlyphOrder():
        pen = TTGlyphPen(gs)
        gs[name].draw(Cu2QuPen(pen, 1.0, reverse_direction=True))
        glyf[name] = pen.glyph()
    font["glyf"] = glyf
    font["loca"] = newTable("loca")
    maxp = font["maxp"]; maxp.tableVersion = 0x00010000
    for a in ("maxZones", "maxTwilightPoints", "maxStorage", "maxFunctionDefs", "maxInstructionDefs", "maxStackElements", "maxSizeOfInstructions", "maxComponentElements"):
        setattr(maxp, a, 0)
    maxp.maxZones = 1
    font["head"].indexToLocFormat = 0
    font["head"].glyphDataFormat = 0
    font["post"].formatType = 3.0
    del font["CFF "]
    if "VORG" in font: del font["VORG"]
    font.sfntVersion = "\x00\x01\x00\x00"
    font.save(OUT / f"Inter-{w}.ttf")
    print("kész:", w)
