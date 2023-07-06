import { SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Game from "../interfaces/Game";
import GameCardContainer from "./CardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import CardComponent from "./CardComponent";
import SelectComponentContainer from "./SelectComponentContainer";
import Genre from "../interfaces/Genre";

interface GameGridProps {
  games: Game[];
  error: string;
  isLoading: boolean;
  filteredGames: Game[] | null;
  setFilteredGames: (value: Game[]) => void;
  setSortOption: (value: string) => void;
  selectedGenre: Genre | null;
  heading: string;
}

const GameGrid = ({
  games,
  error,
  isLoading,
  filteredGames,
  setFilteredGames,
  setSortOption,
  selectedGenre,
  heading,
}: GameGridProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const skeletons = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    if (selectedPlatform !== "all") {
      let filtered: Game[] = games.filter((game) =>
        game.parent_platforms.some(
          (platform) =>
            platform.platform.name.toLowerCase() ===
            selectedPlatform.toLowerCase()
        )
      );
      setFilteredGames(filtered);
    } else {
      setFilteredGames(games);
    }
  }, [selectedPlatform]);

  useEffect(() => {
    if (filteredGames?.length === 0)
      if (selectedGenre) setFilteredGames(selectedGenre?.games);
      else setFilteredGames(games);
  });

  return (
    <>
      <SelectComponentContainer
        heading={heading}
        setSortOption={setSortOption}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        selectedGenre={selectedGenre}
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
