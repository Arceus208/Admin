import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Box my={20} mx="auto" maxW={[250, 400, 700, 1000]}>
      {children}
    </Box>
  );
};

export default Wrapper;
