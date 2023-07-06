import GameGrid from "./components/GameGrid";
import NavBar from "./components/NavBar";
import { Grid, GridItem, Show, useColorModeValue } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import { useState } from "react";
import Game from "./interfaces/Game";
import useGames from "./hooks/useGames";
import Genre from "./interfaces/Genre";

function App() {
  const [sortOption, setSortOption] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null); //* mosh way
  const { data, error, isLoading } = useGames(selectedGenre); // sortOption used to go in there
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [heading, setHeading] = useState("");

  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

  return (
    <>
      <Grid
        templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
        templateColumns={{ base: "1fr", lg: "200px 1fr" }}
      >
        <GridItem area={"nav"}>
          <NavBar games={data} setFilteredGames={setFilteredGames} />
        </GridItem>
        <Show above="lg">
          <GridItem
            area={"aside"}
            minHeight={{ lg: "100vh" }}
            color={textColor}
            paddingX={"20px"}
          >
            <SideBar
              games={data}
              setFilteredGames={setFilteredGames}
              heading={heading}
              setHeading={setHeading}
              onSelectGenre={(genre) => setSelectedGenre(genre)}
            />
          </GridItem>
        </Show>
        <GridItem area={"main"} color={textColor} marginX={2}>
          <GameGrid
            games={data}
            error={error}
            isLoading={isLoading}
            filteredGames={filteredGames}
            setFilteredGames={setFilteredGames}
            setSortOption={setSortOption}
            heading={heading}
            selectedGenre={selectedGenre}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
