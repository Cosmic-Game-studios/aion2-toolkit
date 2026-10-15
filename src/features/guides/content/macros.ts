import type { Guide } from '../types';

/**
 * How the in-game skill macro works, walked through step by step on the most common Gladiator chain, with the
 * numbers from 3,169 public global macros (questlog.gg, counted by aion2vault on 2026-10-14).
 */
export const macros: Guide = {
  id: 'macros',
  icon: 'macro',
  tone: 'blue',
  category: 'basics',
  title: {
    de: 'Makro & Skill-Leiste einfach erklärt',
    en: 'Macro & hotbar made simple',
  },
  summary: {
    de: 'Wie das Skill-Makro wirklich arbeitet – Schritt für Schritt an der beliebtesten Gladiator-Kette erklärt. Dazu, was Spieler ins Makro legen und was nicht, mit echten Zahlen aus über 3.000 Makros.',
    en: 'How the skill macro really works – explained step by step on the most popular Gladiator chain. Plus what players put into the macro and what they keep out, with real numbers from more than 3,000 macros.',
  },
  updated: '2026-10-15',
  tags: [
    { de: 'Makro', en: 'Macro' },
    { de: 'Skill-Leiste', en: 'Hotbar' },
    { de: 'Statistik', en: 'Statistics' },
    { de: 'Einsteiger', en: 'Beginner' },
  ],
  basis: {
    de: '3.169 öffentliche Makros aus dem globalen Client (questlog.gg, ausgezählt von aion2vault am 14.10.2026), die Skilltexte des Spiels, Patchnotes und Creator-Guides (Quellen unten)',
    en: '3,169 public macros from the global client (questlog.gg, counted by aion2vault on 2026-10-14), the skill texts of the game, patch notes and creator guides (sources below)',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'facts',
          items: [
            { label: { de: 'Anzahl', en: 'How many' }, value: { de: '**Ein** Skill-Makro auf **einer** Taste – die meisten nehmen die rechte Maustaste', en: '**One** skill macro on **one** key – most players use the right mouse button' } },
            { label: { de: 'Ein Schritt', en: 'One step' }, value: { de: 'Eine Leisten-Taste = eine **Kette** aus bis zu 4 Skills', en: 'One hotbar key = one **chain** of up to 4 skills' } },
            { label: { de: 'Länge', en: 'Length' }, value: { de: '**95 %** aller Makros haben 5 Schritte oder weniger', en: '**95%** of all macros have 5 steps or fewer' } },
            { label: { de: 'Verzögerung', en: 'Delay' }, value: { de: '**10 ms** pro Schritt – so stellen es 82 % ein (ab 80 ms Ping lieber 40–50 ms)', en: '**10 ms** per step – 82% use that (with ping of 80 ms or more better 40–50 ms)' } },
            { label: { de: 'Benutzen', en: 'Use' }, value: { de: 'Makro-Taste **und** linke Maustaste (Grundattacke) zusammen gedrückt halten', en: 'Hold the macro key **and** the left mouse button (basic attack) together' } },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Das Wichtigste in zwei Sätzen', en: 'The key idea in two sentences' },
          text: {
            de: 'Das Makro drückt deine Tasten der Reihe nach und fängt dann wieder vorne an. Jede Taste nimmt den **ersten Skill ihrer Kette, der gerade geht** – geht keiner, springt das Makro sofort zur nächsten Taste.',
            en: 'The macro presses your keys one after another and then starts over. Every key uses the **first skill of its chain that works right now** – if none works, the macro moves straight on to the next key.',
          },
        },
      ],
    },
    {
      title: { de: 'So arbeitet das Makro – ein Beispiel', en: 'How the macro works – an example' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Ein Gladiator mit dem kleinsten guten Makro: **zwei Schritte**, erst Taste 1, dann Taste T. Auf Taste 1 liegt die Kette, die **56 % aller öffentlichen Gladiator-Makros** benutzen. Auf T liegt der Füller. Die linke Maustaste mit der Grundattacke [[11020000]] hältst du die ganze Zeit.',
            en: 'A Gladiator with the smallest good macro: **two steps**, first key 1, then key T. Key 1 holds the chain that **56% of all public Gladiator macros** use. T holds the filler. You hold the left mouse button with the basic attack [[11020000]] all the time.',
          },
        },
        {
          type: 'keys',
          items: [
            {
              key: '1',
              ids: [11390000, 11170000],
              macro: true,
              note: {
                de: '[[11390000]] schaltet [[11170000]] für 10 s frei. Sonst trifft Abwärtsschlag nur niedergeworfene Gegner – und Bosse lassen sich nicht niederwerfen.',
                en: '[[11390000]] unlocks [[11170000]] for 10 s. Otherwise Overhead Slam only hits knocked-down enemies – and bosses cannot be knocked down.',
              },
            },
            {
              key: 'T',
              ids: [11280000, 11010000],
              macro: true,
              note: {
                de: '[[11280000]] geht nur gegen taumelnde Gegner. Dahinter der Füller [[11010000]] ohne Abklingzeit.',
                en: '[[11280000]] only works against staggered enemies. Behind it the filler [[11010000]] without cooldown.',
              },
            },
            {
              key: 'LMB',
              ids: [11020000],
              note: {
                de: 'Grundattacke: gedrückt halten, **nicht** ins Makro. Sie füllt MP auf und bricht das Ende anderer Animationen ab.',
                en: 'Basic attack: hold it, **not** in the macro. It refills MP and cancels the end of other animations.',
              },
            },
          ],
        },
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Alles ist bereit → Taste 1: [[11390000]]', en: 'Everything is ready → key 1: [[11390000]]' },
              text: {
                de: 'Der erste Skill der Kette kommt zuerst. Er schwächt den Angriff des Bosses (Verwundet), gibt dir 10 s lang +10 % PvE-Schaden – und schaltet [[11170000]] für 10 s frei.',
                en: 'The first skill of the chain goes first. It weakens the boss’s Attack (Wounded), gives you +10% PvE damage for 10 s – and unlocks [[11170000]] for 10 s.',
              },
            },
            {
              title: { de: 'Weiter halten → Taste T: [[11010000]]', en: 'Keep holding → key T: [[11010000]]' },
              text: {
                de: 'Der Boss taumelt nicht, also nimmt T den Füller. Sein Folgeschlag erscheint auf derselben Taste – beim nächsten Druck auf T kommt er.',
                en: 'The boss is not staggered, so T uses the filler. Its follow-up appears on the same key – the next press of T uses it.',
              },
            },
            {
              title: { de: 'Wieder Taste 1 → [[11170000]]', en: 'Key 1 again → [[11170000]]' },
              text: {
                de: 'Furorausbruch wartet jetzt 45 s, also nimmt Taste 1 den zweiten Skill. Er geht, weil Furorausbruch ihn freigeschaltet hat – **das ist die Kombo**.',
                en: 'Rage Burst now waits 45 s, so key 1 uses the second skill. It works because Rage Burst unlocked it – **that is the combo**.',
              },
            },
            {
              title: { de: 'Auf Taste 1 geht nichts → weiter zu T', en: 'Nothing works on key 1 → on to T' },
              text: {
                de: 'Abwärtsschlag braucht 5 s. So lange geht auf Taste 1 nichts, und das Makro springt gleich weiter zu T. Die Grundattacke auf der linken Maustaste füllt jede Lücke.',
                en: 'Overhead Slam needs 5 s. Until then nothing works on key 1, and the macro moves straight on to T. The basic attack on the left mouse button fills every gap.',
              },
            },
            {
              title: { de: 'Nach 5 s → noch einmal [[11170000]]', en: 'After 5 s → [[11170000]] once more' },
              text: {
                de: 'Die 10 s von Furorausbruch laufen noch – also kommt Abwärtsschlag ein zweites Mal.',
                en: 'The 10 s from Rage Burst are still running – so Overhead Slam comes a second time.',
              },
            },
            {
              title: { de: 'Der Boss taumelt → Taste T: [[11280000]]', en: 'The boss staggers → key T: [[11280000]]' },
              text: {
                de: 'Jetzt geht der erste Skill auf T. Er hat keine Abklingzeit und kommt bei jedem Druck, bis das Taumeln vorbei ist. Danach nimmt T wieder den Füller.',
                en: 'Now the first skill on T works. It has no cooldown and comes on every press until the stagger is over. Then T goes back to the filler.',
              },
            },
            {
              title: { de: 'Nach 45 s → wieder [[11390000]]', en: 'After 45 s → [[11390000]] again' },
              text: {
                de: 'Furorausbruch ist wieder bereit und steht in seiner Kette vorne – also kommt er sofort, und alles geht von vorne los. So läuft das Makro von selbst im Kreis – **das ist deine Rotation**.',
                en: 'Rage Burst is ready again and sits first in its chain – so it comes right away, and everything starts over. That way the macro keeps cycling by itself – **that is your rotation**.',
              },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Darum steht der Füller hinten', en: 'This is why the filler goes last' },
          text: {
            de: 'Ein Skill ohne Abklingzeit geht **immer**. Steht er vorne in der Kette, nimmt die Taste immer nur ihn – alles dahinter kommt nie dran. Also: lange Abklingzeiten und Skills mit Bedingung nach vorne, den Füller ans Ende.',
            en: 'A skill without a cooldown **always** works. If it sits first in the chain, the key only ever uses it – nothing behind it ever fires. So: long cooldowns and skills with a condition first, the filler last.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Warum der Füller auf eine eigene Taste kommt', en: 'Why the filler gets a key of its own' },
          text: {
            de: 'Eine Taste, auf der gerade nichts geht, überspringt das Makro. Eine Taste mit Füller am Ende wirkt dagegen jedes Mal einen ganzen Schlag. Liegt der Füller nur auf T, dem **letzten Schritt**, kommen deine starken Skills sofort, sobald sie bereit sind. Hast du nur **eine** Kette im Makro, darf der Füller auch an ihr Ende – so machen es viele Gladiatoren.',
            en: 'The macro skips a key on which nothing works right now. A key with a filler at the end, on the other hand, casts a full hit every time. With the filler only on T, the **last step**, your strong skills come the moment they are ready. If you have only **one** chain in the macro, the filler may also go at its end – many Gladiators do that.',
          },
        },
      ],
    },
    {
      title: { de: 'Welche Taste wofür', en: 'Which key for what' },
      blocks: [
        {
          type: 'facts',
          items: [
            { label: { de: 'Linke Maustaste', en: 'Left mouse button' }, value: { de: 'Grundattacke – halten, nie ins Makro', en: 'Basic attack – hold it, never in the macro' } },
            { label: { de: '1–4', en: '1–4' }, value: { de: 'Meist deine Angriffsketten fürs Makro – Kombo-Ketten zuerst', en: 'Mostly your attack chains for the macro – combo chains first' } },
            { label: { de: 'T', en: 'T' }, value: { de: 'Füller, letzter Schritt im Makro – davor ein Taumel-Skill, wenn deine Klasse einen hat', en: 'Filler, last step of the macro – a Stagger skill in front of it if your class has one' } },
            { label: { de: 'Q, E', en: 'Q, E' }, value: { de: 'Ansturm, Sprung, Ausweichen – von Hand', en: 'Charge, leap, evasion – by hand' } },
            { label: { de: '5–8', en: '5–8' }, value: { de: 'Buffs und Stigmen – große Buffs von Hand in der Eröffnung', en: 'Buffs and stigmas – big buffs by hand in the opener' } },
            { label: { de: 'Leertaste', en: 'Space' }, value: { de: '**Schockaufhebung** – liegt im Spiel fest dort, nicht in der Leiste und nicht im Makro', en: '**Defiance** – fixed there in game, not on the hotbar and not in the macro' } },
          ],
        },
        {
          type: 'text',
          text: {
            de: 'Das sind die Standard-Tasten; im Spiel kannst du jede ändern. Die Belegung für deine Klasse zeigt dein Klassen-Guide im Abschnitt „Leiste & Makro“.',
            en: 'These are the default keys; you can change any of them in game. The guide for your class shows its layout in the “Hotbar & macro” section.',
          },
        },
        {
          type: 'links',
          items: [
            { href: '#/hotbar', label: { de: 'Leiste & Makro im Planer bauen', en: 'Build hotbar & macro in the planner' }, primary: true },
            { href: '#/guides', label: { de: 'Klassen-Guides ansehen', en: 'Browse the class guides' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Was Spieler ins Makro legen', en: 'What players put into the macro' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die häufigsten Ketten in den öffentlichen Makros jeder Klasse – als Anteil an allen Makros der Klasse (Stand 14.10.2026). Die Hälfte aller öffentlichen Builds hat ein Makro: 3.169 von 6.322.',
            en: 'The most common chains in the public macros of each class – as a share of all macros of that class (as of 2026-10-14). Half of all public builds have a macro: 3,169 of 6,322.',
          },
        },
        {
          type: 'list',
          items: [
            { de: '**Gladiator:** [[11390000]] › [[11170000]] › [[11010000]] – **56 %**. Oft dazu [[11400000]] › [[11250000]] (23 %).', en: '**Gladiator:** [[11390000]] › [[11170000]] › [[11010000]] – **56%**. Often with [[11400000]] › [[11250000]] (23%).' },
            { de: '**Templer:** [[12070000]] › [[12240000]] › [[12100000]] › [[12350000]] – **41 %** und [[12270000]] › [[12300000]] › [[12040000]] – **38 %**.', en: '**Templar:** [[12070000]] › [[12240000]] › [[12100000]] › [[12350000]] – **41%** and [[12270000]] › [[12300000]] › [[12040000]] – **38%**.' },
            { de: '**Assassine:** Jede beliebte Kette beginnt mit [[13130000]] und endet auf [[13100000]] – drei Varianten, zusammen **68 %**, z. B. mit [[13060000]] und [[13340000]] dazwischen (27 %).', en: '**Assassin:** every popular chain starts with [[13130000]] and ends on [[13100000]] – three versions, **68%** together, e.g. with [[13060000]] and [[13340000]] in between (27%).' },
            { de: '**Waldläufer:** [[14110000]] › [[14050000]] › [[14340000]] – **53 %**, dazu eine Kette, die vor [[14080000]] verlangsamt: [[14130000]] › [[14360000]] › [[14080000]] (25 %).', en: '**Ranger:** [[14110000]] › [[14050000]] › [[14340000]] – **53%**, plus a chain that slows before [[14080000]]: [[14130000]] › [[14360000]] › [[14080000]] (25%).' },
            { de: '**Magier:** drei Ketten, jede in **57–60 %**: [[15400000]] › [[15390000]] › [[15200000]] › [[15320000]], dann [[15110000]] › [[15280000]] › [[15150000]] › [[15040000]], dann [[15050000]] › [[15220000]].', en: '**Sorcerer:** three chains, each in **57–60%**: [[15400000]] › [[15390000]] › [[15200000]] › [[15320000]], then [[15110000]] › [[15280000]] › [[15150000]] › [[15040000]], then [[15050000]] › [[15220000]].' },
            { de: '**Beschwörer:** [[16140000]] › [[16300000]] › [[16330000]] › [[16040000]] – **52 %**, dazu bei 61 % die Grundattacke [[16010000]] als eigener Schritt – die hältst du besser auf der linken Maustaste.', en: '**Spiritmaster:** [[16140000]] › [[16300000]] › [[16330000]] › [[16040000]] – **52%**, plus the basic attack [[16010000]] as a step of its own in 61% – better hold it on the left mouse button.' },
            { de: '**Kleriker:** kurze Ketten – [[17040000]] (51 %), [[17070000]] › [[17350000]] (40 %), [[17150000]] (40 %), [[17080000]] (37 %).', en: '**Cleric:** short chains – [[17040000]] (51%), [[17070000]] › [[17350000]] (40%), [[17150000]] (40%), [[17080000]] (37%).' },
            { de: '**Kantor:** [[18100000]] › [[18290000]] › [[18060000]] › [[18040000]] – **64 %**.', en: '**Chanter:** [[18100000]] › [[18290000]] › [[18060000]] › [[18040000]] – **64%**.' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Beliebt heißt nicht immer gut', en: 'Popular is not always best' },
          text: {
            de: 'Viele öffentliche Builds kommen von Spielern, die ihre Klasse noch lernen – die Zahlen zeigen, was verbreitet ist. Prüf eine Kette deshalb an den Skilltexten: Ein Skill, der nur nach einem anderen geht, gehört in dieselbe Kette wie der Skill, der ihn möglich macht.',
            en: 'Many public builds come from players who are still learning their class – the numbers show what is common. So check a chain against the skill texts: a skill that only works after another one belongs in the same chain as the skill that enables it.',
          },
        },
      ],
    },
    {
      title: { de: 'Was nicht ins Makro gehört', en: 'What stays out of the macro' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Bei diesen Skills sind sich fast alle einig. Die Zahl ist der Anteil der Makros, die den Skill **draußen lassen** – unter allen Builds, die ihn auf der Leiste haben:',
            en: 'Almost everyone agrees on these skills. The number is the share of macros that **keep the skill out** – among all builds that have it on the hotbar:',
          },
        },
        {
          type: 'skills',
          items: [
            { id: 15060000, note: { de: '**98 %** – Aufladeskill. Aus dem Makro kommt er nur auf der ersten Stufe: gemessen rund 15.000–16.000 statt 22.000 Schaden pro Sekunde.', en: '**98%** – charged skill. From the macro it only fires at the first charge level: measured about 15,000–16,000 instead of 22,000 damage per second.' } },
            { id: 14010000, note: { de: '**98 %** – Aufladeskill', en: '**98%** – charged skill' } },
            { id: 12090000, note: { de: '**95 %** – Aufladeskill', en: '**95%** – charged skill' } },
            { id: 16240000, note: { de: '**97 %** – ab Stigma-Stufe 5 ein Aufladeskill', en: '**97%** – a charged skill from stigma level 5' } },
            { id: 11190000, note: { de: '**98 %** – springt zum Ziel, auch mitten in einen Boss-Angriff', en: '**98%** – leaps to the target, even right into a boss attack' } },
            { id: 12430000, note: { de: '**98 %** – Ansturm', en: '**98%** – charge' } },
            { id: 13070000, note: { de: '**98 %** – bringt dich zum Ziel', en: '**98%** – takes you to the target' } },
            { id: 14090000, note: { de: '**96 %** – bewegt dich, im Makro gibt es erzwungene Sprünge', en: '**96%** – moves you, in the macro it causes forced jumps' } },
            { id: 17120000, note: { de: '**100 %** – Heilung', en: '**100%** – heal' } },
            { id: 18120000, note: { de: '**100 %** – Heilung', en: '**100%** – heal' } },
            { id: 18190000, note: { de: '**99 %** – großer Buff, von Hand', en: '**99%** – big buff, by hand' } },
            { id: 17410000, note: { de: '**99 %** – Buff, von Hand', en: '**99%** – buff, by hand' } },
          ],
        },
        {
          type: 'checklist',
          items: [
            { de: '**Aufladeskills von Hand:** Voll aufgeladen machen sie deutlich mehr Schaden.', en: '**Charged skills by hand:** fully charged they deal a lot more damage.' },
            { de: '**Ansturm, Sprung und Bewegung von Hand:** Sonst trägt dich das Makro mitten in einen Boss-Angriff.', en: '**Charges, leaps and movement by hand:** otherwise the macro carries you right into a boss attack.' },
            { de: '**Heilungen und große Buffs von Hand:** Im Makro verpuffen sie an schwachen Gegnern. Ausnahme: Schadensskills, die nebenbei buffen oder heilen, wie [[11390000]] – den haben 94 % der Gladiatoren im Makro.', en: '**Heals and big buffs by hand:** in the macro they are wasted on weak monsters. Exception: damage skills that also buff or heal, like [[11390000]] – 94% of Gladiators have it in the macro.' },
            { de: '**Schalter und Begleiter von Hand:** Ein Mantra oder ein anderer Schalter geht beim zweiten Druck wieder aus – das Makro würde ihn ständig ausschalten. Geister und andere Begleiter, die mit dir kämpfen, rufst du selbst. Schadenszonen, die nur ein paar Sekunden stehen bleiben und Schaden machen – wie [[15390000]] –, zählen als Angriffe und dürfen ins Makro.', en: '**Switches and companions by hand:** a mantra or another switch turns off on the second press – the macro would keep turning it off. Call spirits and other companions that fight with you yourself. Damage zones that only stay for a few seconds and deal damage – like [[15390000]] – count as attacks and may go into the macro.' },
            { de: '**Grundattacke nie ins Makro:** Du hältst sie auf der linken Maustaste. Manche legen sie trotzdem als eigenen Schritt hinein – 61 % der Beschwörer [[16010000]] und 31 % der Kantoren [[18010000]]. Mit gehaltener linker Maustaste brauchst du das nicht.', en: '**Never put the basic attack in the macro:** you hold it on the left mouse button. Some players still add it as a step of its own – 61% of Spiritmasters [[16010000]] and 31% of Chanters [[18010000]]. With the left mouse button held you do not need that.' },
            { de: '**Schockaufhebung bleibt auf der Leertaste** – du drückst sie genau dann, wenn du betäubt oder niedergeworfen bist.', en: '**Defiance stays on Space** – you press it exactly when you are stunned or knocked down.' },
            { de: '**Kettenskills:** Der Folge-Skill erscheint auf derselben Taste – der nächste Druck nutzt ihn.', en: '**Chain skills:** the follow-up appears on the same key – the next press uses it.' },
            { de: '**Nach jeder Build-Änderung an der Trainingspuppe testen:** Spezialisierungen ändern Abklingzeiten und Bedingungen.', en: '**Test on the training dummy after every build change:** specialisations change cooldowns and conditions.' },
          ],
        },
      ],
    },
    {
      title: { de: 'So richtest du es ein', en: 'How to set it up' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Ketten bauen', en: 'Build the chains' },
              text: {
                de: 'In der Skill-Leiste einen Skill anklicken und dann den Platz, auf den er soll – nicht ziehen. Bis zu 4 Skills pro Taste.',
                en: 'On the skill bar click a skill and then the slot it should go to – do not drag it. Up to 4 skills per key.',
              },
            },
            {
              title: { de: 'Ketten ordnen', en: 'Order the chains' },
              text: {
                de: 'Lange Abklingzeit und Skills mit Bedingung nach vorne, Füller ans Ende.',
                en: 'Long cooldowns and skills with a condition first, the filler last.',
              },
            },
            {
              title: { de: 'Makro füllen', en: 'Fill the macro' },
              text: {
                de: 'Skill-Fenster (**K**) öffnen, oben rechts der Makro-Bereich: pro Kette einen Schritt anlegen, Kombo-Ketten zuerst, T zuletzt, überall 10 ms.',
                en: 'Open the Skill window (**K**), the macro area is at the top right: add one step per chain, combo chains first, T last, 10 ms everywhere.',
              },
            },
            {
              title: { de: 'Taste belegen', en: 'Bind a key' },
              text: {
                de: 'Einstellungen → Tastenbelegung → Allgemein → **Makro** (direkt nach „Reittier“). Ab Werk ist keine Taste belegt. Die meisten nehmen die rechte Maustaste. Mit der AION-1-Steuerung geht keine Maustaste – nimm dann eine Tastatur-Taste.',
                en: 'Settings → Key Settings → General → **Macro** (right after “Mount”). No key is bound by default. Most players use the right mouse button. With the AION 1 control mode a mouse button does not work – use a keyboard key then.',
              },
            },
            {
              title: { de: 'An der Trainingspuppe testen', en: 'Test on the training dummy' },
              text: {
                de: 'Makro und linke Maustaste halten und zusehen: Kommt ein Skill zu früh, zu spät oder gar nicht, ändere die Reihenfolge oder die Verzögerung.',
                en: 'Hold the macro and the left mouse button and watch: if a skill comes too early, too late or not at all, change the order or the delay.',
              },
            },
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Verzögerung:** 10 ms ist Standard. Mit Ping ab 80 ms nimmt aLuckyRO 50 ms; kommen einzelne Skills zu früh oder zu spät, probier an der Puppe längere Werte.', en: '**Delay:** 10 ms is the default. With ping of 80 ms or more aLuckyRO uses 50 ms; if single skills come too early or too late, try longer values on the dummy.' },
            { de: '**Skill-Warteschlange** (Einstellungen → Steuerung): Hier sind sich die Creator nicht einig – manche schalten sie aus, weil sonst Skills mit langer Animation hängen. Probier beides an der Puppe.', en: '**Skill Queue** (Settings → Controls): the creators disagree here – some turn it off because otherwise skills with long animations get stuck. Try both on the dummy.' },
            { de: '**Reihenfolge nicht garantiert:** Das Spiel warnt selbst, dass das Makro einen Schritt überspringt, der nicht geht. Jede Taste muss also für sich das Richtige tun.', en: '**Order not guaranteed:** the game itself warns that the macro skips a step that does not work. So every key has to do the right thing on its own.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Was ist eine Rotation?', en: 'What is a rotation?' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Eine **Rotation** ist die Reihenfolge, in der du deine Skills einsetzt – immer wieder. Mit Ketten und Makro baust du sie so, dass sie fast von selbst läuft:',
            en: 'A **rotation** is the order in which you use your skills – over and over. With chains and the macro you build it so that it almost runs by itself:',
          },
        },
        {
          type: 'steps',
          items: [
            { title: { de: 'Stärken', en: 'Empower' }, text: { de: 'Große Buffs zuerst – von Hand in der Eröffnung.', en: 'Big buffs first – by hand in the opener.' } },
            { title: { de: 'Vorbereiten', en: 'Set up' }, text: { de: 'Skills, die eine Bedingung schaffen: freischalten, verlangsamen, Male setzen, Verteidigung senken.', en: 'Skills that create a condition: unlock, slow, place marks, lower Defense.' } },
            { title: { de: 'Zuschlagen', en: 'Strike' }, text: { de: 'Die Skills, die davon profitieren – in derselben Kette, damit sie sofort kommen.', en: 'The skills that profit from it – in the same chain, so they come right away.' } },
            { title: { de: 'Lücken füllen', en: 'Fill the gaps' }, text: { de: 'Füller auf T und die Grundattacke, die du die ganze Zeit hältst.', en: 'The filler on T and the basic attack you hold all the time.' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Erlaubt?', en: 'Allowed?' },
      blocks: [
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Das eingebaute Makro: ja', en: 'The built-in macro: yes' },
          text: {
            de: 'NCSOFT hat das Makro extra eingebaut, damit niemand fremde Makro-Programme braucht. Es ist ausdrücklich zum Benutzen da – und es spielt nicht für dich: Ziel wählen, ausweichen und Buffs zünden musst du selbst.',
            en: 'NCSOFT built the macro in so nobody needs third-party macro programs. It is meant to be used – and it does not play for you: picking the target, dodging and firing buffs is still up to you.',
          },
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Externe Makros: nein', en: 'External macros: no' },
          text: {
            de: 'Makros aus Maus-Software oder Programmen, die Tasten für dich drücken, werden bestraft: In Korea gab es 30-Tage-Sperren und Anzeigen, im globalen Client eine Bannwelle am 10./11. Oktober 2026. Dieser Planer drückt keine Tasten – er hilft dir nur beim Aufbau.',
            en: 'Macros from mouse software or programs that press keys for you get punished: Korea saw 30-day suspensions and criminal complaints, the global client a ban wave on 10/11 October 2026. This planner presses no keys – it only helps you set things up.',
          },
        },
      ],
    },
    {
      title: { de: 'Quellen', en: 'Sources' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Die Zahlen stammen aus den Makros der öffentlichen Builds des globalen Clients auf questlog.gg, ausgezählt von aion2vault (14.10.2026). Wie das Makro im Spiel arbeitet, zeigen die Videos von DrybearGamers, MistaWigglez und GunghoGuns Gaming; die Hellfire-Messung stammt von EUTOPIA. Die Kombo im Beispiel steht im Skilltext von Furorausbruch.',
            en: 'The numbers come from the macros of the public global-client builds on questlog.gg, counted by aion2vault (2026-10-14). How the macro works in game is shown in the videos of DrybearGamers, MistaWigglez and GunghoGuns Gaming; the Hellfire measurement is by EUTOPIA. The combo in the example is written in the skill text of Rage Burst.',
          },
        },
        {
          type: 'sources',
          items: [
            { href: 'https://aion2vault.com/builds/macros/', label: 'AION2 Vault – Macro guide with shares from 3,169 public macros (2026-10-14)' },
            { href: 'https://aion2vault.com/builds/gladiator/pve/', label: 'AION2 Vault – Gladiator PvE build' },
            { href: 'https://aion2.plaync.com/ko-kr/board/update/view?articleId=69791238ba0dc1026f956b24', label: 'AION 2 (KR) – patch notes 2026-01-28: skill macro' },
            { href: 'https://www.inven.co.kr/board/aion2/6388/202449', label: 'Inven – patch notes 2026-05-27 (steps = keys, 10 ms)' },
            { href: 'https://couga54.github.io/aion2-guides/en/settings/', label: 'AION 2 Guides – Settings' },
            { href: 'https://aion2.wiki.fextralife.com/Controls', label: 'Fextralife – Controls' },
            { href: 'https://www.pcgamesn.com/aion-2/bots-gold-farming-bans', label: 'PCGamesN – Bans for bots and macros' },
          ],
        },
      ],
    },
  ],
};
