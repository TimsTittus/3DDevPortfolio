import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import Breadcrumbs from "@/components/seo/breadcrumbs";
import { FloatingDock } from "@/components/ui/floating-dock";
import projects, { getProjectBySlug, projectPath } from "@/data/projects";
import { absoluteUrl } from "@/config/site";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd, graph } from "@/lib/seo/jsonld";
import { breadcrumbSchema, type Crumb } from "@/lib/seo/breadcrumb-schema";
import { webPageSchema } from "@/lib/seo/website-schema";
import { projectSchema } from "@/lib/seo/project-schema";

type Params = { params: { slug: string } };

/** Every project is known at build time, so all detail pages are static. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found" };

  const path = projectPath(project);
  const title = `${project.title} — ${project.category} project by Tims Tittus`;

  return generatePageMetadata({
    title,
    description: project.description,
    path,
    og: {
      heading: project.title,
      eyebrow: `${project.category} project`,
      subtitle: project.description,
    },
    keywords: [
      project.title,
      `${project.title} Tims Tittus`,
      ...project.technologies,
    ],
  });
}

export default function ProjectPage({ params }: Params) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const path = projectPath(project);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path },
  ];
  const related = projects.filter((item) => item.slug !== project.slug);
  const allSkills = [...project.skills.frontend, ...project.skills.backend];

  return (
    <main
      id="main-content"
      className="container mx-auto max-w-4xl px-4 pt-28 pb-24 text-zinc-300"
    >
      <Breadcrumbs items={crumbs} />

      <article>
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            {project.category}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-zinc-600 px-4 py-2 text-sm hover:border-zinc-400 transition-colors"
            >
              Visit {project.title}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-600 px-4 py-2 text-sm hover:border-zinc-400 transition-colors"
              >
                {project.title} source on GitHub
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </header>

        <div className="relative mb-12 aspect-[3/2] w-full overflow-hidden rounded-xl border-[.5px] border-zinc-700 bg-zinc-900">
          <Image
            src={`${project.src}${project.screenshots[0]}`}
            alt={project.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <section aria-labelledby="tech-stack" className="mb-12">
          <h2 id="tech-stack" className="text-2xl font-semibold text-foreground">
            Technology stack
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300"
              >
                {tech}
              </li>
            ))}
          </ul>
          {allSkills.length > 0 && (
            <div className="mt-6 hidden md:flex">
              <FloatingDock items={allSkills} />
            </div>
          )}
        </section>

        <section aria-labelledby="overview">
          <h2 id="overview" className="text-2xl font-semibold text-foreground mb-4">
            Overview
          </h2>
          {project.content}
        </section>
      </article>

      {related.length > 0 && (
        <aside aria-labelledby="related" className="mt-16 border-t border-zinc-800 pt-10">
          <h2 id="related" className="text-xl font-semibold text-foreground">
            Related projects
          </h2>
          <ul className="mt-4 space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={projectPath(item)}
                  className="underline underline-offset-4 text-zinc-300 hover:text-white"
                >
                  Read the {item.title} case study
                </Link>
                <p className="text-sm text-zinc-500">{item.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-zinc-500">
            More context on how these are built:{" "}
            <Link href="/about" className="underline underline-offset-4 hover:text-zinc-300">
              about Tims Tittus
            </Link>{" "}
            ·{" "}
            <Link href="/blogs" className="underline underline-offset-4 hover:text-zinc-300">
              technical articles
            </Link>{" "}
            ·{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-zinc-300">
              start a conversation
            </Link>
          </p>
        </aside>
      )}

      <JsonLd
        id={`schema-project-${project.slug}`}
        data={graph([
          webPageSchema({
            path,
            name: `${project.title} — project by Tims Tittus`,
            description: project.description,
            primaryImage: absoluteUrl(`${project.src}${project.screenshots[0]}`),
            hasBreadcrumb: true,
          }),
          breadcrumbSchema(path, crumbs),
          projectSchema({
            path,
            name: project.title,
            description: project.description,
            schemaType: project.schemaType,
            url: project.live,
            codeRepository: project.github,
            image: `${project.src}${project.screenshots[0]}`,
            technologies: project.technologies,
          }),
        ])}
      />
    </main>
  );
}