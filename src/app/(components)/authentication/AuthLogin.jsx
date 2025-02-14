"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axiosInstance from "@/app/api/axiosInstance";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "../mui-components/Snackbar";
import { useForm } from "react-hook-form";

import styled from "@emotion/styled";
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#38E0CF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#38E0CF",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
  },
  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
    color: "#38E0CF",
  },
  "&.Mui-focused .MuiInputLabel-root": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-input": {
    color: "#fff",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#fff",
    opacity: 1,
  },
}));

const AuthLogin = ({ title, subtitle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors } = formState;
  const formData = getValues();

  const handleLogin = async (formdata) => {
    try {
      const response = await axiosInstance.post("auth/login", formdata);
      if (response.status) {
        signIn("credentials", {
          email: formData.email,
          password: formData.password,
          callbackUrl: `/`,
          redirect: true,
        });
        if (response.status == 201 || response.status == 200) {
          notifySuccess(response?.data?.message);
        }
        localStorage.setItem("token", response?.data?.data?.token);
        localStorage.setItem("userId", response?.data?.data?.user?._id);
        localStorage.setItem(
          "customerId",
          response?.data?.data && response?.data?.data?.user?.customerId?._id
        );
      }
    } catch (error) {
      notifyError(error?.response?.data?.message);
    }
  };
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <>
      <ToastComponent />
      {title ? (
        <Typography fontWeight={"700"} variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}
      <form onSubmit={handleSubmit(handleLogin)}>
        <Stack>
          <Box width={"380px"}>
            <CustomTextField
              type="text"
              label="Email"
              placeholder="Email"
              variant="outlined"
              fullWidth
              id="email"
              name="email"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email!",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>
          <Box mt={"25px"}>
            <CustomTextField
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              label="Password"
              fullWidth
              name="password"
              {...register("password", { required: "Password is required!" })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ color: "#fff" }} />
                      ) : (
                        <Visibility sx={{ color: "#fff" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>
          <Stack
            my={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography color={"#fff"}>Forgot Password?</Typography>
          </Stack>
        </Stack>

        <Box>
          <Button fullWidth size="large" type="submit" variant="contained">
            Sign In
          </Button>
        </Box>
      </form>

      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        mt={2}
      >
        <Grid container justifyContent={"center"}>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: "red", color: "#fff" }}>or</Divider>
          </Grid>
          <Grid item xs={12} alignItems={"center"} mt={2}>
            <Typography color={"#fff"} variant="body1" textAlign={"center"}>
              To Know more <span style={{ color: "#38E0CF" }}>T&C</span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
