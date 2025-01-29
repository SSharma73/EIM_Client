"use client";
import React from "react";
import { Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Graph = ({ graphData }) => {
  const data = {
    labels: graphData?.map((item) => item?.dateTime),
    datasets: [
      {
        label: "Distance Travelled",
        data: graphData?.map((item) => item?.totalDistanceDifference),
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
            return value + " km";
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

  return (
    <Grid container mt={4} mb={2}>
      <Line data={data} height={130} options={options} />
    </Grid>
  );
};

export default Graph;
