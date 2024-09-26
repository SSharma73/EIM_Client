"use client";
import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { useDropzone } from "react-dropzone";
import {
  Typography,
  Grid,
  TextField,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const UserDetails = ({ file, setFile, role, selectRole, handleRole }) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const fileInputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setFile(fileUrl);
      setValue("image", selectedFile);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Grid item xs={12}>
        <Box
          {...getRootProps()}
          sx={{
            textAlign: "center",
            position: "relative",
            borderRadius: "100%",
            width: "30%",
            margin: "auto",
            height: "160px",
          }}
        >
          <input {...getInputProps()} ref={fileInputRef} />
          {file ? (
            <img
              src={file}
              alt="Avatar Preview"
              style={{ width: "100%", height: "100%", borderRadius: "100%" }}
            />
          ) : (
            <img
              src="/AvatarFrame.png"
              alt="Avatar Preview"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </Box>
        <Grid container justifyContent={"center"}>
          <Button
            variant="outlined"
            sx={{ borderRadius: "30px", mt: 2 }}
            onClick={openFileDialog}
          >
            Choose Profile Picture
          </Button>
        </Grid>
      </Grid>
      {errors.profilePicture && (
        <Typography color="error" mt={1}>
          {errors.profilePicture.message}
        </Typography>
      )}
      <Grid container rowGap={2} mt={2}>
        <FormControl fullWidth error={!!errors.role}>
          <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
          <Controller
            control={control}
            name="role"
            rules={{ required: "Role is required!" }}
            render={({ field }) => (
              <Select
                {...field}
                value={selectRole?.id}
                label="Select Role"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={errors.role}
                onChange={(e) => {
                  field.onChange(e);
                  handleRole(e);
                }}
              >
                {role &&
                  role.map((item, index) => (
                    <MenuItem key={index} value={item._id}>
                      {item.roleName}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.role && errors.role.message}</FormHelperText>
        </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="name"
              rules={{ required: "Username is required!" }}
              render={({ field }) => (
                <TextField
                  id="name"
                  fullWidth
                  placeholder="Enter Username"
                  type="text"
                  {...field}
                  error={errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <TextField
                  id="email"
                  fullWidth
                  placeholder="Enter Email ID"
                  type="email"
                  {...field}
                  sx={{ mt: 3 }}
                  error={errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: "Mobile number is required!",
                  pattern: {
                    value: /^[6-9][0-9]{9}$/,
                    message:
                      "Mobile number must be exactly 10 digits and start with 6, 7, 8, or 9.",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="phone"
                    fullWidth
                    placeholder="Enter Mobile number"
                    type="text"
                    {...field}
                    error={errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default UserDetails;
