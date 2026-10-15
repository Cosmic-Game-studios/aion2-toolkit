import type { Guide } from '../types';

export const speedrun45: Guide = {
  id: 'speedrun-45',
  icon: 'speed',
  tone: 'gold',
  category: 'world',
  title: {
    de: 'Speedrun: in rund 5 Stunden auf Stufe 45',
    en: 'Speedrun: level 45 in about 5 hours',
  },
  summary: {
    de: 'Nur die goldenen Story-Missionen plus 3–4 Nebenmissionen – alles andere erst ab Stufe 45. So geht es am schnellsten auf die Maximalstufe.',
    en: 'Only the golden story missions plus 3–4 side missions – everything else waits until level 45. The fastest way to the level cap.',
  },
  updated: '2026-10-14',
  tags: [
    { de: 'Leveln', en: 'Levelling' },
    { de: 'Einsteiger', en: 'Beginner' },
    { de: 'Stufe 1–45', en: 'Level 1–45' },
  ],
  basis: {
    de: 'Eigener Testlauf auf dem globalen Server',
    en: 'Own test run on the global server',
  },
  sections: [
    {
      title: { de: 'Auf einen Blick', en: 'At a glance' },
      blocks: [
        {
          type: 'facts',
          items: [
            { label: { de: 'Ziel', en: 'Goal' }, value: { de: 'Charakterstufe 45 (aktuelle Maximalstufe)', en: 'Character level 45 (current cap)' } },
            { label: { de: 'Referenzzeit', en: 'Reference time' }, value: { de: '5 Std. 14 Min.', en: '5 h 14 min' } },
            { label: { de: 'Missionen', en: 'Missions' }, value: { de: 'Goldene Story-Missionen + 3–4 Nebenmissionen', en: 'Golden story missions + 3–4 side missions' } },
            { label: { de: 'Später', en: 'Later' }, value: { de: 'Dungeons und restliche Nebenmissionen', en: 'Dungeons and the remaining side missions' } },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { de: 'Die eine Regel', en: 'The one rule' },
          text: {
            de: 'Solange du levelst, zählen **nur die goldenen (gelben) Missionen**. Alles andere läuft dir nicht weg und wartet, bis du Stufe 45 bist.',
            en: 'While you level, **only the golden (yellow) missions** count. Everything else will still be there when you reach level 45.',
          },
        },
      ],
    },
    {
      title: { de: 'Schritt für Schritt', en: 'Step by step' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { de: 'Nur die goldenen Story-Missionen machen', en: 'Only do the golden story missions' },
              text: {
                de: 'Folge ausschließlich der Hauptgeschichte – das sind die goldenen Missionen. Sie führen dich ohne Umwege durch die Gebiete.',
                en: 'Follow the main story only – these are the golden missions. They lead you through the zones without detours.',
              },
            },
            {
              title: { de: 'Nebenbei 3–4 Nebenmissionen erledigen', en: 'Do 3–4 side missions along the way' },
              text: {
                de: 'Zusätzlich brauchst du **drei bis vier Nebenmissionen**. Nimm am besten die, die ohnehin auf deinem Weg liegen.',
                en: 'You also need **three to four side missions**. Ideally pick the ones that are on your way anyway.',
              },
            },
            {
              title: { de: 'Alles andere liegen lassen', en: 'Leave everything else for later' },
              text: {
                de: 'Keine weiteren Nebenmissionen und keine Dungeons, solange du unter Stufe 45 bist – das kostet mehr Zeit, als es beim Leveln bringt.',
                en: 'No further side missions and no dungeons while you are below level 45 – they cost more time than they give while levelling.',
              },
            },
            {
              title: { de: 'Ab Stufe 45: Dungeons abarbeiten', en: 'From level 45: work through the dungeons' },
              text: {
                de: 'Erst wenn du Stufe 45 erreicht hast, gehst du alle Dungeons nach und nach durch.',
                en: 'Only once you have reached level 45, run all dungeons one after another.',
              },
            },
            {
              title: { de: 'Danach: die übrigen Nebenmissionen', en: 'Then: the remaining side missions' },
              text: {
                de: 'Zum Schluss holst du alle Nebenmissionen nach, die beim Leveln liegen geblieben sind.',
                en: 'Finally, catch up on all the side missions you skipped while levelling.',
              },
            },
          ],
        },
      ],
    },
    {
      title: { de: 'Nach dem Speedrun', en: 'After the speedrun' },
      blocks: [
        {
          type: 'text',
          text: {
            de: 'Mit Stufe 45 bist du noch lange nicht fertig: Es warten noch sehr viele Nebenmissionen und alle Dungeons. Das ist aber genau der Plan – jetzt erledigst du sie mit voller Stufe und allen Skills.',
            en: 'Level 45 is far from the end: lots of side missions and all dungeons are still waiting. That is exactly the plan – now you do them at full level with all your skills.',
          },
        },
        {
          type: 'checklist',
          items: [
            { de: 'Stufe 45 erreicht', en: 'Level 45 reached' },
            { de: 'Build planen: Skillpunkte, Stigmen, Daevanion', en: 'Plan your build: skill points, stigmas, Daevanion' },
            { de: 'Alle Dungeons nach und nach abarbeiten', en: 'Work through all dungeons one by one' },
            { de: 'Übrige Nebenmissionen nachholen', en: 'Catch up on the remaining side missions' },
          ],
        },
        {
          type: 'links',
          items: [
            { href: '#/', label: { de: 'Jetzt deinen Stufe-45-Build planen', en: 'Plan your level 45 build now' } },
            { href: '#/stigma', label: { de: 'Stigmen auswählen (ab Stufe 22)', en: 'Pick stigmas (from level 22)' } },
          ],
        },
      ],
    },
  ],
};
