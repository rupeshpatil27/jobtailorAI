import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
    storage: "database",
    customRules: {
      "/sign-in/email": {
        window: 60 * 5,
        max: 5,
      },
      "/sign-up/email": {
        window: 60 * 60,
        max: 3,
      },
      "/send-verification-email": {
        window: 60 * 60,
        max: 3,
      },
    },
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for", "x-real-ip"],
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 64,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60,

    sendVerificationEmail: async ({ user, token }) => {
      const frontendVerificationUrl = `${process.env.BETTER_AUTH_URL}/verify?token=${token}`;

      const result = await sendVerificationEmail({
        email: user.email,
        name: user.name,
        url: frontendVerificationUrl,
      });

      if (!result.success) {
        throw new Error(result.error);
      }
    },
  },
  user: {
    additionalFields: {
      tier: {
        type: "string",
        defaultValue: "free",
      },
      scansUsed: {
        type: "number",
        defaultValue: 0,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              tier: "free",
              scansUsed: 0,
            },
          };
        },
      },
    },
  },
});
