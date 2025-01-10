import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const incomeColors = [
  "#baefbf",
  "#9c9dfb",
  "#f49ae9",
  "#20c4d8",
  "#f1df76",
];

const outcomeColors = [
  "#baefbf", // kira
  "#36a7f7",
  "#d26259",
  "#b7b16b",
  "#c4277c",
  "#f6a3ab",
  "#005751",
  "#76a5af",
  "#d6bfa7",
  "#7833dc",
];

interface PieChartProps {
  data: { category: string; amount: string }[]; 
  title: string;
}

export const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const totalAmount = data
    .map((item) => parseFloat(item.amount.replace(",", "")))
    .reduce((sum, value) => sum + value, 0);

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => parseFloat(item.amount.replace(",", ""))),
        backgroundColor: title.includes("Gelir") 
          ? data.map((_, index) => incomeColors[index % incomeColors.length])
          : data.map((_, index) => outcomeColors[index % outcomeColors.length]),
        hoverBackgroundColor: title.includes("Gelir")
          ? data.map((_, index) => incomeColors[index % incomeColors.length])
          : data.map((_, index) => outcomeColors[index % outcomeColors.length]),
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            const percentage = ((value / totalAmount) * 100).toFixed(2);
            return `${context.label}: (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <Typography variant="subtitle1" sx={{ textAlign: "center", mt: 3 }}>
        {title}
      </Typography>
      <Pie data={chartData} options={options} />
    </div>
  );
};
