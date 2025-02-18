"use client";
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import HeaderGrid from "@/app/(components)/mui-components/Card/HeaderGrid";
import Read from "./read";
import axiosInstance from "@/app/api/axiosInstance";

const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Notification", link: "/notifications" },
];

const Page = () => {
  const tabs = [
    { label: `All` },
    { label: "Pending" },
    { label: "Approved" },
    { label: "Rejected" },
    { label: "Fleet Status" },
  ];
  const [value, setValue] = useState(0);
  const [tabsValue, setTabsValue] = useState("All");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTabsValue(tabs[newValue].label);
    getData(tabs[newValue].label);
  };

  const [data, setData] = useState([]);
  const getData = async (status) => {
    const customerId = localStorage.getItem("customerId");
    try {
      const url = `notification/notifications/?customerId=${customerId}&${
        status === "All"
          ? ""
          : `&status=${
              status.toLowerCase() === "fleet status"
                ? "other"
                : status.toLowerCase()
            }`
      }&page=${page + 1}&limit=${rowsPerPage}`;
      const res = await axiosInstance.get(url);
      if (res.status === 200 || res.status === 201) {
        setData(res?.data || []);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    if (tabsValue) {
      getData(tabsValue);
    }
  }, [tabsValue, rowsPerPage, page]);
  return (
    <Grid container>
      <HeaderGrid
        tabs={tabs}
        value={value}
        moduleName="Notifications"
        subHeading="See all notifications below"
        breadcrumbItems={breadcrumbItems}
        handleChange={handleChange}
      />
      <Grid container>
        <Read
          data={data}
          getData={getData}
          tabsValue={tabsValue}
          setPage={setPage}
          page={page}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Grid>
    </Grid>
  );
};

export default Page;
