import { Flex, HStack, SimpleGrid, StackItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardComponent from "../components/CardComponent";
import SelectComponent from "../components/SelectComponent";
import Game from "../interfaces/Game";
import GameCardSkeleton from "../components/GameCardSkeleton";

interface MainProps {
  games: Game[];
  error: string;
  isLoading: boolean;
  filteredGames: Game[];
  setFilteredGames: (value: Game[]) => void;
  setSortOption: (value: string) => void;
  heading: string;
}

const Main = ({
  games,
  error,
  isLoading,
  filteredGames,
  setFilteredGames,
  setSortOption,
  heading,
}: MainProps) => {
  const skeletons = [1, 2, 3, 4, 5, 6];
  const [platformSelection, setPlatformSelection] = useState("");

  const sortOptions = ["random", "name", "release-date", "rating"];
  const selectPlatformOptions = ["all", "pc", "xbox", "playstation", "linux"];

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
      <Flex flexDirection={"column"}>
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
      </Flex>

      <SimpleGrid
        marginTop={5}
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        spacing={10}
        padding={"10px"}
      >
        {error && <Text>{error}</Text>}
        {isLoading &&
          skeletons.map((skeleton) => <GameCardSkeleton key={skeleton} />)}
        {filteredGames &&
          filteredGames.map((game) => (
            <CardComponent key={game.id} game={game} />
          ))}
      </SimpleGrid>
    </>
  );
};

export default Main;
