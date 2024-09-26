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
            Choose brand logo{" "}
          </Button>
        </Grid>
      </Grid>
      {errors.profilePicture && (
        <Typography color="error" mt={1}>
          {errors.profilePicture.message}
        </Typography>
      )}
      <Grid container rowGap={2} mt={2}>
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={6}>
            <Controller
              control={control}
              name="brandName"
              rules={{ required: "Brand name is required!" }}
              render={({ field }) => (
                <TextField
                  id="brandName"
                  fullWidth
                  placeholder="Enter Brand name"
                  type="text"
                  {...field}
                  error={!!errors.brandName}
                  helperText={errors.brandName?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="contactPerson"
              rules={{ required: "Contact person name is required!" }}
              render={({ field }) => (
                <TextField
                  id="contactPerson"
                  fullWidth
                  placeholder="Enter Contact Person Name"
                  type="text"
                  {...field}
                  sx={{ mt: 3 }}
                  error={!!errors.contactPerson}
                  helperText={errors.contactPerson?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="addressLine1"
              rules={{ required: "Address line 1 is required!" }}
              render={({ field }) => (
                <TextField
                  id="addressLine1"
                  fullWidth
                  placeholder="Enter Address Line 1"
                  type="text"
                  {...field}
                  sx={{ mt: 3 }}
                  error={!!errors.addressLine1}
                  helperText={errors.addressLine1?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="city"
              rules={{ required: "City is required!" }}
              render={({ field }) => (
                <TextField
                  id="city"
                  fullWidth
                  placeholder="Enter City"
                  type="text"
                  {...field}
                  sx={{ mt: 3 }}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              )}
            />
          </Grid>

          {/* Right Column */}
          <Grid item xs={6}>
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
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
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
                  sx={{ mt: 3 }}
                  placeholder="Enter Mobile number"
                  type="text"
                  {...field}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="addressLine2"
              render={({ field }) => (
                <TextField
                  id="addressLine2"
                  fullWidth
                  placeholder="Enter Address Line 2"
                  type="text"
                  {...field}
                  sx={{ mt: 3 }}
                />
              )}
            />
            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <TextField
                  id="state"
                  fullWidth
                  placeholder="Enter State"
                  type="text"
                  {...field}
                  sx={{ mt: 3 }}
                />
              )}
            />
          </Grid>

          {/* Additional Fields */}
          <Grid item xs={6}>
            <Controller
              control={control}
              name="pincode"
              rules={{
                required: "Pincode is required!",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Pincode must be exactly 6 digits.",
                },
              }}
              render={({ field }) => (
                <TextField
                  id="pincode"
                  fullWidth
                  placeholder="Enter Pincode"
                  type="text"
                  {...field}
                  sx={{ mt: 1 }}
                  error={!!errors.pincode}
                  helperText={errors.pincode?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="country"
              rules={{ required: "Country is required!" }}
              render={({ field }) => (
                <TextField
                  id="country"
                  fullWidth
                  placeholder="Enter Country"
                  type="text"
                  {...field}
                  sx={{ mt: 1 }}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <FormControl fullWidth error={!!errors.role}>
          <InputLabel id="demo-simple-select-label">
            Select subscription
          </InputLabel>
          <Controller
            control={control}
            name="role"
            rules={{ required: "Role is required!" }}
            render={({ field }) => (
              <Select
                {...field}
                value={selectRole?.id}
                label="Select subscription"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ mt: 1 }}
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
      </Grid>
    </>
  );
};

export default UserDetails;
