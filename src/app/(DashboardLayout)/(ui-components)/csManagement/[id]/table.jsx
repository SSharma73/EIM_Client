"use client";
import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import { CustomDownloadExcel } from "@/app/(components)/mui-components/DownloadExcel/index";
import { FaRegFileExcel } from "react-icons/fa";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Table = ({
  data,
  typeStatus,
  name,
  page,
  columns,
  setPage,
  loading,
  rowsPerPage,
  setRowsPerPage,
  getDataFromChildHandler,
  getFormattedData,
  handleTableData,
  setChargerType,
  chargerType,
}) => {
  const handleChange = (event) => {
    setChargerType(event.target.value);
  };
  const handleExport = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const formattedData = getFormattedData(data);

    const headerRow = [
      "Date & Time",
      "Hub name",
      "Status",
      "Truck ID",
      "Unit consumed(kWh)",
      "Avg. charging time(hr.)",
    ];

    const csvData = [
      ["", "", "All Fleet Charging Data", "", ""],
      [],
      headerRow,
      ...formattedData.map((row) => [
        row.Date,
        row["Hub name"],
        row.Status,
        row["Truck ID"],
        row["Unit consumed(kWh)"],
        row["Avg. charging time(hr.)"],
      ]),
    ];

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "FleetChargingData.csv");
    notifySuccess("Download Excel Successfully");
  };

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
          <Typography variant="h3">{name}</Typography>
          <Typography variant="subtitle1" mt={1}>
            Showing {data?.result?.length ?? 0} out of{" "}
            {data?.totalDocuments ?? 0} history
          </Typography>
        </Grid>
        <Grid item className="customSearch">
          <Grid container>
            {typeStatus.toLocaleLowerCase() === "sany" && (
              <Grid item mr={1} minWidth={"140px"}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={chargerType}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Charging"}>Charging</MenuItem>
                    <MenuItem value={"Swapping"}>Swapping</MenuItem>
                    <MenuItem value={"BatteryCharge"}>Battery Charge</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
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
          rows={getFormattedData(data?.result)}
          count={data?.totalDocuments}
          columns={columns}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          handleTableData={handleTableData}
        />
      )}
    </Grid>
  );
};

export default Table;
