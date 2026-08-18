import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa6";

import Breadcrumbs from "@/components/seo/breadcrumbs";
import ToolsCarousel from "./tools-carousel";
import { personConfig } from "@/config/person";
import { siteConfig } from "@/config/site";
import { socialConfig } from "@/config/social";
import { EXPERIENCE } from "@/data/constants";
import { PROJECT_META, projectPath } from "@/data/projects-meta";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd, graph } from "@/lib/seo/jsonld";
import { breadcrumbSchema, type Crumb } from "@/lib/seo/breadcrumb-schema";
import { profilePageSchema } from "@/lib/seo/profile-schema";

const PATH = "/about";
const TITLE = "About Tims Tittus — Developer, Cybersecurity & AI";
const DESCRIPTION =
  "Who Tims Tittus is: a computer science and cybersecurity student and developer building AI-powered tools, security-minded systems and full-stack web applications.";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: PATH },
];

export const metadata: Metadata = generatePageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "profile",
  og: {
    heading: "About Tims Tittus",
    eyebrow: "Profile",
    subtitle: personConfig.headline,
  },
  keywords: [
    "Tims Tittus",
    "about Tims Tittus",
    "Tims Tittus cybersecurity",
    "Tims Tittus AI",
  ],
});

const CONTACT_LINKS = [
  {
    name: "Email",
    content: personConfig.email,
    href: `mailto:${personConfig.email}`,
    icon: <FaEnvelope aria-hidden="true" />,
    external: false,
  },
  {
    name: "LinkedIn",
    content: "/in/tims-tittus",
    href: socialConfig.linkedin,
    icon: <FaLinkedin aria-hidden="true" />,
    external: true,
  },
  {
    name: "GitHub",
    content: "/TimsTittus",
    href: socialConfig.github,
    icon: <FaGithub aria-hidden="true" />,
    external: true,
  },
  {
    name: "Personal site",
    content: "timstittus.com",
    href: siteConfig.mainSiteUrl,
    icon: <FaGlobe aria-hidden="true" />,
    external: true,
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[200px] text-zinc-300 pt-24 pb-20">
      <Breadcrumbs items={crumbs} />

      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="w-full lg:basis-1/4">
          <div
            className="p-4 md:p-8 lg:p-10 rounded-2xl border-[.5px] border-zinc-600"
            style={{ backdropFilter: "blur(2px)" }}
          >
            <div className="flex flex-row lg:flex-col items-center gap-6 lg:gap-0">
              <div className="flex justify-center items-center lg:w-full lg:aspect-square bg-zinc-800 rounded-xl lg:mb-5">
                <Image
                  className="rounded-full p-4 lg:p-10 w-[100px] md:w-[150px] lg:w-[200px] aspect-square bg-zinc-800 object-cover"
                  alt={personConfig.imageAlt}
                  src={personConfig.image}
                  width={200}
                  height={200}
                  priority
                />
              </div>
              <div className="flex flex-col gap-3 lg:items-center">
                <p className="text-center text-xl">{personConfig.name}</p>
                <p className="text-xs bg-zinc-700 w-fit px-3 py-1 rounded-full">
                  {personConfig.headline}
                </p>
              </div>
            </div>
            <hr className="my-8 border-zinc-600" />
            <ul className="flex flex-col gap-3">
              {CONTACT_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    className="flex items-center px-3 gap-3 w-full h-12 border-zinc-700 bg-zinc-800 hover:border-zinc-600 border-[.5px] rounded-md"
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer me" }
                      : {})}
                  >
                    <span className="w-8 text-xl">{link.icon}</span>
                    <span className="flex flex-col">
                      <span className="text-sm">{link.name}</span>
                      <span className="text-xs text-zinc-500">{link.content}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main id="main-content" className="w-full lg:basis-3/4">
          <div
            className="p-6 md:p-10 border-[.5px] rounded-md border-zinc-600"
            style={{ backdropFilter: "blur(2px)" }}
          >
            <h1 className="text-3xl mb-8">About Tims Tittus</h1>

            <p className="mb-6">
              Hey there! I&apos;m Tims — a full-stack developer studying computer
              science and cybersecurity, with a strong pull toward artificial
              intelligence. I build things that live at the intersection of those
              three: web applications with a real backend behind them, AI-powered
              tools, and software written with security in mind rather than
              bolted on afterwards.
            </p>
            <p className="mb-10">
              Most of my work starts the same way: someone has a manual, brittle
              process, and I turn it into something they can actually use. That
              has meant internal dashboards and custom CMS platforms for
              freelance clients, community and society websites, and side
              projects like{" "}
              <Link
                href={projectPath({ slug: "monkeypen-ai" })}
                className="underline underline-offset-4 hover:text-white"
              >
                MonkeyPen.ai
              </Link>
              , an AI handwriting tool.
            </p>

            <h2 className="text-2xl mb-4">What I work on</h2>
            <ul className="list-disc ml-5 mb-10 space-y-2 text-zinc-400">
              <li>
                <strong className="text-zinc-200">AI engineering:</strong>{" "}
                building applications on top of language models and automation
                pipelines, and wiring them into real products.
              </li>
              <li>
                <strong className="text-zinc-200">Cybersecurity:</strong>{" "}
                security-focused study and hands-on work with detection and
                monitoring tooling — the reason I care about how software fails,
                not just how it runs.
              </li>
              <li>
                <strong className="text-zinc-200">Full-stack development:</strong>{" "}
                TypeScript, React, Next.js, Node.js, Express and Python on the
                server, with PostgreSQL or MongoDB behind them, containerised
                with Docker and deployed to the usual suspects.
              </li>
            </ul>

            <h2 className="text-2xl mb-4">Where I&apos;ve worked</h2>
            <ul className="mb-4 space-y-4">
              {EXPERIENCE.map((role) => (
                <li key={role.id}>
                  <p className="text-zinc-200">
                    {role.title} · {role.company}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {role.startDate} – {role.endDate}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mb-10 text-zinc-400">
              The{" "}
              <Link href="/resume" className="underline underline-offset-4 hover:text-white">
                full résumé
              </Link>{" "}
              has the detail on each role.
            </p>

            <h2 className="text-2xl mb-4">Projects</h2>
            <ul className="mb-10 space-y-3">
              {PROJECT_META.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={projectPath(project)}
                    className="underline underline-offset-4 hover:text-white"
                  >
                    Read the {project.title} case study
                  </Link>
                  <p className="text-sm text-zinc-500">{project.description}</p>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl mb-4">Stuff I use</h2>
            <ToolsCarousel />

            <h2 className="text-2xl mt-10 mb-4">Elsewhere</h2>
            <p className="text-zinc-400">
              I write about what I build on the{" "}
              <Link href="/blogs" className="underline underline-offset-4 hover:text-white">
                blog
              </Link>
              , publish code on{" "}
              <a
                href={socialConfig.github}
                target="_blank"
                rel="noopener noreferrer me"
                className="underline underline-offset-4 hover:text-white"
              >
                GitHub
              </a>
              , keep a professional profile on{" "}
              <a
                href={socialConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer me"
                className="underline underline-offset-4 hover:text-white"
              >
                LinkedIn
              </a>
              , and run a personal site at{" "}
              <a
                href={siteConfig.mainSiteUrl}
                target="_blank"
                rel="noopener noreferrer me"
                className="underline underline-offset-4 hover:text-white"
              >
                timstittus.com
              </a>
              . If you have something you want built,{" "}
              <Link href="/contact" className="underline underline-offset-4 hover:text-white">
                get in touch
              </Link>
              .
            </p>
          </div>
        </main>
      </div>

      <JsonLd
        id="schema-about"
        data={graph([
          profilePageSchema({
            path: PATH,
            name: TITLE,
            description: DESCRIPTION,
          }),
          breadcrumbSchema(PATH, crumbs),
        ])}
      />
    </div>
  );
}
