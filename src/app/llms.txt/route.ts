import { authorUrl, personConfig } from "@/config/person";
import { absoluteUrl, siteConfig } from "@/config/site";
import { PROJECT_META, projectPath } from "@/data/projects-meta";
import { BLOG_REVALIDATE_SECONDS, getRemoteBlogPosts } from "@/lib/blog-feed";

export const revalidate = BLOG_REVALIDATE_SECONDS;

/**
 * Optional machine-readable overview for LLM-based discovery tools.
 * Not a search-ranking mechanism — purely a convenience layer that mirrors
 * facts already published on the site.
 */
export async function GET() {
  const posts = await getRemoteBlogPosts();

  const body = `# ${personConfig.name}

> ${personConfig.bio.long}

## Sites
- Developer site (this site): ${siteConfig.url}
- Personal site: ${siteConfig.mainSiteUrl}

## Profiles
${personConfig.sameAs.map((url) => `- ${url}`).join("\n")}

## Expertise
${personConfig.knowsAbout.map((topic) => `- ${topic}`).join("\n")}

## Key pages
- [About](${absoluteUrl("/about")}): background, focus areas and how to get in touch.
- [Projects](${absoluteUrl("/projects")}): project case studies with stack and source links.
- [Articles](${absoluteUrl("/blogs")}): technical write-ups, published on ${siteConfig.mainSiteUrl}/blog.
- [Resume](${absoluteUrl("/resume")}): experience and technical skills in HTML.
- [Contact](${absoluteUrl("/contact")}): contact form and direct channels.

## Projects
${PROJECT_META
      .map(
        (project) =>
          `- [${project.title}](${absoluteUrl(projectPath(project))}): ${project.description
          } Stack: ${project.technologies.join(", ")}.`
      )
      .join("\n")}

## Articles
${posts.length
      ? posts
        .map(
          (post) =>
            `- [${post.title}](${post.url}): ${post.summary} (${post.publishedAt.slice(0, 10)})`
        )
        .join("\n")
      : "- No articles published yet."
    }

## Author
- ${personConfig.name} — ${authorUrl}
- Contact: ${personConfig.email}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}