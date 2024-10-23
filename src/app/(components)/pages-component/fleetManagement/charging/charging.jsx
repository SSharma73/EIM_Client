"use client";
import React, { useState, useEffect } from "react";
import Map from "../../../map";
import { Grid, Typography, Button, Tooltip, IconButton } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import MapDetails from "@/app/(components)/map/mapDetails";
import { FaRegFileExcel } from "react-icons/fa";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";
import { CustomDropdown } from "@/app/(components)/mui-components/DropdownButton";

const iconMapping = {
  sany: "./truck1.svg",
  byd: "./truck2.svg",
  photon: "./truck3.svg",
};

const buttonData = [
  { label: "Charging : 3", color: "red" },
  { label: "Swapping : 0", color: "green" },
  { label: "Scheduled CS: 6", color: "blue" },
  { label: "Scheduled SS : 8", color: "skyblue" },
];
const columns = [
  "Region",
  "E-tractor ID",
  "Current SoC (%)",
  "Current SoH (%)",
  "Units charged (kWh)",
  "Current status",
  "Estimated charging time(hr.)",
  "Charging cycle",
  "Swapping cycle",
  "Total units charged(kWh)",
  "Avg. charging time(hr.)",
  "Action",
];
const Charging = ({
  value,
  data,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  loading,
}) => {
  const [coordinates, setCoordinates] = useState([]);
  useEffect(() => {
    if (data?.result) {
      const newCoordinates = data?.result?.map((item) => ({
        lat: item?.location?.coordinates[0],
        log: item?.location?.coordinates[1],
        icon: iconMapping[item?.type],
      }));
      setCoordinates(newCoordinates);
    }
  }, [data]);
  const [icons, setIcons] = React.useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleMapData = (index, point) => {
    setActiveMarker(index);
    setIcons(point);
  };
  const onClose = () => {
    setActiveMarker(null);
  };

  const handleExport = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const modifiedData = data?.map((row) => ({
      region: row?.port?.regionName,
      fleetId: row?.fleetId,
      currentSoc: row?.currentSoc,
      currentSoh: row?.currentSoh,
      currentUnit: row?.currentUnit,
      status: row?.status,
      estimatedCharging: row?.estimatedCharging,
      chargingCycle: row?.chargingCycle,
      swappingCycle: row?.swappingCycle,
      totalUnits: row?.totalUnits,
      avgCharging: row?.avgCharging,
    }));

    const csvData = [];
    const tableHeading = "All Fleet Charging Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "Region",
      "E-tractor ID",
      "Current SoC (%)",
      "Current SoH (%)",
      "Current units charged (kWh)",
      "Current status",
      "Estimated charging time(hr)",
      "Charging cycle",
      "Swapping cycle",
      "Total units charged(kWh)",
      "Avg. charging Time",
    ];
    csvData.push(headerRow);

    modifiedData.forEach((row) => {
      const rowData = [
        row?.port?.regionName,
        row?.fleetId,
        row?.currentSoc,
        row?.currentSoh,
        row?.currentUnit,
        row?.status,
        row?.estimatedCharging,
        row?.chargingCycle,
        row?.swappingCycle,
        row?.totalUnits,
        row?.avgCharging,
      ];
      csvData.push(rowData);
    });
    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "FleetChargingData.csv");
    notifySuccess("Download Excel Successfully");
  };

  const getFormattedData = (data) => {
    return data?.map((item, index) => ({
      region: item?.region ?? "--",
      fleetId: item?.fleetNumber ?? "--",
      currentSoc: item.batteryPercentage
        ? `${item.batteryPercentage?.toFixed(1)}%`
        : "--",
      currentSoh: item.batteryHealth
        ? `${item.batteryHealth?.toFixed(1)}%`
        : "--",
      currentUnit: "--",
      status: item?.status ?? "--",
      estimatedCharging: item?.estimatedCharging ?? "--",
      chargingCycle: item?.chargingCycle ?? "--",
      swappingCycle: item?.swappingCycle ?? "--",
      totalUnits: "--",
      avgCharging: "--",
      Action: [
        <Grid
          container
          justifyContent="center"
          spacing={2}
          key={index}
          width={100}
        >
          <Grid item xs={6}>
            <Tooltip title="View">
              <Link href={`/fleetManagement/${item._id}?tab=${value}`}>
                <IconButton size="small">
                  <IoEyeOutline color="rgba(14, 1, 71, 1)" />
                </IconButton>
              </Link>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Tooltip title="Map">
              <IconButton size="small">
                <GrMapLocation color="rgba(14, 1, 71, 1)" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>,
      ],
    }));
  };

  return (
    <Grid container columnGap={2}>
      <Map
        coordinate={coordinates}
        handleMapData={handleMapData}
        activeMarker={activeMarker}
        setActiveMarker={setActiveMarker}
        buttonData={buttonData}
        onClose={onClose}
      />
      {activeMarker && activeMarker !== null && (
        <Grid item md={3} xs={12} height={"380px"}>
          <MapDetails icons={icons} onClose={onClose} title={"Charging Data"} />
        </Grid>
      )}
      <Grid container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          p={2}
          sx={{
            backgroundColor: "#669BE9",
            color: "#fff",
            borderRadius: "16px 16px 0px 0px",
          }}
        >
          <Grid item>
            <Typography variant="h3">FLEET ({data?.totalDocuments})</Typography>
          </Grid>
          <Grid item className="customSearch">
            <Grid container>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleExport(data?.data);
                  }}
                  startIcon={<FaRegFileExcel />}
                  size="large"
                >
                  Download Excel
                </Button>
              </Grid>
              {/* <Grid item mr={1}>
                <CustomDropdown
                  variant="outlined"
                  size="large"
                  buttonname={"Region"}
                  menuitems={menuItems}
                />
              </Grid> */}
              {/* <Grid item mr={1}>
                <CommonDatePicker
                  getDataFromChildHandler={getDataFromChildHandler}
                />
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
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
            count={data?.totalDocuments}
            columns={columns}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Charging;
