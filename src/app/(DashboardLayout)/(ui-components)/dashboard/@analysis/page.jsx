"use client";
import React, { useState } from "react";
import { Typography, Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { AccessTimeFilled } from "@/app/(components)/mui-components/icons/index";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import styled from "@emotion/styled";

const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#6099EB",
  borderRadius: "16px",
  color: "#fff",
}));

Chart.register(...registerables);

let width, height, gradient;
function getGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, "rgba(0, 36, 166, 0.8)");
    gradient.addColorStop(1, "rgba(0, 36, 166, 0.2)");
  }
  return gradient;
}

let width1, height1, gradient1;
function getGradient1(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient1 || width1 !== chartWidth || height1 !== chartHeight) {
    width1 = chartWidth;
    height1 = chartHeight;
    gradient1 = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient1.addColorStop(0, "rgba(193, 254, 114, 0.8)");
    gradient1.addColorStop(1, "rgba(193, 254, 114, 0.04)");
  }
  return gradient1;
}

const data = {
  labels: [
    "25 July 2024",
    "28 July 2024",
    "30 July 2024",
    "5 August 2024",
    "9 August 2024",
  ],
  datasets: [
    {
      label: "Day",
      data: [65, 59, 80, 81, 56, 55, 40, 20, 36, 48, 16],
      fill: true,
      backgroundColor: function (context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          return;
        }
        return getGradient(ctx, chartArea);
      },
      borderColor: "rgba(0, 36, 166, 1)",
      borderWidth: 2,
      responsive: true,
    },
    {
      label: "Night",
      data: [25, 59, 60, 81, 56, 52, 40, 60, 36, 48, 16],
      fill: true,
      backgroundColor: function (context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          return;
        }
        return getGradient1(ctx, chartArea);
      },
      borderColor: "rgba(193, 254, 114, 1)",
      borderWidth: 1.5,
      responsive: true,
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
      display: true,
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
      callbacks: {
        footer: function (items) {
          if (items.length > 0) {
            const index = items[0].dataIndex;
            const total = items[0].chart.data.datasets.reduce(
              (sum, dataset) => sum + dataset.data[index],
              0
            );
            return `Total: ${total}`;
          }
          return "";
        },
      },
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
  options: options,
};

const options2 = {
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
          return value + " kWh/km";
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
      display: true,
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
      callbacks: {
        footer: function (items) {
          if (items.length > 0) {
            const index = items[0].dataIndex;
            const total = items[0].chart.data.datasets.reduce(
              (sum, dataset) => sum + dataset.data[index],
              0
            );
            return `Total: ${total}`;
          }
          return "";
        },
      },
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
};

const config2 = {
  type: "line",
  data: data,
  options: options2,
};

const Analysis = () => {
  const [date, setDate] = useState(null);
  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };
  return (
    <CustomGrid xs={12}>
      <Grid container>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h4">
            <AccessTimeFilled sx={{ verticalAlign: "middle", p: "3px" }} /> E -
            Tractor travel (km)
          </Typography>
          <CommonDatePicker getDataFromChildHandler={getDataFromChildHandler} />
        </Grid>
        <Grid mt={2}>
          <Typography variant="h3">257 </Typography>
        </Grid>
      </Grid>
      <Line data={data} options={config.options} width={1000} />
      <Grid container mt={6}>
        <Grid container>
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h3">
              <AccessTimeFilled sx={{ verticalAlign: "middle", p: "3px" }} /> E
              - Tractor average consumption (kWh/km)
            </Typography>
          </Grid>
          <Grid mt={2}>
            <Typography variant="h3">257 </Typography>
          </Grid>
        </Grid>
        <Line data={data} options={config2.options} width={1000} />
      </Grid>
    </CustomGrid>
  );
};

export default Analysis;
