import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface NavBarContainerProps {
  children: ReactNode;
  isOpen: boolean;
}

export const NavBarContainer: React.FC<NavBarContainerProps> = ({
  children,
  isOpen,
}) => {
  return (
    <Flex
      p={2}
      minW="17rem"
      flexDirection="column"
      h="100vh"
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      bgColor="white"
      position="sticky"
      top={0}
      boxShadow="xl"
    >
      {children}
    </Flex>
  );
};
