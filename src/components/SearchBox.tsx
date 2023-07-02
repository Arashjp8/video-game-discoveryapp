import { Search2Icon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";

interface SearchBoxProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
}

const SearchBox = ({ searchInput, setSearchInput }: SearchBoxProps) => {
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");
  const searchBoxBackgroundColor = useColorModeValue(
    "blackAlpha.200",
    "blackAlpha.300"
  );
  const searchBoxTextColor = useColorModeValue(
    "blackAlpha.600",
    "whiteAlpha.600"
  );

  return (
    <>
      <InputGroup width={"50%"} marginRight={2}>
        <InputLeftElement pointerEvents={"none"}>
          <Search2Icon color={textColor} />
        </InputLeftElement>
        <Input
          type="text"
          onChange={(userInput) => {
            setSearchInput(userInput.target.value);
          }}
          value={searchInput}
          placeholder="search..."
          _placeholder={{ color: searchBoxTextColor }}
          size={"lg"}
          background={searchBoxBackgroundColor}
          color={searchBoxTextColor}
          border={"none"}
        />
      </InputGroup>
    </>
  );
};

export default SearchBox;
