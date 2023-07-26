import { QueryKey, useQuery } from "@tanstack/react-query";
import Game from "../interfaces/Game";
import APIClient, { FetchResponse } from "../services/api-client";
import { GameQuery } from "../App";

const apiClient = new APIClient<Game>("/games");

const useGames = (gameQuery: GameQuery) => {
  return useQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery] as QueryKey,
    queryFn: () => {
      return apiClient.getALL({
        params: {
          genres: gameQuery.genre?.id,
          parent_platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
        },
      });
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};

export default useGames;
