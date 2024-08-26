"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";

const columns = [
  "Tariff ID",
  "Tariff name ",
  "Base rate",
  "00:00 hr. - 06:00 hr. & 22:00 hr. - 24:00 hr.",
  "06:00 hr. - 09:00 hr. & 12:00 hr. - 18:00 hr.",
  "09:00 hr. -12:00 hr",
  "18:00 hr. - 22:00 hr.",
];
const Table = ({
  data,
  deviceData,
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

  const handleExport = (data) => {
    console.log("Exporting data", data);

    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const modifiedData = data?.map((row) => ({
      employeeId: row?.employeeId,
      status: row?.status,
      lastName: row?.lastName,
      mobileNumber: row?.mobileNumber,
      mobileNumber1: row?.mobileNumber1,
      mobileNumber2: row?.mobileNumber2,
      mobileNumber3: row?.mobileNumber3,
    }));

    const csvData = [];
    const tableHeading = "All Tariff Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "Tariff ID",
      "Tariff name ID",
      "Base Rate",
      "00:00 hr. - 06:00 hr. & 22:00 hr. - 24:00 hr.",
      "06:00 hr. - 09:00 hr. & 12:00 hr. - 18:00 hr.",
      "09:00 hr. -12:00 hr",
      "18:00 hr. - 22:00 hr.",
    ];
    csvData.push(headerRow);

    modifiedData.forEach((row) => {
      const rowData = [
        row?.employeeId,
        row?.status,
        row?.lastName,
        row?.mobileNumber,
        row?.mobileNumber1,
        row?.mobileNumber2,
        row?.mobileNumber3,
      ];
      csvData.push(rowData);
    });
    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "TariffData.csv");
    notifySuccess("Download Excel Succefully");
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };
  const getFormattedData = (data) => {
    console.log("data", data);
    return data?.map((item, index) => ({
      employeeId: item?.employeeId ?? "--",
      status: item?.status ?? "--",
      lastName: item?.lastName ?? "--",
      mobileNumber: item?.mobileNumber ? item?.mobileNumber : "--",
      mobileNumber1: item?.mobileNumber1 ? item?.mobileNumber1 : "--",
      mobileNumber2: item?.mobileNumber2 ? item?.mobileNumber2 : "--",
      mobileNumber3: item?.mobileNumber3 ? item?.mobileNumber3 : "--",
    }));
  };

  return (
    <Grid container>
      <ToastComponent />
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
          <Typography variant="h3">Tariff Sheet</Typography>
        </Grid>
        <Grid item className="customSearch">
          <Grid container>
            <Grid item mr={1}>
              <Button
                variant="outlined"
                sx={{ mr: 1 }}
                onClick={() => {
                  handleExport(data);
                }}
                startIcon={<FaRegFileExcel />}
                size="large"
              >
                Download Excel
              </Button>
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
          rows={getFormattedData(data)}
          count={data?.length}
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
