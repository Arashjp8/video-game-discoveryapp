import { useQuery } from "@tanstack/react-query";
import Game from "../interfaces/Game";
import apiClient, { FetchResponse } from "../services/api-client";
import { GameQuery } from "../App";

const useGames = (gameQuery: GameQuery) => {
  return useQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: async () => {
      return await apiClient
        .get<FetchResponse<Game>>("/games", {
          params: {
            genres: gameQuery.genre?.id,
            parent_platforms: gameQuery.platform?.id,
            ordering: gameQuery.sortOrder,
            search: gameQuery.searchText,
          },
        })
        .then((res) => res.data);
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};

export default useGames;
