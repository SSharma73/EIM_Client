"use client";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "./table";
import axiosInstance from "@/app/api/axiosInstance";
import ManagementGrid from "@/app/(components)/mui-components/Card";

const Page = ({ params }) => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);
  const [batteryCode, setBatteryCode] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("BatteryCharge"); // Track selected filter

  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "Battery-Analysis", link: "/batteryAnalysis" },
    { label: `${batteryCode ?? "--"}`, link: `/batteryAnalysis/${params?.id}` },
  ];
  const getDataFromChildHandler = (date, dataArr) => {
    const selectedStartDate = date[0].startDate;
    const selectedEndDate = date[0].endDate;
    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);
  };
  const handleEachBattery = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance("charger/fetchChargingHistory", {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          startDate: startDate ?? "",
          endDate: endDate ?? "",
          status: selectedFilter,
          type: "sany",
          batteryId: params?.id,
        },
      });

      setData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (startDate && endDate && selectedFilter && params?.id) {
      handleEachBattery();
    }
  }, [params?.id, startDate, endDate, rowsPerPage, page, selectedFilter]);
  return (
    <Grid container rowGap={2} sm={12} md={12}>
      <ManagementGrid
        breadcrumbItems={breadcrumbItems}
        moduleName={"Battery Analysis details"}
      />
      <Table
        data={data}
        params={params}
        setBatteryCode={setBatteryCode}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
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
  );
};
export default Page;
