"use client";
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import HeaderGrid from "@/app/(components)/mui-components/Card/HeaderGrid";
import Table from "./table";
import { useRouter } from "next/navigation";
import AddCustomer from "@/app/(components)/pages-component/customerManagement/AddCustomer/AddCustomer";
import axiosInstance from "@/app/api/axiosInstance";

const CustomerManagement = () => {
  const tabLabel = [{ name: "Customer" }, { name: "Port" }];
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [deviceData, setDeviceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [buttonType, setButtonType] = useState("Customer");
  const [fetchAllDetails, setFetchAllDetails] = useState(null);
  const handleOpen = () => {
    setOpen(true);
  };

  const router = useRouter();

  const handleTableData = async ({
    search = "",
    limit = 10,
    page = 1,
  } = {}) => {
    try {
      const params = new URLSearchParams({
        search,
        limit,
        page,
      });
      const Url =
        buttonType == "Customer"
          ? "customer/fetchCustomers"
          : "port/fetchPorts";
      const { status, data } = await axiosInstance.get(
        `${Url}?${params.toString()}`
      );
      if (status === 200 || status === 201) {
        setFetchAllDetails(data?.data);
      }
    } catch (error) {
      console.log("Check error");
    }
  };
  const AddButton = () => {
    buttonType === "Customer"
      ? handleOpen()
      : router.push("/customerManagement/addPort");
  };
  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "Customer-Management", link: "/customerManagement" },
  ];
  useEffect(() => {
    if (buttonType) {
      handleTableData();
    }
  }, [buttonType]);
  const TabPanelList = [{ component: "" }];
  return (
    <>
      {buttonType === "Customer" && (
        <AddCustomer
          open={open}
          setOpen={setOpen}
          handleTableData={handleTableData}
        />
      )}
      <Grid container rowGap={2}>
        <HeaderGrid
          buttonType={buttonType}
          handleClickOpen={AddButton}
          TabPanelList={TabPanelList}
          CustomButtonGroup={tabLabel}
          setButtonType={setButtonType}
          breadcrumbItems={breadcrumbItems}
          moduleName={"Customer Management"}
          button={buttonType === "Customer" ? "Add Customer" : "Add Port"}
          handleTableData={handleTableData}
        />
        <Table
          page={page}
          setPage={setPage}
          data={fetchAllDetails}
          deviceData={deviceData}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
          handleTableData={handleTableData}
          type={buttonType === "Customer" ? "Customer" : "Port"}
          getDataFromChildHandler={handleTableData}
        />
      </Grid>
    </>
  );
};

export default CustomerManagement;
