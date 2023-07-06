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
      <InputGroup width={"100%"} marginRight={5} marginLeft={5}>
        <InputLeftElement paddingLeft={2} pointerEvents={"none"}>
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
          borderRadius={25}
        />
      </InputGroup>
    </>
  );
};

export default SearchBox;
