import { schemaIds, siteConfig } from "@/config/site";

import type { JsonLdNode } from "./jsonld";

/** The WebSite node — one per site, referenced by every WebPage. */
export function websiteSchema(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": schemaIds.website,
    url: `${siteConfig.url}/`,
    name: siteConfig.siteName,
    alternateName: siteConfig.name,
    description: siteConfig.description.long,
    inLanguage: siteConfig.lang,
    publisher: { "@id": schemaIds.person },
    copyrightHolder: { "@id": schemaIds.person },
  };
}

export type WebPageInput = {
  path: string;
  name: string;
  description: string;
  /** schema.org subtype, e.g. "CollectionPage" or "ContactPage". */
  type?: string;
  primaryImage?: string;
  datePublished?: string;
  dateModified?: string;
  /** Set when the page also emits a BreadcrumbList node. */
  hasBreadcrumb?: boolean;
};

export function webPageSchema({
  path,
  name,
  description,
  type = "WebPage",
  primaryImage,
  datePublished,
  dateModified,
  hasBreadcrumb,
}: WebPageInput): JsonLdNode {
  const url = path === "/" ? `${siteConfig.url}/` : `${siteConfig.url}${path}`;
  return {
    "@type": type,
    "@id": schemaIds.page(path),
    url,
    name,
    description,
    inLanguage: siteConfig.lang,
    isPartOf: { "@id": schemaIds.website },
    about: { "@id": schemaIds.person },
    ...(primaryImage
      ? { primaryImageOfPage: { "@type": "ImageObject", url: primaryImage } }
      : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(hasBreadcrumb ? { breadcrumb: { "@id": schemaIds.breadcrumb(path) } } : {}),
  };
}
