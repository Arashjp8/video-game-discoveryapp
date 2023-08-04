import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 300;

  if (!children) return null;

  if (children.length <= limit) return <Text>{children}</Text>;

  const summary = expanded ? children : children.substring(0, 300) + "...";

  return (
    <Text>
      {summary}
      <Button
        colorScheme="yellow"
        onClick={() => setExpanded(!expanded)}
        size={"xs"}
        marginLeft={1}
        fontWeight={"bold"}
      >
        {expanded ? "Show Less" : "Read More"}
      </Button>
    </Text>
  );
};

export default ExpandableText;
