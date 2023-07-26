import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Genre from "../interfaces/Genre";
import ms from "ms";
// import genres from "../data/genres";

const apiClient = new APIClient<Genre>("/genres");

const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getALL,
    staleTime: ms("24h"),
    // initialData: genres,
  });
};

export default useGenres;
