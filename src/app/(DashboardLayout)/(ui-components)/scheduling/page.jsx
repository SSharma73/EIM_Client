"use client";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import VehicleScheduling from "@/app/(components)/pages-component/scheduling/vehicleScheduling";
import ChargingScheduling from "@/app/(components)/pages-component/scheduling/chargingScheduling";
import ManagementGrid from "@/app/(components)/mui-components/Card";

const Scheduling = () => {
  const tabs = [
    { label: "E-Tractor", value: "1", content: <VehicleScheduling /> },
    { label: "CS/SS station", value: "2", content: <ChargingScheduling /> },
  ];
  const TabPanelList = [
    { component: <VehicleScheduling /> },
    { component: <ChargingScheduling /> },
  ];
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "Scheduling", link: "/scheduling" },
  ];
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
  return (
    <Grid container spacing={2} xs={12}>
      <Grid item xs={12}>
        <ManagementGrid
          breadcrumbItems={breadcrumbItems}
          moduleName={"Scheduling"}
          dropDown={droDownButtons}
          tabs={tabs}
          TabPanelList={TabPanelList}
          value={value}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default Scheduling;
