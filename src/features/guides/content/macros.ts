import type { Guide } from '../types';

/**
 * How the in-game skill macro works: how it walks the keys, how a key picks a skill of its chain, how to order chains,
 * what stays manual, the macros of the eight class guides and the settings. Rests on the skill data of the global
 * client, the key layouts of the class guides (content/class-*.ts, the same layouts the "Top 10 hotbar" uses), the
 * Korean patch notes of 2026-05-27 and creator / guide-site pages (sources). Usage shares that other sites counted from
 * questlog.gg builds are deliberately not used (questlog.gg: link only), and no DPS-meter measurements either.
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
    de: 'Wie das Skill-Makro wirklich arbeitet: wie es deine Tasten abläuft, welcher Skill einer Kette kommt, wie du Ketten richtig ordnest und was von Hand bleibt – mit Diagrammen, einem Gladiator-Beispiel und den Makros aller acht Klassen-Guides.',
    en: 'How the skill macro really works: how it walks your keys, which skill of a chain fires, how to order your chains and what stays manual – with diagrams, a Gladiator example and the macros of all eight class guides.',
  },
  updated: '2026-10-19',
  tags: [
    { de: 'Makro', en: 'Macro' },
    { de: 'Skill-Leiste', en: 'Hotbar' },
    { de: 'Rotation', en: 'Rotation' },
    { de: 'Einsteiger', en: 'Beginner' },
  ],
  basis: {
    de: 'Skilldaten des globalen Clients, die Tastenbelegung der acht Klassen-Guides, die koreanischen Patchnotes vom 27.05.2026 und Makro-Guides von Creatorn und Guide-Seiten (Quellen unten)',
    en: 'Skill data of the global client, the key layouts of the eight class guides, the Korean patch notes of 2026-05-27 and macro guides by creators and guide sites (sources below)',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'stats',
          items: [
            {
              value: '1',
              label: { de: 'Makro-Taste', en: 'macro key' },
              note: { de: 'jedes deiner 3 Skill-Presets hat sein eigenes Makro', en: 'each of your 3 skill presets keeps its own macro' },
              tone: 'gold',
            },
            {
              value: '4',
              label: { de: 'Skills pro Leisten-Taste', en: 'skills per hotbar key' },
              note: { de: 'eine **Kette** – die Taste nimmt den ersten, der geht', en: 'a **chain** – the key uses the first one that works' },
              tone: 'blue',
            },
            {
              value: { de: 'bis 20', en: 'up to 20' },
              label: { de: 'Schritte pro Makro', en: 'steps per macro' },
              note: { de: 'die Klassen-Guides brauchen 3–7', en: 'the class guides need 3–7' },
              tone: 'teal',
            },
            {
              value: '10 ms',
              label: { de: 'Verzögerung pro Schritt', en: 'delay per step' },
              note: { de: 'kleinster Wert und Standard', en: 'the minimum and the usual value' },
              tone: 'violet',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Das Wichtigste in zwei Sätzen', en: 'The key idea in two sentences' },
          text: {
            de: 'Das Makro drückt deine Leisten-Tasten der Reihe nach und fängt dann wieder vorne an. Jede Taste nimmt den **ersten Skill ihrer Kette, der gerade geht** – geht keiner, springt das Makro sofort zur nächsten Taste.',
            en: 'The macro presses your hotbar keys one after another and then starts over. Every key uses the **first skill of its chain that works right now** – if none works, the macro moves straight on to the next key.',
          },
        },
        {
          type: 'facts',
          items: [
            { label: { de: 'Benutzen', en: 'Use' }, value: { de: 'Makro-Taste **und** linke Maustaste (Grundattacke) zusammen gedrückt halten', en: 'Hold the macro key **and** the left mouse button (basic attack) together' } },
            { label: { de: 'Taste', en: 'Key' }, value: { de: 'Ab Werk keine – du legst sie selbst fest, meist auf die rechte Maustaste', en: 'None by default – you set it yourself, most players use the right mouse button' } },
            { label: { de: 'Vorrang', en: 'Priority' }, value: { de: 'Was du selbst drückst, kommt immer zuerst – danach macht das Makro weiter', en: 'Whatever you press yourself always comes first – then the macro carries on' } },
            { label: { de: 'Von Hand', en: 'By hand' }, value: { de: 'Aufladeskills, Ansturm und Sprünge, Heilungen, große Buffs, Schalter wie Mantras', en: 'Charged skills, charges and leaps, heals, big buffs, switches like mantras' } },
          ],
        },
      ],
    },
    {
      title: { de: 'Makro oder von Hand?', en: 'Macro or by hand?' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Das Makro spielt nicht für dich – es nimmt dir das Tastendrücken ab. In jedem Durchlauf prüft es alle Tasten und trifft so auch kurze Fenster: die 10 s, in denen [[11170000|Overhead Slam]] nach [[11390000|Rage Burst]] geht, oder die paar Sekunden, in denen ein Boss **benommen** ist (Stagger: Ist die Benommen-Leiste eines Bosses voll, ist er kurz benommen – nur dann gehen Skills wie [[11280000|Sword Aura Rampage]]). Von Hand verpasst man solche Fenster leicht. Dafür ist das Makro blind für die Lage: Es lädt nicht auf, weicht nicht aus und spart keinen Buff für den Boss.',
            en: 'The macro does not play for you – it does the key pressing. Every pass it checks all keys, so it also catches short windows: the 10 s in which [[11170000|Overhead Slam]] works after [[11390000|Rage Burst]], or the few seconds in which a boss is **staggered** (when the stagger bar of a boss is full, it is staggered for a moment – only then do skills like [[11280000|Sword Aura Rampage]] work). By hand such windows are easy to miss. But the macro is blind to the situation: it does not charge, does not dodge and does not save a buff for the boss.',
          },
        },
        {
          type: 'compare',
          title: { de: 'Drei Arten zu spielen', en: 'Three ways to play' },
          caption: {
            de: 'Sperren: Digital Daily (20.01.2026, Korea) und PCGamesN (11.10.2026, globaler Client). Die Regeln für Makro und Hand stimmen in allen Makro-Guides der Quellen überein.',
            en: 'Bans: Digital Daily (2026-01-20, Korea) and PCGamesN (2026-10-11, global client). The rules for macro and hand agree in all macro guides listed in the sources.',
          },
          items: [
            {
              title: { de: 'Nur von Hand', en: 'By hand only' },
              tag: { de: 'volle Kontrolle', en: 'full control' },
              tone: 'slate',
              points: [
                { kind: 'pro', text: { de: 'Jeder Skill genau dann, wenn du willst – auch Aufladen, Ausweichen, Buffs für den Boss sparen', en: 'Every skill exactly when you want – including charging, dodging and saving buffs for the boss' } },
                { kind: 'con', text: { de: 'Du musst jede Abklingzeit und jede Bedingung selbst im Blick haben – kurze Fenster gehen leicht verloren', en: 'You have to track every cooldown and every condition yourself – short windows are easy to lose' } },
                { kind: 'con', text: { de: 'Viele Tasten zugleich, wenig Aufmerksamkeit für den Kampf', en: 'Many keys at once, little attention left for the fight' } },
              ],
              verdict: { de: 'Gut, um eine Klasse kennenzulernen – im langen Kampf anstrengend.', en: 'Good for learning a class – tiring in a long fight.' },
            },
            {
              title: { de: 'Makro + Hand', en: 'Macro + hand' },
              tag: { de: 'empfohlen', en: 'recommended' },
              tone: 'gold',
              points: [
                { kind: 'pro', text: { de: 'Angriffe kommen in dem Moment, in dem sie bereit sind – das Makro prüft alle Tasten im Kreis', en: 'Attacks come the moment they are ready – the macro checks all keys in a loop' } },
                { kind: 'pro', text: { de: 'Deine Hände bleiben frei für Laufen, Ausweichen, Buffs und Aufladeskills', en: 'Your hands stay free for moving, dodging, buffs and charged skills' } },
                { kind: 'pro', text: { de: 'Teil des Spiels und erlaubt', en: 'Part of the game and allowed' } },
                { kind: 'con', text: { de: 'Lädt nicht auf: Aufladeskills kommen nur mit einem Drittel ihres Schadens', en: 'Does not charge: charged skills come with only a third of their damage' } },
                { kind: 'con', text: { de: 'Kennt keine Lage – Buffs, Ansturm und Heilungen bleiben deshalb draußen', en: 'Knows nothing about the situation – so buffs, charges and heals stay out' } },
              ],
              verdict: { de: 'So bauen es alle Klassen-Guides: Angriffe ins Makro, alles mit einer Entscheidung von Hand.', en: 'This is how all class guides do it: attacks in the macro, everything that needs a decision by hand.' },
            },
            {
              title: { de: 'Fremde Makro-Programme', en: 'Third-party macro tools' },
              tag: { de: 'verboten', en: 'forbidden' },
              tone: 'rose',
              points: [
                { kind: 'con', text: { de: 'Maus-Software und Programme, die Tasten für dich drücken, sind nicht erlaubt', en: 'Mouse software and programs that press keys for you are not allowed' } },
                { kind: 'con', text: { de: 'Korea: Strafanzeigen gegen 12 Nutzer solcher Programme (Dez. 2025 und Jan. 2026). Global: fast 5.000 Konten gesperrt (Bots, unerlaubte Programme; PCGamesN, 11.10.2026)', en: 'Korea: criminal complaints against 12 users of such programs (Dec 2025 and Jan 2026). Global: almost 5,000 accounts restricted (bots, unauthorised programs; PCGamesN, 2026-10-11)' } },
                { kind: 'con', text: { de: 'Kein Vorteil gegenüber dem eingebauten Makro', en: 'No advantage over the built-in macro' } },
              ],
              verdict: { de: 'Finger weg – das Risiko trägt dein Konto.', en: 'Hands off – your account carries the risk.' },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Das eingebaute Makro: ja', en: 'The built-in macro: yes' },
          text: {
            de: 'Das Makro steckt im Skill-Fenster des Spiels. In Korea hat der Patch vom 27.05.2026 die Schritte auf Leisten-Tasten umgestellt und die kleinste Verzögerung von 50 auf 10 ms gesenkt – genau so arbeitet es im globalen Client. Dieser Planer drückt keine Tasten; er hilft dir nur beim Aufbau.',
            en: 'The macro is part of the game’s skill window. In Korea the patch of 2026-05-27 switched its steps to hotbar keys and lowered the minimum delay from 50 to 10 ms – that is exactly how it works in the global client. This planner presses no keys; it only helps you set things up.',
          },
        },
      ],
    },
    {
      title: { de: 'So arbeitet das Makro', en: 'How the macro works' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Es gibt zwei Ebenen. Auf einer **Leisten-Taste** liegen bis zu 4 Skills übereinander – eine **Kette**. Das **Makro** ist eine Liste von Schritten, und jeder Schritt drückt eine ganze Taste, nicht einen einzelnen Skill. Solange du die Makro-Taste hältst, läuft die Liste im Kreis:',
            en: 'There are two layers. A **hotbar key** holds up to 4 skills stacked on top of each other – a **chain**. The **macro** is a list of steps, and each step presses a whole key, not a single skill. As long as you hold the macro key, the list runs in a loop:',
          },
        },
        {
          type: 'flow',
          title: { de: 'Ein Durchlauf des Makros', en: 'One pass of the macro' },
          caption: {
            de: 'So beschreiben es die Makro-Guides von AION2 Vault, Daeva Guides und Aion2Tools übereinstimmend. Das Spiel warnt selbst, dass die Reihenfolge nicht garantiert ist – jede Taste muss also für sich das Richtige tun.',
            en: 'This is how the macro guides of AION2 Vault, Daeva Guides and Aion2Tools all describe it. The game itself warns that the order is not guaranteed – so every key has to do the right thing on its own.',
          },
          items: [
            {
              title: { de: 'Makro-Taste + linke Maustaste halten', en: 'Hold the macro key + left mouse button' },
              text: { de: 'Die Grundattacke füllt jede Lücke und bricht das Ende langer Animationen ab.', en: 'The basic attack fills every gap and cuts off the end of long animations.' },
              tag: { de: 'du', en: 'you' },
              tone: 'slate',
            },
            {
              title: { de: 'Schritt 1: erste Taste', en: 'Step 1: first key' },
              text: { de: 'Geht ein Skill ihrer Kette, kommt er. Geht keiner, springt das Makro sofort weiter.', en: 'If a skill of its chain works, it fires. If none does, the macro moves on at once.' },
              tag: '10 ms',
              tone: 'blue',
            },
            {
              title: { de: 'Schritt 2, 3 …: die nächsten Tasten', en: 'Steps 2, 3 …: the next keys' },
              text: { de: 'Kombo-Ketten zuerst, dann die übrigen Angriffe.', en: 'Combo chains first, then the other attacks.' },
              tag: '10 ms',
              tone: 'blue',
            },
            {
              title: { de: 'Letzter Schritt: T', en: 'Last step: T' },
              text: { de: 'Der Füller ohne Abklingzeit – diese Taste wirkt jedes Mal einen ganzen Schlag.', en: 'The filler without a cooldown – this key casts a full hit every time.' },
              tag: { de: 'Füller', en: 'filler' },
              tone: 'gold',
            },
            {
              title: { de: 'Zurück zu Schritt 1', en: 'Back to step 1' },
              text: { de: 'Solange du hältst. Drückst du selbst einen Skill, kommt er vor dem nächsten Schritt.', en: 'As long as you hold. A skill you press yourself comes before the next step.' },
              tone: 'teal',
            },
          ],
        },
        {
          type: 'flow',
          title: { de: 'Wie eine Taste ihren Skill wählt', en: 'How a key picks its skill' },
          caption: {
            de: '„Unten“ ist der Platz direkt an der Leiste (Reihe 0), „oben“ der weiteste. Der Planer warnt, wenn ein Skill ohne Abklingzeit und ohne Bedingung die Skills über ihm blockiert.',
            en: '“Bottom” is the slot right at the bar (row 0), “top” the farthest one. The planner warns you when a skill without cooldown and without a condition blocks the skills above it.',
          },
          items: [
            {
              title: { de: 'Unterster Skill', en: 'Bottom skill' },
              text: { de: 'Abklingzeit vorbei und Bedingung erfüllt? Dann kommt er – die Taste ist fertig.', en: 'Cooldown over and condition met? Then it fires – the key is done.' },
              tag: { de: 'zuerst', en: 'first' },
              tone: 'gold',
            },
            {
              title: { de: 'Sonst: der zweite Skill', en: 'If not: the second skill' },
              text: { de: 'Dieselbe Frage: bereit und Bedingung erfüllt?', en: 'Same question: ready and condition met?' },
              tone: 'blue',
            },
            {
              title: { de: 'Dann der dritte und vierte', en: 'Then the third and fourth' },
              text: { de: 'Ganz oben steht der Füller – er geht immer.', en: 'The filler sits on top – it always works.' },
              tone: 'blue',
            },
            {
              title: { de: 'Nichts bereit: Taste übersprungen', en: 'Nothing ready: key skipped' },
              text: { de: 'Das kostet keine Zeit – das Makro geht gleich zum nächsten Schritt.', en: 'That costs no time – the macro goes straight to the next step.' },
              tone: 'slate',
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { de: 'Darum steht der Füller oben', en: 'This is why the filler goes on top' },
          text: {
            de: 'Ein Skill ohne Abklingzeit und ohne Bedingung geht **immer**. Steht er unten in der Kette, nimmt die Taste immer nur ihn – alles darüber kommt nie dran. Also: Skills mit Bedingung und lange Abklingzeiten nach unten, den Füller ganz nach oben.',
            en: 'A skill without a cooldown and without a condition **always** works. If it sits at the bottom of the chain, the key only ever uses it – nothing above it ever fires. So: skills with a condition and long cooldowns at the bottom, the filler on top.',
          },
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Warum der Füller eine eigene Taste bekommt', en: 'Why the filler gets a key of its own' },
          text: {
            de: 'Eine Taste, auf der gerade nichts geht, kostet keine Zeit. Eine Taste mit Füller wirkt dagegen jedes Mal einen ganzen Schlag – in dieser Zeit wartet alles andere. Liegt der Füller nur auf T, dem **letzten Schritt**, kommen deine starken Skills sofort, sobald sie bereit sind. Hast du nur **eine** Kette im Makro, darf der Füller auch an ihr Ende – so machen es viele Gladiatoren.',
            en: 'A key on which nothing works right now costs no time. A key with a filler, on the other hand, casts a full hit every time – and everything else waits meanwhile. With the filler only on T, the **last step**, your strong skills come the moment they are ready. If you have only **one** chain in the macro, the filler may also go at its end – many Gladiators do that.',
          },
        },
      ],
    },
    {
      title: { de: 'Ein Beispiel: der Gladiator', en: 'An example: the Gladiator' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Ein Gladiator mit dem kleinsten guten Makro: **zwei Schritte**, erst Taste 1, dann Taste T. Auf Taste 1 liegt eine Kette, die mehrere Creator-Guides empfehlen: [[11390000|Rage Burst]] unten, darüber [[11170000|Overhead Slam]]. Furorausbruch ist ein Stigma (ab Stufe 22). Auf T liegt der Füller. Die linke Maustaste mit der Grundattacke [[11020000|Keen Strike]] hältst du die ganze Zeit.',
            en: 'A Gladiator with the smallest good macro: **two steps**, first key 1, then key T. Key 1 holds a chain that several creator guides recommend: [[11390000|Rage Burst]] at the bottom, [[11170000|Overhead Slam]] above it. Rage Burst is a stigma (from level 22). T holds the filler. You hold the left mouse button with the basic attack [[11020000|Keen Strike]] all the time.',
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
                de: '[[11390000|Rage Burst]] schaltet [[11170000|Overhead Slam]] für 10 s frei. Sonst trifft Abwärtsschlag nur niedergeworfene Gegner (gegen Ziele, die nicht niedergeworfen werden können, nur mit 7 % Chance) – und Bosse lassen sich nicht niederwerfen.',
                en: '[[11390000|Rage Burst]] unlocks [[11170000|Overhead Slam]] for 10 s. Otherwise Overhead Slam only hits knocked-down enemies (against targets that cannot be knocked down only with a 7% chance) – and bosses cannot be knocked down.',
              },
            },
            {
              key: 'T',
              ids: [11280000, 11010000],
              macro: true,
              note: {
                de: '[[11280000|Sword Aura Rampage]] geht nur gegen benommene Gegner. Darüber der Füller [[11010000|Rending Blow]] ohne Abklingzeit.',
                en: '[[11280000|Sword Aura Rampage]] only works against staggered enemies. Above it the filler [[11010000|Rending Blow]] without a cooldown.',
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
              title: { de: 'Alles ist bereit → Taste 1: [[11390000|Rage Burst]]', en: 'Everything is ready → key 1: [[11390000|Rage Burst]]' },
              text: {
                de: 'Der unterste Skill der Kette kommt zuerst. Er senkt den Angriff des Bosses um 10 % (Verwundet), gibt dir 10 s lang +10 % PvE-Schadensverstärkung – und schaltet Abwärtsschlag für 10 s frei.',
                en: 'The bottom skill of the chain goes first. It lowers the boss’s Attack by 10% (Wounded), gives you +10% PvE Damage Boost for 10 s – and unlocks Overhead Slam for 10 s.',
              },
            },
            {
              title: { de: 'Weiter halten → Taste T: [[11010000|Rending Blow]]', en: 'Keep holding → key T: [[11010000|Rending Blow]]' },
              text: {
                de: 'Der Boss ist nicht benommen, also nimmt T den Füller. Sein Folgeschlag erscheint auf derselben Taste – beim nächsten Druck auf T kommt er.',
                en: 'The boss is not staggered, so T uses the filler. Its follow-up appears on the same key – the next press of T uses it.',
              },
            },
            {
              title: { de: 'Wieder Taste 1 → [[11170000|Overhead Slam]]', en: 'Key 1 again → [[11170000|Overhead Slam]]' },
              text: {
                de: 'Furorausbruch wartet jetzt 45 s (30 s ab Stigma-Stufe 5 mit der Spezialisierung „−15 s Abklingzeit“), also nimmt Taste 1 den zweiten Skill. Er geht, weil Furorausbruch ihn freigeschaltet hat – **das ist die Kombo**.',
                en: 'Rage Burst now waits 45 s (30 s from stigma level 5 with the “−15 s cooldown” specialisation), so key 1 uses the second skill. It works because Rage Burst unlocked it – **that is the combo**.',
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
              title: { de: 'Nach 5 s → noch einmal [[11170000|Overhead Slam]]', en: 'After 5 s → [[11170000|Overhead Slam]] once more' },
              text: {
                de: 'Die 10 s von Furorausbruch laufen noch – also kommt Abwärtsschlag ein zweites Mal. Mit der Spezialisierung „Abklingzeit entfernt“ (ab Skillstufe 16) kommt er im Fenster sogar bei jedem Durchlauf.',
                en: 'The 10 s from Rage Burst are still running – so Overhead Slam comes a second time. With the “Remove cooldown” specialisation (from skill level 16) it even comes on every pass inside the window.',
              },
            },
            {
              title: { de: 'Der Boss ist benommen → Taste T: [[11280000|Sword Aura Rampage]]', en: 'The boss is staggered → key T: [[11280000|Sword Aura Rampage]]' },
              text: {
                de: 'Jetzt geht der untere Skill auf T. Er hat keine Abklingzeit und kommt bei jedem Druck, bis die Benommenheit vorbei ist. Danach nimmt T wieder den Füller.',
                en: 'Now the bottom skill on T works. It has no cooldown and comes on every press until the stagger is over. Then T goes back to the filler.',
              },
            },
            {
              title: { de: 'Ist Furorausbruch wieder bereit → alles von vorn', en: 'Rage Burst is ready again → everything starts over' },
              text: {
                de: 'Furorausbruch steht unten in seiner Kette – also kommt er sofort, und alles geht von vorne los. So läuft das Makro von selbst im Kreis – **das ist deine Rotation**.',
                en: 'Rage Burst sits at the bottom of its chain – so it comes right away, and everything starts over. That way the macro keeps cycling by itself – **that is your rotation**.',
              },
            },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Der Gladiator-Guide macht es etwas anders', en: 'The Gladiator guide does it a little differently' },
          text: {
            de: 'Dort hat [[11390000|Rage Burst]] eine eigene Taste (8), die das Makro nach Taste 1 und 2 drückt, und auf Taste 1 liegt [[11170000|Overhead Slam]] unten. Beides funktioniert: Furorausbruch schaltet Abwärtsschlag frei, und im nächsten Durchlauf nimmt Taste 1 ihn. Wichtig ist nur, dass der freigeschaltete Skill vor dem Ende seines 10-s-Fensters an die Reihe kommt – das tut er bei jedem Makro mit wenigen Schritten.',
            en: 'There [[11390000|Rage Burst]] has a key of its own (8), which the macro presses after keys 1 and 2, and [[11170000|Overhead Slam]] sits at the bottom of key 1. Both work: Rage Burst unlocks Overhead Slam, and on the next pass key 1 uses it. All that matters is that the unlocked skill gets its turn before its 10 s window ends – which it does in any macro with a few steps.',
          },
        },
      ],
    },
    {
      title: { de: 'Gute Ketten bauen', en: 'Building good chains' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Eine **Rotation** ist die Reihenfolge, in der du deine Skills immer wieder einsetzt. Mit Ketten und Makro baust du sie so, dass sie fast von selbst läuft:',
            en: 'A **rotation** is the order in which you use your skills over and over. With chains and the macro you build it so that it almost runs by itself:',
          },
        },
        {
          type: 'flow',
          title: { de: 'Die Rotation in vier Schritten', en: 'The rotation in four steps' },
          caption: {
            de: 'Die Eröffnung (Schritt 1) drückst du selbst, das Makro übernimmt die Schritte 2–4.',
            en: 'You press the opener (step 1) yourself, the macro takes over steps 2–4.',
          },
          items: [
            { title: { de: 'Stärken', en: 'Empower' }, text: { de: 'Große Buffs zuerst – von Hand, nur wenn es sich lohnt.', en: 'Big buffs first – by hand, only when it pays off.' }, tag: { de: 'von Hand', en: 'by hand' }, tone: 'violet' },
            { title: { de: 'Vorbereiten', en: 'Set up' }, text: { de: 'Skills, die eine Bedingung schaffen: freischalten, niederwerfen, verlangsamen, Male setzen, Verteidigung senken.', en: 'Skills that create a condition: unlock, knock down, slow, place marks, lower Defense.' }, tag: { de: 'Makro', en: 'macro' }, tone: 'blue' },
            { title: { de: 'Zuschlagen', en: 'Strike' }, text: { de: 'Die Skills, die davon leben – in derselben Kette darüber oder auf der nächsten Taste.', en: 'The skills that profit from it – above in the same chain or on the next key.' }, tag: { de: 'Makro', en: 'macro' }, tone: 'gold' },
            { title: { de: 'Lücken füllen', en: 'Fill the gaps' }, text: { de: 'Der Füller auf T und die Grundattacke, die du die ganze Zeit hältst.', en: 'The filler on T and the basic attack you hold all the time.' }, tag: { de: 'T + Maus', en: 'T + mouse' }, tone: 'slate' },
          ],
        },
        {
          type: 'table',
          caption: { de: 'Reihenfolge in einer Kette – von unten nach oben', en: 'Order inside a chain – from bottom to top' },
          head: [
            { de: 'Platz', en: 'Slot' },
            { de: 'Was dort hingehört', en: 'What goes there' },
            { de: 'Warum', en: 'Why' },
            { de: 'Beispiele', en: 'Examples' },
          ],
          rows: [
            [
              { de: '**unten**', en: '**bottom**' },
              { de: 'Skills mit kurzem Fenster: nur gegen benommene Ziele, nur mit 4 Elementen, nur kurz nach einem Block oder einem Geist-Skill', en: 'Skills with a short window: only on staggered targets, only with Four Elements, only right after a block or a spirit skill' },
              { de: 'Ihr Fenster dauert nur Sekunden – dann sollen sie vor allem anderen kommen. Außerhalb des Fensters gehen sie nicht und blockieren nichts, auch ohne Abklingzeit.', en: 'Their window lasts only seconds – then they should come before anything else. Outside the window they do not work and block nothing, even without a cooldown.' },
              '[[11280000|Sword Aura Rampage]] [[16300000|Elemental Fusion]] [[11200000|Ankle Slice]] [[16330000|Dimensional Control]]',
            ],
            [
              { de: '**Mitte**', en: '**middle**' },
              { de: 'Lange Abklingzeiten vor kurzen; ein Freischalter unter dem Skill, den er freischaltet', en: 'Long cooldowns before short ones; an unlocker below the skill it unlocks' },
              { de: 'Ein seltener, starker Skill soll nicht hinter einem häufigen warten. Der Freischalter kommt zuerst, beim nächsten Druck nimmt die Taste den freigeschalteten Skill.', en: 'A rare, strong skill should not wait behind a frequent one. The unlocker comes first, on the next press the key uses the unlocked skill.' },
              { de: '[[11390000|Rage Burst]] (45 s) unter [[11170000|Overhead Slam]] (5 s)', en: '[[11390000|Rage Burst]] (45 s) below [[11170000|Overhead Slam]] (5 s)' },
            ],
            [
              { de: '**oben**', en: '**top**' },
              { de: 'Höchstens **ein** Skill ohne Abklingzeit – der Füller', en: 'At most **one** skill without a cooldown – the filler' },
              { de: 'Er geht immer. Alles, was über ihm stünde, käme nie dran.', en: 'It always works. Anything above it would never fire.' },
              '[[11010000|Rending Blow]] [[16040000|Combustion]] [[12040000|Pummel]]',
            ],
          ],
        },
        {
          type: 'list',
          items: [
            { de: '**Kombo-Ketten zuerst im Makro, T zuletzt:** Was etwas freischaltet, drückt das Makro vor dem, was davon lebt – entweder in derselben Kette oder auf einer früheren Taste.', en: '**Combo chains first in the macro, T last:** the macro presses whatever unlocks something before whatever profits from it – either in the same chain or on an earlier key.' },
            { de: '**Folge-Skills brauchen keinen Platz:** Ein Kettenskill (Folgeschlag) erscheint auf derselben Taste, und der nächste Druck nutzt ihn.', en: '**Follow-ups need no slot:** a chain skill (follow-up hit) appears on the same key, and the next press uses it.' },
            { de: '**Klein anfangen:** Erst eine Kette plus T, an der Trainingspuppe testen, dann erweitern – so raten es Grobs und aLuckyRO. Die Klassen-Guides kommen mit 3–7 Schritten aus.', en: '**Start small:** first one chain plus T, test it on the training dummy, then add more – as Grobs and aLuckyRO advise. The class guides get by with 3–7 steps.' },
            { de: '**Spezialisierungen ändern die Regeln:** Sie ändern Abklingzeiten und Bedingungen. Mit „Abklingzeit entfernt“ hat [[11170000|Overhead Slam]] keine Abklingzeit mehr – trotzdem blockiert er nichts, weil er weiter eine Bedingung braucht. Prüf deine Ketten nach jeder Änderung.', en: '**Specialisations change the rules:** they change cooldowns and conditions. With “Remove cooldown” [[11170000|Overhead Slam]] has no cooldown any more – it still blocks nothing, because it still needs a condition. Check your chains after every change.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Welche Taste wofür', en: 'Which key for what' },
      blocks: [
        {
          type: 'facts',
          items: [
            { label: { de: 'Linke Maustaste', en: 'Left mouse button' }, value: { de: 'Schnelltaste 1 (auch R): Grundattacke – halten, nie ins Makro', en: 'Quick slot 1 (also R): basic attack – hold it, never in the macro' } },
            { label: { de: '1–4', en: '1–4' }, value: { de: 'Meist deine Angriffsketten fürs Makro – Kombo-Ketten zuerst', en: 'Mostly your attack chains for the macro – combo chains first' } },
            { label: { de: 'T', en: 'T' }, value: { de: 'Schnelltaste 2: Füller, letzter Schritt im Makro – darunter der Skill gegen benommene Ziele (jede Klasse hat einen, ohne Abklingzeit). Ab Werk nutzt auch die rechte Maustaste diese Schnelltaste; die meisten legen dort aber das Makro hin.', en: 'Quick slot 2: filler, last step of the macro – the skill for staggered targets below it (every class has one, without a cooldown). By default the right mouse button uses this quick slot too; most players put the macro there instead.' } },
            { label: { de: 'Q, E', en: 'Q, E' }, value: { de: 'Was du gezielt einsetzt: Ansturm, Sprung, Aufladeskills, Heilung – von Hand', en: 'What you use on purpose: charges, leaps, charged skills, heals – by hand' } },
            { label: { de: '5–8', en: '5–8' }, value: { de: 'Stigmen und Buffs – große Buffs von Hand in der Eröffnung. Stigmen, die Schaden machen (wie [[11390000|Rage Burst]]), dürfen ins Makro.', en: 'Stigmas and buffs – big buffs by hand in the opener. Stigmas that deal damage (like [[11390000|Rage Burst]]) may go into the macro.' } },
            { label: { de: 'Leertaste', en: 'Space' }, value: { de: 'Springen, Gleiten und **Schockaufhebung** (befreit dich aus Betäubung und Niederwurf) – nie ins Makro. In der Tastenbelegung kannst du Schockaufhebung eine eigene Taste geben.', en: 'Jump, glide and **Defiance** (frees you from stun and knockdown) – never in the macro. In the key settings you can give Defiance a key of its own.' } },
          ],
        },
        {
          type: 'text',
          text: {
            de: 'Das sind die Standard-Tasten; im Spiel kannst du jede ändern. Die Belegung für deine Klasse zeigt dein Klassen-Guide im Abschnitt „Leiste & Makro“ – und der Planer füllt deine Leiste mit einem Klick genau so („Top-10-Leiste“).',
            en: 'These are the default keys; you can change any of them in game. The guide for your class shows its layout in the “Hotbar & macro” section – and the planner fills your bar exactly like that in one click (“Top 10 hotbar”).',
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
      title: { de: 'Die Makros der Klassen-Guides', en: 'The macros of the class guides' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Alle acht Klassen-Guides folgen denselben Regeln: Das Makro drückt die Tasten in dieser Reihenfolge, jede mit 10 ms, und endet immer auf T – mit dem Skill der Klasse gegen benommene Ziele unten und dem Füller oben. Nur beim Magier liegt auf T allein der Benommen-Skill; sein Füller ist die Grundattacke. Warum jede Kette so aussieht, steht im Klassen-Guide unter „Leiste & Makro“.',
            en: 'All eight class guides follow the same rules: the macro presses the keys in this order, each with 10 ms, and always ends on T – with the class’s skill for staggered targets at the bottom and the filler on top. Only the Sorcerer has just the stagger skill on T; its filler is the basic attack. Why each chain looks the way it does is explained in the class guide under “Hotbar & macro”.',
          },
        },
        {
          type: 'list',
          items: [
            { de: '**Gladiator** (5 Schritte): **1** [[11170000|Overhead Slam]] › [[11300000|Aerial Snare]] › [[11290000|Mocking Blade]] → **2** [[11200000|Ankle Slice]] → **8** [[11390000|Rage Burst]] → **3** [[11050000|Crushing Wave]] → **T** [[11280000|Sword Aura Rampage]] › [[11010000|Rending Blow]]', en: '**Gladiator** (5 steps): **1** [[11170000|Overhead Slam]] › [[11300000|Aerial Snare]] › [[11290000|Mocking Blade]] → **2** [[11200000|Ankle Slice]] → **8** [[11390000|Rage Burst]] → **3** [[11050000|Crushing Wave]] → **T** [[11280000|Sword Aura Rampage]] › [[11010000|Rending Blow]]' },
            { de: '**Templer** (4 Schritte): **1** [[12240000|Judgment]] › [[12300000|Annihilate]] › [[12100000|Shield Smite]] › [[12350000|Warding Strike]] → **2** [[12270000|Debilitating Smash]] → **7** [[12120000|Taunt]] → **T** [[12340000|Flash Rampage]] › [[12040000|Pummel]]', en: '**Templar** (4 steps): **1** [[12240000|Judgment]] › [[12300000|Annihilate]] › [[12100000|Shield Smite]] › [[12350000|Warding Strike]] → **2** [[12270000|Debilitating Smash]] → **7** [[12120000|Taunt]] → **T** [[12340000|Flash Rampage]] › [[12040000|Pummel]]' },
            { de: "**Assassine** (3 Schritte): **2** [[13130000|Insignia Explosion]] › [[13350000|Heart Gore]] › [[13060000|Ambush]] → **7** [[13300000|Triniel's Dagger]] → **T** [[13340000|Storm Rampage]] › [[13100000|Savage Roar]]", en: "**Assassin** (3 steps): **2** [[13130000|Insignia Explosion]] › [[13350000|Heart Gore]] › [[13060000|Ambush]] → **7** [[13300000|Triniel's Dagger]] → **T** [[13340000|Storm Rampage]] › [[13100000|Savage Roar]]" },
            { de: '**Waldläufer** (5 Schritte): **1** [[14110000|Gale Arrow]] → **2** [[14130000|Snare Shot]] › [[14070000|Suppressing Arrow]] → **3** [[14080000|Burst Arrow]] › [[14050000|Drill Dart]] → **8** [[14060000|Griffon Arrow]] → **T** [[14330000|Arrow Scattershot]] › [[14340000|Tempest Shot]]', en: '**Ranger** (5 steps): **1** [[14110000|Gale Arrow]] → **2** [[14130000|Snare Shot]] › [[14070000|Suppressing Arrow]] → **3** [[14080000|Burst Arrow]] › [[14050000|Drill Dart]] → **8** [[14060000|Griffon Arrow]] → **T** [[14330000|Arrow Scattershot]] › [[14340000|Tempest Shot]]' },
            { de: "**Magier** (7 Schritte): **8** [[15320000|Delayed Explosion]] → **1** [[15220000|Frost Burst]] › [[15150000|Frost]] → **2** [[15280000|Bittercold Wind]] › [[15040000|Firestorm]] → **6** [[15390000|Fire Wall]] → **7** [[15200000|Cold Storm]] → **3** [[15050000|Blaze]] › [[15110000|Winter's Shackles]] → **T** [[15010000|Flame Scattershot]]", en: "**Sorcerer** (7 steps): **8** [[15320000|Delayed Explosion]] → **1** [[15220000|Frost Burst]] › [[15150000|Frost]] → **2** [[15280000|Bittercold Wind]] › [[15040000|Firestorm]] → **6** [[15390000|Fire Wall]] → **7** [[15200000|Cold Storm]] → **3** [[15050000|Blaze]] › [[15110000|Winter's Shackles]] → **T** [[15010000|Flame Scattershot]]" },
            { de: '**Beschwörer** (4 Schritte): **1** [[16300000|Elemental Fusion]] → **5** [[16150000|Jointstrike: Corrode]] → **2** [[16330000|Dimensional Control]] › [[16140000|Jointstrike: Curse]] → **T** [[16340000|Rapid Scattershot]] › [[16040000|Combustion]]', en: '**Spiritmaster** (4 steps): **1** [[16300000|Elemental Fusion]] → **5** [[16150000|Jointstrike: Corrode]] → **2** [[16330000|Dimensional Control]] › [[16140000|Jointstrike: Curse]] → **T** [[16340000|Rapid Scattershot]] › [[16040000|Combustion]]' },
            { de: '**Kleriker** (5 Schritte): **1** [[17350000|Condemnation]] › [[17070000|Chain of Torment]] → **6** [[17400000|Earth Punishment]] → **2** [[17080000|Debilitating Mark]] → **3** [[17090000|Light of Regeneration]] › [[17150000|Divine Aura]] → **T** [[17370000|Lightning Strike Scattershot]] › [[17040000|Judgment Thunder]]', en: '**Cleric** (5 steps): **1** [[17350000|Condemnation]] › [[17070000|Chain of Torment]] → **6** [[17400000|Earth Punishment]] → **2** [[17080000|Debilitating Mark]] → **3** [[17090000|Light of Regeneration]] › [[17150000|Divine Aura]] → **T** [[17370000|Lightning Strike Scattershot]] › [[17040000|Judgment Thunder]]' },
            { de: "**Kantor** (4 Schritte): **1** [[18100000|Dark Crush]] › [[18080000|Wave Blow]] › [[18060000|Impactful Crush]] › [[18290000|Spinning Strike]] → **2** [[18150000|Heat Wave Blow]] → **7** [[18330000|Marchutan's Wrath]] → **T** [[18300000|Gust Rampage]] › [[18040000|Incandescent Blow]]", en: "**Chanter** (4 steps): **1** [[18100000|Dark Crush]] › [[18080000|Wave Blow]] › [[18060000|Impactful Crush]] › [[18290000|Spinning Strike]] → **2** [[18150000|Heat Wave Blow]] → **7** [[18330000|Marchutan's Wrath]] → **T** [[18300000|Gust Rampage]] › [[18040000|Incandescent Blow]]" },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Andere Guides, andere Ketten', en: 'Other guides, other chains' },
          text: {
            de: 'Creator-Guides bauen manche Ketten anders – etwa [[11390000|Rage Burst]] unten auf Taste 1 statt auf einer eigenen Taste. Das ist kein Fehler, solange die Regeln oben stimmen. Prüf eine fremde Kette an den Skilltexten: Ein Skill, der nur nach einem anderen geht, muss **nach** dem Skill drankommen, der ihn möglich macht – in derselben Kette darüber oder auf einer späteren Taste.',
            en: 'Creator guides build some chains differently – for example [[11390000|Rage Burst]] at the bottom of key 1 instead of on a key of its own. That is not a mistake as long as the rules above hold. Check a chain from elsewhere against the skill texts: a skill that only works after another one has to get its turn **after** the skill that enables it – above it in the same chain or on a later key.',
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
            de: 'Bei diesen Skills sind sich die Makro-Guides einig – und die Skilltexte zeigen, warum:',
            en: 'The macro guides agree on these skills – and the skill texts show why:',
          },
        },
        {
          type: 'skills',
          items: [
            { id: 15060000, note: { de: '**Aufladeskill** (bis zu 3 Ladestufen). Aus dem Makro kommt er nur mit der ersten Stufe – ein Drittel des vollen Schadens.', en: '**Charged skill** (up to 3 charge levels). From the macro it only fires at the first level – a third of the full damage.' } },
            { id: 12090000, note: { de: '**Aufladeskill** – von Hand voll aufladen', en: '**Charged skill** – charge it fully by hand' } },
            { id: 17060000, note: { de: '**Aufladeskill** – von Hand voll aufladen', en: '**Charged skill** – charge it fully by hand' } },
            { id: 14010000, note: { de: '**Aufladeskill** – von Hand voll aufladen', en: '**Charged skill** – charge it fully by hand' } },
            { id: 16240000, note: { de: 'Ab Stigma-Stufe 5 ein Aufladeskill (bis zu 200 % mehr Schaden)', en: 'A charged skill from stigma level 5 (up to 200% more damage)' } },
            { id: 11190000, note: { de: 'Springt bis 20 m zum Ziel – auch mitten in einen Boss-Angriff', en: 'Leaps up to 20 m to the target – even right into a boss attack' } },
            { id: 12430000, note: { de: 'Stürmt 10 m zum Ziel (nur nach Ausweichen oder im Flug)', en: 'Rushes 10 m to the target (only after a dodge or while flying)' } },
            { id: 13070000, note: { de: 'Bringt dich hinter das Ziel (20 m)', en: 'Takes you behind the target (20 m)' } },
            { id: 14090000, note: { de: 'Bewegt dich in Eingaberichtung – im Makro gibt es erzwungene Sprünge', en: 'Moves you in the input direction – in the macro it causes forced jumps' } },
            { id: 17120000, note: { de: 'Heilung – im Makro verpufft sie, wenn niemand Leben braucht', en: 'Heal – in the macro it is wasted when nobody needs HP' } },
            { id: 18120000, note: { de: 'Heilung – von Hand', en: 'Heal – by hand' } },
            { id: 18190000, note: { de: '**Schalter** (Mantra): Der zweite Druck schaltet ihn wieder aus', en: '**Switch** (mantra): the second press turns it off again' } },
            { id: 17410000, note: { de: '**Schalter** (Aura): Der zweite Druck schaltet sie wieder aus', en: '**Switch** (aura): the second press turns it off again' } },
            { id: 16250000, note: { de: 'Großer Burst alle 90 s – von Hand und nur für den Boss', en: 'Big burst every 90 s – by hand and only for the boss' } },
          ],
        },
        {
          type: 'bars',
          title: { de: 'Aufladeskills: angetippt oder voll aufgeladen', en: 'Charged skills: tapped or fully charged' },
          caption: {
            de: 'Schaden pro Einsatz auf Skillstufe 10 laut Skilltext des globalen Clients. Wir lesen die Spanne so: die kleine Zahl ist die erste Ladestufe (so feuert das Makro), die große die dritte. Bei allen vier ist voll aufgeladen genau 3-mal so viel.',
            en: 'Damage per cast at skill level 10 from the skill text of the global client. We read the range this way: the low number is the first charge level (how the macro fires it), the high number the third. For all four, fully charged is exactly 3 times as much.',
          },
          unit: { de: 'Schaden', en: 'damage' },
          items: [
            { label: '[[15060000|Hellfire]]', note: { de: 'voll aufgeladen (von Hand)', en: 'fully charged (by hand)' }, value: 10472, tone: 'gold' },
            { label: '[[15060000|Hellfire]]', note: { de: 'angetippt (Makro)', en: 'tapped (macro)' }, value: 3490, tone: 'slate' },
            { label: '[[12090000|Punishment]]', note: { de: 'voll aufgeladen (von Hand)', en: 'fully charged (by hand)' }, value: 11733, tone: 'gold' },
            { label: '[[12090000|Punishment]]', note: { de: 'angetippt (Makro)', en: 'tapped (macro)' }, value: 3911, tone: 'slate' },
            { label: '[[17060000|Bolt]]', note: { de: 'voll aufgeladen (von Hand)', en: 'fully charged (by hand)' }, value: 9228, tone: 'gold' },
            { label: '[[17060000|Bolt]]', note: { de: 'angetippt (Makro)', en: 'tapped (macro)' }, value: 3076, tone: 'slate' },
            { label: '[[14010000|Deadshot]]', note: { de: 'voll aufgeladen (von Hand)', en: 'fully charged (by hand)' }, value: 5557, tone: 'gold' },
            { label: '[[14010000|Deadshot]]', note: { de: 'angetippt (Makro)', en: 'tapped (macro)' }, value: 1852, tone: 'slate' },
          ],
        },
        {
          type: 'checklist',
          items: [
            { de: '**Aufladeskills von Hand:** Voll aufgeladen machen sie dreimal so viel Schaden. Sie bekommen eine eigene Taste, die du hältst, bis die dritte Stufe erreicht ist – Waldläufer halten [[14010000|Deadshot]] laut Daeva Guides sogar zusammen mit Makro und linker Maustaste.', en: '**Charged skills by hand:** fully charged they deal three times the damage. They get a key of their own that you hold until the third level is reached – according to Daeva Guides Rangers even hold [[14010000|Deadshot]] together with the macro and the left mouse button.' },
            { de: '**Ansturm, Sprung und Bewegung von Hand:** Sonst trägt dich das Makro mitten in einen Boss-Angriff oder eine Gegnergruppe.', en: '**Charges, leaps and movement by hand:** otherwise the macro carries you right into a boss attack or a pack of monsters.' },
            { de: '**Heilungen und große Buffs von Hand:** Im Makro verpuffen sie an schwachen Gegnern. Ausnahme: Schadensskills, die nebenbei buffen oder schwächen, wie [[11390000|Rage Burst]] – die gehören hinein.', en: '**Heals and big buffs by hand:** in the macro they are wasted on weak monsters. Exception: damage skills that also buff or weaken, like [[11390000|Rage Burst]] – those belong in it.' },
            { de: '**Schalter von Hand:** Mantras und Auren gehen beim zweiten Druck wieder aus – das Makro würde sie ständig ausschalten. Schadenszonen, die ein paar Sekunden stehen und Schaden machen – wie [[15390000|Fire Wall]] –, sind Angriffe und dürfen hinein.', en: '**Switches by hand:** mantras and auras turn off on the second press – the macro would keep turning them off. Damage zones that stay for a few seconds and deal damage – like [[15390000|Fire Wall]] – are attacks and may go in.' },
            { de: '**Grundattacke nie als Schritt:** Du hältst sie auf der linken Maustaste. Als Makro-Schritt geht sie auch, bricht aber weniger Animationen ab – laut Daeva Guides sinkt dann der Schaden.', en: '**Never add the basic attack as a step:** you hold it on the left mouse button. As a macro step it works too, but cancels fewer animations – according to Daeva Guides the damage drops.' },
            { de: '**Schockaufhebung bleibt auf der Leertaste** – du drückst sie genau dann, wenn du betäubt oder niedergeworfen bist.', en: '**Defiance stays on Space** – you press it exactly when you are stunned or knocked down.' },
            { de: '**Nach jeder Build-Änderung an der Trainingspuppe testen:** Spezialisierungen ändern Abklingzeiten und Bedingungen.', en: '**Test on the training dummy after every build change:** specialisations change cooldowns and conditions.' },
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: { de: 'Sonderfall: die Geister des Beschwörers', en: 'Special case: the Spiritmaster’s spirits' },
          text: {
            de: 'Bei den Beschwörungen sind sich die Guides **nicht** einig. Viele Creator-Guides legen die Geister ins Makro – meist in eine Kette mit [[16300000|Elemental Fusion]] unten und dem Feuergeist zuletzt (so z. B. Daeva Guides; AION2 Vault nennt es gängige Praxis). Unser Beschwörer-Guide lässt sie auf Taste 4 von Hand: Geister übernehmen deine Werte in dem Moment, in dem sie erscheinen – von Hand kommen die neuen Geister direkt nach deinen Buffs. Beides funktioniert. Legst du sie ins Makro, drück deine Buffs selbst, kurz bevor die Beschwörungen wieder bereit sind. Den uralten Geist ([[16250000|Summon: Ancient Spirit]]) rufen fast alle von Hand.',
            en: 'The guides do **not** agree on the summons. Many creator guides put the spirits into the macro – usually in a chain with [[16300000|Elemental Fusion]] at the bottom and the Fire Spirit last (for example Daeva Guides; AION2 Vault calls it common practice). Our Spiritmaster guide keeps them on key 4 by hand: spirits copy your stats the moment they appear – by hand the new spirits come right after your buffs. Both work. If you put them in the macro, press your buffs yourself shortly before the summons are ready again. Almost everyone calls the Ancient Spirit ([[16250000|Summon: Ancient Spirit]]) by hand.',
          },
        },
      ],
    },
    {
      title: { de: 'Einrichten Schritt für Schritt', en: 'Set it up step by step' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Ketten bauen', en: 'Build the chains' },
              text: {
                de: 'In der Skill-Leiste einen Skill anklicken und dann den Platz, auf den er soll – nicht ziehen. Bis zu 4 Skills pro Taste; der unterste kommt zuerst.',
                en: 'On the skill bar click a skill and then the slot it should go to – do not drag it. Up to 4 skills per key; the bottom one comes first.',
              },
            },
            {
              title: { de: 'Ketten ordnen', en: 'Order the chains' },
              text: {
                de: 'Skills mit kurzem Fenster unten, lange vor kurzen Abklingzeiten, den Füller ganz oben (Tabelle oben).',
                en: 'Skills with a short window at the bottom, long cooldowns before short ones, the filler on top (table above).',
              },
            },
            {
              title: { de: 'Makro füllen', en: 'Fill the macro' },
              text: {
                de: 'Skill-Fenster (**K**) öffnen, oben rechts „Makro“: pro Kette einen Schritt anlegen – ein Schritt ist eine ganze Taste. Kombo-Ketten zuerst, T zuletzt, überall 10 ms. Jedes deiner 3 Skill-Presets hat sein eigenes Makro.',
                en: 'Open the Skill window (**K**), “Macro” at the top right: add one step per chain – a step is a whole key. Combo chains first, T last, 10 ms everywhere. Each of your 3 skill presets has its own macro.',
              },
            },
            {
              title: { de: 'Taste belegen', en: 'Bind a key' },
              text: {
                de: 'Einstellungen → Tastenbelegung → Allgemein → **Makro** (direkt nach „Reittier“). Ab Werk ist keine Taste belegt – ohne Taste macht das Makro nichts. Die meisten nehmen die rechte Maustaste. Mit der AION-1-Steuerung geht keine Maustaste – nimm dann eine Tastatur-Taste oder stell auf AION-2-Steuerung um.',
                en: 'Settings → Key Settings → General → **Macro** (right after “Mount”). No key is bound by default – without a key the macro does nothing. Most players use the right mouse button. With the AION 1 control mode a mouse button does not work – use a keyboard key then, or switch to the AION 2 control mode.',
              },
            },
            {
              title: { de: 'Zielen einstellen', en: 'Set up targeting' },
              text: {
                de: 'Laut couga54: Automatisch anvisieren beim Skill-Einsatz (im englischen Client „Auto Target Upon Skill Use“) **an** für die offene Welt – dann sucht sich das Makro auch ohne gewähltes Ziel den nächsten Gegner. Und „Hauptziel beim Angriff festlegen“ („Set Main Target Upon Attack“) für die rechte Maustaste **aus**, damit die Makro-Taste nie aus Versehen dein Ziel wechselt.',
                en: 'According to couga54: “Auto Target Upon Skill Use” **on** for the open world – then the macro picks the next enemy even without a target selected. And “Set Main Target Upon Attack” for the right mouse button **off**, so the macro key never switches your target by accident.',
              },
            },
            {
              title: { de: 'An der Trainingspuppe testen', en: 'Test on the training dummy' },
              text: {
                de: 'Makro und linke Maustaste halten und zusehen: Kommt ein Skill zu früh, zu spät oder gar nicht, ändere die Reihenfolge der Kette oder des Makros – erst dann die Verzögerung.',
                en: 'Hold the macro and the left mouse button and watch: if a skill comes too early, too late or not at all, change the order of the chain or the macro – only then the delay.',
              },
            },
          ],
        },
        {
          type: 'heading',
          text: { de: 'Verzögerung und Ping', en: 'Delay and ping' },
        },
        {
          type: 'text',
          text: {
            de: 'Die Verzögerung ist die Pause zwischen zwei Schritten (10 bis 9.900 ms) – nicht dein Ping und kein Ersatz für Abklingzeiten. 10 ms ist der kleinste Wert und der übliche. Bei hohem Ping sind sich die Creator nicht einig:',
            en: 'The delay is the pause between two steps (10 to 9,900 ms) – not your ping and no substitute for cooldowns. 10 ms is the minimum and the usual value. With high ping the creators disagree:',
          },
        },
        {
          type: 'table',
          caption: { de: 'Startwerte für die Verzögerung', en: 'Starting values for the delay' },
          head: [
            { de: 'Dein Ping', en: 'Your ping' },
            { de: 'Verzögerung', en: 'Delay' },
            { de: 'Wer das sagt', en: 'Who says so' },
          ],
          rows: [
            [{ de: 'unter 50 ms', en: 'below 50 ms' }, '10 ms', 'aLuckyRO, couga54, DrybearGamers'],
            [{ de: '80–100 ms', en: '80–100 ms' }, { de: '10 ms; verschluckt das Makro Skills, 20–40 ms testen', en: '10 ms; if the macro drops skills, test 20–40 ms' }, 'delcatta'],
            [{ de: 'ab 80 ms', en: '80 ms or more' }, '40–50 ms', { de: 'aLuckyRO; Hemi (Beschwörer) spielt mit 50 ms', en: 'aLuckyRO; Hemi (Spiritmaster) plays with 50 ms' }],
            [{ de: 'egal', en: 'any' }, { de: 'immer 10 ms – die Verzögerung hat nichts mit dem Ping zu tun', en: 'always 10 ms – the delay has nothing to do with ping' }, 'Gamers Together'],
          ],
        },
        {
          type: 'compare',
          title: { de: 'Skill-Warteschlange: an oder aus?', en: 'Skill Queue: on or off?' },
          caption: {
            de: 'Einstellungen → Steuerung. Die Creator sind sich nicht einig (gesammelt von AION2 Vault, Daeva Guides und couga54). Vergleiche an der Puppe dieselbe Folge einmal mit und einmal ohne.',
            en: 'Settings → Controls. The creators disagree (collected by AION2 Vault, Daeva Guides and couga54). On the dummy, compare the same sequence once with and once without it.',
          },
          items: [
            {
              title: { de: 'An', en: 'On' },
              tone: 'blue',
              points: [
                { kind: 'pro', text: { de: 'Ein Skill, den du während eines anderen drückst, kommt direkt danach', en: 'A skill you press during another one comes right after it' } },
                { kind: 'pro', text: { de: 'Laut couga54 das beste Ergebnis mit dem Makro – es lässt keine Schritte fallen', en: 'According to couga54 the best result with the macro – it drops no steps' } },
                { text: { de: 'So spielen z. B. couga54, Antochi und delcatta', en: 'Used for example by couga54, Antochi and delcatta' } },
              ],
            },
            {
              title: { de: 'Aus', en: 'Off' },
              tone: 'slate',
              points: [
                { kind: 'pro', text: { de: 'Nichts bleibt in der Warteschlange hängen – manche Skills mit langer Animation oder Abklingzeit kamen sonst nicht', en: 'Nothing gets stuck in the queue – some skills with long animations or cooldowns did not fire otherwise' } },
                { kind: 'con', text: { de: 'Wer von Hand dazwischen drückt, muss genauer timen', en: 'If you press skills by hand in between, your timing has to be more exact' } },
                { text: { de: 'So spielen z. B. GunghoGuns und Wakayashi', en: 'Used for example by GunghoGuns and Wakayashi' } },
              ],
            },
          ],
        },
      ],
    },
    {
      title: { de: 'Häufige Fehler', en: 'Common mistakes' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: '**Keine Makro-Taste belegt:** Ab Werk ist keine gesetzt – das Makro tut dann gar nichts.', en: '**No macro key bound:** none is set by default – then the macro does nothing at all.' },
            { de: '**Füller unten in der Kette:** Die Taste nimmt dann immer nur ihn. Der Planer zeigt so eine Taste als blockiert.', en: '**Filler at the bottom of the chain:** then the key only ever uses it. The planner shows such a key as blocked.' },
            { de: '**Freischalter und Nutznießer weit auseinander:** Kommt der Skill, der von einem anderen lebt, erst viele Schritte später dran, läuft sein Fenster ab – nach [[11390000|Rage Burst]] hat [[11170000|Overhead Slam]] nur 10 s. Leg beide in eine Kette oder auf Tasten, die das Makro kurz nacheinander drückt.', en: '**Unlocker and payoff far apart:** if the skill that profits from another one only gets its turn many steps later, its window runs out – after [[11390000|Rage Burst]], [[11170000|Overhead Slam]] has only 10 s. Put both in one chain or on keys the macro presses shortly after each other.' },
            { de: '**Aufladeskills im Makro:** nur ein Drittel des Schadens (Diagramm oben).', en: '**Charged skills in the macro:** only a third of the damage (chart above).' },
            { de: '**Mantras und Auren im Makro:** Das Makro schaltet sie beim nächsten Durchlauf wieder aus.', en: '**Mantras and auras in the macro:** the macro turns them off again on the next pass.' },
            { de: '**Große Buffs im Makro:** Sie verpuffen am ersten schwachen Gegner und fehlen dann am Boss.', en: '**Big buffs in the macro:** they are wasted on the first weak monster and missing at the boss.' },
            { de: '**Grundattacke als Schritt statt auf der linken Maustaste:** weniger abgebrochene Animationen, weniger Schaden.', en: '**Basic attack as a step instead of on the left mouse button:** fewer cancelled animations, less damage.' },
            { de: '**Am ersten Tag zu viel ins Makro:** Fang mit einer Kette und T an, teste, dann erweitern.', en: '**Too much in the macro on day one:** start with one chain and T, test, then add more.' },
            { de: '**Hohe Verzögerung „wegen Ping“:** Jeder Schritt wartet dann länger. Erst bei verschluckten Skills erhöhen.', en: '**A high delay “because of ping”:** every step then waits longer. Only raise it when skills get dropped.' },
            { de: '**Makros aus Korea oder Taiwan übernehmen:** Dort gibt es andere Skill-Versionen und Stigma-Plätze (Taiwan: 6 aktive Stigmen statt 4). Bau nach den Skilltexten des globalen Clients.', en: '**Copying macros from Korea or Taiwan:** they have other skill versions and stigma slots (Taiwan: 6 active stigmas instead of 4). Build from the skill texts of the global client.' },
            { de: '**Nach einer neuen Spezialisierung nicht neu testen:** Abklingzeit oder Bedingung ändern sich – und damit die beste Reihenfolge.', en: '**Not re-testing after a new specialisation:** the cooldown or the condition changes – and with it the best order.' },
          ],
        },
      ],
    },
    {
      title: { de: 'Quellen', en: 'Sources' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Wie das Makro arbeitet, beschreiben die Makro-Guides von AION2 Vault, Daeva Guides, Aion2Tools und Gamers Together übereinstimmend; sie fassen die Videos und Guides von Creatorn wie DrybearGamers, MistaWigglez, GunghoGuns Gaming, Grobs, aLuckyRO, delcatta, couga54, Antochi und Hemi zusammen. Schaden, Abklingzeiten, Bedingungen und Spezialisierungen stammen aus den Skilldaten des globalen Clients, die Makros der Klassen aus unseren Klassen-Guides. Nutzungs-Anteile, die andere Seiten aus den Builds von questlog.gg gezählt haben, verwenden wir nicht.',
            en: 'How the macro works is described the same way by the macro guides of AION2 Vault, Daeva Guides, Aion2Tools and Gamers Together; they sum up videos and guides by creators such as DrybearGamers, MistaWigglez, GunghoGuns Gaming, Grobs, aLuckyRO, delcatta, couga54, Antochi and Hemi. Damage, cooldowns, conditions and specialisations come from the skill data of the global client, the class macros from our class guides. We do not use usage shares that other sites counted from questlog.gg builds.',
          },
        },
        {
          type: 'sources',
          items: [
            { href: 'https://aion2vault.com/builds/macros/', label: 'AION2 Vault – Macro guide: how macros work, what to keep out, delay and Skill Queue (2026-10-14)' },
            { href: 'https://daevaguides.com/en/guides/macros/', label: 'Daeva Guides – Macro guide for all 8 classes (2026-10-08)' },
            { href: 'https://aion2tools.xyz/macro/', label: 'Aion2Tools – Skill macro, delay range and Skill Queue (2026-10-15)' },
            { href: 'https://gamerstogether.cz/en/aion-2-macros/', label: 'Gamers Together – Macros: setup, delay and presets' },
            { href: 'https://couga54.github.io/aion2-guides/en/settings/', label: 'AION 2 Guides (couga54) – Settings (2026-10-10)' },
            { href: 'https://www.inven.co.kr/board/aion2/6388/202449', label: 'Inven – patch notes 2026-05-27 (macro steps = hotbar keys, minimum delay 10 ms)' },
            { href: 'https://www.ddaily.co.kr/page/view/2026012017472594505', label: 'Digital Daily – NCSOFT files criminal complaints against AION 2 macro program users (2026-01-20)' },
            { href: 'https://www.pcgamesn.com/aion-2/bots-gold-farming-bans', label: 'PCGamesN – Almost 5,000 accounts restricted for bots and unauthorised programs (2026-10-11)' },
          ],
        },
      ],
    },
  ],
};
