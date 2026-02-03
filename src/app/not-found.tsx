import NyanCat from "@/components/nyan-cat";
import { cn } from "@/lib/utils";
import Spline from "@splinetool/react-spline";
import { Application } from "@splinetool/runtime";
import React, { Suspense } from "react";

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
        <p className="text-base md:text-lg text-muted-foreground">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
