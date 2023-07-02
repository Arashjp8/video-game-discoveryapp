import Action from "./pages/Action";
import NavBar from "./components/NavBar";
import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import apiClient from "./services/api-client";
import { useEffect, useState } from "react";

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
      .get<FetchGamesResponse>("/games")
      .then((res) => {
        let sortedGames = res.data.results;

        if (sortOption === "release-date") {
          sortedGames = dateMergeSort(sortedGames);
        }

        if (sortOption === "name") {
          sortedGames = nameQuickSort(sortedGames);
        }

        if (sortOption === "rating") {
          sortedGames = ratingQuickSort(sortedGames);
        }

        setGames(sortedGames);
      })
      .catch((err) => setError(err.message));
  }, [sortOption]);

  useEffect(() => {
    apiClient
      .get<FetchGenreResponse>("/genres")
      .then((res) => setGenres(res.data.results))
      .catch((err) => setGenreError(err.message));
  }, []);

  const dateMergeSort = (array: Game[]): Game[] => {
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    const merge = (left: Game[], right: Game[]) => {
      let result = [];
      let i = 0;
      let j = 0;

      while (i < left.length && j < right.length) {
        if (new Date(left[i].released) > new Date(right[j].released)) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }

      while (i < left.length) {
        result.push(left[i]);
        i++;
      }

      while (j < right.length) {
        result.push(right[j]);
        j++;
      }

      return result;
    };

    return merge(dateMergeSort(left), dateMergeSort(right));
  };

  const nameQuickSort = (array: Game[]): Game[] => {
    if (array.length <= 1) {
      return array;
    }

    const pivot = array[Math.floor(array.length / 2)];
    const left: Game[] = [];
    const right: Game[] = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i].name < pivot.name) {
        left.push(array[i]);
      } else if (array[i].name > pivot.name) {
        right.push(array[i]);
      }
    }

    return [...nameQuickSort(left), pivot, ...nameQuickSort(right)];
  };

  const ratingQuickSort = (array: Game[]): Game[] => {
    if (array.length <= 1) {
      return array;
    }

    const pivot = array[Math.floor(array.length / 2)];
    const left: Game[] = [];
    const right: Game[] = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i].rating > pivot.rating) {
        left.push(array[i]);
      } else if (array[i].rating < pivot.rating) {
        right.push(array[i]);
      }
    }

    return [...ratingQuickSort(left), pivot, ...ratingQuickSort(right)];
  };

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
