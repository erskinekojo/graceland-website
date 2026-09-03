import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { school, siteUrl } from "@/lib/content";

const defaultTitle = `${school.name} — ${school.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: school.heroSubhead,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: school.name,
    title: defaultTitle,
    description: school.heroSubhead,
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: `${school.name} crest` }],
    locale: "en_GH",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: school.heroSubhead,
    images: ["/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
