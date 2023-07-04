import Main from "./pages/Main";
import NavBar from "./components/NavBar";
import { Grid, GridItem, Show, useColorModeValue } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import apiClient from "./services/api-client";
import { useEffect, useState } from "react";
import Game from "./interfaces/Game";
import Genre from "./interfaces/Genre";
import FetchGenreResponse from "./interfaces/FetchGenreResponse";
import useGames from "./hooks/useGames";

function App() {
  const [sortOption, setSortOption] = useState("");
  const { games, error } = useGames({ sortOption });
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreError, setGenreError] = useState("");
  const [heading, setHeading] = useState("");

  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

  useEffect(() => {
    apiClient
      .get<FetchGenreResponse>("/genres")
      .then((res) => setGenres(res.data.results))
      .catch((err) => setGenreError(err.message));
  }, []);

  return (
    <>
      <Grid
        templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
      >
        <GridItem area={"nav"}>
          <NavBar games={games} setFilteredGames={setFilteredGames} />
        </GridItem>
        <Show above="lg">
          <GridItem
            area={"aside"}
            minHeight={{ lg: "100vh" }}
            colSpan={{ base: 6, lg: 2, xl: 1 }}
            color={textColor}
            // padding={{ base: "20px", lg: "30px" }}
          >
            <SideBar
              genres={genres}
              error={genreError}
              games={games}
              setFilteredGames={setFilteredGames}
              heading={heading}
              setHeading={setHeading}
            />
          </GridItem>
        </Show>
        <GridItem
          area={"main"}
          // colSpan={{ base: 6, lg: 4, xl: 5 }}
          color={textColor}
          // padding={"40px"}
        >
          <Main
            games={games}
            filteredGames={filteredGames}
            setFilteredGames={setFilteredGames}
            error={error}
            setSortOption={setSortOption}
            heading={heading}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
