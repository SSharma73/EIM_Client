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
  "Battery ID",
  "Status",
  "Battery health(%)",
  "Current SoC(%)",
  "Port name",
  "Charging cycle",
  "Swapping cycle",
  "Station code",
  "Units consumed(kWh)",
  "Avg. charging time(hr)",
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
    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const modifiedData = data?.map((row) => ({
      batteryId: row?.batteryNumber ?? "--",
      status: row?.status ?? "--",
      batteryHealth: row?.batteryHealth ?? "--",
      soc: row?.soc ?? "--",
      portId: row?.portId?.name ?? "--",
      chargingCycle: row?.chargingCycle ?? "0",
      swappingCycle: row?.swappingCycle ?? "0",
      stationId: item?.stationId ? item?.stationId?.stationCode : "--",
      unitConsumed: row?.unitConsumed ?? "0",
      averageCharging: row?.averageCharging ?? "0",
    }));

    const csvData = [];
    const tableHeading = "All Battery Analysis Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "Battery ID",
      "Status",
      "Battery Health (%)",
      "State of Charge (SOC) (%)",
      "Port Name",
      "Charging Cycle",
      "Swapping Cycle",
      "Fleet Number",
      "Unit Consumed",
      "Average Charging Time",
    ];
    csvData.push(headerRow);

    modifiedData.forEach((row) => {
      const rowData = [
        row.batteryId,
        row.status,
        row.batteryHealth,
        row.soc,
        row.portId,
        row.chargingCycle,
        row.swappingCycle,
        row.stationId,
        row.unitConsumed,
        row.averageCharging,
      ];
      csvData.push(rowData);
    });

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "BatteryAnalysis.csv");
    notifySuccess("Download Excel Successfully");
  };

  const getFormattedData = (data) => {
    return data?.map((item, index) => ({
      batteryId: item?.batteryNumber ? item?.batteryNumber : "--",
      status: (
        <>
          {item?.status === "Swapped" ? (
            <Grid container>
              <Grid item>{item?.status ?? "--"}</Grid>
              <Grid item>
                <Typography fontSize={"12px"}>
                  {item?.fleetId?.fleetNumber ?? "--"}
                </Typography>{" "}
              </Grid>
            </Grid>
          ) : (
            item?.status ?? "--"
          )}
        </>
      ),
      batteryHealth: `${item?.batteryHealth} %` ?? "--",
      soc: `${item?.soc} %` ?? "--",
      portId: item?.portId ? item?.portId?.name : "--",
      chargingCycle: item?.chargingCycle ? item?.chargingCycle : 0,
      swappingCycle: item?.swappingCycle ? item?.swappingCycle : "0",
      stationId: item?.stationId ? item?.stationId?.stationCode : "--",
      unitConsumed: item?.unitConsumed ? item?.unitConsumed.toFixed(2) : "0",
      averageCharging: item?.averageCharging
        ? item?.averageCharging.toFixed(2)
        : "0",

      Action: [
        <Grid container spacing={2} key={index}>
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
        className="customGrid"
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
                  handleExport(data?.result);
                }}
                startIcon={<FaRegFileExcel />}
                size="large"
              >
                Download Excel
              </Button>
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
