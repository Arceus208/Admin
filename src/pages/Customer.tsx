import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import { NavBar } from "../components/navbar/NavBar";
import Wrapper from "../components/ui/Wrapper";
import { useAxiosAuth } from "../utils/axiosAuth";
import useSWRInfinite from "swr/infinite";
import { useUser } from "../hooks/useUser";

interface User {
  id: string;
  name: string;
  email: string;
  createAt: Date;
  orders: [];
  role: { role: string };
}

export const Customer: React.FC<{}> = () => {
  const axiosAuth = useAxiosAuth(false);
  const { data: userData } = useUser();

  const fetcher = (url: string) =>
    axiosAuth.get(url).then((res) => res.data.users);

  const getKey = (pageIndex: any, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/users/getUsers?page=${pageIndex}`;
  };

  const { data, error, size, setSize } = useSWRInfinite<any, any, any>(
    userData ? getKey : null,
    fetcher
  );

  return (
    <Box>
      <Flex>
        <NavBar></NavBar>
        <Wrapper>
          <Text fontSize={30} mb={10} fontWeight="bold">
            Customers
          </Text>
          <Box bgColor="white" borderRadius={10} boxShadow="2xl" p={10}>
            {data && !error && (
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Role</Th>
                      <Th>Joined At</Th>
                      <Th textAlign="center"># Orders</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map((customers, index) => {
                      return customers.map((customer: User) => (
                        <Tr key={customer.id}>
                          <Td>{customer.name}</Td>
                          <Td>{customer.email}</Td>
                          <Td>{customer.role.role}</Td>
                          <Td>
                            {customer.createAt.toString().substring(0, 10)}
                          </Td>
                          <Td textAlign="center">{customer.orders.length}</Td>
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
        </Wrapper>
      </Flex>
    </Box>
  );
};
