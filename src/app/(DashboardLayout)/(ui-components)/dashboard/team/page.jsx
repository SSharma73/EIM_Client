"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import styled from "@emotion/styled";
import Badge from "@mui/material/Badge";
import axiosInstance from "@/app/api/axiosInstanceImg";

const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#6099EB",
  borderRadius: "16px",
  color: "#fff",
}));

Chart.register(...registerables);

const options = {
  animations: {
    animateScale: true,
  },
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "bottom",
      align: "center",
      fullSize: true,
      labels: {
        pointStyle: "circle",
        usePointStyle: true,
        textAlign: "left",
        padding: 20,
        boxWidth: 120,
        generateLabels: function (chart) {
          const datasets = chart.data.datasets;
          const labels = chart.data.labels;
          return labels.map(function (_, index) {
            const backgroundColor = datasets.map(
              (dataset) => dataset.backgroundColor[index]
            );
            return {
              text: "",
              fillStyle: backgroundColor,
              hidden: !chart.isDatasetVisible(index),
              index: index,
              onClick: function (event, legendItem) {
                const isHidden = chart.getDatasetMeta(
                  legendItem.datasetIndex
                ).hidden;
                chart.getDatasetMeta(legendItem.datasetIndex).hidden =
                  !isHidden;
                chart.update();
              },
            };
          });
        },
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

const Badge1 = styled(Badge)(({ color }) => ({
  marginRight: "16px",
  "& .MuiBadge-badge": {
    backgroundColor: color,
    width: "12px",
    height: "12px",
    borderRadius: "50%",
  },
}));

const BalancePage = ({ state }) => {
  const [allStation, setAllStation] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const chargingResponse = await axiosInstance.get(`dashboard/getAll`, {
          params: {
            customerId: state.brandId,
            region: state.region,
          },
        });
        setAllStation(chargingResponse?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        console.error("Error fetching finally:");
      }
    };
    fetchData();
  }, [state]);
  const data = [
    { labels: "Queue in CS", value: allStation?.QueueCs, color: "#D7FFA6" },
    { labels: "Queue in SS", value: allStation?.QueueSs, color: "#A5D964" },
    {
      labels: "E-tractor Charged",
      value: allStation?.Charged,
      color: "#83B4F9",
    },
    {
      labels: "E-tractor Swapped",
      value: allStation?.swapped,
      color: "#326EC3",
    },
  ];
  const data2 = (
    allStation && typeof allStation === "object" ? Object.keys(allStation) : []
  )
    .filter((key) => key !== "All")
    .map((key) => ({
      value: allStation[key] !== undefined ? allStation[key] : 0,
    }));
  const data1 = {
    labels: [
      "Queue in CS",
      "Queue in SS",
      "E-tractor Charged",
      "E-tractor Swapped",
    ],
    datasets: [
      {
        label: "My First Datasetsss",
        data: data2,
        backgroundColor: ["#D7FFA6", "#A5D964", "#83B4F9", "#326EC3"],
        hoverOffset: 15,
        borderColor: "transparent",
      },
    ],
  };
  const config = {
    type: "line",
    data: data1,
    options: {
      ...options,
    },
  };
  return (
    <Grid item md={4} xs={12}>
      <CustomGrid>
        <Grid
          container
          sx={{ height: "303px" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Doughnut data={data1} options={config.options} />
        </Grid>
        <Grid container mt={7} mb={2}>
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h6">All CS/SS</Typography>
            <Typography variant="h6">{allStation?.All}</Typography>
          </Grid>
          <List sx={{ width: "100%" }}>
            {data.map((text, item) => (
              <ListItem
                key={item}
                sx={{ padding: 0, rowGap: 2 }}
                disableGutters
                secondaryAction={text.value}
              >
                <ListItemText sx={{ alignItems: "center" }}>
                  <Badge1 variant="dot" color={text.color} />
                  {text.labels}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
      </CustomGrid>
    </Grid>
  );
};
export default BalancePage;
