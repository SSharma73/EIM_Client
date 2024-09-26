"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useDropzone } from "react-dropzone";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import LinearProgress from "@mui/material/LinearProgress";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Typography,
  Grid,
  TextField,
  Box,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index";
import axiosInstanceImg from "@/app/api/axiosInstanceImg";
import axiosInstance from "@/app/api/axiosInstance";
import CommonDialog from "../../mui-components/Dialog";

export default function AddUser({ open, setOpen }) {
  const [progress, setProgress] = useState(0);
  const [openComman, setOpenComman] = useState(false);
  const [batteryId, setBatteryId] = useState(null);
  const [file, setFile] = useState(null);
  const [battery, setBattery] = useState(null);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const handleBattery = (event) => {
    setBatteryId(event.target.value);
  };
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setProgress(0);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenComman(false);
    setFile();
    reset();
    setBatteryId();
  };
  const onsubmit = async () => {
    if (!file) {
      notifyError("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axiosInstanceImg.post(
        "/fleet/bulkUpload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            }
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        notifySuccess(response?.data?.message);
        handleClose();
      } else {
        notifyError("Failed to upload file");
      }
    } catch (error) {
      notifyError(error?.response?.data?.message);
    }
  };
  const submitDetails = async (formdata2) => {
    try {
      const response = await axiosInstance.post("/fleet/create", formdata2);
      if (response?.status === 200 || response?.status === 201) {
        notifySuccess(response?.data?.message);
        handleClose();
      } else {
        notifyError("Failed to upload file");
      }
    } catch (error) {
      notifyError(error?.response?.data?.message);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 10485760,
  });
  const batteryData = async () => {
    // try {
    //   const response = await axiosInstance.get("/battery/getAll");
    //   setBattery(response?.data?.data);
    // } catch (error) {
    //   notifyError("User E-Tractor Successfully");
    // }
  };
  useEffect(() => {
    batteryData();
  }, [open]);
  const handleCancel = () => {
    setFile();
  };
  const handleCommanDialog = () => {
    setOpenComman(true);
  };

  const handleCommanConfirm = () => {
    handleClose();
  };
  const handleCommanCancel = () => {
    setOpenComman(false);
  };

  return (
    <React.Fragment>
      <CommonDialog
        open={openComman}
        fullWidth={true}
        maxWidth={"xs"}
        title="Cancel"
        message="Are you sure you want to close this add-tractor?"
        color="error"
        onClose={handleCommanCancel}
        onConfirm={handleCommanConfirm}
      />
      <Dialog open={open} maxWidth={"sm"} onClose={handleClose}>
        <form onSubmit={handleSubmit(submitDetails)}>
          <DialogTitle fullWidth>
            <Grid container justifyContent="flex-end" alignItems={"center"}>
              <IconButton onClick={handleCommanDialog}>
                <CloseOutlinedIcon />
              </IconButton>
            </Grid>
          </DialogTitle>
          <DialogContent fullWidth>
            <Typography variant="h5">Add E-Tractor</Typography>
            <Grid container rowGap={2} mt={4}>
              {file ? (
                <Grid
                  container
                  direction={"column"}
                  sx={{ marginBottom: "16px" }}
                >
                  <Typography>File added</Typography>
                  <Grid
                    sx={{
                      background:
                        " linear-gradient(111.41deg, rgba(139, 153, 173, 0.36) 0%, rgba(255, 255, 255, 0.12) 100%)",
                      borderRadius: "16px",
                      padding: 1,
                    }}
                  >
                    <Grid
                      display="flex"
                      alignItems="center"
                      justifyContent={"space-between"}
                    >
                      <Typography sx={{ marginLeft: 5 }} variant="body2">
                        {file.name}
                      </Typography>
                      <Grid item display={"flex"} alignItems={"center"}>
                        <Typography variant="body2" sx={{ color: "#fff" }}>{`${(
                          file?.size / 1024
                        ).toFixed(2)} KB`}</Typography>
                        <IconButton size="small">
                          <MdCancel onClick={handleCancel} />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Box display="flex" alignItems="center">
                      <InsertDriveFileIcon
                        sx={{ marginRight: 1, color: "#fff" }}
                      />
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          flexGrow: 1,
                        }}
                      />
                    </Box>
                  </Grid>

                  <Typography variant="body2" sx={{ marginTop: "8px" }}>
                    {progress?.toFixed(2)}% uploaded
                  </Typography>
                </Grid>
              ) : (
                <Grid
                  container
                  direction={"column"}
                  rowGap={2}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    border: `3px dotted #C0FE72`,
                    padding: 2,
                    borderRadius: "8px",
                  }}
                  {...getRootProps()}
                >
                  <IconButton size="large">
                    <CloudUploadOutlinedIcon fontSize="large" />
                  </IconButton>
                  <Typography variant="h5">
                    Select a file or drag and drop here
                  </Typography>
                  <Typography> csv file size no more than 10MB</Typography>
                  <input {...getInputProps()} accept=".csv" />
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
              )}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Grid container rowGap={3}>
                    <TextField
                      fullWidth
                      placeholder="Enter Number Plate"
                      {...register("numberPlate", {
                        required: "number plate is required!",
                      })}
                      error={!!errors.numberPlate}
                      helperText={errors.numberPlate?.message}
                    />
                    <TextField
                      fullWidth
                      placeholder="Enter Capacity"
                      {...register("capacity", {
                        required: "licence is required!",
                      })}
                      error={!!errors.capacity}
                      helperText={errors.capacity?.message}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container rowGap={3}>
                    <FormControl fullWidth error={!!errors.batteryId}>
                      <InputLabel id="demo-simple-select-label">
                        Select Battery
                      </InputLabel>
                      <Select
                        labelId="battery"
                        id="battery"
                        value={batteryId}
                        label="battery"
                        {...register("battery", {
                          required: "Battery  is required!",
                          onChange: (e) => {
                            handleBattery(e);
                          },
                        })}
                      >
                        {battery &&
                          battery?.map((item, index) => (
                            <MenuItem key={index} value={item?._id}>
                              {item?.batteryId}
                            </MenuItem>
                          ))}
                      </Select>
                      <FormHelperText>
                        {errors.battery && errors.battery.message}
                      </FormHelperText>
                    </FormControl>
                    <TextField
                      fullWidth
                      placeholder="Ente Type"
                      {...register("type", { required: "type is required!" })}
                      error={!!errors.type}
                      helperText={errors.type?.message}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container rowGap={3}>
                    <TextField fullWidth multiline placeholder="Description" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            {file ? (
              <Button size="large" variant="contained" onClick={onsubmit}>
                Add E-Tractor
              </Button>
            ) : (
              <Button size="large" variant="contained" type="submit">
                Add E-Tractor
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
