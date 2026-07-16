# CodeLearn — Interaktív Kódtanuló Platform

Böngészőben futó, interaktív programozásoktató platform (Codecademy-klón). SQL és Python
leckéket old meg a felhasználó közvetlenül a böngészőjében (WASM), a szerver csak a
felhasználókezelést és a haladásmentést végzi.

## Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS, CodeMirror 6, react-router-dom
- **Kódfuttatás (böngészőben, szerver nélkül):** sql.js (SQLite → WASM), Pyodide (CPython → WASM)
- **Backend:** Node.js + Express + TypeScript, Prisma ORM, SQLite (dev)
- **Auth:** JWT (access + httpOnly refresh cookie), argon2 jelszóhash
- **Monorepo:** npm workspaces (`apps/web`, `apps/api`, `packages/shared`)

A tananyag (leckeszövegek, kezdőkód, megoldás, rejtett tesztek) a `/content` mappában él
verziózott JSON/Markdown fájlokként — az adatbázis csak felhasználót és haladást tárol.

## Első futtatás

```bash
npm install

# API környezeti változók + adatbázis
cp apps/api/.env.example apps/api/.env
npm run prisma:migrate --workspace=apps/api   # létrehozza a dev.db-t és a Prisma klienst

# (opcionális) demo felhasználó + minta haladás feltöltése
npm run seed --workspace=apps/api

npm run dev
```

Ez elindítja mindkét appot:

- Web: http://localhost:5173
- API: http://localhost:3000 (health check: `GET /api/health`)

Regisztrálj egy új fiókkal a `/register` oldalon, vagy jelentkezz be a seedelt demó
fiókkal: **demo@codelearn.dev / demopassword123**.

> A `apps/web` opcionálisan saját `.env`-et is használhat (`cp apps/web/.env.example apps/web/.env`),
> ha az API nem a alapértelmezett `http://localhost:3000` címen fut.

## Projekt szerkezet

```
apps/
  web/      React SPA — leckeoldalak, kódszerkesztő, kliensoldali runtime-ok, grader
  api/      Express API — auth (JWT) + haladás perzisztencia (Prisma)
packages/
  shared/   Közös TypeScript típusok (Lesson, TestCase, Progress, ...)
content/
  <course-id>/
    course.json           # kurzus metaadat + leckesorrend
    <NN-slug>/
      lesson.json          # lecke szerződés: setup, starterCode, solution, tests
      instructions.md      # bal oldali elméleti szöveg
```

## Tesztek

```bash
# Grader + runtime unit tesztek (Vitest)
npm run test --workspace=apps/web

# E2E (Playwright): regisztráció → lecke megoldása → haladás mentve
npm run test:e2e --workspace=apps/web
```

A tartalom saját magát is teszteli: minden lecke `solution` mezője FUTTATVA át kell,
hogy vigyen minden rejtett teszten, a `starterCode` pedig NEM — ezt a
`content.selftest*.test.ts` fájlok ellenőrzik automatikusan.

## Build

```bash
npm run build
```

Sorban buildeli a `packages/shared`, `apps/api`, majd `apps/web` csomagokat.

## Új lecke hozzáadása

1. Hozz létre egy `content/<course-id>/NN-slug/` mappát.
2. Írd meg az `instructions.md`-t: rövid elmélet → konkrét feladat → elvárt eredmény.
   (Ne ismételd meg a lecke címét `#` H1-ként — azt az oldal már kirajzolja.)
3. Írd meg a `lesson.json`-t az 5. szakasz szerinti teszt-típusokkal
   (`output_match`, `output_contains`, `expected_row_count`, `column_names`,
   `function_returns`, `regex_match`).
4. Vedd fel a leckét a kurzus `course.json` `lessons` listájába.
5. Futtasd a `npm run test --workspace=apps/web` parancsot — ha a self-test lefut és zöld,
   a lecke helyes: a `solution` mindent átvisz, a `starterCode` nem.

## Biztonsági megjegyzés

A felhasználói kód (SQL és Python) kizárólag a felhasználó saját böngészőjében fut, WASM
sandboxban — a backend soha nem futtat felhasználói kódot. A backend csak auth-ot és
haladást kezel: zod input-validáció, rate limiting a regisztráción/belépésen, argon2
jelszóhash, rövid élettartamú JWT access token + httpOnly refresh cookie.
