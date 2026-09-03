import Link from "next/link";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { getAllPosts } from "@/lib/posts";
import { school } from "@/lib/content";

export const metadata = {
  title: `Blog & News — ${school.name}`,
  description: "News and updates from Graceland Montessori.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="text-center">
        <span className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-600">
          Blog &amp; News
        </span>
        <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-brand-950 sm:text-5xl">
          Stories &amp; updates from Graceland
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/65">
          Notes from our classrooms, news from around the school, and the occasional guide for
          Montessori parents.
        </p>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-900/10"
          >
            <PhotoPlaceholder label={`${post.title} photo`} aspect="aspect-[5/3]" className="rounded-none rounded-t-2xl border-0" />
            <div className="flex flex-1 flex-col p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-sun-600">
                {post.category}
              </span>
              <h2 className="mt-1.5 font-heading text-lg font-bold text-brand-950">
                {post.title}
              </h2>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink/65">{post.excerpt}</p>
              <p className="mt-4 text-xs text-ink/45">
                {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
