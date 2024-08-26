"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import { CustomDropdownEvent } from "@/app/(components)/mui-components/DropdownButton/dropDownEvent";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";

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
  const dropDownEvent = [
    {
      label: "Charging station",
      menuItems: ["Charging station", "Swapping station"],
    },
  ];
  const [selectedItems, setSelectedItems] = useState({
    "Charging station": "",
  });
  const handleDropdownSelect = (label, item) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [label]: item,
    }));
  };
  const eventLabel =
    selectedItems["Charging station"] === "Swapping station"
      ? "Swapping station"
      : "Charging station";

  console.log("label", eventLabel);

  const labelStatus = eventLabel?.slice(0, 8);
  const columns = [
    `${labelStatus} Station ID`,
    "Region",
    `${labelStatus} status`,
    "Queue",
    "Max. capacity(kW)",
    "Current load(kW)",
    "E-Tractor",
    "Last session started",
    "Alerts",
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
  const handleExport = (data) => {
    console.log("Exporting data", data);

    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const modifiedData = data?.map((row) => ({
      batteryId: row?.batteryId,
      status: row?.status,
      swappingcycle: row?.swappingcycle,
      avgSpeed: row?.avgSpeed,
      selectedpackage: row?.selectedpackage,
      maxPayload: row?.maxPayload,
      distance: row?.distance,
      value: row?.value,
      jobRole: row?.jobRole,
    }));

    const csvData = [];
    const tableHeading = "All CS/SS Efficiency Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "CS/SS Station ID",
      "Region",
      "Charging status",
      "Queue",
      "Max. capacity(kW)",
      "Current charging load(kW)",
      "E-Tractor",
      "Last session started",
      "Alerts",
    ];
    csvData.push(headerRow);

    modifiedData.forEach((row) => {
      const rowData = [
        row?.batteryId,
        row?.status,
        row?.swappingcycle,
        row?.avgSpeed,
        row?.selectedpackage,
        row?.maxPayload,
        row?.distance,
        row?.value,
        row?.jobRole,
      ];
      csvData.push(rowData);
    });
    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "CS/SS-EfficiencyData.csv");
    notifySuccess("Download Excel Succefully");
  };
  const handleCancel = () => {
    setOpenDialog(false);
  };
  const getFormattedData = (data) => {
    return data?.map((item, index) => ({
      batteryId: (
        <Box>
          <span>{item?.batteryId}</span>
          <Box
            component="span"
            sx={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: item.color,
              marginLeft: "10px",
            }}
          />
        </Box>
      ),
      region: item.region,
      status:
        labelStatus === "Swapping" && item?.status === "In Charging"
          ? "Available"
          : item?.status,
      queue: item?.queue ?? "--",
      maxCapacity: item?.maxCapacity ?? "--",
      currentCharging: item?.currentCharging ?? "--",
      ETractor: item?.ETractor ?? "--",
      lastSessionStarted: item?.lastSessionStarted ?? "--",
      alerts: item?.alerts ?? "--",
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
          <Typography variant="h3">{labelStatus} Efficiency Data</Typography>
        </Grid>
        <Grid item className="customSearch">
          <Grid container>
            <Grid item>
              <Button
                variant="outlined"
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
              {dropDownEvent.map((button, index) => (
                <CustomDropdownEvent
                  key={index}
                  size="large"
                  buttonname={selectedItems[button.label] || button.label}
                  menuitems={button.menuItems}
                  onItemSelect={(item) =>
                    handleDropdownSelect(button.label, item)
                  }
                  variant="contained"
                  sx={{ ml: 1 }}
                />
              ))}
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
