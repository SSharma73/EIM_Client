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
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegFileExcel } from "react-icons/fa";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { notifyError, notifySuccess } from "../../mui-components/Snackbar";
import CommonDialog from "@/app/(components)/mui-components/Dialog";
import { RiShutDownLine } from "react-icons/ri";
import axiosInstance from "@/app/api/axiosInstance";
import { MdRestartAlt } from "react-icons/md";
import { PiCarBattery } from "react-icons/pi";

const Charging = ({
  type,
  value,
  eventLabel,
  fetchAllDetails,
  fetchDetails,
}) => {
  const labelStatus = eventLabel?.slice(0, 8);
  const columns = [
    `${eventLabel} ID`,
    "Status",
    "Hub Name",
    "E-Tractor In queue",
    ...(labelStatus === "Swapping"
      ? [`Currently ${labelStatus}`]
      : [`Currently ${labelStatus}`]),
    "Total charged",
    labelStatus === "Swapping" && "Total swapped",
    "Unit consumed (kWh)",
    `Avg. ${labelStatus} time (hr.)`,
    labelStatus === "Swapping" && "Battery packs",
    "Action",
  ];
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
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [openComman, setOpenComman] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(
    "This charger is online. Are you sure you want to proceed?"
  );
  const [items, setItems] = useState(null);
  const handleCommanCancel = () => {
    setOpenComman(false);
  };
  const handleCommanConfirm = () => {
    updateChargerStatus(items._id, items.status);
  };
  const handleCommanDialog = (data) => {
    setItems(data);
    if (data.status === "available") {
      setDialogMessage(
        "This charger is online. Are you sure you want to proceed?"
      );
    } else if (data.status === "offline") {
      setDialogMessage(
        "This charger is offline. Are you sure you want to proceed?"
      );
    }
    setOpenComman(true);
  };

  const handleExport = (data) => {
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
  const updateChargerStatus = async (chargerId, currentStatus) => {
    const breakDownValue = currentStatus === "available" ? 1 : 0;
    const url = `charger/updateChargerById/${chargerId}`;
    const requestBody = {
      breakDown: breakDownValue,
    };
    try {
      const { data, status } = await axiosInstance.put(url, requestBody);
      if (status === 200) {
        fetchDetails({ limit: 10, page: 1, type: type });
        handleCommanCancel();
        notifySuccess(data?.message);
      }
    } catch (error) {
      notifyError(error.data.msg);
      console.error("Error updating charger:", error);
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
        { index: 4 },
        { index: 3 },
        { index: 2 },
        { index: 1 },
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
        hubName: item?.name ?? "--",
        eTractorInQueue: item?.queue?.length ?? "--",
        currentlyStatus: item?.currentlyCharging ?? "--",
        totalCharged: item?.totalCharged ?? "--",
        totalSwapped: labelStatus === "Swapping" && item?.totalSwapped,
        unitConsumed: item?.unitConsumed?.toFixed(2) ?? "--",
        avgTime: item?.averageChargingTime ?? "--",
        batteryPacks: labelStatus === "Swapping" && (
          <Grid container key={index} width={270}>
            {batteryStates?.map((state) => {
              const batteryInfo = getBatteryStatus(
                item?.batterySoc[state.index]
              );
              return (
                <Grid item key={state.index}>
                  <Tooltip title={batteryInfo.percent}>
                    <Button
                      size="small"
                      sx={{ color: batteryInfo.color }}
                      startIcon={<PiCarBattery color={batteryInfo.color} />}
                    >
                      {batteryInfo?.percent}
                    </Button>
                  </Tooltip>
                </Grid>
              );
            })}
          </Grid>
        ),
        action: (
          <Grid
            container
            justifyContent="space-between"
            spacing={2}
            key={index}
          >
            <Grid item xs={6}>
              <Tooltip title="View">
                <Link
                  href={`/csManagement/${item._id}?tab=${value}&eventLabel=${label}&name=${item?.name}`}
                >
                  <IconButton size="small">
                    <IoEyeOutline color="rgba(14, 1, 71, 1)" />
                  </IconButton>
                </Link>
              </Tooltip>
              <Tooltip title={"change status"}>
                <IconButton
                  size={"small"}
                  onClick={() => handleCommanDialog(item)}
                >
                  {label === "available" ? (
                    <RiShutDownLine />
                  ) : (
                    <MdRestartAlt />
                  )}
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        ),
      };
    });
  };

  return (
    <Grid container>
      <CommonDialog
        open={openComman}
        fullWidth={true}
        maxWidth={"xs"}
        title="Cancel"
        message={dialogMessage}
        color="error"
        onClose={handleCommanCancel}
        onConfirm={handleCommanConfirm}
      />
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
                  onClick={() => {
                    handleExport(fetchAllDetails);
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
            rows={getFormattedData(fetchAllDetails?.result)}
            count={fetchAllDetails?.totalPage}
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
