import {
  Card,
  Image,
  useColorModeValue,
  CardBody,
  Heading,
  HStack,
} from "@chakra-ui/react";
import Game from "../interfaces/Game";
import CriticScore from "./CriticScore";
import PlatformIconList from "./PlatformIconList";

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
        borderRadius={"20px"}
        overflow={"hidden"}
        cursor={"pointer"}
        paddingBottom={2}
      >
        <Image
          height={"300px"}
          objectFit={"cover"}
          src={game.background_image}
        />
        <CardBody>
          <Heading fontSize={"2xl"}>{game.name}</Heading>
          <HStack justifyContent={"space-between"}>
            <PlatformIconList
              platforms={game.parent_platforms?.map((p) => p.platform)}
            />
            <CriticScore score={game.metacritic} />
          </HStack>
        </CardBody>
        {/* <Flex flexDirection={"column"}>
          <Image
            height={"300px"}
            objectFit={"cover"}
            src={game.background_image}
            borderRadius={"20px"}
          />
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            margin={2}
          >
            <Text>
              {game.parent_platforms.map((platform) => (
                <Icon
                  key={platform.platform.id}
                  as={iconMap[platform.platform.slug]}
                  margin={1}
                  fontSize={"large"}
                />
              ))}
            </Text>
            <Spacer />
            <Text
              border={"1px solid"}
              borderColor={metacriticColor}
              color={metacriticColor}
              paddingLeft={2}
              paddingRight={2}
              borderRadius={"10px"}
              fontSize={"large"}
            >
              {" "}
              {game.metacritic}
            </Text>
          </Flex>
          <Flex marginLeft={2}>
            <Text fontSize={"3xl"} fontWeight={"semibold"}>
              {game.name}
            </Text>
          </Flex>
        </Flex> */}
      </Card>
    </>
  );
};

export default CardComponent;
