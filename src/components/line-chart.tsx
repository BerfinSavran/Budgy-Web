import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, SxProps } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ days, expenses, sx={} }: { days: string[]; expenses: number[], sx?: SxProps }) {

  const data = {
    labels: days, 
    datasets: [
      {
        label: "Daily Expenses",
        data: expenses, 
        borderColor: "rgba(151, 52, 158, 1)",
        backgroundColor: "rgba(151, 52, 158, 0.2)",
        tension: 0.3, 
        fill: true, 
        pointRadius: 5,
        pointBackgroundColor: "rgba(151, 52, 158, 1)", 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Daily Expenses for the Selected Month",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Expense Amount ($)",
        },
      },
    },
  };

  return (
    <Box sx={sx}>
        <Line data={data} options={options} />
    </Box>
  )
}
