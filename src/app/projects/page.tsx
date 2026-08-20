import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Breadcrumbs from "@/components/seo/breadcrumbs";
import { PROJECT_META, projectPath } from "@/data/projects-meta";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd, graph } from "@/lib/seo/jsonld";
import { breadcrumbSchema, type Crumb } from "@/lib/seo/breadcrumb-schema";
import { webPageSchema } from "@/lib/seo/website-schema";
import { projectListSchema } from "@/lib/seo/project-schema";

const PATH = "/projects";
const TITLE = "Projects — Tims Tittus | AI, Cybersecurity & Full-Stack Development";
const DESCRIPTION =
  "Project case studies by Tims Tittus: what each product does, the architecture behind it, the stack it runs on, and links to the live site and source.";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Projects", path: PATH },
];

export const metadata: Metadata = generatePageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  og: { heading: "Projects", eyebrow: "Case studies", subtitle: DESCRIPTION },
  keywords: [
    "Tims Tittus projects",
    "AI projects",
    "full-stack projects",
    "Next.js project case study",
  ],
});

export default function ProjectsPage() {
  return (
    <main
      id="main-content"
      className="container mx-auto px-4 md:px-[50px] xl:px-[150px] text-zinc-700 dark:text-zinc-300 pt-28 pb-24"
    >
      <Breadcrumbs items={crumbs} />

      <header className="mb-12 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Projects</h1>
        <p className="mt-4 text-muted-foreground">
          Things I have designed, built and shipped — AI tooling and full-stack
          web applications. Each case study covers the problem, the architecture
          and the stack. You can also read{" "}
          <Link href="/blogs" className="underline underline-offset-4 hover:text-foreground">
            technical write-ups on the blog
          </Link>{" "}
          or see the tools behind them on the{" "}
          <Link href="/resume" className="underline underline-offset-4 hover:text-foreground">
            résumé
          </Link>
          .
        </p>
      </header>

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECT_META.map((project) => (
          <li
            key={project.slug}
            className="group flex flex-col rounded-xl border-[.5px] border-zinc-300 dark:border-zinc-600 bg-white/70 dark:bg-black/40 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <Link href={projectPath(project)} className="flex h-full flex-col">
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <Image
                  src={`${project.src}${project.screenshots[0]}`}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium">
                  {project.category}
                </span>
                <h2 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-4">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 text-[11px] text-zinc-600 dark:text-zinc-400 bg-zinc-100/50 dark:bg-transparent"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 font-medium transition-colors">
                  Read the {project.title} case study
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <JsonLd
        id="schema-projects"
        data={graph([
          webPageSchema({
            path: PATH,
            name: TITLE,
            description: DESCRIPTION,
            type: "CollectionPage",
            hasBreadcrumb: true,
          }),
          breadcrumbSchema(PATH, crumbs),
          projectListSchema(
            PATH,
            PROJECT_META.map((project) => ({
              name: project.title,
              path: projectPath(project),
            }))
          ),
        ])}
      />
    </main>
  );
}