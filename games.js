// ============================================================
//  Pinky Online Games — game catalog
//  To add a game: append an object here. That's it.
//
//  Fields:
//   id         unique slug (used for favorites / recently-played)
//   title      display name
//   emoji      cover emoji
//   tagline    one short line under the title
//   desc       longer description (shown on the card)
//   url        the playable game (must allow iframe embedding,
//              or set embed:false to open in a new tab)
//   embed      true = plays inside the site, false = new tab
//   ages       audience groups: 'toddlers' | 'kids' | 'teens'
//   ageBadge   little badge on the cover, e.g. '2+'
//   cats       category tags (Hebrew), used to build filter chips
//   g1,g2      cover gradient colors
// ============================================================

const GAMES = [
  {
    id: 'plop',
    title: 'פלופ! צלילה אל הביוב',
    emoji: '💩',
    tagline: 'הרפתקת ארקייד מצחיקה',
    desc: 'צללו לביוב בתור קקי גיבור־על! אספו תירס, חמקו ממכשולים, עברו שלבים — ונצחו את קקי הענק במטר ה־200.',
    url: 'https://plop-game.vercel.app',
    embed: true,
    ages: ['kids', 'teens'],
    ageBadge: '6+',
    cats: ['ארקייד', 'הרפתקה'],
    g1: '#36cabb',
    g2: '#5b6fe0',
  },
  {
    id: 'nelly-zoo',
    title: 'גן החיות של נלי',
    emoji: '🦁',
    tagline: 'קולות של חיות אמיתיות',
    desc: 'גן חיות קסום לפעוטות — לוחצים על חיה ושומעים את הקול האמיתי שלה! 17 חיות עם תמונות וצלילים אמיתיים.',
    url: 'https://nelly-zoo.vercel.app',
    embed: true,
    ages: ['toddlers', 'kids'],
    ageBadge: '2+',
    cats: ['חיות', 'למידה'],
    g1: '#ffb347',
    g2: '#ff5fa2',
  },
];

// audience filter chips (order matters)
const AGE_GROUPS = [
  { key: 'all',      label: 'כל הגילאים', emoji: '👨‍👩‍👧‍👦' },
  { key: 'toddlers', label: 'פעוטות',     emoji: '🧸' },
  { key: 'kids',     label: 'ילדים',      emoji: '🎈' },
  { key: 'teens',    label: 'נוער ומעלה', emoji: '⚡' },
];
