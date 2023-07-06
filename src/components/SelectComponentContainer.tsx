import { VStack, Text, HStack, StackItem, Heading } from "@chakra-ui/react";
import SelectComponent from "./SelectComponent";
import Genre from "../interfaces/Genre";

interface SelectComponentContainerProps {
  heading: string;
  setSortOption: (value: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (value: string) => void;
  selectedGenre: Genre | null;
}

const SelectComponentContainer = ({
  heading,
  setSortOption,
  selectedPlatform,
  setSelectedPlatform,
  selectedGenre,
}: SelectComponentContainerProps) => {
  const sortOptions = ["relevance", "name", "release-date", "rating"];
  heading = `${selectedGenre?.name || ""} ${selectedPlatform || ""} Games`;

  return (
    <VStack
      flexDirection={"column"}
      alignItems={"flex-start"}
      paddingX={"10px"}
    >
      <Heading as={"h1"} fontWeight={"700"}>
        {heading}
      </Heading>
      <HStack marginTop={4} textAlign={"center"}>
        <StackItem marginRight={2}>
          <HStack>
            <Text marginRight={1}>Order by:</Text>
            <SelectComponent
              setSortOption={setSortOption}
              options={sortOptions}
            />
          </HStack>
        </StackItem>
        <StackItem marginRight={2}>
          <HStack>
            <Text marginRight={1}>Platforms:</Text>
            <SelectComponent setSelectedPlatform={setSelectedPlatform} />
          </HStack>
        </StackItem>
      </HStack>
    </VStack>
  );
};

export default SelectComponentContainer;
