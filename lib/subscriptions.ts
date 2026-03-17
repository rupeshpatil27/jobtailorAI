export type SubscriptionTier = "free" | "pro";

export const PLAN_FEATURES: Record<
  SubscriptionTier,
  {
    canGenerateResume: boolean;
    canExportPdf: boolean;
    maxScansPerMonth: number;
  }
> = {
  free: {
    canGenerateResume: false,
    canExportPdf: false,
    maxScansPerMonth: 1,
  },
  pro: {
    canGenerateResume: true,
    canExportPdf: true,
    maxScansPerMonth: 100,
  },
};
