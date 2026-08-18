import type { Metadata } from "next";

import { personConfig } from "@/config/person";
import { defaultKeywords, seoConfig } from "@/config/seo";
import { absoluteUrl, siteConfig } from "@/config/site";

export type OgImageInput = {
  /** Path or absolute URL of a real image asset. */
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type PageMetadataInput = {
  /** Full, human-readable page title. Used verbatim — no suffix is appended. */
  title: string;
  description: string;
  /** Route path, e.g. "/projects/monkeypen-ai". Drives the canonical URL. */
  path: string;
  /** Explicit image; when omitted a dynamic OG image is generated. */
  image?: OgImageInput;
  /** Inputs for the generated OG image when `image` is not supplied. */
  og?: { heading?: string; eyebrow?: string; subtitle?: string };
  type?: "website" | "article" | "profile";
  keywords?: string[];
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
};

/** URL of the dynamically generated Open Graph image for a page. */
export function ogImageUrl(input: {
  heading?: string;
  eyebrow?: string;
  subtitle?: string;
}): string {
  const params = new URLSearchParams();
  if (input.heading) params.set("heading", input.heading);
  if (input.eyebrow) params.set("eyebrow", input.eyebrow);
  if (input.subtitle) params.set("subtitle", input.subtitle);
  const query = params.toString();
  return `/og${query ? `?${query}` : ""}`;
}

/**
 * Builds a complete, canonical-correct Metadata object for any page.
 * Every URL it emits resolves against `metadataBase` (the canonical origin),
 * so no localhost or preview host can leak into production metadata.
 */
export function generatePageMetadata({
  title,
  description,
  path,
  image,
  og,
  type = "website",
  keywords,
  noindex = false,
  publishedTime,
  modifiedTime,
  tags,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const images = image
    ? [
        {
          url: image.url,
          alt: image.alt,
          width: image.width ?? 1200,
          height: image.height ?? 630,
        },
      ]
    : [
        {
          url: ogImageUrl({
            heading: og?.heading ?? title,
            eyebrow: og?.eyebrow,
            subtitle: og?.subtitle ?? description,
          }),
          alt: `${title} — ${personConfig.name}`,
          width: seoConfig.defaultOgImage.width,
          height: seoConfig.defaultOgImage.height,
        },
      ];

  return {
    title: { absolute: title },
    description,
    keywords: keywords ?? defaultKeywords,
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      type: type === "profile" ? "profile" : type,
      images,
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors: [personConfig.name],
            tags,
          }
        : {}),
    },
    twitter: {
      card: seoConfig.twitter.card,
      title,
      description,
      images: images.map((i) => i.url),
      creator: "@timstittus",
    },
    authors: [{ name: personConfig.name, url: siteConfig.url }],
    creator: personConfig.name,
    publisher: personConfig.name,
  };
}
