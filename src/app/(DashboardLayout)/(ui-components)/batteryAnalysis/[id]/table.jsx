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
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import CustomTextField from "@/app/(components)/mui-components/Text-Field's/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { CustomDownloadExcel } from "@/app/(components)/mui-components/DownloadExcel/index";

const Table = ({
  data,
  params,
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
    "Date",
    "Temperature(°C)",
    "Voltage(V)",
    "Battery SoC(%)",
    "Battery SoH(%)",
    "Error",
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
  console.log("daaat", data);
  const getFormattedData = (data) => {
    console.log("data1", data);
    return data?.map((item, index) => ({
      date: item.date?item.date:"--",
      temperature: `${item.temperature.toFixed(1)}°C`?`${item.temperature.toFixed(1)}°C`:"--",
      voltage: `${item.voltage.toFixed(1)}V`?`${item.voltage.toFixed(1)}V`:"--",
      soc: `${item.soc}%`?`${item.soc}%`:'--',
      soh: `${item.soh}%`? `${item.soh}%`:'--',
      error: item.error?item.error:'--',
    }));
  };

  return (
    <Grid container mt={3}>
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
          <Typography variant="h3">Battery ({params.id})</Typography>
        </Grid>
        <Grid item className="customSearch">
          <Grid container>
            <Grid item mr={1}>
              <CustomDownloadExcel
                name={"Download Excel"}
                rows={data}
                data={"Fleet (121)"}
              />
            </Grid>
            <Grid item mr={1}>
              <CommonDatePicker
                getDataFromChildHandler={getDataFromChildHandler}
              />
            </Grid>
            {/* <CustomTextField
                            type="search"
                            placeholder="Search empId / Name"
                            value={debouncedSearchQuery}
                            onChange={handleSearchChange}
                        /> */}
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
