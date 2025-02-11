import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axiosInstance from "@/app/api/axiosInstanceImg";

Chart.register(...registerables);

const options = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: "#000",
        font: {
          family: "Arial",
        },
        callback: function (value) {
          return value + " kWh";
        },
      },
    },
    x: {
      beginAtZero: true,
      display: true,
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
        color: "#fff",
        textAlign: "left",
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

const Graph = ({
  calculateDateRange,
  type,
  selectedItems,
  selectedCustId,
  selectedTimeFrames,
}) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Usage",
        data: [],
        backgroundColor: "rgba(247, 187, 187, .2)",
        borderColor: "#38E0CF",
        borderWidth: 2,
        pointHoverRadius: 10,
      },
    ],
  });
  const [totalUsage, setTotalUsage] = useState(0); // State for total usage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { startDate, endDate } = calculateDateRange(selectedTimeFrames);
        const { data } = await axiosInstance.get("charger/usageGraph", {
          params: {
            startDate,
            endDate,
            type,
            region: selectedItems,
            customerId: selectedCustId,
          },
        });
        const labels = data?.data?.map((item) => item.createdAt) || [];
        const usageData = data?.data?.map((item) => item.usage) || [];
        // Calculate total usage
        const total = usageData.reduce((acc, curr) => acc + curr, 0);
        setTotalUsage(total); // Update total usage state

        setChartData({
          labels: labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: usageData,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedTimeFrames, type, selectedItems, selectedCustId]);

  return (
    <Grid container mt={2} mb={1}>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        {totalUsage?.toFixed(2)} kWh
      </Typography>
      <Line data={chartData} width={"400px"} height={170} options={options} />
    </Grid>
  );
};

export default Graph;
