import React from "react";
import { Grid, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, layouts, registerables } from "chart.js";

Chart.register(...registerables);
const data1 = {
  labels: ["dd mm yy", "dd mm yy", "dd mm yy", "dd mm yy", "dd mm yy"],
  datasets: [
    {
      label: "E Tractor",
      data: [0, 0, 0, 0, 0],
      backgroundColor: "rgba(247, 187, 187, .2)",
      borderColor: "#38E0CF",
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
        color: "#000", // Color of y-axis labels
      },
      ticks: {
        color: "#000",
        callback: function (value) {
          return value + " hr.";
        },
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
    <Grid container mt={2} mb={1}>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        {"---"}
      </Typography>
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
