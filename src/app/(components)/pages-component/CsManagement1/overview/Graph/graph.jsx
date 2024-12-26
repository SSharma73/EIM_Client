import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axiosInstance from "@/app/api/axiosInstanceImg";

Chart.register(...registerables);

const Graph = ({ graphType, type, selectedItems, selectedCustId }) => {
  console.log("graphType", selectedItems, selectedCustId);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: "#C0FE72",
        borderWidth: 2,
        pointHoverRadius: 10,
      },
    ],
  });
  const [totalSessions, setTotalSessions] = useState(0);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
      x: {
        beginAtZero: true,
        display: true,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get("charger/sessionGraph", {
          params: {
            graphType,
            type,
            region: selectedItems,
            customerId: selectedCustId,
          },
        });
        const labels = data?.data.map((item) => item.interval) || [];
        const sessionData = data?.data.map((item) => item.session) || [];
        const total = sessionData.reduce((acc, curr) => acc + curr, 0);

        setChartData({
          labels: labels,
          datasets: [
            {
              data: sessionData,
              borderColor: "#C0FE72",
              borderWidth: 2,
              pointHoverRadius: 10,
            },
          ],
        });
        setTotalSessions(total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [graphType, type, selectedItems, selectedCustId]);

  return (
    <Grid container mt={2} mb={1}>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        {totalSessions?.toFixed(2)}
      </Typography>
      <Line data={chartData} width={"400px"} height={170} options={options} />
    </Grid>
  );
};

export default Graph;
