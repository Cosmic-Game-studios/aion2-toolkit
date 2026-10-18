import { classGuide } from './classGuide';
import { chanterPlaystyles } from './playstyle-chanter';

export const chanterGuide = classGuide({
  id: 'chanter',
  cls: 'Chanter',
  tone: 'teal',
  title: { de: 'Kantor-Guide', en: 'Chanter guide' },
  summary: {
    de: "Der Kantor macht die ganze Gruppe stärker und kämpft dabei mit dem Stab im Nahkampf. Hier lernst du Schritt für Schritt Mantras, Rotation, Build und Makro.",
    en: "The Chanter makes the whole group stronger and fights up close with a staff. Learn mantras, rotation, build and macro step by step.",
  },
  tags: [
    { de: 'Unterstützer', en: 'Support' },
    { de: 'Nahkampf', en: 'Melee' },
    { de: 'Einsteiger', en: 'Beginner' },
  ],
  updated: '2026-10-19',
  glance: [
    {
      label: { de: 'Rolle', en: 'Role' },
      value: {
        de: "**Unterstützer** mit Stab: stärkt die ganze Gruppe, macht im Nahkampf guten Schaden und heilt zur Not mit",
        en: "**Support** with a staff: makes the whole group stronger, deals good damage up close and heals as a backup",
      },
    },
    { label: { de: 'Schwierigkeit', en: 'Difficulty' }, value: { de: 'Mittel', en: 'Medium' } },
    {
      label: { de: 'Reichweite', en: 'Range' },
      value: { de: "Nahkampf – Grundattacke und Füller bis 4 m, deine Hauptschläge bis 20 m", en: "Melee – basic attack and filler up to 4 m, your main hits up to 20 m" },
    },
    {
      label: { de: 'Stärken', en: 'Strengths' },
      value: {
        de: "Die besten Gruppen-Buffs, solider Schaden, Schilde, stark allein unterwegs",
        en: "The best group buffs, solid damage, shields, strong when playing solo",
      },
    },
    {
      label: { de: 'Schwächen', en: 'Weaknesses' },
      value: {
        de: "Nahkampf, kurze Zeitfenster von 2–3 Sekunden für [[18100000|Dark Crush]], muss nah bei der Gruppe bleiben, Buffs überschneiden sich mit dem Kleriker",
        en: "Melee, short 2–3 second windows for [[18100000|Dark Crush]], has to stay close to the group, buffs overlap with the Cleric's",
      },
    },
  ],
  forWhom: {
    de: "du deine ganze Gruppe stärker machen willst, gern mittendrin kämpfst und kurze Zeitfenster gut im Blick behältst.",
    en: "you want to make your whole group stronger, like to fight right in the middle of things and are good at catching short timing windows.",
  },
  party: {
    dungeon: [
      {
        de: "**Mantra an:** Ein **Mantra** ist ein Dauer-Buff (Verstärkung), den du einmal anschaltest. [[18190000|Undefeated Mantra]] gibt allen in der Nähe mehr Schaden und weniger erlittenen Schaden – deshalb nehmen Gruppen einen Kantor mit.",
        en: "**Mantra on:** a **mantra** is a lasting buff (an effect that makes you stronger) that you switch on once. [[18190000|Undefeated Mantra]] gives everyone nearby more damage and less damage taken – that is why groups bring a Chanter.",
      },
      {
        de: "**Burst für alle:** [[18250000|Power of the Storm]] macht die Gruppe schneller (Kampftempo) und senkt ihre Abklingzeiten (die Wartezeit, bis ein Skill wieder geht). Nutze diesen Buff, wenn alle ihre großen Skills einsetzen.",
        en: "**Burst for everyone:** [[18250000|Power of the Storm]] makes the group faster (Combat Speed) and lowers their cooldowns (the wait until a skill works again). Fire it when everyone uses their big skills.",
      },
      {
        de: "**Schaden:** Dein Hauptschlag ist [[18100000|Dark Crush]]. Er geht nur kurz nach [[18060000|Impactful Crush]], [[18290000|Spinning Strike]] oder [[18330000|Marchutan's Wrath]].",
        en: "**Damage:** your main hit is [[18100000|Dark Crush]]. It only works shortly after [[18060000|Impactful Crush]], [[18290000|Spinning Strike]] or [[18330000|Marchutan's Wrath]].",
      },
      {
        de: "**Zur Not heilen:** [[18120000|Recuperation]] heilt die Gruppe, heilt danach noch ein paar Sekunden weiter (**Heilung über Zeit**) und entfernt einen Debuff (eine Schwächung). Dein Passiv [[18730000|Protection Circle]] gibt der Gruppe nach 10 Treffern einen kleinen Schild.",
        en: "**Backup healing:** [[18120000|Recuperation]] heals the group, keeps healing for a few more seconds (**heal over time**) and removes a debuff (a weakening effect). Your passive [[18730000|Protection Circle]] gives the group a small shield after 10 hits.",
      },
      {
        de: "**Nah bei der Gruppe bleiben:** Deine Mantras wirken nur auf Mitspieler in der Nähe, deine Heilungen reichen 40 m.",
        en: "**Stay close to the group:** your mantras only reach group members nearby, your heals reach 40 m.",
      },
    ],
    boss: {
      de: "Zünde [[18250000|Power of the Storm]], wenn die Gruppe ihren Burst startet – am besten kurz bevor der Boss **taumelt**. Viele Skills füllen seine Taumel-Leiste; ist sie voll, taumelt er kurz. Nur dann geht [[18300000|Gust Rampage]]. Mit der Stufe-12-Option sorgt [[18080000|Wave Blow]] außerdem dafür, dass der Boss 10 Sekunden lang weniger Schaden macht. Gegen Bosse, die sich nicht betäuben lassen, kommt er aber nur ab und zu: Dort wird [[18080000|Wave Blow]] nur mit 7 % Chance bei deinen Treffern frei.",
      en: "Fire [[18250000|Power of the Storm]] when the group starts its burst – ideally just before the boss **staggers**. Many skills fill its stagger bar; when it is full, the boss staggers for a moment. Only then does [[18300000|Gust Rampage]] work. With its level 12 option, [[18080000|Wave Blow]] also makes the boss deal less damage for 10 seconds. Against bosses that cannot be stunned, though, it only comes up now and then: there [[18080000|Wave Blow]] unlocks with a 7% chance on your hits.",
    },
    pvp: {
      de: "Zum PvP gibt es noch wenig Erfahrung. Gern genommen werden [[18330000|Marchutan's Wrath]], [[18130000|Fracturing Blow]], [[18420000|Guardian Blessing]] und [[18190000|Undefeated Mantra]]. [[18200000|Defiance]] auf der Leertaste befreit dich aus Betäubungen. Nach einem Ausweichen bringt dich [[18210000|Tremor Crush]] zurück zum Gegner und kann ihn betäuben (50 % Chance) – dann wirft ihn [[18080000|Wave Blow]] zu Boden. Für PvP gibt es die Tafel Azphel, die du mit Kampfkristallen bezahlst.",
      en: "There is little PvP experience so far. Popular picks are [[18330000|Marchutan's Wrath]], [[18130000|Fracturing Blow]], [[18420000|Guardian Blessing]] and [[18190000|Undefeated Mantra]]. [[18200000|Defiance]] on Space frees you from stuns. After a dodge, [[18210000|Tremor Crush]] takes you back to the enemy and can stun it (50% chance) – then [[18080000|Wave Blow]] knocks it down. For PvP there is the Azphel board, which you pay with Battle Crystals.",
    },
    solo: {
      de: "Allein bist du stark. Mit der Stufe-12-Option setzt [[18090000|Rushing Smash]] seine Abklingzeit zurück, wenn ein Gegner stirbt – so stürmst du von Gegner zu Gegner. [[18010000|Onslaught]] gibt dir MP zurück, [[18120000|Recuperation]] heilt auch dich.",
      en: "You are strong on your own. With its level 12 option, [[18090000|Rushing Smash]] resets its cooldown when an enemy dies – so you rush from enemy to enemy. [[18010000|Onslaught]] gives you MP back, [[18120000|Recuperation]] heals you too.",
    },
  },
  skills: [
    {
      id: 18190000 /* Undefeated Mantra */,
      note: {
        de: "Stigma und der Grund, warum Gruppen einen Kantor wollen: Alle machen mehr Schaden und nehmen weniger. Einmal anschalten. Stigmen gibt es ab Stufe 22.",
        en: "Stigma and the reason groups want a Chanter: everyone deals more damage and takes less. Switch it on once. Stigmas unlock at level 22.",
      },
    },
    {
      id: 18100000 /* Dark Crush */,
      note: {
        de: "Dein Hauptschlag. Geht nur 2 Sekunden lang nach [[18060000|Impactful Crush]] oder [[18290000|Spinning Strike]] (3 Sekunden nach [[18330000|Marchutan's Wrath]]). Ab Stufe 4.",
        en: "Your main hit. Only works for 2 seconds after [[18060000|Impactful Crush]] or [[18290000|Spinning Strike]] (3 seconds after [[18330000|Marchutan's Wrath]]). From level 4.",
      },
    },
    {
      id: 18290000 /* Spinning Strike */,
      note: {
        de: "Großer Treffer auf bis zu 4 Gegner. Gibt dir mehr kritischen Schaden und öffnet [[18100000|Dark Crush]]. Ab Stufe 14.",
        en: "Big hit on up to 4 enemies. Gives you more critical damage and opens [[18100000|Dark Crush]]. From level 14.",
      },
    },
    {
      id: 18060000 /* Impactful Crush */,
      note: {
        de: "Betäubt den Gegner (Monster immer) und öffnet [[18100000|Dark Crush]]. Ab Stufe 3.",
        en: "Stuns the enemy (monsters always) and opens [[18100000|Dark Crush]]. From level 3.",
      },
    },
    {
      id: 18010000 /* Onslaught */,
      note: {
        de: "Deine Grundattacke: linke Maustaste gedrückt halten. Jeder Treffer gibt dir MP zurück. Ab Stufe 1.",
        en: "Your basic attack: hold the left mouse button. Every hit gives you MP back. From level 1.",
      },
    },
    {
      id: 18040000 /* Incandescent Blow */,
      note: {
        de: "**Füller:** ein Skill ohne Abklingzeit für die Lücken. Ab Stufe 1.",
        en: "**Filler:** a skill without a cooldown for the gaps. From level 1.",
      },
    },
    {
      id: 18120000 /* Recuperation */,
      note: {
        de: "Heilt die Gruppe, heilt danach 8 Sekunden lang weiter und entfernt einen Debuff. Ab Stufe 8.",
        en: "Heals the group, keeps healing for 8 more seconds and removes a debuff. From level 8.",
      },
    },
    {
      id: 18250000 /* Power of the Storm */,
      note: {
        de: "Stigma: Die Gruppe wird kurz schneller, und ihre Skills sind früher wieder bereit. Für Burst-Phasen.",
        en: "Stigma: the group gets faster for a short time, and their skills are ready again sooner. For burst phases.",
      },
    },
  ],
  rotation: {
    intro: {
      de: "Als Kantor stärkst du zuerst die Gruppe, dann schlägst du zu. Dein Schaden kommt in kurzen Fenstern: erst ein Skill, der [[18100000|Dark Crush]] öffnet, dann sofort [[18100000|Dark Crush]].",
      en: "As a Chanter you first make the group stronger, then you strike. Your damage comes in short windows: first a skill that opens [[18100000|Dark Crush]], then [[18100000|Dark Crush]] right away.",
    },
    flow: {
      items: [
        {
          title: { de: 'Vor dem Kampf', en: 'Before the pull' },
          text: { de: '[[18190000|Undefeated Mantra]] anschalten', en: 'Switch on [[18190000|Undefeated Mantra]]' },
          tag: { de: 'Taste 8', en: 'Key 8' },
          tone: 'blue',
        },
        {
          title: { de: 'Hinstürmen', en: 'Rush in' },
          text: { de: '[[18090000|Rushing Smash]] bringt dich zum Boss und gibt 100 MP', en: '[[18090000|Rushing Smash]] takes you to the boss and gives 100 MP' },
          tag: { de: 'Taste 4', en: 'Key 4' },
          tone: 'slate',
        },
        {
          title: { de: 'Gruppen-Buff', en: 'Group buff' },
          text: { de: '[[18250000|Power of the Storm]], wenn die Gruppe loslegt', en: '[[18250000|Power of the Storm]] when the group starts its burst' },
          tag: { de: 'Taste 6', en: 'Key 6' },
          tone: 'blue',
        },
        {
          title: { de: 'Fenster öffnen', en: 'Open the window' },
          text: { de: '[[18290000|Spinning Strike]] öffnet das Fenster – sofort [[18100000|Dark Crush]]', en: '[[18290000|Spinning Strike]] opens the window – [[18100000|Dark Crush]] right after' },
          tag: { de: 'Taste 1', en: 'Key 1' },
          tone: 'gold',
        },
        {
          title: { de: 'Wieder öffnen, dann Makro', en: 'Reopen, then macro' },
          text: { de: "[[18060000|Impactful Crush]] und [[18330000|Marchutan's Wrath]] öffnen es erneut, jedes Mal folgt [[18100000|Dark Crush]]; dann das Makro", en: "[[18060000|Impactful Crush]] and [[18330000|Marchutan's Wrath]] open it again, each followed by [[18100000|Dark Crush]]; then the macro" },
          tag: { de: 'Tasten 1 · 7', en: 'Keys 1 · 7' },
          tone: 'gold',
        },
      ],
    },
    blocks: [
      {
        title: { de: 'Eröffnung (von Hand)', en: 'Opener (by hand)' },
        steps: [
          { id: 18190000 /* Undefeated Mantra */, note: { de: 'Vor dem Kampf anschalten', en: 'Switch it on before the pull' } },
          { id: 18090000 /* Rushing Smash */, note: { de: 'Hinstürmen – gibt 100 MP', en: 'Rush in – gives 100 MP' } },
          { id: 18250000 /* Power of the Storm */, note: { de: 'Wenn die Gruppe loslegt', en: 'When the group starts its burst' } },
          { id: 18290000 /* Spinning Strike */, note: { de: 'Großer Treffer – öffnet das Fenster', en: 'Big hit – opens the window' } },
          { id: 18100000 /* Dark Crush */, note: { de: 'Sofort hinterher', en: 'Right after' } },
          { id: 18060000 /* Impactful Crush */, note: { de: 'Betäubt und öffnet das Fenster wieder – sobald Dark Crush wieder bereit ist', en: 'Stuns and opens the window again – once Dark Crush is ready again' } },
          { id: 18100000 /* Dark Crush */, note: { de: 'Sofort hinterher', en: 'Right after' } },
          { id: 18330000 /* Marchutan's Wrath */, note: { de: 'Stigma – öffnet das Fenster für 3 Sekunden', en: 'Stigma – opens the window for 3 seconds' } },
          { id: 18100000 /* Dark Crush */, note: { de: 'Sofort hinterher', en: 'Right after' } },
        ],
      },
      {
        title: { de: 'Danach: Makro + linke Maustaste – das kommt zuerst', en: 'After that: macro + left mouse button – this comes first' },
        steps: [
          { id: 18100000 /* Dark Crush */, note: { de: 'Immer, wenn er geht', en: 'Whenever it works' } },
          { id: 18060000 /* Impactful Crush */, note: { de: 'Öffnet deinen Hauptschlag', en: 'Opens your main hit' } },
          { id: 18290000 /* Spinning Strike */, note: { de: 'Öffnet deinen Hauptschlag', en: 'Opens your main hit' } },
          { id: 18330000 /* Marchutan's Wrath */, note: { de: 'Öffnet deinen Hauptschlag', en: 'Opens your main hit' } },
          { id: 18150000 /* Heat Wave Blow */, note: { de: 'Nur nach einem Block – dann nimmt ihn das Makro', en: 'Only after you block – then the macro uses it' } },
          { id: 18010000 /* Onslaught */, note: { de: 'Grundattacke – die ganze Zeit halten', en: 'Basic attack – hold it all the time' } },
          { id: 18040000 /* Incandescent Blow */, note: { de: 'Füller auf Taste T', en: 'Filler on key T' } },
          { id: 18300000 /* Gust Rampage */, note: { de: 'Nur, wenn der Boss taumelt', en: 'Only while the boss staggers' } },
          { id: 18120000 /* Recuperation */, note: { de: 'Wenn LP sinken oder ein Debuff liegt', en: 'When HP drops or a debuff is on the group' } },
        ],
      },
    ],
    tips: [
      {
        de: "**Mantras sind Schalter:** Ein zweiter Druck schaltet sie wieder aus. Einmal anschalten – und nie ins Makro.",
        en: "**Mantras are switches:** a second press turns them off again. Switch them on once – and never put them in the macro.",
      },
      {
        de: "**Nicht doppelt buffen:** Mantras von zwei Kantoren wirken nicht zusammen. [[18190000|Undefeated Mantra]] wirkt auch nicht zusammen mit „Licht des Schutzes“, dem Gruppen-Buff des Klerikers: Es zählt der Skill mit der höheren Stufe, bei gleicher Stufe deiner. Und dein Passiv [[18780000|Earth's Promise]] wirkt nicht zusammen mit der „Kette des Schmerzes“ des Klerikers.",
        en: "**Do not double up:** mantras from two Chanters do not stack. [[18190000|Undefeated Mantra]] also does not stack with Light of Protection, the Cleric's group buff: the skill with the higher level counts, at the same level yours. And your passive [[18780000|Earth's Promise]] does not work together with the Cleric's Chain of Torment.",
      },
      {
        de: "**[[18250000|Power of the Storm]] absprechen:** Laut Skilltext verträgt sich dieser Buff nicht mit „Segen der Erde“, dem Gruppen-Buff, den der Kleriker über sein Stigma „Strafe der Erde“ verteilt. Sprich dich mit deinem Kleriker ab.",
        en: "**Coordinate [[18250000|Power of the Storm]]:** according to the skill text it does not work together with Earth's Blessing, the group buff the Cleric gives through the stigma Earth Punishment. Talk to your Cleric.",
      },
      {
        de: "**Vor der Stufe-16-Option von [[18100000|Dark Crush]]:** Er wartet nach jedem Einsatz 5 s. Ein Fenster, das in dieser Zeit aufgeht, ist verloren – lass also etwa 5 s zwischen zwei Skills, die ihn öffnen.",
        en: "**Before the level 16 option of [[18100000|Dark Crush]]:** it waits 5 s after every use. A window that opens during that time is lost – so leave about 5 s between two skills that open it.",
      },
      {
        de: "**Bleib nah dran:** Mantras erreichen nur Mitspieler in der Nähe. Wer weit weg kämpft, verliert den Buff.",
        en: "**Stay close:** mantras only reach group members nearby. Anyone fighting far away loses the buff.",
      },
    ],
  },
  build: {
    intro: {
      de: "Mit Skillpunkten bringst du einen Skill bis Stufe 10. Höhere Stufen kommen von den Daevanion-Tafeln und der Ausrüstung. **Stigmen** sind besondere Skills für deine 4 Stigma-Plätze; du bekommst sie ab Stufe 22.",
      en: "Skill points take a skill up to level 10. Higher levels come from the Daevanion boards and your gear. **Stigmas** are special skills for your 4 stigma slots; you get them from level 22.",
    },
    points: [
      { de: "Zuerst [[18100000|Dark Crush]] (ab Stufe 4) und [[18010000|Onslaught]] – dein Hauptschlag und deine Grundattacke", en: "First [[18100000|Dark Crush]] (level 4) and [[18010000|Onslaught]] – your main hit and your basic attack" },
      { de: "Dann [[18290000|Spinning Strike]], sobald du ihn mit Stufe 14 lernst", en: "Then [[18290000|Spinning Strike]] as soon as you learn it at level 14" },
      { de: "Dann [[18040000|Incandescent Blow]] – dein Füller", en: "Then [[18040000|Incandescent Blow]] – your filler" },
      { de: "Dann [[18120000|Recuperation]] (ab Stufe 8) – deine Gruppenheilung", en: "Then [[18120000|Recuperation]] (level 8) – your group heal" },
      {
        de: "**Passive Skills** (sie wirken immer, ganz von selbst) auf 10, sobald du sie lernst – die Top 10 haben sie (fast) alle dort: [[18750000|Attack Preparation]] (ab Stufe 13; auf Skillstufe 10 +10 % PvE-Schadensverstärkung, +20 % Verteidigung und +100 Präzision), [[18740000|Inspiring Spell]] (ab 11; mehr Krit.-Treffer), [[18760000|Impact Hit]] (ab 15; deine Betäubungen gehen öfter durch, dazu mehr Wucht – die Chance auf einen doppelt starken Treffer) und [[18800000|Wind's Promise]] (ab 25; +12 % Krit.-Schadensverstärkung und Zusatzschaden bei kritischen Treffern)",
        en: "**Passives** (they are always on, all by themselves) to 10 as soon as you learn them – (almost) all of the top 10 have them there: [[18750000|Attack Preparation]] (from level 13; at skill level 10 +10% PvE Damage Boost, +20% Defense and +100 Accuracy), [[18740000|Inspiring Spell]] (from 11; more Critical Hit), [[18760000|Impact Hit]] (from 15; your stuns land more often, plus more Double Chance – the chance for a hit with double damage) and [[18800000|Wind's Promise]] (from 25; +12% Critical Damage Boost and extra damage on critical hits)",
      },
      {
        de: "Dann [[18060000|Impactful Crush]], [[18090000|Rushing Smash]], [[18210000|Tremor Crush]] (ab Stufe 10) und [[18080000|Wave Blow]] (ab Stufe 12) – die ersten drei haben die Top 10 im Median auf 10, [[18080000|Wave Blow]] nehmen 7 von 10 hoch",
        en: "Then [[18060000|Impactful Crush]], [[18090000|Rushing Smash]], [[18210000|Tremor Crush]] (level 10) and [[18080000|Wave Blow]] (level 12) – the top 10 have the first three at 10 (median), 7 of 10 also take [[18080000|Wave Blow]] high",
      },
      {
        de: "Dann die passiven Skills [[18780000|Earth's Promise]] (ab Stufe 21: Auf Skillstufe 10 senkt ein Treffer die Schadensresistenz des Ziels 5 s lang um 9 %, höchstens alle 10 s – davon hat die ganze Gruppe etwas), [[18710000|Blessing of Life]] (mehr LP, stärkere Heilung), [[18790000|Survival Willpower]] (ab 23; mehr Widerstand gegen Statuseffekte) und [[18730000|Protection Circle]] (ab 9; Schild für die Gruppe) – dazu [[18200000|Defiance]] (ab 16): Jede Stufe senkt seine Abklingzeit um 1 s (60 s auf Stufe 1, 51 s auf Stufe 10)",
        en: "Then the passives [[18780000|Earth's Promise]] (from level 21: at skill level 10 a hit lowers the target's Damage Tolerance by 9% for 5 s, at most every 10 s – the whole group profits), [[18710000|Blessing of Life]] (more HP, stronger heals), [[18790000|Survival Willpower]] (from 23; more Status Effect Resist) and [[18730000|Protection Circle]] (from 9; a shield for the group) – plus [[18200000|Defiance]] (from 16): every level takes 1 s off its cooldown (60 s at level 1, 51 s at level 10)",
      },
      {
        de: "Niedrig lassen: [[18300000|Gust Rampage]] geht nur gegen taumelnde Gegner – 7 der Top 10 lassen es auf Stufe 1. [[18770000|Raging Spell]] und [[18720000|Crossguard]] kommen zuletzt. [[18150000|Heat Wave Blow]] geht nur nach einem Block – 6 der Top 10 nehmen ihn trotzdem auf 8–10, 4 lassen ihn auf 1",
        en: "Keep low: [[18300000|Gust Rampage]] only works on staggered enemies – 7 of the top 10 leave it at level 1. [[18770000|Raging Spell]] and [[18720000|Crossguard]] come last. [[18150000|Heat Wave Blow]] only works after a block – 6 of the top 10 still take it to 8–10, 4 leave it at 1",
      },
      {
        de: "Später mit Tafeln und Ausrüstung: [[18100000|Dark Crush]] zuerst auf 16 (dann fällt seine Abklingzeit weg), dann 20 – und [[18750000|Attack Preparation]] und [[18760000|Impact Hit]] genauso hoch (bei den Top 10 um 22), [[18800000|Wind's Promise]] um 18. [[18010000|Onslaught]], [[18290000|Spinning Strike]] und [[18040000|Incandescent Blow]] auf 16–17, [[18120000|Recuperation]] auf 12–16, den Rest auf 12",
        en: "Later with boards and gear: [[18100000|Dark Crush]] to 16 first (that removes its cooldown), then 20 – and [[18750000|Attack Preparation]] and [[18760000|Impact Hit]] just as high (about 22 in the top 10), [[18800000|Wind's Promise]] to about 18. [[18010000|Onslaught]], [[18290000|Spinning Strike]] and [[18040000|Incandescent Blow]] to 16–17, [[18120000|Recuperation]] to 12–16, the rest to 12",
      },
    ],
    levels: [
      { id: 18750000 /* Attack Preparation */, level: 22, bought: 10, dv: 4, gear: 7.5, passive: true },
      { id: 18760000 /* Impact Hit */, level: 21.5, bought: 10, dv: 4, gear: 7.5, passive: true },
      { id: 18100000 /* Dark Crush */, level: 21, bought: 10, dv: 4, gear: 7 },
      { id: 18800000 /* Wind's Promise */, level: 18.5, bought: 10, dv: 4, gear: 4.5, passive: true },
      { id: 18010000 /* Onslaught */, level: 17, bought: 10, dv: 4, gear: 3 },
      { id: 18040000 /* Incandescent Blow */, level: 17, bought: 10, dv: 4, gear: 3 },
      { id: 18290000 /* Spinning Strike */, level: 17, bought: 10, dv: 4, gear: 3 },
      { id: 18060000 /* Impactful Crush */, level: 16, bought: 10, dv: 4, gear: 2 },
      { id: 18120000 /* Recuperation */, level: 16, bought: 10, dv: 4, gear: 2 },
      { id: 18090000 /* Rushing Smash */, level: 15, bought: 10, dv: 3.5, gear: 2 },
    ],
    specs: [
      {
        id: 18100000 /* Dark Crush */,
        parts: [18100030 /* Dark Crush: Critical Hit on hit */, 18100040 /* Dark Crush: Adds [Piercing Strike] Chain Skill */, 18100050 /* Dark Crush: Removes [Dark Crush] cooldown */],
        note: {
          de: "Die Stufe-16-Option entfernt die Abklingzeit – dann trifft [[18100000|Dark Crush]] in jedem Fenster. Das ist dein größter Sprung beim Schaden. Bis Stufe 20 hast du nur 2 Plätze: Ab Stufe 16 tauschst du den kritischen Treffer dafür aus, ab Stufe 20 kommt er zurück.",
          en: "The level 16 option removes the cooldown – then [[18100000|Dark Crush]] hits in every window. This is your biggest jump in damage. Until level 20 you only have 2 slots: from level 16 swap the critical hit for it, at level 20 it comes back.",
        },
      },
      {
        id: 18010000 /* Onslaught */,
        parts: [18010010 /* Onslaught: +20% MP restored */, 18010040 /* Onslaught: -1s [Spinning Strike] cooldown on hit */, 18010050 /* Onslaught: Adds [Storm Chain] Chain Skill */],
        note: {
          de: "Ab Stufe 12 verkürzt jeder Treffer die Abklingzeit von [[18290000|Spinning Strike]], Stufe 16 bringt einen Folge-Skill. Die MP-Option hilft beim Leveln. Die Option, die LP absorbiert, wurde per Patch gekürzt – lieber nicht nehmen.",
          en: "From level 12 every hit shortens the cooldown of [[18290000|Spinning Strike]], level 16 adds a follow-up skill. The MP option helps while levelling. The option that absorbs HP was cut in a patch – better skip it.",
        },
      },
      {
        id: 18290000 /* Spinning Strike */,
        parts: [18290010 /* Spinning Strike: -5s cooldown */, 18290050 /* Spinning Strike: Ignores Block and Evasion and lands as a Critical Hit */],
        note: {
          de: "Kommt 5 s früher wieder und trifft ab Stufe 16 immer kritisch – und öffnet dabei jedes Mal [[18100000|Dark Crush]].",
          en: "Comes back 5 s sooner and always crits from level 16 – and opens [[18100000|Dark Crush]] every time.",
        },
      },
      {
        id: 18040000 /* Incandescent Blow */,
        parts: [18040010 /* Incandescent Blow: -20% MP consumed */, 18040050 /* Incandescent Blow: Ignores Block and Evasion and lands as Multi-Hit */],
        note: {
          de: "Kostet weniger MP; ab Stufe 16 ignoriert er Block und Ausweichen.",
          en: "Costs less MP; from level 16 it ignores Block and Evasion.",
        },
      },
      {
        id: 18060000 /* Impactful Crush */,
        parts: [18060030 /* Impactful Crush: Changes to mobile skill */, 18060040 /* Impactful Crush: +30% Skill Speed */],
        note: {
          de: "Geht auch im Laufen, und ab Stufe 12 kommt er 30 % schneller raus (Skill-Tempo). Die Stufe-16-Option mit mehr Betäubungschance ist fürs PvP.",
          en: "Works while moving, and from level 12 it comes out 30% faster (Skill Speed). The level 16 option with more stun chance is for PvP.",
        },
      },
      {
        id: 18120000 /* Recuperation */,
        parts: [18120040 /* Recuperation: +5% HP restored */, 18120050 /* Recuperation: -3s cooldown */],
        note: {
          de: "Mehr Heilung und 3 s kürzere Abklingzeit.",
          en: "More healing and a 3 s shorter cooldown.",
        },
      },
      {
        id: 18090000 /* Rushing Smash */,
        parts: [18090040 /* Rushing Smash: Resets cooldown on defeating an enemy */],
        note: {
          de: "Setzt die Abklingzeit zurück, wenn ein Gegner stirbt – ideal gegen Gruppen von Monstern: So stürmst du von Gegner zu Gegner. Nimm sie statt der Auflade-Option.",
          en: "Resets the cooldown when an enemy dies – great against packs of monsters: that way you rush from enemy to enemy. Take it instead of the charge option.",
        },
      },
      {
        id: 18080000 /* Wave Blow */,
        parts: [18080010 /* Wave Blow: Multi-Hit on hit */, 18080040 /* Wave Blow: -15% target's PvE Damage Boost for 10s */],
        note: {
          de: "Garantierter Mehrfachtreffer; ab Stufe 12 sinkt die PvE-Schadensverstärkung des Ziels 10 s lang um 15 % – der Boss macht weniger Schaden.",
          en: "A guaranteed Multi-Hit; from level 12 the target's PvE Damage Boost drops by 15% for 10 s – the boss deals less damage.",
        },
      },
    ],
    stigmas: [
      {
        title: { de: 'Stigmen für PvE', en: 'Stigmas for PvE' },
        items: [
          {
            id: 18190000 /* Undefeated Mantra */,
            note: {
              de: "Dein wichtigstes Stigma – als Erstes hochleveln. Mehr Schaden und weniger erlittener Schaden für alle in der Nähe: je 15 % auf Stigma-Stufe 10, 20 % auf 20. Alle Top 10 haben es auf 20.",
              en: "Your most important stigma – level it first. More damage and less damage taken for everyone nearby: 15% each at stigma level 10, 20% at 20. All of the top 10 have it at 20.",
            },
          },
          {
            id: 18250000 /* Power of the Storm */,
            note: {
              de: "Burst für die Gruppe: 20 % mehr Kampftempo und kürzere Abklingzeiten (−20 % für dich, −10 % für die Gruppe) – 10 s lang auf Stigma-Stufe 1, 20 s auf 20. Ab Stufe 5 ist es 30 s früher wieder da (90 statt 120 s), auf Stufe 20 gibt es zusätzlich Angriffskraft (+20 % für dich, +10 % für die Gruppe). 8 der Top 10 haben es auf 20.",
              en: "Burst for the group: 20% more Combat Speed and shorter cooldowns (−20% for you, −10% for the group) – for 10 s at stigma level 1, 20 s at 20. From level 5 it comes back 30 s sooner (90 instead of 120 s), at level 20 it adds Attack (+20% for you, +10% for the group). 8 of the top 10 have it at 20.",
            },
          },
          {
            id: 18330000 /* Marchutan's Wrath */,
            note: {
              de: "Schaden, und danach geht [[18100000|Dark Crush]] 3 Sekunden lang. Manche Guides lassen es auf Stigma-Stufe 1, die Top 10 haben es auf 10–20. Im PvE bringen die Stufen vor allem mehr Schaden – also nach den beiden Buffs hochleveln.",
              en: "Damage, and afterwards [[18100000|Dark Crush]] works for 3 seconds. Some guides leave it at stigma level 1, the top 10 have it at 10–20. In PvE its levels mostly add damage – so level it after the two buffs.",
            },
          },
          {
            id: 18420000 /* Guardian Blessing */,
            note: {
              de: "Das häufigste 4. Stigma der Top 10 (6 von 10, meist Stufe 20): 9 % mehr max. LP auf Stigma-Stufe 10, 13 % auf 20, 5 Minuten lang – so lang wie seine Abklingzeit. Ab Stufe 15 macht es dein Passiv [[18800000|Wind's Promise]] 1,5-mal so stark (mehr kritischer Schaden); erst ab da lohnt es sich richtig. Vor dem Kampf von Hand zünden.",
              en: "The most common 4th stigma of the top 10 (6 of 10, mostly level 20): 9% more max HP at stigma level 10, 13% at 20, for 5 minutes – as long as its cooldown. From level 15 it makes your passive [[18800000|Wind's Promise]] 1.5 times as strong (more critical damage); only from then on does it really pay off. Cast it by hand before the pull.",
            },
          },
          {
            id: 18160000 /* Sprint Mantra */,
            note: {
              de: "Beliebt für den 4. Platz (5 der Top 10) – ein zweites Mantra: Die Gruppe läuft schneller und heilt sich beim Angreifen ein wenig.",
              en: "Popular for the 4th slot (5 of the top 10) – a second mantra: the group runs faster and heals a little while attacking.",
            },
          },
          {
            id: 18170000 /* Healing Touch */,
            note: {
              de: "Für den 4. Platz, wenn kein Kleriker dabei ist: deine größte Gruppenheilung – aber nur ein Bruchteil dessen, was ein Kleriker heilt (Abschnitt „Spielstile“).[[18240000|Impeding Authority]] (Schild für alle) geht auch. Keiner der Top 10 nutzt es.",
              en: "For the 4th slot when there is no Cleric: your biggest group heal – but only a fraction of what a Cleric heals (see “Playstyles”).[[18240000|Impeding Authority]] (a shield for everyone) works too. None of the top 10 slots it.",
            },
          },
          {
            id: 18140000 /* Focused Defense */,
            note: {
              de: "Für den 4. Platz, wenn ein Kleriker dabei ist: Du blockst sicher und bekommst dabei MP zurück.",
              en: "For the 4th slot when a Cleric is with you: you block for sure and get MP back.",
            },
          },
        ],
      },
      {
        title: { de: 'Stigmen für PvP', en: 'Stigmas for PvP' },
        items: [
          { id: 18330000 /* Marchutan's Wrath */, note: { de: "Schaden, öffnet [[18100000|Dark Crush]]. Ab Stigma-Stufe 15 senkt er die Heilung des Gegners stark.", en: "Damage, opens [[18100000|Dark Crush]]. From stigma level 15 it cuts the enemy's healing hard." } },
          { id: 18130000 /* Fracturing Blow */, note: { de: "Stürmt zum Gegner und senkt 5 Sekunden lang seine Verteidigung.", en: "Rushes to the enemy and lowers its Defense for 5 seconds." } },
          { id: 18420000 /* Guardian Blessing */, note: { de: "Mehr maximale LP und sofort etwas Heilung.", en: "More max HP and some healing right away." } },
          { id: 18190000 /* Undefeated Mantra */, note: { de: "Wirkt auch gegen Spieler.", en: "Works against players too." } },
        ],
      },
    ],
    daevanion: [
      {
        de: "**Nezekan zuerst** (ab Stufe 12): die Knoten für [[18100000|Dark Crush]], dann [[18010000|Onslaught]], [[18290000|Spinning Strike]], [[18040000|Incandescent Blow]] und die beiden Knoten für [[18750000|Attack Preparation]] – danach Kampftempo und Abklingzeitverringerung.",
        en: "**Nezekan first** (from level 12): the nodes for [[18100000|Dark Crush]], then [[18010000|Onslaught]], [[18290000|Spinning Strike]], [[18040000|Incandescent Blow]] and the two nodes for [[18750000|Attack Preparation]] – after that Combat Speed and Cooldown Reduction.",
      },
      {
        de: "**Zikel** (ab Stufe 20): Schadensverstärkung – dazu je zwei Knoten für [[18760000|Impact Hit]] und [[18800000|Wind's Promise]].",
        en: "**Zikel** (from level 20): Damage Boost – plus the two nodes each for [[18760000|Impact Hit]] and [[18800000|Wind's Promise]].",
      },
      { de: "**Vaizel** (ab Stufe 30): Krit.-Schadensverstärkung.", en: "**Vaizel** (from level 30): Critical Damage Boost." },
      { de: "**Triniel** (ab Stufe 40): Mehrfachtreffer – erst später.", en: "**Triniel** (from level 40): Multi-Hit Chance – later." },
      {
        de: "**Azphel** (ab Stufe 45) ist die PvP-Tafel: Du bezahlst sie mit Kampfkristallen aus dem PvP, und ihre Werte zählen nur gegen Spieler.",
        en: "**Azphel** (from level 45) is the PvP board: you pay it with Battle Crystals from PvP, and its stats only count against players.",
      },
      {
        de: "Kauf nicht einfach alle Knoten auf einmal – wähle sie selbst aus, damit deine Punkte dort landen, wo sie helfen.",
        en: "Do not just buy all nodes at once (“Acquire All”) – pick them yourself so your points go where they help.",
      },
    ],
    stats: {
      de: "Reihenfolge der Werte auf den Tafeln: **Angriffskraft > Kampftempo > Abklingzeitverringerung > Schadensverstärkung > Präzision > Mehrfachtreffer > Krit.-Treffer**. Gerade am Anfang zählt Präzision: Treffer, die danebengehen, machen keinen Schaden. Manasteine: Angriffskraft, Krit.-Treffer oder Präzision.",
      en: "Stat order for the boards: **Attack > Combat Speed > Cooldown Reduction > Damage Boost > Accuracy > Multi-Hit Chance > Critical Hit**. Accuracy matters a lot early on: hits that miss deal no damage. Manastones: Attack, Critical Hit or Accuracy.",
    },
  },
  macro: {
    keys: [
      {
        key: '1',
        ids: [18100000 /* Dark Crush */, 18080000 /* Wave Blow */, 18060000 /* Impactful Crush */, 18290000 /* Spinning Strike */],
        macro: true,
        note: {
          de: "Kombo: [[18100000|Dark Crush]] liegt unten – er geht nur kurz nach [[18060000|Impactful Crush]] oder [[18290000|Spinning Strike]] und kommt dann immer zuerst. [[18080000|Wave Blow]] braucht einen betäubten Gegner, den [[18060000|Impactful Crush]] liefert (bei Bossen nur ab und zu). Die oberen Skills öffnen also alles darunter. Bis [[18100000|Dark Crush]] die Stufe-16-Option hat, wartet er nach jedem Einsatz 5 s – ein Fenster in dieser Zeit geht verloren. Nimm [[18060000|Impactful Crush]] bis dahin aus der Kette und drück ihn von Hand, sobald [[18100000|Dark Crush]] wieder bereit ist.",
          en: "Combo: [[18100000|Dark Crush]] sits at the bottom – it only works shortly after [[18060000|Impactful Crush]] or [[18290000|Spinning Strike]] and then always comes first. [[18080000|Wave Blow]] needs a stunned enemy, which [[18060000|Impactful Crush]] provides (on bosses only now and then). So the skills on top open everything below them. Until [[18100000|Dark Crush]] has its level 16 option it waits 5 s after every use – a window during that time is lost. Until then take [[18060000|Impactful Crush]] out of the chain and press it by hand once [[18100000|Dark Crush]] is ready again.",
        },
      },
      {
        key: '2',
        ids: [18150000 /* Heat Wave Blow */],
        macro: true,
        note: {
          de: "Geht nur direkt nachdem du einen Angriff geblockt hast (mit der Stufe-8-Option von [[18090000|Rushing Smash]] auch mit 50 % Chance nach dessen Treffer). Dann trifft er bis zu 4 Gegner um dich – im Makro kommt er von selbst.",
          en: "Only works right after you block an attack (with the level 8 option of [[18090000|Rushing Smash]] also with a 50% chance after its hit). Then it hits up to 4 enemies around you – in the macro it comes by itself.",
        },
      },
      {
        key: '7',
        ids: [18330000 /* Marchutan's Wrath */],
        macro: true,
        note: {
          de: "Stigma: öffnet [[18100000|Dark Crush]] für 3 Sekunden. Koreanische Guides drücken es von Hand, bis [[18100000|Dark Crush]] die Stufe-16-Option hat.",
          en: "Stigma: opens [[18100000|Dark Crush]] for 3 seconds. Korean guides press it by hand until [[18100000|Dark Crush]] has its level 16 option.",
        },
      },
      {
        key: 'T',
        ids: [18300000 /* Gust Rampage */, 18040000 /* Incandescent Blow */],
        macro: true,
        note: {
          de: "Letzter Schritt im Makro. Füller oben, darunter ein Taumel-Skill: Er kommt nur, wenn der Boss taumelt – dann nimmt die Taste ihn von selbst.",
          en: "Last step of the macro. Filler on top, a Stagger skill below: it only comes while the boss staggers – then the key uses it by itself.",
        },
      },
      {
        key: 'R',
        ids: [18010000 /* Onslaught */],
        note: {
          de: "Grundattacke: linke Maustaste gedrückt halten, **nicht** ins Makro. Gibt dir MP zurück. Manche Guides setzen sie als Makro-Schritt – mit gehaltener Maustaste brauchst du das nicht.",
          en: "Basic attack: hold the left mouse button, **not** in the macro. Gives you MP back. Some guides add it as a macro step – with the mouse button held you do not need that.",
        },
      },
      {
        key: '3',
        ids: [18210000 /* Tremor Crush */],
        note: {
          de: "Von Hand, nicht im Makro: [[18210000|Tremor Crush]] geht nur direkt nach einem Ausweichen oder im Flug. Dann bringt er dich zum Ziel (bis 10 m) und betäubt Monster. Drück die Taste nach dem Ausweichen, um gleich wieder am Gegner zu sein – nicht, wenn du dich dabei von der Gruppe entfernen würdest.",
          en: "By hand, not in the macro: [[18210000|Tremor Crush]] only works right after a dodge or while flying. Then it moves you to the target (up to 10 m) and stuns monsters. Press the key after a dodge to be back at the enemy right away – not when it would carry you away from the group.",
        },
      },
      {
        key: '4',
        ids: [18090000 /* Rushing Smash */],
        note: {
          de: "Von Hand, nicht im Makro: [[18090000|Rushing Smash]] stürmt zum Ziel (bis 20 m). Drück die Taste, um an einen Gegner zu kommen. Allein und gegen Gruppen von Monstern setzt die Stufe-12-Option die Abklingzeit zurück, wenn ein Gegner stirbt – so stürmst du gleich zum nächsten. Am Boss, neben dem du ohnehin stehst, drück ihn, sobald er bereit ist: Schaden und 100 MP.",
          en: "By hand, not in the macro: [[18090000|Rushing Smash]] rushes to the target (up to 20 m). Press the key to reach an enemy. Solo and against packs of monsters its level 12 option resets the cooldown when an enemy dies – so you rush straight on to the next one. At a boss you stand next to anyway, press it whenever it is ready: damage and 100 MP.",
        },
      },
      {
        key: 'Q',
        ids: [18120000 /* Recuperation */],
        note: { de: "Heilung – von Hand, wenn LP sinken oder ein Debuff auf der Gruppe liegt.", en: "Heal – by hand when HP drops or a debuff is on the group." },
      },
      {
        key: '5',
        ids: [18160000 /* Sprint Mantra */],
        note: {
          de: "Beliebtes Stigma für den 4. Platz: ein zweites Mantra – die Gruppe läuft schneller und heilt sich beim Angreifen ein wenig. Wie jedes Mantra ein Schalter: einmal vor dem Kampf anschalten, nie ins Makro. Die Top 10 legen hier etwas öfter [[18420000|Guardian Blessing]] hin (lohnt sich ab Stigma-Stufe 15; von Hand vor dem Kampf, alle 5 Minuten). Ist kein Kleriker dabei, kannst du hier [[18170000|Healing Touch]] hinlegen (deine größte Gruppenheilung, aber kein Ersatz für einen Kleriker – von Hand, wenn es eng wird), mit Kleriker [[18140000|Focused Defense]].",
          en: "A popular stigma for the 4th slot: a second mantra – the group runs faster and heals a little while attacking. Like every mantra it is a switch: turn it on once before the pull, never in the macro. The top 10 put [[18420000|Guardian Blessing]] here a little more often (worth it from stigma level 15; by hand before the pull, every 5 minutes). Without a Cleric in the group you can put [[18170000|Healing Touch]] here (your biggest group heal, but no stand-in for a Cleric – by hand when things get tight), with a Cleric [[18140000|Focused Defense]].",
        },
      },
      {
        key: '6',
        ids: [18250000 /* Power of the Storm */],
        note: { de: "Burst für die Gruppe – von Hand, wenn alle ihre großen Skills einsetzen.", en: "Group burst – by hand when everyone uses their big skills." },
      },
      {
        key: '8',
        ids: [18190000 /* Undefeated Mantra */],
        note: {
          de: "Mantra = Schalter: Ein zweiter Druck schaltet es aus – darum nie ins Makro. Einmal vor dem Kampf anschalten.",
          en: "Mantra = switch: a second press turns it off – so never in the macro. Switch it on once before the pull.",
        },
      },
    ],
    note: {
      de: "Makro: **1 → 2 → 7 → T**, je 10 ms. Ins Makro kommen nur deine Angriffstasten. 3 und 4 bringen dich zum Ziel – die drückst du von Hand. Mantras, [[18250000|Power of the Storm]] und Heilungen drückst du ebenfalls selbst: Mantras sind Schalter, und Buffs und Heilungen brauchst du im richtigen Moment. Halte Makro-Taste und linke Maustaste gedrückt – das Makro erwischt die kurzen Fenster für [[18100000|Dark Crush]] für dich.",
      en: "Macro: **1 → 2 → 7 → T**, 10 ms each. Only your attack keys go into the macro. 3 and 4 move you to the target – you press them by hand. Mantras, [[18250000|Power of the Storm]] and heals you press yourself as well: mantras are switches, and you need buffs and heals at the right moment. Hold the macro key and the left mouse button – the macro catches the short windows for [[18100000|Dark Crush]] for you.",
    },
  },
  mistakes: [
    {
      de: "**Mantras im Makro.** Das Makro drückt sie immer wieder – und schaltet sie damit aus.",
      en: "**Mantras in the macro.** The macro presses them again and again – and turns them off.",
    },
    {
      de: "**[[18080000|Wave Blow]] statt [[18100000|Dark Crush]].** Ist das Fenster offen, kommt immer zuerst [[18100000|Dark Crush]].",
      en: "**[[18080000|Wave Blow]] instead of [[18100000|Dark Crush]].** When the window is open, [[18100000|Dark Crush]] always comes first.",
    },
    {
      de: "**Präzision vergessen.** Treffer, die danebengehen, machen keinen Schaden und füllen nichts auf.",
      en: "**Forgetting Accuracy.** Hits that miss deal no damage and build up nothing.",
    },
    {
      de: "**Zu weit weg von der Gruppe.** Dann erreichen deine Mantras niemanden.",
      en: "**Too far from the group.** Then your mantras reach nobody.",
    },
    {
      de: "**Doppelte Buffs:** zwei Kantoren mit denselben Mantras, oder [[18190000|Undefeated Mantra]] neben „Licht des Schutzes“ vom Kleriker – es wirkt jeweils nur eins.",
      en: "**Double buffs:** two Chanters with the same mantras, or [[18190000|Undefeated Mantra]] next to the Cleric's Light of Protection – only one of each works.",
    },
  ],
  power: {
    asOf: '2026-10-18',
    intro: {
      de: "Die Top 10 der Kantoren haben im Median **217K** Kampfkraft bei Gegenstandsstufe **3.233** (Spanne 202–264K) – Platz 5 der acht Klassen, ≈67 Kampfkraft pro Gegenstandsstufe. Die Spanne ist die größte aller Klassen: Platz 1 hat mit 264K die höchste Kampfkraft aller 80 Top-Spieler.",
      en: "The top 10 Chanters have a median **217K** Combat Power at item level **3,233** (range 202–264K) – 5th of the eight classes, ≈67 Combat Power per item level. The range is the widest of all classes: 1st place has 264K, the highest Combat Power of all 80 top players.",
    },
    stats: { cp: 217342.5, cpMin: 201980, cpMax: 263992, itemLevel: 3232.5, cpPerLevel: 67.22, weekly: 37803, weeklyOf: 8, rank: { cp: 5, itemLevel: 6, cpPerLevel: 6, weekly: 8 } },
    gear: [
      {
        de: "**Waffe:** Splendent Ebony / Wise Dragon Lord Staff (7 von 10), zwei spielen das **Enraged Kromede Rod**, einer den Splendent White Dragon Lord Staff – alle zehn auf +15 mit Amplified +5.",
        en: "**Weapon:** Splendent Ebony / Wise Dragon Lord Staff (7 of 10), two play the **Enraged Kromede Rod**, one the Splendent White Dragon Lord Staff – all ten at +15 with Amplified +5.",
      },
      {
        de: "**Rüstung:** 35 von 70 Teilen Splendent (Gegenstandsstufe 102), 33 Nuakum. Nur 52 Teile auf +15, Amplified Enhancement im Median +4; 4 der 10 tragen das ganze 102er-Set.",
        en: "**Armour:** 35 of 70 pieces Splendent (item level 102), 33 Nuakum. Only 52 pieces at +15, Amplified Enhancement +4 at the median; 4 of the 10 wear the full 102 set.",
      },
      {
        de: "**Schmuck:** 37 von 50 Teilen Splendent 102, der Rest Splendent 86 – alle auf +15, 33 mit Amplified +5.",
        en: "**Jewellery:** 37 of 50 pieces Splendent 102, the rest Splendent 86 – all at +15, 33 with Amplified +5.",
      },
      {
        de: "**Armreifen und Rest:** genau ein Ascension Bracelet (mehr trägt keiner der Top 80) (+10 bis +15) plus Liberator oder Pilgrim Bracelet; Revelation Amulet +10 und Noble Belt +10 (je 6 von 10). Flügel: Dark Veil (7) oder Talisra (3).",
        en: "**Bracelets and the rest:** exactly one Ascension Bracelet (none of the top 80 wears more) (+10 to +15) plus a Liberator or Pilgrim Bracelet; Revelation Amulet +10 and Noble Belt +10 (6 of 10 each). Wings: Dark Veil (7) or Talisra (3).",
      },
    ],
    arcana: {
      de: "Kantoren nehmen am meisten Vigor: **Chalice und Parchment of Vigor** bei allen zehn, **Compass of Vigor** (8), **Mirror of Vigor** (6), dazu **Bell of Magic** (8). Nur 27 von 50 Karten sind auf +5 – die wenigsten aller Klassen.",
      en: "Chanters take the most Vigor: **Chalice and Parchment of Vigor** for all ten, **Compass of Vigor** (8), **Mirror of Vigor** (6), plus **Bell of Magic** (8). Only 27 of 50 cards are at +5 – the fewest of all classes.",
    },
    stigmas: [
      { id: 18190000, note: { de: '10 von 10 · Median Stufe 20', en: '10 of 10 · median level 20' } },
      { id: 18250000, note: { de: '8 von 10 · Median Stufe 20', en: '8 of 10 · median level 20' } },
      { id: 18420000, note: { de: '6 von 10 · Median Stufe 20', en: '6 of 10 · median level 20' } },
      { id: 18330000, note: { de: '8 von 10 · Median Stufe 16', en: '8 of 10 · median level 16' } },
    ],
    slotted: [
      { id: 18190000 /* Undefeated Mantra */, n: 10, level: 20 },
      { id: 18250000 /* Power of the Storm */, n: 8, level: 20 },
      { id: 18330000 /* Marchutan's Wrath */, n: 8, level: 15.5 },
      { id: 18420000 /* Guardian Blessing */, n: 6, level: 20 },
      { id: 18160000 /* Sprint Mantra */, n: 5, level: 15 },
      { id: 18140000 /* Focused Defense */, n: 2, level: 10 },
      { id: 18700000 /* Assault Shock */, n: 1, level: 20 },
    ],
    tips: [
      {
        de: "**Arcana auf +5:** 23 von 50 Karten der Top 10 sind noch darunter – Arcana-Verzauberung kann nicht scheitern.",
        en: "**Arcana to +5:** 23 of 50 cards of the top 10 are still below – Arcana enhancement can’t fail.",
      },
      {
        de: "**Rüstung auf +15:** 18 von 70 Rüstungsteilen der Top 10 sind noch unter +15. Über +10 geht bei einem Fehlschlag keine Stufe verloren, jeder Fehlschlag erhöht die Chance.",
        en: "**Armour to +15:** 18 of 70 armour pieces of the top 10 are still below +15. Past +10 a failure loses no level, and every failure raises the chance.",
      },
      {
        de: "**Daevanion:** Im Median sind 64, 61 und 61 von 88 Knoten auf den ersten drei Tafeln offen, 74 von 116 auf der vierten und 35 von 152 auf der fünften.",
        en: "**Daevanion:** at the median 64, 61 and 61 of 88 nodes are open on the first three boards, 74 of 116 on the fourth and 35 of 152 on the fifth.",
      },
    ],
  },
  playstyles: chanterPlaystyles,
  sources: [
    { href: 'https://metabot.gg/en/aion-2/classes/chanter/build', label: 'Metabot – Chanter build' },
    { href: 'https://daevaguides.com/en/chanter/', label: 'Daeva Guides – Chanter guide' },
    { href: 'https://couga54.github.io/aion2-guides/en/chanter/', label: 'AION 2 Guides – Chanter' },
    { href: 'https://aion2-guides.info/en/chanter/', label: 'AION 2 Guides – Chanter (aion2-guides.info, 2026-10-17)' },
    { href: 'https://www.inven.co.kr/board/aion2/6451/116', label: 'Inven (KR) – Chanter guide' },
    { href: 'https://www.inven.co.kr/board/aion2/6451/3127', label: 'Inven (KR) – Chanter build tips' },
    { href: 'https://aion2hub.com/updates/aion-2-update-2026-08-26', label: 'AION2Hub – Update 2026-08-26' },
  ],
  caveat: {
    de: "Builds ändern sich mit Patches. Die Skilldaten hier entsprechen dem koreanischen Stand bis Anfang September 2026 – spätere Änderungen können fehlen. Koreanische Guides planen mit 5 Stigma-Plätzen, der globale Client hat 4: Wähl also 4 aus der Liste. Ältere Guides sehen für [[18420000|Guardian Blessing]] keinen Platz unter den 4 Stigmen – 6 der Top 10 nutzen es inzwischen. Wie viel Schaden ein Kantor im Vergleich zum Kleriker macht, ist umstritten. Dass sich [[18250000|Power of the Storm]] und der „Segen der Erde“ des Klerikers nicht vertragen, steht nur im Skilltext.",
    en: "Builds change with patches. The skill data here matches the Korean version up to early September 2026 – later changes may be missing. Korean guides plan with 5 stigma slots, the global client has 4: so pick 4 from the list. Older guides see no room for [[18420000|Guardian Blessing]] among the 4 stigmas – 6 of the top 10 now use it. How much damage a Chanter deals compared to a Cleric is disputed. That [[18250000|Power of the Storm]] and the Cleric's Earth's Blessing do not work together comes only from the skill text.",
  },
});
