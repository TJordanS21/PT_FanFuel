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

- **Problem:** Die Ernährung präzise auf unterschiedliche Sportarten (z.B. Krafttraining vs. Fussballmatch) abzustimmen, ist für viele Hobby-Athleten schwierig. Berufstätige oder Studierende haben oft wenig Zeit, komplexe Ernährungspläne zu verfolgen oder sich mit Makronährstoffen auseinanderzusetzen. Bestehende Apps wie MyFitnessPal fokussieren stark auf Kalorienzählen, was viele Nutzer auf Dauer demotiviert. Es fehlt eine Lösung, die «Aktivität zuerst» denkt – also Rezepte basierend auf der Sportart vorschlägt, anstatt nur Zahlen zu loggen.
- **Ziele:** Eine Webanwendung, die Trainingsplanung und Ernährungsempfehlungen an einem Ort zusammenbringt und dabei den Entscheidungsprozess bei der täglichen Essenswahl vereinfacht.
- **Primäre Zielgruppe:** Hobby-Athleten (Fussballer, Gym-Gänger) im Alter von 18–35 Jahren, die ihre Leistung optimieren wollen. Die App wird meist in der Küche während der Planung oder kurz vor dem Training zur Motivation genutzt.

## 2. Lösungsidee

- **Kernfunktionalität:**
  - Wochenkalender zur Trainingsplanung (Erstellen, Bearbeiten, Löschen von Aktivitäten)
  - Dashboard mit tagesabhängiger Anzeige (z.B. «Today it's Match Day») und passenden Rezeptvorschlägen
  - Rezeptübersicht und Detailseiten für sportgerechte Ernährung
  - Spotify-Playlist-Vorschläge basierend auf der geplanten Aktivität
  - Stimmungserfassung (Mood Logging) zur Verknüpfung von Wohlbefinden und Training
- **Annahmen:**
  - HMW 1: Wie könnten wir Sportler:innen dabei unterstützen, ihre Mahlzeitenplanung so zu automatisieren, dass sie sich dynamisch an ihren wöchentlichen Trainingsplan anpasst?
  - HMW 2: Wie könnten wir die Motivation für eine gesunde Ernährung steigern, indem wir die Mahlzeitenplanung mit personalisierten Musik-Playlists verknüpfen?
  - HMW 3: Wie könnten wir den Entscheidungsprozess bei der Rezeptwahl vereinfachen, damit Nutzer:innen basierend auf ihrer Aktivität performante Mahlzeiten erhalten?
- **Abgrenzung:** Kein Login/Registrierung, keine Anbindung an Fitness-Tracker, kein Social-Media-Feature, kein komplexes Kalorienzählen.

## 3. Vorgehen & Artefakte

### 3.1 Understand & Define

- **Zielgruppenverständnis:** Hobby-Athleten (18–35 Jahre), die neben Beruf oder Studium trainieren. Hauptbedürfnis: schnelle, zielorientierte Rezeptvorschläge, die spezifisch auf die nächste Einheit vorbereiten (z.B. «Match Day» vs. «Rest Day»).
- **Wesentliche Erkenntnisse:**
  - Etablierte Apps wie MyFitnessPal werden als zu technisch und demotivierend empfunden (Fokus auf Kalorienzählen).
  - Es fehlt eine Lösung, die «Aktivität zuerst» denkt und Rezepte basierend auf der Sportart vorschlägt.
  - Moderne Web-APIs (Spotify, Rezept-APIs) ermöglichen eine nahtlose Integration von Lifestyle-Elementen.
  - Dashboards mit «Streaks» und Fortschrittsvisualisierung fördern die langfristige Nutzerbindung.
  - Zentrale Herausforderungen der Zielgruppe: Zeitmangel nach der Arbeit, Überforderung durch komplexe Tracking-Apps, «Decision Fatigue» bei der täglichen Essenswahl.

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

- **Technologie-Stack:** SvelteKit, TypeScript, MongoDB Atlas, Vite, Chart.js
- **Tooling:** WebStorm, GitHub
- **Struktur & Komponenten:**
  - Seiten: `/` (Dashboard), `/plan`, `/progress`, `/learn`, `/learn/[id]`
  - Komponenten: `Header.svelte`
  - Datenbankanbindung: `src/lib/server/db.ts`
  - Typen: `src/lib/types.ts` (Activity, Recipe, Meal, MoodEntry)
- **Daten & Schnittstellen:** MongoDB Atlas mit Collections `activities`, `recipes`, `meals`. Daten werden serverseitig via SvelteKit Load-Funktionen und Form Actions abgerufen/gespeichert.
- **Deployment:** Netlify (Konfiguration via `netlify.toml` und `@sveltejs/adapter-netlify`). URL: _[wird nach erstem Deploy ergänzt]_
- **Besondere Entscheidungen:** Seed-Skript für Beispieldaten, um die App ohne manuellen DB-Eintrag testen zu können.

### 3.5 Validate

- _[wird nach Usability-Test ergänzt]_

## 4. Erweiterungen [Optional]

### 4.1 Spotify-Playlist-Vorschläge
- **Beschreibung & Nutzen:** Auf dem Dashboard wird basierend auf der heutigen Aktivität eine passende Spotify-Playlist vorgeschlagen (z.B. «Gym Motivation» bei Gym-Tag).
- **Wo umgesetzt:**
  - **Frontend:** Komponente `SpotifySuggestion.svelte`, eingebunden in `src/routes/+page.svelte`
  - **Backend:** Aktivitätstyp wird in `+page.server.ts` an das Frontend übergeben
- **Aus Evaluation abgeleitet?:** Nein, geplante Erweiterung.

### 4.2 Mood Logging
- **Beschreibung & Nutzen:** User können auf dem Dashboard ihre tägliche Stimmung erfassen (5-stufige Skala). Daten werden in MongoDB gespeichert.
- **Wo umgesetzt:**
  - **Frontend:** Komponente `MoodLogger.svelte`, eingebunden in `src/routes/+page.svelte`
  - **Backend:** Form Action `logMood` in `src/routes/+page.server.ts`
  - **Datenbank:** Collection `moods`
- **Aus Evaluation abgeleitet?:** Nein, geplante Erweiterung.

### 4.3 Performance-Visualisierung mit Charts
- **Beschreibung & Nutzen:** Auf der Progress-Seite werden Trainingsstatistiken visuell dargestellt (Liniendiagramm für wöchentliche Entwicklung, Doughnut-Chart für Aktivitätstypen-Verteilung, Streak-Anzeige).
- **Wo umgesetzt:**
  - **Frontend:** `src/routes/progress/+page.svelte` mit Chart.js
  - **Backend:** Aggregation der Aktivitätsdaten in `src/routes/progress/+page.server.ts`
- **Aus Evaluation abgeleitet?:** Nein, geplante Erweiterung.

### 4.4 Dynamischer Dashboard-Header
- **Beschreibung & Nutzen:** Die Überschrift auf dem Dashboard ändert sich automatisch basierend auf dem heutigen Trainingsplan (z.B. «Today it's Match Day 🏆»).
- **Wo umgesetzt:**
  - **Backend:** Logik in `src/routes/+page.server.ts`, Abfrage der heutigen Aktivität aus MongoDB
  - **Frontend:** Anzeige in `src/routes/+page.svelte`
- **Aus Evaluation abgeleitet?:** Nein, geplante Erweiterung.

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
