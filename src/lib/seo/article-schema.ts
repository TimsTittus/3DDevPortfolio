import { authorUrl, personConfig } from "@/config/person";
import { absoluteUrl, schemaIds, siteConfig } from "@/config/site";

import type { JsonLdNode } from "./jsonld";

export type ArticleSchemaInput = {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  keywords?: string[];
  wordCount?: number;
};

/** BlogPosting node for an article, authored by the shared Person entity. */
export function articleSchema({
  path,
  headline,
  description,
  datePublished,
  dateModified,
  image,
  keywords,
  wordCount,
}: ArticleSchemaInput): JsonLdNode {
  return {
    "@type": "BlogPosting",
    "@id": schemaIds.article(path),
    isPartOf: { "@id": schemaIds.page(path) },
    mainEntityOfPage: { "@id": schemaIds.page(path) },
    url: absoluteUrl(path),
    headline,
    description,
    inLanguage: siteConfig.lang,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@id": schemaIds.person,
      name: personConfig.name,
      url: authorUrl,
    },
    publisher: { "@id": schemaIds.person },
    ...(image ? { image: [absoluteUrl(image)] } : {}),
    ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
    ...(wordCount ? { wordCount } : {}),
  };
}
