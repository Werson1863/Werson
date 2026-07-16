# Rendezés ORDER BY-jal

Az `ORDER BY` kulcsszóval rendezhetjük a lekérdezés eredményét egy vagy több oszlop szerint.

```sql
SELECT title, year FROM movies ORDER BY year ASC;
```

Az `ASC` (növekvő) az alapértelmezett irány, a csökkenőhöz a `DESC`-et használjuk.

## Feladat

Kérdezd le az összes film **címét és évszámát**, **évszám szerint növekvő sorrendben**.

## Elvárt eredmény

5 sor, a legrégebbi filmtől a legújabbig rendezve, csak a `title` és `year` oszlopokkal.
