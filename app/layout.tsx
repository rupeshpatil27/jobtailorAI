import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { getAuth } from "@/lib/auth-utils";

import { SessionProvider } from "@/providers/session-provider";
import QueryProviders from "@/providers/query-provider";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobTailor AI",
  description: "AI-Powered Resume Analyzer Project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionData = await getAuth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider value={sessionData}>
          <QueryProviders>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster position="top-center" />
          </QueryProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
