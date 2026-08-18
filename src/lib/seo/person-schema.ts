import { personConfig } from "@/config/person";
import { absoluteUrl, schemaIds, siteConfig } from "@/config/site";
import { verifiedProfiles } from "@/config/social";

import type { JsonLdNode } from "./jsonld";

/**
 * The single Person node for the whole site. Every other page references it by
 * @id instead of redeclaring a competing Person entity.
 */
export function personSchema(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": schemaIds.person,
    name: personConfig.name,
    givenName: personConfig.givenName,
    familyName: personConfig.familyName,
    url: siteConfig.url,
    mainEntityOfPage: { "@id": schemaIds.profilePage },
    description: personConfig.bio.long,
    jobTitle: personConfig.jobTitle,
    email: `mailto:${personConfig.email}`,
    image: {
      "@type": "ImageObject",
      "@id": `${siteConfig.url}/#personimage`,
      url: absoluteUrl(personConfig.image),
      caption: personConfig.imageAlt,
    },
    knowsAbout: [...personConfig.knowsAbout],
    sameAs: [...personConfig.sameAs],
    subjectOf: { "@id": schemaIds.website },
  };
}

/** Minimal reference to the Person node, for authorship fields. */
export function personRef(): JsonLdNode {
  return { "@id": schemaIds.person };
}

export const primaryProfileUrl = verifiedProfiles.mainSite;
