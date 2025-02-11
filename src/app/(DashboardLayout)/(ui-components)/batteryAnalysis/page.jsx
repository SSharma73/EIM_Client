"use client";
import { Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Table from "./table";
import { CustomDropdown } from "@/app/(components)/mui-components/DropdownButton/index";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import { CustomGrid } from "@/app/(components)/mui-components/CustomGrid";
import AddBattery from "./addBattery";
import ToastComponent from "@/app/(components)/mui-components/Snackbar/index";
import axiosInstance from "@/app/api/axiosInstance";
import axios from "axios";
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
      data: [0, 0, 0],
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
        color: "#000",
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

const menuItems = ["Today", "Weekly", "Monthly", "Yearly"];
const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Battery-Analysis", link: "/batteryAnalysis" },
];
const Page = () => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchQuery, setSearchQuery] = useState(null);
  const [region, setRegion] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustId, setSelectedCustId] = useState(null);
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [cardValue, setCardValue] = useState(null);
  const data2 = [
    { label: "Total battery packs", value: cardValue?.totalBattery || "--" },
    { label: "Offline battery", value: "0" },
    {
      label: "On E-Tractor",
      value: cardValue?.onEtractor || "--",
    },
    {
      label: "Swapping station",
      Tripvalue: cardValue?.swappingAvailable || "--",
      trip: "Available",
      charging: "Charging",
      chargingValue: cardValue?.swappingCharging || "0",
    },
  ];

  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };

  useEffect(() => {
    const regions = async () => {
      const { data } = await axiosInstance.get("dashboard/regions");
      setRegion(data?.regions);
    };
    const customer = async () => {
      const { data } = await axiosInstance.get("dashboard/customers");
      setCustomers(data?.customers);
    };
    regions();
    customer();
  }, []);
  const [selectedItems, setSelectedItems] = useState({
    Region: "",
    Customer: "",
  });
  useEffect(() => {
    if (selectedItems?.Customer) {
      const customer = customers?.find(
        (customer) => customer?.brandName === selectedItems?.Customer
      );
      setSelectedCustId(customer?._id);
    }
  }, [selectedItems]);

  const dropDownButtons = [
    {
      label: "Region",
      menuItems: region,
    },
    {
      label: "Customer",
      menuItems: customers?.map((customer) => customer?.brandName),
    },
  ];

  const handleEfficiencyData = async (value) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `battery/fetchBattery?page=${page + 1}&pageSize=${rowsPerPage}&search=${
          searchQuery ?? ""
        }&region=${selectedItems?.Region}&customerId=${selectedCustId}`
      );
      if (res.status === 200 || res.status === 201) {
        setLoading(false);
        setData(res?.data?.data);
      }
    } catch (error) {
      console.log("batteryeffiency", error);
    }
  };
  useEffect(() => {
    handleEfficiencyData();
  }, [
    page,
    rowsPerPage,
    date,
    searchQuery,
    selectedItems?.Region,
    selectedCustId,
  ]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleDropdownSelect = (label, item) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [label]: item,
    }));
  };

  const handleCardData = async () => {
    try {
      const { data, status } = await axiosInstance.get(
        `/battery/fetchDashboard`
      );
      if (status === 200 || status === 201) {
        setCardValue(data?.data);
        console.log("handle", data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleCardData();
  }, []);
  return (
    <Grid container spacing={2}>
      <ToastComponent />
      <Grid item xs={12}>
        <ManagementGrid
          breadcrumbItems={breadcrumbItems}
          handleClickOpen={handleOpen}
          moduleName={"Battery Analysis"}
          dropDownEvent={dropDownButtons}
          button={"Add Battery"}
          selectedItems={selectedItems}
          handleDropdownSelect={handleDropdownSelect}
        />
      </Grid>
      <AddBattery
        open={open}
        setOpen={setOpen}
        handleEfficiencyData={handleEfficiencyData}
      />
      {data2.map((item, index) => {
        const isLargeCard = index >= 3;
        return (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            lg={isLargeCard ? 3.6 : 2.8}
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
                    <span style={{ fontSize: "15px" }}>{item?.trip}:</span>{" "}
                    {item.Tripvalue}
                  </Typography>
                  <Typography variant="h2" color={"#14165F"} fontWeight={600}>
                    <span style={{ fontSize: "15px" }}>{item?.charging}:</span>{" "}
                    {item.chargingValue}
                  </Typography>
                </Grid>
              )}
            </CustomGrid>
          </Grid>
        );
      })}
      {/* {[1, 2, 3].map((index) => (
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
      ))} */}

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
