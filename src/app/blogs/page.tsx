import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";

import { getBlogPosts, readingTime, toISODate } from "@/lib/mdx";
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
import { absoluteUrl } from "@/config/site";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd, graph } from "@/lib/seo/jsonld";
import { breadcrumbSchema, type Crumb } from "@/lib/seo/breadcrumb-schema";
import { webPageSchema } from "@/lib/seo/website-schema";
import { schemaIds } from "@/config/site";

const PATH = "/blogs";
const TITLE = "Articles — AI, Cybersecurity & Software Engineering | Tims Tittus";
const DESCRIPTION =
  "Technical write-ups by Tims Tittus on AI engineering, cybersecurity and building software with TypeScript, React, Next.js and Python.";

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

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main
      id="main-content"
      className="container mx-auto px-4 pt-28 pb-24 min-h-screen font-sans"
    >
      <Breadcrumbs items={crumbs} />

      <RevealAnimation>
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Space Log
        </h1>
        <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
          Notes and write-ups on what I build — AI tooling, security-minded
          engineering and the web stack behind the{" "}
          <Link href="/projects" className="underline underline-offset-4 hover:text-zinc-200">
            projects
          </Link>
          .
        </p>
      </RevealAnimation>

      {posts.length === 0 ? (
        <p className="text-center text-zinc-500">
          No articles published yet — check back soon.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <RevealAnimation delay={index * 0.1}>
                <Link href={`/blogs/${post.slug}`}>
                  <Card className="h-full bg-black/40 border-zinc-800 backdrop-blur-sm hover:border-purple-500/50 transition-colors group overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge
                          variant="outline"
                          className="border-purple-500/30 text-purple-400"
                        >
                          {post.metadata.tags?.[0] || "Article"}
                        </Badge>
                        <span className="text-xs text-zinc-500 flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" aria-hidden="true" />
                          <time dateTime={toISODate(post.metadata.publishedAt)}>
                            {post.metadata.publishedAt}
                          </time>
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold leading-none tracking-tight group-hover:text-purple-400 transition-colors">
                        {post.metadata.title}
                      </h2>
                      <CardDescription className="line-clamp-2">
                        {post.metadata.summary}
                      </CardDescription>
                    </CardHeader>
                    <CardContent />
                    <CardFooter className="mt-auto">
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Clock className="w-4 h-4" aria-hidden="true" />
                        {readingTime(post.content)} min read ·{" "}
                        {post.metadata.author ?? personConfig.name}
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </RevealAnimation>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-16 text-center text-sm text-zinc-500">
        All articles are written by{" "}
        <Link
          href="/author/tims-tittus"
          className="underline underline-offset-4 hover:text-zinc-300"
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
            url: absoluteUrl(PATH),
            author: { "@id": schemaIds.person, url: authorUrl },
            publisher: { "@id": schemaIds.person },
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              "@id": schemaIds.article(`/blogs/${post.slug}`),
              headline: post.metadata.title,
              url: absoluteUrl(`/blogs/${post.slug}`),
              datePublished: toISODate(post.metadata.publishedAt),
              author: { "@id": schemaIds.person },
            })),
          },
        ])}
      />
    </main>
  );
}
