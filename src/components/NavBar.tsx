import { MoonIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
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
  const inputTextColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");
  const searchBoxBackgroundColor = useColorModeValue(
    "blackAlpha.200",
    "blackAlpha.300"
  );

  return (
    <Flex
      as={"nav"}
      padding={"10px"}
      marginBottom={"40px"}
      gap={"10px"}
      alignItems={"center"}
    >
      <NavLink to={"/"}>
        <Text as={"h2"} fontSize={"2xl"} color={textColor}>
          LOGO
        </Text>
      </NavLink>
      <Spacer />
      <InputGroup width={"80%"}>
        <InputLeftElement pointerEvents={"none"}>
          <Search2Icon color={textColor} />
        </InputLeftElement>
        <Input
          placeholder="search..."
          size={"lg"}
          background={searchBoxBackgroundColor}
          color={inputTextColor}
          border={"none"}
        />
      </InputGroup>
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
