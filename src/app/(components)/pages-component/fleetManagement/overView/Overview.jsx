"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Button,
  LinearProgress,
  Badge,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { IoEyeOutline } from "react-icons/io5";
import Graph from "@/app/(components)/pages-component/fleetManagement/vehicle/graph";
import Graph2 from "@/app/(components)/pages-component/fleetManagement/vehicle/graph2";
import Graph3 from "@/app/(components)/pages-component/fleetManagement/vehicle/graph3";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import { CustomDropdown } from "@/app/(components)/mui-components/DropdownButton";
import DistanceTravel from "../ViewReport/DistanceTravel";
import Map from "@/app/(components)/map/map";
import MapDetails from "@/app/(components)/map/mapDetails";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";
import styled from "@emotion/styled";

const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#6099EB",
  borderRadius: "16px",
  color: "#fff",
}));

const Badge1 = styled(Badge)(({ color }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: color,
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },
  marginLeft: "10px",
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
  const [distance, setDistance] = useState(false);
  const [payload, setPayload] = useState(false);
  const [trips, setTrips] = useState(false);
  const [data2, setData2] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [icons, setIcons] = useState(null);
  const [totalDocuments, setTotalDocuments] = useState(
    data?.totalDocuments || 0
  );
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // Update search query with debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(debouncedSearchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchQuery, setSearchQuery]);

  useEffect(() => {
    setData2(data);
  }, [distance, payload, trips]);

  const handleExport = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const modifiedData = data?.map((row) => ({
      region: row.port?.regionName || "--",
      fleetId: row.fleetId || "--",
      status: row.status || "--",
      avgSpeed: `'${row.avgSpeed}` || "--",
      avgPayload: row.avgPayload || "--",
      totalDistance: row.totalDistance || "--",
      avgConsumption: row.avgConsumption || "--",
      breakdown: row.breakdown || "--",
      currentSoc: row.currentSoc || "--",
      effectiveRange: row.effectiveRange || "--",
    }));

    const csvData = [];
    const headerRow = [
      "Region",
      "E-tractor ID",
      "Status",
      "Avg. speed (km/hr.)",
      "Avg. payload (Ton)",
      "Total distance travelled(km)",
      "Avg. consumption(kwh/km)",
      "Breakdown",
      "Current SoC(%)",
      "Effective range(km)",
    ];
    csvData.push(headerRow);
    modifiedData.forEach((row) => {
      csvData.push([
        row.region,
        row.fleetId,
        row.status,
        `'${row.avgSpeed}`,
        row.avgPayload,
        row.totalDistance,
        row.avgConsumption,
        row.breakdown,
        row.currentSoc,
        row.effectiveRange,
      ]);
    });

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "FleetData.csv");
    notifySuccess("Download Excel Successfully");
  };

  const getFormattedData = (data) => {
    return data?.map((item, index) => ({
      region: item?.port ? item.port.regionName : "--",
      fleetId: item.fleetId ? item.fleetId : "--",
      status: (
        <Box>
          <Typography
            sx={{
              color:
                item.status === "charging"
                  ? "#BFFC72"
                  : item.status === "parked"
                  ? "#FFC700"
                  : "#fff",
            }}
          >
            {item.status || "--"}
          </Typography>
        </Box>
      ),
      avgSpeed: item.avgSpeed || "--",
      avgPayload: item.avgPayload || "--",
      totalDistance: item.totalDistance || "--",
      avgConsumption: item.avgConsumption || "--",
      breakdown: item.breakdown || "--",
      currentSoc: item.currentSoc || "--",
      effectiveRange: item.effectiveRange || "--",
      Action: (
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Tooltip title="View">
              <IconButton size="small">
                <IoEyeOutline color="rgba(14, 1, 71, 1)" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      ),
    }));
  };

  const handleMapData = (index, point) => {
    setActiveMarker(index);
    setIcons(point);
  };

  const onClose = () => {
    setActiveMarker(null);
  };

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
      handleFunction: () => setDistance(true),
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
      handleFunction: () => setPayload(true),
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
      handleFunction: () => setTrips(true),
    },
  ];
  const days = ["Today", "Weekly", "Monthly", "Yearly"];

  return (
    <Grid container spacing={2}>
      {data1.map((item, index) => (
        <Grid key={index} item xl={4} lg={4} md={4} sm={6} xs={12}>
          <CustomGrid>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography>
                {item.titleParts.map((part, idx) => (
                  <span key={idx} style={part.style}>
                    {part.text}
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
              E-Tractor :{" "}
              <span style={{ fontWeight: 700, color: "#fff" }}>
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
              value={100}
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

      {activeMarker && (
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
      )}
      {activeMarker && (
        <Grid item md={3} xs={12} sm={4} height={"380px"}>
          <MapDetails icons={icons} onClose={onClose} title={"Fleet Data"} />
        </Grid>
      )}
      <Grid item xs={12}>
        {loading ? (
          <TableSkeleton
            rowNumber={new Array(10).fill(0)}
            tableCell={new Array(5).fill("15%")}
            actions={new Array(2).fill(0)}
          />
        ) : (
          <CustomTable
            page={page}
            rows={getFormattedData(data?.result)}
            count={totalDocuments}
            columns={[
              "Region",
              "E-tractor ID",
              "Status",
              "Avg. speed (km/hr)",
              "Avg. payload (Ton)",
              "Total distance travelled(km)",
              "Avg. consumption(kWh/km)",
              "Breakdown",
              "Current SoC(%)",
              "Effective range(km)",
              "Action",
            ]}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Overview;
