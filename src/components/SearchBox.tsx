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
      <InputGroup>
        <InputLeftElement paddingLeft={2} pointerEvents={"none"}>
          <Search2Icon color={textColor} />
        </InputLeftElement>
        <Input
          type="text"
          ref={ref}
          placeholder="search..."
          _placeholder={{ color: searchBoxTextColor }}
          borderRadius={20}
          variant={"filled"}
        />
      </InputGroup>
    </form>
  );
};

export default SearchBox;
