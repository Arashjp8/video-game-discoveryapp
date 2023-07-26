import { Select, useColorModeValue } from "@chakra-ui/react";
import usePlatforms from "../hooks/usePlatforms";

interface selectComponentProps {
  setSortOption?: (value: string) => void;
  setSelectedPlatform?: (value: string) => void;
  options?: string[] | null;
}

const SelectComponent = ({
  setSortOption,
  setSelectedPlatform,
  options,
}: selectComponentProps) => {
  const { data, error } = usePlatforms();

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

  if (error) return null;

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
          if (setSelectedPlatform) setSelectedPlatform(userInput.target.value);
        }}
      >
        <option defaultValue={""}></option>
        {setSelectedPlatform &&
          data?.results.map((platform) => (
            <option key={platform.id} value={platform.name}>
              {platform.name}
            </option>
          ))}

        {setSortOption &&
          options &&
          options.map((option) => <option key={option}>{option}</option>)}
      </Select>
    </>
  );
};

export default SelectComponent;
