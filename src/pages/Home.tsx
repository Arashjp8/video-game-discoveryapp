import { SimpleGrid } from "@chakra-ui/react";
import { useLoaderData } from "react-router";

const Home = () => {
  const games = useLoaderData();
  return <SimpleGrid>HOME</SimpleGrid>;
};

export const gamesLoader = async () => {
  const res = await fetch("https://api.rawg.io/api/games");

  return res.json();
};

export default Home;
