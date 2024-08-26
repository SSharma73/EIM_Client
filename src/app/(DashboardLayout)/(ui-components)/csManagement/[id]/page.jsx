"use client";
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "./table";
import { useSearchParams } from "next/navigation";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import { Fleet } from "@/app/(components)/table/rows";

const ChargingId = ({ params }) => {
  const searchParams = useSearchParams();
  const tabValue = searchParams.get("tab");
  const eventLabel = searchParams.get("eventLabel");

  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [deviceData, setDeviceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);

  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };
  const labelStatus = eventLabel?.slice(0, 8);
  console.log("sdfgakjs",labelStatus)

  const vehicle1 = [
    "Date",
    "Hub name",
    "Status",
    "Truck ID",
    "No. of trucks",
    "Unit consumed(kWh)",
    "Avg. charging time(hr.)",
    "Peak hours",
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
  useEffect(() => {
    setData(Fleet);
  }, []);

  return (
    <Grid container sm={12} md={12}>
      <ManagementGrid breadcrumbItems={breadcrumbItems} />
      {tabValue &&
        (tabValue === "2" ? (
          <Table
            name={`${eventLabel} ID (${params.id})`}
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
            getDataFromChildHandler={getDataFromChildHandler}
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
            getDataFromChildHandler={getDataFromChildHandler}
          />
        ) : null)}
    </Grid>
  );
};

export default ChargingId;
