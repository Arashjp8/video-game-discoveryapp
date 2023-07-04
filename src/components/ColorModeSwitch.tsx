import { MoonIcon } from "@chakra-ui/icons";
import { HStack, Icon, Switch, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack spacing={"20px"}>
      <Switch
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        colorScheme="teal"
        size={"lg"}
      />
      <Icon marginRight={"10px"}>{<MoonIcon />}</Icon>
    </HStack>
  );
};

export default ColorModeSwitch;
