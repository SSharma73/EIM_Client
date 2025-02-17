"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import { FaRegFileExcel } from "react-icons/fa";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import moment from "moment";
import { notifySuccess } from "@/app/(components)/mui-components/Snackbar";

const Table = ({
  data,
  params,
  rowsPerPage,
  setRowsPerPage,
  selectedFilter,
  setSelectedFilter,
  page,
  setPage,
  searchQuery,
  setSearchQuery,
  loading,
  getDataFromChildHandler,
  setBatteryCode,
}) => {
  // Dynamically modify columns based on the selected filter
  const columns =
    selectedFilter === "Swapping"
      ? [
          "Date",
          "Battery No.",
          "Status",
          "Avg. charging time(hr.)",
          "Battery SoC(%)",
          "Start SoC",
          "End SoC",
          "Total unit consumption(Kwh)",
        ]
      : [
          "Date",
          "Battery No.",
          "Status",
          "Avg. charging time(hr.)",
          "Battery SoC(%)",
          "Start SoC",
          "End SoC",
          "Meter start",
          "Meter stop",
          "Total unit consumption(Kwh)",
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
    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const formattedData = getFormattedData(data);

    const headerRow =
      selectedFilter === "Swapping"
        ? [
            "Date & Time",
            "Battery ID",
            "Status",
            "SOC",
            "Start SOC",
            "End SOC",
            "Unit Consumed (kWh)",
            "Avg. Charging Time (hr.)",
          ]
        : [
            "Date & Time",
            "Battery ID",
            "Status",
            "SOC",
            "Start SOC",
            "End SOC",
            "Meter Start",
            "Meter Stop",
            "Unit Consumed (kWh)",
            "Avg. Charging Time (hr.)",
          ];

    const csvData = [
      ["", "", "All Battery Logs Data", "", "", "", "", "", "", ""], // Title row
      [],
      headerRow,
      ...formattedData.map((row) => [
        row.date,
        row.batteryId,
        row.status,
        row.soc,
        row.startSoc,
        row.endSoc,
        row.meterStart,
        row.meterStop,
        row.totalConsumption,
        row["Avg. charging time(hr.)"],
      ]),
    ];

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "batteryLogsData.csv");
    notifySuccess("Download Excel Successfully");
  };

  const getFormattedData = (data) => {
    return data?.map((item) => {
      setBatteryCode(item?.batteryId?.batteryNumber);
      const formattedItem = {
        date: item?.createdAt ? moment(item.createdAt).format("lll") : "--",
        batteryId: item?.batteryId?.batteryNumber ?? "--",
        status: item?.status ?? "--",
        "Avg. charging time(hr.)":
          item?.meterStopTime && item?.meterStartTime
            ? (
                (new Date(item.meterStopTime) - new Date(item.meterStartTime)) /
                3600000
              ).toFixed(2)
            : "--",
        soc: item?.batteryId ? `${item.batteryId.soc} %` : "--",
        startSoc: item?.beforeSoc ?? "--",
        endSoc: item?.afterSoc ?? "--",
        totalConsumption: item?.totalConsumption ?? "--",
      };

      if (selectedFilter !== "Swapping") {
        formattedItem.meterStart = item?.meterStart ?? "--";
        formattedItem.meterStop = item?.meterStop ?? "--";
      }

      return formattedItem;
    });
  };

  // Filter the data based on selected filter
  const filteredData = selectedFilter
    ? data?.result.filter((item) => item?.status === selectedFilter)
    : data?.result;

  return (
    <Grid container mt={3}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        p={2}
        className="customGrid"
      >
        <Grid item>
          <Typography variant="h3">Battery logs</Typography>
        </Grid>
        <Grid item className="customSearch">
          <Grid container>
            <Grid item mr={1}>
              <Button
                variant="outlined"
                onClick={() => {
                  handleExport(filteredData);
                }}
                startIcon={<FaRegFileExcel />}
                size="large"
              >
                Download Excel
              </Button>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" sx={{ minWidth: 120, mr: 1.2 }}>
                <InputLabel id="filter-label">Filter</InputLabel>
                <Select
                  labelId="filter-label"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  label="Filter"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200,
                        marginTop: "-80px",
                        transition: "margin-top 0.3s ease",
                      },
                    },
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                  }}
                >
                  <MenuItem value="BatteryCharge">Charging</MenuItem>
                  <MenuItem value="Swapping">Swapping</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item mr={1}>
              <CommonDatePicker
                getDataFromChildHandler={getDataFromChildHandler}
                days={93}
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
          rows={getFormattedData(filteredData)}
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
