import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";

interface SmallCardProps {
  icon: any;
  headerText: string;
  contentText: string;
}

export const SmallCard: React.FC<SmallCardProps> = ({
  icon,
  headerText,
  contentText,
}) => {
  return (
    <Flex
      boxShadow="xl"
      p={["0.5rem", "0.5rem", "2rem"]}
      m="1rem"
      borderRadius={10}
      bgColor="teal"
      w={[100, 100, 200, 200]}
    >
      <Flex flexDirection="column" justifyContent="space-between">
        <Text color="white">{headerText}</Text>

        <Text
          fontSize={["1rem", "1rem", "2rem"]}
          fontWeight="bold"
          color="white"
        >
          {contentText}
        </Text>
      </Flex>
    </Flex>
  );
};
