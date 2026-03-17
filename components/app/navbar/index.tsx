"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upload, History, LayoutDashboard, Settings, Home } from "lucide-react";
import { SubscriptionTier } from "@/lib/subscriptions";
import { useUserSession } from "@/providers/session-provider";

import { MobileMenu } from "./mobile-menu";
import { DesktopLinks } from "./desktop-links";
import { UserMenu } from "./user-menu";

export const AppNavBar = () => {
  const pathname = usePathname();
  const session = useUserSession();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const userTier = (session?.user?.tier as SubscriptionTier) || "free";
  const isPremium = userTier !== "free";

  const navItems = [
    ...(isPremium
      ? [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }]
      : []),
    { name: "Scan History", href: "/history", icon: History },
    ...(isPremium
      ? [{ name: "Settings", href: "/settings", icon: Settings }]
      : []),
  ];

  const mainNavItems = [
    {
      name: "Home",
      href: "/home",
      icon: Home,
      proRequired: false,
    },
    {
      name: "Dashboard",
      href: "#",
      icon: LayoutDashboard,
      proRequired: true,
    },
    {
      name: "Scan History",
      href: "/history",
      icon: History,
      proRequired: false,
    },
  ];

  const userNavItems = [
    { name: "Settings", href: "#", icon: Settings, proRequired: true },
  ];

  // const isLoading = !mounted || session;

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3 md:gap-8">
          <MobileMenu
            navItems={mainNavItems}
            pathname={pathname}
            isPremium={isPremium}
          />

          <Link href="/home" className="flex items-center gap-1">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              JobTailor
            </span>
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-xl sm:text-2xl font-extrabold tracking-tight text-transparent">
              AI
            </span>
          </Link>

          <DesktopLinks
            navItems={mainNavItems}
            pathname={pathname}
            isPending={false}
            isPremium={isPremium}
          />
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <UserMenu
            session={session}
            isPending={false}
            isPremium={isPremium}
            userTier={userTier}
            navItems={userNavItems}
          />
        </div>
      </div>
    </nav>
  );
};
