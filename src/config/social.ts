/**
 * External profiles. These are the only URLs allowed into schema.org `sameAs`,
 * so the entity graph never asserts a profile that isn't linked from the UI.
 */

/** Profiles confirmed as belonging to Tims Tittus. */
export const verifiedProfiles = {
  mainSite: "https://timstittus.com",
  github: "https://github.com/TimsTittus",
  linkedin: "https://www.linkedin.com/in/tims-tittus",
} as const;

/**
 * Profiles that were already declared in this repository and are linked from
 * the site UI (hero + footer). Remove any entry here that is not actually the
 * author's account — everything listed is emitted in `sameAs`.
 */
export const additionalProfiles = {
  x: "https://x.com/timstittus",
  instagram: "https://www.instagram.com/tims_tittus",
  facebook: "https://www.facebook.com/timstittus",
} as const;

export const socialConfig = {
  ...verifiedProfiles,
  ...additionalProfiles,
  /** Alias kept for existing UI components. */
  twitter: additionalProfiles.x,
} as const;

/** Ordered, de-duplicated list for schema.org sameAs. */
export const sameAs: string[] = Array.from(
  new Set([
    verifiedProfiles.mainSite,
    verifiedProfiles.github,
    verifiedProfiles.linkedin,
    ...Object.values(additionalProfiles),
  ])
);