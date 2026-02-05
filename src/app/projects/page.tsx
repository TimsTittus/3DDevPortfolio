"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";

import "@splidejs/react-splide/css";
import projects, { Project } from "@/data/projects";

function Page() {
  return (
    <>
      <div className="container mx-auto md:px-[50px] xl:px-[150px] text-zinc-300 h-full">
        <h1 className="text-4xl mt-[100px] mb-[50px]">Projects</h1>
        <ul className="grid  md:grid-cols-2 lg:grid-cols-3 gap-10 place-content-around ">
          {(projects as Project[]).map((project: Project) => (
            <li
              className="w-[300px] h-[400px] border-[.5px] rounded-md border-zinc-600"
              key={project.id}
              style={{ backdropFilter: "blur(2px)" }}
            >
              <div className="flex flex-col items-center justify-center h-[220px]">
                <span className="text-xs text-zinc-400 mt-2">
                  ID: {project.id}
                </span>
                <span className="text-xs text-zinc-400 mb-2">
                  Category: {project.category}
                </span>
                <Image
                  src={`${project.src}${project.screenshots[0]}`}
                  alt={`preview of ${project.title}`}
                  className="w-[180px] h-[120px] rounded-md bg-zinc-900 object-cover"
                  width={180}
                  height={120}
                  style={{ height: "120px" }}
                />
              </div>
              <div className="p-4 text-zinc-300">
                <h2 className="text-xl">{project.title}</h2>
                <p className="mt-2 text-xs text-zinc-500">
                  {project.content.props.children[0].props.children}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Page;
