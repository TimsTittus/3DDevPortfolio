import { Link } from "@/types";

/**
 * Primary navigation. Every href points at a real, canonical URL and every
 * thumbnail at an image that exists in /public.
 */
const links: Link[] = [
  {
    title: "Home",
    href: "/",
    thumbnail: "/assets/nav-link-previews/landing.png",
  },
  {
    title: "About",
    href: "/about",
    thumbnail: "/assets/tims-tittus.png",
  },
  {
    title: "Skills",
    href: "/#skills",
    thumbnail: "/assets/nav-link-previews/skills.png",
  },
  {
    title: "Projects",
    href: "/projects",
    thumbnail: "/assets/nav-link-previews/projects.png",
  },
  {
    title: "Articles",
    href: "/blogs",
    thumbnail: "/assets/projects-screenshots/portfolio/skills.png",
  },
  {
    title: "Resume",
    href: "/resume",
    thumbnail: "/assets/nav-link-previews/landing.png",
  },
  {
    title: "Contact",
    href: "/contact",
    thumbnail: "/assets/nav-link-previews/contact.png",
  },
];

export { links };
