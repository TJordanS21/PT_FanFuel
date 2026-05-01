# Agent Context – FanFuel

## Project Overview
FanFuel is a sports nutrition web app for hobby athletes (18–35). It suggests meals based on today's training activity, tracks mood, and visualizes progress. Built as a school project for the ZHAW "Prototyping" module.

## Tech Stack
- **Framework:** SvelteKit (Svelte 5 with runes: `$state`, `$derived`, `$props`)
- **Language:** TypeScript (strict)
- **Database:** MongoDB Atlas (via `mongodb` driver, no ORM)
- **Charts:** Chart.js
- **Styling:** Vanilla CSS with CSS variables (no Tailwind, no SCSS)
- **Deployment:** Netlify (`@sveltejs/adapter-netlify`)
- **Package Manager:** npm

## Project Structure
```
src/
├── app.html              # Root HTML (lang="de-CH")
├── app.css               # Global styles & CSS variables
├── lib/
│   ├── types.ts           # TypeScript interfaces (Activity, Recipe, MoodEntry)
│   ├── server/db.ts       # MongoDB connection
│   └── components/
│       ├── Header.svelte
│       ├── MoodLogger.svelte
│       └── SpotifySuggestion.svelte
├── routes/
│   ├── +layout.svelte     # Global layout (Header + <main>)
│   ├── +page.svelte       # Dashboard
│   ├── +page.server.ts    # Dashboard data + logMood action
│   ├── plan/              # Weekly planner (CRUD activities)
│   ├── progress/          # Charts & stats (Chart.js)
│   └── learn/             # Recipe list + /learn/[id] detail
scripts/
└── seed.ts                # Seeds MongoDB with sample data
```

## Database Collections
- **activities** – Training entries (type: gym | match | cardio | recovery | rest)
- **recipes** – Recipes with `activityTags` array for auto-suggestion
- **moods** – Daily mood logs (1–5 scale)

## Key Patterns
- **Server data loading:** SvelteKit `load` functions in `+page.server.ts`
- **Mutations:** SvelteKit Form Actions with `use:enhance`
- **Serialization:** `JSON.parse(JSON.stringify(...))` for MongoDB documents
- **Auto-suggested meals:** Recipes are queried by `activityTags` matching today's activity type, one picked per category (breakfast, lunch, dinner, snack)
- **Mood effect:** Logged mood shows wellness tip on dashboard + trend chart on /progress

## Conventions
- **Locale:** `de-CH` (Swiss German) for all dates and the HTML lang attribute
- **Commits:** Conventional Commits (`feat:`, `fix:`, `style:`, `docs:`)
- **CSS:** Use `var(--color-*)` variables from app.css. No inline colors.
- **Components:** Svelte 5 runes syntax only (`$props`, `$state`, `$derived`). No `export let`.
- **Selects:** Custom styled with `appearance: none` + SVG chevron (see app.css)

## Constraints
- No login/auth
- No external API calls (Spotify is embedded via iframe, not API)
- No Tailwind or UI framework
- Must remain deployable on Netlify

