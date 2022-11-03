import { Box } from "@chakra-ui/react";
import React from "react";

interface BackDropProps {}

export const BackDrop: React.FC<BackDropProps> = ({}) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      h="100vh"
      w="100vw"
      bgColor="rgba(0, 0, 0, 0.75)"
      zIndex={100}
    ></Box>
  );
};
