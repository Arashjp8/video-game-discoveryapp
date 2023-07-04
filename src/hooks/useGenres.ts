import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import FetchGenreResponse from "../interfaces/FetchGenreResponse";
import Genre from "../interfaces/Genre";
import { CanceledError } from "axios";

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreError, setGenreError] = useState("");
  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<FetchGenreResponse>("/genres", { signal: controller.signal })
      .then((res) => setGenres(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setGenreError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { genres, genreError };
};

export default useGenres;
