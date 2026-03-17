import { ResumeForm } from "@/components/resume-form";

const HomePage = async () => {
  return (
    <div className="w-full md:mx-auto md:max-w-5xl pt-5 pb-16 md:pb-24 px-6">
      <ResumeForm />
    </div>
  );
};

export default HomePage;
