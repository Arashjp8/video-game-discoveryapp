import { useQuery } from "@tanstack/react-query";
import Game from "../interfaces/Game";
import apiClient from "../services/api-client";
import { FetchResponse } from "./useData";
import { GameQuery } from "../App";

const useGames = (gameQuery: GameQuery) => {
  // const [games, setGames] = useState<Game[]>([]);
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const controller = new AbortController();

  //   setIsLoading(true);
  //   apiClient
  //     .get<FetchGamesResponse>("/games", { signal: controller.signal })
  //     .then((res) => {
  //       let sortedGames = res.data.results;
  //       sortedGames = useSort(sortedGames, sortOption);
  //       setGames(sortedGames);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;
  //       setError(err.message);
  //       setIsLoading(false);
  //     });

  //   return () => controller.abort();
  // }, [sortOption]);

  // return { games, error, isLoading };
  return useQuery<FetchResponse<Game>, Error>({
    queryKey: ["games"],
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
