"use client";
import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { AccessTimeFilled } from "@/app/(components)/mui-components/icons/index";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import styled from "@emotion/styled";
import axiosInstance from "@/app/api/axiosInstance";
import dayjs from "dayjs";
import { addDays, subDays } from "date-fns";

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

const Analysis = () => {
  const defaultDateRange = {
    startDate: subDays(new Date(), 1),
    endDate: addDays(new Date(), 1),
    key: "selection",
  };
  const [amData, setAmData] = useState([]);
  const [pmData, setPmData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([defaultDateRange]);
  const getDataFromChildHandler = (dateRange) => {
    setDateRange(dateRange);
  };

  const amTotalDistance = amData.reduce((acc, data) => {
    return acc + (data?.distanceTravelled || 0);
  }, 0);

  const pmTotalDistance = pmData.reduce((acc, data) => {
    return acc + (data?.distanceTravelled || 0);
  }, 0);

  const fetchGraphData = (startDate, endDate) => {
    setLoading(true);
    axiosInstance
      .get("dashboard/getGraphData", {
        params: {
          customerId: "66d6cd773939bf477f63b3a5",
          startDate: startDate,
          endDate: endDate,
        },
      })
      .then((response) => {
        const { amData, pmData } = response.data;
        setAmData(amData);
        setPmData(pmData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching graph data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (
      dateRange.length > 0 &&
      dateRange[0]?.startDate &&
      dateRange[0]?.endDate
    ) {
      const startDate = dayjs(dateRange[0]?.startDate).format("YYYY-MM-DD");
      const endDate = dayjs(dateRange[0]?.endDate).format("YYYY-MM-DD");
      fetchGraphData(startDate, endDate);
    }
  }, [dateRange]);

  const data = {
    labels: [
      "12 ",
      "1 ",
      "2 ",
      "3 ",
      "4 ",
      "5 ",
      "6 ",
      "7 ",
      "8 ",
      "9 ",
      "10 ",
      "11 ",
      "12 ",
    ],
    datasets: [
      {
        label: "AM",
        data: amData.map((item) => item.distanceTravelled),
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
        label: "PM",
        data: pmData.map((item) => item.distanceTravelled),
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
  const data2 = {
    labels: [
      "12 ",
      "1 ",
      "2 ",
      "3 ",
      "4 ",
      "5 ",
      "6 ",
      "7 ",
      "8 ",
      "9 ",
      "10 ",
      "11 ",
      "12 ",
    ],
    datasets: [
      {
        label: "AM",
        data: [],
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
        label: "PM",
        data: [],
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

  return (
    <CustomGrid mt={2} xs={12}>
      <Grid container>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant="h4">
            <AccessTimeFilled sx={{ verticalAlign: "middle", p: "3px" }} /> E -
            Tractor travel (km)
          </Typography>
          <CommonDatePicker getDataFromChildHandler={getDataFromChildHandler} />
        </Grid>
        <Grid mt={2}>
          <Typography variant="h3">
            {loading ? "Loading..." : amTotalDistance + pmTotalDistance}
          </Typography>
        </Grid>
      </Grid>
      <Line data={data} options={options} width={1000} />
      <Grid container mt={6}>
        <Grid container>
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h3">
              <AccessTimeFilled sx={{ verticalAlign: "middle", p: "3px" }} /> E
              - Tractor average consumption (kWh/km)
            </Typography>
          </Grid>
          <Grid mt={2}>
            <Typography variant="h3">257</Typography>
          </Grid>
        </Grid>
        <Line data={data2} options={options} width={1000} />
      </Grid>
    </CustomGrid>
  );
};

export default Analysis;
