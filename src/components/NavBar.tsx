import { MoonIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Icon,
  Spacer,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

  return (
    <Flex
      as={"nav"}
      padding={"10px"}
      marginBottom={"40px"}
      gap={"10px"}
      alignItems={"center"}
    >
      <NavLink to={"/action"}>
        <Text as={"h2"} fontSize={"2xl"} color={textColor}>
          LOGO
        </Text>
      </NavLink>
      <Spacer />

      <HStack spacing={"20px"}>
        <Spacer />
        <Switch
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
          colorScheme="teal"
          size={"lg"}
        />
        <Icon marginRight={"10px"}>{<MoonIcon />}</Icon>
      </HStack>
    </Flex>
  );
};

export default NavBar;
