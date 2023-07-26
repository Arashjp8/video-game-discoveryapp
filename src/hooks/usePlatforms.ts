import { useQuery } from "@tanstack/react-query";
import Platform from "../interfaces/Platform";
import APIClient from "../services/api-client";
// import platforms from "../data/platforms";

const apiClient = new APIClient<Platform>("/platforms/lists/parents");

const usePlatforms = () => {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.getALL,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    // initialData: {count: platforms.length, results: platforms}
  });
};

export default usePlatforms;
