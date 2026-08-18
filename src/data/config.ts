import { personConfig } from "@/config/person";
import { defaultKeywords } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { socialConfig } from "@/config/social";

/**
 * Backwards-compatible view over the SEO config in `src/config/*`.
 * Keep new code pointing at `@/config/site`, `@/config/person` and
 * `@/config/social` — this object exists so existing UI keeps working.
 */
const config = {
  title: siteConfig.defaultTitle,
  description: {
    long: siteConfig.description.long,
    short: siteConfig.description.short,
  },
  keywords: defaultKeywords,
  author: personConfig.name,
  email: siteConfig.email,
  site: siteConfig.url,
  mainSite: siteConfig.mainSiteUrl,

  // for github stars button
  githubUsername: "TimsTittus",
  githubRepo: "3d-portfolio",

  get ogImg() {
    return `${siteConfig.url}/og`;
  },
  social: {
    twitter: socialConfig.x,
    linkedin: socialConfig.linkedin,
    instagram: socialConfig.instagram,
    facebook: socialConfig.facebook,
    github: socialConfig.github,
  },
};
export { config };
