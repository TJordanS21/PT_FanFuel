# FanFuel

Webanwendung für junge Athleten zur Planung von Training und Ernährung. Erstellt im Rahmen des Moduls «Prototyping» an der ZHAW School of Management and Law.

## Funktionen (aktueller Stand)

- **Dashboard:** Startseite mit dynamischer Tagesanzeige (z.B. "Today it's Match Day") basierend auf dem Trainingsplan in der Datenbank. Anzeige der Mahlzeiten für den aktuellen Tag.
- **Plan:** Wochenkalender mit farbkodierten Aktivitäten. Aktivitäten können erstellt, bearbeitet und gelöscht werden (CRUD).
- **Progress:** Seite für Trainingsfortschritt (in Arbeit).
- **Learn:** Rezeptübersicht und Detailseiten (in Arbeit).

## Tech Stack

- SvelteKit (mit TypeScript)
- MongoDB Atlas
- Vite

## Setup

```bash
npm install
```

`.env`-Datei erstellen (siehe `.env.example`):

```
MONGODB_URI=mongodb+srv://...
```

Datenbank mit Beispieldaten füllen:

```bash
npm run seed
```

Entwicklungsserver starten:

```bash
npm run dev
```

## Projektstruktur

```
src/
  routes/         → Seiten (Dashboard, Plan, Progress, Learn)
  lib/
    components/   → Wiederverwendbare Komponenten (Header, etc.)
    server/       → Datenbankverbindung
    types.ts      → TypeScript-Interfaces
scripts/
  seed.ts         → Seed-Skript für Beispieldaten
```

## Deployment

Wird mit Netlify deployt (Konfiguration folgt).
