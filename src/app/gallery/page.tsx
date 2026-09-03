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
    items: ["Outdoor play", "Garden & nature area", "Lunchtime", "Assembly"],
  },
  {
    title: "Events",
    items: ["Open Day", "Sports Day", "Graduation", "Cultural Day"],
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
