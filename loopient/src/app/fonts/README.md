# Inter (magyar subset)

`InterVariable.ttf` (Inter 4.1, SIL Open Font License – lásd `Inter-LICENSE.txt`) alapján, csak a
`wght` tengellyel (opsz eltávolítva), a magyar szövegekhez szükséges karakterekre szűkítve (~48 KB,
egyetlen fájl a korábbi 2 × Google Fonts subset ~132 KB helyett).

Újragenerálás (`pip install fonttools brotli`):

```bash
fonttools varLib.instancer InterVariable.ttf opsz=drop -o inter-wght.ttf
pyftsubset inter-wght.ttf \
  --unicodes="U+0020-007E,U+00A0-00FF,U+0150-0151,U+0170-0171,U+2009,U+2013-2014,U+2018-201E,U+2022,U+2026,U+202F,U+20AC,U+2122,U+2190-2193,U+2212,U+2248" \
  --layout-features="kern,liga,calt,ccmp,locl,mark,mkmk,tnum,pnum,lnum,case,cv11,ss01,frac,sups" \
  --flavor=woff2 --output-file=InterHU-Variable.woff2
```

Ha új, ebben nem szereplő karaktert használsz (pl. ✓), bővítsd a `--unicodes` listát.
