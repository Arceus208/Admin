import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../components/navbar/NavBar";
import Wrapper from "../components/ui/Wrapper";
import { useAxiosAuth } from "../utils/axiosAuth";
import { AiOutlineBarChart } from "react-icons/ai";

import useSWR from "swr";

import { SmallCard } from "../components/ui/SmallCard";

import { ChartBox } from "../components/chart/ChartBox";

export const Dashboard: React.FC<{}> = () => {
  const axiosAuth = useAxiosAuth(false);

  const fetcher = (url: string) => axiosAuth.get(url).then((res) => res.data);

  const { data, error } = useSWR("/order/todaySales", fetcher);

  const { data: weekSales, error: weekSalesError } = useSWR(
    "/order/getCurrentWeekSales",
    fetcher
  );

  const { data: monthSales, error: monthSalesError } = useSWR(
    "/order/getCurrentMonthSales",
    fetcher
  );

  const { data: yearSales, error: yearSalesError } = useSWR(
    "/order/getCurrentYearSales",
    fetcher
  );

  return (
    <Flex>
      <NavBar></NavBar>
      <Wrapper>
        <Text fontSize={30} mb={10} fontWeight="bold">
          Dashboard
        </Text>
        <Flex
          flexWrap="wrap"
          bgColor="white"
          borderRadius={10}
          boxShadow="xl"
          justifyContent="center"
        >
          {data && !error && (
            <SmallCard
              icon={AiOutlineBarChart}
              headerText="Today #orders"
              contentText={data.numberOfOrders}
            ></SmallCard>
          )}
          {data && !error && (
            <SmallCard
              icon={AiOutlineBarChart}
              headerText="Todaysales"
              contentText={`${data.total} €`}
            ></SmallCard>
          )}
          {monthSales && !monthSalesError && (
            <SmallCard
              icon={AiOutlineBarChart}
              headerText="Current month #orders"
              contentText={monthSales.numberOfOrders}
            ></SmallCard>
          )}
          {monthSales && !monthSalesError && (
            <SmallCard
              icon={AiOutlineBarChart}
              headerText="Current month sales"
              contentText={`${monthSales.total} €`}
            ></SmallCard>
          )}
        </Flex>
        <Text fontSize={20} fontWeight="bold" mt={10}>
          Current Week sales:
        </Text>
        {weekSales && !weekSalesError && (
          <ChartBox data={weekSales.order} label="Week sales"></ChartBox>
        )}
        <Text fontSize={20} fontWeight="bold">
          Current year sales:
        </Text>
        {yearSales && !yearSalesError && (
          <ChartBox
            data={yearSales.order}
            label="Current year sales"
          ></ChartBox>
        )}
      </Wrapper>
    </Flex>
  );
};
