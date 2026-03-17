import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

interface AnalyzePayload {
  formData: FormData;
  onProgress: (message: string) => void;
}

export const useCreateAnalyze = () => {
  const mutation = useMutation({
    mutationFn: async ({ formData, onProgress }: AnalyzePayload) => {
      let rollbackData: {
        cloudinaryPublicId: string;
        analysisId: string;
      } | null = null;

      try {
        onProgress("Uploading PDF and extracting text...");
        const uploadRes = await axios.post("/api/upload", formData);
        const {
          analysisId,
          pdfText,
          jobTitle,
          companyName,
          jobDescription,
          cloudinaryPublicId,
        } = uploadRes.data;

        rollbackData = { cloudinaryPublicId, analysisId };

        onProgress("Analyzing resume and finalizing report...");
        await axios.post("/api/analyze", {
          analysisId,
          jobTitle,
          companyName,
          jobDescription,
          pdfText,
        });

        return { analysisId };
      } catch (error) {
        if (rollbackData) {
          axios.post("/api/rollback", rollbackData).catch(console.error);
        }
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Analysis complete!");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Server connection failed.";
        toast.error(errorMessage);
      } else {
        toast.error(error.message || "An unexpected error occurred.");
      }
    },
  });

  return mutation;
};
