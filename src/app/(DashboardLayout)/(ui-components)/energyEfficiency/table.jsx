"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Button, Chip } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import { CustomDropdownEvent } from "@/app/(components)/mui-components/DropdownButton/dropDownEvent";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";
import axiosInstance from "@/app/api/axiosInstance";

const Table = ({
  data,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  loading,
}) => {
  const dropDownEvent = [
    {
      label: "Charging station",
      menuItems: ["Charging station", "Swapping station"],
    },
  ];
  const [fetchAllDetails, setFetchAllDetails] = useState(null);

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

  const type =
    selectedItems["Charging Station"] === "Swapping station" ? "sany" : "delta";
  const labelStatus = eventLabel?.slice(0, 8);
  const columns = [
    `${labelStatus} Station ID`,
    "Region",
    `${labelStatus} status`,
    "Queue",
    "Max. capacity(kW)",
    "Current load(kW)",
    "Last session started",
    "Alerts",
  ];

  const fetchDetails = async ({
    limit = 10,
    page = 1,
    type = "",
    status = "",
  } = {}) => {
    try {
      const params = new URLSearchParams({
        limit,
        page,
        type,
        status,
      });
      const { data } = await axiosInstance.get(
        `charger/fetchChargers?${params.toString()}`
      );
      setFetchAllDetails(data?.data);
    } catch (error) {
      console.error("Error fetching chargers:", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchDetails({
      search: "",
      limit: 10,
      page: 1,
      type: type,
    });
  }, [eventLabel]);

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

  const getFormattedData = (data) => {
    return data?.map((item, index) => {
      const color =
        item?.status === "available"
          ? "success"
          : item?.status === "offline"
          ? "error"
          : "warning";
      const label = item?.status ? item?.status : "--";

      return {
        id: item?.stationCode ?? "--",
        region: item.region ?? "--",
        status: (
          <Box>
            <Chip
              size="small"
              label={<Typography variant="body2">{label}</Typography>}
              color={color}
              sx={{
                backgroundColor: color,
                color: "white",
              }}
            />
          </Box>
        ),
        eTractorInQueue: item?.queue?.length ?? "--",
        maxCapacity: item?.maxCapacity ?? "--",
        currentCharging: item?.currentCharging ?? "--",
        lastSessionStarted: item?.lastSessionStarted ?? "--",
        alerts: item?.alerts ?? "--",
      };
    });
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
          rows={getFormattedData(fetchAllDetails?.result)}
          count={fetchAllDetails?.totalPage}
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
