"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import type { NavItem } from "./mobile-menu";

interface DesktopLinksProps {
  navItems: NavItem[];
  pathname: string;
  isPending: boolean;
  isPremium: boolean;
}

export const DesktopLinks = ({
  navItems,
  pathname,
  isPending,
  isPremium,
}: DesktopLinksProps) => {
  return (
    <div className="hidden md:flex items-center gap-8 ml-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const isLocked = item.proRequired && !isPremium;
        // isLocked ? "/billing" : item.href;
        const targetHref = isLocked ? "#" : item.href;
        return (
          <Link
            key={item.name}
            href={targetHref}
            className={`group relative flex items-center gap-1.5 px-1 py-2 text-sm font-semibold transition-colors duration-200 ${
              isActive
                ? "text-slate-900"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {item.name}
            {isLocked && <Lock className="h-3 w-3 text-amber-500" />}
          </Link>
        );
      })}
    </div>
  );
};
