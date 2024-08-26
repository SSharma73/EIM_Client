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
  const getFormattedData = (data) => {
    console.log("data", data);
    return data?.map((item, index) => ({
      Id: item?.Id ?? "--",
      status: (
        <Box>
          <Typography
            sx={{
              color: item?.status === "Occupied" ? "#C2FD73" : "#fff",
            }}
          >
            {item?.status ? item?.status : "NA"}
          </Typography>
        </Box>
      ),
      chargingcycle: item?.chargingcycle ?? "--",

      Action: [
        <Grid container justifyContent="center" spacing={2} key={index}>
          <Grid item xs={6} md={3}>
            <Tooltip title={"discharged"}>
              <Button
                size="small"
                color="error"
                startIcon={<PiCarBattery color={"#FF0000"} />}
              >
                24%
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={6} md={3}>
            <Tooltip title={"charging"}>
              <Button
                variant="text"
                color="warning"
                size="small"
                startIcon={<PiCarBattery color={"#FFC300"} />}
              >
                40%
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={6} md={3}>
            <Tooltip title={"charged"}>
              <Button
                variant="text"
                color="secondary"
                size="small"
                startIcon={<PiCarBattery color={"#C0FE72"} />}
              >
                100%
              </Button>
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
