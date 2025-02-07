"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import { CustomDownloadExcel } from "@/app/(components)/mui-components/DownloadExcel/index";
import moment from "moment";
import { FaRegFileExcel } from "react-icons/fa";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";

const Table = ({
  data,
  columns,
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
  const getFormattedData = (data) => {
    return data?.map((item, index) => ({
      fleetNumber: item?.fleetNumber ?? "--",
      eta: moment(item?.eta).format("lll") ?? "--",
      etd:
        item?.etd && item?.eta
          ? moment
              .utc(moment(item.etd).diff(moment(item.eta)))
              .format("HH:mm:ss")
          : "--",
      stationCode: item?.stationCode ? item?.stationCode : "--",
      batteryPercentage: item?.batteryPercentage
        ? item?.batteryPercentage.toFixed(2)
        : "--",
    }));
  };
  const handleExport = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    // Get formatted data
    const formattedData = getFormattedData(data);

    // Define headers
    const headerRow = [
      "Fleet Number",
      "ETA",
      "ETD (HH:mm:ss)",
      "Station Code",
      "Battery Percentage",
    ];

    // Convert formattedData to CSV format
    const csvData = [
      ["", "", "Scheduling history", "", ""], // Title row
      [],
      headerRow,
      ...formattedData.map((row) => [
        row.fleetNumber,
        row.eta,
        row.etd,
        row.stationCode,
        row.batteryPercentage,
      ]),
    ];

    // Convert to CSV string and trigger download
    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "schedulingHistory.csv");
    notifySuccess("Download Excel Successfully");
  };

  return (
    <Grid container mt={3}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        p={2}
        sx={{
          backgroundColor: "#fff",

          borderRadius: "16px 16px 0px 0px",
        }}
      >
        <Grid item>
          <Typography variant="h3">History </Typography>
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
  );
};

export default Table;
