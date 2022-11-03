import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";

ChartJS.register(
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

interface LineChartProps {
  data: { _id: string; sum: number }[];
  label: string;
}

export const LineChart: React.FC<LineChartProps> = ({ data, label }) => {
  const chartData = {
    labels: data.map((item: any) => item._id),
    datasets: [
      {
        label,
        data: data.map((item: any) => item.sum),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <Box h="20rem" w="40rem">
      <Line options={options} data={chartData}></Line>
    </Box>
  );
};
