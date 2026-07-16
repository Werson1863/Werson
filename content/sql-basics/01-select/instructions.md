# A SELECT utasítás

Az SQL-ben a `SELECT` utasítással kérdezhetünk le adatokat egy táblából.
A `*` jelöli az összes oszlopot, a `FROM` után pedig a tábla nevét adjuk meg.

```sql
SELECT * FROM movies;
```

## Feladat

A rendelkezésre álló `movies` táblában 5 film található (`id`, `title`, `year` oszlopokkal).

Írj egy lekérdezést, amely **visszaadja az összes filmet, minden oszloppal**.

## Elvárt eredmény

Egy 5 sorból álló táblázat, benne az összes filmmel — köztük az **Inception** cíművel is.
