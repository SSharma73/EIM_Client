"use client";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import ProfilePic from "../../../../../public/Img/profilepic.svg";
import { CustomGrid } from "@/app/(components)/mui-components/CustomGrid";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axiosInstance from "@/app/api/axiosInstance";

const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Profile", link: "/profile" },
];
const Settings = () => {
  const router = useRouter();
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors } = formState;
  const [data, setData] = useState(null);
  const handleClick = () => {
    router.push("/profile/edit");
    console.log("khgj.dfg");
  };
  const onSubmit = async () => {
    try {
      const res = await axiosInstance.get("/auth/myProfile");
      if (res?.status === 200 || res?.status === 201) {
        console.log("res", res);
        setData(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    onSubmit();
  }, []);
  return (
    <Grid container rowGap={2} position={"relative"}>
      <ManagementGrid
        moduleName={"Profile"}
        breadcrumbItems={breadcrumbItems}
      />
      <Grid container>
        <CustomGrid sx={{ border: "1px solid red" }}>
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <Avatar sx={{ height: "120px", width: "120px" }}>
                <Image src={ProfilePic} />
              </Avatar>
            </Grid>
            {/* <Grid item>
                <Button variant="contained" size="large" onClick={handleClick}>
                  Change Password
                </Button>
              </Grid> */}
          </Grid>
          <Grid container rowGap={4} pl={2} mt={4} mb={2}>
            <Grid item md={5} xs={12} sm={6}>
              <Typography>Username</Typography>
            </Grid>
            <Grid item md={3} xs={12} sm={6}>
              <Typography
                fullWidth
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  color: "#fff",
                  padding: "10px",
                }}
              >
                {data?.userName}
              </Typography>
            </Grid>
            <Grid item md={5} xs={12} sm={6}>
              <Typography>Phone number</Typography>
            </Grid>
            <Grid item md={3} xs={12} sm={6}>
              <Typography
                fullWidth
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  color: "#fff",
                  padding: "10px",
                }}
              >
                {data?.mobileNumber}
              </Typography>
            </Grid>
            <Grid item md={5} xs={12} sm={6}>
              <Typography>Email address</Typography>
            </Grid>
            <Grid item md={3} xs={12} sm={6}>
              <Typography
                fullWidth
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  color: "#fff",
                  padding: "10px",
                }}
              >
                {data?.emailId}
              </Typography>
            </Grid>
            <Grid item md={5} xs={12} sm={6}>
              <Typography>address</Typography>
            </Grid>
            <Grid item md={3} xs={12} sm={6}>
              <Typography
                fullWidth
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  color: "#fff",
                  padding: "10px",
                }}
              >
                {data?.address}
              </Typography>
            </Grid>
            <Grid item md={5} xs={12} sm={6}>
              <Typography>Role</Typography>
            </Grid>
            <Grid item md={3} xs={12} sm={6}>
              <Typography
                fullWidth
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  color: "#fff",
                  padding: "10px",
                }}
              >
                {data?.role}
              </Typography>
            </Grid>
            <Grid item md={5} xs={12} sm={6}>
              <Typography>Level</Typography>
            </Grid>
            <Grid item md={3} xs={12} sm={6}>
              <Typography
                fullWidth
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  color: "#fff",
                  padding: "10px",
                }}
              >
                {data?.level}
              </Typography>
            </Grid>
          </Grid>
        </CustomGrid>
      </Grid>
    </Grid>
  );
};

export default Settings;
