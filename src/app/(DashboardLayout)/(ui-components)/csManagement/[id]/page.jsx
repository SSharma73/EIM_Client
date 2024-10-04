"use client";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "./table";
import { useSearchParams } from "next/navigation";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import axiosInstance from "@/app/api/axiosInstanceImg";
import moment from "moment";

const ChargingId = ({ params }) => {
  const searchParams = useSearchParams();
  const tabValue = searchParams.get("tab");
  const eventLabel = searchParams.get("eventLabel");
  const hubName = searchParams.get("name");

  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deviceData, setDeviceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // const getDataFromChildHandler = (date, dataArr) => {
  //   setDate(date);
  // };
  const labelStatus = eventLabel?.slice(0, 8);

  const vehicle1 = [
    "Date",
    "Hub name",
    "Status",
    "Truck ID",
    "No. of trucks",
    "Unit consumed(kWh)",
    "Avg. charging time(hr.)",
  ];
  const E_tractor = [
    "Date",
    `${labelStatus} cycle`,
    `${labelStatus}  time(hr)`,
    "Start Soc(%)",
    "End SoC(%)",
    "Current SoC(%)",
    "Units consumed(kWh)",
  ];

  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "CS/SS-Management", link: "/csManagement" },
    {
      label: `${params.id}`,
      link: `/csManagement/${params.id}?tab=${tabValue}&eventLabel=${eventLabel}`,
    },
  ];

  const fetchChargingHistory = async ({
    page,
    rowsPerPage,
    startDate,
    endDate,
  }) => {
    try {
      const { data, status } = await axiosInstance.get(
        "charger/fetchChargingHistory",
        {
          params: {
            page: page,
            limit: rowsPerPage,
            stationId: params.id,
            startDate,
            endDate,
          },
        }
      );
      setData(data?.data);
    } catch (error) {
      console.error("Error fetching charging history:", error);
    } finally {
      setLoading(false);
    }
  };
  const getDataFromChildHandler = (dateRange, resultArray) => {
    const selectedStartDate = dateRange[0].startDate;
    const selectedEndDate = dateRange[0].endDate;
    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);
    fetchChargingHistory({ selectedStartDate, selectedEndDate });
  };
  useEffect(() => {
    const count = page + 1;
    fetchChargingHistory({ count, rowsPerPage, startDate, endDate });
  }, [page, rowsPerPage, startDate, endDate]);
  const getFormattedData = (data) => {
    return data?.map((item) => ({
      Date: item?.createdAt
        ? moment(item.createdAt).format("DD/MM/YYYY")
        : "--",
      "Hub name": hubName ?? "--",
      Status: item?.status ?? "Charging",
      "Truck ID": "--",
      "No. of trucks": "--",
      "Unit consumed(kWh)": item?.totalConsumption ?? "--",
      "Avg. charging time(hr.)":
        item.meterStopTime && item.meterStartTime
          ? (
              (new Date(item.meterStopTime) - new Date(item.meterStartTime)) /
              3600000
            ).toFixed(2)
          : "--",
    }));
  };

  return (
    <Grid container sm={12} md={12}>
      <ManagementGrid breadcrumbItems={breadcrumbItems} />
      {tabValue &&
        (tabValue === "2" ? (
          <Table
            name={`${hubName} (${eventLabel})`}
            columns={vehicle1}
            data={data}
            deviceData={deviceData}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            loading={loading}
            getFormattedData={getFormattedData}
            getDataFromChildHandler={getDataFromChildHandler}
            handleTableData={fetchChargingHistory}
          />
        ) : tabValue === "3" ? (
          <Table
            name={`E-Tractor ID (${params.id})`}
            columns={E_tractor}
            data={data}
            deviceData={deviceData}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            loading={loading}
            getFormattedData={getFormattedData}
            getDataFromChildHandler={getDataFromChildHandler}
            handleTableData={fetchChargingHistory}
          />
        ) : null)}
    </Grid>
  );
};

export default ChargingId;
