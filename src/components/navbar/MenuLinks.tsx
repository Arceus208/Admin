import { Box, Text, Icon, Flex } from "@chakra-ui/react";
import React from "react";
import { NavLink as ReactLink } from "react-router-dom";
import {
  AiFillShop,
  AiOutlineShoppingCart,
  AiFillProfile,
  AiFillGold,
  AiFillCalendar,
} from "react-icons/ai";

interface MenuLinksProps {}

export const MenuLinks: React.FC<MenuLinksProps> = () => {
  let bgColor = "teal";
  return (
    <Box mt={4} p={3}>
      <Flex flexDirection="column">
        <Text fontSize={23} color="grey">
          Dashboard
        </Text>
        <ReactLink to="/dashboard">
          {({ isActive }) => (
            <Flex
              align="center"
              _hover={{ backgroundColor: "lightcyan", borderRadius: "10px" }}
              my={2}
              py={4}
              px={3}
              style={
                isActive
                  ? {
                      backgroundColor: bgColor,
                      borderRadius: "10px",
                      color: "white",
                    }
                  : {}
              }
            >
              <Icon as={AiFillShop}></Icon>
              <Text ml={4} fontWeight={500}>
                Ecommerce
              </Text>
            </Flex>
          )}
        </ReactLink>
      </Flex>
      <Flex flexDirection="column">
        <Text fontSize={23} color="grey">
          Pages
        </Text>
        <ReactLink to="/orders">
          {({ isActive }) => (
            <Flex
              align="center"
              _hover={{ backgroundColor: "lightcyan", borderRadius: "10px" }}
              my={2}
              py={4}
              px={3}
              style={
                isActive
                  ? {
                      backgroundColor: bgColor,
                      borderRadius: "10px",
                      color: "white",
                    }
                  : {}
              }
            >
              <Icon as={AiOutlineShoppingCart}></Icon>
              <Text ml={4} fontWeight={500}>
                Order
              </Text>
            </Flex>
          )}
        </ReactLink>
        <ReactLink to="/customer">
          {({ isActive }) => (
            <Flex
              align="center"
              _hover={{ backgroundColor: "lightcyan", borderRadius: "10px" }}
              my={2}
              py={4}
              px={3}
              style={
                isActive
                  ? {
                      backgroundColor: bgColor,
                      borderRadius: "10px",
                      color: "white",
                    }
                  : {}
              }
            >
              <Icon as={AiFillProfile}></Icon>
              <Text ml={4} fontWeight={500}>
                Customer
              </Text>
            </Flex>
          )}
        </ReactLink>
        <ReactLink to="/products">
          {({ isActive }) => (
            <Flex
              align="center"
              _hover={{ backgroundColor: "lightcyan", borderRadius: "10px" }}
              my={2}
              py={4}
              px={3}
              style={
                isActive
                  ? {
                      backgroundColor: bgColor,
                      borderRadius: "10px",
                      color: "white",
                    }
                  : {}
              }
            >
              <Icon as={AiFillGold}></Icon>
              <Text ml={4} fontWeight={500}>
                Product
              </Text>
            </Flex>
          )}
        </ReactLink>
        <ReactLink to="/calendar">
          {({ isActive }) => (
            <Flex
              align="center"
              _hover={{ backgroundColor: "lightcyan", borderRadius: "10px" }}
              my={2}
              py={4}
              px={3}
              style={
                isActive
                  ? {
                      backgroundColor: bgColor,
                      borderRadius: "10px",
                      color: "white",
                    }
                  : {}
              }
            >
              <Icon as={AiFillCalendar}></Icon>
              <Text ml={4} fontWeight={500}>
                Calendar
              </Text>
            </Flex>
          )}
        </ReactLink>
      </Flex>
      <Flex flexDirection="column"></Flex>
    </Box>
  );
};
