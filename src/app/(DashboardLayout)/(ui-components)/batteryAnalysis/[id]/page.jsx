"use client";
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "./table";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/app/api/axiosInstance";
import { particularBatteryData } from "@/app/(components)/table/rows";

const Page = ({ params }) => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };
  const handleEachBattery = async () => {
    // try {
    //     const response = await axiosInstance(`/battery/getOne/${params?.id}?page=${page + 1
    //         }&pageSize=${rowsPerPage}&search=${searchQuery}`)
    //     console.log("battery", response)
    //     // setData(response?.data)
    // } catch (error) {
    //     console.log(error)
    // }
  };
  useEffect(() => {
    // handleEachBattery()
    setData(particularBatteryData);
  }, []);
  return (
    <Grid container rowGap={2} sm={12} md={12}>
      <Table
        data={data}
        params={params}
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
