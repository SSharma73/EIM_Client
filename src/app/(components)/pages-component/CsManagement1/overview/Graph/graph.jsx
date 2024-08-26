import React from "react";
import { Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, layouts, registerables } from "chart.js";

Chart.register(...registerables);
const data1 = {
  labels: [
    "25 July 2024",
    "28 July 2024",
    "30 July 2024",
    "5 August 2024",
    "9 August 2024",
  ],
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40, 20, 36, 48, 16],
      borderColor: "#C0FE72",
      borderWidth: 2,
      pointHoverRadius: 10,
    },
  ],
};
const options = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: "white",
      },
    },
    x: {
      beginAtZero: true,
      display: true,
      ticks: {
        color: "white",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      position: "top",
      align: "end",
      fullSize: true,
      labels: {
        pointStyle: "circle",
        usePointStyle: true,
        color: "#fff",
        textAlign: "left",
      },
    },
    tooltip: {
      enabled: true, // Hide tooltips
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
};
const config = {
  type: "line",
  data: data1,
  options: {
    ...options,
  },
};
const Graph = () => {
  return (
    <Grid container mt={3} mb={3}>
      <Line
        data={data1}
        width={"400px"}
        height={170}
        options={config.options}
      />
    </Grid>
  );
};
export default Graph;
