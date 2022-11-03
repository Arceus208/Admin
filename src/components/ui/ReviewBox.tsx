import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface ReviewBoxProps {
  text: string;
  value: number;
}

export const ReviewBox: React.FC<ReviewBoxProps> = ({ text, value }) => {
  return (
    <Box>
      <Text>{text}</Text>
      <Text fontSize="5rem">{value}</Text>
    </Box>
  );
};
