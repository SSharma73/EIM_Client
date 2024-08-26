"use client";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import React, { useState } from "react";
import { Button, Grid, TextField, Typography, IconButton } from "@mui/material";
import { CustomGrid } from "@/app/(components)/mui-components/CustomGrid";
import { useForm } from "react-hook-form";
import {
  Visibility,
  VisibilityOff,
} from "@/app/(components)/mui-components/icons";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/api/axiosInstance";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";

const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Settings", link: "/settings" },
  { label: "Change Password", link: "/settings/edit" },
];
const Edit = () => {
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;
  const formData = getValues();
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordVisible((prev) => !prev);
    } else if (field === "confirmPassword") {
      setConfirmPasswordVisible((prev) => !prev);
    }
  };
  const onsubmit = async (formData) => {
    console.log("sdljgjakjh", formData);
    try {
      const res = await axiosInstance.put("/auth/changePassword", formData);
      if (res.status === 200 || res.status === 201) {
        notifySuccess(res?.data?.message);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      notifyError(error?.response?.data?.message);
    }
  };
  const handleBackClick = () => {
    router.push("/settings");
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <Grid container rowGap={2}>
        <ToastComponent />
        <ManagementGrid
          moduleName={"Change Password"}
          breadcrumbItems={breadcrumbItems}
        />

        <Grid container>
          <CustomGrid container sx={{ border: "1px solid red" }}>
            <Grid container rowGap={4} mt={4} pl={2} mb={2}>
              <Grid item md={5} xs={12} sm={6}>
                <Typography>Current Password</Typography>
              </Grid>
              <Grid item md={3} xs={12} sm={6}>
                <TextField
                  placeholder="Enter current password"
                  fullWidth
                  type={"password"}
                  {...register("currentPassword", {
                    required: "current password is required!",
                  })}
                  error={!!errors.currentPassword}
                  helperText={errors.currentPassword?.message}
                />
              </Grid>
              <Grid item md={5} xs={12} sm={6}>
                <Typography>New Password</Typography>
              </Grid>
              <Grid item md={3} xs={12} sm={6}>
                <TextField
                  placeholder="Enter new password"
                  fullWidth
                  type={passwordVisible ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => togglePasswordVisibility("password")}
                      >
                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                  {...register("newPassword", {
                    required: "password is required!",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:<,.>])[A-Za-z\d!@#$%^&*()\-_=+{};:<,.>]{6,}$/,
                      message:
                        "must conatin atleast 1 uppercase letter, lowercase letter, digit, and special character and must be of 6 digit",
                    },
                  })}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                />
              </Grid>
              <Grid item md={5} xs={12} sm={6}>
                <Typography>Confirm Password</Typography>
              </Grid>
              <Grid item md={3} xs={12} sm={6}>
                <TextField
                  placeholder="Enter confirm password"
                  fullWidth
                  type={confirmPasswordVisible ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                      >
                        {confirmPasswordVisible ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                  {...register("confirmPassword", {
                    required: "",
                    validate: (value) => {
                      return value === getValues("newPassword")
                        ? null
                        : "password mismatched!";
                    },
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </Grid>
            </Grid>
          </CustomGrid>
          <Grid
            container
            justifyContent={"flex-end"}
            columnGap={2}
            mt={2}
          >
            <Button variant="outlined" size="large" onClick={handleBackClick}>
              Back{" "}
            </Button>
            <Button variant="contained" size="large" type="submit">
              Submit{" "}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Edit;
