import { AnalyzeResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAnalysis = (id: string | null) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["analysis", { id }],
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<AnalyzeResponse> => {
      const response = await axios.get<AnalyzeResponse>(`/api/analysis/${id}`);

      return response.data;
    },
  });

  return query;
};
