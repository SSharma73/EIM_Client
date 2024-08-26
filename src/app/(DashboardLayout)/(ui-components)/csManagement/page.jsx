"use client";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import Overview from "@/app/(components)/pages-component/CsManagement1/MainOverview";
import Charging from "@/app/(components)/pages-component/CsManagement1/chargingStation";
import DriverVehicle from "@/app/(components)/pages-component/CsManagement1/DriverVehicle";
import RevenueManagement from "@/app/(components)/pages-component/CsManagement1/Revenue";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import AddTractor from "@/app/(components)/pages-component/CsManagement1/addTractor";

const CsManagement = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false); // Initial active tab index
  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the active tab index
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "CS/SS-Management", link: "/csManagement" },
  ];
  const [selectedItems, setSelectedItems] = useState({
    Region: "",
    Customer: "",
    "Charging Station": "",
  });
  const handleDropdownSelect = (label, item) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [label]: item,
    }));
  };
  const dropDownButtons = [
    {
      label: "Region",
      menuItems: ["Mumbai", "Delhi", "Agra", "Punjab", "Kolkata"],
    },
    {
      label: "Customer",
      menuItems: ["Customer 1", "Customer 2", "Customer 3"],
    },
    {
      label: "Charging Station",
      menuItems: ["Charging station", "Swapping station"],
    },
  ];
  const eventLabel =
    selectedItems["Charging Station"] === "Swapping station"
      ? "Swapping station"
      : "Charging station";
  const tabs = [
    { label: "Overview" },
    {
      label: eventLabel,
    },
    { label: "E - Tractor" },
    { label: "Revenue management" },
  ];

  const TabPanelList = [
    { component: <Overview value="1" /> },
    { component: <Charging value="2" eventLabel={eventLabel} /> },
    { component: <DriverVehicle value="3" eventLabel={eventLabel} /> },
    { component: <RevenueManagement value="4" /> },
  ];
  return (
    <Grid container xs={12} sm={12} md={12}>
      {/* <ToastComponent /> */}
      <AddTractor open={open} setOpen={setOpen} />
      <ManagementGrid
        moduleName={"CS/SS Management"}
        breadcrumbItems={breadcrumbItems}
        dropDownEvent={dropDownButtons}
        button={"Add CS/SS"}
        tabs={tabs}
        value={value}
        handleChange={handleChange}
        TabPanelList={TabPanelList}
        handleClickOpen={handleOpen}
        selectedItems={selectedItems}
        handleDropdownSelect={handleDropdownSelect}
      />
    </Grid>
  );
};
export default CsManagement;
