# Daevaforge

**Daevaforge** is a free build planner for **AION 2** (NCSOFT): skills and specialisations, hotbar and macro, stigmas, Daevanion boards, skill combos, skill database, guides and a community build gallery.
Interface and game texts in **English and German** (switch in the sidebar, or top right on smaller screens).

**Daevaforge** ist ein kostenloser Build-Planer für **AION 2**: Skills und Spezialisierungen, Skill-Leiste und Makro, Stigmen, Daevanion-Tafeln, Skill-Kombos, Skill-Datenbank, Guides und eine Community-Galerie für Builds.
Oberfläche und Spieltexte auf **Englisch und Deutsch** (Umschalter in der Seitenleiste bzw. oben rechts).

Live: https://cosmic-game-studios.github.io/aion2-toolkit/

## Tools

All planner pages share one build per class (class, level, cooldown reduction, skills, specialisations, stigmas, Daevanion, hotbar, macro). It is saved in the browser and can be shared as a link or uploaded to the community.

Layout: on desktop (from 1200 px) every page sits in a sidebar grouped into *Planner* and *Knowledge*, with your current build at its foot, and the content uses the full width. On smaller screens the planner pages are one entry, **Planner**, with their own tab row; phones get a bottom navigation.

**My builds / Meine Builds** (folder button in the build bar): save any number of named builds in the browser (up to 50), load, rename, overwrite or delete them, copy a share link per build, and export/import them as a JSON file for a backup or another device. Saved builds also appear on the start page.

| Route | What it does |
|---|---|
| `#/` | Landing page: what Daevaforge does, a live preview of your current build (skills, stigmas, points, Daevanion board), class picker, next steps, saved and latest community builds, FAQ |
| `#/skills` | Skill calculator: skill point budget (level + extra sources), level every active/passive skill 1–10, cooldown and MP per skill, cooldown by level, **specialisations** (choose up to 3 per skill; slots open at effective skill level 8/12/20 = skill points + Daevanion skill nodes + manual gear levels; options need Lv. 8/12/16) |
| `#/hotbar` | Hotbar & macro, modelled on the game: 12 keys laid out like the in-game skill window (1–4 | 5–8 | Q, E, basic attack, T; stigmas fit any key, 5–8 by convention) with up to 4 skills stacked per key (row 0 at the bottom has priority); drag & drop, click to place, right-click for auto-use, cooldown overview, **cooldown test mode** (click or press the key to see the cooldowns run), a **rotation preview** that plays the macro through against a boss or normal monsters with the skill mechanics of the class (conditions, statuses, stagger, block/dodge windows, resets). The game has **one skill macro on one key** (usually the right mouse button). Like in the game, **a macro step is a hotbar key**: the key uses the first skill of its chain (row 0 at the bottom) that can be cast right now. Editor with delay per step (10 ms default), "take the attack keys", warnings (basic attack in the macro, a no-cooldown skill blocking a stack, charged skills), 30-second rotation preview |
| `#/stigma` | Stigma calculator: 4 slots (unlock at Lv. 22/27/32/37), stigma level 1–20, shard costs, specialisations at Lv. 5/10/15/20, cooldown per stigma |
| `#/daevanion` | Daevanion boards: Nezekan, Zikel, Vaizel, Triniel, Azphel (PvP, Battle Crystals); learn/unlearn with dependency cascade, Shift+click for the cheapest route, stat and skill-level totals, the **stat priority of the class** |
| `#/combos` | Hand-checked skill combos of every class (`src/data/combos/`): only real links written in the skill texts – a skill that unlocks another (Rage Burst → Overhead Slam for 10 s), a status the payoff needs (Slow → Burst Arrow), marks and stacks a skill consumes, cooldown resets and triggers. Every combo quotes its proof word for word from the English **and** German texts (the German text sometimes states a condition the English one drops), says whether it works on bosses (crowd control does not land on most bosses), how top players stack it on one key and how many of them run it, with sources. Filters for rating and content; marks which combos are ready in your build; the skill detail panel lists the combos of the selected skill |
| `#/database` | Skill database: all 315 skills with class/type filters, search, sort by cooldown. Detail panel with level stepper and three tabs: overview (stats, chain skills, combos), **specialisations** (pick any of them and see what changes: cooldown, cast time, MP, range, uses and the text effects) and the per-level table |
| `#/guides` | Guides: macro & hotbar, one guide per class (role, skills, rotation, core build, hotbar & macro), speedrun to level 45, gathering & crafting. Each guide is one file in `src/features/guides/content/` (texts in EN and DE, blocks for steps, checklists, tips, facts and sources); add it to `GUIDES` in `content/index.ts` |
| `#/community` | Community builds: upload your build (incl. hotbar and macros), browse, search, like, load into the calculator; edit or delete your own uploads |

Cooldowns are shown everywhere a skill appears: coloured badge on every icon (green < 15 s, amber < 60 s, red ≥ 60 s), in tooltips, lists and detail panels. The **cooldown reduction %** field in the build bar applies to all of them. Tooltips also show cast time, MP, the chain skills and the specialisations active in your build.

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

## Ads (optional) / Werbung

Very wide screens (from 1640 px) have room for a 300 × 600 ad column next to the content. It is off by default: without configuration no script is loaded and nothing is shown.

| Variable | Meaning |
|---|---|
| `VITE_ADSENSE_CLIENT` | AdSense publisher id, e.g. `ca-pub-1234567890123456` |
| `VITE_ADSENSE_SLOT_RAIL` | Ad unit id for the side column |

For GitHub Pages set them as repository variables `ADSENSE_CLIENT` and `ADSENSE_SLOT_RAIL` (*Settings > Secrets and variables > Actions > Variables*); `pages.yml` passes them to the build.
Add `?adpreview` to the URL (or run `npm run dev`) to see grey placeholders instead of ads.

Before switching ads on:

- Consent: visitors from the EU/UK must agree first. Set up the consent message in AdSense (*Privacy & messaging*).
- `ads.txt` must be at the root of the domain. For a GitHub project page that is the `<user>.github.io` repository, so an own domain is easier.
- A site with ads counts as commercial: in Germany it needs an imprint (Impressum) and a privacy policy.
- The site uses NCSOFT names, texts and icons without a licence; earning money with them raises the risk of a takedown.

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

All game data comes from the **global client (NA/EU)**, not the Korean service: dbaion2.ru reads its EN/DE files from the global client (the Korean client has no German texts), and the values match other global-client databases such as metabot.gg.
The data is committed in `public/data/` and the icons in `public/icons/` and `public/emblems/`, so the app runs offline.
`public/data/meta.json` records the client, the source and the newest upstream change; the app shows it as "data as of" in the footer and on the home page.

**Automatic updates:** `.github/workflows/update-data.yml` runs every 6 hours. It asks the source only for files that changed since the last run (ETag), checks that the new files are plausible, builds the site, and only then commits the new data to `main` and redeploys GitHub Pages. A run without a patch changes nothing. To update right after a patch: *Actions > Update game data > Run workflow*.
GitHub pauses scheduled workflows after 60 days without any repository activity; *Run workflow* or any push starts them again.

To refresh everything locally:

```bash
npm run data
```

This runs four scripts (`scripts/`); the first three only touch files whose content really changed:

- `fetch-data.mjs` – downloads `classes`, `skills`, `skill-costs`, `skill-points`, `daevanion` JSON in EN and DE from dbaion2.ru (drops the unused per-level effect lists from `skills.json`, about a third of its size)
- `fetch-learn-levels.mjs` – reads the level that teaches each skill and the icon the Global client shows from endgametools.com class pages, matched by skill name (dbaion2 reports level 1 for every skill and lists Korean-client icons for some skills, e.g. Cleric stigmas and Gladiator Zikel's Blessing); Brawler is not on the Global service yet and keeps level 1
- `fetch-icons.mjs` – downloads every referenced skill / specialisation / chain icon plus the class icons (skips files that already exist)
- `check-curated.mjs` – checks the hand-curated class data against the new skill texts: every combo in `src/data/combos/` quotes its effect word for word from the English and German texts, and every skill / specialisation id in `src/data/combos/` and `src/data/mechanics/` must still exist. After a patch it lists what changed (also `npm run check:curated`, which fails on errors)

Hand-curated class data (one file per class, checked by `check-curated.mjs`):

- `src/data/combos/<class>.ts` – the real combos of the class with verbatim EN + DE evidence.
- `src/data/mechanics/<class>.ts` – what the rotation simulator needs per skill: when it can be cast (status, stagger, block / parry / dodge, shortly after another skill, own state, stacks, crit, chance) and what it leaves behind.

Data notes:

- Character level: the global game currently ends at level 45 (`GAME_LEVEL_CAP` in `src/lib/levelCap.ts`); raise it there when a patch lifts the cap (e.g. to 50).
- Normal skills: levels 2–10 cost skill points (1/1/1/2/2/2/4/4/4 = 21 per skill); higher levels come from gear and Daevanion and are not purchasable here. Gear, Arcana and Daevanion push skills well past 20 (top players show up to 23 on actives and 31 on passives), so the planner allows every level the client data lists, up to 40 (`GAME_SKILL_CAP` in `src/lib/levelCap.ts`).
- Classes whose skill texts are still placeholders (`???`) in the global client are marked "not in the global game yet" (currently the Brawler); the mark disappears by itself once a patch adds the texts.
- Stigma: levels 1–20 cost 1/2/4/8 shards per 5-level band (75 per stigma, 300 for four). Superior Stigma Shards (above Lv. 20) are not modelled.
- Daevanion: node cost by grade (Common 1, Rare 2, Epic 3, Unique 4), 4-neighbour adjacency, boards cost 134/134/134/168/232 points.
- Macro (KR patch 2026-05-27, global client): one skill macro on one key, unbound by default. Each step names a hotbar key; the key uses the first skill of its chain that is ready and whose condition is met. The macro cycles through its steps and skips a key on which nothing works (order not guaranteed by the game); the basic attack is held with the left mouse button, never put in the macro; Defiance sits on Space. Delay 0–9900 ms per step, 10 ms recommended (82 % of public macros); 95 % of public macros have 5 steps or fewer. The game names no step limit; the planner caps a macro at 12 steps. The rotation preview is a simplified model: one action per second plus the step delay, expected values for chances, crowd control does not land on bosses, the boss staggers once (40–48 s) and the player blocks / dodges every 12 s.
- No damage meter: NCSOFT only allows its own in-game Combat Analysis. Reading packets, memory or the screen for an overlay is against the rules, so the app has no tracker.

## Top builds / Top-Builds

The top 10 characters of each Global class (by combat power, all regions) with their complete builds come from the public character pages of [AION2 Index](https://aion2index.com). They are committed in `public/data/top/` (`<Class>.json` plus `index.json`; format in `src/features/top/types.ts`).

- **Schedule:** `.github/workflows/update-top-builds.yml` runs daily at 04:41 UTC (or *Actions > Update top builds > Run workflow*), commits `public/data/top/` only when something changed and redeploys the site.
- **Requests:** per class the ranking page, per player the profile, the skills page and the Daevanion boards with open nodes (about 570 pages a day). `scripts/fetch-top-builds.mjs` follows `robots.txt` (the rules for `DaevaforgeBot` if it names the bot, else those for `*`; a disallowed character page drops that player, any other disallowed page stops the run), never requests URLs containing `/api/` or paths starting with `/search` or `/admin`, sends one request at a time with a 2.5–3.5 s pause (or the `Crawl-delay`) as `DaevaforgeBot/1.0`, and stops without writing anything when the site answers HTTP 429 or 5xx twice. In Actions it stops before the first page when a `Crawl-delay` would make the run longer than `TOP_BUDGET_MIN` (50) minutes, instead of being cancelled halfway by the job's 60-minute timeout.
- **Checks:** a player whose pages disagree (class, level, combat power, skill counts, board nodes) is left out; a class keeps its previous file unless 8 of its 10 players pass. Unchanged data is not rewritten, so `fetchedAt` is the last run that changed the file or, at least once a week, confirmed it.
- **Limits:** the source shows neither the chosen specialisations nor key positions, so those stay empty. Skill points and stigma shards beyond the planner's base budget go into the manual extra points; anything the import left out is listed as a note per player.
- **Locally:** `npm run top`, or `npm run top -- --class Gladiator --limit 2`; `--offline <dir>` parses saved pages instead.

**Removal:** if you do not want your character listed, [open an issue](https://github.com/Cosmic-Game-studios/aion2-toolkit/issues) with region, server and character name (or the AION2 Index link). The character goes on the `EXCLUDED` list in `scripts/fetch-top-builds.mjs` (as `region/server/name` or the AION2 Index link, percent-encoded names work too), then `npm run top -- --purge` removes it from the files in `public/data/top/` without any request; both are committed together, so the character disappears with that deploy. The daily runs skip it from then on, and the next player in the ranking takes its place.

## Credits / Rechtliches

Fan project, not affiliated with NCSOFT. AION 2 and all game assets (names, texts, icons) © NCSOFT Corporation.
Data via [dbaion2.ru](https://dbaion2.ru), learn levels, Global icon assignment and icon mirror via [endgametools.com](https://endgametools.com), top builds via [AION2 Index](https://aion2index.com).
Player numbers in the combos and guides come from the public pages of [aion2vault.com](https://aion2vault.com) (questlog.gg public builds), [metabot.gg](https://metabot.gg), [cielui.com](https://cielui.com) and [aion2-meta.com](https://aion2-meta.com), plus the guides of the creators named in each class file; numbers only, no copied text.
