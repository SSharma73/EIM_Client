"use client";
import React, { useState, useEffect } from "react";
import Map from "../../map/map";
import {
  Grid,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import MapDetails from "@/app/(components)/map/mapDetails";
import { GrMapLocation } from "react-icons/gr";
import { FaRegFileExcel } from "react-icons/fa";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { notifyError, notifySuccess } from "../../mui-components/Snackbar";
import { CustomDropdown } from "@/app/(components)/mui-components/DropdownButton";

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
  { label: "All : 200" },
  { label: "Charging : 0", color: "blue" },
  { label: "Swapping: 10", color: "green" },
  { label: "Online : 20", color: "skyblue" },
  { label: "Offline : 0", color: "red" },
  { label: "In Trip : 20", color: "#161821" },
];

const columns = [
  "Region",
  "E-tractor ID",
  "Trips",
  "Avg. speed(km/hr)",
  "Avg. payload(Ton)",
  "Max. payload(Ton)",
  "Distance travelled(km)",
  "Avg. breakdown",
  "Total Teus",
  "Teus handled(40F)",
  "Teus handled(20F)",
  "Teus each trip",
  "Action",
];
const Charging = ({
  value,
  data,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  searchQuery,
  setSearchQuery,
  loading,
  getDataFromChildHandler,
}) => {
  const [open, setOpenDialog] = React.useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [activeMarker, setActiveMarker] = useState(null);
  const [icons, setIcons] = useState(null);

  const handleMapData = (index, point) => {
    console.log("point", index, point);
    setActiveMarker(index);
    setIcons(point);
  };
  const onClose = () => {
    setActiveMarker(null);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(debouncedSearchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchQuery, setSearchQuery]);

  const handleSearchChange = (event) => {
    setDebouncedSearchQuery(event.target.value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    handleCancel();
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };
  const handleExport = (data) => {
    console.log("Exporting data", data);

    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const modifiedData = data?.map((row) => ({
      region: row?.port?.regionName,
      fleetId: row?.fleetId,
      trip: row?.trip,
      avgSpeed: row?.avgSpeed,
      avgPayload: row?.avgPayload,
      maxPayload: row?.maxPayload,
      distance: row?.distance,
      breakdown: row?.breakdown,
      totalUnit: row?.totalUnit,
      totalHandle: row?.totalHandle,
      mobileNumber8: row?.mobileNumber,
      jobRole: row?.jobRole,
    }));

    const csvData = [];
    const tableHeading = "All Fleet Trip Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "Region",
      "E-tractor ID",
      "Trips",
      "Avg. speed(km/hr)",
      "Avg. payload(Ton)",
      "Max. payload(Ton)",
      "Distance travelled(km)",
      "Avg. breakdown",
      "Total Teus",
      "Tues handled(40F)",
      "Tues handled(20F)",
      "Tues each trip",
    ];
    csvData.push(headerRow);

    modifiedData.forEach((row) => {
      const rowData = [
        row?.port?.regionName,
        row?.fleetId,
        row?.trip,
        row?.avgSpeed,
        row?.avgPayload,
        row?.maxPayload,
        row?.distance,
        row?.breakdown,
        row?.totalUnit,
        row?.totalHandle,
        row?.mobileNumber,
        row?.jobRole,
      ];
      csvData.push(rowData);
    });
    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "FleetTripData.csv");
    notifySuccess("Download Excel Successfully");
  };

  const getFormattedData = (data) => {
    console.log("data", data);
    return data?.map((item, index) => ({
      region: item?.port ? item?.port?.regionName : "--",
      fleetId: item?.fleetId ?? "--",
      trip: (
        <Chip
          key={index}
          color="primary"
          sx={{ width: "50px" }}
          label={item?.trip ?? "NA"}
        />
      ),
      avgSpeed: item?.avgSpeed ? item?.avgSpeed : "--",
      avgPayload: item?.avgPayload ? item?.avgPayload : "--",
      maxPayload: item?.maxPayload ? item?.maxPayload : "--",
      distance: item?.distance ? item?.distance : "--",
      breakdown: item?.breakdown ? item?.breakdown : "--",
      totalUnit: item?.totalUnit ? item?.totalUnit : "--",
      totalHandle: item?.totalHandle ? item?.totalHandle : "--",
      mobileNumber8: item?.mobileNumber ? item?.mobileNumber : "--",
      jobRole: item?.jobRole ? item?.jobRole : "--",
      Action: [
        <Grid container justifyContent="center" spacing={2} key={index}>
          <Grid item xs={6}>
            <Tooltip title="View">
              <Link href={`/fleetManagement/123?tab=${value}`}>
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
  const menuItems = ["Mumbai", "Delhi", "Agra", "Punjab", "Kolkata"];
  return (
    <Grid container columnGap={2}>
      {activeMarker && activeMarker !== null ? (
        <Grid item md={8.8} xs={12} height={"380px"}>
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
        <Grid item md={3} xs={12} height={"380px"}>
          <MapDetails
            icons={icons}
            onClose={onClose}
            title={"E-tractor current status"}
          />
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
              <Grid item mr={1}>
                <CustomDropdown
                  variant="outlined"
                  size="large"
                  buttonname={"Region"}
                  menuitems={menuItems}
                />
              </Grid>
              <Grid item mr={1}>
                <CommonDatePicker
                  getDataFromChildHandler={getDataFromChildHandler}
                />
              </Grid>
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
            rows={getFormattedData(data?.data?.result)}
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
