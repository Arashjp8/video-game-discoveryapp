import { Flex, Image, List, ListItem, Spacer, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";

interface Genre {
  id: number;
  name: string;
  image_background: string;
}

interface FetchGenreResponse {
  count: number;
  results: Genre[];
}

const SideBar = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchGenreResponse>("/genres")
      .then((res) => setGenres(res.data.results))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <List fontSize={"1.4em"} spacing={4} margin={"20px"}>
      {/* <ListItem>
        <NavLink to={"/"}>Home</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to={"/reviews"}>Reviews</NavLink>
      </ListItem>
      <ListItem>
        <NavLink to={"/newreleases"}>New Releases</NavLink>
      </ListItem> */}
      {error && <Text>{error}</Text>}
      {genres &&
        genres.map((genre) => (
          <ListItem key={genre.id} cursor={"pointer"}>
            <Flex justifyContent={"flex-start"} alignItems={"center"}>
              <Image
                height={"50px"}
                width={"50px"}
                borderRadius={"10px"}
                src={genre.image_background}
                objectFit={"cover"}
              />
              <Text marginLeft={2}>{genre.name}</Text>
            </Flex>
          </ListItem>
        ))}
    </List>
  );
};

export default SideBar;
