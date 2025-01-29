"use client";
import React, { useState, useEffect } from "react";
import Map from "@/app/(components)/map/directionMap";
import {
  Grid,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import MapDetails from "@/app/(components)/map/mapDetails";
import { FaRegFileExcel } from "react-icons/fa";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { notifyError, notifySuccess } from "../../mui-components/Snackbar";

const iconUrls = ["./SANY.svg", "./BYD.svg", "./foton.svg", "./truck4.svg"];
const iconMapping = {
  sany: "./SANY.svg",
  byd: "./BYD.svg",
  photon: "./foton.svg",
};

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
  // "Action",
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
  const [coordinate, setCoordinate] = useState([]);
  const [truckDetails, setTruckDetails] = useState(null);

  const handleMapData = (index, point) => {
    setActiveMarker(index + 1);
    setIcons(point?.icon);
    setTruckDetails(point);
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
    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const formattedData = getFormattedData({ result: data });

    const csvData = [];
    const tableHeading = "All Fleet Trip Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "Region",
      "E-tractor ID",
      "Trips",
      "Avg. speed (km/hr)",
      "Avg. payload (Ton)",
      "Max. payload (Ton)",
      "Distance travelled (km)",
      "Avg. breakdown",
      "Total Teus",
      "Tues handled (40F)",
      "Mobile Number",
      "Job Role",
    ];
    csvData.push(headerRow);

    formattedData.forEach((row) => {
      const rowData = [
        row?.region,
        row?.fleetId,
        row?.trip ?? "--",
        row?.avgSpeed,
        row?.avgPayload,
        row?.maxPayload,
        row?.totalDistance,
        row?.breakdown,
        row?.totalUnit,
        row?.totalHandle,
        row?.mobileNumber8,
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
    return data?.result?.map((item, index) => ({
      region: item?.region ?? "--",
      fleetId: item.fleetNumber ?? "--",
      FleetStatus: (
        <Box>
          <Chip
            size="small"
            // sx={{
            //   backgroundColor:
            //     item.isConnected === "offline"
            //       ? "orange"
            //       : item.isConnected === "disconnected"
            //       ? "red"
            //       : "green",
            //   color: "green",
            // }}
            label={<Typography variant="body2">{"Scheduled"}</Typography>}
          />
        </Box>
      ),
      avgSpeed: item?.averageSpeed.toFixed(1) || "--",
      avgPayload: item?.avgPayload || "3.6355",
      maxPayload: item?.maxPayload ? item?.maxPayload : "6",
      totalDistance: item?.distanceTravelled
        ? `${item?.distanceTravelled?.toFixed(2)} KM`
        : "--",
      breakdown: item?.breakdown || "2",
      totalUnit: item?.totalUnit ? item?.totalUnit : "5",
      totalHandle: item?.totalHandle ? item?.totalHandle : "2.5",
      mobileNumber8: item?.mobileNumber ? item?.mobileNumber : "2.5",
      jobRole: item?.jobRole ? item?.jobRole : "6",
      // Action: [
      //   <Grid container justifyContent="center" spacing={2} key={index}>
      //     <Grid item xs={6}>
      //       <Tooltip title="View">
      //         <Link href={`/fleetManagement/${item?._id}?tab=${value}`}>
      //           <IconButton size="small">
      //             <IoEyeOutline color="rgba(14, 1, 71, 1)" />
      //           </IconButton>
      //         </Link>
      //       </Tooltip>
      //     </Grid>
      //     <Grid item xs={6}>
      //       <Tooltip title="Map">
      //         <IconButton size="small">
      //           <GrMapLocation color="rgba(14, 1, 71, 1)" />
      //         </IconButton>
      //       </Tooltip>
      //     </Grid>
      //   </Grid>,
      // ],
    }));
  };
  const menuItems = ["Mumbai", "Delhi", "Agra", "Punjab", "Kolkata"];
  useEffect(() => {
    if (data?.result) {
      const mappedCoordinates = data.result.map((fleet) => ({
        lat: fleet.location.coordinates[1], // Latitude
        lon: fleet.location.coordinates[0], // Longitude
        icon: iconMapping[fleet.type],
        _id: fleet?._id,
        batteryPercentage: fleet?.batteryPercentage,
        distanceTravelled: fleet?.distanceTravelled,
        lastConnectedHeartBeat: fleet?.lastConnectedHeartBeat,
        type: fleet?.type,
        averageSpeed: fleet?.averageSpeed,
        fleetNumber: fleet?.fleetNumber,
      }));

      setCoordinate(mappedCoordinates);
    }
  }, [data]);

  //AIzaSyBrsCdS1KEJ9QDOgnl5gwnemCuLJDKzp9Y
  return (
    <Grid container columnGap={2}>
      {activeMarker && activeMarker !== null ? (
        <Grid item xl={8.8} xs={11.8} md={7.8} height={"380px"}>
          <Map
            handleMapData={handleMapData}
            iconUrls={iconUrls}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            // buttonData={buttonData}
            coordinates={coordinate}
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
            // buttonData={buttonData}
            coordinates={coordinate}
            onClose={onClose}
          />
        </Grid>
      )}
      {activeMarker && activeMarker >= 0 && (
        <Grid item xl={3} xs={12} md={4} height={"380px"}>
          <MapDetails
            icons={icons}
            onClose={onClose}
            truckDetails={truckDetails}
          />
        </Grid>
      )}
      <Grid container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          p={2}
          className="customGrid"
        >
          <Grid item>
            <Typography variant="h3">
              FLEET ({data?.totalDocuments ?? 0})
            </Typography>
          </Grid>
          <Grid item className="customSearch">
            <Grid container>
              <Grid item mr={1}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleExport(data?.result);
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
            rows={getFormattedData(data)}
            count={data?.totalDocuments ?? 0}
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
