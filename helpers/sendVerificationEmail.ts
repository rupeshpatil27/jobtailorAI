"use server";

import nodemailer from "nodemailer";

interface SendVerificationEmailProps {
  email: string;
  name: string;
  url: string;
}

const globalForNodemailer = globalThis as unknown as {
  nodemailerTransporter: nodemailer.Transporter | undefined;
};

const transporter =
  globalForNodemailer.nodemailerTransporter ||
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    pool: true,
    maxConnections: 1,
  });

if (process.env.NODE_ENV !== "production") {
  globalForNodemailer.nodemailerTransporter = transporter;
}

export async function sendVerificationEmail({
  email,
  name,
  url,
}: SendVerificationEmailProps) {
  if (!email || !url) {
    return { success: false, error: "Missing email or verification URL" };
  }

  try {
    const info = await transporter.sendMail({
      from: `"JobTailor AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirm your email - JobTailor AI",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #0f172a; margin-bottom: 16px;">Welcome to JobTailor AI, ${name}!</h2>
          <p style="color: #475569; font-size: 16px; margin-bottom: 24px;">
            Please verify your email address by clicking the secure button below.
          </p>
          <a href="${url}" style="display: inline-block; padding: 14px 28px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Verify My Email
          </a>
        </div>
      `,
    });

    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error("[NODEMAILER_SEND_EXCEPTION]:", err);

    return {
      success: false,
      error: err.message || "Internal server error while sending email.",
    };
  }
}
