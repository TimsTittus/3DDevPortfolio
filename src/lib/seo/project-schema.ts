import { absoluteUrl, schemaIds, siteConfig } from "@/config/site";

import type { JsonLdNode } from "./jsonld";

export type ProjectSchemaInput = {
  path: string;
  name: string;
  description: string;
  /**
   * Only use "SoftwareApplication" for projects that really are applications a
   * user can run. Everything else stays a CreativeWork.
   */
  schemaType: "SoftwareApplication" | "WebApplication" | "CreativeWork";
  applicationCategory?: string;
  url?: string;
  codeRepository?: string;
  image?: string;
  technologies?: string[];
};

export function projectSchema({
  path,
  name,
  description,
  schemaType,
  applicationCategory,
  url,
  codeRepository,
  image,
  technologies,
}: ProjectSchemaInput): JsonLdNode {
  const isApp = schemaType !== "CreativeWork";
  return {
    "@type": schemaType,
    "@id": schemaIds.project(path),
    name,
    description,
    url: url ?? absoluteUrl(path),
    inLanguage: siteConfig.lang,
    author: { "@id": schemaIds.person },
    creator: { "@id": schemaIds.person },
    mainEntityOfPage: { "@id": schemaIds.page(path) },
    ...(image ? { image: absoluteUrl(image) } : {}),
    ...(codeRepository ? { codeRepository } : {}),
    ...(technologies?.length
      ? isApp
        ? { softwareRequirements: technologies.join(", ") }
        : { keywords: technologies.join(", ") }
      : {}),
    ...(isApp
      ? {
          applicationCategory: applicationCategory ?? "DeveloperApplication",
          operatingSystem: "Web browser",
        }
      : {}),
  };
}

/** ItemList node for the /projects index, so the set is machine-readable. */
export function projectListSchema(
  path: string,
  items: { name: string; path: string }[]
): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#projectlist`,
    name: "Projects by Tims Tittus",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
