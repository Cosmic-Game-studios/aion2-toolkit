import { classGuide } from './classGuide';
import { spiritmasterPlaystyles } from './playstyle-spiritmaster';

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
  updated: '2026-10-19',
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
      { de: 'Der Erdgeist ([[16130000|Summon: Earth Spirit]]) zieht die Gegner auf sich (Aggro). Allein super – in der Gruppe ist das die Aufgabe des Tanks. Darum kommt er in der Gruppe nur kurz für seinen Skill heraus, und der Feuergeist bleibt.', en: 'The Earth Spirit ([[16130000|Summon: Earth Spirit]]) pulls the enemies onto itself (aggro). Great alone – in a group that is the job of the tank. So in a group it only comes out briefly for its skill, and the Fire Spirit stays.' },
      { de: 'Gegnergruppen: [[16140000|Jointstrike: Curse]] und [[16040000|Combustion]] treffen bis zu 4 Gegner, [[16330000|Dimensional Control]] bremst sie.', en: 'Packs: [[16140000|Jointstrike: Curse]] and [[16040000|Combustion]] hit up to 4 enemies, [[16330000|Dimensional Control]] slows them.' },
      { de: 'Wenig MP (Mana für Skills)? Der Wassergeist ([[16110000|Summon: Water Spirit]]) gibt dir bei jedem seiner Treffer MP.', en: 'Low on MP (mana for skills)? The Water Spirit ([[16110000|Summon: Water Spirit]]) gives you MP with each of its hits.' },
    ],
    boss: {
      de: 'Spar [[16250000|Summon: Ancient Spirit]] für den Boss: 30 s starker Zusatzschaden, und jedes Mal, wenn der uralte Geist seinen Skill nutzt, bekommst du die 4 Elemente. Die Reihenfolge: erst die Buffs, dann der uralte Geist, dann [[16150000|Jointstrike: Corrode]] – 20 s lang nimmt das Ziel 10 % mehr Schaden von deinen Geistern (ab Stigma-Stufe 5 noch einmal 15 % mehr).',
      en: 'Save [[16250000|Summon: Ancient Spirit]] for the boss: 30 s of strong extra damage, and every time the Ancient Spirit uses its skill you get Four Elements. The order: buffs first, then the Ancient Spirit, then [[16150000|Jointstrike: Corrode]] – for 20 s the target takes 10% more damage from your spirits (another 15% more from stigma level 5).',
    },
    pvp: {
      de: "Halte Abstand und lass deinen Geist arbeiten. [[16190000|Enhance: Spirit's Benediction]] und [[16250000|Summon: Ancient Spirit]] bleiben auch im PvP; [[16150000|Jointstrike: Corrode]] und [[16370000|Flame Blessing]] tauschst du gegen [[16230000|Seize Magic]] (entfernt Buffs) und [[16170000|Command: Proxy]] (dein Geist trägt einen Teil deines Schadens). Leg den Erdgeist ans Ende von Taste 4: Sein Skill versetzt Spieler mit 30 % Chance für 2 s in Provokation (das Ziel muss auf den Geist losgehen), und [[16200000|Defiance]] hebt Provokation nicht auf. [[16070000|Soul's Cry]] jagt Spieler in die Flucht (Furcht, 70 % Chance) – Furcht können sie aber mit ihrer eigenen Schockaufhebung lösen. Deine [[16200000|Defiance]] auf der Leertaste befreit dich aus Betäubung und Furcht.",
      en: "Keep your distance and let your spirit work. [[16190000|Enhance: Spirit's Benediction]] and [[16250000|Summon: Ancient Spirit]] stay in PvP too; swap [[16150000|Jointstrike: Corrode]] and [[16370000|Flame Blessing]] for [[16230000|Seize Magic]] (removes buffs) and [[16170000|Command: Proxy]] (your spirit takes part of your damage). Put the Earth Spirit last on key 4: its skill taunts players with a 30% chance for 2 s (Taunt: the target has to go for the spirit), and [[16200000|Defiance]] does not remove taunt. [[16070000|Soul's Cry]] makes players run away (Fear, 70% chance) – but they can break fear with their own Defiance. Your [[16200000|Defiance]] on Space frees you from stun and fear.",
    },
    solo: {
      de: 'Allein kannst du statt des Feuergeists den Erdgeist ([[16130000|Summon: Earth Spirit]]) ans Ende von Taste 4 legen – er zieht die Gegner auf sich – oder den Windgeist ([[16120000|Summon: Wind Spirit]]), der dich heilt. Der letzte Geist der Taste bleibt draußen. Als Stigma hilft [[16060000|Siphon]] statt [[16370000|Flame Blessing]] (Taste 8): Der Skill stiehlt LP und gibt dir MP.',
      en: 'Alone you can put the Earth Spirit ([[16130000|Summon: Earth Spirit]]) last on key 4 instead of the Fire Spirit – it draws the enemies onto itself – or the Wind Spirit ([[16120000|Summon: Wind Spirit]]), which heals you. The last spirit on the key is the one that stays out. As a stigma, swap [[16370000|Flame Blessing]] (key 8) for [[16060000|Siphon]]: it steals HP and gives you MP.',
    },
  },
  skills: [
    { id: 16100000 /* Summon: Fire Spirit */, note: { de: 'Dein Hauptgeist für Schaden – beschwöre ihn als Letzten. Geister übernehmen deine Werte in dem Moment, in dem sie erscheinen. Deshalb immer erst die Buffs.', en: 'Your main damage spirit – summon it last. Spirits copy your stats the moment they appear. So always buff first.' } },
    { id: 16110000 /* Summon: Water Spirit */, note: { de: 'Gibt dir bei jedem seiner Treffer 20 MP. Gehen dir die MP aus, legst du ihn ans Ende von Taste 4, damit er draußen bleibt. Ab Stufe 3.', en: 'Gives you 20 MP with each of its hits. When you run out of MP, put it last on key 4 so it stays out. From level 3.' } },
    { id: 16300000 /* Elemental Fusion */, note: { de: 'Jedes Mal, wenn ein Geist seinen Skill nutzt, bekommst du ein Element. Bei 4 hast du die **4 Elemente** und kannst diesen starken Treffer einsetzen. Sofort nutzen: Solange du die 4 Elemente hast, sammelst du keine neuen. Ab Stufe 14.', en: 'Every time a spirit uses its skill you get an element. At 4 you have **Four Elements** and can use this strong hit. Use it right away: while you have Four Elements you collect no new ones. From level 14.' } },
    { id: 16250000 /* Summon: Ancient Spirit */, note: { de: 'Stigma: kommt für 30 s, alle 90 s, und kämpft neben deinem anderen Geist. Jeder seiner Skills gibt dir sofort die 4 Elemente – dein großes **Burst-Fenster** (kurze Zeit, in der du alles auf einmal einsetzt). Ab Stigma-Stufe 15 nutzt er seinen Skill schon nach 5 statt nach 7 Standardangriffen.', en: 'Stigma: stays for 30 s, every 90 s, and fights next to your other spirit. Each of its skills gives you Four Elements at once – your big **burst window** (a short time in which you use everything at once). From stigma level 15 it uses its skill after 5 instead of 7 basic attacks.' } },
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
    flow: {
      items: [
        {
          title: { de: 'Buffs zuerst', en: 'Buffs first' },
          text: { de: "[[16370000|Flame Blessing]] und [[16190000|Enhance: Spirit's Benediction]] – Geister übernehmen deine Werte beim Erscheinen", en: "[[16370000|Flame Blessing]] and [[16190000|Enhance: Spirit's Benediction]] – spirits copy your stats when they appear" },
          tag: { de: 'Tasten 8 · 6', en: 'Keys 8 · 6' },
          tone: 'blue',
        },
        {
          title: { de: 'Burst-Geist', en: 'Burst spirit' },
          text: { de: '[[16250000|Summon: Ancient Spirit]]: 30 s Burst', en: '[[16250000|Summon: Ancient Spirit]]: 30 s burst' },
          tag: { de: 'Taste 7', en: 'Key 7' },
          tone: 'gold',
        },
        {
          title: { de: 'Schwächen', en: 'Debuff' },
          text: { de: '[[16150000|Jointstrike: Corrode]]: +10 % Geist-Schaden', en: '[[16150000|Jointstrike: Corrode]]: +10% spirit damage' },
          tag: { de: 'Taste 5', en: 'Key 5' },
          tone: 'violet',
        },
        {
          title: { de: '4 Elemente sammeln', en: 'Collect 4 elements' },
          text: { de: 'Wasser-, Erd-, Wind- und zuletzt Feuergeist beschwören – jeder Geist-Skill bringt ein Element', en: 'Summon the Water, Earth, Wind and last the Fire Spirit – every spirit skill gives you an element' },
          tag: { de: '4× Taste 4', en: '4× key 4' },
          tone: 'slate',
        },
        {
          title: { de: 'Fusion, dann Makro', en: 'Fusion, then macro' },
          text: { de: '[[16300000|Elemental Fusion]] bei 4 Elementen, dann [[16140000|Jointstrike: Curse]] und das Makro', en: '[[16300000|Elemental Fusion]] at Four Elements, then [[16140000|Jointstrike: Curse]] and the macro' },
          tag: { de: 'Tasten 1 · 2', en: 'Keys 1 · 2' },
          tone: 'gold',
        },
      ],
    },
    blocks: [
      {
        title: { de: 'Eröffnung (von Hand)', en: 'Opener (by hand)' },
        steps: [
          { id: 16370000 /* Flame Blessing */, note: { de: 'Buff', en: 'Buff' } },
          { id: 16190000 /* Enhance: Spirit's Benediction */, note: { de: 'Buff für dich und Geist', en: 'Buff for you and spirit' } },
          { id: 16250000 /* Summon: Ancient Spirit */, note: { de: '30 s Burst', en: '30 s burst' } },
          { id: 16150000 /* Jointstrike: Corrode */, note: { de: '+10 % Geist-Schaden', en: '+10% spirit damage' } },
          { id: 16110000 /* Summon: Water Spirit */, note: { de: 'Taste 4', en: 'key 4' } },
          { id: 16130000 /* Summon: Earth Spirit */, note: { de: 'Taste 4', en: 'key 4' } },
          { id: 16120000 /* Summon: Wind Spirit */, note: { de: 'Taste 4', en: 'key 4' } },
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
          { id: 16100000 /* Summon: Fire Spirit */, note: { de: 'alle 15 s viermal Taste 4', en: 'key 4 four times every 15 s' } },
          { id: 16330000 /* Dimensional Control */, note: { de: 'kurz nach Geist-Skill', en: 'right after a spirit skill' } },
          { id: 16140000 /* Jointstrike: Curse */, note: { de: 'alle 10 s', en: 'every 10 s' } },
          { id: 16040000 /* Combustion */, note: { de: 'Füller, auch für Gruppen', en: 'filler, also for packs' } },
          { id: 16010000 /* Cold Shock */, note: { de: 'immer gedrückt halten', en: 'hold all the time' } },
        ],
      },
    ],
    tips: [
      { de: 'Erst buffen, dann beschwören: Geister übernehmen deine Werte, wenn sie erscheinen.', en: 'Buff first, then summon: spirits copy your stats when they appear.' },
      { de: 'Nutze [[16300000|Elemental Fusion]] sofort – mit 4 Elementen sammelst du keine neuen.', en: 'Use [[16300000|Elemental Fusion]] right away – with Four Elements you collect no new ones.' },
      { de: 'Spar [[16250000|Summon: Ancient Spirit]] für Bosse. Der uralte Geist kommt nur alle 90 s.', en: 'Save [[16250000|Summon: Ancient Spirit]] for bosses. It only comes every 90 s.' },
      { de: 'Setz [[16150000|Jointstrike: Corrode]] am Boss jedes Mal neu, wenn der Skill bereit ist: 20 s lang nimmt das Ziel 10 % mehr Schaden von deinen Geistern, ab Stigma-Stufe 5 noch einmal 15 % mehr.', en: 'Renew [[16150000|Jointstrike: Corrode]] at the boss every time it is ready: for 20 s the target takes 10% more damage from your spirits, another 15% more from stigma level 5.' },
      { de: 'Ruf deine Geister alle 15 s neu (viermal Taste 4): Ein Geist, der nur draußen bleibt, nutzt seinen Skill bloß ab und zu (Feuergeist: 15 % Chance pro Treffer), jede neue Beschwörung dagegen sicher.', en: 'Call your spirits again every 15 s (key 4 four times): a spirit that just stays out uses its skill only now and then (Fire Spirit: 15% chance per hit), every new summon uses it for sure.' },
      { de: 'Deine Buffs kommen alle 60 s wieder: Drück 8 und 6 dann direkt vor der nächsten Runde auf Taste 4 – so starten die neuen Geister mit den Buffs.', en: 'Your buffs come back every 60 s: press 8 and 6 right before the next round on key 4 – then the new spirits start with the buffs.' },
      { de: 'Wenig MP: Lass den Windgeist aus der Runde weg (jede Beschwörung kostet 150 MP) oder leg den Wassergeist ans Ende von Taste 4. Auch [[16010000|Cold Shock]] und [[16330000|Dimensional Control]] geben MP zurück.', en: 'Low on MP: leave the Wind Spirit out of the round (each summon costs 150 MP) or put the Water Spirit last on key 4. [[16010000|Cold Shock]] and [[16330000|Dimensional Control]] give MP back too.' },
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
      { de: '[[16040000|Combustion]] und das Passiv [[16710000|Spirit Strike]] auf 10 – auf Stufe 10 gibt es dir und deinem Geist +15 % PvE-Schadensverstärkung. [[16340000|Rapid Scattershot]] bleibt auf Stufe 1: Er trifft nur benommene Ziele, und 8 der Top 10 stecken keine Punkte hinein.', en: '[[16040000|Combustion]] and the passive [[16710000|Spirit Strike]] to 10 – at level 10 it gives you and your spirit +15% PvE Damage Boost. [[16340000|Rapid Scattershot]] stays at level 1: it only hits staggered targets, and 8 of the top 10 spend no points on it.' },
      { de: '[[16110000|Summon: Water Spirit]] und [[16130000|Summon: Earth Spirit]] auf 10 – jede Beschwörung trifft mit dem Skill des Geists, und du beschwörst alle 15 s neu. [[16120000|Summon: Wind Spirit]] darf niedrig bleiben: Die Hälfte der Top 10 steckt keine Punkte hinein.', en: '[[16110000|Summon: Water Spirit]] and [[16130000|Summon: Earth Spirit]] to 10 – every summon hits with the spirit’s skill, and you summon again every 15 s. [[16120000|Summon: Wind Spirit]] can stay low: half of the top 10 spend no points on it.' },
      { de: "Dann die Schadens-Passive auf 10, jedes, sobald du es lernst – fast alle der Top 10 haben sie auf 10: [[16730000|Spirit's Descent]] (ab Stufe 9: 10 s Zusatzschaden nach jeder Beschwörung), das Passiv [[16740000|Corrode]] (ab 11, nicht das Stigma: +190 Krit.-Treffer auf Stufe 10), [[16750000|Spirit Revitalization]] (ab 13: Deine Treffer verkürzen mit 20 % Chance die Abklingzeit der Beschwörungen um 1 s), [[16760000|Mental Focus]] (ab 15: +3 % Wucht – die Chance, dass ein Treffer doppelten Schaden macht), [[16800000|Consecutive Countercurrent]] (ab 17: Zusatzschaden gegen Ziele mit Schaden über Zeit, etwa von deinem Fluch) und [[16780000|Element Unification]] (ab 25: Jeder Treffer eines Geist-Skills gibt dir und deinem Geist 10 s lang +2 % Krit.-Schadensverstärkung, bis zu 5-mal).", en: "Then the damage passives to 10, each as soon as you learn it – almost all of the top 10 have them at 10: [[16730000|Spirit's Descent]] (from level 9: 10 s of extra damage after every summon), the passive [[16740000|Corrode]] (from 11, not the stigma: +190 Critical Hit at level 10), [[16750000|Spirit Revitalization]] (from 13: your hits have a 20% chance to cut the summon cooldowns by 1 s), [[16760000|Mental Focus]] (from 15: +3% Double Chance – the chance of a hit dealing double damage), [[16800000|Consecutive Countercurrent]] (from 17: extra damage on targets taking damage over time, e.g. from your curse) and [[16780000|Element Unification]] (from 25: every spirit skill hit gives you and your spirit +2% Critical Damage Boost for 10 s, up to 5 times)." },
      { de: '[[16720000|Spirit Protection]] (ab Stufe 6: auf Stufe 10 +20 % Verteidigung für dich und deinen Geist) auf 10 – so halten es 7 der Top 10.', en: '[[16720000|Spirit Protection]] (from level 6: +20% Defense for you and your spirit at level 10) to 10 – 7 of the top 10 do so.' },
      { de: "Was übrig bleibt: [[16200000|Defiance]] (die meisten der Top 10: 8–10), [[16770000|Spirit Communion]], [[16790000|Revitalization Contract]] und [[16070000|Soul's Cry]]. Soul's Cry ist vor allem fürs PvP: MetaRoad und Inven lassen ihn im PvE weg, 6 der Top 10 nehmen ihn trotzdem auf 10.", en: "Whatever is left: [[16200000|Defiance]] (most of the top 10: 8–10), [[16770000|Spirit Communion]], [[16790000|Revitalization Contract]] and [[16070000|Soul's Cry]]. Soul's Cry is mostly for PvP: MetaRoad and Inven skip it in PvE, 6 of the top 10 still take it to 10." },
    ],
    levels: [
      { id: 16710000 /* Spirit Strike */, level: 22, bought: 10, dv: 4, gear: 8, passive: true },
      { id: 16300000 /* Elemental Fusion */, level: 20, bought: 10, dv: 4, gear: 6 },
      { id: 16760000 /* Mental Focus */, level: 20, bought: 10, dv: 4, gear: 6.5, passive: true },
      { id: 16040000 /* Combustion */, level: 19.5, bought: 10, dv: 4, gear: 5.5 },
      { id: 16780000 /* Element Unification */, level: 18, bought: 10, dv: 4, gear: 3, passive: true },
      { id: 16100000 /* Summon: Fire Spirit */, level: 17.5, bought: 10, dv: 4, gear: 3.5 },
      { id: 16010000 /* Cold Shock */, level: 16, bought: 10, dv: 4, gear: 2 },
      { id: 16110000 /* Summon: Water Spirit */, level: 15.5, bought: 10, dv: 3.5, gear: 2 },
      { id: 16140000 /* Jointstrike: Curse */, level: 15.5, bought: 10, dv: 4, gear: 2 },
      { id: 16330000 /* Dimensional Control */, level: 14, bought: 10, dv: 4, gear: 0 },
    ],
    specs: [
      { id: 16300000 /* Elemental Fusion */, parts: [16300020 /* Elemental Fusion: Extra damage after 3s on hit */, 16300030 /* Elemental Fusion: +10 all Element Boost on hit */, 16300050 /* Elemental Fusion: 25% chance to regain Four Elements */], note: { de: 'Mehr Schaden pro Treffer, später mit etwas Glück die 4 Elemente gleich zurück. Nimm nicht die Auflade-Option (Stufe 12): Dann musst du [[16300000|Elemental Fusion]] von Hand aufladen – das Makro kann das nicht.', en: 'More damage per hit, later a chance to get Four Elements right back. Do not take the charge option (level 12): then you would have to charge [[16300000|Elemental Fusion]] by hand – the macro cannot do that.' } },
      { id: 16140000 /* Jointstrike: Curse */, parts: [16140030 /* Jointstrike: Curse: Changes to mobile skill */, 16140040 /* Jointstrike: Curse: -2s cooldown */], note: { de: 'Im Laufen einsetzbar und 2 s weniger Abklingzeit – öfter Fluch, ohne stehen zu bleiben.', en: 'Usable while moving and 2 s less cooldown – more curses without standing still.' } },
      { id: 16330000 /* Dimensional Control */, parts: [16330020 /* Dimensional Control: Extra damage after 3s on hit */, 16330030 /* Dimensional Control: +50% Multi-Hit chance on hit */], note: { de: 'Mehr Schaden: ein Zusatztreffer 3 s später und mehr Mehrfachtreffer (zusätzliche kleine Treffer). Darin sind sich MetaRoad, Skycoach und Inven einig.', en: 'More damage: an extra hit 3 s later and more Multi-Hit (extra small hits on top). MetaRoad, Skycoach and Inven agree on these.' } },
      { id: 16040000 /* Combustion */, parts: [16040040 /* Combustion: +20% Skill Speed */, 16040050 /* Combustion: Adds [Ashy Call] Chain Skill */, 16040020 /* Combustion: Deals up to 12% more damage when less targets are hit */], note: { de: 'Schneller einsetzen, ab Skillstufe 16 kommt ein Kettenskill dazu. Mit dem dritten Platz (Skillstufe 20) bis zu 12 % mehr Schaden gegen wenige Ziele – gut am Boss; bis Skillstufe 16 nimmst du das statt des Kettenskills.', en: 'Faster to use, from skill level 16 a chain skill is added. With the third slot (skill level 20) up to 12% more damage against few targets – good at the boss; until skill level 16 take it instead of the chain skill.' } },
      { id: 16010000 /* Cold Shock */, parts: [16010030 /* Cold Shock: +50% Multi-Hit on hit */, 16010040 /* Cold Shock: +2% Attack on landing [Earth Tremor] (Up to 5 stacks) */], note: { de: 'Mehr Mehrfachtreffer und +2 % Angriffskraft pro Erdbeben-Treffer (bis zu 5-mal).', en: 'More Multi-Hit and +2% Attack per Earth Tremor hit (up to 5 times).' } },
      { id: 16100000 /* Summon: Fire Spirit */, parts: [16100020 /* Summon: Fire Spirit: +20% Fire Spirit Critical Hit damage */, 16100030 /* Summon: Fire Spirit: 10% chance to activate skill when Fire Spirit lands attack */, 16100050 /* Summon: Fire Spirit: +20% Fire Spirit Stats */], note: { de: 'Dein Hauptgeist bleibt draußen: mehr kritischer Schaden und 10 % Extra-Chance auf seinen Skill (jeder Einsatz gibt dir ein Element). Ab Skillstufe 16 +20 % auf alle seine Werte – mit dem dritten Platz (Skillstufe 20) hast du alle drei.', en: 'Your main spirit stays out: more critical damage and an extra 10% chance to use its skill (every use gives you an element). From skill level 16 +20% on all its stats – with the third slot (skill level 20) you have all three.' } },
      { id: 16110000 /* Summon: Water Spirit */, parts: [16110020 /* Summon: Water Spirit: +10% Water Spirit Attack */, 16110050 /* Summon: Water Spirit: +20% Water Spirit Stats */], note: { de: 'Der Wassergeist ist in der Runde auf Taste 4 nur kurz draußen, also zählt nur sein Schaden: +10 % Angriffskraft, ab Skillstufe 16 +20 % auf alle seine Werte. Bis dahin ist der zweite Platz frei – MetaRoad und Skycoach nehmen die 10 % Chance auf seinen Skill (nützlich, wenn er für MP draußen bleibt).', en: 'In the round on key 4 the Water Spirit is out only briefly, so only its damage counts: +10% Attack, from skill level 16 +20% on all its stats. Until then the second slot is your choice – MetaRoad and Skycoach take the 10% chance to use its skill (useful when it stays out for MP).' } },
    ],
    stigmas: [
      {
        title: { de: 'Stigmen – PvE', en: 'Stigmas – PvE' },
        items: [
          { id: 16250000 /* Summon: Ancient Spirit */, note: { de: 'Dein Burst alle 90 s (30 s lang). Ab Stigma-Stufe 15 nutzt er seinen Skill nach 5 statt 7 Standardangriffen – öfter die 4 Elemente.', en: 'Your burst every 90 s (for 30 s). From stigma level 15 it uses its skill after 5 instead of 7 basic attacks – Four Elements more often.' } },
          { id: 16190000 /* Enhance: Spirit's Benediction */, note: { de: 'Für dich und deinen Geist: 10 s lang +20 % Schadensverstärkung und Schadensresistenz (PvE), dazu Heilung. Ab Stigma-Stufe 10 wirkt [[16710000|Spirit Strike]] 1,5-fach, ab Stufe 20 kommen noch einmal +25 % dazu – darum haben ihn 9 der Top 10 auf 20.', en: 'For you and your spirit: for 10 s +20% Damage Boost and Damage Tolerance (PvE), plus healing. From stigma level 10 [[16710000|Spirit Strike]] works 1.5 times as strong, from level 20 another +25% comes on top – that is why 9 of the top 10 have it at 20.' } },
          { id: 16150000 /* Jointstrike: Corrode */, note: { de: '20 s lang 10 % mehr Schaden von Geistern (ab Stigma-Stufe 5 noch einmal 15 % mehr), dazu Schaden über Zeit.', en: 'For 20 s 10% more damage from spirits (another 15% more from stigma level 5), plus damage over time.' } },
          { id: 16370000 /* Flame Blessing */, note: { de: 'Buff: mit 50 % Chance Zusatzschaden bei Treffern – auf Stigma-Stufe 10 für 14,5 s, auf Stufe 20 für 20 s. Zum Tauschen: [[16060000|Siphon]] (allein) oder [[16240000|Jointstrike: Destructive Attack]]: Die Nr. 1 der Top 10 nimmt ihn auf Stufe 20 statt Flammensegen – ab dieser Stufe setzt sein erster Treffer die Abklingzeit von Fluch und Korrosion zurück. Ab Stigma-Stufe 5 ist er ein Aufladeskill, also von Hand.', en: 'Buff: a 50% chance of extra damage on hits – for 14.5 s at stigma level 10, 20 s at level 20. To swap in: [[16060000|Siphon]] (solo) or [[16240000|Jointstrike: Destructive Attack]]: the No. 1 of the top 10 runs it at level 20 instead of Flame Blessing – from that level its first hit resets the cooldowns of Curse and Corrode. From stigma level 5 it is a charged skill, so press it by hand.' } },
        ],
      },
      {
        title: { de: 'Stigmen – PvP', en: 'Stigmas – PvP' },
        items: [
          { id: 16190000 /* Enhance: Spirit's Benediction */, note: { de: 'Bleibt: +10 % PvP-Schadensverstärkung und -Schadensresistenz plus Heilung, ab Stigma-Stufe 20 je +12,5 % dazu.', en: 'Stays: +10% PvP Damage Boost and Damage Tolerance plus healing, from stigma level 20 another +12.5% each.' } },
          { id: 16250000 /* Summon: Ancient Spirit */, note: { de: 'Bleibt: 30 s Zusatzschaden und die 4 Elemente, alle 90 s.', en: 'Stays: 30 s of extra damage and Four Elements, every 90 s.' } },
          { id: 16230000 /* Seize Magic */, note: { de: 'Entfernt bis zu 2 Buffs des Gegners (ab Stigma-Stufe 5 bis zu 3) und macht dafür Zusatzschaden.', en: 'Removes up to 2 enemy buffs (up to 3 from stigma level 5) and deals extra damage for them.' } },
          { id: 16170000 /* Command: Proxy */, note: { de: '4 s lang (ab Stigma-Stufe 5: 6 s) teilt dein Geist den Schaden, den du nimmst: Bei dir kommen auf Stigma-Stufe 1 nur 50 % an, auf Stufe 20 31 %. Alternativen: [[16260000|Magic Block]] (Siegel mit 75 % Chance) oder [[16080000|Cry of Terror]] (Furcht auf bis zu 4 Ziele).', en: 'For 4 s (6 s from stigma level 5) your spirit shares the damage you take: only 50% of it reaches you at stigma level 1, 31% at level 20. Alternatives: [[16260000|Magic Block]] (Seal with a 75% chance) or [[16080000|Cry of Terror]] (Fear on up to 4 targets).' } },
        ],
      },
    ],
    daevanion: [
      { de: '**Skill-Knoten zuerst:** +1 Stufe für [[16140000|Jointstrike: Curse]], [[16300000|Elemental Fusion]] und [[16710000|Spirit Strike]] (Nezekan hat zwei Spirit-Strike-Knoten), auf Zikel für [[16760000|Mental Focus]] und [[16780000|Element Unification]].', en: '**Skill nodes first:** +1 level for [[16140000|Jointstrike: Curse]], [[16300000|Elemental Fusion]] and [[16710000|Spirit Strike]] (Nezekan has two Spirit Strike nodes), on Zikel for [[16760000|Mental Focus]] and [[16780000|Element Unification]].' },
      { de: '**Nezekan** (ab Stufe 12): Kampftempo und Abklingzeitverringerung.', en: '**Nezekan** (from level 12): Combat Speed and Cooldown Reduction.' },
      { de: '**Zikel** (ab Stufe 20): Schadensverstärkung – bei dir weit oben.', en: '**Zikel** (from level 20): Damage Boost – high on your list.' },
      { de: '**Vaizel** (ab Stufe 30): Krit.-Schadensverstärkung. Kleine Knoten mit Angriffskraft gibt es auf jeder Tafel – nimm sie auf dem Weg mit.', en: '**Vaizel** (from level 30): Critical Damage Boost. Small Attack nodes are on every board – pick them up on the way.' },
      { de: '**Triniel** (ab Stufe 40): Mehrfachtrefferchance (zusätzliche kleine Treffer).', en: '**Triniel** (from level 40): Multi-Hit Chance (extra small hits on top of a hit).' },
      { de: '**Azphel** (ab Stufe 45) ist die PvP-Tafel. Du bezahlst sie mit **Kampfkristallen** aus dem PvP, und ihre Werte zählen nur gegen Spieler.', en: '**Azphel** (from level 45) is the PvP board. You pay for it with **Battle Crystals** from PvP, and its stats only count against players.' },
    ],
    stats: {
      de: 'Reihenfolge für die Tafeln: Angriffskraft > Schadensverstärkung > Kampftempo > Abklingzeitverringerung > Krit.-Treffer > Krit.-Schadensverstärkung > Max. MP. Kampftempo macht deine Animationen schneller, Abklingzeitverringerung bringt Skills öfter. Auf Ausrüstung und Manasteinen brauchst du genug **Präzision** (Treffsicherheit) – die meisten Guides stellen sie ganz nach vorn; danach Krit.-Treffer und Wucht (Chance auf doppelten Schaden).',
      en: 'Order for the boards: Attack > Damage Boost > Combat Speed > Cooldown Reduction > Critical Hit > Critical Damage Boost > Max MP. Combat Speed makes your animations faster, Cooldown Reduction brings skills back sooner. On gear and manastones you need enough **Accuracy** – most guides put it at the very top; then Critical Hit and Double Chance (chance of double damage).',
    },
  },
  macro: {
    keys: [
      { key: '1', ids: [16300000 /* Elemental Fusion */], macro: true, note: { de: '[[16300000|Elemental Fusion]] geht nur mit 4 Elementen. Als erster Schritt probiert das Makro sie in jeder Runde – so kommt die Fusion, sobald du die 4 Elemente hast, und du sammelst gleich wieder neue.', en: '[[16300000|Elemental Fusion]] only works with Four Elements. As the first step, the macro tries it in every round – so Fusion comes the moment you have them, and you start collecting new ones right away.' } },
      { key: '5', ids: [16150000 /* Jointstrike: Corrode */], macro: true, note: { de: 'Stigma: 20 s lang 10 % mehr Schaden von deinen Geistern (ab Stigma-Stufe 5 noch einmal 15 % mehr). Im Makro wird es neu gesetzt, sobald es bereit ist.', en: 'Stigma: for 20 s 10% more damage from your spirits (another 15% more from stigma level 5). In the macro it is renewed as soon as it is ready.' } },
      { key: '2', ids: [16330000 /* Dimensional Control */, 16140000 /* Jointstrike: Curse */], macro: true, note: { de: '[[16330000|Dimensional Control]] geht nur kurz nach einem Geist-Skill – unten fängt die Taste genau diesen Moment ab. Sonst kommt [[16140000|Jointstrike: Curse]].', en: '[[16330000|Dimensional Control]] only works for a moment after a spirit skill – at the bottom the key catches exactly that moment. Otherwise [[16140000|Jointstrike: Curse]] comes.' } },
      { key: 'T', ids: [16340000 /* Rapid Scattershot */, 16040000 /* Combustion */], macro: true, note: { de: 'Letzter Schritt im Makro. [[16340000|Rapid Scattershot]] geht nur gegen **benommene** Ziele (Stagger: Ist die Benommen-Leiste eines Bosses voll, taumelt er kurz) – deshalb unten: Ist der Boss benommen, nimmt die Taste ihn von selbst. Oben [[16040000|Combustion]] ohne Abklingzeit als Füller für Gruppen. Stufe 1 reicht für [[16340000|Rapid Scattershot]] – so halten es 8 der Top 10.', en: 'Last step of the macro. [[16340000|Rapid Scattershot]] only works on **staggered** targets (Stagger: when the stagger bar of a boss is full, it reels for a moment) – so it sits at the bottom: when the boss is staggered, the key uses it by itself. On top, [[16040000|Combustion]] has no cooldown and is your filler for packs. Level 1 is enough for [[16340000|Rapid Scattershot]] – 8 of the top 10 keep it there.' } },
      { key: 'R', ids: [16010000 /* Cold Shock */], note: { de: 'Grundattacke: linke Maustaste gedrückt halten, **nicht** ins Makro. Gibt MP zurück.', en: 'Basic attack: hold the left mouse button, **not** in the macro. Gives MP back.' } },
      { key: '8', ids: [16370000 /* Flame Blessing */], note: { de: 'Buff – als Erstes in der Eröffnung, danach alle 60 s wieder.', en: 'Buff – the very first thing in the opener, then again every 60 s.' } },
      { key: '6', ids: [16190000 /* Enhance: Spirit's Benediction */], note: { de: 'Stigma, Buff für dich und deinen Geist – von Hand in der Eröffnung, direkt nach 8 und vor dem Beschwören. Alle 60 s wieder bereit.', en: 'Stigma, a buff for you and your spirit – by hand in the opener, right after 8 and before summoning. Ready again every 60 s.' } },
      { key: '7', ids: [16250000 /* Summon: Ancient Spirit */], note: { de: 'Stigma, dein Burst alle 90 s – von Hand und nur für den Boss. Er kämpft zusätzlich zu deinem Geist auf Taste 4.', en: 'Stigma, your burst every 90 s – by hand and only for the boss. It fights in addition to your spirit from key 4.' } },
      { key: '4', ids: [16110000 /* Summon: Water Spirit */, 16130000 /* Summon: Earth Spirit */, 16120000 /* Summon: Wind Spirit */, 16100000 /* Summon: Fire Spirit */], note: { de: '**Beschwörung** – von Hand und **nach** den Buffs: Geister übernehmen deine Werte, wenn sie erscheinen. Von diesen vier kämpft immer nur einer: Jeder Druck ruft den untersten Geist, der bereit ist, und ersetzt den vorigen – der letzte bleibt. Jede Beschwörung löst den Skill des Geists aus: ein Element, ein Fenster für [[16330000|Dimensional Control]] und 10 s [[16730000|Spirit\'s Descent]]. Drück die 4 deshalb alle 15 s viermal: Wasser, Erde, Wind und zuletzt Feuer, dein Hauptgeist. Bei den Geistern davor sind sich die Guides nicht einig, einige lassen den Windgeist ganz weg (kostet weniger MP). Viele legen die Geister auch hinter [[16300000|Elemental Fusion]] auf Taste 1, damit das Makro sie ruft – hier bleiben sie von Hand, damit neue Geister direkt nach deinen Buffs kommen.', en: '**Summoning** – by hand and **after** your buffs: spirits copy your stats when they appear. Only one of these four fights at a time: each press calls the lowest spirit that is ready and replaces the one before – the last one stays. Every summon fires the spirit\'s skill: an element, a window for [[16330000|Dimensional Control]] and 10 s of [[16730000|Spirit\'s Descent]]. So press 4 four times every 15 s: Water, Earth, Wind and Fire last, your main spirit. Guides disagree on the spirits before it, and some leave out the Wind Spirit (costs less MP). Many also put the spirits behind [[16300000|Elemental Fusion]] on key 1 so the macro calls them – here they stay by hand, so new spirits come right after your buffs.' } },
      { key: '3', ids: [16070000 /* Soul's Cry */], note: { de: "Von Hand: Furcht auf ein Ziel (70 % Chance bei Spielern, bei Monstern immer). Im Makro würde [[16070000|Soul's Cry]] einzelne Monster aus deinen Gegnergruppen jagen – nutz ihn im PvP und allein.", en: "By hand: Fear on one target (70% chance on players, always on monsters). In the macro [[16070000|Soul's Cry]] would chase single monsters out of your packs – use it in PvP and solo." } },
    ],
    note: {
      de: 'Eröffnung von Hand: 8 und 6 (Buffs), 7 ([[16250000|Summon: Ancient Spirit]]), 5 ([[16150000|Jointstrike: Corrode]]), dann viermal 4 – der Feuergeist kommt zuletzt. Danach Makro-Taste und linke Maustaste gedrückt halten: Das Makro drückt 1, 5, 2 und zuletzt T. Alle 15 s drückst du wieder viermal 4; sind 8 und 6 wieder bereit (alle 60 s), drückst du sie direkt davor.',
      en: 'Opener by hand: 8 and 6 (buffs), 7 ([[16250000|Summon: Ancient Spirit]]), 5 ([[16150000|Jointstrike: Corrode]]), then press 4 four times – the Fire Spirit comes last. Then hold the macro key and the left mouse button: the macro presses 1, 5, 2 and T last. Every 15 s press 4 four times again; when 8 and 6 are ready again (every 60 s), press them just before.',
    },
  },
  mistakes: [
    { de: '**Erst beschwören, dann buffen:** Dann kämpft dein Geist mit schwächeren Werten. Immer zuerst die Buffs.', en: '**Summoning before buffing:** then your spirit fights with weaker stats. Always buff first.' },
    { de: '**Auf den 4 Elementen sitzen:** Solange du sie hast, sammelst du keine neuen. Nutze [[16300000|Elemental Fusion]] sofort.', en: '**Sitting on Four Elements:** while you have them you collect no new ones. Use [[16300000|Elemental Fusion]] right away.' },
    { de: '**Erdgeist als letzter Geist in der Gruppe:** Bleibt er draußen, zieht er die Gegner auf sich – das ist Aufgabe des Tanks. In der Runde auf Taste 4 ist er nur kurz draußen, das ist in Ordnung; zuletzt kommt der Feuergeist.', en: '**Earth Spirit as the last spirit in a group:** if it stays out, it pulls the enemies onto itself – that is the tank’s job. In the round on key 4 it is only out for a moment, which is fine; the Fire Spirit comes last.' },
    { de: '**Nur einmal beschwören:** Ein Geist, der einfach draußen bleibt, gibt dir nur ab und zu ein Element. Jede neue Beschwörung gibt dir sicher eins – drück die 4 alle 15 s viermal.', en: '**Summoning only once:** a spirit that just stays out gives you an element only now and then. Every new summon gives you one for sure – press 4 four times every 15 s.' },
    { de: '**Großer Geist an schwachen Gegnern:** [[16250000|Summon: Ancient Spirit]] kommt nur alle 90 s – spar ihn für den Boss.', en: '**Big spirit on weak mobs:** [[16250000|Summon: Ancient Spirit]] only comes every 90 s – save it for the boss.' },
    { de: '**Korrosion vergessen:** Ohne [[16150000|Jointstrike: Corrode]] fehlen deinen Geistern am Boss 10 % Zusatzschaden (ab Stigma-Stufe 5 sogar 25 %).', en: '**Forgetting the debuff:** without [[16150000|Jointstrike: Corrode]] your spirits miss out on 10% extra damage at the boss (25% from stigma level 5).' },
    { de: '**Aufladbare Fusion im Makro:** Wählst du für [[16300000|Elemental Fusion]] die Auflade-Option, lädt das Makro sie nicht auf. Nimm die Optionen aus diesem Guide oder drück sie von Hand.', en: '**A charged Fusion in the macro:** if you pick the charge option for [[16300000|Elemental Fusion]], the macro does not charge it. Take the options from this guide or press it by hand.' },
  ],
  power: {
    asOf: '2026-10-18',
    intro: {
      de: "Die Top 10 der Beschwörer haben im Median **217K** Kampfkraft bei Gegenstandsstufe **3.403** (Spanne 213–243K) – die dritthöchste Gegenstandsstufe aller Klassen, aber nur ≈67 Kampfkraft pro Stufe, so wenig wie Kantor, Templer und Kleriker. Vergleiche dich darum mit anderen Beschwörern, nicht mit der Gesamtliste.",
      en: "The top 10 Spiritmasters have a median **217K** Combat Power at item level **3,403** (range 213–243K) – the third-highest item level of all classes, but only ≈67 Combat Power per level, as little as Chanter, Templar and Cleric. So compare yourself with other Spiritmasters, not with the overall list.",
    },
    stats: { cp: 216901.5, cpMin: 213013, cpMax: 243039, itemLevel: 3403, cpPerLevel: 67.42, weekly: 50609, weeklyOf: 9, rank: { cp: 6, itemLevel: 3, cpPerLevel: 5, weekly: 5 } },
    gear: [
      {
        de: "**Waffe und Guard:** Splendent Ebony / Wise Dragon Lord Orb und Guard – alle zehn auf +15 mit Amplified +5.",
        en: "**Weapon and guard:** Splendent Ebony / Wise Dragon Lord Orb and Guard – all ten at +15 with Amplified +5.",
      },
      {
        de: "**Rüstung:** 45 von 70 Teilen Splendent (Gegenstandsstufe 102), 20 Nuakum, 4 Splendent White / Dark Dragon Lord (86); 67 Teile auf +15, 49 mit Amplified +5. 6 der 10 tragen das ganze Set.",
        en: "**Armour:** 45 of 70 pieces Splendent (item level 102), 20 Nuakum, 4 Splendent White / Dark Dragon Lord (86); 67 pieces at +15, 49 with Amplified +5. 6 of the 10 wear the full set.",
      },
      {
        de: "**Schmuck:** alle 50 Teile Splendent auf +15, 45 mit Amplified +5.",
        en: "**Jewellery:** all 50 pieces Splendent at +15, 45 with Amplified +5.",
      },
      {
        de: "**Armreifen und Rest:** genau ein Ascension Bracelet (mehr trägt keiner der Top 80) (+10 oder +15) plus meist ein Liberator Bracelet +10; Revelation Amulet +10 und Noble Belt +10 (je 7 von 10). Flügel: Dark Veil (4), Kromede, Talisra oder Forest Spirit (je 2).",
        en: "**Bracelets and the rest:** exactly one Ascension Bracelet (none of the top 80 wears more) (+10 or +15) plus mostly a Liberator Bracelet +10; Revelation Amulet +10 and Noble Belt +10 (7 of 10 each). Wings: Dark Veil (4), Kromede, Talisra or Forest Spirit (2 each).",
      },
    ],
    arcana: {
      de: "**Bell of Magic** bei allen zehn, **Chalice und Parchment of Vigor** (10 und 9), **Compass of Vigor** (7); beim Mirror ist es halb und halb. 39 von 50 Karten sind auf +5.",
      en: "**Bell of Magic** for all ten, **Chalice and Parchment of Vigor** (10 and 9), **Compass of Vigor** (7); the Mirror is half and half. 39 of 50 cards are at +5.",
    },
    stigmas: [
      { id: 16190000, note: { de: '10 von 10 · Median Stufe 20', en: '10 of 10 · median level 20' } },
      { id: 16250000, note: { de: '10 von 10 · Median Stufe 20', en: '10 of 10 · median level 20' } },
      { id: 16370000, note: { de: '8 von 10 · Median Stufe 20', en: '8 of 10 · median level 20' } },
      { id: 16150000, note: { de: '8 von 10 · Median Stufe 13', en: '8 of 10 · median level 13' } },
    ],
    slotted: [
      { id: 16190000 /* Enhance: Spirit's Benediction */, n: 10, level: 20 },
      { id: 16250000 /* Summon: Ancient Spirit */, n: 10, level: 20 },
      { id: 16370000 /* Flame Blessing */, n: 8, level: 20 },
      { id: 16150000 /* Jointstrike: Corrode */, n: 8, level: 13 },
      { id: 16170000 /* Command: Proxy */, n: 2, level: 14.5 },
      { id: 16240000 /* Jointstrike: Destructive Attack */, n: 1, level: 20 },
      { id: 16230000 /* Seize Magic */, n: 1, level: 20 },
    ],
    tips: [
      {
        de: "**Nuakum als Zwischenschritt:** 20 von 70 Rüstungsteilen der Top 10 sind noch Nuakum (Gegenstandsstufe 86), meist auf +15 mit Amplified. Den Wechsel aufs Splendent-Set kannst du dir also Zeit lassen.",
        en: "**Nuakum as a step in between:** 20 of 70 armour pieces of the top 10 are still Nuakum (item level 86), mostly at +15 with Amplified. So you can take your time switching to the Splendent set.",
      },
      {
        de: "**Weniger Kampfkraft pro Stufe:** Bei gleicher Gegenstandsstufe zeigt der Beschwörer ≈8 % weniger als der Waldläufer. Warum, sagt keine Quelle – deine Schadenszahlen sind davon nicht betroffen.",
        en: "**Less Combat Power per level:** at the same item level the Spiritmaster shows ≈8% less than the Ranger. No source says why – it says nothing about your damage.",
      },
      {
        de: "**Daevanion:** Im Median sind 62, 61 und 61 von 88 Knoten auf den ersten drei Tafeln offen, 73 von 116 auf der vierten und 35 von 152 auf der fünften.",
        en: "**Daevanion:** at the median 62, 61 and 61 of 88 nodes are open on the first three boards, 73 of 116 on the fourth and 35 of 152 on the fifth.",
      },
    ],
  },
  playstyles: spiritmasterPlaystyles,
  sources: [
    { href: 'https://metabot.gg/en/aion-2/classes/spiritmaster', label: 'Metabot – Spiritmaster' },
    { href: 'https://metaroad.gg/aion2/build-guides/spiritmaster-pve-build', label: 'MetaRoad – Spiritmaster PvE build' },
    { href: 'https://games.gg/aion-2/guides/aion-2-spiritmaster-guide/', label: 'games.gg – Spiritmaster guide' },
    { href: 'https://game8.co/games/Aion-2/archives/612293', label: 'Game8 – Spiritmaster' },
    { href: 'https://www.inven.co.kr/board/aion2/6454/8152', label: 'Inven (KR) – Spiritmaster forum (1)' },
    { href: 'https://www.inven.co.kr/board/aion2/6454/9216', label: 'Inven (KR) – Spiritmaster forum (2)' },
    { href: 'https://gameplay.tips/guides/aion-2-spiritmaster-rotation-macros-guide.html', label: 'Gameplay Tips – Spiritmaster rotation & macros' },
    { href: 'https://skycoach.gg/blog/aion-2/articles/spiritmaster-guide', label: 'Skycoach – Spiritmaster class guide' },
  ],
  caveat: {
    de: "Bei den Geistern vor dem Feuergeist sind sich die Guides nicht einig, und ob der Windgeist überhaupt mitkommt: MetaRoad und Inven lassen ihn weg, Gameplay Tips nimmt alle vier. Einig sind sie sich nur, dass der Feuergeist zuletzt kommt. Auch Furcht im PvP sehen sie verschieden: Für Metabot ist sie das wichtigste Werkzeug, laut Gameplay Tips löst der Gegner sie zu leicht mit Schockaufhebung. Koreanische Builds haben 6 Stigmen, der globale Client 4. Builds ändern sich mit Patches – was bei dir im Spiel funktioniert, zählt.",
    en: "Guides do not agree on the spirits before the Fire Spirit, or on whether the Wind Spirit comes along at all: MetaRoad and Inven leave it out, Gameplay Tips uses all four. They only agree that the Fire Spirit comes last. They also differ on Fear in PvP: for Metabot it is the main tool, Gameplay Tips says enemies break it too easily with Defiance. Korean builds have 6 stigmas, the global client 4. Builds change with patches – what works for you in game wins.",
  },
});
