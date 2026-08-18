"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { config } from "@/data/config";
import { personConfig } from "@/config/person";

import SectionWrapper from "../ui/section-wrapper";

const HeroSection = () => {
  const { isLoading } = usePreloader();
  /**
   * The hero markup is always rendered so the H1 exists in the server HTML;
   * the preloader only drives the reveal animation.
   */
  const revealed = isLoading ? "hidden" : "visible";

  return (
    <SectionWrapper id="hero" className={cn("relative w-full h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 sm:pb-16 md:p-20 lg:p-24 xl:p-28"
          )}
        >
          <div className="flex flex-col">
            <div>
              <BlurIn delay={0.7} animate={revealed}>
                <p
                  className={cn(
                    "md:self-start mt-4 font-thin text-md text-slate-500 dark:text-zinc-400",
                    "cursor-default font-display sm:text-xl md:text-xl whitespace-nowrap bg-clip-text "
                  )}
                >
                  Hi, I am
                  <br className="md:hidden" />
                </p>
              </BlurIn>

              <h1>
                <BlurIn delay={1} as="span" animate={revealed}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <span
                        className={cn(
                          "block -ml-[6px] leading-none font-thin text-transparent text-slate-800 text-left",
                          "font-thin text-7xl md:text-7xl lg:text-8xl xl:text-9xl",
                          "cursor-default text-edge-outline font-display "
                        )}
                      >
                        {personConfig.givenName}
                        <br className="md:block hiidden" />
                        {personConfig.familyName}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="dark:bg-white dark:text-black"
                    >
                      theres something waiting for you in devtools
                    </TooltipContent>
                  </Tooltip>
                </BlurIn>
                <BlurIn delay={1.2} as="span" animate={revealed}>
                  <span
                    className={cn(
                      "block md:self-start md:mt-4 font-thin text-slate-500 dark:text-zinc-400",
                      "cursor-default font-display text-sm sm:text-lg md:text-xl bg-clip-text"
                    )}
                  >
                    {personConfig.headline}
                  </span>
                </BlurIn>
              </h1>
            </div>
            <div className="mt-8 flex flex-col gap-3 w-fit">
              <Link href="/resume" className="flex-1" aria-label="Read the résumé of Tims Tittus">
                <BoxReveal delay={2} width="100%">
                  <Button className="flex items-center gap-2 w-full">
                    <File size={24} aria-hidden="true" />
                    <p>Resume</p>
                  </Button>
                </BoxReveal>
              </Link>
              <div className="md:self-start flex gap-3">
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Link href={"#contact"}>
                      <Button
                        variant={"outline"}
                        className="block w-full overflow-hidden"
                        aria-label="Contact Tims Tittus about work"
                      >
                        Hire Me
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>pls 🥹 🙏</p>
                  </TooltipContent>
                </Tooltip>
                <div className="flex items-center h-full gap-2">
                  <Link
                    href={config.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer me"
                  >
                    <Button variant={"outline"} aria-label="Tims Tittus on X">
                      <SiX size={24} aria-hidden="true" />
                    </Button>
                  </Link>
                  <Link
                    href={config.social.github}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="cursor-can-hover"
                  >
                    <Button variant={"outline"} aria-label="Tims Tittus on GitHub">
                      <SiGithub size={24} aria-hidden="true" />
                    </Button>
                  </Link>
                  <Link
                    href={config.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="cursor-can-hover"
                  >
                    <Button variant={"outline"} aria-label="Tims Tittus on LinkedIn">
                      <SiLinkedin size={24} aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
