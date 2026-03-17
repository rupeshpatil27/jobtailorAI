"use client";

import { useEffect, useState } from "react";
import { Lock, LucideIcon, Menu, Upload } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  proRequired: boolean;
};

interface MobileMenuProps {
  navItems: NavItem[];
  pathname: string;
  isPremium: boolean;
}

export const MobileMenu = ({
  navItems,
  pathname,
  isPremium,
}: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 768 && setIsOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-600 hover:bg-slate-100"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-75 sm:w-87.5">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-1">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                JobTailor
              </span>
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
                AI
              </span>
            </SheetTitle>
            <SheetDescription className="sr-only">
              Mobile navigation menu
            </SheetDescription>
          </SheetHeader>

          <div className="mt-8 flex flex-col gap-6 px-3">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                const isLocked = item.proRequired && !isPremium;
                // const targetHref = isLocked ? "/billing" : item.href;
                const targetHref = isLocked ? "#" : item.href;
                return (
                  <Link
                    key={item.name}
                    href={targetHref}
                    onClick={() => setIsOpen(false)}
                    className={`group relative flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-linear-to-r from-blue-50/50 to-indigo-50/50 text-blue-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)] ring-1 ring-blue-100/50"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-150"
                            : "bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-slate-600 group-hover:shadow-sm group-hover:ring-1 group-hover:ring-slate-200"
                        }`}
                      >
                        <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      {item.name}
                    </div>

                    {isLocked && (
                      <div className="flex items-center gap-1 rounded bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600 ring-1 ring-inset ring-amber-500/20">
                        <Lock className="h-3 w-3" />
                        PRO
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
