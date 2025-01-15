"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import CustomTable from "../index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import { PiCarBattery } from "react-icons/pi";
const Table = ({
  data,
  heading,
  handleView,
  button,
  value,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  searchQuery,
  setSearchQuery,
  loading,
  handleExport,
  getDataFromChildHandler,
}) => {
  const columns = [
    "Station ID",
    "SS status",
    "Swapping queue",
    "Unit consumed(kWh)",
    "Battery availability status",
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
  const getBatteryStatus = (batterySoc) => {
    if (batterySoc === undefined || batterySoc === null) {
      return { color: "#B0B0B0", percent: "No data" }; // Handle no data scenario
    }
    if (batterySoc <= 50) {
      return { color: "#FF0000", percent: `${batterySoc}%` };
    } else if (batterySoc > 50 && batterySoc < 90) {
      return { color: "#FFC300", percent: `${batterySoc}%` };
    } else {
      return { color: "#C0FE72", percent: "100%" };
    }
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
      const batteryStates = [
        { index: 1 },
        { index: 2 },
        { index: 3 },
        { index: 4 },
      ];
      return {
        id: item?.stationCode ?? "--",
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
        unitConsumed: item?.unitConsumed?.toFixed(2) ?? "--",
        batteryPacks: (
          <Grid container justifyContent={"center"} key={index}>
            {batteryStates?.map((state) => {
              const batteryInfo = getBatteryStatus(
                item?.batterySoc ?? item?.batterySoc[state?.index]
              );
              return (
                <Grid item key={state?.index}>
                  <Tooltip title={batteryInfo?.percent}>
                    <Button
                      size="small"
                      sx={{ color: batteryInfo?.color }}
                      startIcon={<PiCarBattery color={batteryInfo?.color} />}
                    >
                      {batteryInfo?.percent}
                    </Button>
                  </Tooltip>
                </Grid>
              );
            })}
          </Grid>
        ),
      };
    });
  };

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
          <Typography variant="h3">{heading}</Typography>
        </Grid>
        <Grid item className="customSearch">
          <Grid container>
            <Grid item mr={1}>
              {button && (
                <Button variant="contained" onClick={handleView}>
                  {button}
                </Button>
              )}
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
