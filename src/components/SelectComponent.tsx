import { Select, useColorModeValue } from "@chakra-ui/react";

interface selectComponentProps {
  setSortOption?: (value: string) => void;
  setPlatformSelection?: (value: string) => void;
  options: string[];
}

// interface Options {
//   sortOptions?: string[];
//   selectPlatformOptions?: string[];
// }

const SelectComponent = ({
  setSortOption,
  setPlatformSelection,
  options,
}: selectComponentProps) => {
  const selectStyles = {
    ":hover": {
      color: "whiteAlpha.400",
      backgroundColor: "blackAlpha.500",
    },
  };
  const selectTextColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");
  const selectBackgroundColor = useColorModeValue(
    "blackAlpha.200",
    "blackAlpha.300"
  );

  return (
    <>
      <Select
        sx={selectStyles}
        variant={"filled"}
        color={selectTextColor}
        backgroundColor={selectBackgroundColor}
        size={"sm"}
        borderRadius={"10px"}
        width={"144px"}
        onChange={(userInput) => {
          if (setSortOption) setSortOption(userInput.target.value);
          if (setPlatformSelection)
            setPlatformSelection(userInput.target.value);
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectComponent;
