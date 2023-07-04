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
import getCroppedImageURL from "../services/image-url";

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
      >
        <Image src={getCroppedImageURL(game.background_image)} />
        <CardBody>
          <Heading fontSize={"2xl"}>{game.name}</Heading>
          <HStack justifyContent={"space-between"}>
            <PlatformIconList
              platforms={game.parent_platforms?.map((p) => p.platform)}
            />
            <CriticScore score={game.metacritic} />
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};

export default CardComponent;
