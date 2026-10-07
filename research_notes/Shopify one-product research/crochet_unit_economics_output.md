# Crochet kit — unit economics & validation model (generated)

All numbers are ESTIMATES from the inputs in crochet_unit_economics.py; CAC is unverified and must come from the test.

## Offer economics (Germany, own packing)

| Offer | Price € | Net ex VAT € | Landed cost € | Pack € | Postage € | Pay fees € | Returns € | **Contribution = break-even CAC €** | Gross margin | Target CAC (65%) € |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| A  Starter kit (1 figure + tools + video) | 29.90 | 25.13 (+3.32 ship fee) | 5.50 | 0.40 | 3.40 | 1.10 | 0.75 | **16.80** | 77% | 10.92 |
| A' Starter kit at €34.90 | 34.90 | 29.33 (+3.32 ship fee) | 5.50 | 0.40 | 3.40 | 1.22 | 0.88 | **20.75** | 80% | 13.48 |
| B  Duo / premium gift box (2 figures + tools) | 49.90 | 41.93 (+0.00 ship fee) | 9.50 | 0.60 | 3.40 | 1.50 | 1.26 | **25.18** | 76% | 16.37 |
| C  Trio (3 figures + tools + gift box) | 64.90 | 54.54 (+0.00 ship fee) | 12.50 | 0.80 | 4.90 | 1.87 | 1.64 | **32.33** | 76% | 21.01 |
| R  Refill figure (no tools) | 17.90 | 15.04 (+3.32 ship fee) | 3.20 | 0.30 | 3.40 | 0.80 | 0.45 | **9.71** | 77% | 6.31 |

With a 3PL instead of own packing, subtract a further ~€1.50 per order.

## Profit per order after CAC, by AOV mix

| Blended AOV (mix A/B/C) | Contribution/order € | CAC €15 | CAC €20 | CAC €25 | CAC €30 | CAC €35 |
|---|---:|---:|---:|---:|---:|---:|
| €29.90 (100/0/0) | 16.80 | +1.80 | -3.20 | -8.20 | -13.20 | -18.20 |
| €40.15 (60/25/15) | 21.22 | +6.22 | +1.22 | -3.78 | -8.78 | -13.78 |
| €45.65 (40/35/25) | 23.61 | +8.61 | +3.61 | -1.39 | -6.39 | -11.39 |
| €51.90 (20/40/40) | 26.36 | +11.36 | +6.36 | +1.36 | -3.64 | -8.64 |

## Orders per month needed for profit targets

(contribution €21.22/order at blended AOV €40.15; fixed €200/month)

| Profit target / month | AOV €40 mix, CAC €15 | CAC €20 | CAC €25 | CAC €30 |
|---|---:|---:|---:|---:|
| €500 | 113 orders | 573 orders | not reachable | not reachable |
| €1,000 | 193 orders | 983 orders | not reachable | not reachable |
| €1,500 | 273 orders | 1,392 orders | not reachable | not reachable |
| €2,000 | 354 orders | 1,802 orders | not reachable | not reachable |

## 30/60/90-day scenarios (Germany only, lean fixed costs)


### Conservative (kill after M1 — shown continuing only to illustrate)

| Month | Ad spend € | CPC € | Sessions | CVR | New orders | Repeat orders | AOV € | Revenue € | CAC € | Contribution € | Profit after ads & fixed € |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| M1 | 500 | 0.90 | 556 | 1.4% | 8 | 0 | 35.65 | 300 | 64.29 | 150 | -550 |
| M2 | 500 | 0.85 | 588 | 1.5% | 9 | 0 | 37.40 | 367 | 56.67 | 183 | -517 |
| M3 | 500 | 0.70 | 714 | 1.5% | 11 | 1 | 37.40 | 457 | 46.67 | 228 | -472 |

90-day cumulative: **€-1,540**

### Realistic

| Month | Ad spend € | CPC € | Sessions | CVR | New orders | Repeat orders | AOV € | Revenue € | CAC € | Contribution € | Profit after ads & fixed € |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| M1 | 500 | 0.70 | 714 | 2.0% | 14 | 0 | 40.15 | 607 | 35.00 | 303 | -397 |
| M2 | 1,500 | 0.65 | 2,308 | 2.4% | 55 | 1 | 42.90 | 2,530 | 27.08 | 1,264 | -436 |
| M3 | 2,500 | 0.50 | 5,000 | 2.4% | 120 | 5 | 44.65 | 5,798 | 20.83 | 2,896 | 196 |

90-day cumulative: **€-637**

### Upside

| Month | Ad spend € | CPC € | Sessions | CVR | New orders | Repeat orders | AOV € | Revenue € | CAC € | Contribution € | Profit after ads & fixed € |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| M1 | 500 | 0.55 | 909 | 2.8% | 25 | 0 | 42.90 | 1,142 | 19.64 | 571 | -129 |
| M2 | 2,000 | 0.50 | 4,000 | 3.2% | 128 | 3 | 45.65 | 6,166 | 15.62 | 3,083 | 883 |
| M3 | 4,000 | 0.40 | 10,000 | 3.2% | 320 | 15 | 47.40 | 16,359 | 12.50 | 8,179 | 3,979 |

90-day cumulative: **€4,732**
