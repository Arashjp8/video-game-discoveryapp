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
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import Game from "../interfaces/Game";

interface NavBarProps {
  games: Game[];
  setFilteredGames: (value: Game[]) => void;
}

const NavBar = ({ games, setFilteredGames }: NavBarProps) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [searchInput, setSearchInput] = useState("");
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

  useEffect(() => {
    if (searchInput.length === 0) {
      setFilteredGames(games);
    } else {
      let filtered: Game[] = games.filter((game) =>
        game.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  }, [searchInput, games]);

  return (
    <Flex
      as={"nav"}
      padding={"10px"}
      marginBottom={"40px"}
      gap={"10px"}
      alignItems={"center"}
    >
      <Text as={"h2"} fontSize={"2xl"} color={textColor}>
        LOGO
      </Text>
      <Spacer />

      <SearchBox setSearchInput={setSearchInput} searchInput={searchInput} />

      <Spacer />
      <HStack spacing={"20px"}>
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
