# AION 2 Toolkit

Web tools for **AION 2** (NCSOFT): skill calculator, hotbar & macro planner, stigma calculator, Daevanion board planner, skill database and a community build gallery.
Interface and game texts in **English and German** (switch top right).

Web-Tools für **AION 2**: Skill-Rechner, Skill-Leiste mit Makros, Stigma-Rechner, Daevanion-Tafel-Planer, Skill-Datenbank und eine Community-Galerie für Builds.
Oberfläche und Spieltexte auf **Englisch und Deutsch** (Umschalter oben rechts).

## Tools

All planner pages share one build per class (class, level, cooldown reduction, skills, stigmas, Daevanion, hotbar, macros). It is saved in the browser and can be shared as a link or uploaded to the community.

**My builds / Meine Builds** (folder button in the build bar): save any number of named builds in the browser (up to 50), load, rename, overwrite or delete them, copy a share link per build, and export/import them as a JSON file for a backup or another device. Saved builds also appear on the start page.

| Route | What it does |
|---|---|
| `#/` | Start page with your current build, all tools and the latest community builds |
| `#/skills` | Skill calculator: skill point budget (level + extra sources), level every active/passive skill 1–10, cooldown and MP per skill, cooldown by level |
| `#/hotbar` | Hotbar & macros: 5 × 12 hotbar (drag & drop, click to place, right-click for auto-use), cooldown overview, **cooldown test mode** (click or press 1–0, -, = to see the cooldowns run), macro editor (up to 10 macros, 20 steps, delay per step, "from column"), 30-second rotation preview |
| `#/stigma` | Stigma calculator: 4 slots (unlock at Lv. 22/27/32/37), stigma level 1–20, shard costs, specialisations at Lv. 5/10/15/20, cooldown per stigma |
| `#/daevanion` | Daevanion boards: Nezekan, Zikel, Vaizel, Triniel, Azphel; learn/unlearn with dependency cascade, Shift+click for the cheapest route, stat and skill-level totals |
| `#/database` | Skill database: all 315 skills with class/type filters, search, sort by cooldown, per-level table |
| `#/community` | Community builds: upload your build (incl. hotbar and macros), browse, search, like, load into the calculator; edit or delete your own uploads |

Cooldowns are shown everywhere a skill appears: coloured badge on every icon (green < 15 s, amber < 60 s, red ≥ 60 s), in tooltips, lists and detail panels. The **cooldown reduction %** field in the build bar applies to all of them.

## Setup / Einrichtung

```bash
npm install
npm run dev:all    # frontend (http://localhost:5173) + community server (port 8787)
```

| Script | Purpose |
|---|---|
| `npm run dev` | Frontend only (community pages then show "server not reachable") |
| `npm run server` | Community server only (`server/index.mjs`, port 8787) |
| `npm run dev:all` | Both together, `/api` is proxied by Vite |
| `npm run build` | Production build in `dist/` |
| `npm start` | Build, then serve `dist/` **and** the API from one Node process on port 8787 |

## GitHub Pages

`.github/workflows/pages.yml` builds the site on every push to `main` and publishes it to GitHub Pages.
The Pages build sets `VITE_COMMUNITY=off`: all planners, the database and share links work, the community pages are hidden because Pages cannot run the server.

One-time setup in the repository: **Settings > Pages > Build and deployment > Source: GitHub Actions**.
The site is then available at `https://<user>.github.io/<repository>/`.

## Community server

`server/index.mjs` has no dependencies (Node ≥ 20). Builds are stored in `server/data/builds.json` (created automatically, not in git).

- Uploading returns a secret edit token that is kept in the uploader's browser; only its hash is stored. Without it a build cannot be changed or deleted.
- Likes are counted once per browser; views once per visitor every 30 minutes.
- Five reports hide a build automatically. With `ADMIN_TOKEN=...` set, requests with header `x-admin-token` may delete any build.
- Uploads and edits are rate-limited per IP, all input is validated and size-limited.

Environment variables:

| Variable | Default | Meaning |
|---|---|---|
| `PORT` | `8787` | Port |
| `HOST` | `127.0.0.1` | Bind address. Use `0.0.0.0` to accept connections from other machines |
| `ADMIN_TOKEN` | – | Enables admin deletion |
| `TRUST_PROXY` | – | Set to `1` behind a reverse proxy so rate limits use `X-Forwarded-For` |
| `CORS_ORIGIN` | – | Comma-separated origins of a separately hosted frontend, e.g. `https://name.github.io` |

### Hosting for other players / Für andere Spieler hosten

To let other players upload builds, the server must run on a machine that is reachable from the internet, for example a small VPS:

```bash
npm ci && npm run build
HOST=0.0.0.0 PORT=8787 TRUST_PROXY=1 ADMIN_TOKEN=change-me node server/index.mjs
```

Put a reverse proxy with HTTPS (Caddy, nginx) in front of it and keep `server/data/` in your backups.
If the frontend is hosted separately (e.g. GitHub Pages), build it with `VITE_API_BASE=https://your-server.example npm run build` and start the server with `CORS_ORIGIN=https://name.github.io`.

## Game data / Spieldaten

All game data is committed in `public/data/` and the icons in `public/icons/` and `public/emblems/`, so the app runs offline.
After a game patch, refresh everything with:

```bash
npm run data
```

This runs three scripts (`scripts/`):

- `fetch-data.mjs` – downloads `classes`, `skills`, `skill-costs`, `skill-points`, `daevanion` JSON in EN and DE from dbaion2.ru (drops the unused per-level effect lists from `skills.json`, about a third of its size)
- `fetch-learn-levels.mjs` – reads the level that teaches each skill from endgametools.com class pages (dbaion2 reports level 1 for every skill); Brawler is not on the Global service yet and keeps level 1
- `fetch-icons.mjs` – downloads every referenced skill / specialisation / chain icon plus the class icons (skips files that already exist)

Data notes:

- Normal skills: levels 2–10 cost skill points (1/1/1/2/2/2/4/4/4 = 21 per skill); higher levels come from gear and Daevanion and are not purchasable here.
- Stigma: levels 1–20 cost 1/2/4/8 shards per 5-level band (75 per stigma, 300 for four). Superior Stigma Shards (above Lv. 20) are not modelled.
- Daevanion: node cost by grade (Common 1, Rare 2, Epic 3, Unique 4), 4-neighbour adjacency, boards cost 134/134/134/168/232 points.
- Macros follow the in-game rules (priority from top to bottom, delay 0–9900 ms per step). The rotation preview is a simplified model: one action per second plus the step delay.

## Credits / Rechtliches

Fan project, not affiliated with NCSOFT. AION 2 and all game assets (names, texts, icons) © NCSOFT Corporation.
Data via [dbaion2.ru](https://dbaion2.ru), learn levels and icon mirror via [endgametools.com](https://endgametools.com).
