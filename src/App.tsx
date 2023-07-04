import Main from "./pages/Main";
import NavBar from "./components/NavBar";
import { Grid, GridItem, Show, useColorModeValue } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import { useState } from "react";
import Game from "./interfaces/Game";
import useGames from "./hooks/useGames";
import useGenres from "./hooks/useGenres";

function App() {
  const [sortOption, setSortOption] = useState("");
  const { games, error, isLoading } = useGames({ sortOption });
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const { genres, genreError } = useGenres();
  const [heading, setHeading] = useState("");

  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

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
            color={textColor}
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
        <GridItem area={"main"} color={textColor} marginRight={5}>
          <Main
            games={games}
            error={error}
            isLoading={isLoading}
            filteredGames={filteredGames}
            setFilteredGames={setFilteredGames}
            setSortOption={setSortOption}
            heading={heading}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
