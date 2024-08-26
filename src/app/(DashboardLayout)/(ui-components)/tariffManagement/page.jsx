"use client";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import {  Grid, Tab } from "@mui/material";
import React, { useState, useEffect } from "react";
import Table from "./table";
import { useRouter } from "next/navigation";
import { dummyTariff } from "@/app/(components)/table/rows";

const TariffManagement = () => {
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
  const router = useRouter();

  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "Tariff-Management", link: "/tariffManagement" },
  ];
  const AddTariff = () => {
    router.push("/tariffManagement/createTariff");
  };
  useEffect(() => {
    setData(dummyTariff);
  }, []);

  return (
    <Grid container rowGap={2}>
      <ManagementGrid
        breadcrumbItems={breadcrumbItems}
        moduleName={"Tariff Management"}
        button={"Create Tariff"}
        handleClickOpen={AddTariff}
      />
      <Table
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
    </Grid>
  );
};

export default TariffManagement;
