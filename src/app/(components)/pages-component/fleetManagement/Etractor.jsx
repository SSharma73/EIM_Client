"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Chip,
  Tooltip,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegFileExcel } from "react-icons/fa";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { notifyError, notifySuccess } from "../../mui-components/Snackbar";

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
  { label: "Offline", color: "red" },
  { label: "Charging", color: "green" },
  { label: "Trip", color: "blue" },
  { label: "Parked", color: "skyblue" },
];
const columns = [
  "E-tractor ID",
  "Status",
  "Current SoC(%)",
  "Current SoH(%)",
  "Charging cycle",
  "Swapping cycle",
  "No. of trips",
  "Total distance travelled(km)",
  "Avg. charging time(hr.)",
  "Total units consumed(kWh)",
  "Avg. speed(km/hr)",
  "Avg. payload(Ton)",
  "Max. payload(Ton)",
  "Total teus",
  "Teus handled(40F)",
  "Teus handled(20F)",
  "Teus each trip",
  "Avg. consumption(kWh/km)",
  "Breakdown",
  "Effective range(km)",
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
}) => {
  const [open, setOpenDialog] = React.useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [activeMarker, setActiveMarker] = useState(null);
  const [icons, setIcons] = useState(null);

  const handleMapData = (index, point) => {
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

  const handleCancel = () => {
    setOpenDialog(false);
  };
  const handleExport = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const modifiedData = data?.map((row) => ({
      fleetId: row?.fleetNumber,
      status: row?.status,
      batteryPercentage: row?.batteryPercentage,
      batteryHealth: row?.batteryHealth,
      chargingCycle: row?.chargingCycle,
      swappingCycle: row?.swappingCycle,
      trip: row?.trip,
      distanceTravelled: row?.distanceTravelled,
      avgCharging: row?.avgCharging,
      consumed: row?.consumed,
      averageSpeed: row?.averageSpeed,
      averagePayload: row?.averagePayload,
      maxPayload: row?.maxPayload,
      teus: row?.teus,
      handled: row?.handled,
      Teushandled: row?.Teushandled,
      Teuseach: row?.Teuseach,
      consumption: row?.consumption,
      breakdown: row?.breakdown,
      Effective: row?.effectiveRange,
    }));

    const csvData = [];
    const tableHeading = "All Fleet Etractor Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "E-tractor ID",
      "Status",
      "Current SoC(%)",
      "Current SoH(%)",
      "Charging cycle",
      "Swapping cycle",
      "No. of trips",
      "Total distance travelled(km)",
      "Avg. charging time(hr.)",
      "Total units consumed(kWh)",
      "Avg. speed(km/hr)",
      "Avg. payload(Ton)",
      "Max. payload(Ton)",
      "Total teus",
      "Teus handled(40F)",
      "Teus handled(20F)",
      "Teus each trip",
      "Avg. consumption(kWh/km)",
      "Breakdown",
      "Effective range(km)",
    ];
    csvData.push(headerRow);

    modifiedData.forEach((row) => {
      const rowData = [
        row?.fleetId,
        row?.status,
        row?.batteryPercentage,
        row?.batteryHealth,
        row?.chargingCycle,
        row?.swappingCycle,
        row?.trip,
        row?.distanceTravelled,
        row?.avgCharging,
        row?.consumed,
        row?.averageSpeed,
        row?.averagePayload,
        row?.maxPayload,
        row?.teus,
        row?.handled,
        row?.Teushandled,
        row?.Teuseach,
        row?.consumption,
        row?.breakdown,
        row?.effectiveRange,
      ];
      csvData.push(rowData);
    });
    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "FleetEtractorData.csv");
    notifySuccess("Download Excel Successfully");
  };
  const getFormattedData = (data) => {
    return data?.map((item, index) => ({
      fleetId: item.fleetNumber ?? "--",
      status: (
        <Box>
          <Typography
            sx={{
              color:
                item.status === "available"
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
      fleetId: item.fleetNumber ?? "--",
      currentSoc: item.batteryPercentage
        ? `${item.batteryPercentage?.toFixed(1)}%`
        : "--",
      currentSoh: item.batteryHealth
        ? `${item.batteryHealth?.toFixed(1)}%`
        : "--",
      chargingCycle: item?.chargingCycle ? item?.chargingCycle : "0",
      swappingCycle: item?.swappingCycle ? item?.swappingCycle : "0",
      trip: (
        <Chip
          key={index}
          color="primary"
          sx={{ width: "50px" }}
          label={item?.trip ?? "NA"}
        />
      ),
      totalDistance: item?.distanceTravelled
        ? `${item.distanceTravelled?.toFixed(2)} KM`
        : "--",
      breakdown: item?.breakdown ? item?.breakdown : "--",
      totalUnit: item?.totalUnit ? item?.totalUnit : "--",
      avgSpeed: item.averageSpeed.toFixed(1) || "--",
      mobileNumber8: item?.mobileNumber ? item?.mobileNumber : "--",
      mobileNumber9: item?.mobileNumber ? item?.mobileNumber : "--",
      mobileNumber6: item?.mobileNumber ? item?.mobileNumber : "--",
      mobileNumber4: item?.mobileNumber ? item?.mobileNumber : "--",
      mobileNumber3: item?.mobileNumber ? item?.mobileNumber : "--",
      mobileNumber11: item?.mobileNumber ? item?.mobileNumber : "--",
      mobileNumber1: item?.mobileNumber ? item?.mobileNumber : "--",
      mobileNumber12: item?.mobileNumber ? item?.mobileNumber : "--",
      effectiveRange: item.effectiveRange || "--",
      // Action: [
      //   <Grid container justifyContent="center" spacing={2} key={index}>
      //     <Grid item xs={12}>
      //       <Tooltip title="View">
      //         <Link href={`/fleetManagement/${item?._id}?tab=${value}`}>
      //           <IconButton size="small">
      //             <IoEyeOutline color="rgba(14, 1, 71, 1)" />
      //           </IconButton>
      //         </Link>
      //       </Tooltip>
      //     </Grid>
      //   </Grid>,
      // ],
    }));
  };
  return (
    <Grid container columnGap={2}>
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
                    handleExport(data?.result);
                  }}
                  startIcon={<FaRegFileExcel />}
                  size="large"
                >
                  Download Excel
                </Button>
              </Grid>
              {/* <Grid item ml={1} mr={1}>
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
