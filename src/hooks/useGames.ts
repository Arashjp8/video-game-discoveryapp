import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import Game from "../interfaces/Game";
import APIClient, { FetchResponse } from "../services/api-client";
import { GameQuery } from "../App";

const apiClient = new APIClient<Game>("/games");

const useGames = (gameQuery: GameQuery) => {
  return useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery] as QueryKey,
    queryFn: ({ pageParam = 1 }) => {
      return apiClient.getALL({
        params: {
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      });
    },
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};

export default useGames;
