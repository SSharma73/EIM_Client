"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegFileExcel } from "react-icons/fa";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { CustomDropdown } from "@/app/(components)/mui-components/DropdownButton";
const Table = ({
  data,
  value,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  searchQuery,
  setSearchQuery,
  loading,
  getDataFromChildHandler,
}) => {
  const columns = [
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
  ];
  const [open, setOpenDialog] = React.useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

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
      status: row?.status,
      avgSpeed: `'${row?.avgSpeed}`,
      jobRole: row?.jobRole,
      avgPayload: row?.avgPayload,
      totalDistance: row?.totalDistance,
      avgConsumption: row?.avgConsumption,
      breakdown: row?.breakdown,
      currentSoc: row?.currentSoc,
      effectiveRange: row?.effectiveRange,
    }));

    const csvData = [];
    const tableHeading = "All Fleet Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

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
      const rowData = [
        row?.region,
        row?.fleetId,
        row?.status,
        `'${row?.avgSpeed}`,
        row?.avgPayload,
        row?.totalDistance,
        row?.avgConsumption,
        row?.breakdown,
        row?.currentSoc,
        row?.effectiveRange,
      ];
      csvData.push(rowData);
    });

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "FleetData.csv");
    notifySuccess("Download Excel Successfully");
  };
  const getFormattedData = (data) => {
    console.log("data", data);
    return data?.map((item, index) => ({
      region: item?.port ? item?.port?.regionName : "--",
      fleetId: item?.fleetId ? item?.fleetId : "--",
      status: (
        <Box>
          <Typography
            sx={{
              color:
                item?.status === "charging"
                  ? "#BFFC72"
                  : item?.status === "parked"
                  ? "#FFC700"
                  : item?.status === "trip"
                  ? "#0F0D15"
                  : "#fff",
            }}
          >
            {item?.status ? item?.status : "--"}
          </Typography>
        </Box>
      ),
      avgSpeed: item?.avgSpeed ? item?.avgSpeed : "--",
      avgPayload: item?.avgPayload ? item?.avgPayload : "--",
      totalDistance: item?.totalDistance ? item?.totalDistance : "--",
      avgConsumption: item?.avgConsumption ? item?.avgConsumption : "--",
      breakdown: item?.breakdown ? item?.breakdown : "--",
      currentSoc: item?.currentSoc ? item?.currentSoc : "--",
      effectiveRange: item?.effectiveRange ? item?.effectiveRange : "--",
      Action: [
        <Grid container justifyContent="center" spacing={2} key={index}>
          <Grid item xs={12}>
            <Tooltip title="View">
              <Link href={`/fleetManagement/${item?._id}?tab=${value}`}>
                <IconButton size="small">
                  <IoEyeOutline color="rgba(14, 1, 71, 1)" />
                </IconButton>
              </Link>
            </Tooltip>
          </Grid>
        </Grid>,
      ],
    }));
  };
  const menuItems = ["Mumbai", "Delhi", "Agra", "Punjab", "Kolkata"];
  return (
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
                sx={{ mr: 2 }}
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
            <Grid item mr={2}>
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
          rows={getFormattedData(data?.data)}
          count={data?.totalDocuments}
          columns={columns}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      )}
    </Grid>
  );
};

export default Table;
