import { AppNavBar } from "@/components/app/navbar";
import { Footer } from "@/components/marketing/footer";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 w-full">
      <AppNavBar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer/>
    </div>
  );
};

export default MainLayout;
