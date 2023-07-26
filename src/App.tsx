import GameGrid from "./components/GameGrid";
import NavBar from "./components/NavBar";
import { Grid, GridItem, Show, useColorModeValue } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import { useState } from "react";
import Game from "./interfaces/Game";
import useGames from "./hooks/useGames";
import Genre from "./interfaces/Genre";
import Platform from "./interfaces/Platform";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const [sortOption, setSortOption] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const { data, error, isLoading } = useGames(gameQuery);
  const [filteredGames, setFilteredGames] = useState<Game[] | undefined>([]);
  const [heading, setHeading] = useState("");

  const onSelectGenre = (genre: Genre): void => setSelectedGenre(genre);

  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

  return (
    <>
      <Grid
        templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
        templateColumns={{ base: "1fr", lg: "200px 1fr" }}
      >
        <GridItem area={"nav"}>
          <NavBar
            onSearch={(searchText) =>
              setGameQuery({ ...gameQuery, searchText })
            }
          />
        </GridItem>
        <Show above="lg">
          <GridItem
            area={"aside"}
            minHeight={{ lg: "100vh" }}
            color={textColor}
            paddingX={"20px"}
          >
            <SideBar
              games={data?.results}
              setFilteredGames={setFilteredGames}
              heading={heading}
              setHeading={setHeading}
              onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
              selectedGenre={gameQuery.genre}
            />
          </GridItem>
        </Show>
        <GridItem area={"main"} color={textColor} marginX={2}>
          <GameGrid
            games={data?.results}
            error={error?.message}
            isLoading={isLoading}
            filteredGames={filteredGames}
            setFilteredGames={setFilteredGames}
            setSortOption={setSortOption}
            selectedGenre={selectedGenre}
            heading={heading}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
