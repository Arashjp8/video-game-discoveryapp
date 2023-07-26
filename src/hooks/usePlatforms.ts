import { useQuery } from "@tanstack/react-query";
import Platform from "../interfaces/Platform";
import apiClient, { FetchResponse } from "../services/api-client";
// import platforms from "../data/platforms";

const usePlatforms = () => {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: async () => {
      return await apiClient
        .get<FetchResponse<Platform>>("/platforms/lists/parents")
        .then((res) => res.data);
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    // initialData: {count: platforms.length, results: platforms}
  });
};

export default usePlatforms;
