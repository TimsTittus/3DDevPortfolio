import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

import {
  getBlogPost,
  getBlogPosts,
  getRelatedPosts,
  readingTime,
  toISODate,
  wordCount,
} from "@/lib/mdx";
import ScrollProgress from "@/components/ui/scroll-progress";
import { Badge } from "@/components/ui/badge";
import RevealAnimation from "@/components/reveal-animations";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import { authorSlug, personConfig } from "@/config/person";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd, graph } from "@/lib/seo/jsonld";
import { breadcrumbSchema, type Crumb } from "@/lib/seo/breadcrumb-schema";
import { webPageSchema } from "@/lib/seo/website-schema";
import { articleSchema } from "@/lib/seo/article-schema";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return { title: "Article not found" };

  const path = `/blogs/${post.slug}`;
  const published = toISODate(post.metadata.publishedAt);
  const modified = toISODate(post.metadata.updatedAt) ?? published;

  return generatePageMetadata({
    title: `${post.metadata.title} | ${personConfig.name}`,
    description: post.metadata.summary,
    path,
    type: "article",
    publishedTime: published,
    modifiedTime: modified,
    tags: post.metadata.tags,
    keywords: post.metadata.tags,
    ...(post.metadata.image
      ? {
          image: {
            url: post.metadata.image,
            alt: post.metadata.imageAlt ?? post.metadata.title,
          },
        }
      : {
          og: {
            heading: post.metadata.title,
            eyebrow: "Article",
            subtitle: post.metadata.summary,
          },
        }),
  });
}

/**
 * MDX headings start at h2 — the article's h1 is rendered by the page itself,
 * so the document keeps a single top-level heading.
 */
const components = {
  h1: (props: any) => (
    <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-4 text-zinc-200" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-4 text-zinc-200" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-zinc-300" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-lg md:text-xl font-semibold mt-6 mb-3 text-zinc-300" {...props} />
  ),
  p: (props: any) => (
    <p className="text-zinc-400 leading-relaxed mb-6 text-lg" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside mb-6 text-zinc-400 space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-6 text-zinc-400 space-y-2" {...props} />
  ),
  li: (props: any) => <li className="ml-4" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-purple-500 pl-4 italic text-zinc-400 my-6 bg-zinc-900/50 py-2 pr-4 rounded-r"
      {...props}
    />
  ),
  code: (props: any) => (
    <code className="bg-zinc-900 text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-zinc-950 p-4 rounded-lg overflow-x-auto mb-6 border border-zinc-800" {...props} />
  ),
  a: (props: any) => (
    <a className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors" {...props} />
  ),
  img: (props: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-lg my-6 w-full h-auto" loading="lazy" alt={props.alt ?? ""} {...props} />
  ),
};

export default function BlogPost({ params }: Params) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const path = `/blogs/${post.slug}`;
  const published = toISODate(post.metadata.publishedAt);
  const modified = toISODate(post.metadata.updatedAt) ?? published;
  const related = getRelatedPosts(post);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/blogs" },
    { name: post.metadata.title, path },
  ];

  return (
    <div className="min-h-screen relative font-sans">
      <ScrollProgress className="bg-gradient-to-r from-purple-500 to-pink-500" />

      <main id="main-content" className="container mx-auto px-4 pt-28 pb-24 max-w-3xl">
        <Breadcrumbs items={crumbs} />

        <RevealAnimation>
          <Link
            href="/blogs"
            className="inline-flex items-center text-zinc-500 hover:text-purple-400 transition-colors mb-8 group"
          >
            <ArrowLeft
              className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
            />
            Back to all articles
          </Link>
        </RevealAnimation>

        <article>
          <RevealAnimation delay={0.1}>
            <header className="mb-8">
              <div className="flex gap-2 mb-4 flex-wrap">
                {post.metadata.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-purple-500/30 text-purple-400"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                {post.metadata.title}
              </h1>
              <p className="text-lg text-zinc-400 mb-6">{post.metadata.summary}</p>
              <div className="flex flex-wrap items-center gap-6 text-zinc-500 text-sm border-b border-zinc-800 pb-8">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" aria-hidden="true" />
                  <Link
                    href={`/author/${authorSlug}`}
                    rel="author"
                    className="hover:text-zinc-300 underline underline-offset-4"
                  >
                    {post.metadata.author ?? personConfig.name}
                  </Link>
                </span>
                <span className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" aria-hidden="true" />
                  <time dateTime={published}>{post.metadata.publishedAt}</time>
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  {readingTime(post.content)} min read
                </span>
              </div>
            </header>
          </RevealAnimation>

          <RevealAnimation delay={0.2}>
            <div className="prose prose-invert max-w-none">
              <MDXRemote source={post.content} components={components} />
            </div>
          </RevealAnimation>
        </article>

        {related.length > 0 && (
          <aside aria-labelledby="related" className="mt-16 border-t border-zinc-800 pt-10">
            <h2 id="related" className="text-xl font-semibold text-zinc-200 mb-4">
              Related articles
            </h2>
            <ul className="space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blogs/${item.slug}`}
                    className="text-zinc-300 underline underline-offset-4 hover:text-purple-400"
                  >
                    {item.metadata.title}
                  </Link>
                  <p className="text-sm text-zinc-500">{item.metadata.summary}</p>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <p className="mt-12 text-sm text-zinc-500">
          Written by{" "}
          <Link
            href={`/author/${authorSlug}`}
            className="underline underline-offset-4 hover:text-zinc-300"
          >
            {personConfig.name}
          </Link>
          . See the{" "}
          <Link href="/projects" className="underline underline-offset-4 hover:text-zinc-300">
            projects behind these write-ups
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-zinc-300">
            get in touch
          </Link>
          .
        </p>

        <JsonLd
          id={`schema-article-${post.slug}`}
          data={graph([
            webPageSchema({
              path,
              name: post.metadata.title,
              description: post.metadata.summary,
              datePublished: published,
              dateModified: modified,
              hasBreadcrumb: true,
            }),
            breadcrumbSchema(path, crumbs),
            articleSchema({
              path,
              headline: post.metadata.title,
              description: post.metadata.summary,
              datePublished: published ?? new Date().toISOString(),
              dateModified: modified,
              image: post.metadata.image,
              keywords: post.metadata.tags,
              wordCount: wordCount(post.content),
            }),
          ])}
        />
      </main>
    </div>
  );
}
