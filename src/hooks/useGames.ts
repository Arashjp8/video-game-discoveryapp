import { useEffect, useState } from "react";
import Game from "../interfaces/Game";
import FetchGamesResponse from "../interfaces/FetchGameResponse";
import apiClient from "../services/api-client";
import useSort from "./useSort";

interface useGameProps {
  sortOption: string;
}

const useGames = ({ sortOption }: useGameProps) => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("/games")
      .then((res) => {
        let sortedGames = res.data.results;
        sortedGames = useSort(sortedGames, sortOption);
        setGames(sortedGames);
      })
      .catch((err) => setError(err.message));
  }, [sortOption]);

  return { games, error };
};

export default useGames;
