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

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  publishedAt: string;
  author: string;
  category: string;
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
];

export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
