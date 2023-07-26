import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Genre from "../interfaces/Genre";
// import genres from "../data/genres";

const apiClient = new APIClient<Genre>("/genres");

const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getALL,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    // initialData: genres,
  });
};

export default useGenres;
