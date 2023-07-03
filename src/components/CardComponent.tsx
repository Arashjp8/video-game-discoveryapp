import {
  Card,
  Flex,
  Image,
  Text,
  Spacer,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import Game from "../interfaces/Game";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { IconType } from "react-icons";

const CardComponent = ({ game }: { game: Game }) => {
  const cardBackgroundColor = useColorModeValue(
    "blackAlpha.200",
    "whiteAlpha.100"
  );
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };

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
            {game.parent_platforms.map((platform) => (
              <Icon
                key={platform.platform.id}
                as={iconMap[platform.platform.slug]}
                margin={1}
              />
            ))}
          </Text>
        </Flex>
      </Card>
    </>
  );
};

export default CardComponent;
