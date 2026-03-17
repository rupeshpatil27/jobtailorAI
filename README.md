# JobTailor - AI Resume Insights 🚀

## 🔗 Live Link
[**View Live Application**](https://jobtailor-hc5aq0a0l-rupesh-patils-projects-961ac79a.vercel.app/)

---

## 📖 Project Overview
JobTailor is a production-ready SaaS platform designed to help candidates beat Applicant Tracking Systems (ATS) and land their dream roles. By leveraging advanced generative AI, the application analyzes a candidate's resume against a target job description in real-time. It uncovers missing keywords, provides a rigorous compatibility score, and generates highly personalized outreach templates to send directly to hiring managers. 

---

## 💡 Core Features
Built with a focus on enterprise-grade security and a premium user experience, JobTailor 1.0 operates on a freemium model. It features a robust onboarding flow, strict API protections, and a lightning-fast UI.

* **Smart Keyword Analysis:** Upload a PDF resume and paste a job description. The AI instantly extracts exact missing keywords needed to reach human eyes.
* **Secure Document Storage:** Resumes are securely processed and stored via Cloudinary, ensuring fast uploads and optimized asset delivery without bogging down the main server.
* **Real-Time Match Scoring:** Generates an overall ATS score alongside a strict, dynamic 3-part breakdown (e.g., Core Skills, Content & Impact, Structure & Formatting).
* **AI Outreach Templates:** Automatically drafts professional cold emails and punchy LinkedIn connection requests tailored to the specific target company and job title.
* **Secure "1-Scan" Free Tier:** Implements strict user verification, persistent frontend state management, and backend rate-limiting to offer verified users exactly 1 high-quality free scan while protecting the AI engine from abuse.
* **Seamless Onboarding:** Features intelligent, zero-flash onboarding modals that manage user expectations regarding Beta features and scan limits, persisting seamlessly across sessions.

---

## 🛠️ Tech Stack Highlights

**Frontend**
* **Framework:** Next.js (App Router)
* **UI Components:** shadcn/ui
* **Styling & Animation:** Tailwind CSS, Framer Motion
* **Icons:** Lucide React

**Backend & Infrastructure**
* **API Architecture:** Next.js Route Handlers
* **Database:** PostgreSQL (Hosted on Neon Serverless)
* **ORM:** Prisma
* **File Storage:** Cloudinary (For scalable, secure PDF resume uploading)
* **Authentication & Security:** Better Auth (Handling verified sessions and persistent database storage)

**Artificial Intelligence**
* **Engine:** Google Generative AI 
* **Model:** `gemini-3-flash-preview` (Utilized for structured, typed JSON output, advanced reasoning, and sub-second generation speeds)
