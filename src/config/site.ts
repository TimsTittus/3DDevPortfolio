/**
 * Single source of truth for site-level identity.
 * Every canonical URL, sitemap entry and JSON-LD @id is derived from `url`.
 */
export const siteConfig = {
  /** Canonical origin of this site. No trailing slash. */
  url: "https://developer.timstittus.com",
  /** The author's main personal site — a separate entity/property. */
  mainSiteUrl: "https://timstittus.com",
  name: "Tims Tittus",
  /** Used for og:site_name and the WebSite schema node. */
  siteName: "Tims Tittus — Developer",
  shortName: "Tims Tittus",
  locale: "en_US",
  lang: "en",
  themeColor: "#09090b",
  /** Default title used on the homepage and as the metadata fallback. */
  defaultTitle: "Tims Tittus — AI, Cybersecurity & Full-Stack Developer",
  description: {
    short:
      "Tims Tittus is a developer working across AI engineering, cybersecurity and full-stack web development.",
    long:
      "The developer site of Tims Tittus — computer science and cybersecurity student, AI engineer and full-stack developer. Projects, engineering write-ups and technical notes covering AI applications, security tooling and modern web development with TypeScript, React, Next.js and Python.",
  },
  email: "timstittus1@gmail.com",
} as const;

/** Absolute URL builder. Always produces a canonical, trailing-slash-free URL. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = `/${path}`.replace(/\/+/g, "/").replace(/\/$/, "");
  return `${siteConfig.url}${clean === "" ? "/" : clean}`;
}

/** Stable JSON-LD node identifiers, so entities can be referenced by @id. */
export const schemaIds = {
  person: `${siteConfig.url}/#person`,
  website: `${siteConfig.url}/#website`,
  organization: `${siteConfig.url}/#person`,
  page: (path: string) => `${absoluteUrl(path)}#webpage`,
  breadcrumb: (path: string) => `${absoluteUrl(path)}#breadcrumb`,
  article: (path: string) => `${absoluteUrl(path)}#article`,
  project: (path: string) => `${absoluteUrl(path)}#project`,
  profilePage: `${siteConfig.url}/about#profilepage`,
} as const;