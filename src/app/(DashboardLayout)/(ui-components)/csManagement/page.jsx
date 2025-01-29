"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Overview from "@/app/(components)/pages-component/CsManagement1/MainOverview";
import Charging from "@/app/(components)/pages-component/CsManagement1/chargingStation";
import DriverVehicle from "@/app/(components)/pages-component/CsManagement1/DriverVehicle";
import RevenueManagement from "@/app/(components)/pages-component/CsManagement1/Revenue";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import AddTractor from "@/app/(components)/pages-component/CsManagement1/addTractor";
import DownloadLogs from "@/app/(components)/pages-component/CsManagement1/DownloadLogs";
import axiosInstance from "@/app/api/axiosInstance";

const CsManagement = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [fetchAllDetails, setFetchAllDetails] = useState(null);
  const [region, setRegion] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustId, setSelectedCustId] = useState(null);
  const [openLogs, setOpenLogs] = useState(false);

  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "CS/SS-Management", link: "/csManagement" },
  ];
  useEffect(() => {
    const regions = async () => {
      const { data } = await axiosInstance.get("dashboard/regions");
      setRegion(data?.regions);
    };
    const customer = async () => {
      const { data } = await axiosInstance.get("dashboard/customers");
      setCustomers(data?.customers);
    };
    regions();
    customer();
  }, []);

  const [selectedItems, setSelectedItems] = useState({
    Region: "",
    Customer: "",
    "Charging Station": "",
  });
  useEffect(() => {
    if (selectedItems?.Customer) {
      const customer = customers?.find(
        (customer) => customer?.brandName === selectedItems?.Customer
      );
      setSelectedCustId(customer?._id);
    }
  }, [selectedItems]);

  const dropDownButtons = [
    {
      label: "Region",
      menuItems: region,
    },
    {
      label: "Customer",
      menuItems: customers?.map((customer) => customer?.brandName),
    },
    {
      label: "Charging Station",
      menuItems: ["Charging station", "Swapping station"],
    },
  ];
  const eventLabel =
    selectedItems["Charging Station"] === "Swapping station"
      ? "Swapping station"
      : "Charging station";

  const tabs = [
    { label: "Overview" },
    {
      label: eventLabel,
    },
    { label: "E - Tractor" },
    // { label: "Revenue management" },
  ];
  const type =
    selectedItems["Charging Station"] === "Swapping station" ? "sany" : "delta";
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleDropdownSelect = (label, item) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [label]: item,
    }));
    setFetchAllDetails(null);
  };
  const fetchDetails = async ({
    limit = 10,
    page = 1,
    type = "",
    customerId = "",
    region = "",
  } = {}) => {
    try {
      const params = new URLSearchParams({
        limit,
        page,
        type,
        customerId,
        region,
      });
      const { data } = await axiosInstance.get(
        `charger/fetchChargers?${params.toString()}`
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
      type: type,
      customerId: selectedCustId ?? "",
      region: selectedItems?.Region ?? "",
    });
  }, [eventLabel, selectedCustId, selectedItems?.Region]);

  const TabPanelList = [
    {
      component: (
        <Overview
          value="1"
          type={type}
          selectedCustId={selectedCustId}
          selectedItems={selectedItems}
        />
      ),
    },
    {
      component: (
        <Charging
          value="2"
          eventLabel={eventLabel}
          fetchAllDetails={fetchAllDetails}
          fetchDetails={fetchDetails}
          type={type}
        />
      ),
    },
    {
      component: (
        <DriverVehicle
          value="3"
          eventLabel={eventLabel}
          selectedCustId={selectedCustId}
          selectedItems={selectedItems}
        />
      ),
    },
    // { component: <RevenueManagement value="4" /> },
  ];
  return (
    <Grid container xs={12} sm={12} md={12}>
      <AddTractor open={open} setOpen={setOpen} />
      {openLogs && (
        <DownloadLogs open={openLogs} setOpen={setOpenLogs} type={type} />
      )}
      <ManagementGrid
        moduleName={"CS/SS Management"}
        breadcrumbItems={breadcrumbItems}
        dropDownEvent={dropDownButtons}
        button={"Add CS/SS"}
        download={"Download logs"}
        tabs={tabs}
        value={value}
        handleChange={handleChange}
        TabPanelList={TabPanelList}
        handleClickOpen={handleOpen}
        handleClickDownload={() => setOpenLogs(true)}
        selectedItems={selectedItems}
        handleDropdownSelect={handleDropdownSelect}
      />
    </Grid>
  );
};
export default CsManagement;
