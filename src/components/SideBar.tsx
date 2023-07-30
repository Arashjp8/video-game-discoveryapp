import {
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImageURL from "../services/image-url";
import useGameQueryStore from "../store";

const SideBar = () => {
  const { data, error, isLoading } = useGenres();

  if (error) return null;

  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId);

  return (
    <>
      <Heading fontSize={"2xl"} marginBottom={3}>
        Genres
      </Heading>
      <List fontSize={"1.4em"} spacing={4}>
        {isLoading && <Spinner />}
        {data &&
          data?.results.map((genre) => (
            <ListItem
              key={genre.id}
              cursor={"pointer"}
              onClick={() => {
                setSelectedGenreId(genre.id);
              }}
            >
              <Flex justifyContent={"flex-start"} alignItems={"center"}>
                <Image
                  boxSize="50px"
                  borderRadius={10}
                  src={getCroppedImageURL(genre.image_background)}
                  objectFit={"cover"}
                />
                <Text
                  fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
                  marginLeft={4}
                >
                  {genre.name}
                </Text>
              </Flex>
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default SideBar;
