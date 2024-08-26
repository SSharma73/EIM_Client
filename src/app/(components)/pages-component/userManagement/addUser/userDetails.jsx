"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDropzone } from "react-dropzone";
import {
  Typography,
  Grid,
  TextField,
  IconButton,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import LinearProgress from "@mui/material/LinearProgress";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddIcon from "@mui/icons-material/Add";
import AddRole1 from "./AddRole";
import { useForm } from "react-hook-form";
import { useFormContext, Controller } from "react-hook-form";

const UserDetails = ({
  handleTableData,
  progress,
  file,
  subAdmin,
  selectRole,
  handleSubAdmin,
  selectSubAdmin,
  handleManager,
  manager,
  selectManager,
  onDrop,
  role,
  handleLevel,
  handleRole,
}) => {
  const [open1, setOpen1] = React.useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const handleOpen = () => {
    setOpen1(true);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 10485760,
  });
  return (
    <>
      <AddRole1
        open={open1}
        setOpen={setOpen1}
        handleTableData={handleTableData}
      />
      <Grid container rowGap={2}>
        <Grid container justifyContent={"space-between"}>
          <Typography variant="h5">Add User</Typography>
          <Button variant="outlined" endIcon={<AddIcon />} onClick={handleOpen}>
            Add New Role
          </Button>
        </Grid>
        {file ? (
          <Grid container direction="column" sx={{ marginBottom: "16px" }}>
            <Typography>File added</Typography>
            <Grid
              sx={{
                background:
                  "linear-gradient(111.41deg, rgba(139, 153, 173, 0.36) 0%, rgba(255, 255, 255, 0.12) 100%)",
                borderRadius: "16px",
                padding: 1,
              }}
            >
              <Grid
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography sx={{ marginLeft: 5 }} variant="body2">
                  {file?.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#fff" }}>
                  {`${(file?.size / 1024).toFixed(2)} KB`}
                </Typography>
              </Grid>
              <Box display="flex" alignItems="center">
                <InsertDriveFileIcon sx={{ marginRight: 1, color: "#fff" }} />
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{ flexGrow: 1 }}
                />
              </Box>
            </Grid>
            <Typography variant="body2" sx={{ marginTop: "8px" }}>
              {progress?.toFixed(2)}% uploaded
            </Typography>
          </Grid>
        ) : (
          selectRole?.toLowerCase() === "sub admin" && (
            <Grid
              container
              direction="column"
              rowGap={2}
              justifyContent="center"
              alignItems="center"
              sx={{
                border: `3px dotted #fff`,
                padding: 2,
                borderRadius: "8px",
              }}
              {...getRootProps()}
            >
              <IconButton size="large">
                <CloudUploadOutlinedIcon fontSize="large" />
              </IconButton>
              <Typography variant="h5">
                Select a logo file or drag and drop here
              </Typography>
              <Typography>xlsx, csv file size no more than 10MB</Typography>
              <input {...getInputProps()} />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  component="span"
                  sx={{ color: "#C0FE72" }}
                >
                  Select File
                </Button>
              </label>
            </Grid>
          )
        )}

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container rowGap={3}>
              <Controller
                control={control}
                name="userName"
                rules={{ required: "username is required!" }}
                render={({ field }) => (
                  <TextField
                    id="userName"
                    fullWidth
                    placeholder="Enter Username"
                    type="text"
                    {...field}
                    error={errors.userName}
                    helperText={errors.userName?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="mobileNumber"
                rules={{
                  required: "mobile number is required!",
                  pattern: {
                    value: /^(0|91)?[6-9][0-9]{9}$/,
                    message: "Invalid mobile number",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="mobileNumber"
                    fullWidth
                    placeholder="Enter Mobile number"
                    type="text"
                    {...field}
                    error={errors.mobileNumber}
                    helperText={errors.mobileNumber?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container rowGap={3}>
              <Controller
                control={control}
                name="emailId"
                rules={{
                  required: "email is required!",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="emailId"
                    fullWidth
                    placeholder="Enter Email ID"
                    type="email"
                    {...field}
                    error={errors.emailId}
                    helperText={errors.emailId?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="address"
                rules={{
                  required: "address is required!",
                }}
                render={({ field }) => (
                  <TextField
                    id="address"
                    fullWidth
                    placeholder="Enter Address"
                    type="text"
                    {...field}
                    error={errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container rowGap={3}>
              <Controller
                control={control}
                name="level"
                rules={{
                  required: "level is required!",
                  min: { value: 1, message: "Level cannot be negative!" },
                  max: {
                    value: 6,
                    message: "level cannot be greater than 6 ",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="level"
                    fullWidth
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleLevel(e);
                    }}
                    placeholder="Enter Level"
                    type="number"
                    error={!!errors.level}
                    helperText={errors.level?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="employeeId"
                rules={{
                  required: "employeeId is required!",
                }}
                render={({ field }) => (
                  <TextField
                    id="employeeId"
                    fullWidth
                    placeholder="Enter Employee ID"
                    type="text"
                    {...field}
                    error={errors.employeeId}
                    helperText={errors.employeeId?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container rowGap={3}>
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel id="demo-simple-select-label">
                  Select Role
                </InputLabel>
                <Controller
                  control={control}
                  name="role"
                  rules={{ required: "role is required!" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={selectRole}
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
                        role?.map((item, index) => (
                          <MenuItem key={index} value={item?.name}>
                            {item?.name}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.role && errors.role.message}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth error={!!errors.parent}>
                <InputLabel id="parent">Reporting Manager</InputLabel>
                <Controller
                  control={control}
                  name="parent"
                  rules={{ required: "Manager is required!" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={selectManager}
                      labelId="parent"
                      label="Reporting Manager"
                      id="parent"
                      error={errors.parent}
                      onChange={(e) => {
                        field.onChange(e);
                        handleManager(e);
                      }}
                    >
                      {manager &&
                        manager?.map((item, index) => (
                          <MenuItem key={index} value={item?._id}>
                            {item?.userName}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.parent && errors.parent.message}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container rowGap={3}>
              {selectRole?.toLowerCase() !== "sub admin" && (
                <FormControl fullWidth error={!!errors.subAdmin}>
                  <InputLabel id="demo-simple-select-label" >
                    Select SubAdmin
                  </InputLabel>
                  <Controller
                    control={control}
                    name="subAdmin"
                    rules={{ required: "subAdmin is required!" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label=" Select SubAdmin" 
                        value={selectSubAdmin}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        error={errors.subAdmin}
                        FormHelperText={errors.subAdmin?.message}
                        onChange={(e) => {
                          field.onChange(e);
                          handleSubAdmin(e);
                        }}
                      >
                        {subAdmin &&
                          subAdmin?.map((item, index) => (
                            <MenuItem key={index} value={item?._id}>
                              {item?.userName}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                  <FormHelperText>
                    {errors.subAdmin && errors.subAdmin.message}
                  </FormHelperText>
                </FormControl>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default UserDetails;
