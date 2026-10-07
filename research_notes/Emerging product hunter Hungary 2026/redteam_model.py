"""Red-team model: custom photo brick mosaic, Hungary. All inputs ESTIMATES unless marked FACT.
Run: python3 -I redteam_model.py
"""
EUR_HUF = 360
# FACT (Alibaba extract): 1x1 round plates $13.50–15/kg, MOQ 2 kg (DELO TOYS). Piece weight ~0.06–0.10 g -> UNVERIFIED.
USD_EUR = 0.92
PLATE_KG_USD = 15.0
PLATE_G = 0.08                       # ESTIMATE
FREIGHT_EUR_PER_KG = 9.0             # small air shipments, ESTIMATE
def plates_eur(n):
    kg = n * PLATE_G / 1000
    return kg * PLATE_KG_USD * USD_EUR + kg * FREIGHT_EUR_PER_KG

KITS = {  # name: (plates incl. 10% spare, baseplate €, box+printed guide+bags €)
    "S 32x32": (1_130, 1.5, 1.4),
    "M 48x48": (2_535, 3.0, 1.8),
}
def cogs_huf(kit):
    n, base, box = KITS[kit]
    return (plates_eur(n) + base * 1.15 + box) * EUR_HUF   # +15% freight/duty on baseplates

SHIP = 1_300              # parcel locker, ESTIMATE (2026 merchant rate not found)
PAY_PCT, PAY_FIX = 0.022, 100
REMAKE = 0.03             # replacement pieces / defects (warranty still applies)
LABOR_MIN = 35            # per order, see breakdown in report
LABOR_HUF_H = 3_000       # owner's time value, ESTIMATE
LABOR = LABOR_MIN / 60 * LABOR_HUF_H
FIXED_EUR = 100           # Shopify, apps, accountant share (ESTIMATE)

def contrib(price, kit, vat):
    net = price / (1 + vat)
    c = cogs_huf(kit)
    pay = PAY_PCT * price + PAY_FIX
    return net - c - SHIP - pay - REMAKE * net - LABOR, c, net

def price_table():
    rows = ["| Price (gross) | Format | Landed COGS Ft | VAT-exempt: contribution Ft (€) = break-even CAC | 27% VAT: net Ft | 27% VAT: contribution Ft (€) | Gross margin exempt / VAT |",
            "|---|---|---:|---:|---:|---:|---|"]
    for p, kit in ((19_990, "S 32x32"), (24_990, "S 32x32"), (29_990, "M 48x48"), (34_990, "M 48x48")):
        ce, c, _ = contrib(p, kit, 0.0)
        cv, _, nv = contrib(p, kit, 0.27)
        rows.append(f"| {p:,} Ft | {kit} | {c:,.0f} | {ce:,.0f} (€{ce/EUR_HUF:.1f}) | {nv:,.0f} | {cv:,.0f} (€{cv/EUR_HUF:.1f}) | {(p-c)/p:.0%} / {(nv-c)/nv:.0%} |")
    return "\n".join(rows)

MIX = [(19_990, "S 32x32", 0.65), (29_990, "M 48x48", 0.35)]
def blended(vat):
    aov = sum(p * s for p, _, s in MIX)
    con = sum(contrib(p, k, vat)[0] * s for p, k, s in MIX)
    return aov, con

SCEN = {  # months: (ad €, CPM €, CTR, landing CVR)
    "Conservative": [(150, 5.0, 0.009, 0.005)],                     # smoke test fails -> stop
    "Realistic":    [(150, 5.5, 0.013, 0.009), (400, 6.5, 0.015, 0.012), (450, 4.5, 0.013, 0.010)],
    "Upside":       [(150, 5.5, 0.020, 0.018), (800, 6.5, 0.022, 0.020), (1200, 4.5, 0.020, 0.018)],
}
ORGANIC = {"Conservative": 0.0, "Realistic": 0.05, "Upside": 0.20}

def scenarios():
    out = []
    for vat, label in ((0.0, "VAT-exempt"), (0.27, "27% VAT")):
        aov, con = blended(vat)
        out.append(f"\n## {label} — blended AOV {aov:,.0f} Ft (€{aov/EUR_HUF:.1f}), contribution incl. labour {con:,.0f} Ft (€{con/EUR_HUF:.1f})\n")
        for sc, months in SCEN.items():
            out.append(f"\n### {sc}\n")
            out.append("| Month | Ad € | Impr. | CTR | Clicks | CPC € | CVR | Orders | Revenue Ft | COGS+ship+fees+labour Ft | VAT Ft | CAC € | Net profit € |")
            out.append("|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|")
            cum = 0
            for i, (b, cpm, ctr, cvr) in enumerate(months, 1):
                imp = b / cpm * 1000
                clicks = imp * ctr
                paid = clicks * cvr
                orders = paid * (1 + ORGANIC[sc])
                rev = orders * aov
                vat_amt = rev - rev / (1 + vat)
                var = rev / (1 + vat) - orders * con
                profit = orders * con / EUR_HUF - b - FIXED_EUR
                cum += profit
                out.append(f"| M{i} | {b} | {imp:,.0f} | {ctr:.1%} | {clicks:,.0f} | {b/clicks:.2f} | {cvr:.1%} | {orders:.1f} | {rev:,.0f} | {var:,.0f} | {vat_amt:,.0f} | {b/paid:.0f} | {profit:,.0f} |")
            out.append(f"\n90-day cumulative: **€{cum:,.0f}**")
    return "\n".join(out)

if __name__ == "__main__":
    print("# Red-team model output (generated)\n")
    print(f"Labour: {LABOR_MIN} min/order × {LABOR_HUF_H:,} Ft/h = {LABOR:,.0f} Ft. Kit COGS: S {cogs_huf('S 32x32'):,.0f} Ft, M {cogs_huf('M 48x48'):,.0f} Ft.\n")
    print("## Price points\n")
    print(price_table())
    for vat, label in ((0.0, "VAT-exempt"), (0.27, "27% VAT")):
        aov, con = blended(vat)
        c = con / EUR_HUF
        line = "; ".join(f"€{t}: " + ", ".join(("n/a" if c - x <= 0 else f"{(t + FIXED_EUR) / (c - x):.0f}") + f"@€{x}" for x in (15, 20, 25, 30, 35)) for t in (500, 1000, 1500, 2000))
        print(f"\nOrders/month needed ({label}, contribution €{c:.1f}): {line}")
    print(scenarios())
