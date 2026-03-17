import { Suspense } from "react";
import { AuthBranding } from "@/components/auth/auth-branding";
import { RegisterForm } from "@/components/auth/register-form";

const SignupPage = async () => {
  return (
    <main className="flex min-h-screen w-full relative bg-white">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          </div>
        }
      >
        <AuthBranding mode="register" />
        <RegisterForm />
      </Suspense>
    </main>
  );
};

export default SignupPage;
