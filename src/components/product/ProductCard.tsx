import { Box } from "@chakra-ui/react";
import React from "react";

interface ProductCardProps {
  name: string;
  price: number;
  quantity: number;
  mainImg: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  quantity,
  mainImg,
}) => {
  return <Box></Box>;
};
