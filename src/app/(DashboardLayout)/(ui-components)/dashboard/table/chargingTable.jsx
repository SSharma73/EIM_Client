"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Button, Chip } from "@mui/material";
import CustomTable from "../index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
const Table = ({
  data,
  heading,
  handleView,
  button,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  searchQuery,
  setSearchQuery,
  loading,
}) => {
  const columns = [
    "Station ID",
    "CS status",
    "Charging queue",
    "Unit consumed(kWh)",
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

  const getFormattedData = (data) => {
    return data?.map((item) => {
      const color =
        item?.status === "available"
          ? "success"
          : item?.status === "offline"
          ? "error"
          : "warning";
      const label = item?.status ? item?.status : "--";
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
        eTractorInQueue: item?.queue?.length ?? "--",
        unitConsumed: item?.unitConsumed?.toFixed(2) ?? "--",
      };
    });
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
          rows={getFormattedData(data?.result)}
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