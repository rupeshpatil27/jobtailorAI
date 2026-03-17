"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendVerificationEmailProps {
  email: string;
  name: string;
  url: string;
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
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your email - JobTailor AI",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
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

    if (error) {
      console.error("[RESEND_API_ERROR]:", error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err) {
    console.error("[EMAIL_SEND_EXCEPTION]:", err);
    return {
      success: false,
      error: "Internal server error while sending email.",
    };
  }
}
