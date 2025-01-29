"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useForm, Controller } from "react-hook-form";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index";
import axiosInstance from "@/app/api/axiosInstance";
import CommonDialog from "@/app/(components)/mui-components/Dialog/index";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { saveAs } from "file-saver";

export default function AddUser({ open, setOpen, fleetNumber }) {
  const [openComman, setOpenComman] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const maxDate = dayjs(); // Current date
  const minDate = dayjs().subtract(1, "month");
  const handleClose = () => {
    setOpen(false);
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
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const downloadJSON = async () => {
    if (!fleetNumber) {
      notifyError("Fleet number is required");
      return;
    }

    const formattedDate = startDate
      ? dayjs(startDate).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"); // Default to today if startDate is missing

    const fileUrl = `https://enery-in-motion-uat.s3.ap-south-1.amazonaws.com/fleet/${fleetNumber}-${formattedDate}.json`;

    try {
      const response = await fetch(fileUrl, { mode: "cors" });
      if (!response.ok) {
        throw new Error("Failed to download file");
      }
      console.log(response, "response");

      const blob = await response.blob();
      saveAs(blob, `FleetData-${fleetNumber}-${formattedDate}.json`);
      notifySuccess("Download successful");
    } catch (error) {
      console.error("Error downloading file:", error);
      notifyError("Failed to download file.....");
    }
  };

  return (
    <React.Fragment>
      <ToastComponent />
      <CommonDialog
        open={openComman}
        fullWidth={true}
        maxWidth={"xs"}
        title="Cancel"
        message="Are you sure you want to close this add E-Tractor?"
        color="error"
        onClose={handleCommanCancel}
        onConfirm={handleCommanConfirm}
      />
      <Dialog open={open} maxWidth={"xs"} onClose={handleClose} fullWidth>
        <DialogTitle fullWidth>
          <Grid container justifyContent="space-between" alignItems={"center"}>
            <Typography variant="h5">Download raw data</Typography>
            <IconButton onClick={handleCommanDialog}>
              <CloseOutlinedIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent
          fullWidth
          sx={{
            height: "400px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                open={open}
                label="Basic date picker"
                value={startDate}
                onChange={handleStartDateChange}
                format="DD/MM/YYYY"
                minDate={minDate}
                maxDate={maxDate}
              />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button size="large" variant="contained" onClick={downloadJSON}>
            Download Data
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
