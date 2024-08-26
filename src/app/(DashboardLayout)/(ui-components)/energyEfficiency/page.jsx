"use client";
import { Grid, Button, Typography, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { dummyData } from "@/app/(components)/table/rows";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { CustomGrid } from "@/app/(components)/mui-components/CustomGrid/index";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import Table from "./table";
import ViewGraph from "./viewgraph";

const EnergyEfficiency = () => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [deviceData, setDeviceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [openGraph, setOpenGraph] = useState(false);

  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };
  const handleOpenGraph = () => {
    setOpenGraph(true);
  };
  
  const data1 = [
    {
      content: "20 Vehicle",
      value: "1",
      title: "Live CS/SS Load",
      label: "View report",
      data: "Distance Traveled",
    },
    {
      content: "20 Vehicle",
      value: "2",
      title: "CS/SS status",
      label: "View report",
      data: "Trip Payload",
    },
    {
      content: "20 Vehicle",
      value: "3",
      title: "Charging guns",
      label: "View report",
      data: "Trips",
    },
  ];
  const CSstatus = [
    { label: "Occupied", data: "20 ", color: "#00BE2A" },
    { label: "Offline", data: "3 ", color: "#FF7474" },
    { label: "Available", data: "20 ", color: "#8B99AD" },
  ];
  const Connectorstatus = [
    { label: "Available guns", data: "20", color: "#56C5D8" },
    { label: "Charging", data: "3 ", color: "#94C6FF" },
    { label: "Finishing", data: "20 ", color: "#FFE895" },
    { label: "Down guns", data: "25", color: "#F1F1F1" },
  ];
  const droDownButtons = [
    {
      label: "Region",
      menuItems: ["Mumbai", "Delhi", "Agra", "Punjab", "Kolkata"],
    },
    {
      label: "Location",
      menuItems: ["Location 1", "Location 2", "Location 3"],
    },
  ];
  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "CS/SS-Efficiency", link: "/energyEfficiency" },
  ];
  useEffect(() => {
    setData(dummyData);
  }, []);
  return (
    <Grid container spacing={2}>
      <ViewGraph open={openGraph} setOpen={setOpenGraph} />
      <Grid item xs={12}>
        <ManagementGrid
          breadcrumbItems={breadcrumbItems}
          moduleName={"CS/SS Efficiency"}
          dropDown={droDownButtons}
        />
      </Grid>
      {data1.map((item, index) => (
        <Grid key={item.value} item xl={4} md={4} sm={12} xs={12}>
          <CustomGrid height={300}>
            {item.value === "1" && (
              <>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">{item.title}</Typography>
                  <Button variant="contained" onClick={handleOpenGraph}>
                    View Graph
                  </Button>
                </Grid>
                <Gauge
                  height={180}
                  innerRadius={"85%"}
                  cornerRadius={"20px"}
                  value={245}
                  startAngle={-110}
                  endAngle={110}
                  sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 30,
                      transform: "translate(0px, 0px)",
                    },
                  }}
                  text={({ value }) => `${value} kW`}
                />
              </>
            )}
            {item.value === "2" && (
              <>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography>Total CS/SS : 210</Typography>
                </Grid>
                {CSstatus.map((item1, index) => (
                  <Grid
                    key={index}
                    container
                    justifyContent="space-between"
                    sx={{
                      backgroundColor: item1.color,
                      p: 1.5,
                      border: "1px solid green",
                      mt: 1,
                    }}
                  >
                    <Typography>{item1.label}</Typography>
                    <Typography>{item1.data}</Typography>
                  </Grid>
                ))}
              </>
            )}
            {item.value === "3" && (
              <>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography>Total guns : 210</Typography>
                </Grid>
                {Connectorstatus.map((item1, index) => (
                  <Grid
                    key={index}
                    container
                    justifyContent="space-between"
                    sx={{
                      backgroundColor: item1.color,
                      p: 1.5,
                      border: "1px solid green",
                      mt: 1,
                    }}
                  >
                    <Typography color={"#000"}>{item1.label}</Typography>
                    <Typography color={"#000"}>{item1.data}</Typography>
                  </Grid>
                ))}
              </>
            )}
          </CustomGrid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Table
          data={data}
          deviceData={deviceData}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
          getDataFromChildHandler={getDataFromChildHandler}
        />
      </Grid>
    </Grid>
  );
};

export default EnergyEfficiency;
