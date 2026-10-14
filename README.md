# AION 2 Toolkit

Web tools for **AION 2** (NCSOFT): Skill Calculator with Skill Database, Stigma Calculator and Daevanion Board Planner.
Interface and game texts in **English and German** (switch top right).

Web-Tools für **AION 2**: Skill-Rechner mit Skill-Datenbank, Stigma-Rechner und Daevanion-Tafel-Planer.
Oberfläche und Spieltexte auf **Englisch und Deutsch** (Umschalter oben rechts).

## Tools

| Route | What it does |
|---|---|
| `#/skills` | Skill Calculator: class, character level, skill point budget (level + extra sources), level every active/passive skill 1–10, skill bar with 12 slots, saved builds, share link |
| `#/database` | Skill Database: all 315 skills of the 9 classes with icons, filters, search, per-level table, specialisations and chain skills |
| `#/stigma` | Stigma Calculator: 4 slots (unlock at Lv. 22/27/32/37), stigma level 1–20, shard costs per level and total, budget from character level + manual extra shards, specialisations at Lv. 5/10/15/20 |
| `#/daevanion` | Daevanion Boards: Nezekan, Zikel, Vaizel, Triniel, Azphel on a 15×15 grid; learn/unlearn with dependency cascade, Shift+click for the cheapest route, stat and skill-level totals, point budgets |

## Setup / Einrichtung

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/ (relative paths, works on GitHub Pages or any static host)
npm run preview    # serve the build locally
```

## Game data / Spieldaten

All game data is committed in `public/data/` and the icons in `public/icons/` and `public/emblems/`, so the app runs offline.
After a game patch, refresh everything with:

```bash
npm run data
```

This runs three scripts (`scripts/`):

- `fetch-data.mjs` – downloads `classes`, `skills`, `skill-costs`, `skill-points`, `daevanion` JSON in EN and DE from dbaion2.ru
- `fetch-learn-levels.mjs` – reads the level that teaches each skill from endgametools.com class pages (dbaion2 reports level 1 for every skill); Brawler is not on the Global service yet and keeps level 1
- `fetch-icons.mjs` – downloads every referenced skill / specialisation / chain icon plus the class icons (skips files that already exist)

Data notes:

- Normal skills: levels 2–10 cost skill points (1/1/1/2/2/2/4/4/4 = 21 per skill); higher levels come from gear and Daevanion and are not purchasable here.
- Stigma: levels 1–20 cost 1/2/4/8 shards per 5-level band (75 per stigma, 300 for four). Superior Stigma Shards (above Lv. 20) are not modelled.
- Daevanion: node cost by grade (Common 1, Rare 2, Epic 3, Unique 4), 4-neighbour adjacency, boards cost 134/134/134/168/232 points.

## Credits / Rechtliches

Fan project, not affiliated with NCSOFT. AION 2 and all game assets (names, texts, icons) © NCSOFT Corporation.
Data via [dbaion2.ru](https://dbaion2.ru), learn levels and icon mirror via [endgametools.com](https://endgametools.com).
