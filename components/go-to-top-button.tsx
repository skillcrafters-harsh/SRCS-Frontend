"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-50 transition-all duration-300 ease-out",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "pointer-events-none opacity-0 translate-y-3"
      )}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Go to top"
        className="group flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/90 text-gray-900 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      >
        <ArrowUp
          className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1"
          strokeWidth={1.75}
        />
      </button>
    </div>
  );
}

export default GoToTopButton;
