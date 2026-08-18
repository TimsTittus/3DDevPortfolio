import { personConfig } from "./person";
import { siteConfig } from "./site";

/**
 * Default keyword set. Kept short and honest — keywords are a weak signal and
 * long lists read as stuffing. Per-page keywords live with the page.
 */
export const defaultKeywords = [
  "Tims Tittus",
  "AI engineer",
  "cybersecurity developer",
  "full-stack developer",
  "Next.js developer",
  "TypeScript",
  "Python",
];

/**
 * One primary search intent per route. This is documentation for future
 * content work as much as configuration — it keeps pages from competing.
 */
export const routeIntents: Record<string, string> = {
  "/": "Tims Tittus developer",
  "/about": "Who is Tims Tittus?",
  "/projects": "Tims Tittus projects",
  "/blogs": "AI, cybersecurity and software engineering articles by Tims Tittus",
  "/resume": "Tims Tittus resume and experience",
  "/contact": "Contact Tims Tittus",
  "/author/tims-tittus": "Tims Tittus author profile",
};

export const seoConfig = {
  titleTemplate: (title: string) => `${title} | ${personConfig.name}`,
  defaultOgImage: {
    /** Generated on demand by /og — see src/app/og/route.tsx. */
    width: 1200,
    height: 630,
    alt: `${personConfig.name} — ${personConfig.headline}`,
  },
  twitter: {
    card: "summary_large_image" as const,
  },
  /** Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to verify in Search Console. */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  siteUrl: siteConfig.url,
};