import { Photo } from "@/components/photo";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { SectionHeading } from "@/components/section-heading";
import { school } from "@/lib/content";

export const metadata = {
  title: `Gallery — ${school.name}`,
  description: "A look at everyday life and classrooms at Graceland Montessori.",
  openGraph: {
    title: `Gallery — ${school.name}`,
    description: "A look at everyday life and classrooms at Graceland Montessori.",
    url: "/gallery",
    images: [
      {
        url: "/photos/field-trip-museum/group-outdoor.jpg",
        width: 2000,
        height: 1333,
        alt: "Graceland pupils and staff on a school field trip",
      },
    ],
  },
};

type AlbumItem = string | { src: string; alt: string; caption: string };

const albums: { title: string; items: AlbumItem[] }[] = [
  {
    title: "In the classroom",
    items: ["Practical life work", "Sensorial materials", "Language & reading corner", "Maths materials"],
  },
  {
    title: "Around the school",
    items: [
      "Outdoor play",
      "Garden & nature area",
      "Lunchtime",
      {
        src: "/photos/pta-one-on-one/teacher-parent-consultation.jpg",
        alt: "A teacher speaking with a parent and her son during a one-on-one PTA consultation",
        caption: "One-on-one PTA consultations between parents and teachers",
      },
      {
        src: "/photos/pta-one-on-one/father-son-teacher-discussion.jpg",
        alt: "A teacher discussing a pupil's notebook with a father and his son",
        caption: "Going through the term's work together",
      },
      {
        src: "/photos/pta-one-on-one/officer-parent-peace-sign.jpg",
        alt: "A smiling pupil making a peace sign next to his parent",
        caption: "All smiles after a good conversation about the term",
      },
    ],
  },
  {
    title: "Events",
    items: [
      {
        src: "/photos/inter-school-abacus-competition/assembly-abacus.jpg",
        alt: "Graceland pupils seated with abacus tools during the opening assembly",
        caption: "Opening assembly for our first inter-school Abacus competition",
      },
      {
        src: "/photos/inter-school-abacus-competition/staff-remarks.jpg",
        alt: "Graceland staff giving welcoming remarks at a podium decorated with balloons and banners",
        caption: "Welcoming remarks to open the competition",
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
      {
        src: "/photos/carols-day-celebration/stage-dance-backdrop.jpg",
        alt: "Graceland pupils dancing on stage in front of a Christmas-themed Graceland Montessori backdrop with balloon arches",
        caption: "On stage for Carols Day",
      },
      {
        src: "/photos/carols-day-celebration/nativity-skit-balloons.jpg",
        alt: "Pupils performing a nativity-style skit on a stage decorated with balloon arches",
        caption: "A nativity performance for the whole school community",
      },
      {
        src: "/photos/carols-day-celebration/toddlers-walking-line.jpg",
        alt: "A line of toddlers in white dresses walking together at the Carols Day celebration",
        caption: "Our youngest pupils in their Christmas best",
      },
    ],
  },
  {
    title: "Field trips",
    items: [
      {
        src: "/photos/field-trip-museum/grinding-stone.jpg",
        alt: "Children gathered around a traditional grinding stone exhibit at the Ghana National Museum",
        caption: "A close look at a traditional grinding stone, Ghana Month museum trip",
      },
      {
        src: "/photos/field-trip-museum/rock-art.jpg",
        alt: "A guide pointing out details in a rock-art exhibit to a group of Graceland pupils",
        caption: "Learning about ancient rock art on our Ghana Month excursion",
      },
      {
        src: "/photos/field-trip-museum/ghana-map.jpg",
        alt: "Pupils looking closely at a map exhibit at the Ghana National Museum",
        caption: "Tracing Ghana's history on the museum's regional map",
      },
      {
        src: "/photos/field-trip-museum/group-outdoor.jpg",
        alt: "Graceland pupils and staff posing together outside the Ghana National Museum",
        caption: "The whole group outside the museum after a morning of exploring",
      },
      {
        src: "/photos/nkrumah-mausoleum-field-trip/group-portraits-wall.jpg",
        alt: "Graceland pupils and staff gathered beneath a wall of portraits of Ghana's founding figures",
        caption: "The whole group at the Kwame Nkrumah Memorial Park",
      },
      {
        src: "/photos/nkrumah-mausoleum-field-trip/walking-to-statue.jpg",
        alt: "Pupils and staff walking across the grounds toward the bronze statue of Kwame Nkrumah",
        caption: "Walking the grounds past the statue of Dr. Kwame Nkrumah",
      },
      {
        src: "/photos/nkrumah-mausoleum-field-trip/tomb-guide-talking.jpg",
        alt: "Pupils gathered around the mausoleum's tomb listening to a guide",
        caption: "Listening as our guide told the story of independence",
      },
    ],
  },
  {
    title: "Community",
    items: [
      {
        src: "/photos/breast-cancer-awareness-screening/awareness-conversation.jpg",
        alt: "A health volunteer wearing a Breast Cancer Awareness t-shirt speaking with a community member",
        caption: "Our breast cancer awareness screening, open to parents and the community",
      },
      {
        src: "/photos/breast-cancer-awareness-screening/bp-check-smiling.jpg",
        alt: "A smiling woman having her blood pressure checked by a health volunteer",
        caption: "Free blood pressure checks throughout the day",
      },
      {
        src: "/photos/breast-cancer-awareness-screening/toddler-height-check.jpg",
        alt: "A toddler being measured on a height scale by a staff member",
        caption: "A height and weight table for the younger visitors",
      },
      {
        src: "/photos/breast-cancer-awareness-screening/volunteers-group.jpg",
        alt: "A group of health volunteers wearing pink 'Hope, Faith, Support' t-shirts",
        caption: "Some of the volunteers who made the day possible",
      },
    ],
  },
];

export default function GalleryPage() {
  return (
    <>
      <section className="bg-brand-50/70 px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-600">
            Gallery
          </span>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-brand-950 sm:text-5xl">
            A glimpse into life at Graceland
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
            Real photos from our classrooms and school events are being added here — this is the
            gallery&apos;s structure and layout, ready for those images.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-5 py-16 sm:px-8 sm:py-24">
        {albums.map((album) => (
          <section key={album.title}>
            <SectionHeading title={album.title} />
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {album.items.map((item) =>
                typeof item === "string" ? (
                  <PhotoPlaceholder key={item} label={item} aspect="aspect-square" />
                ) : (
                  <Photo
                    key={item.src}
                    src={item.src}
                    alt={item.alt}
                    aspect="aspect-square"
                    sizes="(min-width: 640px) 25vw, 50vw"
                  />
                )
              )}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
