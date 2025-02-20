import React from "react";
import { Grid} from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
const data = {
  labels: Array.from({ length: 0 }, (_, i) => (i + 1).toString()), // Labels from 1 to 50
  datasets: [
    {
      label: "Active session",
      data: Array.from({ length: 0 }, () => Math.floor(Math.random() * 20)), // 50 random data points
      backgroundColor: "rgba(247, 187, 187, .2)", // Fill color for the area chart
      borderColor: "#38E0CF",

      borderWidth: 2,
    },
    {
      label: "Current time",
      data: Array.from({ length: 0 }, () => Math.floor(Math.random() * 20)), // 50 random data points
      backgroundColor: "rgba(247, 187, 187, .2)", // Fill color for the area chart
      borderColor: "#1A1C67",

      borderWidth: 2,
    },
  ],
};
const options = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: "#000", // Color of y-axis labels
      },
    },
    x: {
      beginAtZero: true,
      display: true,
      ticks: {
        color: "#000", // Color of x-axis labels
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        pointStyle: "circle",
        usePointStyle: true,
        textAlign: "left",
        color: "#000",
      },
    },
    tooltip: {
      enabled: true, // Show tooltips
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
};

const Graph = () => {
  return (
    <Grid container>
      <Grid container mt={3} mb={4}>
        <Line data={data} height={80} options={options} />
      </Grid>
    </Grid>
  );
};
export default Graph;
