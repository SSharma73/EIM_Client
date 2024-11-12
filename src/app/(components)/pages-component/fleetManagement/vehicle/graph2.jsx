import React from "react";
import { Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
const data = {
  labels: ["DD MM YYYY", "DD MM YYYY", "DD MM YYYY"],
  datasets: [ 
    {
      label: "My First Dataset",
      data: [],
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
          return value + " Ton";
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
    <Grid container>
      <Grid container mt={4} mb={2}>
        <Line data={data} height={130} options={config.options} />
      </Grid>
    </Grid>
  );
};

export default Graph;
