import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Image,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";

import { BiEdit } from "react-icons/bi";
import { Link, useSearchParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { axiosPublic } from "../utils/axiosPublic";
import useSWRInfinite from "swr/infinite";

interface AllProductsProps {}

interface ProductData {
  name: string;
  id: string;
  curPrice: number;
  quantity: number;
  mainImg: { path: string };
  category: string;
  discount: number;
}

export const AllProducts: React.FC<AllProductsProps> = () => {
  const [search, setSearch] = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fetcher = (url: string) =>
    axiosPublic.get(url).then((res) => res.data.products);

  const getKey = (pageIndex: any, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/products/search?search=${search.get("search")}&page=${pageIndex}`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  const onEnterEvents = (event: any) => {
    if (event.key === "Enter") {
      setSearch({ search: inputRef.current!.value });
    }
  };

  return (
    <Flex>
      <Box bgColor="white" borderRadius={10} boxShadow="2xl" p={10}>
        <InputGroup m={5}>
          <InputLeftElement pointerEvents="none" children={<BsSearch />} />
          <Input
            type="text"
            placeholder="Search product"
            ref={inputRef}
            onKeyDown={onEnterEvents}
          />
        </InputGroup>
        {data && !error && (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Category</Th>
                  <Th>Quantity</Th>
                  <Th>Current Price</Th>
                  <Th>On sale</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((products, index) => {
                  return products.map((product: ProductData) => (
                    <Tr key={product.id}>
                      <Td>
                        <Box>
                          <Image
                            src={product.mainImg.path}
                            fit="contain"
                            h={20}
                            w={20}
                          ></Image>
                        </Box>
                      </Td>
                      <Td>{product.name}</Td>
                      <Td>{product.category}</Td>
                      <Td>{product.quantity}</Td>
                      <Td>{product.curPrice}$</Td>
                      <Td>{product.discount > 0 ? "Yes" : "No"}</Td>
                      <Td>
                        <Link to={`/products/edit/${product.id}`}>
                          <Box _hover={{ cursor: "pointer" }}>
                            <Icon boxSize={6} as={BiEdit}></Icon>
                          </Box>
                        </Link>
                      </Td>
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
