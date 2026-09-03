import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/photo";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ShareButtons } from "@/components/share-buttons";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { school, siteUrl } from "@/lib/content";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: `Blog — ${school.name}` };

  const ogImage = post.heroImage
    ? { url: post.heroImage.src, width: 2000, height: 1500, alt: post.heroImage.alt }
    : { url: "/og-default.jpg", width: 1200, height: 630, alt: `${school.name} crest` };

  return {
    title: `${post.title} — ${school.name}`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage.url],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Link href="/blog" className="block text-sm font-medium text-brand-700 hover:underline">
        ← All posts
      </Link>

      <span className="mt-6 block text-xs font-semibold uppercase tracking-wide text-sun-600">
        {post.category}
      </span>
      <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-ink/50">
        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        · {post.author}
      </p>

      <div className="mt-5">
        <ShareButtons url={`${siteUrl}/blog/${post.slug}`} title={post.title} />
      </div>

      {post.heroImage ? (
        <Photo
          src={post.heroImage.src}
          alt={post.heroImage.alt}
          caption={post.heroImage.caption}
          aspect="aspect-[16/9]"
          className="mt-8 [&>div]:shadow-lg [&>div]:shadow-brand-900/10"
          sizes="(min-width: 768px) 768px, 100vw"
        />
      ) : (
        <PhotoPlaceholder
          label={`${post.title} photo`}
          aspect="aspect-[16/9]"
          className="mt-8 shadow-lg shadow-brand-900/10"
        />
      )}

      <div className="prose-graceland mt-8 space-y-5">
        {post.body.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-ink/80">
            {paragraph}
          </p>
        ))}
      </div>

      {post.gallery && post.gallery.length > 0 && (
        <div className="mt-10 grid gap-6 border-t border-brand-100 pt-10 sm:grid-cols-2">
          {post.gallery.map((photo) => (
            <Photo
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              caption={photo.caption}
              aspect="aspect-[4/3]"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          ))}
        </div>
      )}

      <div className="mt-12 rounded-2xl border border-brand-100 bg-brand-50 p-6 text-center">
        <p className="font-heading text-base font-bold text-brand-950">
          Curious about Graceland?
        </p>
        <Link
          href="/admissions"
          className="mt-3 inline-block rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Book a Visit
        </Link>
      </div>
    </article>
  );
}
