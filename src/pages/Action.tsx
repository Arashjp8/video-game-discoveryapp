import { Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Select,
  SimpleGrid,
  Spacer,
  StackItem,
  Text,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import CardComponent from "../components/CardComponent";

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

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const Action = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [platformSelection, setPlatformSelection] = useState("");

  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");
  const selectTextColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");
  const selectBackgroundColor = useColorModeValue(
    "blackAlpha.200",
    "blackAlpha.300"
  );

  const searchBoxTextColor = useColorModeValue(
    "blackAlpha.600",
    "whiteAlpha.600"
  );
  const searchBoxBackgroundColor = useColorModeValue(
    "blackAlpha.200",
    "blackAlpha.300"
  );

  const selectStyles = {
    ":hover": {
      color: "whiteAlpha.400",
      backgroundColor: "blackAlpha.500",
    },
  };

  const dateMergeSort = (array: Game[]): Game[] => {
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    const merge = (left: Game[], right: Game[]) => {
      let result = [];
      let i = 0;
      let j = 0;

      while (i < left.length && j < right.length) {
        if (new Date(left[i].released) > new Date(right[j].released)) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }

      while (i < left.length) {
        result.push(left[i]);
        i++;
      }

      while (j < right.length) {
        result.push(right[j]);
        j++;
      }

      return result;
    };

    return merge(dateMergeSort(left), dateMergeSort(right));
  };

  const nameQuickSort = (array: Game[]): Game[] => {
    if (array.length <= 1) {
      return array;
    }

    const pivot = array[Math.floor(array.length / 2)];
    const left: Game[] = [];
    const right: Game[] = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i].name < pivot.name) {
        left.push(array[i]);
      } else if (array[i].name > pivot.name) {
        right.push(array[i]);
      }
    }

    return [...nameQuickSort(left), pivot, ...nameQuickSort(right)];
  };

  const ratingQuickSort = (array: Game[]): Game[] => {
    if (array.length <= 1) {
      return array;
    }

    const pivot = array[Math.floor(array.length / 2)];
    const left: Game[] = [];
    const right: Game[] = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i].rating > pivot.rating) {
        left.push(array[i]);
      } else if (array[i].rating < pivot.rating) {
        right.push(array[i]);
      }
    }

    return [...ratingQuickSort(left), pivot, ...ratingQuickSort(right)];
  };

  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("/games")
      .then((res) => {
        let sortedGames = res.data.results;

        if (sortOption === "release-date") {
          sortedGames = dateMergeSort(sortedGames);
        }

        if (sortOption === "name") {
          sortedGames = nameQuickSort(sortedGames);
        }

        if (sortOption === "rating") {
          sortedGames = ratingQuickSort(sortedGames);
        }

        setGames(sortedGames);
      })
      .catch((err) => setError(err.message));
  }, [sortOption]);

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

          <InputGroup width={"50%"} marginRight={2}>
            <InputLeftElement pointerEvents={"none"}>
              <Search2Icon color={textColor} />
            </InputLeftElement>
            <Input
              type="text"
              onChange={(userInput) => {
                setSearchInput(userInput.target.value);
              }}
              value={searchInput}
              placeholder="search..."
              _placeholder={{ color: searchBoxTextColor }}
              size={"lg"}
              background={searchBoxBackgroundColor}
              color={searchBoxTextColor}
              border={"none"}
            />
          </InputGroup>
        </Flex>
        <HStack marginTop={4} textAlign={"center"}>
          <StackItem marginRight={2}>
            <HStack>
              <Text marginRight={1}>Order by:</Text>
              <Select
                sx={selectStyles}
                variant={"filled"}
                color={selectTextColor}
                backgroundColor={selectBackgroundColor}
                size={"sm"}
                borderRadius={"10px"}
                width={"144px"}
                onChange={(event) => setSortOption(event.target.value)}
              >
                <option defaultValue="random">Random</option>
                <option value="name">Name</option>
                <option value="release-date">Release date</option>
                <option value="rating">Rating</option>
              </Select>
            </HStack>
          </StackItem>
          <StackItem marginRight={2}>
            <HStack>
              <Text marginRight={1}>Platforms:</Text>
              <Select
                sx={selectStyles}
                variant={"filled"}
                color={selectTextColor}
                backgroundColor={selectBackgroundColor}
                size={"sm"}
                borderRadius={"10px"}
                width={"144px"}
                onChange={(userInput) =>
                  setPlatformSelection(userInput.target.value)
                }
              >
                <option value="all">All</option>
                <option value="pc">PC</option>
                <option value="xbox">Xbox</option>
                <option value="playstation">Playstation</option>
                <option value="linux">Linux</option>
              </Select>
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
