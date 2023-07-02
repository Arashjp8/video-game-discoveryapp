import { Flex, HStack, SimpleGrid, StackItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardComponent from "../components/CardComponent";
import SelectComponent from "../components/SelectComponent";
import Game from "../interfaces/Game";

interface ActionProps {
  games: Game[];
  filteredGames: Game[];
  setFilteredGames: (value: Game[]) => void;
  error: string;
  setSortOption: (value: string) => void;
}

const Action = ({
  games,
  filteredGames,
  setFilteredGames,
  error,
  setSortOption,
}: ActionProps) => {
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
        <Flex>
          <Text fontSize={"4xl"} fontWeight={"700"}>
            Action
          </Text>
        </Flex>
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

      <SimpleGrid marginTop={5} spacing={10} minChildWidth={"300px"}>
        {error && <Text>{error}</Text>}
        {filteredGames &&
          filteredGames.map((game) => (
            <CardComponent key={game.id} game={game} />
          ))}
      </SimpleGrid>
    </>
  );
};

export default Action;
