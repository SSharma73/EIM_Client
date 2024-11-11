"use client";
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";

import Table from "./table";
import SwappingTable from "./swappingTable";
import ChargingTable from "./chargingTable";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/api/axiosInstanceImg";

const Page = ({ state }) => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [deviceData, setDeviceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [Swappingdata, setSwappingData] = useState(null);
  const [Chargingdata, setChargingData] = useState(null);
  const router = useRouter();
  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fleetResponse = await axiosInstance.get(`fleet/fetchFleets`, {
          params: {
            customerId: state.brandId,
            region: state.region,
            sort: "avgConsumption",
          },
        });
        setData(fleetResponse?.data?.data);
        const swappingResponse = await axiosInstance.get(
          `charger/fetchChargers`,
          {
            params: {
              limit: 10,
              page: 1,
              type: "sany",
              customerId: state.brandId,
            },
          }
        );
        setSwappingData(swappingResponse.data?.data);
        const chargingResponse = await axiosInstance.get(
          `charger/fetchChargers`,
          {
            params: {
              limit: 10,
              page: 1,
              type: "delta",
              customerId: state.brandId,
            },
          }
        );
        setChargingData(chargingResponse?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [state]);

  const handleView = () => {
    router.push("/fleetManagement");
  };
  return (
    <Grid container rowGap={2} mt={2}>
      <Table
        data={data}
        heading={"Top 10 Performing E-Tractors"}
        button={"View all"}
        handleView={handleView}
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
      <SwappingTable
        data={Swappingdata}
        deviceData={deviceData}
        heading={"Swapping Station"}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        page={page}
        setPage={setPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        loading={loading}
        getDataFromChildHandler={getDataFromChildHandler}
      />
      <ChargingTable
        data={Chargingdata}
        deviceData={deviceData}
        rowsPerPage={rowsPerPage}
        heading={"Charging Station"}
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
