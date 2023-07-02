import {
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  StackItem,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardComponent from "../components/CardComponent";
import SelectComponent from "../components/SelectComponent";
import SearchBox from "../components/SearchBox";

interface Platform {
  id: number;
  name: string;
  image_background: string;
}

interface Game {
  id: number;
  name: string;
  rating: number;
  background_image: string;
  released: string;
  parent_platforms: { platform: Platform }[];
}

interface ActionProps {
  games: Game[];
  error: string;
  setSortOption: (value: string) => void;
}

const Action = ({ games, error, setSortOption }: ActionProps) => {
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [platformSelection, setPlatformSelection] = useState("");

  const sortOptions = ["random", "name", "release-date", "rating"];
  const selectPlatformOptions = ["all", "pc", "xbox", "playstation", "linux"];

  useEffect(() => {
    if (searchInput.length === 0) {
      setFilteredGames(games);
    } else {
      let filtered: Game[] = games.filter((game) =>
        game.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  }, [searchInput, games]);

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
    console.log(filteredGames);
  }, [platformSelection]);

  return (
    <>
      <Flex flexDirection={"column"}>
        <Flex>
          <Text fontSize={"4xl"} fontWeight={"700"}>
            Action
          </Text>
          <Spacer />
          <SearchBox
            setSearchInput={setSearchInput}
            searchInput={searchInput}
          />
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
