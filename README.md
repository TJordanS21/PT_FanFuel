# Projektdokumentation - FanFuel

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

## 1. Ausgangslage

- **Problem:** Junge Athleten haben Schwierigkeiten, Training und Ernährung koordiniert zu planen. Informationen sind über verschiedene Apps verteilt und es fehlt ein zentraler Überblick über den Tagesablauf.
- **Ziele:** Eine einfache Webanwendung, die Trainingsplanung und Ernährungsempfehlungen an einem Ort zusammenbringt.
- **Primäre Zielgruppe:** Junge Sportler (16–25 Jahre), die ihr Training und ihre Ernährung besser organisieren möchten.

## 2. Lösungsidee

- **Kernfunktionalität:**
  - Wochenkalender zur Trainingsplanung (Erstellen, Bearbeiten, Löschen von Aktivitäten)
  - Dashboard mit tagesabhängiger Anzeige (z.B. «Today it's Match Day»)
  - Rezeptübersicht und Detailseiten für sportgerechte Ernährung
- **Abgrenzung:** Kein Login/Registrierung, keine Anbindung an Fitness-Tracker, kein Social-Media-Feature.

## 3. Vorgehen & Artefakte

### 3.1 Understand & Define

- **Zielgruppenverständnis:** _[wird ergänzt]_
- **Wesentliche Erkenntnisse:** _[wird ergänzt]_

### 3.2 Sketch

- **Variantenüberblick:** _[wird ergänzt]_
- **Skizzen:** _[wird ergänzt]_

### 3.3 Decide

- **Gewählte Variante & Begründung:** _[wird ergänzt]_
- **End-to-End-Ablauf:** _[wird ergänzt]_
- **Mockup:** _[wird ergänzt]_

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)

- **Informationsarchitektur:**
  - Dashboard (Startseite) → Tagesübersicht mit Mahlzeiten
  - Plan → Wochenkalender mit CRUD für Aktivitäten
  - Progress → Trainingsfortschritt (in Arbeit)
  - Learn → Rezeptliste mit Detailseiten
- **User Interface Design:** _[Screenshots werden ergänzt]_
- **Designentscheidungen:** Helles, minimalistisches Design. Rote Akzentfarbe für Buttons und wichtige Elemente. Klare Navigation über Header.

#### 3.4.2. Umsetzung (Technik)

- **Technologie-Stack:** SvelteKit, TypeScript, MongoDB Atlas, Vite
- **Tooling:** WebStorm, GitHub
- **Struktur & Komponenten:**
  - Seiten: `/` (Dashboard), `/plan`, `/progress`, `/learn`, `/learn/[id]`
  - Komponenten: `Header.svelte`
  - Datenbankanbindung: `src/lib/server/db.ts`
  - Typen: `src/lib/types.ts` (Activity, Recipe, Meal, MoodEntry)
- **Daten & Schnittstellen:** MongoDB Atlas mit Collections `activities`, `recipes`, `meals`. Daten werden serverseitig via SvelteKit Load-Funktionen und Form Actions abgerufen/gespeichert.
- **Deployment:** _[URL folgt, Netlify geplant]_
- **Besondere Entscheidungen:** Seed-Skript für Beispieldaten, um die App ohne manuellen DB-Eintrag testen zu können.

### 3.5 Validate

- _[wird nach Usability-Test ergänzt]_

## 4. Erweiterungen [Optional]

_[wird ergänzt, sobald Erweiterungen umgesetzt sind]_

## 5. Projektorganisation [Optional]

- **Repository & Struktur:** GitHub (privat), strukturierte Commits mit Conventional-Commit-Stil
- **Commit-Praxis:** Sprechende Commit-Messages (z.B. `feat: implement Plan page with full CRUD`)

## 6. KI-Deklaration

### 6.1 KI-Tools

- **Eingesetzte Tools**: GitHub Copilot (in IDE)
- **Zweck & Umfang**: Unterstützung bei Codevorschlägen, Boilerplate-Generierung und Fehlerbehebung.
- **Eigene Leistung (Abgrenzung):** Konzept, Architektur, Design-Entscheidungen und Testing eigenständig erarbeitet. KI-Vorschläge wurden geprüft und angepasst.

### 6.2 Prompt-Vorgehen

Copilot wurde hauptsächlich für Inline-Vorschläge beim Programmieren verwendet. Gelegentlich wurden Chat-Prompts für spezifische Implementierungsfragen genutzt (z.B. MongoDB-Queries, SvelteKit Form Actions).

### 6.3 Reflexion

KI-Unterstützung hat die Entwicklung beschleunigt, insbesondere bei repetitivem Code und Boilerplate. Grenzen zeigten sich bei projektspezifischer Logik, die manuell angepasst werden musste. Alle generierten Codevorschläge wurden auf Korrektheit geprüft.

## 7. Anhang [Optional]

_[wird bei Bedarf ergänzt]_
