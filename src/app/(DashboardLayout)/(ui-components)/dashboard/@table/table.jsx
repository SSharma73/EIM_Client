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
import { GrMapLocation } from "react-icons/gr";

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
    "Region",
    "E-Tractor ID",
    "Current status",
    "Total distance travelled (km)",
    "Avg. consumption(kWh/km)",
    "Total units consumed(kWh)",
    "Avg. payload (Ton)",
    "Action",
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

  const getFormattedData = (data) => {
    console.log("data", data);
    return data?.map((item, index) => ({
      region: item?.region ?? "NA",
      id: item?.id ?? "--",
      status: (
        <Box>
          <Typography
            sx={{
              color:
                item?.status === "Charging"
                  ? "#BFFC72"
                  : item?.status === "Parked"
                  ? "#FFC700"
                  : item?.status === "Trip"
                  ? "#1A2773"
                  : "#FF0000",
            }}
          >
            {item?.status ? item?.status : "NA"}
          </Typography>
        </Box>
      ),
      totaltraveled: item?.totaltraveled ?? "--",
      avgconsumption: item?.avgconsumption ? item?.avgconsumption : "--",
      mobileNumber1: item?.mobileNumber1 ? item?.mobileNumber1 : "--",
      mobileNumber2: item?.mobileNumber2 ? item?.mobileNumber2 : "--",
      Action: [
        <Grid container justifyContent="center" spacing={2} key={index}>
          <Grid item xs={12}>
            <Tooltip title="View">
              <IconButton size="small">
                <GrMapLocation color="#C0FE72" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>,
      ],
    }));
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
            {/* <Grid item mr={1}>
              <CommonDatePicker
                getDataFromChildHandler={getDataFromChildHandler}
              />
            </Grid> */}
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
          count={data?.length}
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
