import Image from "next/image";
import Link from "next/link";
import { contact, nav, school } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-100 bg-brand-950 text-brand-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt={`${school.name} crest`}
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="font-heading text-base font-bold text-white">
              {school.name}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-100/80">
            {school.tagline}. A Montessori education for children 1–12 in
            East La (Tse Addo), Accra.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-200">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-100/85">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-200">
            Visit us
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-100/85">
            <li>{contact.address}</li>
            {contact.phones.map((p) => (
              <li key={p}>
                <a href={`tel:${p.replace(/\s+/g, "")}`} className="transition hover:text-white">
                  {p}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${contact.email}`} className="transition hover:text-white">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-brand-200/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} {school.name}. All rights reserved.</p>
          <p>{school.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
