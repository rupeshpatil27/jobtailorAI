import { Suspense } from "react";
import { AuthBranding } from "@/components/auth/auth-branding";
import { LoginForm } from "@/components/auth/login-form";

const LoginPage = async () => {
  return (
    <main className="flex min-h-screen w-full bg-white">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          </div>
        }
      >
        <AuthBranding mode="login" />
        <LoginForm />
      </Suspense>
    </main>
  );
};
export default LoginPage;
