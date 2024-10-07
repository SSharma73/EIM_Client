"use client";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import React, { useEffect, useState } from "react";
import { Avatar, Grid, Typography } from "@mui/material";
import Image from "next/image";
import ProfilePic from "../../../../../public/Img/profilepic.svg";
import { CustomGrid } from "@/app/(components)/mui-components/CustomGrid";
import axiosInstance from "@/app/api/axiosInstance";

const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Profile", link: "/profile" },
];

const Settings = () => {
  const [data, setData] = useState(null);

  const fetchUserById = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const { data: responseData } = await axiosInstance.get(
        `user/fetchUserById/${userId}`
      );
      setData(responseData?.data); // Update this based on your response structure
    } catch (error) {
      console.error("Error fetching user by ID:", error);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, []);

  return (
    <Grid container rowGap={2} position={"relative"}>
      <ManagementGrid
        moduleName={"Profile"}
        breadcrumbItems={breadcrumbItems}
      />
      <Grid container>
        <CustomGrid>
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <Avatar sx={{ height: "120px", width: "120px" }}>
                <Image src={ProfilePic} />
              </Avatar>
            </Grid>
          </Grid>
          <Grid container rowGap={4} pl={2} mt={4} mb={2}>
            <Grid item md={5} xs={12} sm={6}>
              <Typography>Name</Typography>
            </Grid>
            <Grid item md={3} xs={12} sm={6}>
              <Typography
                fullWidth
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                {data?.name}
              </Typography>
            </Grid>
            <Grid item md={5} xs={12} sm={6}>
              <Typography>Email</Typography>
            </Grid>
            <Grid item md={3} xs={12} sm={6}>
              <Typography
                fullWidth
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                {data?.email}
              </Typography>
            </Grid>
            <Grid item md={5} xs={12} sm={6}>
              <Typography>Phone Number</Typography>
            </Grid>
            <Grid item md={3} xs={12} sm={6}>
              <Typography
                fullWidth
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                {data?.phone}
              </Typography>
            </Grid>
          </Grid>
        </CustomGrid>
      </Grid>
    </Grid>
  );
};

export default Settings;
