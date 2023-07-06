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
  const sortOptions = ["random", "name", "release-date", "rating"];
  const selectPlatformOptions = ["all", "pc", "xbox", "playstation", "linux"];

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
            <SelectComponent
              setPlatformSelection={setPlatformSelection}
              options={selectPlatformOptions}
            />
          </HStack>
        </StackItem>
      </HStack>
    </VStack>
  );
};

export default SelectComponentContainer;
