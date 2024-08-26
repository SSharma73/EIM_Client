import { Grid, Typography, Divider } from "@mui/material";
import React, { useState } from "react";
import Graph from "./overview/Graph/graph";
import Graph2 from "./overview/Graph/graph2";
import Graph3 from "./overview/Graph/graph3";
import ChargingStation from "@/app/(components)/pages-component/CsManagement1/overview/Charging";
import SwappingStation from "@/app/(components)/pages-component/CsManagement1/overview/Swapping";
import { CustomDropdown } from "../../mui-components/DropdownButton";

import Overview from "@/app/(components)/pages-component/CsManagement1/overview/Overview";
import TimerIcon from "@mui/icons-material/Timer";
import styled from "@emotion/styled";
import ManagementGrid from "../../mui-components/Card";

const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#6099EB",
  borderRadius: "16px",
  color: "#fff",
}));
const Overview1 = () => {
  const [date, setDate] = useState(null);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    { label: "Overview (512)" },
    { label: "Charging (23)" },
    { label: "Swapping (14)" },
    { label: "Available (14)" },
    { label: "Offline (296)" },
  ];
  const TabPanelList = [
    { component: <Overview /> },
    { component: <ChargingStation /> },
    { component: <SwappingStation /> },
    { component: <Overview /> },
    { component: <Overview /> },
  ];
  const data = [
    { title: "No. of session", content: "400" },
    { title: "Usage", content: "1947.33 kWh" },
    { title: "Up time", content: "400" },
  ];
  const days = ["Daily", "Weekly", "Yearly"];
  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid key={index} item xl={4} md={4} sm={12} xs={12}>
          <CustomGrid>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h6">
                <TimerIcon sx={{ verticalAlign: "middle", p: "3px" }} />{" "}
                {item.title}
              </Typography>
              <CustomDropdown
                variant="contained"
                size="small"
                buttonname="Daily"
                menuitems={days}
              />
            </Grid>
            <Typography variant="h4" color="primary" sx={{ mt: 2 }}>
              {item.content}{" "}
            </Typography>
            {index === 0 && <Graph />}
            {index === 1 && <Graph2 />}
            {index === 2 && <Graph3 />}
            <Divider sx={{ mb: 3 }} />
          </CustomGrid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <ManagementGrid
          tabs={tabs}
          TabPanelList={TabPanelList}
          value={value}
          handleChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default Overview1;
