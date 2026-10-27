/**
 * Seasonal themes: one place that says WHEN each season runs, WHAT it says,
 * and WHAT its floating toy does. Colours live in globals.css, keyed by the
 * same ids (html[data-theme="<id>"]).
 *
 * How it works: a tiny script (SEASON_SCRIPT, injected in layout.tsx) runs
 * before first paint, works out today's season from the visitor's own date, and
 * sets data-theme on <html>. Banners are plain server-rendered markup shown or
 * hidden by CSS; the floating toy is a client component. Because the date is
 * read in the browser, statically built pages need no rebuild when a season
 * starts or ends.
 *
 * To change a window, edit RULES below. RULES are checked top to bottom and the
 * FIRST match wins, so order is priority: short, specific days sit above
 * month-long seasons. Months in rules are 1-12.
 *
 * Preview any season with ?theme=<id> (e.g. ?theme=easter), or ?theme=default
 * for the normal site. ?theme=pink is a shortcut for pink-october.
 */

export type SeasonId =
  | "pink-october"
  | "christmas"
  | "ghana-month"
  | "ramadan"
  | "eid"
  | "eid-al-adha"
  | "easter"
  | "new-year"
  | "month-of-love"
  | "farmers-day"
  | "mothers-day"
  | "fathers-day"
  | "girl-child"
  | "literacy-day"
  | "environment-day";

export type ShapeName =
  | "heart"
  | "star"
  | "crescent"
  | "ribbon"
  | "flower"
  | "egg"
  | "leaf"
  | "petal"
  | "flake"
  | "confetti"
  | "letter"
  | "dot"
  | "drop";

/** What happens when the floating toy is tapped. */
export type ToyEffect =
  | "burst" // a puff of shapes fanning up and out
  | "float" // shapes drift slowly up the screen, swaying like helium ribbons
  | "fountain-fall" // shapes pop out, then a gentle fall across the screen
  | "fireworks" // sparks bursting across a darkened screen
  | "grow"; // a seedling that grows a stage per tap, then a harvest burst

export type ToyConfig = {
  /** Small pill shown beside the toy until it is first tapped. */
  hint: string;
  ariaLabel: string;
  /** Read out to screen readers on tap. */
  announce: string;
  effect: ToyEffect;
  shapes: ShapeName[];
  colors: string[];
  /** Characters used by the "letter" shape. */
  letters?: string;
  /** No white circle behind the icon (used by the snow globe). */
  bare?: boolean;
  /** Wobble the icon on tap. */
  shake?: boolean;
  /** Brief pill shown after a tap when there is no card. */
  toast?: string;
  card?: {
    title: string;
    messages: string[];
    /** Fixed share message (path is appended to the site URL). */
    share?: { title: string; path: string };
    /** A little "write a card" box whose text can be shared. */
    maker?: { placeholder: string; defaultMessage: string };
  };
};

export type Season = {
  id: SeasonId;
  label: string;
  banner: { text: string; link?: { label: string; href: string } };
  toy?: ToyConfig;
};

const FLAG = ["#ce1126", "#fcd116", "#006b3f", "#111111"];

export const SEASONS: Season[] = [
  {
    id: "pink-october",
    label: "Pink October",
    banner: {
      text: "October is Breast Cancer Awareness Month — early detection saves lives.",
      link: { label: "See our community screening", href: "/blog/breast-cancer-awareness-screening" },
    },
    toy: {
      hint: "Tap the ribbon",
      ariaLabel: "Pink ribbon: tap for a breast cancer awareness message",
      announce: "A pink ribbon awareness message is showing.",
      effect: "float",
      shapes: ["ribbon", "ribbon", "heart"],
      colors: ["#be185d", "#db2777", "#ec4899", "#f472b6", "#f9a8d4"],
      card: {
        title: "Pink October",
        messages: [
          "Early detection saves lives.",
          "Know how your breasts normally look and feel, and tell a health professional about any change.",
          "Ask your doctor or clinic when screening is right for you.",
          "Anyone can be affected, including men. Awareness is for everyone.",
          "Check in on someone you love today, and encourage them to book a check-up.",
        ],
        share: {
          title:
            "October is Breast Cancer Awareness Month. Early detection saves lives. See how Graceland Montessori hosted a community screening:",
          path: "/blog/breast-cancer-awareness-screening",
        },
      },
    },
  },
  {
    id: "christmas",
    label: "Christmas",
    banner: {
      text: "Merry Christmas from all of us at Graceland Montessori.",
      link: { label: "Relive Carols Day", href: "/blog/carols-day-celebration" },
    },
    toy: {
      hint: "Tap for snow",
      ariaLabel: "Snow globe: tap to make it snow",
      announce: "Snow is falling. Merry Christmas from Graceland Montessori.",
      effect: "fountain-fall",
      shapes: ["flake"],
      colors: ["#7dd3fc", "#bae6fd", "#93c5fd", "#ffffff", "#e0f2fe"],
      bare: true,
      shake: true,
      toast: "Merry Christmas!",
    },
  },
  {
    id: "ghana-month",
    label: "Ghana Month",
    banner: {
      text: "Happy Ghana Month! Celebrating our heritage, our history and the Black Star nation.",
      link: { label: "Our Nkrumah Memorial Park trip", href: "/blog/kwame-nkrumah-mausoleum-field-trip" },
    },
    toy: {
      hint: "Tap the Black Star",
      ariaLabel: "Black Star: tap for a Ghana Month fact",
      announce: "A Ghana Month fact is showing.",
      effect: "fountain-fall",
      shapes: ["star", "confetti", "confetti"],
      colors: FLAG,
      card: {
        title: "Ghana Month",
        messages: [
          "Ghana became independent on 6 March 1957, the first country in sub-Saharan Africa to gain independence from colonial rule.",
          "Red, gold and green: our flag stands for the blood of those who fought for freedom, our mineral wealth and our forests. The Black Star stands for African freedom.",
          "Dr. Kwame Nkrumah was Ghana's first president and led the country to independence.",
          "Sankofa means “go back and get it”: we learn from our past to build our future.",
          "Wear your kente, learn a new Ghanaian word, and ask a grandparent about a favourite memory of Ghana.",
        ],
        share: {
          title: "Happy Ghana Month from Graceland Montessori! See our visit to the Kwame Nkrumah Memorial Park:",
          path: "/blog/kwame-nkrumah-mausoleum-field-trip",
        },
      },
    },
  },
  {
    id: "ramadan",
    label: "Ramadan",
    banner: { text: "Ramadan Kareem to our Muslim families and friends." },
    toy: {
      hint: "Tap the lantern",
      ariaLabel: "Lantern: tap for a Ramadan message",
      announce: "A Ramadan message is showing.",
      effect: "burst",
      shapes: ["crescent", "star", "star"],
      colors: ["#fcd34d", "#f59e0b", "#a5b4fc", "#818cf8"],
      card: {
        title: "Ramadan Kareem",
        messages: [
          "Ramadan Kareem! Wishing our Muslim families a blessed and peaceful month.",
          "Ramadan is a month of fasting, prayer, reflection and giving to others.",
          "Be patient, be generous, be grateful.",
          "Kindness belongs to everyone: share a smile, help a friend, give what you can.",
        ],
      },
    },
  },
  {
    id: "eid-al-adha",
    label: "Eid al-Adha",
    banner: { text: "Eid al-Adha Mubarak! Wishing our families a blessed and joyful Eid." },
    toy: {
      hint: "Tap the lantern",
      ariaLabel: "Lantern: tap for an Eid al-Adha message",
      announce: "An Eid al-Adha message is showing.",
      effect: "fountain-fall",
      shapes: ["star", "crescent", "confetti"],
      colors: ["#fcd34d", "#f59e0b", "#a5b4fc", "#818cf8", "#f9a8d4"],
      card: {
        title: "Eid al-Adha Mubarak",
        messages: [
          "Eid al-Adha Mubarak! Wishing you and your family a blessed and joyful Eid.",
          "Eid al-Adha is a time for sharing, giving and gratitude.",
          "Share what you have: a kind word, a meal, or help for someone in need.",
        ],
      },
    },
  },
  {
    id: "eid",
    label: "Eid al-Fitr",
    banner: { text: "Eid Mubarak! Wishing all our families who celebrate a joyful Eid." },
    toy: {
      hint: "Tap the lantern",
      ariaLabel: "Lantern: tap for an Eid message",
      announce: "An Eid message is showing.",
      effect: "fountain-fall",
      shapes: ["star", "crescent", "confetti"],
      colors: ["#fcd34d", "#f59e0b", "#a5b4fc", "#818cf8", "#f9a8d4"],
      card: {
        title: "Eid Mubarak",
        messages: [
          "Eid Mubarak! Wishing you a joyful celebration with the people you love.",
          "Eid is a time for family, thanks and generosity.",
          "Share your joy: visit someone, send a greeting, and enjoy the day.",
        ],
      },
    },
  },
  {
    id: "easter",
    label: "Easter",
    banner: { text: "Happy Easter from all of us at Graceland Montessori." },
    toy: {
      hint: "Tap the egg",
      ariaLabel: "Easter egg: tap for an Easter message",
      announce: "An Easter message is showing.",
      effect: "burst",
      shapes: ["egg", "flower", "egg"],
      colors: ["#a78bfa", "#f9a8d4", "#fde047", "#86efac", "#7dd3fc"],
      card: {
        title: "Happy Easter",
        messages: [
          "Happy Easter! Wishing our families a joyful and peaceful Easter.",
          "Easter is a time of hope, new beginnings and being together.",
          "Enjoy time with the people you love this Easter.",
        ],
      },
    },
  },
  {
    id: "new-year",
    label: "New Year",
    banner: { text: "Happy New Year! Wishing every Graceland family a year of growth, health and joy." },
    toy: {
      hint: "Tap for fireworks",
      ariaLabel: "Fireworks: tap to launch fireworks",
      announce: "Fireworks are launching. Happy New Year from Graceland Montessori.",
      effect: "fireworks",
      shapes: ["dot"],
      colors: ["#f2a900", "#fbbf24", "#ef4444", "#22d3ee", "#a78bfa", "#f472b6", "#ffffff"],
      toast: "Happy New Year!",
    },
  },
  {
    id: "month-of-love",
    label: "Month of Love",
    banner: { text: "Happy Month of Love! Spread kindness at home and at school." },
    toy: {
      hint: "Tap the heart",
      ariaLabel: "Heart: tap to write a kind note",
      announce: "A kind note card is open.",
      effect: "burst",
      shapes: ["heart"],
      colors: ["#e11d48", "#fb7185", "#fda4af", "#be123c", "#f9a8d4"],
      card: {
        title: "Send some love",
        messages: ["Write a kind note to someone you appreciate: a friend, teacher, parent or sibling."],
        maker: {
          placeholder: "Write something kind…",
          defaultMessage: "You are loved and appreciated. Thank you for being you!",
        },
      },
    },
  },
  {
    id: "farmers-day",
    label: "Farmers' Day",
    banner: { text: "Happy Farmers' Day! Thank you to the farmers who feed our nation." },
    toy: {
      hint: "Water the seedling",
      ariaLabel: "Seedling: tap to water it and watch it grow",
      announce: "The seedling got a drink and is growing.",
      effect: "grow",
      shapes: ["leaf", "dot", "dot"],
      colors: ["#ca8a04", "#dc2626", "#65a30d", "#ea580c"],
      card: {
        title: "Farmers' Day",
        messages: [
          "Thank you to the farmers who put food on our tables.",
          "Every meal starts on a farm.",
          "Ghana is one of the world's top cocoa producers: chocolate starts as a bean!",
          "National Farmers' Day is celebrated on the first Friday of December.",
          "Try growing something small at home. Beans and tomatoes grow well in pots.",
        ],
      },
    },
  },
  {
    id: "mothers-day",
    label: "Mother's Day",
    banner: { text: "Happy Mother's Day! Celebrating every mum, grandma and mother figure in the Graceland family." },
    toy: {
      hint: "Tap the flower",
      ariaLabel: "Flower: tap to make a Mother's Day card",
      announce: "A Mother's Day card is open.",
      effect: "fountain-fall",
      shapes: ["petal", "flower", "petal"],
      colors: ["#f0abfc", "#e879f9", "#f9a8d4", "#fbcfe8", "#c026d3"],
      card: {
        title: "A card for Mum",
        messages: ["Tell your mum, grandma or favourite mother figure how much she means to you."],
        maker: {
          placeholder: "Write a message for Mum…",
          defaultMessage: "Happy Mother's Day! Thank you for everything you do. We love you.",
        },
      },
    },
  },
  {
    id: "fathers-day",
    label: "Father's Day",
    banner: { text: "Happy Father's Day! Celebrating every dad, grandad and father figure in the Graceland family." },
    toy: {
      hint: "Tap the tie",
      ariaLabel: "Necktie: tap to make a Father's Day card",
      announce: "A Father's Day card is open.",
      effect: "burst",
      shapes: ["star", "star", "heart"],
      colors: ["#1d4ed8", "#60a5fa", "#fbbf24", "#93c5fd"],
      card: {
        title: "A card for Dad",
        messages: ["Tell your dad, grandad or favourite father figure how much he means to you."],
        maker: {
          placeholder: "Write a message for Dad…",
          defaultMessage: "Happy Father's Day! Thank you for everything you do. We love you.",
        },
      },
    },
  },
  {
    id: "girl-child",
    label: "Day of the Girl Child",
    banner: { text: "International Day of the Girl Child: every girl deserves to learn, grow and lead." },
    toy: {
      hint: "Tap the star",
      ariaLabel: "Star: tap for a Day of the Girl Child message",
      announce: "A Day of the Girl Child message is showing.",
      effect: "burst",
      shapes: ["star", "flower", "star"],
      colors: ["#ea580c", "#fb923c", "#f9a8d4", "#fcd34d"],
      card: {
        title: "Day of the Girl Child",
        messages: [
          "Every girl deserves to learn, grow and lead.",
          "When girls are educated, families and communities thrive.",
          "Tell a girl you know what you admire about her today.",
          "International Day of the Girl Child is marked every year on 11 October.",
        ],
        share: {
          title: "Every girl deserves to learn, grow and lead. Happy International Day of the Girl Child from Graceland Montessori!",
          path: "/",
        },
      },
    },
  },
  {
    id: "literacy-day",
    label: "International Literacy Day",
    banner: { text: "International Literacy Day: reading opens every door. Read something together today." },
    toy: {
      hint: "Tap the book",
      ariaLabel: "Book: tap for a reading message",
      announce: "A reading message is showing.",
      effect: "burst",
      shapes: ["letter"],
      colors: ["#0f766e", "#14b8a6", "#f59e0b", "#6366f1", "#ec4899"],
      letters: "ABCabcXYZ",
      card: {
        title: "Literacy Day",
        messages: [
          "Reading opens every door. Read something together today.",
          "Fifteen minutes of reading a day builds a strong reader.",
          "Visit a library, swap a book with a friend, or read to a younger child.",
          "International Literacy Day is marked every year on 8 September.",
        ],
        share: {
          title: "Reading opens every door. Happy International Literacy Day from Graceland Montessori!",
          path: "/",
        },
      },
    },
  },
  {
    id: "environment-day",
    label: "World Environment Day",
    banner: { text: "World Environment Day: small habits, big change. Let's look after our planet." },
    toy: {
      hint: "Tap the Earth",
      ariaLabel: "Earth: tap for an environment tip",
      announce: "An environment tip is showing.",
      effect: "fountain-fall",
      shapes: ["leaf", "leaf", "drop"],
      colors: ["#16a34a", "#4ade80", "#65a30d", "#0284c7", "#a3e635"],
      card: {
        title: "World Environment Day",
        messages: [
          "Small habits, big change: switch off lights, save water, use less plastic.",
          "Reduce, reuse, recycle, in that order!",
          "Plant a tree, or tend a plant at home or at school.",
          "World Environment Day is marked every year on 5 June.",
        ],
        share: {
          title: "Small habits, big change. Happy World Environment Day from Graceland Montessori!",
          path: "/",
        },
      },
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  When each season runs                                                      */
/* -------------------------------------------------------------------------- */

type Rule = { id: SeasonId } & (
  | { t: "fixed"; m: number; d: number; before: number; after: number }
  | { t: "nth"; m: number; wd: number; n: number; before: number; after: number } // wd: 0 = Sunday
  | { t: "easter"; before: number; after: number }
  | { t: "hijri"; month: number; minDay?: number; maxDay?: number }
  | { t: "month"; m: number }
  | { t: "span"; from: [number, number]; to: [number, number] }
);

/**
 * First match wins. Single days get a few days of lead-up so the site is
 * themed on school days, not only on the (often Sunday) day itself.
 */
export const RULES: Rule[] = [
  // One-day observances (with lead-up), highest priority
  { id: "girl-child", t: "fixed", m: 10, d: 11, before: 2, after: 0 }, // 11 Oct
  { id: "fathers-day", t: "nth", m: 6, wd: 0, n: 3, before: 6, after: 0 }, // 3rd Sunday of June
  { id: "mothers-day", t: "nth", m: 5, wd: 0, n: 2, before: 6, after: 0 }, // 2nd Sunday of May
  { id: "literacy-day", t: "fixed", m: 9, d: 8, before: 4, after: 0 }, // 8 Sep
  { id: "environment-day", t: "fixed", m: 6, d: 5, before: 4, after: 0 }, // 5 Jun
  { id: "farmers-day", t: "nth", m: 12, wd: 5, n: 1, before: 4, after: 0 }, // 1st Friday of December
  { id: "ghana-month", t: "fixed", m: 3, d: 6, before: 2, after: 1 }, // Independence Day, wins even during Ramadan
  // Movable religious seasons
  { id: "easter", t: "easter", before: 7, after: 1 }, // Palm Sunday to Easter Monday
  { id: "ramadan", t: "hijri", month: 9 },
  { id: "eid", t: "hijri", month: 10, maxDay: 3 }, // Eid al-Fitr: first three days of Shawwal
  { id: "eid-al-adha", t: "hijri", month: 12, minDay: 10, maxDay: 12 }, // Eid al-Adha: 10th-12th of Dhu al-Hijjah
  // Month-long and festive seasons
  { id: "ghana-month", t: "month", m: 3 },
  { id: "pink-october", t: "month", m: 10 },
  { id: "month-of-love", t: "month", m: 2 },
  { id: "new-year", t: "span", from: [12, 27], to: [1, 7] },
  { id: "christmas", t: "span", from: [12, 1], to: [12, 26] },
];

/**
 * Plain ES5 so it can run as an inline script before first paint. Defines
 * pick(now, query) -> season id | null. Kept as a string (not imported code)
 * so it works with no bundle loaded; it is unit-tested by evaluating this
 * same string.
 */
export const SEASON_LOGIC = `var RULES=${JSON.stringify(RULES)};var IDS=${JSON.stringify(SEASONS.map((s) => s.id))};
function dn(y,m,d){return Math.floor(Date.UTC(y,m,d)/864e5);}
function easter(y){var a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),da=((h+l-7*m+114)%31)+1;return dn(y,mo-1,da);}
function nth(y,m,wd,n){var f=new Date(Date.UTC(y,m-1,1)).getUTCDay();return dn(y,m-1,1+((wd-f+7)%7)+(n-1)*7);}
function hij(now){try{var p=new Intl.DateTimeFormat("en-u-ca-islamic-umalqura",{month:"numeric",day:"numeric"}).formatToParts(now),o={};for(var i=0;i<p.length;i++){o[p[i].type]=parseInt(p[i].value,10);}return o.month&&o.day?o:null;}catch(e){return null;}}
function pick(now,q){
var m=now.getMonth()+1,d=now.getDate(),y=now.getFullYear(),t=dn(y,m-1,d),h,i;
if(q){if(q==="default")return null;if(q==="pink")return "pink-october";for(i=0;i<IDS.length;i++){if(IDS[i]===q)return q;}}
for(i=0;i<RULES.length;i++){var r=RULES[i],hit=false,c;
if(r.t==="fixed"){c=dn(y,r.m-1,r.d);hit=t>=c-r.before&&t<=c+r.after;}
else if(r.t==="nth"){c=nth(y,r.m,r.wd,r.n);hit=t>=c-r.before&&t<=c+r.after;}
else if(r.t==="easter"){c=easter(y);hit=t>=c-r.before&&t<=c+r.after;}
else if(r.t==="month"){hit=m===r.m;}
else if(r.t==="span"){var md=m*100+d,a=r.from[0]*100+r.from[1],b=r.to[0]*100+r.to[1];hit=a<=b?(md>=a&&md<=b):(md>=a||md<=b);}
else if(r.t==="hijri"){if(h===undefined){h=hij(now)||false;}hit=!!h&&h.month===r.month&&(!r.minDay||h.day>=r.minDay)&&(!r.maxDay||h.day<=r.maxDay);}
if(hit){return r.id;}}
return null;}`;

/** Inline script: set data-theme on <html> before first paint. */
export const SEASON_SCRIPT = `(function(){try{${SEASON_LOGIC}var q=new URLSearchParams(location.search).get("theme");var t=pick(new Date(),q);if(t){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;

/** CSS that shows each season's banner only while its theme is active. */
export const BANNER_CSS = SEASONS.map((s) => `html[data-theme="${s.id}"] .sb-${s.id}{display:block}`).join("");
