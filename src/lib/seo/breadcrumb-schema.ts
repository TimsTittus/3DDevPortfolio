import { absoluteUrl, schemaIds } from "@/config/site";

import type { JsonLdNode } from "./jsonld";

export type Crumb = { name: string; path: string };

/**
 * BreadcrumbList for a page. `items` must use the same canonical paths the
 * visible breadcrumb links to, so the two never disagree.
 */
export function breadcrumbSchema(pagePath: string, items: Crumb[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": schemaIds.breadcrumb(pagePath),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
