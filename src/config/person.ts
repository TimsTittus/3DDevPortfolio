import { siteConfig } from "./site";
import { sameAs } from "./social";

/**
 * The Person entity. Only facts present in this repository or supplied by the
 * site owner belong here — no invented employers, awards or credentials.
 */
export const personConfig = {
  name: "Tims Tittus",
  givenName: "Tims",
  familyName: "Tittus",
  /** Primary positioning, used in titles and the Person.jobTitle field. */
  jobTitle: "Developer — AI, Cybersecurity & Full-Stack Engineering",
  headline: "AI, Cybersecurity & Full-Stack Developer",
  email: siteConfig.email,
  image: "/assets/tims-tittus.png",
  imageAlt: "Portrait of Tims Tittus",
  url: siteConfig.url,
  bio: {
    short:
      "Developer working across AI engineering, cybersecurity and full-stack web development.",
    long:
      "Tims Tittus is a computer science and cybersecurity student and developer who builds AI-powered applications, security-minded tooling and full-stack web products with TypeScript, React, Next.js, Node.js and Python.",
  },
  /** Topics the site actually covers — mirrored into Person.knowsAbout. */
  knowsAbout: [
    "Artificial Intelligence",
    "AI Engineering",
    "Agentic AI",
    "AI Automation",
    "Large Language Model Applications",
    "LangChain",
    "n8n",
    "Cybersecurity",
    "Security Engineering",
    "DevSecOps",
    "Security Tooling",
    "SIEM",
    "EDR",
    "NDR",
    "Security Operations Centre Platforms",
    "Full-Stack Development",
    "Web Development",
    "TypeScript",
    "JavaScript",
    "Python",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "Cloud Infrastructure",
  ],
  sameAs,
} as const;

export const authorSlug = "tims-tittus";
export const authorUrl = `${siteConfig.url}/author/${authorSlug}`;