import { SimpleGrid, Text } from "@chakra-ui/react";
import DefenitionItem from "./DefenitionItem";
import CriticScore from "./CriticScore";
import Game from "../interfaces/Game";

interface Props {
  game: Game;
}

const GameAttributes = ({ game }: Props) => {
  return (
    <SimpleGrid as="dl" columns={2}>
      <DefenitionItem term="Platforms">
        {game.parent_platforms?.map(({ platform }) => (
          <Text key={platform.id}>{platform.name}</Text>
        ))}
      </DefenitionItem>
      <DefenitionItem term="Metascore">
        <CriticScore score={game.metacritic} />
      </DefenitionItem>
      <DefenitionItem term="Genres">
        {game.genres.map((genre) => (
          <Text key={genre.id}>{genre.name}</Text>
        ))}
      </DefenitionItem>
      <DefenitionItem term="Publishers">
        {game.publishers?.map((publisher) => (
          <Text key={publisher.id}>{publisher.name}</Text>
        ))}
      </DefenitionItem>
    </SimpleGrid>
  );
};

export default GameAttributes;
