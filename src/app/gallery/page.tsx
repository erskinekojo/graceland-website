import { GalleryShow } from "@/components/gallery-show";
import { school } from "@/lib/content";
import { CATEGORIES, galleryPhotos } from "@/lib/gallery";

const description =
  "Watch a slideshow of life at Graceland Montessori: events, field trips, community days and everyday moments from our classrooms.";

export const metadata = {
  title: `Gallery — ${school.name}`,
  description,
  openGraph: {
    title: `Gallery — ${school.name}`,
    description,
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

export default function GalleryPage() {
  return <GalleryShow photos={galleryPhotos} categories={CATEGORIES} />;
}
