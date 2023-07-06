import { SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Game from "../interfaces/Game";
import GameCardContainer from "./CardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import CardComponent from "./CardComponent";
import SelectComponentContainer from "./SelectComponentContainer";
// import useGames from "../hooks/useGames";

interface GameGridProps {
  games: Game[];
  error: string;
  isLoading: boolean;
  filteredGames: Game[];
  setFilteredGames: (value: Game[]) => void;
  setSortOption: (value: string) => void;
  heading: string;
}

const GameGrid = ({
  games,
  error,
  isLoading,
  filteredGames,
  setFilteredGames,
  setSortOption,
  heading,
}: GameGridProps) => {
  const [platformSelection, setPlatformSelection] = useState("");

  const skeletons = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    if (platformSelection !== "all") {
      let filtered: Game[] = games.filter((game) =>
        game.parent_platforms.some(
          (platform) =>
            platform.platform.name.toLowerCase() ===
            platformSelection.toLowerCase()
        )
      );
      setFilteredGames(filtered);
    } else {
      setFilteredGames(games);
    }
  }, [platformSelection]);

  return (
    <>
      <SelectComponentContainer
        heading={heading}
        setSortOption={setSortOption}
        setPlatformSelection={setPlatformSelection}
      />
      <SimpleGrid
        marginTop={5}
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        spacing={3}
        padding={"10px"}
      >
        {error && <Text>{error}</Text>}
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {filteredGames &&
          filteredGames.map((game) => (
            <GameCardContainer key={game.id}>
              <CardComponent game={game} />
            </GameCardContainer>
          ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
