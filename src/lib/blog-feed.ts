import { siteConfig } from "@/config/site";

/**
 * Articles live on the main site (timstittus.com) — this site only mirrors the
 * listing and links out. Nothing here renders article bodies, so there is one
 * canonical URL per article and no duplicate content between the two domains.
 *
 * Two sources are used, in order of how stable they are:
 *
 *  1. `/sitemap.xml` for the set of published slugs, and each article page's
 *     `BlogPosting` JSON-LD for its title, summary, date and hero image. Both
 *     are public, standardised contracts that survive redesigns of the site.
 *  2. The `/blog` listing payload, for tags and reading time only. Those two
 *     fields are not exposed in any standard format, so they are scraped on a
 *     best-effort basis and simply omitted if the markup ever changes.
 */

const BLOG_PATH = "/blog";

/** Background refresh interval. New articles surface within the hour. */
export const BLOG_REVALIDATE_SECONDS = 3600;

export type RemoteBlogPost = {
  slug: string;
  title: string;
  summary: string;
  /** Canonical URL of the article on the main site. */
  url: string;
  /** ISO-8601, or the raw value when it cannot be parsed. */
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  author?: string;
  tags: string[];
  /** Human-readable, e.g. "24 min read". Absent when it cannot be read. */
  readTime?: string;
};

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'",
  "&nbsp;": " ",
};

/**
 * All matches of a global regex. Written as an explicit loop because the
 * project compiles to ES5, where iterating a matchAll result is not available.
 */
function execAll(pattern: RegExp, text: string): RegExpExecArray[] {
  const matches: RegExpExecArray[] = [];
  const regex = new RegExp(pattern.source, pattern.flags);
  let match = regex.exec(text);
  while (match !== null) {
    matches.push(match);
    if (match.index === regex.lastIndex) regex.lastIndex += 1;
    match = regex.exec(text);
  }
  return matches;
}

/** Decodes the handful of entities and \uXXXX escapes that show up in markup. */
function decode(value: string): string {
  return value
    .replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x27;|&nbsp;/g, (m) => ENTITIES[m])
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
}

/** ISO-8601 where possible, so `<time dateTime>` and JSON-LD stay valid. */
function toISO(value?: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString();
}

/**
 * Fetches a page from the main site. Returns `null` rather than throwing: a
 * blip on the main site must never fail this site's build or render.
 */
async function fetchText(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      // Plain ASCII: HTTP header values must be Latin-1 encodable.
      headers: { "user-agent": "timstittus-developer-portfolio (blog mirror)" },
      next: { revalidate: BLOG_REVALIDATE_SECONDS },
    });
    if (!response.ok) {
      console.warn(`[blog-feed] ${response.status} from ${url}`);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.warn(`[blog-feed] request failed for ${url}:`, error);
    return null;
  }
}

/** Article slugs plus their sitemap `lastmod`, newest entries kept as found. */
async function fetchSlugs(): Promise<Map<string, string | undefined>> {
  const xml = await fetchText(`${siteConfig.mainSiteUrl}/sitemap.xml`);
  const slugs = new Map<string, string | undefined>();
  if (!xml) return slugs;

  const entries = execAll(
    /<url>\s*<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]*)<\/lastmod>)?/g,
    xml
  );
  const slugPattern = new RegExp(
    `${BLOG_PATH}/([^/?#]+)/?$`.replace(/\//g, "\\/")
  );

  entries.forEach((entry) => {
    const match = entry[1].match(slugPattern);
    if (match) slugs.set(decode(match[1]), entry[2] || undefined);
  });

  return slugs;
}

type JsonLdNode = Record<string, any>;

/** Every JSON-LD node on a page, flattened out of any `@graph` wrappers. */
function jsonLdNodes(html: string): JsonLdNode[] {
  const nodes: JsonLdNode[] = [];
  const blocks = execAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    html
  );

  blocks.forEach((block) => {
    try {
      const parsed = JSON.parse(block[1]);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      items.forEach((item: JsonLdNode) => {
        if (Array.isArray(item?.["@graph"])) nodes.push(...item["@graph"]);
        else nodes.push(item);
      });
    } catch {
      // A malformed block is not worth failing the whole feed over.
    }
  });

  return nodes;
}

function metaContent(html: string, key: string): string | undefined {
  const pattern = new RegExp(
    `<meta[^>]*(?:property|name)="${key}"[^>]*content="([^"]*)"`,
    "i"
  );
  const match = html.match(pattern);
  return match ? decode(match[1]) : undefined;
}

/**
 * Confirms a hero image actually exists before it reaches a card.
 *
 * The main site currently advertises `og:image` URLs for some articles whose
 * files are missing, which would render as broken images here. Only an explicit
 * 404/410 drops the image — anything else keeps it, so a transient blip or a
 * server that dislikes HEAD does not strip artwork from every card.
 */
async function imageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      next: { revalidate: BLOG_REVALIDATE_SECONDS },
    });
    return response.status !== 404 && response.status !== 410;
  } catch {
    return false;
  }
}

/** Reads one article page into a post, or `null` if it yields no title. */
async function fetchPost(
  slug: string,
  lastmod: string | undefined
): Promise<RemoteBlogPost | null> {
  const url = `${siteConfig.mainSiteUrl}${BLOG_PATH}/${slug}`;
  const html = await fetchText(url);
  if (!html) return null;

  const posting = jsonLdNodes(html).find(
    (node) => node["@type"] === "BlogPosting" || node["@type"] === "Article"
  );

  const title =
    (posting?.headline && decode(String(posting.headline))) ??
    metaContent(html, "og:title") ??
    metaContent(html, "title");

  // Without a title there is nothing worth putting on a card.
  if (!title) return null;

  const summary =
    (posting?.description && decode(String(posting.description))) ??
    metaContent(html, "og:description") ??
    metaContent(html, "description") ??
    "";

  const advertisedImage =
    (typeof posting?.image === "string"
      ? posting.image
      : posting?.image?.url) ?? metaContent(html, "og:image");

  const image =
    advertisedImage && (await imageExists(advertisedImage))
      ? advertisedImage
      : undefined;

  const published =
    toISO(posting?.datePublished) ??
    toISO(metaContent(html, "article:published_time")) ??
    toISO(lastmod) ??
    new Date().toISOString();

  const author =
    (typeof posting?.author === "string"
      ? posting.author
      : posting?.author?.name) ?? metaContent(html, "author");

  return {
    slug,
    title,
    summary,
    url,
    publishedAt: published,
    updatedAt:
      toISO(posting?.dateModified) ??
      toISO(metaContent(html, "article:modified_time")) ??
      toISO(lastmod),
    image,
    author: author ? decode(String(author)) : undefined,
    tags: [],
  };
}

/**
 * Best-effort tags and reading time, keyed by slug.
 *
 * These are read out of the listing page's streamed data, which is an internal
 * format — so every failure mode here is silent and simply yields fewer fields
 * on the cards.
 */
async function fetchEnrichment(): Promise<
  Map<string, { tags: string[]; readTime?: string }>
> {
  const enrichment = new Map<string, { tags: string[]; readTime?: string }>();
  const html = await fetchText(`${siteConfig.mainSiteUrl}${BLOG_PATH}`);
  if (!html) return enrichment;

  // The payload is embedded as escaped JSON inside JS string literals.
  const text = html.replace(/\\"/g, '"');

  const markers = execAll(/"slug":"([^"]+)"/g, text);

  markers.forEach((marker, index) => {
    const slug = marker[1];
    const start = marker.index ?? 0;
    const end = markers[index + 1]?.index ?? start + 20000;
    const chunk = text.slice(start, end);

    const readTime = chunk.match(/"readTime":"([^"]*)"/)?.[1];
    const tagBlock = chunk.match(/"tags":\[([^\]]*)\]/)?.[1];
    const tags = tagBlock
      ? execAll(/"([^"]*)"/g, tagBlock).map((m) => decode(m[1]))
      : [];

    if (readTime || tags.length) {
      enrichment.set(slug, { tags, readTime: readTime || undefined });
    }
  });

  return enrichment;
}

/**
 * Every article published on the main site, newest first.
 *
 * Returns an empty array if the main site cannot be reached, so a build or a
 * render never fails on it. With ISR in play, a failed background refresh keeps
 * the last successfully rendered page in front of visitors.
 */
export async function getRemoteBlogPosts(): Promise<RemoteBlogPost[]> {
  const slugs = await fetchSlugs();
  if (slugs.size === 0) return [];

  const entries: Array<{ slug: string; lastmod?: string }> = [];
  slugs.forEach((lastmod, slug) => entries.push({ slug, lastmod }));

  const [posts, enrichment] = await Promise.all([
    Promise.all(entries.map((entry) => fetchPost(entry.slug, entry.lastmod))),
    fetchEnrichment(),
  ]);

  return posts
    .filter((post): post is RemoteBlogPost => post !== null)
    .map((post) => {
      const extra = enrichment.get(post.slug);
      return extra ? { ...post, tags: extra.tags, readTime: extra.readTime } : post;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

/** Short display date for cards and bylines, e.g. "13 Aug 2026". */
export function formatPostDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
