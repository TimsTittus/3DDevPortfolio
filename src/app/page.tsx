import React from "react";
import type { Metadata } from "next";

import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import SkillsSection from "@/components/sections/skills";
import ExperienceSection from "@/components/sections/experience";
import ProjectsSection from "@/components/sections/projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";

import { personConfig } from "@/config/person";
import { siteConfig } from "@/config/site";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd, graph } from "@/lib/seo/jsonld";
import { webPageSchema } from "@/lib/seo/website-schema";

export const metadata: Metadata = generatePageMetadata({
  title: siteConfig.defaultTitle,
  description:
    "Tims Tittus builds AI-powered applications, security-minded tooling and full-stack web products. See the projects, technical stack, experience and write-ups behind the work.",
  path: "/",
  og: {
    heading: personConfig.name,
    eyebrow: "developer.timstittus.com",
    subtitle: personConfig.headline,
  },
  keywords: [
    "Tims Tittus",
    "Tims Tittus developer",
    "Tims Tittus portfolio",
    "AI engineer",
    "cybersecurity developer",
    "full-stack developer",
  ],
});

function MainPage() {
  return (
    <SmoothScroll>
      <AnimatedBackground />
      <main
        id="main-content"
        className={cn("bg-slate-100 dark:bg-transparent canvas-overlay-mode")}
      >
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <JsonLd
        id="schema-home"
        data={graph([
          webPageSchema({
            path: "/",
            name: siteConfig.defaultTitle,
            description: siteConfig.description.short,
            primaryImage: `${siteConfig.url}${personConfig.image}`,
          }),
        ])}
      />
    </SmoothScroll>
  );
}

export default MainPage;
