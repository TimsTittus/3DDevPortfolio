/**
 * Plain project data — no JSX, no client components.
 * Pages that only need titles, descriptions and URLs (the projects index,
 * about, resume, sitemap, llms.txt) import this instead of `projects.tsx`,
 * which keeps the modal/carousel bundles off those routes.
 */
export type ProjectMeta = {
  id: string;
  /** URL segment for /projects/[slug]. Stable — changing it changes a canonical URL. */
  slug: string;
  category: string;
  title: string;
  /** Directory containing the project screenshots, with trailing slash. */
  src: string;
  screenshots: string[];
  /** Plain-text summary used for meta descriptions, cards and JSON-LD. */
  description: string;
  /** Alt text for the card/preview image. */
  imageAlt: string;
  /** schema.org type. Only real applications get an application type. */
  schemaType: "SoftwareApplication" | "WebApplication" | "CreativeWork";
  /** Flat technology list for schema, cards and the resume. */
  technologies: string[];
  github?: string;
  live: string;
};

export const PROJECT_META: ProjectMeta[] = [
  {
    id: "MonkeyPen.ai",
    slug: "monkeypen-ai",
    category: "AI",
    title: "MonkeyPen.ai",
    src: "/assets/projects-screenshots/monkeypenai/",
    screenshots: ["home.png", "features.png", "ai.png"],
    description:
      "AI-powered tool that converts typed text into realistic handwritten output, with 50+ handwriting styles, real-time previews and multi-format export.",
    imageAlt:
      "MonkeyPen.ai home screen showing typed text converted to handwriting",
    schemaType: "WebApplication",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Python"],
    live: "https://monkeypen.vercel.app",
    github: "https://github.com/TimsTittus/MonkeyPen-Site",
  },
  {
    id: "portfolio",
    slug: "developer-portfolio",
    category: "Web",
    title: "Developer Portfolio",
    src: "/assets/projects-screenshots/portfolio/",
    screenshots: ["project.png", "skills.png"],
    description:
      "This site: a Next.js portfolio with a 3D interactive keyboard for the tech stack, a particle-driven space theme and animated project case studies.",
    imageAlt:
      "Project section of the Tims Tittus developer portfolio, showing project cards",
    schemaType: "CreativeWork",
    technologies: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Spline",
    ],
    live: "https://developer.timstittus.com",
    github: "https://github.com/timstittus/PortF",
  },
];

/** Canonical path of a project detail page. */
export const projectPath = (project: Pick<ProjectMeta, "slug">) =>
  `/projects/${project.slug}`;

export const getProjectMetaBySlug = (slug: string) =>
  PROJECT_META.find((project) => project.slug === slug);

export default PROJECT_META;
