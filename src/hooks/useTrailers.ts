import { useQuery } from "@tanstack/react-query";
import { Trailer } from "../interfaces/Trailer";
import APIClient from "../services/api-client";

const useTrailers = (gameId: number) => {
  const apiClient = new APIClient<Trailer>(`/games/${gameId}/movies`);
  return useQuery({
    queryKey: ["trailers", gameId],
    queryFn: apiClient.getALL,
  });
};

export default useTrailers;
