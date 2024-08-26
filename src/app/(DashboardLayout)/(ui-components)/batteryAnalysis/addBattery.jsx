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
import { Typography, Grid, TextField, Box, IconButton } from "@mui/material";
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
import CommonDialog from "@/app/(components)/mui-components/Dialog/index";

export default function AddUser({ open, setOpen, handleEfficiencyData }) {
  const [progress, setProgress] = useState(0);
  const [openComman, setOpenComman] = useState(false);
  const [file, setFile] = useState(null);
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors } = formState;
  const formdata2 = getValues();
  console.log("jasbkjas", formdata2);
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setProgress(0);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenComman(false);
    setFile();
    reset();
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
        "/battery/bulkUpload",
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
      console.log("response", response);
      if (response?.status === 200 || response?.status === 201) {
        handleEfficiencyData();
        handleClose();
        notifySuccess(response?.data?.message);
      } else {
        notifyError("Failed to upload file");
      }
    } catch (error) {
      notifyError(error?.response?.data?.message);
    }
  };
  const submitDetails = async (formdata2) => {
    try {
      const response = await axiosInstance.post("/battery/create", formdata2);
      if (response?.status === 200 || response?.status === 201) {
        handleEfficiencyData();
        handleClose();
        notifySuccess(response?.data?.message);
      } else {
        notifyError("Failed to add battery");
      }
    } catch (error) {
      notifyError(error?.response?.data?.message);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 10485760,
  });
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
    setOpenComman(false)
  };
  return (
    <React.Fragment>
      <CommonDialog
        open={openComman}
        fullWidth={true}
        maxWidth={"xs"}
        title="Cancel"
        message="Are you sure you want to close this add-Battery?"
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
            <Typography variant="h5">Add Battery</Typography>
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
                        sx={{ flexGrow: 1 }}
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
                      placeholder="Enter Battery ID"
                      {...register("batteryId", {
                        required: "Battery Id is required!",
                      })}
                      error={!!errors.batteryId}
                      helperText={errors.batteryId?.message}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            {file ? (
              <Button size="large" variant="contained" onClick={onsubmit}>
                Add Battery
              </Button>
            ) : (
              <Button size="large" variant="contained" type="submit">
                Add Battery
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
