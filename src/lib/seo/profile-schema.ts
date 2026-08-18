import { personConfig } from "@/config/person";
import { absoluteUrl, schemaIds, siteConfig } from "@/config/site";

import type { JsonLdNode } from "./jsonld";

/**
 * ProfilePage for /about — marks that page as the canonical description of the
 * Person entity (mainEntity points back at the shared Person @id).
 */
export function profilePageSchema({
  path = "/about",
  name,
  description,
  dateModified,
}: {
  path?: string;
  name: string;
  description: string;
  dateModified?: string;
}): JsonLdNode {
  return {
    "@type": "ProfilePage",
    "@id": path === "/about" ? schemaIds.profilePage : schemaIds.page(path),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: siteConfig.lang,
    isPartOf: { "@id": schemaIds.website },
    mainEntity: { "@id": schemaIds.person },
    about: { "@id": schemaIds.person },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(personConfig.image),
      caption: personConfig.imageAlt,
    },
    breadcrumb: { "@id": schemaIds.breadcrumb(path) },
    ...(dateModified ? { dateModified } : {}),
  };
}
