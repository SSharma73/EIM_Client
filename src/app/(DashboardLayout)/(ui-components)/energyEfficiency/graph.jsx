import React from "react";
import { Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
const data1 = {
  labels: ["8am", "10am", "12am", "1pm"],
  datasets: [
    {
      label: "Max power (kW)",
      data: [0],
      backgroundColor: "rgba(247, 187, 187, .2)", // Fill color for the area chart
      borderColor: "#38E0CF",
      borderWidth: 2,
      pointHoverRadius: 10,
    },
    {
      label: "Optimization limit (kW)",
      data: [0],
      backgroundColor: "rgba(247, 187, 187, .2)", // Fill color for the area chart
      borderColor: "#0000",
      borderWidth: 2,
      pointHoverRadius: 10,
    },
    {
      label: "Charging power(kW)",
      data: [0],
      backgroundColor: "rgba(247, 187, 187, .2)", // Fill color for the area chart
      borderColor: "#1A1C67",
      borderWidth: 2,
      pointHoverRadius: 10,
    },
  ],
};
const options = {
  // animations: {
  //     tension: {
  //       duration: 1000,
  //       easing: 'linear',
  //       from: 0.7,
  //       to: 0.2,
  //       loop: true
  //     }
  //   },
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
      fullSize: true,
      labels: {
        pointStyle: "circle",
        usePointStyle: true,
        color: "#000",
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
