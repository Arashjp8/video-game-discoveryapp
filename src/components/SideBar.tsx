import { Flex, Image, List, ListItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Game from "../interfaces/Game";
import Genre from "../interfaces/Genre";

interface SideBarProps {
  genres: Genre[];
  error: string;
  games: Game[];
  setFilteredGames: (value: Game[]) => void;
  heading: string;
  setHeading: (value: string) => void;
}

const SideBar = ({
  genres,
  error,
  games,
  setFilteredGames,
  setHeading,
}: SideBarProps) => {
  const [genreName, setGenreName] = useState("");

  useEffect(() => {
    const filtered = games.filter((game) =>
      game.genres.some((genre) => genre.name === genreName)
    );
    setFilteredGames(filtered);
    setHeading(genreName);
  }, [genreName, games]);

  return (
    <List fontSize={"1.4em"} spacing={4} margin={"20px"}>
      {error && <Text>{error}</Text>}
      {genres &&
        genres.map((genre) => (
          <ListItem
            key={genre.id}
            cursor={"pointer"}
            onClick={(event) => {
              event.preventDefault();
              setGenreName(genre.name);
            }}
          >
            <Flex justifyContent={"flex-start"} alignItems={"center"}>
              <Image
                height={"50px"}
                width={"50px"}
                borderRadius={"10px"}
                src={genre.image_background}
                objectFit={"cover"}
              />
              <Text marginLeft={4}>{genre.name}</Text>
            </Flex>
          </ListItem>
        ))}
    </List>
  );
};

export default SideBar;
