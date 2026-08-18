import type { Metadata } from "next";
import Link from "next/link";
import Spline from "@splinetool/react-spline";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const NotFoundPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-background px-4 py-8 md:py-0"
      style={{ boxSizing: "border-box" }}
    >
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg">
        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
          <Spline scene="/assets/404.spline" style={{ width: "100%", height: "100%" }} />
        </Suspense>
      </div>
      <div className="mt-8 text-center w-full">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Sorry, the page you are looking for does not exist.
        </p>
        <nav aria-label="Suggested pages" className="mt-6">
          <ul className="flex flex-wrap justify-center gap-4 text-sm">
            <li>
              <Link href="/" className="underline underline-offset-4 hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link href="/projects" className="underline underline-offset-4 hover:text-foreground">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="underline underline-offset-4 hover:text-foreground">
                Articles
              </Link>
            </li>
            <li>
              <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="underline underline-offset-4 hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NotFoundPage;
