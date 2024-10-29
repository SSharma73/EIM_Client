"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import styled from "@emotion/styled";
import Badge from "@mui/material/Badge";
import Image from "next/image";
import Station from "../../../../../../public/on-charging.svg";
import axiosInstance from "@/app/api/axiosInstanceImg";

// import {CustomGrid} from '@/components/CustomGrid/index'
const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#6099EB",
  borderRadius: "16px",
  color: "#fff",
}));

Chart.register(...registerables);

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
  const [charging, setCharging] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const chargingResponse = await axiosInstance.get(
          `dashboard/csstation`,
          {
            params: {
              customerId: state.brandId,
              region: state.region,
            },
          }
        );
        setCharging(chargingResponse?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        console.error("Error fetching finally:");
      }
    };
    fetchData();
  }, [state]);
  const data = [
    { labels: "Offline CS ", value: charging?.Offline, color: "#326EC3" },
    { labels: "Online CS", value: charging?.Online, color: "#A5D964" },
    { labels: "Occupied CS", value: charging?.Occupied, color: "#D7FFA6" },
    { labels: "Available CS", value: charging?.Available, color: "#D7E7FF" },
  ];
  const data2 = (
    charging && typeof charging === "object" ? Object.keys(charging) : []
  )
    .filter((key) => key !== "All")
    .map((key) => ({
      value: charging[key] !== undefined ? charging[key] : 0,
    }));
  const data1 = {
    labels: ["Offline CS", "Online CS", "Occupied CS", "Available CS"],
    datasets: [
      {
        data: data2?.map((item) => item.value),
        backgroundColor: ["#326EC3", "#A5D964", "#D7FFA6", "#D7E7FF"],
        hoverOffset: 15,
        borderColor: "transparent",
      },
    ],
  };
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
          boxWidth: 10,
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
          sx={{ height: "200px" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Doughnut data={data1} options={config.options} />
          <Box
            sx={{
              borderRadius: "16px",
              padding: "10px 40px",

              // background:
              //   "linear-gradient(111.41deg, rgba(139, 153, 173, 0.36) 0%, rgba(255, 255, 255, 0.12) 100%)",
            }}
          >
            <Image
              src={Station}
              height={140}
              width={200}
              alt="Charging Station"
            />
          </Box>
        </Grid>
        <Grid container mt={20} mb={2}>
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h6">All charging station </Typography>
            <Typography variant="h6">{charging?.All}</Typography>
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
