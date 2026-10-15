import { classGuide } from './classGuide';

/** Beginner guide for the Spiritmaster (classType Elementalist): ranged damage together with spirits. */
export const spiritmasterGuide = classGuide({
  id: 'spiritmaster',
  cls: 'Elementalist',
  tone: 'teal',
  title: { de: 'Beschwörer-Guide', en: 'Spiritmaster guide' },
  summary: {
    de: 'Der Beschwörer kämpft aus der Ferne zusammen mit seinen Geistern. Hier lernst du, in welcher Reihenfolge du buffst und beschwörst, welche Skills zählen und wie du Leiste und Makro belegst.',
    en: 'The Spiritmaster fights from range together with spirits. Learn in which order to buff and summon, which skills matter and how to set up your hotbar and macro.',
  },
  tags: [
    { de: 'Fernkampf-Schaden', en: 'Ranged damage' },
    { de: 'Geister', en: 'Spirits' },
    { de: 'Einsteiger', en: 'Beginner' },
  ],
  updated: '2026-10-15',
  glance: [
    { label: { de: 'Rolle', en: 'Role' }, value: { de: 'Schaden aus der Ferne – zusammen mit deinen **Geistern** (Beschwörungen, die mit dir kämpfen)', en: 'Damage from range – together with your **spirits** (summons that fight with you)' } },
    { label: { de: 'Schwierigkeit', en: 'Difficulty' }, value: { de: 'Mittel – vor dem Kampf zählt die richtige Reihenfolge', en: 'Medium – the right order before a fight matters' } },
    { label: { de: 'Reichweite', en: 'Range' }, value: { de: '20 m', en: '20 m' } },
    { label: { de: 'Stärken', en: 'Strengths' }, value: { de: 'Dein Geist kämpft mit, viel Schaden über Zeit, allein stark: Der Erdgeist zieht Gegner auf sich, der Windgeist heilt dich', en: 'Your spirit fights with you, lots of damage over time, strong alone: the Earth Spirit draws enemies to itself, the Wind Spirit heals you' } },
    { label: { de: 'Schwächen', en: 'Weaknesses' }, value: { de: 'Braucht Vorbereitung (erst Buffs, dann beschwören), der große Burst kommt nur alle 90 s', en: 'Needs setup (buffs first, then summon), the big burst only comes every 90 s' } },
  ],
  forWhom: {
    de: 'Du magst einen Begleiter, der mit dir kämpft, und nimmst dir vor jedem Kampf ein paar Sekunden zum Vorbereiten. Du stehst lieber hinten als vorne.',
    en: 'You like a companion that fights with you, and you do not mind a few seconds of setup before each fight. You would rather stand at the back than at the front.',
  },
  party: {
    dungeon: [
      { de: 'Dein Kampfgeist ist der Feuergeist ([[16100000|Summon: Fire Spirit]]) – er macht den meisten Schaden.', en: 'Your fighting spirit is the Fire Spirit ([[16100000|Summon: Fire Spirit]]) – it deals the most damage.' },
      { de: 'Der Erdgeist ([[16130000|Summon: Earth Spirit]]) zieht die Gegner auf sich (Aggro). Allein super – in der Gruppe ist das die Aufgabe des Tanks.', en: 'The Earth Spirit ([[16130000|Summon: Earth Spirit]]) pulls the enemies onto itself (aggro). Great alone – in a group that is the job of the tank.' },
      { de: 'Gegnergruppen: [[16140000|Jointstrike: Curse]] und [[16040000|Combustion]] treffen bis zu 4 Gegner, [[16330000|Dimensional Control]] bremst sie.', en: 'Packs: [[16140000|Jointstrike: Curse]] and [[16040000|Combustion]] hit up to 4 enemies, [[16330000|Dimensional Control]] slows them.' },
      { de: 'Wenig MP (Mana für Skills)? Der Wassergeist ([[16110000|Summon: Water Spirit]]) gibt dir bei jedem seiner Treffer MP.', en: 'Low on MP (mana for skills)? The Water Spirit ([[16110000|Summon: Water Spirit]]) gives you MP with each of its hits.' },
    ],
    boss: {
      de: 'Spar [[16250000|Summon: Ancient Spirit]] für den Boss: 30 s starker Zusatzschaden, und jedes Mal, wenn der uralte Geist seinen Skill nutzt, bekommst du die 4 Elemente. Davor: Buffs und [[16150000|Jointstrike: Corrode]] – 20 s lang nimmt das Ziel 10 % mehr Schaden von deinen Geistern.',
      en: 'Save [[16250000|Summon: Ancient Spirit]] for the boss: 30 s of strong extra damage, and every time the Ancient Spirit uses its skill you get Four Elements. Before that: buffs and [[16150000|Jointstrike: Corrode]] – for 20 s the target takes 10% more damage from your spirits.',
    },
    pvp: {
      de: "Halte Abstand und lass deinen Geist arbeiten. [[16070000|Soul's Cry]] jagt Spieler in die Flucht (Furcht, 70 % Chance). Fürs PvP tauschst du Stigmen gegen [[16260000|Magic Block]] und [[16230000|Seize Magic]] (entfernt Buffs). [[16200000|Defiance]] auf der Leertaste befreit dich aus Betäubung und Furcht.",
      en: "Keep your distance and let your spirit work. [[16070000|Soul's Cry]] makes players run away (Fear, 70% chance). For PvP you swap stigmas for [[16260000|Magic Block]] and [[16230000|Seize Magic]] (removes buffs). [[16200000|Defiance]] on Space frees you from stun and fear.",
    },
    solo: {
      de: 'Allein kämpfst du mit dem Erdgeist ([[16130000|Summon: Earth Spirit]]), der die Gegner auf sich zieht, oder mit dem Windgeist ([[16120000|Summon: Wind Spirit]]), der dich heilt. Als Stigma hilft [[16060000|Siphon]] statt [[16370000|Flame Blessing]] (Taste 8): Der Skill stiehlt LP und gibt dir MP.',
      en: 'Alone you fight with the Earth Spirit ([[16130000|Summon: Earth Spirit]]), which draws the enemies, or with the Wind Spirit ([[16120000|Summon: Wind Spirit]]), which heals you. As a stigma, swap [[16370000|Flame Blessing]] (key 8) for [[16060000|Siphon]]: it steals HP and gives you MP.',
    },
  },
  skills: [
    { id: 16100000 /* Summon: Fire Spirit */, note: { de: 'Dein Hauptgeist für Schaden – beschwöre ihn als Letzten. Geister übernehmen deine Werte in dem Moment, in dem sie erscheinen. Deshalb immer erst die Buffs.', en: 'Your main damage spirit – summon it last. Spirits copy your stats the moment they appear. So always buff first.' } },
    { id: 16110000 /* Summon: Water Spirit */, note: { de: 'Gibt dir bei jedem seiner Treffer 20 MP. Gut, wenn dir die MP ausgehen. Ab Stufe 3.', en: 'Gives you 20 MP with each of its hits. Good when you run out of MP. From level 3.' } },
    { id: 16300000 /* Elemental Fusion */, note: { de: 'Jedes Mal, wenn ein Geist seinen Skill nutzt, bekommst du ein Element. Bei 4 hast du die **4 Elemente** und kannst diesen starken Treffer einsetzen. Sofort nutzen: Solange du die 4 Elemente hast, sammelst du keine neuen. Ab Stufe 14.', en: 'Every time a spirit uses its skill you get an element. At 4 you have **Four Elements** and can use this strong hit. Use it right away: while you have Four Elements you collect no new ones. From level 14.' } },
    { id: 16250000 /* Summon: Ancient Spirit */, note: { de: 'Stigma: kommt für 30 s, alle 90 s. Jeder seiner Skills gibt dir sofort die 4 Elemente – dein großes **Burst-Fenster** (kurze Zeit, in der du alles auf einmal einsetzt).', en: 'Stigma: stays for 30 s, every 90 s. Each of its skills gives you Four Elements at once – your big **burst window** (a short time in which you use everything at once).' } },
    { id: 16140000 /* Jointstrike: Curse */, note: { de: 'Alle 10 s: Schaden auf bis zu 4 Gegner plus Fluch (Schaden über Zeit). Dein Geist greift mit an. Ab Stufe 4.', en: 'Every 10 s: damage on up to 4 enemies plus a curse (damage over time). Your spirit joins the attack. From level 4.' } },
    { id: 16330000 /* Dimensional Control */, note: { de: 'Geht nur kurz, nachdem ein Geist seinen Skill genutzt hat. Trifft bis zu 4 Gegner, bremst sie und gibt 100 MP. Ab Stufe 8.', en: 'Only works for a short moment after a spirit used its skill. Hits up to 4 enemies, slows them and gives 100 MP. From level 8.' } },
    { id: 16040000 /* Combustion */, note: { de: 'Keine **Abklingzeit** (Wartezeit bis zum nächsten Einsatz), trifft bis zu 4 Gegner – dein **Füller** für die Lücken, wenn nichts anderes bereit ist.', en: 'No **cooldown** (the wait until the next use), hits up to 4 enemies – your **filler** for the gaps when nothing else is ready.' } },
    { id: 16010000 /* Cold Shock */, note: { de: 'Deine Grundattacke auf der linken Maustaste. Gibt MP zurück. Ein Kettentreffer heißt Erdbeben – mit Spezialisierung gibt er +2 % Angriffskraft (bis zu 5-mal).', en: 'Your basic attack on the left mouse button. Gives MP back. One of its chain hits is called Earth Tremor – with a specialisation it gives +2% Attack (up to 5 times).' } },
  ],
  rotation: {
    intro: {
      de: 'Kurz gesagt: Du kämpfst mit einem Geist an deiner Seite. Jeder Geist-Skill gibt dir ein Element, bei 4 Elementen setzt du [[16300000|Elemental Fusion]] ein. Geister übernehmen deine Werte, wenn sie erscheinen – also immer **erst buffen, dann beschwören**.',
      en: 'In short: you fight with a spirit at your side. Every spirit skill gives you an element, and at Four Elements you use [[16300000|Elemental Fusion]]. Spirits copy your stats when they appear – so always **buff first, then summon**.',
    },
    blocks: [
      {
        title: { de: 'Eröffnung (von Hand)', en: 'Opener (by hand)' },
        steps: [
          { id: 16370000 /* Flame Blessing */, note: { de: 'Buff', en: 'Buff' } },
          { id: 16190000 /* Enhance: Spirit's Benediction */, note: { de: 'Buff für dich und Geist', en: 'Buff for you and spirit' } },
          { id: 16250000 /* Summon: Ancient Spirit */, note: { de: '30 s Burst', en: '30 s burst' } },
          { id: 16150000 /* Jointstrike: Corrode */, note: { de: '+10 % Geist-Schaden', en: '+10% spirit damage' } },
          { id: 16130000 /* Summon: Earth Spirit */, note: { de: 'Taste 4', en: 'key 4' } },
          { id: 16120000 /* Summon: Wind Spirit */, note: { de: 'Taste 4', en: 'key 4' } },
          { id: 16110000 /* Summon: Water Spirit */, note: { de: 'Taste 4', en: 'key 4' } },
          { id: 16100000 /* Summon: Fire Spirit */, note: { de: 'als Letzter', en: 'last' } },
          { id: 16300000 /* Elemental Fusion */, note: { de: 'bei 4 Elementen', en: 'at Four Elements' } },
          { id: 16140000 /* Jointstrike: Curse */ },
        ],
      },
      {
        title: { de: 'Danach: Makro + linke Maustaste – das kommt zuerst', en: 'Then: macro + left mouse – this comes first' },
        steps: [
          { id: 16300000 /* Elemental Fusion */, note: { de: 'sofort bei 4 Elementen', en: 'as soon as you have 4' } },
          { id: 16150000 /* Jointstrike: Corrode */, note: { de: 'neu setzen, sobald bereit', en: 'renew whenever ready' } },
          { id: 16100000 /* Summon: Fire Spirit */, note: { de: 'Taste 4, wenn bereit', en: 'key 4 when ready' } },
          { id: 16140000 /* Jointstrike: Curse */, note: { de: 'alle 10 s', en: 'every 10 s' } },
          { id: 16330000 /* Dimensional Control */, note: { de: 'kurz nach Geist-Skill', en: 'right after a spirit skill' } },
          { id: 16040000 /* Combustion */, note: { de: 'Füller, auch für Gruppen', en: 'filler, also for packs' } },
          { id: 16010000 /* Cold Shock */, note: { de: 'immer gedrückt halten', en: 'hold all the time' } },
        ],
      },
    ],
    tips: [
      { de: 'Erst buffen, dann beschwören: Geister übernehmen deine Werte, wenn sie erscheinen.', en: 'Buff first, then summon: spirits copy your stats when they appear.' },
      { de: 'Nutze [[16300000|Elemental Fusion]] sofort – mit 4 Elementen sammelst du keine neuen.', en: 'Use [[16300000|Elemental Fusion]] right away – with Four Elements you collect no new ones.' },
      { de: 'Spar [[16250000|Summon: Ancient Spirit]] für Bosse. Der uralte Geist kommt nur alle 90 s.', en: 'Save [[16250000|Summon: Ancient Spirit]] for bosses. It only comes every 90 s.' },
      { de: 'Setz [[16150000|Jointstrike: Corrode]] am Boss jedes Mal neu, wenn der Skill bereit ist: 20 s lang nimmt das Ziel 10 % mehr Schaden von deinen Geistern.', en: 'Renew [[16150000|Jointstrike: Corrode]] at the boss every time it is ready: for 20 s the target takes 10% more damage from your spirits.' },
      { de: 'Wenig MP: Wassergeist beschwören. Auch [[16010000|Cold Shock]] und [[16330000|Dimensional Control]] geben MP zurück.', en: 'Low on MP: summon the Water Spirit. [[16010000|Cold Shock]] and [[16330000|Dimensional Control]] give MP back too.' },
    ],
  },
  build: {
    intro: {
      de: 'Skillpunkte bringen einen Skill bis Stufe 10. Höhere Stufen kommen von Daevanion-Knoten und Ausrüstung. Bei Skillstufe 8, 12 und 20 öffnet sich je ein Platz für eine **Spezialisierung** (eine Zusatzoption für den Skill). **Stigmen** sind Extra-Skills: Plätze gibt es ab Stufe 22, 27, 32 und 37.',
      en: 'Skill points take a skill up to level 10. Higher levels come from Daevanion nodes and gear. At skill level 8, 12 and 20 a slot opens for a **specialisation** (an extra option for the skill). **Stigmas** are extra skills: you get slots at level 22, 27, 32 and 37.',
    },
    points: [
      { de: 'Zuerst [[16100000|Summon: Fire Spirit]] und [[16010000|Cold Shock]] auf 8 – das öffnet ihre erste Spezialisierung.', en: 'First [[16100000|Summon: Fire Spirit]] and [[16010000|Cold Shock]] to 8 – that opens their first specialisation.' },
      { de: '[[16140000|Jointstrike: Curse]] (ab Stufe 4) auf 10 – dein wichtigster Angriff mit dem Geist.', en: '[[16140000|Jointstrike: Curse]] (from level 4) to 10 – your most important attack with the spirit.' },
      { de: '[[16330000|Dimensional Control]] (ab Stufe 8) und [[16300000|Elemental Fusion]] (ab Stufe 14) auf 10, sobald du sie hast.', en: '[[16330000|Dimensional Control]] (from level 8) and [[16300000|Elemental Fusion]] (from level 14) to 10 as soon as you have them.' },
      { de: '[[16040000|Combustion]], [[16340000|Rapid Scattershot]] und das Passiv [[16710000|Spirit Strike]] auf 10.', en: '[[16040000|Combustion]], [[16340000|Rapid Scattershot]] and the passive [[16710000|Spirit Strike]] to 10.' },
      { de: 'Die anderen Geister auf 8: [[16110000|Summon: Water Spirit]], [[16130000|Summon: Earth Spirit]] und [[16120000|Summon: Wind Spirit]].', en: 'The other spirits to 8: [[16110000|Summon: Water Spirit]], [[16130000|Summon: Earth Spirit]] and [[16120000|Summon: Wind Spirit]].' },
      { de: "Was übrig bleibt: [[16730000|Spirit's Descent]] und [[16800000|Consecutive Countercurrent]].", en: "Whatever is left: [[16730000|Spirit's Descent]] and [[16800000|Consecutive Countercurrent]]." },
    ],
    specs: [
      { id: 16300000 /* Elemental Fusion */, parts: [16300020 /* Elemental Fusion: Extra damage after 3s on hit */, 16300030 /* Elemental Fusion: +10 all Element Boost on hit */, 16300050 /* Elemental Fusion: 25% chance to regain Four Elements */], note: { de: 'Mehr Schaden pro Treffer, später mit etwas Glück die 4 Elemente gleich zurück. Nimm nicht die Auflade-Option (Stufe 12): Dann musst du [[16300000|Elemental Fusion]] von Hand aufladen – das Makro kann das nicht.', en: 'More damage per hit, later a chance to get Four Elements right back. Do not take the charge option (level 12): then you would have to charge [[16300000|Elemental Fusion]] by hand – the macro cannot do that.' } },
      { id: 16140000 /* Jointstrike: Curse */, parts: [16140030 /* Jointstrike: Curse: Changes to mobile skill */, 16140040 /* Jointstrike: Curse: -2s cooldown */], note: { de: 'Im Laufen einsetzbar und 2 s weniger Abklingzeit – öfter Fluch, ohne stehen zu bleiben.', en: 'Usable while moving and 2 s less cooldown – more curses without standing still.' } },
      { id: 16040000 /* Combustion */, parts: [16040040 /* Combustion: +20% Skill Speed */, 16040050 /* Combustion: Adds [Ashy Call] Chain Skill */], note: { de: 'Schneller einsetzen. Ab Skillstufe 16 kommt ein Kettenskill dazu.', en: 'Faster to use. From skill level 16 a chain skill is added.' } },
      { id: 16010000 /* Cold Shock */, parts: [16010030 /* Cold Shock: +50% Multi-Hit on hit */, 16010040 /* Cold Shock: +2% Attack on landing [Earth Tremor] (Up to 5 stacks) */], note: { de: 'Mehr Mehrfachtreffer und +2 % Angriffskraft pro Erdbeben-Treffer (bis zu 5-mal).', en: 'More Multi-Hit and +2% Attack per Earth Tremor hit (up to 5 times).' } },
      { id: 16100000 /* Summon: Fire Spirit */, parts: [16100020 /* Summon: Fire Spirit: +20% Fire Spirit Critical Hit damage */, 16100050 /* Summon: Fire Spirit: +20% Fire Spirit Stats */], note: { de: 'Dein Hauptgeist: mehr kritischer Schaden, ab Skillstufe 16 +20 % auf alle seine Werte.', en: 'Your main spirit: more critical damage, from skill level 16 +20% on all its stats.' } },
    ],
    stigmas: [
      {
        title: { de: 'Stigmen – PvE', en: 'Stigmas – PvE' },
        items: [
          { id: 16250000 /* Summon: Ancient Spirit */, note: { de: 'Dein Burst alle 90 s (30 s lang).', en: 'Your burst every 90 s (for 30 s).' } },
          { id: 16190000 /* Enhance: Spirit's Benediction */, note: { de: 'Für dich und deinen Geist: +20 % Schadensverstärkung und Schadensresistenz (PvE), dazu Heilung über 10 s.', en: 'For you and your spirit: +20% Damage Boost and Damage Tolerance (PvE), plus healing over 10 s.' } },
          { id: 16150000 /* Jointstrike: Corrode */, note: { de: '20 s lang 10 % mehr Schaden von Geistern, dazu Schaden über Zeit.', en: 'For 20 s 10% more damage from spirits, plus damage over time.' } },
          { id: 16370000 /* Flame Blessing */, note: { de: 'Buff: 14,5 s lang mit 50 % Chance Zusatzschaden bei Treffern. Zum Tauschen: [[16060000|Siphon]] (allein) oder [[16240000|Jointstrike: Destructive Attack]].', en: 'Buff: for 14.5 s a 50% chance of extra damage on hits. To swap in: [[16060000|Siphon]] (solo) or [[16240000|Jointstrike: Destructive Attack]].' } },
        ],
      },
      {
        title: { de: 'Stigmen – PvP', en: 'Stigmas – PvP' },
        items: [
          { id: 16260000 /* Magic Block */, note: { de: 'Belegt den Gegner mit 75 % Chance mit Siegel.', en: 'Seals the enemy with a 75% chance.' } },
          { id: 16230000 /* Seize Magic */, note: { de: 'Entfernt bis zu 2 Buffs des Gegners und macht dafür Zusatzschaden.', en: 'Removes up to 2 enemy buffs and deals extra damage for them.' } },
          { id: 16220000 /* Cursed Cloud */, note: { de: '10 s Schaden über Zeit auf bis zu 4 Gegner.', en: '10 s of damage over time on up to 4 enemies.' } },
          { id: 16370000 /* Flame Blessing */, note: { de: 'Bleibt: Zusatzschaden bei Treffern.', en: 'Stays: extra damage on hits.' } },
        ],
      },
    ],
    daevanion: [
      { de: '**Skill-Knoten zuerst:** +1 Stufe für [[16140000|Jointstrike: Curse]], [[16300000|Elemental Fusion]] und [[16710000|Spirit Strike]].', en: '**Skill nodes first:** +1 level for [[16140000|Jointstrike: Curse]], [[16300000|Elemental Fusion]] and [[16710000|Spirit Strike]].' },
      { de: '**Nezekan** (ab Stufe 12): Kampftempo und Abklingzeitverringerung.', en: '**Nezekan** (from level 12): Combat Speed and Cooldown Reduction.' },
      { de: '**Zikel** (ab Stufe 20): Schadensverstärkung – bei dir weit oben.', en: '**Zikel** (from level 20): Damage Boost – high on your list.' },
      { de: '**Vaizel** (ab Stufe 30): Krit.-Schadensverstärkung. Kleine Knoten mit Angriffskraft gibt es auf jeder Tafel – nimm sie auf dem Weg mit.', en: '**Vaizel** (from level 30): Critical Damage Boost. Small Attack nodes are on every board – pick them up on the way.' },
      { de: '**Azphel** (ab Stufe 45) ist die PvP-Tafel. Du bezahlst sie mit **Kampfkristallen** aus dem PvP, und ihre Werte zählen nur gegen Spieler.', en: '**Azphel** (from level 45) is the PvP board. You pay for it with **Battle Crystals** from PvP, and its stats only count against players.' },
    ],
    stats: {
      de: 'Reihenfolge für die Tafeln: Angriffskraft > Schadensverstärkung > Kampftempo > Abklingzeitverringerung > Krit.-Treffer > Krit.-Schadensverstärkung > Max. MP. Kampftempo macht deine Animationen schneller, Abklingzeitverringerung bringt Skills öfter.',
      en: 'Order for the boards: Attack > Damage Boost > Combat Speed > Cooldown Reduction > Critical Hit > Critical Damage Boost > Max MP. Combat Speed makes your animations faster, Cooldown Reduction brings skills back sooner.',
    },
  },
  macro: {
    keys: [
      { key: '1', ids: [16300000 /* Elemental Fusion */, 16070000 /* Soul's Cry */], macro: true, note: { de: "Kombo: [[16300000|Elemental Fusion]] geht nur mit 4 Elementen – deshalb unten. Die Taste nimmt sie, sobald du die 4 Elemente hast, sonst [[16070000|Soul's Cry]].", en: "Combo: [[16300000|Elemental Fusion]] only works with Four Elements – so it sits at the bottom. The key uses it as soon as you have them, otherwise [[16070000|Soul's Cry]]." } },
      { key: '5', ids: [16150000 /* Jointstrike: Corrode */], macro: true, note: { de: 'Stigma: 20 s lang 10 % mehr Schaden von deinen Geistern. Im Makro wird es neu gesetzt, sobald es bereit ist.', en: 'Stigma: for 20 s 10% more damage from your spirits. In the macro it is renewed as soon as it is ready.' } },
      { key: '2', ids: [16330000 /* Dimensional Control */, 16140000 /* Jointstrike: Curse */], macro: true, note: { de: '[[16330000|Dimensional Control]] geht nur kurz nach einem Geist-Skill – unten fängt die Taste genau diesen Moment ab. Sonst kommt [[16140000|Jointstrike: Curse]].', en: '[[16330000|Dimensional Control]] only works for a moment after a spirit skill – at the bottom the key catches exactly that moment. Otherwise [[16140000|Jointstrike: Curse]] comes.' } },
      { key: 'T', ids: [16340000 /* Rapid Scattershot */, 16040000 /* Combustion */], macro: true, note: { de: 'Letzter Schritt im Makro. [[16340000|Rapid Scattershot]] geht nur gegen **benommene** Ziele (Stagger: Ist die Benommen-Leiste eines Bosses voll, taumelt er kurz) – deshalb unten: Ist der Boss benommen, nimmt die Taste ihn von selbst. Oben [[16040000|Combustion]] ohne Abklingzeit als Füller für Gruppen.', en: 'Last step of the macro. [[16340000|Rapid Scattershot]] only works on **staggered** targets (Stagger: when the stagger bar of a boss is full, it reels for a moment) – so it sits at the bottom: when the boss is staggered, the key uses it by itself. On top, [[16040000|Combustion]] has no cooldown and is your filler for packs.' } },
      { key: 'R', ids: [16010000 /* Cold Shock */], note: { de: 'Grundattacke: linke Maustaste gedrückt halten, **nicht** ins Makro. Gibt MP zurück.', en: 'Basic attack: hold the left mouse button, **not** in the macro. Gives MP back.' } },
      { key: '8', ids: [16370000 /* Flame Blessing */], note: { de: 'Buff – als Erstes in der Eröffnung.', en: 'Buff – the very first thing in the opener.' } },
      { key: '6', ids: [16190000 /* Enhance: Spirit's Benediction */], note: { de: 'Stigma, Buff für dich und deinen Geist – von Hand in der Eröffnung, direkt nach 8 und vor dem Beschwören.', en: 'Stigma, a buff for you and your spirit – by hand in the opener, right after 8 and before summoning.' } },
      { key: '7', ids: [16250000 /* Summon: Ancient Spirit */], note: { de: 'Stigma, dein Burst alle 90 s – von Hand und nur für den Boss.', en: 'Stigma, your burst every 90 s – by hand and only for the boss.' } },
      { key: '4', ids: [16130000 /* Summon: Earth Spirit */, 16120000 /* Summon: Wind Spirit */, 16110000 /* Summon: Water Spirit */, 16100000 /* Summon: Fire Spirit */], note: { de: '**Beschwörung** – von Hand und **nach** den Buffs: Geister übernehmen deine Werte, wenn sie erscheinen. Jeder Druck ruft den untersten Geist, der bereit ist: Erde, Wind, Wasser und zuletzt Feuer, dein Hauptgeist. Bei den ersten drei sind sich die Guides nicht einig (siehe Quellen), der Feuergeist kommt aber immer zuletzt. Jeder Geist nutzt beim Erscheinen seinen Skill – das füllt deine 4 Elemente.', en: '**Summoning** – by hand and **after** your buffs: spirits copy your stats when they appear. Each press calls the lowest spirit that is ready: Earth, Wind, Water and Fire last, your main spirit. Guides disagree on the first three (see sources), but the Fire Spirit always comes last. Every spirit uses its skill when it appears – that fills your Four Elements.' } },
    ],
    note: {
      de: 'Eröffnung von Hand: 8 und 6 (Buffs), 7 ([[16250000|Summon: Ancient Spirit]]), 5 ([[16150000|Jointstrike: Corrode]]), dann viermal 4 – der Feuergeist kommt zuletzt. Danach Makro-Taste und linke Maustaste gedrückt halten: Das Makro drückt 1, 5, 2 und zuletzt T.',
      en: 'Opener by hand: 8 and 6 (buffs), 7 ([[16250000|Summon: Ancient Spirit]]), 5 ([[16150000|Jointstrike: Corrode]]), then press 4 four times – the Fire Spirit comes last. Then hold the macro key and the left mouse button: the macro presses 1, 5, 2 and T last.',
    },
  },
  mistakes: [
    { de: '**Erst beschwören, dann buffen:** Dann kämpft dein Geist mit schwächeren Werten. Immer zuerst die Buffs.', en: '**Summoning before buffing:** then your spirit fights with weaker stats. Always buff first.' },
    { de: '**Auf den 4 Elementen sitzen:** Solange du sie hast, sammelst du keine neuen. Nutze [[16300000|Elemental Fusion]] sofort.', en: '**Sitting on Four Elements:** while you have them you collect no new ones. Use [[16300000|Elemental Fusion]] right away.' },
    { de: '**Erdgeist in der Gruppe:** Er zieht die Gegner auf sich. In der Gruppe kämpfst du mit dem Feuergeist, der Erdgeist ist fürs Solo-Spiel.', en: '**Earth Spirit in a group:** it pulls the enemies onto itself. In a group you fight with the Fire Spirit, the Earth Spirit is for solo play.' },
    { de: '**Großer Geist an schwachen Gegnern:** [[16250000|Summon: Ancient Spirit]] kommt nur alle 90 s – spar ihn für den Boss.', en: '**Big spirit on weak mobs:** [[16250000|Summon: Ancient Spirit]] only comes every 90 s – save it for the boss.' },
    { de: '**Korrosion vergessen:** Ohne [[16150000|Jointstrike: Corrode]] machen deine Geister am Boss 10 % weniger Schaden.', en: '**Forgetting the debuff:** without [[16150000|Jointstrike: Corrode]] your spirits deal 10% less damage at the boss.' },
    { de: '**Aufladbare Fusion im Makro:** Wählst du für [[16300000|Elemental Fusion]] die Auflade-Option, lädt das Makro sie nicht auf. Nimm die Optionen aus diesem Guide oder drück sie von Hand.', en: '**A charged Fusion in the macro:** if you pick the charge option for [[16300000|Elemental Fusion]], the macro does not charge it. Take the options from this guide or press it by hand.' },
  ],
  sources: [
    { href: 'https://metabot.gg/en/aion-2/classes/spiritmaster', label: 'Metabot – Spiritmaster' },
    { href: 'https://metaroad.gg/aion2/build-guides/spiritmaster-pve-build', label: 'MetaRoad – Spiritmaster PvE build' },
    { href: 'https://games.gg/aion-2/guides/aion-2-spiritmaster-guide/', label: 'games.gg – Spiritmaster guide' },
    { href: 'https://game8.co/games/Aion-2/archives/612293', label: 'Game8 – Spiritmaster' },
    { href: 'https://www.inven.co.kr/board/aion2/6454/8152', label: 'Inven (KR) – Spiritmaster forum (1)' },
    { href: 'https://www.inven.co.kr/board/aion2/6454/9216', label: 'Inven (KR) – Spiritmaster forum (2)' },
  ],
  caveat: {
    de: "Bei der Reihenfolge der ersten drei Geister sind sich die Guides nicht einig – einig sind sie sich nur, dass der Feuergeist zuletzt kommt. Koreanische Builds haben 6 Stigmen, der globale Client 4. Builds ändern sich mit Patches – was bei dir im Spiel funktioniert, zählt.",
    en: "Guides do not agree on the order of the first three spirits – only that the Fire Spirit comes last. Korean builds have 6 stigmas, the global client 4. Builds change with patches – what works for you in game wins.",
  },
});
