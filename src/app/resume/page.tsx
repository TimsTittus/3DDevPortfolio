import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumbs from "@/components/seo/breadcrumbs";
import { personConfig } from "@/config/person";
import { siteConfig } from "@/config/site";
import { socialConfig } from "@/config/social";
import { EXPERIENCE, SKILLS, SkillNames } from "@/data/constants";
import { PROJECT_META, projectPath } from "@/data/projects-meta";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd, graph } from "@/lib/seo/jsonld";
import { breadcrumbSchema, type Crumb } from "@/lib/seo/breadcrumb-schema";
import { webPageSchema } from "@/lib/seo/website-schema";

const PATH = "/resume";
const TITLE = "Résumé — Tims Tittus | Developer, AI & Cybersecurity";
const DESCRIPTION =
  "The résumé of Tims Tittus in readable HTML: roles, responsibilities, projects and the languages, frameworks and infrastructure used in each.";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Résumé", path: PATH },
];

export const metadata: Metadata = generatePageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  og: { heading: "Résumé", eyebrow: "Tims Tittus", subtitle: DESCRIPTION },
  keywords: [
    "Tims Tittus resume",
    "Tims Tittus CV",
    "Tims Tittus experience",
    "Tims Tittus skills",
  ],
});

/** Grouped view over the skill list already declared in src/data/constants. */
const SKILL_GROUPS: { title: string; skills: SkillNames[] }[] = [
  {
    title: "Languages",
    skills: [SkillNames.TS, SkillNames.JS, SkillNames.HTML, SkillNames.CSS],
  },
  {
    title: "Frontend",
    skills: [
      SkillNames.REACT,
      SkillNames.NEXTJS,
      SkillNames.VUE,
      SkillNames.TAILWIND,
      SkillNames.REDUX,
    ],
  },
  {
    title: "Backend & data",
    skills: [
      SkillNames.NODEJS,
      SkillNames.EXPRESS,
      SkillNames.POSTGRES,
      SkillNames.MONGODB,
      SkillNames.PRISMA,
      SkillNames.SUPABASE,
      SkillNames.FIREBASE,
    ],
  },
  {
    title: "Infrastructure & tooling",
    skills: [
      SkillNames.LINUX,
      SkillNames.DOCKER,
      SkillNames.NGINX,
      SkillNames.AWS,
      SkillNames.GCP,
      SkillNames.VERCEL,
      SkillNames.NETLIFY,
      SkillNames.GIT,
      SkillNames.GITHUB,
      SkillNames.JEST,
      SkillNames.NPM,
      SkillNames.PRETTIER,
      SkillNames.VIM,
    ],
  },
];

export default function ResumePage() {
  return (
    <main id="main-content" className="container mx-auto max-w-3xl px-4 pt-28 pb-24">
      <Breadcrumbs items={crumbs} />

      <header className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {personConfig.name}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {personConfig.headline}
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <li>
            <a
              className="underline underline-offset-4 hover:text-foreground"
              href={`mailto:${personConfig.email}`}
            >
              {personConfig.email}
            </a>
          </li>
          <li>
            <a
              className="underline underline-offset-4 hover:text-foreground"
              href={socialConfig.github}
              target="_blank"
              rel="noopener noreferrer me"
            >
              github.com/TimsTittus
            </a>
          </li>
          <li>
            <a
              className="underline underline-offset-4 hover:text-foreground"
              href={socialConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer me"
            >
              linkedin.com/in/tims-tittus
            </a>
          </li>
          <li>
            <a
              className="underline underline-offset-4 hover:text-foreground"
              href={siteConfig.mainSiteUrl}
              target="_blank"
              rel="noopener noreferrer me"
            >
              timstittus.com
            </a>
          </li>
        </ul>
      </header>

      <section aria-labelledby="summary" className="mb-12">
        <h2 id="summary" className="text-2xl font-semibold text-foreground mb-3">
          Summary
        </h2>
        <p className="text-muted-foreground">
          Computer science and cybersecurity student and full-stack developer.
          I build web applications end to end — TypeScript and React on the
          front, Node.js, Express or Python behind them, PostgreSQL and MongoDB
          for data — and work on AI-powered tooling and automation. Freelance
          work has centred on replacing manual, spreadsheet-driven processes
          with internal tools people actually want to use.
        </p>
      </section>

      <section aria-labelledby="experience" className="mb-12">
        <h2 id="experience" className="text-2xl font-semibold text-foreground mb-6">
          Experience
        </h2>
        <ol className="space-y-8">
          {EXPERIENCE.map((role) => (
            <li key={role.id}>
              <h3 className="text-lg font-semibold text-foreground">
                {role.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {role.company} · {role.startDate} – {role.endDate}
              </p>
              <ul className="mt-3 list-disc ml-5 space-y-1 text-muted-foreground">
                {role.description.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="skills" className="mb-12">
        <h2 id="skills" className="text-2xl font-semibold text-foreground mb-6">
          Technical skills
        </h2>
        <dl className="space-y-4">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title}>
              <dt className="text-sm font-semibold text-foreground">
                {group.title}
              </dt>
              <dd className="text-muted-foreground">
                {group.skills.map((name) => SKILLS[name].label).join(", ")}
              </dd>
            </div>
          ))}
          <div>
            <dt className="text-sm font-semibold text-foreground">
              Focus areas
            </dt>
            <dd className="text-muted-foreground">
              AI engineering and LLM applications, AI automation, cybersecurity
              and security-minded engineering, full-stack web development.
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="projects" className="mb-12">
        <h2 id="projects" className="text-2xl font-semibold text-foreground mb-6">
          Selected projects
        </h2>
        <ul className="space-y-4">
          {PROJECT_META.map((project) => (
            <li key={project.slug}>
              <Link
                href={projectPath(project)}
                className="font-medium text-foreground underline underline-offset-4"
              >
                {project.title}
              </Link>
              <p className="text-muted-foreground">{project.description}</p>
              <p className="text-sm text-muted-foreground">
                {project.technologies.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-sm text-muted-foreground">
        More detail on the person behind this:{" "}
        <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
          about page
        </Link>
        . To talk about work, use the{" "}
        <Link href="/contact" className="underline underline-offset-4 hover:text-foreground">
          contact page
        </Link>
        .
      </p>

      <JsonLd
        id="schema-resume"
        data={graph([
          webPageSchema({
            path: PATH,
            name: TITLE,
            description: DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbSchema(PATH, crumbs),
        ])}
      />
    </main>
  );
}