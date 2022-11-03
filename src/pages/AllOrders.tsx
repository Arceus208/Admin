import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { BsSearch } from "react-icons/bs";

import { useAxiosAuth } from "../utils/axiosAuth";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import useSWRInfinite from "swr/infinite";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";

interface Order {
  id: string;
  customerEmail: string;
  totalPrice: number;
  status: string;
  createAt: Date;
}

export const AllOrders: React.FC<{}> = () => {
  const axiosAuth = useAxiosAuth(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data: userData } = useUser();

  const fetcher = (url: string) =>
    axiosAuth.get(url).then((res) => res.data.orders);

  const getKey = (pageIndex: any, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/order/all?page=${pageIndex}`;
  };

  const onEnterEvents = (event: any) => {
    if (event.key === "Enter") {
      navigate(`/orders/${inputRef.current!.value}`);
    }
  };

  const { data, size, setSize } = useSWRInfinite<any, any, any>(
    userData ? getKey : null,
    fetcher
  );

  return (
    <Flex>
      <Box>
        <Text fontSize={30} mb={10} fontWeight="bold">
          Orders
        </Text>
        <InputGroup my={5}>
          <InputLeftElement pointerEvents="none" children={<BsSearch />} />
          <Input
            type="text"
            placeholder="Order Id"
            ref={inputRef}
            onKeyDown={onEnterEvents}
          />
        </InputGroup>
        {data && (
          <TableContainer
            bgColor="white"
            borderRadius={10}
            boxShadow="2xl"
            p={10}
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>OrderId</Th>
                  <Th>Customer Email</Th>
                  <Th>Total cost</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((orders, index) => {
                  return orders.map((order: Order) => (
                    <Tr
                      key={order.id}
                      onClick={() => {
                        navigate(`/orders/${order.id}`);
                      }}
                      _hover={{ cursor: "pointer" }}
                    >
                      <Td>{order.id}</Td>
                      <Td>{order.customerEmail}</Td>
                      <Td>{order.totalPrice}$</Td>
                      <Td>{order.status}</Td>
                      <Td>{order.createAt.toString().substring(0, 10)}</Td>
                    </Tr>
                  ));
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
        <Flex justifyContent="center" my={2}>
          <Button onClick={() => setSize(size + 1)} colorScheme="teal">
            Load more
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
