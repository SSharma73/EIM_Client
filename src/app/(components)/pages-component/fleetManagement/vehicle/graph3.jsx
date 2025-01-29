import React from "react";
import { Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
const data = {
  labels: [
    "01 Jan 2025",
    "02 Jan 2025",
    "03 Jan 2025",
    "04 Jan 2025",
    "05 Jan 2025",
  ],
  datasets: [
    {
      label: "My First Dataset",
      data: [12, 9, 22, 25, 88],
      backgroundColor: "rgba(247, 187, 187, .2)",
      borderColor: "#38E0CF",
      borderWidth: 2,
    },
  ],
};
const options = {
  scales: {
    y: {
      beginAtZero: true,
      title: {
        color: "#000",
        font: {
          family: "Arial",
          weight: "bold",
        },
      },
      ticks: {
        color: "#000",
        callback: function (value) {
          return value + " kWh";
        },
      },
    },
    x: {
      beginAtZero: true,
      display: true,
      title: {
        color: "#000",
        font: {
          size: 16,
          family: "Arial",
          weight: "bold",
        },
      },
      ticks: {
        color: "#000",
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
    <Grid container>
      <Grid container mt={4} mb={2}>
        <Line data={data} height={130} options={config.options} />
      </Grid>
    </Grid>
  );
};

export default Graph;
