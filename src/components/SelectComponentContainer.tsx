import { VStack, Text, HStack, StackItem } from "@chakra-ui/react";
import SelectComponent from "./SelectComponent";

interface SelectComponentContainerProps {
  heading: string;
  setSortOption: (value: string) => void;
  setPlatformSelection: (value: string) => void;
}

const SelectComponentContainer = ({
  heading,
  setSortOption,
  setPlatformSelection,
}: SelectComponentContainerProps) => {
  const sortOptions = ["relevance", "name", "release-date", "rating"];

  return (
    <VStack
      flexDirection={"column"}
      alignItems={"flex-start"}
      paddingX={"10px"}
    >
      <Text fontSize={"4xl"} fontWeight={"700"}>
        {heading}
      </Text>
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
            <SelectComponent setPlatformSelection={setPlatformSelection} />
          </HStack>
        </StackItem>
      </HStack>
    </VStack>
  );
};

export default SelectComponentContainer;
