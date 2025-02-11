"use client";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import Table from "./table";
import axiosInstance from "@/app/api/axiosInstance";
import moment from "moment";

const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Scheduling", link: "/scheduling" },
  { label: "History", link: "/scheduling/history" },
];
const columns = [
  "Tractor ID",
  "Expected arrival time",
  "Expected charging time",
  "Station Id",
  "Current SoC",
];
const Page = () => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [deviceData, setDeviceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const getDataFromChildHandler = (date, dataArr) => {
    const selectedStartDate = date[0].startDate;
    const selectedEndDate = date[0].endDate;
    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);
  };

  const handleHistoryData = async () => {
    try {
      const { data, status } = await axiosInstance.get(
        `/schedule/getSchedulingHistory?page=${
          page + 1
        }&limit=${rowsPerPage}&search=${searchQuery}&startDate=${
          startDate ?? ""
        }&endDate=${endDate ?? ""}`
      );

      if (status === 200 || status === 201) {
        setDeviceData(data?.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleHistoryData();
  }, [page, rowsPerPage, searchQuery, startDate, endDate]);

  return (
    <Grid container xs={12}>
      <Grid item xs={12}>
        <ManagementGrid
          breadcrumbItems={breadcrumbItems}
          moduleName={"Scheduling history"}
        />
      </Grid>
      <Grid item xs={12}>
        <Table
          data={deviceData}
          columns={columns}
          deviceData={deviceData}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
          getDataFromChildHandler={getDataFromChildHandler}
        />
      </Grid>
    </Grid>
  );
};

export default Page;
