import { Box, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";

interface ChartBoxProps {
  data: { _id: string; sum: number }[];
  label: string;
}

export const ChartBox: React.FC<ChartBoxProps> = ({ data, label }) => {
  const [currentChart, setCurrentChart] = useState<string>("bar");
  return (
    <Box
      mb={[3, 5, 10, 10]}
      bgColor="white"
      p={[5, 5, 10, 10]}
      borderRadius={10}
      w={[300, 400, 700, 900]}
    >
      <Select
        onChange={(e) => {
          setCurrentChart(e.target.value);
        }}
        defaultValue="bar"
        mb={5}
      >
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
      </Select>
      {currentChart === "bar" ? (
        <BarChart label={label} data={data}></BarChart>
      ) : (
        <LineChart label={label} data={data}></LineChart>
      )}
    </Box>
  );
};
