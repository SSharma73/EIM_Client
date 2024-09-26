"use client";
import { Button, Grid, Typography, Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import Graph from "@/app/(components)/pages-component/fleetManagement/vehicle/graph";
import Graph2 from "@/app/(components)/pages-component/fleetManagement/vehicle/graph2";
import Graph3 from "@/app/(components)/pages-component/fleetManagement/vehicle/graph3";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TimerIcon from "@mui/icons-material/Timer";
import Map from "@/app/(components)/map/map";
import DistanceTravel from "../ViewReport/DistanceTravel";
import { CustomDropdown } from "../../../mui-components/DropdownButton/index";
import { Fleet } from "../../../table/rows";
import styled from "@emotion/styled";
import Table from "./table";
import LinearProgress from "@mui/material/LinearProgress";
import MapDetails from "@/app/(components)/map/mapDetails";

const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#6099EB",
  borderRadius: "16px",
  color: "#fff",
}));
const iconUrls = [
  "./truck1.svg",
  "./truck2.svg",
  "./truck3.svg",
  "./truck4.svg",
];
const coordinate = [
  { lat: "28.51079782059423", log: "77.40362813493975" },
  { lat: "28.510404514720925", log: "77.40712974097106" },
  { lat: "28.512297585971584", log: "77.40356012099012" },
  { lat: "28.510728275696316", log: "77.40199688895548" },
  { lat: "28.511107212816803", log: "77.4063730115565" },
  { lat: "28.512937158827324", log: "77.41783963937374" },
];
const buttonData = [
  { label: "Charging : 3", color: "red" },
  { label: "Swapping : 0", color: "green" },
  { label: "Scheduled CS: 6", color: "blue" },
  { label: "Scheduled SS : 8", color: "skyblue" },
];
const Badge1 = styled(Badge)(({ color }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: color,
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },
  marginLeft: "10 px",
}));
const Overview = ({
  value,
  data,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  searchQuery,
  setSearchQuery,
  loading,
  params,
  getDataFromChildHandler,
}) => {
  const [distance, setDistance] = React.useState(false);
  const [payload, setPayload] = React.useState(false);
  const [trips, setTrips] = React.useState(false);
  const [data2, setData2] = useState(null);
  const [progress, setProgress] = React.useState(100);
  const [activeMarker, setActiveMarker] = useState(null);
  const [icons, setIcons] = useState(null);

  const handleMapData = (index, point) => {
    setActiveMarker(index);
    setIcons(point);
  };
  const onClose = () => {
    setActiveMarker(null);
  };

  const handleDistance = () => {
    setDistance(true);
  };
  const handlePayload = () => {
    setPayload(true);
  };
  const handleTrips = () => {
    setTrips(true);
  };
  useEffect(() => {
    setData2(Fleet);
  }, [distance, payload, trips]);
  const data1 = [
    {
      content: "20 ",
      value: "E-tractor",
      avg: "20 (km)",
      titleParts: [
        {
          text: "Distance travelled ",
          style: { fontSize: "16px", fontWeight: 600 },
        },
        { text: "(km)", style: { fontSize: "13px", fontWeight: 600 } },
      ],
      label: "View report",
      data: "Distance travelled",
      handleFunction: handleDistance,
    },
    {
      content: "30",
      value: "Vehicle",
      avg: "10 (Ton)",

      titleParts: [
        { text: "Trip payload ", style: { fontSize: "16px", fontWeight: 600 } },
        { text: "(Ton)", style: { fontSize: "13px", fontWeight: 600 } },
      ],
      label: "View report",
      data: "Trip payload",
      handleFunction: handlePayload,
    },
    {
      content: "10",
      value: "Vehicle",
      avg: "20 (kWh)",

      titleParts: [
        { text: "Trips ", style: { fontSize: "16px", fontWeight: 600 } },
        {
          text: "(Units consumed)",
          style: { fontSize: "13px", fontWeight: 600 },
        },
      ],
      label: "View report",
      data: "Trips",
      handleFunction: handleTrips,
    },
  ];

  const days = ["Today", "Weekly", "Monthly", "Yearly"];

  return (
    <Grid container spacing={2}>
      <DistanceTravel
        open={distance}
        setOpen={setDistance}
        data1="Distance travelled (Km)"
        data={data2}
      />
      <DistanceTravel
        open={payload}
        setOpen={setPayload}
        data1="Trip payload(Ton)"
        data={data2}
      />
      <DistanceTravel
        open={trips}
        setOpen={setTrips}
        data1="Trips (Units consumed)"
        data={data2}
      />
      {data1?.map((item, index) => (
        <Grid key={index} item xl={4} lg={4} md={4} sm={6} xs={12}>
          <CustomGrid>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>
                {item.titleParts?.map((part, idx) => (
                  <span key={idx} style={part?.style}>
                    {part?.text}
                  </span>
                ))}
              </Typography>
              <CustomDropdown
                variant="contained"
                size="small"
                buttonname="Weekly"
                menuitems={days}
              />
            </Grid>
            <Typography
              color={"primary"}
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              E-Tractor :
              <span style={{ fontWeight: 700, color: "#fff" }}>
                {"  "}
                {item.content}
              </span>
            </Typography>
            <Typography
              color={"primary"}
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              Avg :{" "}
              <span
                style={{ fontSize: "11px", fontWeight: 700, color: "#fff" }}
              >
                {item.avg}
              </span>
            </Typography>
            {index === 0 && <Graph />} {index === 1 && <Graph2 />}{" "}
            {index === 2 && <Graph3 />}
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ border: "0.6px" }}
            />
            <List>
              <ListItem
                disableGutters
                key={index}
                secondaryAction={
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={item.handleFunction}
                  >
                    {item.label}
                  </Button>
                }
              >
                <Badge1 color="secondary" variant="dot" />
                <ListItemText primary={item.data} sx={{ marginLeft: "10px" }} />
              </ListItem>
            </List>
          </CustomGrid>
        </Grid>
      ))}
      {activeMarker && activeMarker !== null ? (
        <Grid item xs={12} md={9} sm={8} height={"380px"}>
          <Map
            handleMapData={handleMapData}
            iconUrls={iconUrls}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            buttonData={buttonData}
            coordinate={coordinate}
            onClose={onClose}
          />
        </Grid>
      ) : (
        <Grid item xs={12} height={"380px"}>
          <Map
            handleMapData={handleMapData}
            iconUrls={iconUrls}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            buttonData={buttonData}
            coordinate={coordinate}
            onClose={onClose}
          />
        </Grid>
      )}
      {activeMarker && activeMarker !== null && (
        <Grid item md={3} xs={12} sm={4} height={"380px"}>
          <MapDetails icons={icons} onClose={onClose} title={"Fleet Data"} />
        </Grid>
      )}
      <Grid item xs={12}>
        <Table
          data={data?.result}
          params={params}
          value={value}
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

export default Overview;
