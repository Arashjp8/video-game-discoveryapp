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
import Genre from "../interfaces/Genre";
import getCroppedImageURL from "../services/image-url";

interface SideBarProps {
  onSelectGenre: (value: Genre) => void;
  selectedGenreId?: number;
}

const SideBar = ({ onSelectGenre, selectedGenreId }: SideBarProps) => {
  const { data, error, isLoading } = useGenres();

  if (error) return null;

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
                onSelectGenre(genre);
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
