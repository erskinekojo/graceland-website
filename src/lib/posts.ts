/**
 * Blog posts.
 *
 * For now this is static, hand-maintained content — enough to launch a real
 * Blog/News section. It's deliberately shaped like a small CMS collection
 * (id, slug, publishedAt, excerpt, body) so that swapping the source is a
 * change confined to this file: either fetching posts from a headless CMS,
 * or from an endpoint the internal school-management system exposes.
 *
 * FUTURE INTEGRATION SEAM: when a post is published, the school wants the
 * internal system's parent-notification pipeline (SMS via Arkesel, in-app
 * messaging) to fire automatically. That does not exist yet. The natural
 * hook, once posts move to a real publish action (a CMS webhook or a
 * server action here), is a single call at the point of publish —
 * something like `notifyParentsOfNewPost(post)` — kept behind one function
 * so it can be pointed at the internal system's API without touching any
 * page or component. Do not build that call yet; this comment marks where
 * it belongs.
 */

export type PostPhoto = { src: string; alt: string; caption: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  publishedAt: string;
  author: string;
  category: string;
  /** A real photo for the post header. Falls back to PhotoPlaceholder when absent. */
  heroImage?: PostPhoto;
  /** Extra real photos shown as a small captioned gallery at the end of the post. */
  gallery?: PostPhoto[];
};

export const posts: Post[] = [
  {
    slug: "welcome-to-the-new-graceland-website",
    title: "Welcome to our new website",
    excerpt:
      "We've rebuilt our website from the ground up to make it easier for families to learn about Graceland Montessori — here's what's new.",
    body: [
      "We're glad you're here. This new site brings together everything prospective and current families need to know about Graceland Montessori — our Montessori approach, our programmes for children 1 through 12, admissions, and day-to-day life at the school.",
      "Over the coming weeks we'll be adding more photos from our classrooms, updates from our teachers, and news from around the school. Check back here, or follow along on the Blog for updates.",
    ],
    publishedAt: "2026-08-15",
    author: "Graceland Montessori",
    category: "School News",
  },
  {
    slug: "what-makes-a-montessori-classroom-different",
    title: "What makes a Montessori classroom different",
    excerpt:
      "A short guide for parents new to Montessori education — what to expect, and why it works.",
    body: [
      "Walk into a Graceland classroom and the first thing you'll notice is the quiet purposefulness — children moving confidently between activities they've chosen themselves, from a shelf of carefully prepared materials.",
      "That's not an accident. Montessori classrooms are built around a few core ideas: mixed-age groups, hands-on materials that make abstract ideas concrete, and teachers who guide rather than lecture. The result is children who don't just learn facts, but build real independence and a lasting love of learning.",
      "If you'd like to see it for yourself, we'd love to show you around — book a visit any time.",
    ],
    publishedAt: "2026-07-02",
    author: "Graceland Montessori",
    category: "Montessori Education",
  },
  {
    slug: "getting-ready-for-open-day",
    title: "Getting ready for Open Day",
    excerpt:
      "Our next Open Day is coming up — here's what families can expect when they visit.",
    body: [
      "Open Day is one of our favourite days of the term — a chance for prospective families to walk through our classrooms, meet our teachers, and see Montessori learning in action.",
      "Expect a guided tour of each programme, from our Toddler Community through Upper Primary, plenty of time for questions, and a chance to meet current Graceland families.",
      "Spaces are limited, so if you'd like to attend, get in touch through our Admissions page and we'll save you a spot.",
    ],
    publishedAt: "2026-03-28",
    author: "Graceland Montessori",
    category: "Events",
  },
  {
    slug: "ghana-month-museum-field-trip",
    title: "Ghana Month: our class trip to the Ghana National Museum",
    excerpt:
      "As part of our Ghana Month celebrations, our Primary pupils spent a morning exploring the Ghana National Museum — here's what they discovered.",
    body: [
      "Every March, in the lead-up to Independence Day, Graceland sets aside time to celebrate Ghana Month — a chance for our pupils to dig into the history, culture, and stories that shape the country they're growing up in. This year, that meant a morning at the Ghana National Museum in Accra.",
      "Our Lower and Upper Primary pupils explored exhibits spanning the Stone Age through to more recent Ghanaian history, guided by museum staff who brought each display to life — from a traditional grinding stone the children could examine up close, to rock art and a map tracing the movement of peoples and trade routes across the region.",
      "It's exactly the kind of learning we look for outside the classroom: hands-on, led by genuine curiosity, and full of the same close observation our pupils practise every day with Montessori materials at school — just applied to the real, physical history around them. The questions kept coming long after we'd left the museum.",
      "Thank you to the Ghana National Museum for hosting us, and to our wonderful staff and pupils for making it such a memorable morning. A few photos from the day are below.",
    ],
    publishedAt: "2026-03-05",
    author: "Graceland Montessori",
    category: "Field Trips",
    heroImage: {
      src: "/photos/field-trip-museum/grinding-stone.jpg",
      alt: "Graceland pupils gathered closely around a traditional grinding stone exhibit",
      caption: "A close look at a traditional grinding stone during our Ghana National Museum visit",
    },
    gallery: [
      {
        src: "/photos/field-trip-museum/museum-hall.jpg",
        alt: "The group listening to a guide inside the Ghana National Museum's main hall",
        caption: "Our guide walking the group through the museum's main hall",
      },
      {
        src: "/photos/field-trip-museum/rock-art.jpg",
        alt: "A guide pointing out details in a rock-art exhibit to Graceland pupils",
        caption: "Examining a rock-art exhibit up close",
      },
      {
        src: "/photos/field-trip-museum/ghana-map.jpg",
        alt: "Pupils looking closely at a map exhibit tracing Ghana's history",
        caption: "Tracing Ghana's history across the museum's regional map",
      },
      {
        src: "/photos/field-trip-museum/group-outdoor.jpg",
        alt: "Graceland pupils and staff posing together outside the Ghana National Museum",
        caption: "The whole group outside the museum, all smiles after a busy morning",
      },
    ],
  },
  {
    slug: "first-inter-school-abacus-competition",
    title: "Our first inter-school Abacus competition",
    excerpt:
      "Graceland hosted The Baylees Kidz Hub Montessori for a morning of mental-maths competition, cultural dance, and a trophy — our first inter-school event of its kind.",
    body: [
      "We hosted our very first inter-school competition this term — a mental-maths Abacus challenge that brought pupils from The Baylees Kidz Hub Montessori to Graceland for a morning of friendly competition.",
      "The day opened with an assembly, with pupils from both schools singing together before staff from each school welcomed everyone and set the tone for the morning. Then it was down to business: rows of pupils at their desks, abacus tools in hand, working through mental-maths problems with real focus and concentration.",
      "Between rounds, our younger pupils performed a traditional Ghanaian dance in kente cloth — a favourite with the crowd, and a reminder that a day like this is about more than the competition itself. It closed with medals for the participants and a trophy raised high by one of our own, a proud moment for the whole school.",
      "Thank you to The Baylees Kidz Hub Montessori for joining us, and to every pupil who competed. We're already looking forward to the next one.",
    ],
    publishedAt: "2026-02-27",
    author: "Graceland Montessori",
    category: "Competitions",
    heroImage: {
      src: "/photos/inter-school-abacus-competition/abacus-focus.jpg",
      alt: "A Graceland pupil concentrating closely while using an abacus tool during the competition",
      caption: "Deep concentration during the competition",
    },
    gallery: [
      {
        src: "/photos/inter-school-abacus-competition/assembly-abacus.jpg",
        alt: "Graceland pupils seated with abacus tools during the opening assembly, in front of a 'welcome back to school' mural",
        caption: "Pupils with their abacus tools at the opening assembly",
      },
      {
        src: "/photos/inter-school-abacus-competition/speaking-mic.jpg",
        alt: "A Graceland pupil speaking into a microphone alongside classmates during the assembly",
        caption: "Pupils leading the opening assembly",
      },
      {
        src: "/photos/inter-school-abacus-competition/staff-remarks.jpg",
        alt: "Graceland staff giving welcoming remarks at a podium, decorated with balloons and school banners",
        caption: "Welcoming remarks to open the competition",
      },
      {
        src: "/photos/inter-school-abacus-competition/abacus-group-desk.jpg",
        alt: "Three Graceland pupils working through mental-maths problems together with abacus tools at a desk",
        caption: "Working through the rounds together",
      },
      {
        src: "/photos/inter-school-abacus-competition/kente-dance.jpg",
        alt: "Young Graceland pupils performing a traditional Ghanaian dance in kente cloth",
        caption: "A traditional dance performance between rounds",
      },
      {
        src: "/photos/inter-school-abacus-competition/trophy-raised.jpg",
        alt: "A young Graceland pupil raising the competition trophy overhead",
        caption: "Trophy raised high to close out the day",
      },
    ],
  },
  {
    slug: "breast-cancer-awareness-screening",
    title: "Hosting a breast cancer awareness screening for our community",
    excerpt:
      "For Breast Cancer Awareness Month, we opened our doors to parents and the wider community for a free health screening — blood pressure checks, consultations, and honest conversation.",
    body: [
      "This October, Graceland partnered with health professionals to host a breast cancer awareness screening event, open to parents, staff, and the wider community around East La.",
      "Volunteers from the Ghana Health Service and local hospitals ran the day — sitting down with each visitor for a one-on-one consultation, taking blood pressure readings, and sharing information on early detection and self-examination. It was as much about honest conversation as it was about the checks themselves.",
      "It wasn't just for the grown-ups. With children in tow, we also had a table for height and weight checks, which turned out to be one of the most popular stops of the day.",
      "Thank you to every volunteer who gave their time, and to the parents and community members who came through. Events like this are exactly the kind of thing Graceland wants to keep doing — using our space for more than just the school day.",
    ],
    publishedAt: "2025-10-25",
    author: "Graceland Montessori",
    category: "Community",
    heroImage: {
      src: "/photos/breast-cancer-awareness-screening/bp-check-smiling.jpg",
      alt: "A smiling woman having her blood pressure checked by a health volunteer",
      caption: "Free blood pressure checks throughout the day",
    },
    gallery: [
      {
        src: "/photos/breast-cancer-awareness-screening/awareness-conversation.jpg",
        alt: "A health volunteer wearing a Breast Cancer Awareness t-shirt speaking with a community member",
        caption: "A volunteer sharing information on early detection during the screening",
      },
      {
        src: "/photos/breast-cancer-awareness-screening/consultation-intake.jpg",
        alt: "A health volunteer speaking with a community member at a consultation table",
        caption: "One-on-one consultations were the starting point for every visitor",
      },
      {
        src: "/photos/breast-cancer-awareness-screening/bp-check-headscarf.jpg",
        alt: "A woman having her blood pressure checked by a health volunteer",
        caption: "Every visitor was screened, one on one",
      },
      {
        src: "/photos/breast-cancer-awareness-screening/toddler-height-check.jpg",
        alt: "A toddler being measured on a height scale by a staff member",
        caption: "A height and weight table kept the younger visitors busy too",
      },
      {
        src: "/photos/breast-cancer-awareness-screening/boys-height-check.jpg",
        alt: "Three boys lined up to be measured on a height scale",
        caption: "Lining up for height checks",
      },
      {
        src: "/photos/breast-cancer-awareness-screening/family-group.jpg",
        alt: "A mother with four children posing together at the event, decorated with pink and white balloons",
        caption: "Families came out to support the day",
      },
      {
        src: "/photos/breast-cancer-awareness-screening/volunteers-group.jpg",
        alt: "A group of health volunteers wearing pink 'Hope, Faith, Support' t-shirts",
        caption: "Some of the volunteers who made the day possible",
      },
    ],
  },
  {
    slug: "kwame-nkrumah-mausoleum-field-trip",
    title: "Our field trip to the Kwame Nkrumah Mausoleum",
    excerpt:
      "In the days around Independence Day, our pupils visited the Kwame Nkrumah Memorial Park in Accra to learn firsthand about Ghana's first president and the story of independence.",
    body: [
      "Every year around Independence Day, we look for a way to make the story of Ghana's independence feel real to our pupils — not just a date in a book, but a place they can stand in. This year that meant a trip to the Kwame Nkrumah Memorial Park and Mausoleum in Accra.",
      "Our pupils walked the grounds past the bronze statue of Dr. Kwame Nkrumah, through the museum galleries, and finally into the mausoleum itself, where a guide walked them through the story of Ghana's first president and the events that led to independence in 1957. It's a striking space — marble, high ceilings, and a real sense of occasion — and the children felt it.",
      "Along the way there was plenty of the curiosity and mischief you'd expect from a school trip too, from posing in front of the wall of portraits of Ghana's founding figures to a bit of good-natured height-measuring against the tomb's guardrail.",
      "Trips like this are exactly why we make Ghana Month a priority every year — Montessori learning works best when it's hands-on and real, and there's no substitute for standing where history actually happened.",
    ],
    publishedAt: "2024-03-07",
    author: "Graceland Montessori",
    category: "Field Trips",
    heroImage: {
      src: "/photos/nkrumah-mausoleum-field-trip/group-portraits-wall.jpg",
      alt: "Graceland pupils and staff gathered beneath a wall of portraits of Ghana's founding figures",
      caption: "The whole group beneath the wall of portraits at the Memorial Park",
    },
    gallery: [
      {
        src: "/photos/nkrumah-mausoleum-field-trip/arriving-plaque.jpg",
        alt: "Pupils filing in past the plaque marking the Kwame Nkrumah Memorial Park entrance",
        caption: "Arriving at the Kwame Nkrumah Memorial Park",
      },
      {
        src: "/photos/nkrumah-mausoleum-field-trip/walking-to-statue.jpg",
        alt: "Pupils and staff walking across the grounds toward the bronze statue of Kwame Nkrumah",
        caption: "Walking the grounds past the statue of Dr. Kwame Nkrumah",
      },
      {
        src: "/photos/nkrumah-mausoleum-field-trip/walking-to-balcony.jpg",
        alt: "Pupils walking up the steps toward the memorial building",
        caption: "Making our way up to the museum building",
      },
      {
        src: "/photos/nkrumah-mausoleum-field-trip/tomb-guide-talking.jpg",
        alt: "Pupils gathered around the mausoleum's tomb listening to a guide",
        caption: "Listening closely as our guide told the story of independence",
      },
      {
        src: "/photos/nkrumah-mausoleum-field-trip/tomb-height-measure.jpg",
        alt: "A guide playfully measuring a pupil's height beside the tomb",
        caption: "A lighter moment inside the mausoleum",
      },
      {
        src: "/photos/nkrumah-mausoleum-field-trip/walking-by-pool.jpg",
        alt: "Pupils walking in a line beside a long reflecting pool on the memorial grounds",
        caption: "Walking the grounds beside the reflecting pool",
      },
      {
        src: "/photos/nkrumah-mausoleum-field-trip/pupil-close-up.jpg",
        alt: "Close-up of a smiling Graceland pupil among her classmates",
        caption: "One of our pupils, all smiles on the day",
      },
    ],
  },
  {
    slug: "carols-day-celebration",
    title: "Carols Day: a morning of song, dance, and nativity",
    excerpt:
      "Our pupils marked the end of term with Carols Day — a stage full of song, dance, and a nativity performance for parents and the whole school community.",
    body: [
      "To close out the term, Graceland pupils traded their usual uniforms for their Christmas best — white outfits topped with festive red, green, and gold headbands — for our annual Carols Day celebration.",
      "The morning opened with the whole school gathered under the Graceland Montessori backdrop, singing carols together before pupils took turns leading songs into the microphone, hands raised and voices loud, with parents and staff singing right along.",
      "The highlight of the morning was a nativity performance, with our youngest pupils taking the stage in kente-wrapped costumes, cradling baby dolls as they retold the Christmas story for a courtyard full of proud parents and grandparents.",
      "Between performances there was dancing, laughter, and no shortage of camera phones capturing it all — exactly the warm, joyful send-off we hope for as pupils head into the holidays.",
    ],
    publishedAt: "2025-12-18",
    author: "Graceland Montessori",
    category: "Events",
    heroImage: {
      src: "/photos/carols-day-celebration/stage-dance-backdrop.jpg",
      alt: "Graceland pupils dancing on stage in front of a Christmas-themed Graceland Montessori backdrop with balloon arches",
      caption: "On stage for Carols Day, in front of our Christmas backdrop",
    },
    gallery: [
      {
        src: "/photos/carols-day-celebration/singing-into-mic.jpg",
        alt: "Graceland pupils singing energetically into a microphone on stage",
        caption: "Leading the carols, one verse at a time",
      },
      {
        src: "/photos/carols-day-celebration/nativity-skit-balloons.jpg",
        alt: "Pupils performing a nativity-style skit on a stage decorated with balloon arches",
        caption: "A nativity performance for the whole school community",
      },
      {
        src: "/photos/carols-day-celebration/nativity-dolls-kente.jpg",
        alt: "Two young pupils in kente-wrapped costumes holding baby dolls during the nativity performance",
        caption: "Retelling the Christmas story, kente cloth and all",
      },
      {
        src: "/photos/carols-day-celebration/toddlers-walking-line.jpg",
        alt: "A line of toddlers in white dresses walking together at the Carols Day celebration",
        caption: "Our youngest pupils in their Christmas best",
      },
      {
        src: "/photos/carols-day-celebration/choir-mother-baby.jpg",
        alt: "Pupils singing together as a parent holds a baby nearby",
        caption: "A family affair — parents and little ones joined right in",
      },
      {
        src: "/photos/carols-day-celebration/prayer-hands-closeup.jpg",
        alt: "Close-up of a young pupil in a white outfit and bow tie, smiling with hands clasped together",
        caption: "All smiles in Christmas best",
      },
      {
        src: "/photos/carols-day-celebration/dance-motion.jpg",
        alt: "Pupils dancing energetically on stage during the Carols Day celebration",
        caption: "Dancing the morning away",
      },
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
