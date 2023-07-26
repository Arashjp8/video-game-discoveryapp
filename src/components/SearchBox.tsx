import { Search2Icon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";

interface SearchBoxProps {
  onSearch: (searchText: string) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800");
  const searchBoxBackgroundColor = useColorModeValue(
    "blackAlpha.200",
    "blackAlpha.300"
  );
  const searchBoxTextColor = useColorModeValue(
    "blackAlpha.600",
    "whiteAlpha.600"
  );

  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <InputGroup width={"100%"} marginRight={5} marginLeft={5}>
        <InputLeftElement paddingLeft={2} pointerEvents={"none"}>
          <Search2Icon color={textColor} />
        </InputLeftElement>
        <Input
          type="text"
          ref={ref}
          placeholder="search..."
          _placeholder={{ color: searchBoxTextColor }}
          size={"lg"}
          background={searchBoxBackgroundColor}
          color={searchBoxTextColor}
          border={"none"}
          borderRadius={25}
        />
      </InputGroup>
    </form>
  );
};

export default SearchBox;
