import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { SectionHeading } from "@/components/section-heading";
import { school } from "@/lib/content";

export const metadata = {
  title: `Gallery — ${school.name}`,
  description: "A look at everyday life and classrooms at Graceland Montessori.",
};

const albums = [
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
              {album.items.map((item) => (
                <PhotoPlaceholder key={item} label={item} aspect="aspect-square" />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
