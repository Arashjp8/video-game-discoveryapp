import { Flex, Spacer, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import Game from "../interfaces/Game";
import ColorModeSwitch from "./ColorModeSwitch";
import Genre from "../interfaces/Genre";

interface NavBarProps {
  games: Game[] | undefined;
  setFilteredGames: (value: Game[] | undefined) => void;
  onSelectGenre: (value: Genre) => void;
}

const NavBar = ({ games, setFilteredGames, onSelectGenre }: NavBarProps) => {
  const [searchInput, setSearchInput] = useState("");
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");

  useEffect(() => {
    if (searchInput.length === 0) {
      setFilteredGames(games);
    } else {
      let filtered: Game[] | undefined = games?.filter((game) =>
        game.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  }, [searchInput, games]);

  return (
    <Flex
      as={"nav"}
      padding={"20px"}
      marginBottom={"10px"}
      gap={"10px"}
      alignItems={"center"}
    >
      <Text
        as={"h2"}
        fontSize={"2xl"}
        color={textColor}
        cursor={"pointer"}
        onClick={(event) => {
          event.preventDefault();
          onSelectGenre({
            id: 0,
            name: "",
            image_background: "",
            games_count: 0,
            games: [],
          });
          setFilteredGames(games);
        }}
      >
        LOGO
      </Text>
      <Spacer />
      <SearchBox setSearchInput={setSearchInput} searchInput={searchInput} />
      <Spacer />
      <ColorModeSwitch />
    </Flex>
  );
};

export default NavBar;
