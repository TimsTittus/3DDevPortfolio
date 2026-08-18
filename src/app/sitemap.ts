import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/config/site";
import { PROJECT_META, projectPath } from "@/data/projects-meta";
import { getBlogPosts, toISODate } from "@/lib/mdx";

/**
 * Only canonical, indexable, publicly useful URLs belong here.
 * API routes, the OG image endpoint and 404 are deliberately excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/blogs", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/resume", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
    {
      path: "/author/tims-tittus",
      priority: 0.5,
      changeFrequency: "monthly" as const,
    },
  ].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECT_META.map((project) => ({
    url: absoluteUrl(projectPath(project)),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const posts = getBlogPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blogs/${post.slug}`),
    lastModified: new Date(
      toISODate(post.metadata.updatedAt) ??
        toISODate(post.metadata.publishedAt) ??
        now.toISOString()
    ),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
