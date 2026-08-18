import type { Metadata } from "next";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";

import Breadcrumbs from "@/components/seo/breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { personConfig } from "@/config/person";
import { socialConfig } from "@/config/social";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd, graph } from "@/lib/seo/jsonld";
import { breadcrumbSchema, type Crumb } from "@/lib/seo/breadcrumb-schema";
import { webPageSchema } from "@/lib/seo/website-schema";

const PATH = "/contact";
const TITLE = "Contact Tims Tittus — Developer & Cybersecurity Engineer";
const DESCRIPTION =
  "Get in touch with Tims Tittus about development work, AI projects or collaboration. Email, LinkedIn, GitHub, or send a message directly from this page.";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: PATH },
];

export const metadata: Metadata = generatePageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  og: { heading: "Contact", eyebrow: "Get in touch", subtitle: DESCRIPTION },
  keywords: ["contact Tims Tittus", "hire Tims Tittus", "Tims Tittus email"],
});

const CHANNELS = [
  {
    label: "Email",
    value: personConfig.email,
    href: `mailto:${personConfig.email}`,
    icon: <FaEnvelope aria-hidden="true" />,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tims-tittus",
    href: socialConfig.linkedin,
    icon: <FaLinkedin aria-hidden="true" />,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/TimsTittus",
    href: socialConfig.github,
    icon: <FaGithub aria-hidden="true" />,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <main id="main-content" className="container mx-auto max-w-3xl px-4 pt-28 pb-24">
      <Breadcrumbs items={crumbs} />

      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Contact
        </h1>
        <p className="mt-4 text-muted-foreground">
          Freelance work, an AI or security-flavoured project, or just a
          question about something on this site — send it over. Replies usually
          go out within a couple of days.
        </p>
      </header>

      <section aria-labelledby="direct" className="mb-12">
        <h2 id="direct" className="text-xl font-semibold text-foreground mb-4">
          Direct channels
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {CHANNELS.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer me" }
                  : {})}
                className="flex h-full flex-col gap-1 rounded-md border border-zinc-700 p-4 hover:border-zinc-500 transition-colors"
              >
                <span className="text-lg text-zinc-300">{channel.icon}</span>
                <span className="text-sm text-foreground">{channel.label}</span>
                <span className="text-xs text-muted-foreground break-all">
                  {channel.value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="message">
        <h2 id="message" className="text-xl font-semibold text-foreground mb-4">
          Send a message
        </h2>
        <ContactForm />
      </section>

      <p className="mt-12 text-sm text-muted-foreground">
        Want the background first? Read{" "}
        <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
          about Tims Tittus
        </Link>
        , browse the{" "}
        <Link href="/projects" className="underline underline-offset-4 hover:text-foreground">
          project case studies
        </Link>{" "}
        or check the{" "}
        <Link href="/resume" className="underline underline-offset-4 hover:text-foreground">
          résumé
        </Link>
        .
      </p>

      <JsonLd
        id="schema-contact"
        data={graph([
          webPageSchema({
            path: PATH,
            name: TITLE,
            description: DESCRIPTION,
            type: "ContactPage",
            hasBreadcrumb: true,
          }),
          breadcrumbSchema(PATH, crumbs),
        ])}
      />
    </main>
  );
}
