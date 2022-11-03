import { Box, Flex, Text, Image } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR, { Fetcher } from "swr";
import { NavBar } from "../components/navbar/NavBar";
import Wrapper from "../components/ui/Wrapper";
import { axiosPublic } from "../utils/axiosPublic";

interface IOrder {
  id: string;
  status: string;
  items: {
    quantity: number;
    price: number;
    image: string;
    name: string;
  }[];
  totalPrice: number;

  customerName: String;
  shippingAddress: {
    city: string;
    postnumber: string;
    street: string;
    country: string;
  };
  customerEmail: string;
  createAt: string;
}

export const Order: React.FC<{}> = () => {
  const { orderId } = useParams();

  const fetcher: Fetcher<IOrder, string> = (url: string) =>
    axiosPublic.get(url).then((res) => res.data.order);

  const { data, error } = useSWR(`/order/${orderId}`, fetcher);

  return (
    <Flex>
      {data && !error && (
        <Flex
          w={[300, 500, 700, 700]}
          p={10}
          flexDirection="column"
          boxShadow="xl"
        >
          <Box>
            <Text fontWeight="bold" fontSize={20} mb={4}>
              Order info
            </Text>
            <Text fontWeight="bold">OrderId:</Text>
            <Text>{data.id}</Text>
            <Text fontWeight="bold">Customer email:</Text>
            <Text>{data.customerEmail}</Text>
            <Text fontWeight="bold">Order date:</Text>
            <Text>{data.createAt.slice(0, 10)}</Text>
            <Text fontWeight="bold">Total price:</Text>
            <Text>{data.totalPrice}&euro;</Text>
          </Box>
          <Box mt={4}>
            <Text fontWeight="bold" fontSize={20}>
              Order items:
            </Text>
            {data.items.map((item: any, index: number) => (
              <Flex key={index} mt={5} justifyContent="space-between">
                <Flex>
                  <Box mr={4}>
                    <Image
                      src={item.image}
                      alt="pic"
                      h={[50, 50, 50, 50]}
                      w={[50, 50, 50, 50]}
                      fit="contain"
                    ></Image>
                  </Box>
                  <Box>
                    <Text>{item.name}</Text>
                    <Text fontSize={13} color="grey">
                      Amount: {item.quantity}
                    </Text>
                  </Box>
                </Flex>
                <Box>
                  <Text>{item.price}&euro; </Text>
                </Box>
              </Flex>
            ))}
          </Box>
          <Box mt={4}>
            <Text fontWeight="bold" fontSize={20} mb={4}>
              Shipping Address:
            </Text>
            <Flex flexDirection="column">
              <Text fontWeight="bold">Street:</Text>
              <Text>{data.shippingAddress.street}</Text>
            </Flex>

            <Flex flexDirection="column">
              <Text fontWeight="bold">Post number:</Text>
              <Text>{data.shippingAddress.postnumber}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontWeight="bold">City:</Text>
              <Text>{data.shippingAddress.city}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontWeight="bold">Country:</Text>
              <Text>{data.shippingAddress.country}</Text>
            </Flex>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};
