import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Breadcrumbs from "@/components/seo/breadcrumbs";
import { authorSlug, personConfig } from "@/config/person";
import { siteConfig } from "@/config/site";
import { socialConfig } from "@/config/social";
import { getBlogPosts, toISODate } from "@/lib/mdx";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd, graph } from "@/lib/seo/jsonld";
import { breadcrumbSchema, type Crumb } from "@/lib/seo/breadcrumb-schema";
import { profilePageSchema } from "@/lib/seo/profile-schema";

const PATH = `/author/${authorSlug}`;
const TITLE = "Tims Tittus — Author profile";
const DESCRIPTION =
  "Articles written by Tims Tittus, developer working across AI engineering, cybersecurity and full-stack web development.";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Articles", path: "/blogs" },
  { name: personConfig.name, path: PATH },
];

export const metadata: Metadata = generatePageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "profile",
  og: {
    heading: personConfig.name,
    eyebrow: "Author",
    subtitle: personConfig.headline,
  },
  keywords: ["Tims Tittus author", "articles by Tims Tittus"],
});

export default function AuthorPage() {
  const posts = getBlogPosts();

  return (
    <main id="main-content" className="container mx-auto max-w-3xl px-4 pt-28 pb-24">
      <Breadcrumbs items={crumbs} />

      <header className="mb-10 flex flex-col sm:flex-row items-start gap-6">
        <Image
          src={personConfig.image}
          alt={personConfig.imageAlt}
          width={96}
          height={96}
          className="rounded-full bg-zinc-800 object-cover"
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {personConfig.name}
          </h1>
          <p className="mt-2 text-muted-foreground">{personConfig.bio.long}</p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <li>
              <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
                Full profile
              </Link>
            </li>
            <li>
              <a
                href={socialConfig.github}
                target="_blank"
                rel="noopener noreferrer me"
                className="underline underline-offset-4 hover:text-foreground"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={socialConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer me"
                className="underline underline-offset-4 hover:text-foreground"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={siteConfig.mainSiteUrl}
                target="_blank"
                rel="noopener noreferrer me"
                className="underline underline-offset-4 hover:text-foreground"
              >
                timstittus.com
              </a>
            </li>
          </ul>
        </div>
      </header>

      <section aria-labelledby="articles">
        <h2 id="articles" className="text-2xl font-semibold text-foreground mb-6">
          Articles by {personConfig.name}
        </h2>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No articles published yet.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <h3 className="text-lg font-medium">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    {post.metadata.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">
                  <time dateTime={toISODate(post.metadata.publishedAt)}>
                    {post.metadata.publishedAt}
                  </time>
                </p>
                <p className="text-muted-foreground">{post.metadata.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <JsonLd
        id="schema-author"
        data={graph([
          profilePageSchema({
            path: PATH,
            name: TITLE,
            description: DESCRIPTION,
          }),
          breadcrumbSchema(PATH, crumbs),
        ])}
      />
    </main>
  );
}