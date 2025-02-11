"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Button, useTheme, Chip } from "@mui/material";
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
  const getFormattedData = (data) => {
    return data?.map((item, index) => ({
      region: item?.region ?? "--",
      fleetId: item.fleetNumber ?? "--",
      status: (
        <Box>
          <Chip
            size="small"
            label={<Typography variant="body2">{item?.status}</Typography>}
            color={
              item?.status === "available"
                ? "success"
                : item?.status === "offline"
                ? "error"
                : "warning"
            }
            sx={{
              backgroundColor:
                item?.status === "available"
                  ? "success"
                  : item?.status === "offline"
                  ? "error"
                  : "warning",
              color: "white",
            }}
          />
        </Box>
      ),
      avgSpeed: item.averageSpeed.toFixed(1) || "--",
      avgPayload: item.avgPayload || "--",
      totalDistance: item?.distanceTravelled
        ? `${item.distanceTravelled?.toFixed(2)} KM`
        : "--",
      avgConsumption: item.avgConsumption?.toFixed(2) || "--",
      breakdown: item.breakdown || "--",
      currentSoc: item.batteryPercentage
        ? `${item.batteryPercentage?.toFixed(2)}%`
        : "--",
      effectiveRange: item.effectiveRange
        ? item.effectiveRange.toFixed(2)
        : "--",
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
          backgroundColor: "#fff",
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
          columns={[
            "Region",
            "E-tractor ID",
            "Status",
            "Avg. speed (km/hr)",
            "Avg. payload (Ton)",
            "Total distance travelled(km)",
            "Avg. consumption(kWh/km)",
            "Breakdown",
            "Current SoC(%)",
            "Effective range(km)",
          ]}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      )}
    </Grid>
  );
};

export default Table;
