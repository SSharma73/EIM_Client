"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
  TextField,
} from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

import axiosInstance from "@/app/api/axiosInstance";
import CommonDialog from "../../../mui-components/Dialog/index.jsx";
import {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index.jsx";
import ViewPermission from "@/app/(components)/pages-component/userManagement/actions/viewPermissions.jsx";
const columns = ["Name", "Action"];
const columns2 = ["User name", "Mob. no.", "Email", "Assigned role"];

const Table = ({ type, fetchAllDetails, handleTableData }) => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [data, setData] = useState(null);
  const [open, setOpenDialog] = React.useState(false);
  const [openPermission, setOpenPermission] = React.useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearchChange = (event) => {
    setDebouncedSearchQuery(event.target.value);
    const handler = setTimeout(() => {
      handleTableData({ search: debouncedSearchQuery });
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  };

  const handleExport = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const modifiedData = data?.map((row) => ({
      name: row?.name,
      phone: row?.phone,
      email: row?.email,
    }));
    const modifiedData1 = data?.map((row) => ({
      name: row?.name,
    }));

    const csvData = [];
    const tableHeading = `All ${type} Data`;
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = ["Name"];
    const headerRow1 = ["User name", "Mob. no.", "Email"];
    csvData.push(type === "User" ? headerRow1 : headerRow);

    type === "User"
      ? modifiedData
      : modifiedData1.forEach((row) => {
          const rowData = [row?.name, row?.phone, row?.email];
          const rowData1 = [row?.name];
          csvData.push(type === "User" ? rowData : rowData1);
        });
    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${type}Data.csv`);
    notifySuccess("Download Excel Successfuly");
  };

  const handleConfirm = () => {
    handleCancel();
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };
  const handleOpenPermission = (item) => {
    setSelectedItem(item);
    setOpenPermission(true);
  };

  const getFormattedData = (data) => {
    return data?.map((item, index) => {
      const actionComponent = (
        <Grid container justifyContent="center" spacing={2} key={index}>
          <Grid item>
            <Tooltip title="View Permission">
              <IconButton
                size="small"
                onClick={() => handleOpenPermission(item)}
              >
                <IoEyeOutline color="rgba(14, 1, 71, 1)" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      );

      if (type === "User") {
        return {
          "User name": item?.name ?? "--",
          "Mob. no.": item?.phone ?? "--",
          Email: item?.email ?? "--",
          Action: actionComponent,
        };
      }
      return {
        Name: item?.roleName ?? "--",
        Action: actionComponent,
      };
    });
  };

  return (
    <Grid container>
      <CommonDialog
        open={open}
        fullWidth={true}
        maxWidth={"xs"}
        title="Confirmation"
        message="Are you sure you want to delete this device?"
        color="error"
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        p={2}
       className="customGrid"
      >
        <Grid item>
          <Typography variant="h3">
            {type}{" "}
            {fetchAllDetails?.totalDocuments
              ? `(${fetchAllDetails?.totalDocuments})`
              : "(0)"}
          </Typography>
        </Grid>
        <Grid item className="customSearch">
          <Grid container>
            <Grid item mr={1}>
              <Button
                variant="outlined"
                sx={{ mr: 1 }}
                onClick={() => {
                  handleExport(fetchAllDetails?.result);
                }}
                startIcon={<FaRegFileExcel />}
                size="large"
              >
                Download Excel
              </Button>
            </Grid>
            <Grid item mr={1}>
              <TextField
                size="medium"
                value={debouncedSearchQuery}
                onChange={handleSearchChange}
                label={"Search"}
                startIcon={<IoIosSearch />}
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
          rows={getFormattedData(fetchAllDetails?.result)}
          count={fetchAllDetails?.totalDocuments ?? 0}
          columns={type === "User" ? columns2 : columns}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          handleTableData={handleTableData}
        />
      )}
      <ViewPermission
        rows={selectedItem}
        open={openPermission}
        setOpen={setOpenPermission}
      />
    </Grid>
  );
};

export default Table;
