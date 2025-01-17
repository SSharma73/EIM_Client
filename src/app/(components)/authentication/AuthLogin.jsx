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
      borderColor: "#C0FE72",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#C0FE72",
      fontSize: "20px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
  },
  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
    color: "#C0FE72",
    fontSize: "20px",
  },
  "&.Mui-focused .MuiInputLabel-root": {
    color: "#fff",
    fontSize: "20px",
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
          <Box>
            <CustomTextField
              type="text"
              placeholder="Email"
              variant="outlined"
              fullWidth
              id="email"
              name="email"
              {...register("email", {
                required: "email is required!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "enter valid email!",
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
              fullWidth
              name="password"
              {...register("password", { required: "password is required!" })}
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
            <Typography>Forgot Password</Typography>
          </Stack>
        </Stack>
        <Box>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="secondary"
            variant="contained"
          >
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
        <Typography>
          To Know more <span style={{ color: "#C0FE72" }}>T&C</span>
        </Typography>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
