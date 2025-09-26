"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  DocumentTextIcon,
  PlayIcon,
  BookOpenIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { path: "/", label: "Home", icon: HomeIcon },
    { path: "/example", label: "Example", icon: DocumentTextIcon },
    { path: "/run", label: "Run", icon: PlayIcon },
    { path: "/api-docs", label: "API Docs", icon: BookOpenIcon },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-border fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="flex items-center animate-slide-in-left">
            <div className="flex-shrink-0">
              <img
                src="/main-logo.png"
                alt="Smart Roll Cutting Solution"
                className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14"
              />
            </div>
            <div className="ml-2 sm:ml-3">
              <div
                className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-foreground uppercase leading-tight"
                style={{ fontFamily: "Helvetica", color: "#08429d" }}
              >
                Smart Roll
              </div>
              <div className="text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] uppercase text-center leading-tight">
                Cutting Solution
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2 animate-slide-in-right">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                href={path}
                className={`flex items-center space-x-1.5 lg:space-x-2 px-2 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 hover-lift ${
                  isActive(path)
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                }`}
              >
                <Icon className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden lg:inline">{label}</span>
                <span className="lg:hidden">{label.substring(0, 3)}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Bars3Icon className="block h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-3 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-border">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm sm:text-base font-medium w-full text-left transition-all duration-200 ${
                    isActive(path)
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
