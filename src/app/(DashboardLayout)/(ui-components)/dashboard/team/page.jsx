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
  backgroundColor: "#fff",
  borderRadius: "16px",
  height: "100%",
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
      enabled: true,
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
  const [allStation, setAllStation] = useState();

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
      }
    };
    fetchData();
  }, [state]);

  const data = [
    { labels: "Queue in CS", value: allStation?.QueueCs, color: "#B8DBD9" },
    { labels: "Queue in SS", value: allStation?.QueueSs, color: "#8CC0BF" },
    {
      labels: "E-tractor Charged Delta",
      value: allStation?.Charged?.delta,
      color: "#B2F7EC",
    },
    {
      labels: "E-tractor Charged Sany",
      value: allStation?.Charged?.sany,
      color: "#B2d7EC",
    },
    {
      labels: "E-tractor Swapped",
      value: allStation?.swapped,
      color: "#FFEAC9",
    },
  ];

  const data1 = {
    labels: [
      "Queue in CS",
      "Queue in SS",
      "E-tractor Charged Delta",
      "E-tractor Charged Sany",
      "E-tractor Swapped",
    ],
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        hoverOffset: 15,
        borderColor: "transparent",
      },
    ],
  };

  return (
    <Grid item md={4} xs={12}>
      <CustomGrid>
        <Grid
          container
          sx={{
            height:
              data1 &&
              data1.datasets &&
              data1.datasets[0] &&
              data1.datasets[0].data.every((value) => value === 0)
                ? ""
                : "303px",
          }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {data1 &&
          data1.datasets &&
          data1.datasets[0] &&
          data1.datasets[0].data.every((value) => value === 0) ? (
            <div>No data available</div>
          ) : (
            <Doughnut data={data1} options={options} />
          )}
        </Grid>
        <Grid
          container
          mt={
            data1 &&
            data1?.datasets &&
            data1?.datasets[0] &&
            data1?.datasets[0]?.data?.every((value) => value === 0)
              ? 20
              : 7
          }
          mb={2}
        >
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h6">All CS/SS</Typography>
            <Typography variant="h6">{allStation?.All}</Typography>
          </Grid>
          <List sx={{ width: "100%" }}>
            {data?.map((text, item) => (
              <ListItem
                key={item}
                sx={{ padding: 0, rowGap: 2 }}
                disableGutters
                secondaryAction={text?.value}
              >
                <ListItemText sx={{ alignItems: "center" }}>
                  <Badge1 variant="dot" color={text?.color} />
                  {text?.labels}
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
