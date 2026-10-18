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
| `#/skills` | Skill calculator: skill point budget (level + extra sources), level every active/passive skill 1–10 with skill points, then up to **Lv. 40** with Daevanion skill nodes and the **gear & Arcana** levels you enter per skill (texts, cooldowns and tiles everywhere follow this effective level), cooldown and MP per skill, cooldown by level, **specialisations** (choose up to 3 per skill; slots open at effective skill level 8/12/20; options need Lv. 8/12/16) |
| `#/hotbar` | Hotbar & macro, modelled on the game: 12 keys laid out like the in-game skill window (1–4 | 5–8 | Q, E, basic attack, T; stigmas fit any key, 5–8 by convention) with up to 4 skills stacked per key (row 0 at the bottom has priority); drag & drop, click to place, right-click for auto-use, cooldown overview, **cooldown test mode** (click or press the key to see the cooldowns run), a **rotation preview** that plays the macro through against a boss or normal monsters with the skill mechanics of the class (conditions, statuses, stagger, block/dodge windows, resets). The game has **one skill macro on one key** (usually the right mouse button). Like in the game, **a macro step is a hotbar key**: the key uses the first skill of its chain (row 0 at the bottom) that can be cast right now. Editor with delay per step (10 ms default), "take the attack keys", warnings (basic attack in the macro, a no-cooldown skill blocking a stack, charged skills), 30-second rotation preview |
| `#/stigma` | Stigma calculator: 4 slots (unlock at Lv. 22/27/32/37), stigma level 1–20, shard costs, specialisations at Lv. 5/10/15/20, cooldown per stigma |
| `#/daevanion` | Daevanion boards: Nezekan, Zikel, Vaizel, Triniel, Azphel (PvP, Battle Crystals); learn/unlearn with dependency cascade, Shift+click for the cheapest route, stat and skill-level totals, the **stat priority of the class** |
| `#/combos` | Hand-checked skill combos of every class (`src/data/combos/`): only real links written in the skill texts – a skill that unlocks another (Rage Burst → Overhead Slam for 10 s), a status the payoff needs (Slow → Burst Arrow), marks and stacks a skill consumes, cooldown resets and triggers. Every combo quotes its proof word for word from the English **and** German texts (the German text sometimes states a condition the English one drops), says whether it works on bosses (crowd control does not land on most bosses), how top players stack it on one key and how many of them run it, with sources. Filters for rating and content; marks which combos are ready in your build; the skill detail panel lists the combos of the selected skill |
| `#/database` | Skill database: all 315 skills with class/type filters, search, sort by cooldown. Detail panel with level stepper and three tabs: overview (stats, chain skills, combos), **specialisations** (pick any of them and see what changes: cooldown, cast time, MP, range, uses and the text effects) and the per-level table |
| `#/guides` | Guides: macro & hotbar, highest Combat Power (what drives it, the order, enhancement odds and costs, Arcana, class differences), one guide per class (role, skills, rotation, core build, hotbar & macro, what its top 10 wear and level for Combat Power, links to the class guide and build lists on questlog.gg), speedrun to level 45, gathering & crafting, farming & power (Kina, item level, Combat Power, AP; with a printable PDF in `public/guides/`), pets (collection, Owned Effects, Genus Insight). Each guide is one file in `src/features/guides/content/` (texts in EN and DE, blocks for steps, checklists, tables, tips, facts, links and downloads, and sources); add it to `GUIDES` in `content/index.ts` |
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

**Styling:** `src/styles.css` is the hand-written design system (tokens, components). [Tailwind CSS v4](https://tailwindcss.com) runs next to it for new or rebuilt parts. Its classes carry the prefix `tw:` (`tw:flex`, `tw:md:grid-cols-2`) so they never clash with the existing class names. The design tokens are mapped to Tailwind names (`tw:bg-surface-2`, `tw:text-muted`, `tw:font-heading`). The breakpoints are the ones of `styles.css` (`sm` 641, `md` 901, `lg` 1200, `xl` 1440 px). Setup and layer order are in `src/index.css`.

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

**Updates:** `.github/workflows/update-data.yml` (its 6-hourly schedule is paused: dbaion2's terms of 27 Sep 2026 forbid automated collection without written permission, so it runs only by hand). It asks the source only for files that changed since the last run (ETag), checks that the new files are plausible, builds the site, and only then commits the new data to `main` and redeploys GitHub Pages. A run without a patch changes nothing. To update right after a patch: *Actions > Update game data > Run workflow*.
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

## Farm map / Farmkarte

`#/farm` shows farm spots per region for Elyos, Asmodians and the Abyss: gathering nodes (ore, gems, plants, cooking ingredients, wood, Odyle), monsters and their drops, elites and bosses, hidden cubes, Empyrean traces and chests, Kibelisks (teleports), villages, dungeon entrances and strongholds. The spots come from three sources: **players** who saw them in the game (`public/data/farm/spots.json`), the **[AION2 Interactive Map](https://github.com/aion2-interactive-map/aion2-interactive-map)** data (`public/data/farm/tcimba.json`) and the gathering points of the **[Aion 2 - Map Overlay](https://github.com/problem-xyz/aion2-map-overlay)** (`public/data/farm/gathering.json`). Regions, categories, limits and the checks are in `src/features/farm/farmRules.ts`.

- **Submitting:** players note spots on the page (kept as drafts in their browser) and submit them. That opens a prefilled GitHub issue (form `.github/ISSUE_TEMPLATE/farm-spot.yml`, label `farm-spot`, at most 20 spots per issue; longer lists become several issues). Players need a GitHub account, and their GitHub name is public. A draft stays in the browser until its spot is in `spots.json`.
- **Approving:** check the spots in the issue, then add the label `farm-approved`. `.github/workflows/farm-spots.yml` runs `scripts/farm-import.mjs`, which reads the issue from the event file (never through the shell), checks every spot with `checkSpot`, skips duplicates (same draft id, or same region, category and name with nearly the same position or the same place text) and adds the rest with the id `<issue>-<n>` and the date. The job builds the site, commits `spots.json` to `main`, comments a summary, closes the issue and redeploys Pages. When nothing can be added (box not ticked, no readable list, more than 20 spots, every spot refused or a duplicate), it comments why, removes `farm-approved` and leaves the issue open; when the import fails, it comments a link to the run. To retry, add the label again.
- **One at a time:** imports run one after another, each on the newest `main`. Approvals made meanwhile wait their turn (`queue: max`, up to 100), so approving several issues in a row drops none. If a run fails after its push (only the comment or the closing), the spots are in and the site is still redeployed; comment on and close that issue by hand.
- **Labels:** create `farm-spot`, `farm-approved` and `farm-report` once (*Issues > Labels*). A form does not create its label, and an issue without `farm-spot` is never imported. Only people who can label issues can approve.
- **Reports, editing and removing:** every spot has a *Report a problem* link (form `farm-report.yml`, label `farm-report`, prefilled with the spot id). Fix or delete the spot by hand in `public/data/farm/spots.json` (one spot per line, valid JSON) and push to `main`; that redeploys the site. Never change or reuse an id: report links name a spot by it. Approving an issue again adds every spot of it that is not in the file, so a spot removed by hand comes back that way.
- **Locally:** `node --experimental-strip-types scripts/farm-import.mjs --event event.json`, where `event.json` holds at least `{"issue":{"number":12,"body":"..."}}` with the body GitHub writes from the form (the spots in a fenced `json` block and the ticked box). `--spots <file>` (read and written) and `--summary <file>` point it at other files; the summary goes to `farm-summary.md` in the repository root by default, which must not be committed. Exit code 0 = spots added, 3 = nothing to add, 1 = broken event or spots file.
- **AION2 Interactive Map data:** hidden cubes, Empyrean traces (called monoliths in that data), Kibelisks (teleports there; the category id stays `teleport`), villages, dungeon entrances (exploration seals there) and strongholds (occupation sites there: enemy outposts and camps) of Verteron, Altgard and Lower Reshanta, plus the area borders. `node scripts/farm-tcimba.mjs <checkout>` (`npm run data:farm-tcimba -- <checkout>`) reads a checkout of that repository (`LICENSE` and `public/data` are enough, e.g. a sparse checkout) and writes `public/data/farm/tcimba.json` and the region pictures `public/maps/<region>.svg` (the area outlines as plain shapes). It refuses to run when the repository's licence for `/public/data` is no longer CC BY-NC 4.0. Battlefields are left out until it is clear what they are in the game. Dungeon entrances and strongholds keep their names from the data, spaced out (a few misspelt ones are fixed in `NAME_FIX`; the data drops apostrophes, "Konutins Cave", and they are not guessed back, but the search ignores apostrophes). The data date the page shows is the last change of the marker and area files read, not the repository's newest commit (`--data-date` sets it when the script runs with `--commit` instead of git). Spot ids are `tc-…`; to drop a wrong one, add it to `EXCLUDE` in the script and run it again. Ids stay stable across updates: the script reads the previous `tcimba.json`, and when an upstream id is gone and a new spot of the same category appears within 8 px (in the box's pixel grid), the new spot keeps the old id; it prints each carried id, so check that it really is the same spot. Found marks, links and report links name spots by these ids. `--check` writes nothing and exits with 2 when `tcimba.json` or a region picture would change, 0 when everything is up to date and 1 on an error (for CI).
  - **Licence:** that data is © Yihao Liu (tc-imba) and contributors, [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). Changes made here: positions converted to this site's region pictures, the area borders drawn as plain outlines, only the six spot types above, area, dungeon and stronghold names spaced out from their ids (a few typos fixed). The farm page names the source, the licence, the changes and the data date. Positions are from the KR/TW client and may differ on Global; the page says so, and every hidden cube card too. **Non-commercial only:** the page does not load this data in a build with ads (`VITE_ADSENSE_CLIENT`); remove it before turning ads on. Never use that repository's map tiles, icons, marker screenshots, `public/locales` or `src` code: they are not under that licence.
- **Map Overlay gathering points:** the ore, gems, plants, wood, Odyle and cooking ingredients of Verteron and Altgard, about 2,700 per region. `node scripts/farm-gathering.mjs <overlay checkout> <interactive map checkout>` (`npm run data:farm-gathering -- …`) reads only the `gathering-*` categories and their nodes from `assets/object-sets/verteron.json` and `altgard.json` of an aion2-map-overlay checkout (`NOTICE` and `assets/object-sets` are enough), takes the area borders from the AION2 Interactive Map checkout as `farm-tcimba.mjs` does, and writes `public/data/farm/gathering.json`. It refuses to run when the overlay's `NOTICE` no longer puts those files under CC BY-NC 4.0 with the AION2 Interactive Map as their source, or when the other repository's `LICENSE` changed (as above); the day the overlay retrieved the points comes from that `NOTICE`. Each material (the overlay's category name) goes into one of our categories through `MATERIAL` in the script; a new material stops the script until it is added there. The Altgard materials are sorted by the upstream order, not by a hint in the data, so check them in the game when you can. Positions: the overlay gives percentages of the 8192 × 8192 map layer from its top-left corner, which the script turns into the AION2 Interactive Map's pixels (y up from the bottom) and then into fractions of the region box, like every tc-imba marker; nodes outside the box are left out. Ids are `px-` and 8 hex digits of a hash of region, material and position (the overlay's own ids only number the nodes and shift when one is added), kept stable across updates like the `tc-…` ids (same material within 8 px). On the page the points are named after their material and numbered per area ("Orichalcum #3"); the filters list the materials of a category that has several, and hidden materials go into the same filter state and `l=` link parameter as the categories (`gem:ruby`). Gathering points respawn, so they cannot be marked found and do not count toward the progress. `--check` works as for `farm-tcimba.mjs`.
  - **Licence:** the overlay's gathering points are adapted from the marker data the AION2 Interactive Map's site serves, © Yihao Liu (tc-imba) and contributors, and shared by problem-xyz under the same [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). Changes made here: positions converted to fractions of this site's region pictures, areas assigned from the AION2 Interactive Map borders, materials grouped into this site's categories, ids shortened. The farm page names both projects, the licence, these changes and the retrieval date, and says that the positions are from the KR/TW client. **Non-commercial only**, like `tcimba.json`: the page does not load `gathering.json` in a build with ads. Never use anything else of that repository: not its hidden cube spots (they are not upstream data), not its map images, not its code.
- **Progress and links:** players can mark any spot (not a draft, not a Map Overlay gathering point) as found, on its card or with **F** on the map. Found spots are kept in the browser only (storage key `farm:found:v1`, per region), are drawn dimmed, can be hidden, and are counted per category; *Reset region* forgets one region. *Save or load* moves the progress to another browser as a code (`DF1Z.` deflate-raw compressed JSON, or `DF1J.` plain JSON where the browser cannot compress; base64url) or a JSON file, both made and read in the browser and checked strictly (known regions, spot-like ids, size limits). The address follows the page: `#/farm/<region>?m=<spot>&v=<x>,<y>,<zoom>&l=<hidden categories>` (x and y are the middle of the view as fractions of the picture), replaced without a history entry. A link's categories count for that visit only, until the player keeps them. *Copy link* on the selected spot copies an address that opens the map zoomed in on it.
- **Map pictures:** Verteron, Altgard and Lower Reshanta have a picture (the outlines above); `world` on the region in `REGIONS` names the AION2 Interactive Map's map and the part of its pixel grid the picture shows (`box`), and the picture is half that size. Positions of all spots, the players' too, are fractions of that box, so **never change a box** once spots are placed. Another picture (for example an in-game screenshot) must show exactly the same box. A region without a picture lists its spots with their place in words; a picture for it goes to `public/maps/<region>.svg` or `.webp` with `image: { src, w, h }` on the region, and the map and the position picker then appear by themselves.

## Credits / Rechtliches

Fan project, not affiliated with NCSOFT. AION 2 and all game assets (names, texts, icons) © NCSOFT Corporation.
Data via [dbaion2.ru](https://dbaion2.ru), learn levels, Global icon assignment and icon mirror via [endgametools.com](https://endgametools.com), top builds via [AION2 Index](https://aion2index.com).
Farm map: hidden cubes, Empyrean traces, Kibelisks, villages, dungeon entrances, strongholds and area outlines from the [AION2 Interactive Map](https://github.com/aion2-interactive-map/aion2-interactive-map) data by Yihao Liu (tc-imba) and contributors, [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/), converted to this site's maps (see *Farm map*). Gathering points from the [Aion 2 - Map Overlay](https://github.com/problem-xyz/aion2-map-overlay) by problem-xyz ([CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)), adapted from the [AION2 Interactive Map](https://github.com/aion2-interactive-map/aion2-interactive-map) data by tc-imba; changed here: positions converted to fractions of this site's region pictures, areas assigned from the AION2 Interactive Map borders, materials grouped into this site's categories, ids shortened.
Farmkarte: Sammelpunkte aus dem [Aion 2 - Map Overlay](https://github.com/problem-xyz/aion2-map-overlay) von problem-xyz ([CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)), bearbeitet aus den Daten der [AION2 Interactive Map](https://github.com/aion2-interactive-map/aion2-interactive-map) von tc-imba; hier geändert: Positionen in Anteile der Regionsbilder umgerechnet, Gebiete nach den Grenzen der AION2 Interactive Map zugeordnet, Materialien in die Kategorien dieser Seite eingeordnet, IDs gekürzt.
Player numbers in the combos and guides come from the public pages of [aion2vault.com](https://aion2vault.com) (questlog.gg public builds), [metabot.gg](https://metabot.gg), [cielui.com](https://cielui.com) and [aion2-meta.com](https://aion2-meta.com), plus the guides of the creators named in each class file; numbers only, no copied text.
