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
const columns = ["Name", "Action"];
const columns2 = ["User name", "Mob. no.", "Email", "Assigned role"];

const Table = ({ type, fetchAllDetails, handleTableData }) => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [data, setData] = useState(null);
  const [open, setOpenDialog] = React.useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [Id, setId] = useState();

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
      employeeId: row?.employeeId,
      mobileNumber: row?.mobileNumber,
      emailId: row?.emailId,
      address: row?.address,
      role: row?.role,
      subAdmin: row?.subAdmin?.userName,
      parent: row?.parent?.userName,
    }));

    const csvData = [];
    const tableHeading = `All ${type} Data`;
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "Emp Id",
      "Mob. no.",
      "Email ID",
      "Location",
      "Assign role",
      "Sub admin",
      "Reporting manager",
    ];
    csvData.push(headerRow);

    modifiedData.forEach((row) => {
      const rowData = [
        row?.employeeId,
        row?.mobileNumber,
        row?.emailId,
        row?.address,
        row?.role,
        row?.subAdmin,
        row?.parent,
      ];
      csvData.push(rowData);
    });
    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${type}Data.csv`);
    notifySuccess("Download Excel Successfuly");
  };

  const handleConfirm = () => {
    handleDelete();
    handleCancel();
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    try {
      const response1 = await axiosInstance.delete(`/user/delete/${Id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const getFormattedData = (data) => {
    return data?.map((item, index) => {
      const actionComponent = (
        <Grid container justifyContent="center" spacing={2} key={index}>
          <Grid item>
            <Tooltip title="View">
              <IconButton size="small">
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
        sx={{
          backgroundColor: "#669BE9",
          color: "#fff",
          borderRadius: "16px 16px 0px 0px",
        }}
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
                  handleExport(data?.data);
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
    </Grid>
  );
};

export default Table;
