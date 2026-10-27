import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PinkOctoberBanner } from "@/components/pink-october-banner";
import { ChristmasBanner } from "@/components/christmas-banner";
import { PinkRibbon } from "@/components/pink-ribbon";
import { SnowGlobe } from "@/components/snow-globe";
import { school, siteUrl } from "@/lib/content";

// Seasonal themes. Runs before first paint so there's no flash of the default
// look. Decided in the visitor's browser from today's date, so the
// statically-built pages need no rebuild when a season starts or ends.
//   October  -> pink-october   (Breast Cancer Awareness Month)
//   December -> christmas
// To change the windows, edit the month numbers below (0 = January).
// ?theme=pink / ?theme=christmas / ?theme=default override it for previewing.
const themeScript = `(function(){try{var q=new URLSearchParams(location.search).get("theme");var m=new Date().getMonth();var t=q==="pink"?"pink-october":q==="christmas"?"christmas":q==="default"?null:m===9?"pink-october":m===11?"christmas":null;if(t)document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased flex min-h-screen flex-col">
        <PinkOctoberBanner />
        <ChristmasBanner />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <PinkRibbon />
        <SnowGlobe />
      </body>
    </html>
  );
}
