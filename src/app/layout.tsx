import type { Metadata, Viewport } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import { personConfig } from "@/config/person";
import { defaultKeywords, seoConfig } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { ogImageUrl } from "@/lib/seo/metadata";
import { JsonLd, graph } from "@/lib/seo/jsonld";
import { personSchema } from "@/lib/seo/person-schema";
import { websiteSchema } from "@/lib/seo/website-schema";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import AppOverlays from "@/components/app-overlays";
import { Providers } from "@/components/providers";

/**
 * `metadataBase` is what keeps every relative OG/canonical URL resolving to the
 * production origin instead of localhost or a preview deployment host.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${personConfig.name}`,
  },
  description: siteConfig.description.long,
  keywords: defaultKeywords,
  applicationName: siteConfig.siteName,
  authors: [{ name: personConfig.name, url: siteConfig.url }],
  creator: personConfig.name,
  publisher: personConfig.name,
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: `${siteConfig.url}/`,
    siteName: siteConfig.siteName,
    title: siteConfig.defaultTitle,
    description: siteConfig.description.short,
    images: [
      {
        url: ogImageUrl({
          heading: personConfig.name,
          eyebrow: "developer.timstittus.com",
          subtitle: personConfig.headline,
        }),
        width: 1200,
        height: 630,
        alt: seoConfig.defaultOgImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.description.short,
    creator: "@timstittus",
    images: [
      ogImageUrl({
        heading: personConfig.name,
        eyebrow: "developer.timstittus.com",
        subtitle: personConfig.headline,
      }),
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.svg",
  },
  verification: seoConfig.verification.google
    ? { google: seoConfig.verification.google }
    : undefined,
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f5f9" },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.themeColor },
  ],
  colorScheme: "dark light",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_DOMAIN;
const umamiSiteId = process.env.NEXT_PUBLIC_UMAMI_SITE_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={siteConfig.lang}
      className={[inter.variable, archivoBlack.variable, "font-display"].join(" ")}
      suppressHydrationWarning
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[2000] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        <Providers>
          <Header />
          {children}
          <Footer />
          <AppOverlays />
        </Providers>

        {/* Site-wide entity graph: one WebSite and one Person, referenced by
            @id from every page-level schema so nothing contradicts. */}
        <JsonLd id="schema-site" data={graph([websiteSchema(), personSchema()])} />

        {umamiSrc && umamiSiteId && (
          <Script
            src={umamiSrc}
            data-website-id={umamiSiteId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
