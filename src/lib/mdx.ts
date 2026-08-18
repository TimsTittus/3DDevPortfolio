import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogMetadata = {
  title: string;
  publishedAt: string;
  /** ISO date of the last meaningful edit. Falls back to publishedAt. */
  updatedAt?: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  author?: string;
  tags?: string[];
};

export type BlogPost = {
  metadata: BlogMetadata;
  slug: string;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blogs");

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return matter(rawContent);
}

function getMDXData(dir: string): BlogPost[] {
  return getMDXFiles(dir).map((file) => {
    const { data, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata: data as BlogMetadata,
      slug,
      content,
    };
  });
}

/** All posts, newest first. */
export function getBlogPosts(): BlogPost[] {
  return getMDXData(BLOG_DIR).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );
}

/** A single post, or `null` when the slug does not exist (so pages can 404). */
export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { data, content } = readMDXFile(filePath);
  return { metadata: data as BlogMetadata, slug, content };
}

/** Posts sharing at least one tag with `post`, excluding the post itself. */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const tags = new Set(post.metadata.tags ?? []);
  const scored = getBlogPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      shared: (candidate.metadata.tags ?? []).filter((tag) => tags.has(tag))
        .length,
    }))
    .sort((a, b) => b.shared - a.shared);

  return scored.slice(0, limit).map((entry) => entry.post);
}

/** Rough reading time in minutes, used for the article byline. */
export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function wordCount(content: string): number {
  return content.trim().split(/\s+/).length;
}

/** Normalises frontmatter dates to ISO-8601 for schema.org and OG tags. */
export function toISODate(value?: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}
