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

  const metacriticColor = game.metacritic > 85 ? "green.500" : "red.500";

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
        </Flex>
      </Card>
    </>
  );
};

export default CardComponent;
