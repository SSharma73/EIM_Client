"use client";
import { Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Table from "./table";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import Graph1 from "./graph2";
import { CustomDropdown } from "@/app/(components)/mui-components/DropdownButton/index";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import { CustomGrid } from "@/app/(components)/mui-components/CustomGrid";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import axiosInstance from "@/app/api/axiosInstance";
import AddBattery from "./addBattery";
import ToastComponent from "@/app/(components)/mui-components/Snackbar/index";

Chart.register(...registerables);

const avg_battery = {
  labels: ["60% - 100%", "60% - 40%", "40% - 0%"],
  datasets: [
    {
      label: "Average battery SoH",
      data: [95, 60, 20],
      backgroundColor: ["#A5D964", "#83B4F9", "#326EC3"],
      borderColor: "transparent",
      hoverOffset: 10,
    },
  ],
};
const battery_temp = {
  labels: ["High temp.", "Normal"],
  datasets: [
    {
      label: "Battery temperature",
      data: [185, 100],
      backgroundColor: ["#D7FFA6", "#326EC3"],
      borderColor: "transparent",
      hoverOffset: 10,
    },
  ],
};
const avg_battery_charge = {
  labels: ["10 - 40 times", "40 - 70 times", "70 - 100 times"],
  datasets: [
    {
      label: "Average battery charge cycle",
      data: [55, 35, 220],
      backgroundColor: ["#83B4F9", "#326EC3", "#C8DFFF"],
      borderColor: "transparent",
      hoverOffset: 10,
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
      display: true,
      position: "right",
      align: "right",
      fullSize: true,
      labels: {
        pointStyle: "circle",
        padding: 15,
        color: "#fff",
        usePointStyle: true,
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
const config = {
  type: "line",
  data: avg_battery_charge,
  options: {
    ...options,
  },
};
const data2 = [
  { label: "Total battery packs", value: 50 },
  { label: "Offline battery", value: 1250 },
  {
    label: "On E-Tractor",
    Tripvalue: 150,
    trip: "Trip",
    charging: "Charging",
    chargingValue: 1000,
  },
  {
    label: "Swapping station",
    Tripvalue: 150,
    trip: "Available",
    charging: "Charging",
    chargingValue: 1000,
  },
];
const menuItems = ["Today", "Weekly", "Monthly", "Yearly"];
const Page = () => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchQuery, setSearchQuery] = useState(null);
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };
  const droDownButtons = [
    {
      label: "Region",
      menuItems: ["Mumbai", "Delhi", "Agra", "Punjab", "Kolkata"],
    },
    {
      label: "Customer",
      menuItems: ["Customer 1", "Customer 2", "Customer 3"],
    },
  ];
  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "Battery-Analysis", link: "/batteryAnalysis" },
  ];
  const handleEfficiencyData = async (value) => {
    // try {
    //   const res = await axiosInstance.get(
    //     `/battery/getAll?page=${page + 1}&pageSize=${rowsPerPage}&search=${
    //       value ?? ""
    //     }`
    //   );
    //   console.log("res", res);
    //   setData(res?.data);
    // } catch (error) {
    //   console.log("batteryeffiency", error);
    // }
  };
  useEffect(() => {
    handleEfficiencyData();
  }, [page, rowsPerPage, date]);
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Grid container spacing={2}>
      <ToastComponent />
      <Grid item xs={12}>
        <ManagementGrid
          breadcrumbItems={breadcrumbItems}
          handleClickOpen={handleOpen}
          moduleName={"Battery Analysis"}
          dropDown={droDownButtons}
          button={"Add Battery"}
        />
      </Grid>
      <AddBattery
        open={open}
        setOpen={setOpen}
        handleEfficiencyData={handleEfficiencyData}
      />
      {data2.map((item, index) => {
        const isLargeCard = index >= 2;
        return (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            lg={isLargeCard ? 3.6 : 2.4}
            md={6}
          >
            <CustomGrid>
              <Grid
                container
                direction="row"
                justifyContent={isLargeCard ? "center" : "space-between"}
              >
                <Grid item sx={{ mb: 2 }}>
                  <Typography variant="h5">{item.label} </Typography>
                </Grid>
              </Grid>
              <Typography
                variant="h2"
                sx={{ paddingBottom: "4px" }}
                color={"#14165F"}
                fontWeight={600}
              >
                {item.value}
              </Typography>
              {isLargeCard && (
                <Grid container columnGap={3} justifyContent={"center"}>
                  <Typography variant="h2" color={"#14165F"} fontWeight={600}>
                    <span style={{ fontSize: "15px", color: "#fff" }}>
                      {item?.trip}:
                    </span>{" "}
                    {item.Tripvalue}
                  </Typography>
                  <Typography variant="h2" color={"#14165F"} fontWeight={600}>
                    <span style={{ fontSize: "15px", color: "#fff" }}>
                      {item?.charging}:
                    </span>{" "}
                    {item.chargingValue}
                  </Typography>
                </Grid>
              )}
            </CustomGrid>
          </Grid>
        );
      })}
      {[1, 2, 3].map((index) => (
        <Grid key={index} item xl={4} md={4} sm={12} xs={12}>
          <CustomGrid>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h6">
                {index === 1
                  ? "Average battery SoH"
                  : index === 2
                  ? "Battery temperature"
                  : "Avg. battery charge cycle"}
              </Typography>
              <CustomDropdown
                size="small"
                variant="contained"
                buttonname="This week"
                menuitems={menuItems}
              />
            </Grid>
            <Grid
              container
              xs={12}
              sx={{ height: "200px", p: 2 }}
              mt={5}
              mb={3}
            >
              <Doughnut
                data={
                  index === 1
                    ? avg_battery
                    : index === 2
                    ? battery_temp
                    : avg_battery_charge
                }
                options={config.options}
              />
            </Grid>
          </CustomGrid>
        </Grid>
      ))}
      {/* <Grid item xs={12}>
        <Grid
          container
          sx={{
            padding: "16px 16px 0px 16px",
            backgroundColor: "#6099EB",
            borderRadius: "16px",
            color: "#fff",
          }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h5">
            <AccessTimeFilledIcon
              sx={{ verticalAlign: "middle", mr: "3px", p: "2px" }}
            />
            Consumption/charge (kWh)
          </Typography>
          <CommonDatePicker getDataFromChildHandler={getDataFromChildHandler} />
          <Graph1 />{" "}
        </Grid>
      </Grid> */}
      <Grid item xs={12}>
        <Table
          data={data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          searchQuery={searchQuery}
          handleEfficiencyData={handleEfficiencyData}
          setSearchQuery={setSearchQuery}
          loading={loading}
          getDataFromChildHandler={getDataFromChildHandler}
        />
      </Grid>
    </Grid>
  );
};
export default Page;
