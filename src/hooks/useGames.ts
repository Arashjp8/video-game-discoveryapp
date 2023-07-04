import { useEffect, useState } from "react";
import Game from "../interfaces/Game";
import FetchGamesResponse from "../interfaces/FetchGameResponse";
import apiClient from "../services/api-client";
import useSort from "./useSort";
import { CanceledError } from "axios";

interface useGameProps {
  sortOption: string;
}

const useGames = ({ sortOption }: useGameProps) => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<FetchGamesResponse>("/games", { signal: controller.signal })
      .then((res) => {
        let sortedGames = res.data.results;
        sortedGames = useSort(sortedGames, sortOption);
        setGames(sortedGames);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [sortOption]);

  return { games, error };
};

export default useGames;
