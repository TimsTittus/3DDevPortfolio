"use client";

import React, { useEffect, useState } from "react";
import { DiMongodb, DiNginx, DiNpm, DiPostgresql, DiVim } from "react-icons/di";
import {
  FaAws,
  FaCss3,
  FaDocker,
  FaGit,
  FaGithub,
  FaHtml5,
  FaLinux,
  FaNodeJs,
  FaReact,
  FaVuejs,
  FaYarn,
} from "react-icons/fa6";
import { RiFirebaseFill, RiTailwindCssFill } from "react-icons/ri";
import {
  SiExpress,
  SiJavascript,
  SiKubuntu,
  SiPrettier,
  SiPython,
  SiTypescript,
  SiVercel,
  SiVscodium,
} from "react-icons/si";
import { TbTerminal2 } from "react-icons/tb";

// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

/** Tools actually used day to day. The label doubles as the icon's alt text. */
const TOOLS: { name: string; icon: React.ReactNode }[] = [
  { name: "JavaScript", icon: <SiJavascript size="50px" color="#f0db4f" /> },
  { name: "TypeScript", icon: <SiTypescript size="50px" color="#007acc" /> },
  { name: "Python", icon: <SiPython size="50px" color="#3776ab" /> },
  { name: "HTML", icon: <FaHtml5 size="50px" color="#e34c26" /> },
  { name: "CSS", icon: <FaCss3 size="50px" color="#563d7c" /> },
  { name: "Node.js", icon: <FaNodeJs size="50px" color="#6cc24a" /> },
  { name: "React", icon: <FaReact size="50px" color="#61dafb" /> },
  { name: "Vue.js", icon: <FaVuejs size="50px" color="#41b883" /> },
  { name: "Express", icon: <SiExpress size="50px" className="text-zinc-900 dark:text-white" /> },
  { name: "Tailwind CSS", icon: <RiTailwindCssFill size="50px" color="#06b6d4" /> },
  { name: "PostgreSQL", icon: <DiPostgresql size="50px" color="#336791" /> },
  { name: "MongoDB", icon: <DiMongodb size="50px" color="#4db33d" /> },
  { name: "Firebase", icon: <RiFirebaseFill size="50px" color="#FFCA28" /> },
  { name: "Docker", icon: <FaDocker size="50px" color="#2496ed" /> },
  { name: "Nginx", icon: <DiNginx size="50px" color="#008000" /> },
  { name: "AWS", icon: <FaAws size="50px" color="#3f51b5" /> },
  { name: "Vercel", icon: <SiVercel size="50px" className="text-zinc-900 dark:text-white" /> },
  { name: "Git", icon: <FaGit size="50px" color="#f05032" /> },
  { name: "GitHub", icon: <FaGithub size="50px" className="text-zinc-900 dark:text-white" /> },
  { name: "npm", icon: <DiNpm size="50px" color="#CB3837" /> },
  { name: "Yarn", icon: <FaYarn size="50px" color="#2C8EBB" /> },
  { name: "Prettier", icon: <SiPrettier size="50px" color="#f7b93c" /> },
  { name: "VS Code", icon: <SiVscodium size="50px" color="#007acc" /> },
  { name: "Vim", icon: <DiVim size="50px" className="text-zinc-900 dark:text-white" /> },
  { name: "Linux", icon: <FaLinux size="50px" className="text-zinc-900 dark:text-white" /> },
  { name: "Kubuntu", icon: <SiKubuntu size="50px" color="#0077C4" /> },
  { name: "Terminal", icon: <TbTerminal2 size="50px" className="text-zinc-900 dark:text-white" /> },
];

/**
 * Icon marquee. Rendered only after mount because Splide measures the DOM;
 * the names are also listed in text below so the content is never icon-only.
 */
export default function ToolsCarousel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div>
      <div className="mb-5 min-h-[100px]">
        {mounted && (
          <Splide
            options={{
              type: "loop",
              interval: 2000,
              autoplay: true,
              pagination: false,
              speed: 2000,
              perPage: 5,
              perMove: 1,
              rewind: true,
              easing: "cubic-bezier(0.25, 1, 0.5, 1)",
              arrows: false,
            }}
            aria-label="Tools and technologies I work with"
          >
            {TOOLS.map((tool) => (
              <SplideSlide key={tool.name}>
                <div
                  className="w-fit p-2 border-[.5px] border-zinc-300 dark:border-zinc-600 rounded-md bg-white/50 dark:bg-transparent"
                  title={tool.name}
                  role="img"
                  aria-label={tool.name}
                >
                  {tool.icon}
                </div>
              </SplideSlide>
            ))}
          </Splide>
        )}
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {TOOLS.map((tool) => tool.name).join(" · ")}
      </p>
    </div>
  );
}