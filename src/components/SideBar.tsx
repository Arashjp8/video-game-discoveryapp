import { Flex, Image, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Game from "../interfaces/Game";
import useGenres from "../hooks/useGenres";
import getCroppedImageURL from "../services/image-url";
import Genre from "../interfaces/Genre";

interface SideBarProps {
  games: Game[];
  setFilteredGames: (value: Game[]) => void;
  heading: string;
  setHeading: (value: string) => void;
  onSelectGenre: (value: Genre) => void; //* mosh way
}

const SideBar = ({
  games,
  setFilteredGames,
  setHeading,
  onSelectGenre, //* mosh way
}: SideBarProps) => {
  const { data, error, isLoading } = useGenres();
  const [genreName, setGenreName] = useState("");

  useEffect(() => {
    const filtered = games.filter((game) =>
      game.genres.some((genre) => genre.name === genreName)
    );
    setFilteredGames(filtered);
    setHeading(genreName);
  }, [genreName, games]);

  if (error) return null;

  return (
    <List fontSize={"1.4em"} spacing={4}>
      {isLoading && <Spinner />}
      {data &&
        data.map((genre) => (
          <ListItem
            key={genre.id}
            cursor={"pointer"}
            onClick={(event) => {
              event.preventDefault();
              setGenreName(genre.name);
              onSelectGenre(genre); //* mosh way
            }}
          >
            <Flex justifyContent={"flex-start"} alignItems={"center"}>
              <Image
                boxSize="50px"
                borderRadius={10}
                src={getCroppedImageURL(genre.image_background)}
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
