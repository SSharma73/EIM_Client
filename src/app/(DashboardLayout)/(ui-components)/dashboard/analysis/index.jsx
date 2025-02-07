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
  backgroundColor: "#fff",
  borderRadius: "16px",
  color: "#000",
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
    gradient.addColorStop(0, "#38E0CF");
    gradient.addColorStop(1, "rgba(206, 218, 219, 0.2)");
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
    gradient1.addColorStop(0, "#001B1E");
    gradient1.addColorStop(1, "rgba(119, 121, 116, 0.04)");
  }
  return gradient1;
}

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
      display: true,
      position: "top",
      align: "end",
      fullSize: true,
      labels: {
        pointStyle: "circle",
        usePointStyle: true,
        textAlign: "left",
        color: "#000",
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

const options2 = {
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
      display: true,
      position: "top",
      align: "end",
      fullSize: true,
      labels: {
        pointStyle: "circle",
        usePointStyle: true,
        textAlign: "left",
        color: "#000",
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

const Analysis = ({ state }) => {
  const defaultDateRange = {
    startDate: subDays(new Date(), 1),
    endDate: addDays(new Date(), 1),
    key: "selection",
  };
  const [graphData, setGraphData] = useState([]);
  const [consumptionGraphData, setConsumptionGraphData] = useState(null);
  const [consumptionData, setConsumptionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([defaultDateRange]);
  const getDataFromChildHandler = (dateRange) => {
    setDateRange(dateRange);
  };

  const TotalDistance = graphData?.reduce((acc, data) => {
    return acc + (data?.totalDistanceDifference || 0);
  }, 0);
  // const TotalDistanceConsumption = consumptionGraphData?.reduce((acc, data) => {
  //   return acc + (data?.totalConsumption || 0);
  // }, 0);

  const fetchGraphData = (startDate, endDate) => {
    setLoading(true);
    Promise.all([
      axiosInstance.get("dashboard/getGraphData", {
        params: {
          startDate: startDate,
          endDate: endDate,
          customerId: state?.brandId,
          fleetNumber: state?.fleetNumber,
          region: state?.region,
        },
      }),
      axiosInstance.get("dashboard/getConsumptionGraphData", {
        params: {
          startDate: startDate,
          endDate: endDate,
          customerId: state?.brandId,
          fleetNumber: state?.fleetNumber,
          region: state?.region,
        },
      }),
    ])
      .then(([graphDataResponse, consumptionDataResponse]) => {
        setGraphData(graphDataResponse?.data?.result);
        setConsumptionGraphData(consumptionDataResponse?.data?.result);
        setConsumptionData(consumptionDataResponse?.data?.averageConsumption);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching graph data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (
      (dateRange.length > 0 &&
        dateRange[0]?.startDate &&
        dateRange[0]?.endDate) ||
      state?.brandId ||
      state?.fleetNumber
    ) {
      const startDate = dayjs(dateRange[0]?.startDate).format("YYYY-MM-DD");
      const endDate = dayjs(dateRange[0]?.endDate).format("YYYY-MM-DD");
      fetchGraphData(startDate, endDate);
    }
  }, [dateRange, state?.brandId, state?.fleetNumber, state?.region]);

  const data = {
    labels: graphData?.map((item) => item.dateTime),
    datasets: [
      {
        label: "Distance travel",
        data: graphData.map((item) => item.totalDistanceDifference?.toFixed(2)),
        fill: true,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea);
        },
        borderColor: "#38E0CF",
        borderWidth: 2,
        responsive: true,
      },
    ],
  };
  const data2 = {
    labels: consumptionGraphData?.map((item) => item.dateTime),
    datasets: [
      {
        label: "Average consumption",
        data: consumptionGraphData?.map((item) =>
          item.totalConsumption.toFixed(2)
        ),
        fill: true,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea);
        },
        borderColor: "#38E0CF",
        borderWidth: 2,
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
            {loading ? "Loading..." : TotalDistance?.toFixed(2)}
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
            <Typography variant="h3">
              {loading ? "Loading..." : consumptionData?.toFixed(2)}
            </Typography>{" "}
          </Grid>
        </Grid>
        <Line data={data2} options={options2} width={1000} />
      </Grid>
    </CustomGrid>
  );
};

export default Analysis;
