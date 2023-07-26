import { useQuery } from "@tanstack/react-query";
import Platform from "../interfaces/Platform";
import APIClient from "../services/api-client";
import ms from "ms";
// import platforms from "../data/platforms";

const apiClient = new APIClient<Platform>("/platforms/lists/parents");

const usePlatforms = () => {
  return useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.getALL,
    staleTime: ms("24h"),
    // initialData: platforms,
  });
};

export default usePlatforms;
