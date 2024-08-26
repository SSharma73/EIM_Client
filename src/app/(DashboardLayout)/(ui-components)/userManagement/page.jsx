"use client";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import SuperAdmin from "@/app/(components)/pages-component/userManagement/superAdmin/SuperAdmin";
import AddUser from "@/app/(components)/pages-component/userManagement/addUser/AddUser";
import axiosInstance from "@/app/api/axiosInstance";
import ToastComponent from "@/app/(components)/mui-components/Snackbar";

const UserManagement = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [select, setSelected] = useState(null);

  const [type, setType] = useState();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleTableData = async (item) => {
    try {
      setType(item);
      const res = await axiosInstance.get("/role/getAll");
      if (res?.status === 200 || res?.status === 201) {
        console.log("res", res);
        setData(res?.data?.data);
        setSelected(res?.data?.data[0]?.name);
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleTableData();
  }, []);

  const TabPanelList = [{ component: "" }];
  const [value, setValue] = useState(0); 

  const handleChange = (event, newValue) => {
    setValue(newValue); 
  };
  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "User-Management", link: "/userManagement" },
  ];
  console.log("setType", select);
  return (
    <Grid container>
      <AddUser
        open={open}
        setOpen={setOpen}
        handleTableData={handleTableData}
      />
      <ToastComponent />
      <ManagementGrid
        breadcrumbItems={breadcrumbItems}
        moduleName={"Super Admin"}
        button={"Add User"}
        handleClickOpen={handleOpen}
        handleTableData={handleTableData}
        CustomButtonGroup={data}
        TabPanelList={TabPanelList}
        value={value}
        handleChange={handleChange}
        select={select}
      />
      <SuperAdmin type={type ? type : select} />
    </Grid>
  );
};

export default UserManagement;
