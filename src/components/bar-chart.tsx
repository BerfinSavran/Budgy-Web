import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({
  datas,
  titleLabel,
  labelList,
  sx = {},
}: {
  datas: Array<{ gelir: number; gider: number }>; 
  titleLabel: string;
  labelList: Array<string>; // Aylar
  sx?: SxProps;
}) {

  const data = {
    labels: labelList,
    datasets: [
      {
        label: "Gelir",
        data: datas.map((item) => item.gelir),
        backgroundColor: "rgba(75, 192, 192, 0.5)", 
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
      {
        label: "Gider",
        data: datas.map((item) => item.gider), 
        backgroundColor: "rgba(255, 99, 132, 0.5)", 
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: titleLabel,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box sx={sx}>
      <Bar data={data} options={options} />
    </Box>
  );
}
