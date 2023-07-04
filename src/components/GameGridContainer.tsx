import { HStack, StackItem, Text, VStack } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import SelectComponent from "./SelectComponent";
import Game from "../interfaces/Game";

interface MainProps {
  games: Game[];
  filteredGames: Game[];
  setFilteredGames: (value: Game[]) => void;
  setSortOption: (value: string) => void;
  heading: string;
  children: ReactNode;
}

const Main = ({
  games,
  setFilteredGames,
  setSortOption,
  heading,
  children,
}: MainProps) => {
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
      <VStack flexDirection={"column"} alignItems={"flex-start"}>
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
      {children}
    </>
  );
};

export default Main;
