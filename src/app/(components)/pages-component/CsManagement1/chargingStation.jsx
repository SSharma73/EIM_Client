"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Tooltip,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegFileExcel } from "react-icons/fa";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { ChargingStationRow } from "../../table/rows";
import { notifyError, notifySuccess } from "../../mui-components/Snackbar";
import { PiCarBattery } from "react-icons/pi";

const Charging = ({ value, eventLabel }) => {
  const labelStatus = eventLabel?.slice(0, 8);

  const columns = [
    `${eventLabel} ID`,
    "Status",
    "Hub Name",
    "E-Tractor  In queue",
    ...(labelStatus === "Swapping" ? [] : [`Currently ${labelStatus}`]),
    labelStatus === "Swapping" ? "Total swapped" : "Total charged",
    "Unit consumed(kWh)",
    `Avg. ${labelStatus} time(hr.)`,
    "Peak hours",
    labelStatus === "Swapping" && "Battery packs",
    "Action",
  ];
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [deviceData, setDeviceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [open, setOpenDialog] = React.useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
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
  useEffect(() => {
    setData(ChargingStationRow);
  }, []);
  const handleExport = (data) => {
    console.log("Exporting data", data);

    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const modifiedData = data?.map((row) => ({
      region: row?.region,
      status: row?.status,
      hubname: row?.trip,
      avgSpeed: row?.avgSpeed,
      avgPayload: row?.avgPayload,
      maxPayload: row?.maxPayload,
      distance: row?.distance,
      value: row?.value,
    }));

    const csvData = [];
    const tableHeading = "All CS charging Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "Charger station ID",
      "Status",
      "Hub Name",
      "Truck In queue",
      "Currently charging",
      "Total charged",
      "Unit consumed(kW/h)",
      "Avg. charging time",
      "Peak hours",
      "Action",
    ];
    csvData.push(headerRow);

    modifiedData.forEach((row) => {
      const rowData = [
        row?.region,
        row?.status,
        row?.trip,
        row?.avgSpeed,
        row?.avgPayload,
        row?.maxPayload,
        row?.distance,
        row?.value,
      ];
      csvData.push(rowData);
    });
    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "CSChargingData.csv");
    notifySuccess("Download Excel Succefully");
  };

  const getFormattedData = (data) => {
    return data?.map((item, index) => {
      const color = item?.status === "Online" ? "success" : "error";
      const label = item?.status ? item?.status : "--";
      return {
        region: item?.region ? item?.region : "--",
        status: (
          <Box>
            <Chip
              size="small"
              label={<Typography variant="body2">{label}</Typography>}
              color={color}
              sx={{
                backgroundColor: color === "success" ? "green" : "red",
                color: "white",
              }}
            />
          </Box>
        ),
        lastName: item?.lastName ?? "--",
        ...(labelStatus === "Swapping" ? {} : { mobileNumber: "--" }),
        mobileNumber1: item?.mobileNumber1 ? item?.mobileNumber1 : "--",
        mobileNumber4: item?.mobileNumber1 ? item?.mobileNumber1 : "--",
        mobileNumber2: item?.mobileNumber2 ? item?.mobileNumber2 : "--",
        mobileNumber3: item?.mobileNumber3 ? item?.mobileNumber3 : "--",
        value: item?.value ? item?.value : "--",
        batterypacks: labelStatus === "Swapping" && (
          <Grid container key={index} width={250}>
            <Grid item xs={6} md={3}>
              <Tooltip title="discharged">
                <Button
                  size="small"
                  color="error"
                  startIcon={<PiCarBattery color="#FF0000" />}
                >
                  24%
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={6} md={3}>
              <Tooltip title="charging">
                <Button
                  variant="text"
                  color="warning"
                  size="small"
                  startIcon={<PiCarBattery color="#FFC300" />}
                >
                  40%
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={6} md={3}>
              <Tooltip title="charged">
                <Button
                  variant="text"
                  color="secondary"
                  size="small"
                  startIcon={<PiCarBattery color="#C0FE72" />}
                >
                  100%
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        ),
        Action: (
          <Grid container justifyContent="center" spacing={2} key={index}>
            <Grid item xs={6}>
              <Tooltip title="View">
                <Link
                  href={
                    "/csManagement/1235?tab=" +
                    value +
                    "&eventLabel=" +
                    eventLabel
                  }
                >
                  <IconButton size="small">
                    <IoEyeOutline color="rgba(14, 1, 71, 1)" />
                  </IconButton>
                </Link>
              </Tooltip>
            </Grid>
          </Grid>
        ),
      };
    });
  };
  return (
    <Grid container>
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
            <Typography variant="h3">{eventLabel}</Typography>
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
