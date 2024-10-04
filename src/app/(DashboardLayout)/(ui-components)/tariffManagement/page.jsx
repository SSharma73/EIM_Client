"use client";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Table from "./table";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/api/axiosInstance";

const TariffManagement = () => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [fetchAllDetails, setFetchAllDetails] = useState(null);

  const router = useRouter();

  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "Tariff-Management", link: "/tariffManagement" },
  ];
  const AddTariff = () => {
    router.push("/tariffManagement/createTariff");
  };

  const fetchDetails = async ({ limit = 10, page = 1, search = "" } = {}) => {
    try {
      const params = new URLSearchParams({
        limit,
        page,
        search,
      });
      const { data } = await axiosInstance.get(
        `tariff/fetchTariffs?${params.toString()}`
      );
      setFetchAllDetails(data?.data);
    } catch (error) {
      console.error("Error fetching chargers:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchDetails({
      search: "",
      limit: 10,
      page: 1,
    });
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
        data={fetchAllDetails}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        page={page}
        setPage={setPage}
        loading={loading}
        handleTableData={fetchDetails}
      />
    </Grid>
  );
};

export default TariffManagement;
