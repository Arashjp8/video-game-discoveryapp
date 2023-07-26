import { HStack, Spacer, Text, useColorModeValue } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchBox from "./SearchBox";

interface NavBarProps {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: NavBarProps) => {
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

  return (
    <HStack
      as={"nav"}
      padding={"20px"}
      marginBottom={"10px"}
      gap={"10px"}
      alignItems={"center"}
    >
      <Text as={"h2"} fontSize={"2xl"} color={textColor}>
        LOGO
      </Text>
      <Spacer />
      <SearchBox onSearch={onSearch} />
      <Spacer />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
