import Action from "./pages/Action";
import NavBar from "./components/NavBar";
import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import apiClient from "./services/api-client";
import { useEffect, useState } from "react";
import useSort from "./hooks/useSort";

interface Platform {
  id: number;
  name: string;
  image_background: string;
}

interface Game {
  id: number;
  name: string;
  rating: number;
  background_image: string;
  released: string;
  parent_platforms: { platform: Platform }[];
  genres: Genre[];
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

interface Genre {
  id: number;
  name: string;
  image_background: string;
  games_count: number;
}

interface FetchGenreResponse {
  count: number;
  results: Genre[];
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreError, setGenreError] = useState("");

  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

  useEffect(() => {
    apiClient
      .get<FetchGenreResponse>("/genres")
      .then((res) => setGenres(res.data.results))
      .catch((err) => setGenreError(err.message));
  }, []);

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

  return (
    <>
      <Grid templateColumns={"repeat(6, 1fr)"}>
        <GridItem
          as={"aside"}
          minHeight={{ lg: "100vh" }}
          colSpan={{ base: 6, lg: 2, xl: 1 }}
          color={textColor}
          padding={{ base: "20px", lg: "30px" }}
        >
          <SideBar
            genres={genres}
            error={genreError}
            games={games}
            setFilteredGames={setFilteredGames}
          />
        </GridItem>
        <GridItem
          as={"main"}
          colSpan={{ base: 6, lg: 4, xl: 5 }}
          color={textColor}
          padding={"40px"}
        >
          <NavBar games={games} setFilteredGames={setFilteredGames} />
          <Action
            games={games}
            filteredGames={filteredGames}
            setFilteredGames={setFilteredGames}
            error={error}
            setSortOption={setSortOption}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
