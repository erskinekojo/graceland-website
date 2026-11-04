import { getAllPosts, type PostPhoto } from "@/lib/posts";

/**
 * Everything the gallery slideshow shows. Photos are gathered automatically
 * from the blog (each post's hero image and gallery), so publishing a new post
 * with photos adds them here with no extra work. Photos that don't belong to a
 * post live in EXTRA_PHOTOS below.
 */

export type GalleryPhoto = {
  src: string;
  alt: string;
  /** The short description shown under the photo. */
  caption: string;
  /** Filter group: Events, Field trips, Community or School life. */
  category: GalleryCategory;
  /** The blog post this photo comes from, if any. */
  story?: { slug: string; title: string; date: string };
};

export const CATEGORIES = ["Events", "Field trips", "Community", "School life"] as const;
export type GalleryCategory = (typeof CATEGORIES)[number];

/** Map a blog post category onto one of the gallery's four filters. */
function toCategory(postCategory: string): GalleryCategory {
  switch (postCategory) {
    case "Events":
    case "Competitions":
      return "Events";
    case "Field Trips":
      return "Field trips";
    case "Community":
      return "Community";
    default:
      return "School life";
  }
}

/** Photos that aren't part of a blog post. */
const EXTRA_PHOTOS: PostPhoto[] = [
  {
    src: "/photos/around-the-school/toddlers-ride-on-car-hug.jpg",
    alt: "Two Graceland toddlers cheek to cheek and smiling together in a ride-on toy car",
    caption: "Best friends in the play corner",
  },
  {
    src: "/photos/around-the-school/soccer-goal-outdoor-play.jpg",
    alt: "Two Graceland pupils sitting together inside a small goal frame on the school's outdoor sports court",
    caption: "Finding new ways to play on the sports court",
  },
  {
    src: "/photos/around-the-school/toddlers-outdoor-play-turf.jpg",
    alt: "Graceland toddlers playing together on the outdoor turf area, with a ride-on toy car nearby",
    caption: "Outdoor play time for our youngest pupils",
  },
];

/**
 * One "album" per post (newest first) plus the extras. We then deal photos out
 * round-robin, one from each album in turn, so the slideshow keeps changing
 * scene instead of showing seven graduation photos in a row.
 */
function buildPhotos(): GalleryPhoto[] {
  const seen = new Set<string>();
  const albums: GalleryPhoto[][] = [];

  for (const post of getAllPosts()) {
    const raw = [post.heroImage, ...(post.gallery ?? [])].filter((p): p is PostPhoto => Boolean(p));
    const album: GalleryPhoto[] = [];
    for (const p of raw) {
      if (seen.has(p.src)) continue;
      seen.add(p.src);
      album.push({
        ...p,
        category: toCategory(post.category),
        story: { slug: post.slug, title: post.title, date: post.publishedAt },
      });
    }
    if (album.length) albums.push(album);
  }

  const extras = EXTRA_PHOTOS.filter((p) => !seen.has(p.src)).map(
    (p): GalleryPhoto => ({ ...p, category: "School life" }),
  );
  if (extras.length) albums.push(extras);

  const out: GalleryPhoto[] = [];
  for (let round = 0; out.length < albums.reduce((n, a) => n + a.length, 0); round++) {
    for (const album of albums) if (album[round]) out.push(album[round]);
  }
  return out;
}

export const galleryPhotos: GalleryPhoto[] = buildPhotos();
