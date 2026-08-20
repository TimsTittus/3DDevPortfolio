import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";

import {
  BLOG_REVALIDATE_SECONDS,
  formatPostDate,
  getRemoteBlogPosts,
} from "@/lib/blog-feed";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RevealAnimation from "@/components/reveal-animations";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import { authorUrl, personConfig } from "@/config/person";
import { absoluteUrl, siteConfig } from "@/config/site";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd, graph } from "@/lib/seo/jsonld";
import { breadcrumbSchema, type Crumb } from "@/lib/seo/breadcrumb-schema";
import { webPageSchema } from "@/lib/seo/website-schema";
import { schemaIds } from "@/config/site";

/** Statically rendered, refreshed hourly so new articles appear on their own. */
export const revalidate = BLOG_REVALIDATE_SECONDS;

const PATH = "/blogs";
const TITLE = "Articles — AI, Cybersecurity & Software Engineering | Tims Tittus";
const DESCRIPTION =
  "Technical write-ups by Tims Tittus on AI engineering, cybersecurity and building software with TypeScript, React, Next.js and Python.";

/** Source tags mix slug-case and Title Case — even them out for the badge. */
function tagLabel(tag: string): string {
  return tag.replace(/[-_]+/g, " ").trim();
}

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Articles", path: PATH },
];

export const metadata: Metadata = generatePageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  og: { heading: "Articles", eyebrow: "Space Log", subtitle: DESCRIPTION },
  keywords: [
    "Tims Tittus blog",
    "AI engineering articles",
    "cybersecurity write-ups",
    "Next.js articles",
  ],
});

export default async function BlogPage() {
  const posts = await getRemoteBlogPosts();

  return (
    <main
      id="main-content"
      className="container mx-auto px-4 pt-28 pb-24 min-h-screen font-sans"
    >
      <Breadcrumbs items={crumbs} />

      <RevealAnimation>
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-600">
          Space Log
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
          Notes and write-ups on what I build — AI tooling, security-minded
          engineering and the web stack behind the{" "}
          <Link
            href="/projects"
            className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            projects
          </Link>
          . Every article is published on{" "}
          <a
            href={`${siteConfig.mainSiteUrl}/blog`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            timstittus.com
          </a>
          .
        </p>
      </RevealAnimation>

      {posts.length === 0 ? (
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          Articles could not be loaded right now — read them on{" "}
          <a
            href={`${siteConfig.mainSiteUrl}/blog`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-300"
          >
            timstittus.com/blog
          </a>
          .
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <RevealAnimation delay={index * 0.1}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full group"
                  aria-label={`${post.title} — read on timstittus.com (opens in a new tab)`}
                >
                  <Card className="h-full flex flex-col bg-white/70 dark:bg-black/40 border-zinc-200 dark:border-zinc-800 backdrop-blur-sm hover:border-purple-500/50 transition-colors overflow-hidden shadow-sm hover:shadow-md">
                    {post.image && (
                      <div className="relative aspect-[1200/630] overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
                        <Image
                          src={post.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <Badge
                          variant="outline"
                          className="border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10 capitalize"
                        >
                          {post.tags[0] ? tagLabel(post.tags[0]) : "Article"}
                        </Badge>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 shrink-0">
                          <CalendarDays
                            className="w-3 h-3"
                            aria-hidden="true"
                          />
                          <time dateTime={post.publishedAt}>
                            {formatPostDate(post.publishedAt)}
                          </time>
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {post.title}
                      </h2>
                      <CardDescription className="line-clamp-3 text-zinc-600 dark:text-zinc-400">
                        {post.summary}
                      </CardDescription>
                    </CardHeader>
                    <CardContent />
                    <CardFooter className="mt-auto flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                        <Clock className="w-4 h-4" aria-hidden="true" />
                        {post.readTime ??
                          post.author ??
                          personConfig.name}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        Read
                        <ArrowUpRight
                          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </CardFooter>
                  </Card>
                </a>
              </RevealAnimation>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-16 text-center text-sm text-zinc-500 dark:text-zinc-400">
        All articles are written by{" "}
        <Link
          href="/author/tims-tittus"
          className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-300"
        >
          Tims Tittus
        </Link>
        .
      </p>

      <JsonLd
        id="schema-blogs"
        data={graph([
          webPageSchema({
            path: PATH,
            name: TITLE,
            description: DESCRIPTION,
            type: "CollectionPage",
            hasBreadcrumb: true,
          }),
          breadcrumbSchema(PATH, crumbs),
          {
            "@type": "Blog",
            "@id": `${absoluteUrl(PATH)}#blog`,
            name: "Space Log",
            description: DESCRIPTION,
            // The articles themselves are hosted on the main site.
            url: `${siteConfig.mainSiteUrl}/blog`,
            author: { "@id": schemaIds.person, url: authorUrl },
            publisher: { "@id": schemaIds.person },
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              "@id": `${post.url}#article`,
              headline: post.title,
              description: post.summary,
              url: post.url,
              mainEntityOfPage: post.url,
              datePublished: post.publishedAt,
              ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
              ...(post.image ? { image: post.image } : {}),
              ...(post.tags.length ? { keywords: post.tags.join(", ") } : {}),
              author: { "@id": schemaIds.person },
            })),
          },
        ])}
      />
    </main>
  );
}