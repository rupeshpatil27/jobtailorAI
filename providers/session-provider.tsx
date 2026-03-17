"use client";

import { auth } from "@/lib/auth";
import { createContext, useContext } from "react";

type SessionContextType = typeof auth.$Infer.Session | null;

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SessionContextType;
}) => {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useUserSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useUserSession must be used within a SessionProvider");
  }
  return context;
};
