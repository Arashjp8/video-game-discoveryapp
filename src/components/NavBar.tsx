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
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Flex
      as={"nav"}
      padding={"10px"}
      marginBottom={"40px"}
      gap={"10px"}
      alignItems={"center"}
    >
      <NavLink to={"/"}>
        <Text as={"h2"} fontSize={"2xl"} color={"whiteAlpha.800"}>
          LOGO
        </Text>
      </NavLink>
      <Spacer />
      <InputGroup width={"80%"}>
        <InputLeftElement pointerEvents={"none"}>
          <Search2Icon />
        </InputLeftElement>
        <Input
          placeholder="search..."
          size={"lg"}
          background={"blackAlpha.400"}
          color={"whiteAlpha.700"}
          border={"none"}
        />
      </InputGroup>
      <HStack spacing={"20px"}>
        <Spacer />
        <Switch colorScheme="teal" size={"lg"} />
        <Icon marginRight={"10px"}>{<MoonIcon />}</Icon>
      </HStack>
    </Flex>
  );
};

export default NavBar;
