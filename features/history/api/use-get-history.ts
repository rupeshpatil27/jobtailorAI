import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface UseGetHistoryProps {
  search: string;
  filter: string;
}

export const useGetHistory = ({ search, filter }: UseGetHistoryProps) => {
  return useInfiniteQuery({
    queryKey: ["history", search, filter],
    queryFn: async ({ pageParam = "" }) => {
      const response = await axios.get("/api/history", {
        params: {
          search,
          filter,
          ...(pageParam ? { cursor: pageParam } : {}),
        },
      });

      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: "",
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};
