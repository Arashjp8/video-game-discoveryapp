import {
  Card,
  Flex,
  HStack,
  Image,
  Select,
  SimpleGrid,
  Spacer,
  StackItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Game {
  id: number;
  name: string;
  rating: number;
  background_image: string;
  released: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");
  const selectTextColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");
  const selectBackgroundColor = useColorModeValue(
    "blackAlpha.200",
    "blackAlpha.300"
  );
  const cardBackgroundColor = useColorModeValue(
    "blackAlpha.200",
    "whiteAlpha.100"
  );

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
                color={selectTextColor}
                backgroundColor={selectBackgroundColor}
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
                color={selectTextColor}
                backgroundColor={selectBackgroundColor}
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
              backgroundColor={cardBackgroundColor}
              color={textColor}
              // height={"200px"}
              textAlign={"center"}
              borderRadius={"20px"}
              cursor={"pointer"}
              paddingBottom={2}
            >
              <Flex flexDirection={"column"}>
                <Image
                  height={"300px"}
                  objectFit={"cover"}
                  src={game.background_image}
                  borderRadius={"20px"}
                />
                <Text margin={2} fontSize={"2xl"} fontWeight={"bold"}>
                  {game.name}
                </Text>
                <Spacer />
                <Text fontSize={"large"}>Rating: {game.rating}</Text>
                <Spacer />
                <Text fontSize={"large"}>Released: {game.released}</Text>
              </Flex>
            </Card>
          ))}
      </SimpleGrid>
    </>
  );
};

export default Home;
