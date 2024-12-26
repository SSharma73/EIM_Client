"use client";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Overview from "@/app/(components)/pages-component/fleetManagement/overView/Overview";
import Charging from "@/app/(components)/pages-component/fleetManagement/charging/charging";
import Trip from "@/app/(components)/pages-component/fleetManagement/Trip";
import Etractor from "@/app/(components)/pages-component/fleetManagement/Etractor";
import HeaderGrid from "@/app/(components)/mui-components/Card/HeaderGrid";
import AddTractor from "@/app/(components)/pages-component/fleetManagement/addTractor";
import axiosInstance from "@/app/api/axiosInstance";
import ToastComponent from "@/app/(components)/mui-components/Snackbar";

const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Fleet-Management", link: "/fleetManagement" },
];

const Page = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState(null);
  const [customerItems, setCustomerItems] = useState({
    id: null,
    label: "Select Customer",
  });
  const tabs = [
    { label: `Overview ` },
    { label: "Charging" },
    { label: "Trip" },
    { label: "E-tractor" },
  ];
  const customerId = customerItems && customerItems?.id;
  const [tabsValue, setTabsValue] = useState("Overview");
  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTabsValue(tabs[newValue].label);
  };
  useEffect(() => {
    if (customerId) {
      handleTableData();
    }
  }, [customerId, value]);
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data } = await axiosInstance.get("customer/fetchCustomers");
      const result = {
        menuItems:
          data?.data?.result?.map((customer) => ({
            id: customer._id,
            label: customer.brandName,
          })) || [],
      };
      setCustomers(result);
      if (result.menuItems.length > 0) {
        const defaultCustomer = result.menuItems[0];
        setCustomerItems({
          id: defaultCustomer.id,
          label: defaultCustomer.label,
        });
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  };
  const handleDropdownSelect = (label, item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [label]: item,
    }));
    handleTableData();
  };
  const handleTableData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        customerId,
        status: tabsValue === "Charging" ? "charging" : "",
      });

      const { data } = await axiosInstance.get(
        `fleet/fetchFleets?${params.toString()}`
      );

      setData(data.data);
    } catch (error) {
      notifyError(error?.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const TabPanelList = [
    {
      component: (
        <Overview
          value={"1"}
          data={data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
          getDataFromChildHandler={getDataFromChildHandler}
        />
      ),
    },
    {
      component: (
        <Charging
          value={"2"}
          data={data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
          getDataFromChildHandler={getDataFromChildHandler}
        />
      ),
    },
    {
      component: (
        <Trip
          value={"3"}
          data={data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
          getDataFromChildHandler={getDataFromChildHandler}
        />
      ),
    },
    {
      component: (
        <Etractor
          value={"4"}
          data={data}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
          getDataFromChildHandler={getDataFromChildHandler}
        />
      ),
    },
  ];
  console.log("dataaaaaaaaaaaaaa132");

  return (
    <Grid container xs={12} sm={12} md={12}>
      <AddTractor
        open={open}
        setOpen={setOpen}
        handleTableData={handleTableData}
      />
      <ToastComponent />
      <HeaderGrid
        moduleName={"Fleet Management"}
        breadcrumbItems={breadcrumbItems}
        dropDown={customers}
        button={"Add E-Tractor"}
        handleClickOpen={handleOpen}
        tabs={tabs}
        value={value}
        handleChange={handleChange}
        TabPanelList={TabPanelList}
        handleDropdownSelect={handleDropdownSelect}
        customerItems={customerItems}
        setCustomerItems={setCustomerItems}
      />
    </Grid>
  );
};
export default Page;
