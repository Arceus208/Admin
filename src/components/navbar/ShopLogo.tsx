import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillShopping } from "react-icons/ai";
interface ShopLogoProps {}

export const ShopLogo: React.FC<ShopLogoProps> = () => {
  return (
    <Flex alignItems={"center"} p={3}>
      <Icon as={AiFillShopping}></Icon>
      <Text fontSize={20} fontWeight={500} ml={2}>
        Myshop
      </Text>
    </Flex>
  );
};
