"use client";

import { UserCircle, LogOut, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { NavItem } from "./mobile-menu";

interface UserMenuProps {
  session: any;
  isPending: boolean;
  isPremium: boolean;
  userTier: string;
  navItems: NavItem[];
}

export const UserMenu = ({
  session,
  isPending,
  isPremium,
  userTier,
  navItems,
}: UserMenuProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-slate-200 bg-slate-50 p-0 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
        >
          <UserCircle className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-slate-900">
              {session?.user?.name || "My Account"}
            </p>
            <p className="text-xs leading-none text-slate-500">
              {session?.user?.email || ""}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="px-2 py-1.5 text-xs font-semibold text-slate-500 flex items-center justify-between">
          Current Plan:
          <span
            className={`px-2 py-0.5 rounded-full ${isPremium ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}
          >
            {userTier.toUpperCase()}
          </span>
        </div>

        <DropdownMenuSeparator />

        {navItems.map((item) => {
          const Icon = item.icon;
          const isLocked = item.proRequired && !isPremium;
          const targetHref = isLocked ? "#" : item.href;
          return (
            <DropdownMenuItem key={item.name} asChild>
              <Link
                href={targetHref}
                className="flex cursor-pointer items-center justify-between py-2 focus:bg-slate-50"
              >
                <div className="flex items-center">
                  <Icon className="mr-2 h-4 w-4 text-slate-500" />
                  <span className="font-medium text-slate-700">
                    {item.name}
                  </span>
                </div>

                {isLocked && (
                  <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                    PRO
                  </span>
                )}
              </Link>
            </DropdownMenuItem>
          );
        })}

        {!isPremium && (
          <DropdownMenuItem asChild>
            {/* /billing */}
            <Link
              href="#"
              className="flex cursor-pointer items-center py-2 text-amber-600 focus:bg-amber-50 focus:text-amber-700"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="font-semibold">Upgrade to Pro</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="flex cursor-pointer items-center py-2 text-red-600 focus:bg-red-50 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span className="font-semibold">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
