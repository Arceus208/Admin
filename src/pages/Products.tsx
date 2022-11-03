import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/navbar/NavBar";
import Wrapper from "../components/ui/Wrapper";
import { NavLink as ReactLink } from "react-router-dom";

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = () => {
  return (
    <Box>
      <Flex>
        <NavBar></NavBar>
        <Wrapper>
          <Text fontSize={30} mb={10} fontWeight="bold">
            Products
          </Text>
          <Flex mb={10}>
            <Button colorScheme="teal" mx={2}>
              <ReactLink to="/products/all">All Product</ReactLink>
            </Button>
            <Button colorScheme="teal" mx={2}>
              <ReactLink to="/products/new">+ New Product</ReactLink>
            </Button>
          </Flex>

          <Outlet></Outlet>
        </Wrapper>
      </Flex>
    </Box>
  );
};
