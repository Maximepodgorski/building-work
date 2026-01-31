"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export default function Navbar() {
  const pathname = usePathname();

  const tabs = [
    { href: "/classement", label: "Classement" },
    { href: "/", label: "Jouer" },
    { href: "/equipe", label: "Équipe" }
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-200 z-50"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href ||
            (pathname?.startsWith("/quiz") && tab.href === "/") ||
            (pathname?.startsWith("/resultats") && tab.href === "/") ||
            (pathname?.startsWith("/feedback") && tab.href === "/");

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "touch-target flex-1 flex items-center justify-center h-full text-sm font-semibold transition-colors",
                isActive
                  ? "text-primary border-t-2 border-primary"
                  : "text-secondary hover:text-primary"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
