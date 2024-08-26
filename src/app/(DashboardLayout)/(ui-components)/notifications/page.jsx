"use client";
import React, { useState } from "react";
import { Grid } from "@mui/material";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import Read from "./read";

const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Notification", link: "/notifications" },
];

const Page = () => {
  const [checkedStates, setCheckedStates] = useState({});

  const handleCheckboxChange = (index) => (event) => {
    setCheckedStates((prev) => ({
      ...prev,
      [index]: event.target.checked,
    }));
  };

  return (
    <Grid container>
      <ManagementGrid
        moduleName="Notifications"
        subHeading="See all notifications below"
        breadcrumbItems={breadcrumbItems}
        buttonItem={"Mark all as read"}
      />
      <Grid container>
        <Read />
      </Grid>
    </Grid>
  );
};

export default Page;
