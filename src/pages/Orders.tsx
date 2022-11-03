import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/navbar/NavBar";
import Wrapper from "../components/ui/Wrapper";
import { NavLink as ReactLink } from "react-router-dom";

interface OrdersProps {}

export const Orders: React.FC<OrdersProps> = ({}) => {
  return (
    <Box>
      <Flex>
        <NavBar></NavBar>
        <Wrapper>
          <Outlet></Outlet>
        </Wrapper>
      </Flex>
    </Box>
  );
};
