/**
 * Centralized site content.
 *
 * Everything the public pages render — copy, programmes, events, contact
 * details — is read through the functions in this file rather than being
 * hard-coded into components. Today these functions just return local
 * constants. Later, swapping their bodies for a `fetch()` call to the
 * school's internal management system (e.g. `GET /api/public/programmes`)
 * is a change confined to this one file — no page or component needs to
 * change. This is the seam the eventual admissions/blog/backend
 * integration will hook into.
 */

export type Programme = {
  slug: string;
  name: string;
  ageRange: string;
  tagline: string;
  description: string;
  highlights: string[];
};

// URL for the internal school-management system's login (parent/staff portal).
// Points at the "portal" subdomain seen in DNS — update here if that changes.
export const portalLoginUrl = "https://my.gracelandmontessori.com/admin";

// The site's canonical production URL — used for absolute links (share
// buttons, Open Graph metadata) that need a full URL rather than a path.
export const siteUrl = "https://www.gracelandmontessori.com";

export const school = {
  name: "Graceland Montessori",
  shortName: "Graceland",
  tagline: "Grace to prepare for Excellence",
  heroKicker: "A Montessori education in Accra",
  heroHeadline: "Where curiosity becomes confidence.",
  heroSubhead:
    "Graceland Montessori is a warm, child-centred school in East La (Tse Addo), Accra, guiding children from 1 to 12 years through a hands-on Montessori education — at their own pace, in their own time.",
  mission:
    "Our mission is to provide a safe, supportive, and stimulating learning environment where every child is encouraged to explore, discover, and grow.",
  vision:
    "We envision confident, capable learners who carry the independence, curiosity, and care they build at Graceland into every stage of their lives.",
  values: [
    {
      title: "Child-led learning",
      description:
        "Every classroom is built around the child, not the other way round — hands-on materials, mixed-age groups, and the freedom to explore at their own pace.",
    },
    {
      title: "Prepared environments",
      description:
        "Calm, ordered, beautiful classrooms that children can move through independently, so confidence grows alongside skill.",
    },
    {
      title: "Whole-child care",
      description:
        "Academics sit alongside character, kindness, and self-reliance — we're preparing children for life, not just for exams.",
    },
    {
      title: "Genuine partnership",
      description:
        "Small classes and open communication mean you always know how your child is doing — not just at report-card time.",
    },
  ],
} as const;

export const programmes: Programme[] = [
  {
    slug: "toddlers",
    name: "Toddler Community",
    ageRange: "1 – 3 years",
    tagline: "First steps toward independence",
    description:
      "A gentle, nurturing introduction to the Montessori environment, where our youngest learners build language, movement, and the first sparks of independence in a safe, prepared space.",
    highlights: [
      "Low child-to-teacher ratio",
      "Practical life & sensory materials",
      "Language-rich, predictable routines",
    ],
  },
  {
    slug: "early-years",
    name: "Early Years (Casa)",
    ageRange: "3 – 5 years",
    tagline: "The heart of the Montessori classroom",
    description:
      "Our Casa classrooms bring together practical life, sensorial, language, maths, and cultural materials in one mixed-age community, where children choose their own meaningful work.",
    highlights: [
      "Mixed-age classroom community",
      "Individualised learning plans",
      "Foundations in literacy & numeracy",
    ],
  },
  {
    slug: "lower-primary",
    name: "Lower Primary",
    ageRange: "6 – 9 years",
    tagline: "Guided independence, growing responsibility",
    description:
      "Children move from concrete Montessori materials toward abstract thinking, take on classroom responsibility, and begin project-based work across English, Maths, Science, and Computing.",
    highlights: [
      "Core academics: English, Maths, Science, Computing",
      "Project-based, collaborative learning",
      "Growing self-direction and responsibility",
    ],
  },
  {
    slug: "upper-primary",
    name: "Upper Primary",
    ageRange: "9 – 12 years",
    tagline: "Preparing for the next stage",
    description:
      "Older learners deepen academic rigour, take on leadership within the school community, and build the study habits and confidence they'll carry into secondary school.",
    highlights: [
      "Rigorous core academics",
      "Leadership & community responsibility",
      "Preparation for secondary school",
    ],
  },
];

export const schedule = {
  days: "Monday – Friday",
  hours: "8:00 AM – 3:00 PM",
};

export const contact = {
  address: "Tse Addo, East La, Accra, Ghana",
  phones: ["+233 55 122 7660", "+233 24 458 5261"],
  email: "info@gracelandmontessori.com",
  officeHours: "Mon – Fri, 8:00 AM – 5:00 PM",
  // Google Plus Code for the school — pins the map exactly rather than relying on a text search.
  mapQuery: "HVR5+45 Accra",
};

export const events = [
  { name: "Open Day", date: "2026-04-20" },
  { name: "Sports Day", date: "2026-05-08" },
  { name: "End of Term Exams", date: "2026-07-17" },
];

export const staff = [
  {
    name: "Francisca Coffie",
    role: "Head of School",
    bio: "Oversees day-to-day school life and leads Graceland's administration, working closely with every classroom and every family.",
  },
  {
    name: "Vicentia Ashie",
    role: "History",
    bio: "Brings the past to life for our Primary learners, connecting history to the world around them.",
  },
  {
    name: "Eunice",
    role: "English",
    bio: "Builds strong readers and confident communicators from the Early Years through Upper Primary.",
  },
  {
    name: "Rabiatu Assan",
    role: "Science",
    bio: "Leads hands-on science exploration that turns curiosity into understanding.",
  },
];

export const approachPillars = [
  {
    title: "Hands-on, concrete materials",
    description:
      "Children learn maths, language, and science through purpose-built Montessori materials they can touch, manipulate, and master — building real understanding before abstract thinking.",
  },
  {
    title: "Mixed-age classrooms",
    description:
      "Within each programme, children of different ages learn side by side. Younger children learn by watching older ones; older children deepen their own understanding by teaching.",
  },
  {
    title: "Freedom within structure",
    description:
      "Inside a carefully prepared, orderly classroom, children choose their own work and move at their own pace — building focus, independence, and intrinsic motivation.",
  },
  {
    title: "The teacher as guide",
    description:
      "Our teachers observe closely and guide individually, rather than lecturing to the whole class — meeting each child exactly where they are.",
  },
];

export const admissionsSteps = [
  {
    step: "1",
    title: "Submit an inquiry",
    description:
      "Tell us a little about your child using the form below. We aim to respond within one to two working days.",
  },
  {
    step: "2",
    title: "Book a visit",
    description:
      "We'll invite you in to tour the school, meet the teachers, and talk through what a day at Graceland looks like for your child.",
  },
  {
    step: "3",
    title: "Application & assessment",
    description:
      "We'll walk you through the application form, required documents, and a short, friendly settling-in assessment for your child.",
  },
  {
    step: "4",
    title: "Offer & enrolment",
    description:
      "Once a place is confirmed, we'll guide you through enrolment, fees, and everything you need before the first day.",
  },
];

export const admissionsFaqs = [
  {
    question: "What age can my child start at Graceland?",
    answer:
      "We welcome children from 1 year old in our Toddler Community, right through to 12 years old in Upper Primary. Children can join at any point that has an available place.",
  },
  {
    question: "Do you admit children throughout the year?",
    answer:
      "Where space allows, yes — we accept inquiries year-round, though most places open up at the start of each term.",
  },
  {
    question: "Is Graceland a full Montessori curriculum?",
    answer:
      "Yes. Our classrooms use Montessori materials and methods across practical life, sensorial, language, maths, and cultural studies, alongside core academics as children move into Primary.",
  },
  {
    question: "What are the school hours?",
    answer: `${schedule.days}, ${schedule.hours}.`,
  },
];

export const nav = [
  { label: "About", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
