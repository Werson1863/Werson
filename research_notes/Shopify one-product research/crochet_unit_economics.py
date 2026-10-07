"""Crochet kit validation model (Deep Validation Protocol v1.0).

Prices are anchored to observed German market prices (see crochet_competitors.md):
  Die Bobbels €19.95–26.95 · Figured'Art €21.90–30.90 · TranquilHome €23.78 · Woobles ~€17–24 (eBay.de)
  · Willy Wolle €34 kit / €40 gift box (top of market).
Every cost below is an ESTIMATE unless marked FACT. Run: python3 -I crochet_unit_economics.py
"""

VAT = 0.19                       # FACT: DE standard VAT
PAY_PCT, PAY_FIX = 0.025, 0.25   # ESTIMATE blended card/PayPal/Klarna
RETURNS = 0.03                   # ESTIMATE: share of net revenue lost to refunds / reships
SHIP_FEE_SINGLE = 3.95           # customer-paid shipping on the single kit (free on bundles)
FIXED_LEAN = 200                 # ESTIMATE €/month: Shopify Basic ~36, apps ~20, legal texts ~15, email 0–20, creative ~120

# Offer: (gross price, landed product cost, packaging, postage)
# Postage FACT range: DHL Kleinpaket business €3.20–3.50 (<1,000 shipments, ≤1 kg, DE). Trio box may exceed Kleinpaket size → Päckchen/Paket.
OFFERS = {
    "A  Starter kit (1 figure + tools + video)": (29.90, 5.50, 0.40, 3.40),
    "A' Starter kit at €34.90":                  (34.90, 5.50, 0.40, 3.40),
    "B  Duo / premium gift box (2 figures + tools)": (49.90, 9.50, 0.60, 3.40),
    "C  Trio (3 figures + tools + gift box)":    (64.90, 12.50, 0.80, 4.90),
    "R  Refill figure (no tools)":               (17.90, 3.20, 0.30, 3.40),
}


def unit(price, cogs, pack, post, ship_fee=0.0, fulfil=0.50):
    """fulfil: €0.50 = own packing (materials/time proxy); use 2.00 for a 3PL."""
    net = price / (1 + VAT)
    ship_net = ship_fee / (1 + VAT)
    pay = PAY_PCT * (price + ship_fee) + PAY_FIX
    ret = RETURNS * net
    contrib = net + ship_net - cogs - pack - post - fulfil - pay - ret
    gm = (net - cogs - pack) / net
    return net, ship_net, pay, ret, contrib, gm


def offer_table():
    rows = ["| Offer | Price € | Net ex VAT € | Landed cost € | Pack € | Postage € | Pay fees € | Returns € | **Contribution = break-even CAC €** | Gross margin | Target CAC (65%) € |",
            "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|"]
    for name, (p, c, k, s) in OFFERS.items():
        fee = SHIP_FEE_SINGLE if name.startswith(("A ", "A'", "R")) else 0.0
        net, sn, pay, ret, con, gm = unit(p, c, k, s, fee)
        rows.append(f"| {name} | {p:.2f} | {net:.2f} (+{sn:.2f} ship fee) | {c:.2f} | {k:.2f} | {s:.2f} | {pay:.2f} | {ret:.2f} | **{con:.2f}** | {gm:.0%} | {0.65*con:.2f} |")
    return "\n".join(rows)


def blended(mix):
    """mix: dict offer_key_prefix -> share of orders (sums to 1). Returns gross product AOV, contribution/order."""
    keys = {"A": "A  Starter kit (1 figure + tools + video)", "B": "B  Duo / premium gift box (2 figures + tools)",
            "C": "C  Trio (3 figures + tools + gift box)"}
    aov = contrib = 0.0
    for k, share in mix.items():
        p, c, pk, s = OFFERS[keys[k]]
        fee = SHIP_FEE_SINGLE if k == "A" else 0.0
        *_, con, _gm = unit(p, c, pk, s, fee)
        aov += share * p
        contrib += share * con
    return aov, contrib


def cac_grid():
    out = ["| Blended AOV (mix A/B/C) | Contribution/order € | CAC €15 | CAC €20 | CAC €25 | CAC €30 | CAC €35 |", "|---|---:|---:|---:|---:|---:|---:|"]
    for mix in ({"A": 1.0}, {"A": .6, "B": .25, "C": .15}, {"A": .4, "B": .35, "C": .25}, {"A": .2, "B": .4, "C": .4}):
        aov, con = blended(mix)
        cells = [f"{con - x:+.2f}" for x in (15, 20, 25, 30, 35)]
        label = "/".join(f"{int(v*100)}" for v in (mix.get('A', 0), mix.get('B', 0), mix.get('C', 0)))
        out.append(f"| €{aov:.2f} ({label}) | {con:.2f} | " + " | ".join(cells) + " |")
    return "\n".join(out)


def targets():
    out = ["| Profit target / month | AOV €40 mix, CAC €15 | CAC €20 | CAC €25 | CAC €30 |", "|---|---:|---:|---:|---:|"]
    _aov, con = blended({"A": .6, "B": .25, "C": .15})
    for t in (500, 1000, 1500, 2000):
        cells = []
        for x in (15, 20, 25, 30):
            m = con - x
            cells.append("not reachable" if m <= 0 else f"{(t + FIXED_LEAN) / m:,.0f} orders")
        out.append(f"| €{t:,} | " + " | ".join(cells) + " |")
    return f"(contribution €{con:.2f}/order at blended AOV €{_aov:.2f}; fixed €{FIXED_LEAN}/month)\n\n" + "\n".join(out)


# Scenario months: (ad spend €, CPC €, purchase CVR, order mix)
SCEN = {
    "Conservative (kill after M1 — shown continuing only to illustrate)": [
        (500, 0.90, 0.014, {"A": .75, "B": .2, "C": .05}), (500, 0.85, 0.015, {"A": .7, "B": .2, "C": .1}), (500, 0.70, 0.015, {"A": .7, "B": .2, "C": .1})],
    "Realistic": [
        (500, 0.70, 0.020, {"A": .6, "B": .25, "C": .15}), (1500, 0.65, 0.024, {"A": .5, "B": .3, "C": .2}), (2500, 0.50, 0.024, {"A": .45, "B": .3, "C": .25})],
    "Upside": [
        (500, 0.55, 0.028, {"A": .5, "B": .3, "C": .2}), (2000, 0.50, 0.032, {"A": .4, "B": .35, "C": .25}), (4000, 0.40, 0.032, {"A": .35, "B": .35, "C": .3})],
}
REPEAT = {"Conservative (kill after M1 — shown continuing only to illustrate)": 0.04, "Realistic": 0.07, "Upside": 0.10}


def scenarios():
    out = []
    for name, months in SCEN.items():
        out.append(f"\n### {name}\n")
        out.append("| Month | Ad spend € | CPC € | Sessions | CVR | New orders | Repeat orders | AOV € | Revenue € | CAC € | Contribution € | Profit after ads & fixed € |")
        out.append("|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|")
        cust, cum = 0.0, 0.0
        for i, (spend, cpc, cvr, mix) in enumerate(months, 1):
            aov, con = blended(mix)
            sessions = spend / cpc
            new = sessions * cvr
            rep = cust * REPEAT[name]
            orders = new + rep
            ship_rev = mix.get("A", 0) * SHIP_FEE_SINGLE
            rev = orders * (aov + ship_rev)
            contrib = orders * con
            profit = contrib - spend - FIXED_LEAN
            cum += profit
            cust += new
            out.append(f"| M{i} | {spend:,.0f} | {cpc:.2f} | {sessions:,.0f} | {cvr:.1%} | {new:.0f} | {rep:.0f} | {aov:.2f} | {rev:,.0f} | {spend/new:.2f} | {contrib:,.0f} | {profit:,.0f} |")
        out.append(f"\n90-day cumulative: **€{cum:,.0f}**")
    return "\n".join(out)


if __name__ == "__main__":
    print("# Crochet kit — unit economics & validation model (generated)\n")
    print("All numbers are ESTIMATES from the inputs in crochet_unit_economics.py; CAC is unverified and must come from the test.\n")
    print("## Offer economics (Germany, own packing)\n")
    print(offer_table())
    print("\nWith a 3PL instead of own packing, subtract a further ~€1.50 per order.\n")
    print("## Profit per order after CAC, by AOV mix\n")
    print(cac_grid())
    print("\n## Orders per month needed for profit targets\n")
    print(targets())
    print("\n## 30/60/90-day scenarios (Germany only, lean fixed costs)\n")
    print(scenarios())
