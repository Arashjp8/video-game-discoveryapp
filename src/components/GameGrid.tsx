import { SimpleGrid, Text } from "@chakra-ui/react";
import GameCardContainer from "./CardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import CardComponent from "./CardComponent";
import Game from "../interfaces/Game";

interface GameGridProps {
  error: string;
  isLoading: boolean;
  filteredGames: Game[];
}

const GameGrid = ({ error, isLoading, filteredGames }: GameGridProps) => {
  const skeletons = [1, 2, 3, 4, 5, 6];
  return (
    <SimpleGrid
      marginTop={5}
      columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
      spacing={10}
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
  );
};

export default GameGrid;
