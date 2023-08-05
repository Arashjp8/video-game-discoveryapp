import { HStack, Text, useColorModeValue } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";

const NavBar = () => {
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

  return (
    <HStack padding={"10px"} justifyContent={"space-between"}>
      <Link to="/">
        <Text as={"h2"} fontSize={"2xl"} color={textColor}>
          LOGO
        </Text>
      </Link>
      <SearchBox />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
