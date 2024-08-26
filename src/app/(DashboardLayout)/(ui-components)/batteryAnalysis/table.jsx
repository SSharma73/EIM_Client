"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Tooltip, IconButton } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import CustomTextField from "@/app/(components)/mui-components/Text-Field's";
import { useRouter } from "next/navigation";
import { EyeIcon } from "@/app/(components)/mui-components/icons/index";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";

const columns = [
  "Battery packs ID",
  "Status",
  "Temperature(°C)",
  "Voltage(V)",
  "Current SoC(%)",
  "Current SoH(%)",
  "Error",
  "Charging cycle",
  "Units consumed(kWh)",
  "Avg. charging time(hr)",
  "Battery Location",
  "Action",
];
const Table = ({
  data,
  rowsPerPage,
  handleEfficiencyData,
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

  const handleSearchChange = async (event) => {
    const { value } = event.target;
    setDebouncedSearchQuery(value);
    await handleEfficiencyData(value);
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
  const router = useRouter();
  const handleViewClick = (id) => {
    router.push(`/batteryAnalysis/${id}`);
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
    const tableHeading = "All Battery Analysis Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "Battery packs ID",
      "Status",
      "Temperature(°C)",
      "Voltage(V)",
      "Battery SoC(%)",
      "Battery SoH(%)",
      "Error",
      "Charging cycle",
      "Units Consumed(kW)",
      "Avg. Charging time",
      "Battery Location",
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
    saveAs(blob, "BatteryAnalysis.csv");
    notifySuccess("Download Excel Succefully");
  };
  const getFormattedData = (data) => {
    console.log("data", data);
    return data?.map((item, index) => ({
      batteryId: item?.batteryId ? item?.batteryId : "--",
      status: item?.status ?? "--",
      temperature: item?.temperature ?? "--",
      voltage: item?.voltage ? item?.voltage : "--",
      batterySoc: item?.batterySoc ? item?.batterySoc : "--",
      batterySoh: item?.batterySoh ? item?.batterySoh : "--",
      chargingCycle: item?.chargingCycle ? item?.chargingCycle : "--",
      unitConsumed: item?.unitConsumed ? item?.unitConsumed : "--",
      avgChargingTime: item?.avgChargingTime ? item?.avgChargingTime : "--",
      Error: item?.Error ? item?.Error : "--",
      batteryLocation: item?.batteryLocation ? item?.batteryLocation : "--",
      Action: [
        <Grid
          container
          justifyContent="center"
          spacing={2}
          key={index}
          width={"130px"}
        >
          <Grid item xs={12} sm={4} md={4}>
            <Tooltip title="View">
              <IconButton
                size="small"
                onClick={() => {
                  handleViewClick(item?._id);
                }}
              >
                <EyeIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Tooltip title="Edit">
              <IconButton size="small">
                <FaRegEdit color="rgba(14, 1, 71, 1)" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Tooltip title="Delete">
              <IconButton size="small">
                <MdDeleteOutline color="rgba(14, 1, 71, 1)" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>,
      ],
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
          <Typography variant="h3">Battery Packs</Typography>
        </Grid>
        <Grid item className="customSearch">
          <Grid container>
            <Grid item mr={1}>
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
              <CommonDatePicker
                getDataFromChildHandler={getDataFromChildHandler}
              />
            </Grid>
            <CustomTextField
              type="search"
              placeholder="Search batteryId/ Name"
              value={debouncedSearchQuery}
              onChange={(e) => {
                handleSearchChange(e);
              }}
            />
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
