"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import { CustomDownloadExcel } from "@/app/(components)/mui-components/DownloadExcel/index";

const Table = ({
  data,
  name,
  page,
  columns,
  setPage,
  loading,
  rowsPerPage,
  setRowsPerPage,
  getDataFromChildHandler,
  getFormattedData,
}) => {
  const getStatus = (str) => {
    if (str?.toUpperCase() === "ACTIVE")
      return { status: "ACTIVE", color: "customChip activeGreen" };
    else return { status: "InActive", color: "customChip activeRed" };
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
          <Typography variant="h3">{name}</Typography>
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
          count={data?.totalPage}
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
