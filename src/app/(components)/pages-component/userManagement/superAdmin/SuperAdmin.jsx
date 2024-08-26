"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import { CustomDownloadExcel } from "@/app/(components)/mui-components/DownloadExcel/index";
import Link from "next/link";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axiosInstance from "@/app/api/axiosInstance";
import CommonDialog from "../../../mui-components/Dialog/index.jsx";
import {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index.jsx";
const columns = [
  "Emp Id",
  "Mob. no.",
  "Email ID",
  "Location",
  "Assign role",
  "Sub admin",
  "Reporting manager",
  "Action",
];
const Table = ({ type }) => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [open, setOpenDialog] = React.useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [Id, setId] = useState();

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

  const handleOpenDialog = (id) => {
    setId(id);
    setOpenDialog(true);
  };
  const handleExport = (data) => {
    console.log("Exporting data", data);

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
    getData();
    handleCancel();
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };
  const getData = async () => {
    try {
      const response = await axiosInstance.get(
        `user/getAll/?userType=${type}&page=${
          page + 1
        }&pageSize=${rowsPerPage}&search=${searchQuery}`
      );
      console.log("sdfj", response);
      setData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [type]);
  const handleDelete = async () => {
    try {
      const response1 = await axiosInstance.delete(`/user/delete/${Id}`);
      console.log("delete", response1);
    } catch (error) {
      console.log(error);
    }
  };
  const getFormattedData = (data) => {
    return data?.map((item, index) => ({
      employeeId: (
        <Box>
          <span>{item?.employeeId}</span>
          <Box
            component="span"
            sx={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: item.color,
              marginLeft: "10px",
            }}
          />
        </Box>
      ),
      mobileNumber: item?.mobileNumber ?? "--",
      emailId: item?.emailId ?? "--",
      address: item?.address ? item?.address : "--",
      role: item?.role ? item?.role : "--",
      subAdmin: item?.subAdmin ? item?.subAdmin?.userName : "--",
      parent: item?.parent?.userName ? item?.parent?.userName : "--",
      Action: [
        <Grid container justifyContent="center" spacing={2} key={index}>
          <Grid item xs={4}>
            <Tooltip title="View">
              <Link href={`userManagement/${item?._id}`}>
                <IconButton size="small">
                  <IoEyeOutline color="rgba(14, 1, 71, 1)" />
                </IconButton>
              </Link>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => {
                  handleOpenDialog(item?._id);
                }}
              >
                <MdDeleteOutline color="rgba(14, 1, 71, 1)" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="Edit">
              <Link href={`/userManagement/editAccess`}>
                <IconButton size="small">
                  <FaEdit color="rgba(14, 1, 71, 1)" />
                </IconButton>
              </Link>
            </Tooltip>
          </Grid>
        </Grid>,
      ],
    }));
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
            {type} {data?.totalDocuments ? `(${data?.totalDocuments})` : "(0)"}
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
          rows={getFormattedData(data?.data)}
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
