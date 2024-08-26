"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Button, Chip } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import { RevenueManagementData } from "../../table/rows";
import Fusion from "./fusion";
import { notifyError, notifySuccess } from "../../mui-components/Snackbar";

const Charging = ({ value }) => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [deviceData, setDeviceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [fusion, setFusion] = useState(false);
  const [fusionValue, setFusionValue] = useState(null);
  const [open, setOpenDialog] = React.useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };
  const columns = [
    "E-Tractor ID",
    "Charging cycle",
    "Swapping cycle",
    "Total units consumed(kWh)",
    "Selected package",
    "Variable Unit(kWh)",
    "Variable bill",
    "Total bill",
  ];

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
  const handleOpenFusion = (item) => {
    setFusion(true);
    setFusionValue(item);
  };
  const handleExport = (data) => {
    console.log("Exporting data", data);

    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const modifiedData = data?.map((row) => ({
      Id: row?.Id,
      chargingcycle: row?.chargingcycle,
      swappingcycle: row?.swappingcycle,
      avgSpeed: row?.avgSpeed,
      selectedpackage: row?.selectedpackage,
      maxPayload: row?.maxPayload,
      distance: row?.distance,
      value: row?.value,
    }));

    const csvData = [];
    const tableHeading = "All CS Revenue Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "E-Tractor ID",
      "Charging cycle",
      "Swapping cycle",
      "Total units consumed(kwh)",
      "Selected Package",
      "Variable Unit(kwh)",
      "Variable bill",
      "Total bill",
    ];
    csvData.push(headerRow);

    modifiedData.forEach((row) => {
      const rowData = [
        row?.Id,
        row?.chargingcycle,
        row?.swappingcycle,
        row?.avgSpeed,
        row?.selectedpackage,
        row?.maxPayload,
        row?.distance,
        row?.value,
      ];
      csvData.push(rowData);
    });
    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "CS-RevenueData.csv");
    notifySuccess("Download Excel Succefully");
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

  useEffect(() => {
    setData(RevenueManagementData);
  }, []);

  const getFormattedData = (data) => {
    console.log("data", data);
    return data?.map((item, index) => ({
      Id: item?.Id ? item?.Id : "--",
      chargingcycle: (
        <Chip
          key={index}
          color="primary"
          sx={{ width: "80px", color: "#C0FE72" }}
          label={item?.chargingcycle}
        />
      ),
      swappingcycle: (
        <Chip
          key={index}
          color="primary"
          sx={{ width: "80px", color: "#C0FE72" }}
          label={item?.swappingcycle}
        />
      ),
      mobileNumber1: item?.mobileNumber1 ? item?.mobileNumber1 : "--",

      selectedpackage: (
        <Chip
          key={index}
          color="primary"
          sx={{ width: "80px", color: "#C0FE72" }}
          label={item?.selectedpackage}
          onClick={() => {
            handleOpenFusion(item?.selectedpackage);
          }}
        />
      ),
      mobileNumber4: item?.mobileNumber4 ? item?.mobileNumber4 : "--",
      mobileNumber3: item?.mobileNumber3 ? item?.mobileNumber3 : "--",
      jobRole: item?.jobRole ? item?.jobRole : "--",
    }));
  };
  return (
    <Grid container>
      <Fusion open={fusion} setOpen={setFusion} fusionValue={fusionValue} />
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
            <Typography variant="h3">Revenue Management Report</Typography>
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
    </Grid>
  );
};

export default Charging;
