import React from "react";
import { Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
const data = {
  labels: [
    "25 Jul 2024",
    "28 Jul 2024",
    "30 July 2024",
    "5 Aug 2024",
    "9 Aug 2024",
  ],
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40, 20, 36, 48, 16],
      backgroundColor: "rgba(247, 187, 187, .2)",
      borderColor: "#C0FE72",
      borderWidth: 2,
    },
  ],
};
const options = {
  scales: {
    y: {
      beginAtZero: true,
      title: {
        color: "white",
        font: {
          family: "Arial",
          weight: "bold",
        },
      },
      ticks: {
        color: "white",
        callback: function (value) {
          return value + " km";
        },
      },
    },
    x: {
      beginAtZero: true,
      display: true,
      title: {
        color: "white",
        font: {
          size: 16,
          family: "Arial",
          weight: "bold",
        },
      },
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
        textAlign: "left",
        color: "#fff",
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
};
const config = {
  type: "line",
  data: data,
  options: {
    ...options,
  },
};
const Graph = () => {
  return (
    <Grid container mt={4} mb={2}>
      <Line data={data} height={130} options={config.options} />
    </Grid>
  );
};

export default Graph;
