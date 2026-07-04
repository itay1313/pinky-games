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
    desc: 'גן חיות קסום לפעוטות — לוחצים על חיה ושומעים את הקול האמיתי שלה! 17 חיות עם תמונות וצלילים אמיתיים, ומשחק "מי אני?".',
    url: 'https://nelly-zoo.vercel.app',
    embed: true,
    ages: ['toddlers', 'kids'],
    ageBadge: '2+',
    cats: ['חיות', 'למידה'],
    g1: '#ffb347',
    g2: '#ff5fa2',
  },
  {
    id: 'magic-memory',
    title: 'זיכרון קסום',
    emoji: '🧠',
    tagline: 'מוצאים זוגות, שוברים שיאים',
    desc: 'הופכים קלפים ומחפשים זוגות! שלוש רמות קושי, נושאים מתחלפים (חיות, חלל, אוכל…), כוכבים על יעילות ושיאים אישיים.',
    url: 'games/memory/',
    embed: true,
    ages: ['toddlers', 'kids', 'teens'],
    ageBadge: '3+',
    cats: ['חשיבה', 'למידה'],
    g1: '#8a63e0',
    g2: '#5fd0ff',
  },
  {
    id: 'dreamwear',
    title: 'DreamWear — סטודיו אופנה',
    emoji: '🎨',
    tagline: 'ציירו בד, וה-AI מלביש אתכם',
    desc: 'מציירים דוגמה על הקנבס, בוחרים דמות ולבוש — והקסם מלביש את הציור שלכם על הדמות! שמלה או חולצה ומכנסיים, שמירה והורדה של הלוק.',
    url: 'https://dreamwear-mini.vercel.app',
    embed: true,
    ages: ['kids', 'teens'],
    ageBadge: '4+',
    cats: ['יצירה', 'אופנה'],
    g1: '#ff8ac2',
    g2: '#a78bfa',
  },
];

// coming-soon teasers — shown at the bottom, not playable yet
const COMING_SOON = [
  { emoji: '🏎️', title: 'מרוץ מטורף' },
  { emoji: '🎣', title: 'מסע דיג' },
  { emoji: '🚀', title: 'הרפתקה בחלל' },
  { emoji: '⚽', title: 'כדורגל רחוב' },
  { emoji: '🧠', title: 'טריוויה למשפחה' },
  { emoji: '🍰', title: 'מאפיית הקסמים' },
  { emoji: '🎹', title: 'מוזיקה בקצב' },
  { emoji: '🧙', title: 'בית ספר לקוסמים' },
  { emoji: '🦖', title: 'עולם הדינוזאורים' },
  { emoji: '🌊', title: 'צוללת האוצרות' },
  { emoji: '🐱', title: 'חתולים בחלל' },
  { emoji: '🏰', title: 'טירת החידות' },
];

// audience filter chips (order matters)
const AGE_GROUPS = [
  { key: 'all',      label: 'כל הגילאים', emoji: '👨‍👩‍👧‍👦' },
  { key: 'toddlers', label: 'פעוטות',     emoji: '🧸' },
  { key: 'kids',     label: 'ילדים',      emoji: '🎈' },
  { key: 'teens',    label: 'נוער ומעלה', emoji: '⚡' },
];
