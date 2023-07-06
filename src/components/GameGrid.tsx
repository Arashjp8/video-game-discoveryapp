import { HStack, SimpleGrid, StackItem, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SelectComponent from "./SelectComponent";
import Game from "../interfaces/Game";
import Genre from "../interfaces/Genre";
import GameCardContainer from "./CardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import CardComponent from "./CardComponent";
// import useGames from "../hooks/useGames";

interface GameGridProps {
  games: Game[];
  error: string;
  isLoading: boolean;
  filteredGames: Game[];
  setFilteredGames: (value: Game[]) => void;
  setSortOption: (value: string) => void;
  heading: string;
  selectedGenre: Genre | null;
}

const GameGrid = ({
  games,
  error,
  isLoading,
  filteredGames,
  setFilteredGames,
  setSortOption,
  heading,
  selectedGenre,
}: GameGridProps) => {
  const [platformSelection, setPlatformSelection] = useState("");

  const sortOptions = ["random", "name", "release-date", "rating"];
  const selectPlatformOptions = ["all", "pc", "xbox", "playstation", "linux"];
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
      <VStack
        flexDirection={"column"}
        alignItems={"flex-start"}
        paddingX={"10px"}
      >
        <Text fontSize={"4xl"} fontWeight={"700"}>
          {heading}
        </Text>
        <HStack marginTop={4} textAlign={"center"}>
          <StackItem marginRight={2}>
            <HStack>
              <Text marginRight={1}>Order by:</Text>
              <SelectComponent
                setSortOption={setSortOption}
                options={sortOptions}
              />
            </HStack>
          </StackItem>
          <StackItem marginRight={2}>
            <HStack>
              <Text marginRight={1}>Platforms:</Text>
              <SelectComponent
                setPlatformSelection={setPlatformSelection}
                options={selectPlatformOptions}
              />
            </HStack>
          </StackItem>
        </HStack>
      </VStack>
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
        {games &&
          games.map((game) => (
            <GameCardContainer key={game.id}>
              <CardComponent game={game} />
            </GameCardContainer>
          ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
