"use client";
import HeaderGrid from "@/app/(components)/mui-components/Card/HeaderGrid";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SuperAdmin from "@/app/(components)/pages-component/userManagement/superAdmin/SuperAdmin";
import ToastComponent from "@/app/(components)/mui-components/Snackbar";
import AddUser from "@/app/(components)/pages-component/userManagement/addUser/AddUser";
import AddRole from "@/app/(components)/pages-component/userManagement/addUser/AddRole";
import axiosInstance from "@/app/api/axiosInstanceImg";

const UserManagement = () => {
  const [open, setOpen] = useState(false);
  const tabLabel = [{ name: "User" }, { name: "Roles" }];
  const [buttonType, setButtonType] = useState("User");
  const [customers, setCustomers] = useState(null);
  const [customerItems, setCustomerItems] = useState({
    id: null,
    label: "Select Customer",
  });
  const [selectedItems, setSelectedItems] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const [fetchAllDetails, setFetchAllDetails] = useState([]);
  const TabPanelList = [{ component: "" }];
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
  const handleTableData = async ({
    search = "",
    limit = 10,
    page = 1,
    customerId = customerItems && customerItems?.id,
  } = {}) => {
    try {
      const params = new URLSearchParams({
        search,
        limit,
        page,
        customerId,
      });
      const Url =
        buttonType === "Roles" ? "role/fetchUserRoles" : "user/fetchUsers";
      const { status, data } = await axiosInstance.get(
        `${Url}?${params.toString()}`
      );
      if (status === 200 || status === 201) {
        setFetchAllDetails(data?.data);
        setSelected(data?.data[0]?.name);
      }
    } catch (error) {
      console.log("Check error");
    }
  };
  const customerId = customerItems && customerItems?.id;

  const handleDropdownSelect = (label, item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [label]: item,
    }));
    handleTableData();
  };
  useEffect(() => {
    fetchCustomers();
  }, []);
  useEffect(() => {
    if (customerId && buttonType) {
      handleTableData();
    }
  }, [customerId, buttonType]);
  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "User-Management", link: "/userManagement" },
  ];
  return (
    <Grid container>
      {buttonType === "User" ? (
        <AddUser
          open={open}
          setOpen={setOpen}
          id={customers && customers[0]?.id}
          handleTableData={handleTableData}
        />
      ) : (
        <AddRole
          open={open}
          setOpen={setOpen}
          id={customers && customers[0]?.id}
          handleTableData={handleTableData}
        />
      )}
      <ToastComponent />
      <HeaderGrid
        dropDown={customers}
        moduleName={"Super Admin"}
        breadcrumbItems={breadcrumbItems}
        buttonType={buttonType}
        setButtonType={setButtonType}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        setFetchAllDetails={setFetchAllDetails}
        button={buttonType === "User" ? "Add User" : "Add Role"}
        handleClickOpen={handleOpen}
        CustomButtonGroup={tabLabel}
        TabPanelList={TabPanelList}
        handleTableData={handleTableData}
        handleDropdownSelect={handleDropdownSelect}
        customerItems={customerItems}
        setCustomerItems={setCustomerItems}
      />
      <SuperAdmin
        fetchAllDetails={fetchAllDetails}
        handleTableData={handleTableData}
        type={buttonType === "User" ? "User" : "Role"}
      />
    </Grid>
  );
};

export default UserManagement;
