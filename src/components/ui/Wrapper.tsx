import React, { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Flex
      p={[5, 10, 20, 20]}
      flexDirection="column"
      bgColor="white"
      flexGrow={1}
      align="center"
    >
      {children}
    </Flex>
  );
};

export default Wrapper;
