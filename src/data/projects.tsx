import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiChakraui,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener noreferrer"
        target="_blank"
        href={live}
      >
        <Button variant={"default"} size={"sm"}>
          Visit the live site
          <ArrowUpRight className="ml-3 w-5 h-5" aria-hidden="true" />
        </Button>
      </Link>
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener noreferrer"
          target="_blank"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Source on GitHub
            <ArrowUpRight className="ml-3 w-5 h-5" aria-hidden="true" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <SiChakraui />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: "",
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
};
import {
  PROJECT_META,
  type ProjectMeta,
  projectPath,
  getProjectMetaBySlug,
} from "./projects-meta";

export type { ProjectMeta };
export { projectPath, getProjectMetaBySlug };

/** A project plus the rich, JSX case-study body rendered on its detail page. */
export type Project = ProjectMeta & {
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode;
};

const SKILLS_BY_SLUG: Record<string, { frontend: Skill[]; backend: Skill[] }> = {
  "monkeypen-ai": {
    frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.ts, PROJECT_SKILLS.tailwind],
    backend: [PROJECT_SKILLS.python],
  },
  "developer-portfolio": {
    frontend: [
      PROJECT_SKILLS.ts,
      PROJECT_SKILLS.next,
      PROJECT_SKILLS.shadcn,
      PROJECT_SKILLS.aceternity,
      PROJECT_SKILLS.framerMotion,
      PROJECT_SKILLS.tailwind,
      PROJECT_SKILLS.spline,
    ],
    backend: [],
  },
};

const CONTENT_BY_SLUG: Record<string, (project: ProjectMeta) => ReactNode> = {
  "monkeypen-ai": (project) => (
    <div>
      <TypographyP className="font-mono ">
        AI-powered tool that converts text into realistic handwritten output,
        offering 50+ handwriting styles, real-time previews, and multi-format
        export options.
      </TypographyP>
      <ProjectsLinks live={project.live} repo={project.github} />
      <TypographyH3 className="my-4 mt-8">Features</TypographyH3>
      <ul className="list-disc ml-6 font-mono mb-4">
        <li>Text to Handwriting: Convert typed content to handwritten format</li>
        <li>Multiple Styles: 50+ handwriting variations available</li>
        <li>Real-time Preview: See output as you type</li>
        <li>Export Options: Download in multiple formats</li>
      </ul>
      <SlideShow
        images={[
          `${BASE_PATH}/monkeypenai/home.png`,
          `${BASE_PATH}/monkeypenai/features.png`,
          `${BASE_PATH}/monkeypenai/ai.png`,
        ]}
      />
    </div>
  ),
  "developer-portfolio": (project) => (
    <div>
      <TypographyP className="font-mono ">
        Welcome to my portfolio, where creativity meets code in the dopest way
        possible.
      </TypographyP>
      <ProjectsLinks live={project.live} repo={project.github} />
      <TypographyH3 className="my-4 mt-8">Beautiful 3D Objects </TypographyH3>
      <p className="font-mono mb-2">
        Did you see that 3D keyboard modal? Yeah! I made that. That interactive
        keyboard is being rendered in 3D on a webpage 🤯, and pressing each
        keycap reveals a skill in a goofy way. It&apos;s like typing, but make
        it art.
      </p>
      <SlideShow images={[`${BASE_PATH}/portfolio/skills.png`]} />
      <TypographyH3 className="my-4 ">Space Theme</TypographyH3>
      <p className="font-mono mb-2">
        Dark background + floating particles = out-of-this-world cool.
      </p>
      <TypographyH3 className="my-4 mt-8">Projects</TypographyH3>
      <p className="font-mono mb-2">
        My top personal and freelance projects — no filler, all killer.
      </p>
      <SlideShow images={[`${BASE_PATH}/portfolio/project.png`]} />
      <p className="font-mono mb-2 mt-8 text-center">
        This site&apos;s not just a portfolio — it&apos;s a whole vibe.
      </p>
    </div>
  ),
};

const projects: Project[] = PROJECT_META.map((project) => ({
  ...project,
  skills: SKILLS_BY_SLUG[project.slug] ?? { frontend: [], backend: [] },
  content: CONTENT_BY_SLUG[project.slug]?.(project) ?? null,
}));

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

export default projects;
