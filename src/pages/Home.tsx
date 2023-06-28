import {
  Card,
  Flex,
  HStack,
  Select,
  SimpleGrid,
  StackItem,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Game {
  id: number;
  name: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  const selectStyles = {
    ":hover": {
      color: "whiteAlpha.400",
      backgroundColor: "blackAlpha.500",
    },
  };

  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("/games")
      .then((res) => setGames(res.data.results))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <Flex flexDirection={"column"}>
        <Text fontSize={"4xl"} fontWeight={"700"}>
          HOME
        </Text>
        <HStack marginTop={4} textAlign={"center"}>
          <StackItem marginRight={2}>
            <HStack>
              <Text marginRight={1}>Order by:</Text>
              <Select
                sx={selectStyles}
                variant={"filled"}
                color={"whiteAlpha.600"}
                backgroundColor={"blackAlpha.300"}
                size={"sm"}
                borderRadius={"10px"}
                width={"144px"}
              >
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
                color={"whiteAlpha.600"}
                backgroundColor={"blackAlpha.300"}
                size={"sm"}
                borderRadius={"10px"}
                width={"144px"}
              >
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
        {games &&
          games.map((game) => (
            <Card
              key={game.id}
              backgroundColor={"whiteAlpha.100"}
              color={"whiteAlpha.800"}
              height={"200px"}
            >
              {game.name}
            </Card>
          ))}
      </SimpleGrid>
    </>
  );
};

export default Home;
