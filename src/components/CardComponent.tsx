import {
  Card,
  Flex,
  Image,
  Text,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";

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
  genres: Genre[];
}

interface Genre {
  id: number;
  name: string;
  image_background: string;
  games_count: number;
}

const CardComponent = ({ game }: { game: Game }) => {
  const cardBackgroundColor = useColorModeValue(
    "blackAlpha.200",
    "whiteAlpha.100"
  );
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

  return (
    <>
      <Card
        backgroundColor={cardBackgroundColor}
        color={textColor}
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
          <Spacer />
          <Text>
            {game.parent_platforms
              .map((platform) => platform.platform.name)
              .join(", ")}
          </Text>
        </Flex>
      </Card>
    </>
  );
};

export default CardComponent;
