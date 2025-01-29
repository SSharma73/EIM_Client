import React, { useState } from "react";
import { Grid, Typography, Button, TextField, IconButton } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";
import { IoEyeOutline } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import TariffPlan from "./viewTariffPlan";

const columns = ["Tariff ID", "Tariff name ", "Base rate", "Action"];

const Table = ({
  data,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  loading,
  handleTableData,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // Store selected row data

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setDebouncedSearchQuery(value);

    const handler = setTimeout(() => {
      handleTableData({ search: value });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  };
  const clearSearch = () => {
    setDebouncedSearchQuery("");
    handleTableData({ search: "" });
  };

  const handleExport = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }
    const modifiedData = data?.map((row) => ({
      employeeId: row._id ?? "--",
      name: row.name ?? "--",
      baseRate: row.baseRate ?? "--",
    }));
    const csvData = [];
    const tableHeading = "All Tariff Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);
    const headerRow = ["Tariff ID", "Tariff name ID", "Base Rate"];
    csvData.push(headerRow);

    modifiedData.forEach((row) => {
      const rowData = [row?.employeeId, row?.name, row?.baseRate];
      csvData.push(rowData);
    });
    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "TariffData.csv");
    notifySuccess("Download Excel Successfully");
  };

  const getFormattedData = (data) => {
    return data?.map((item, index) => {
      const actionComponent = (
        <IconButton
          size="small"
          key={index}
          onClick={() => {
            setSelectedRow(item);
            setOpen(true);
          }}
        >
          <IoEyeOutline />
        </IconButton>
      );

      return {
        employeeId: item._id ? item._id.slice(0, 5) : "--",
        name: item.name ?? "--",
        baseRate: item.baseRate ?? "--",
        Action: actionComponent,
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
        className="customGrid"
      >
        <Grid item>
          <Typography variant="h3">Tariff Sheet</Typography>
        </Grid>
        <Grid item className="customSearch">
          <Grid container>
            <Grid item mr={1}>
              <TextField
                size="medium"
                value={debouncedSearchQuery}
                onChange={handleSearchChange}
                label={"Search"}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={clearSearch}
                      style={{
                        visibility: debouncedSearchQuery ? "visible" : "hidden",
                      }}
                    >
                      <IoCloseCircle color="white" />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item mr={1}>
              <Button
                variant="outlined"
                sx={{ mr: 1 }}
                onClick={() => {
                  handleExport(data?.result);
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
        <>
          <CustomTable
            page={page}
            columns={columns}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            count={data?.totalDocuments ?? 0}
            rows={getFormattedData(data?.result)}
          />
          {open && (
            <TariffPlan rows={selectedRow} open={open} setOpen={setOpen} />
          )}
        </>
      )}
    </Grid>
  );
};

export default Table;
