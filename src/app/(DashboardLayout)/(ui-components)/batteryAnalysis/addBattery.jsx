"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography, Grid, TextField, IconButton } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useForm } from "react-hook-form";
import {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index";
import axiosInstance from "@/app/api/axiosInstance";
import CommonDialog from "@/app/(components)/mui-components/Dialog/index";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AddUser({ open, setOpen, handleEfficiencyData }) {
  const [openComman, setOpenComman] = useState(false);
  const [port, setPort] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [station, setStaion] = useState([]);
  const [handleDrowDown, setHandleDropdown] = React.useState({
    PortId: null,
    stationId: null,
    customerId: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  useEffect(() => {
    const Port = async () => {
      const { data } = await axiosInstance.get("/port/fetchPorts");
      setPort(data?.data?.result);
    };
    const customer = async () => {
      const { data } = await axiosInstance.get("dashboard/customers");
      setCustomers(data?.customers);
    };
    const stations = async () => {
      const { data } = await axiosInstance.get("charger/fetchChargers");
      setStaion(data?.data?.result);
    };
    Port();
    customer();
    stations();
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setHandleDropdown({
      PortId: null,
      stationId: null,
      customerId: null,
    });
    reset();
  };

  const submitDetails = async () => {
    try {
      const formData = getValues();
      if (
        handleDrowDown?.PortId === null ||
        handleDrowDown?.customerId === null ||
        handleDrowDown?.stationId === null
      ) {
        notifyError("please filled all the field");
      }
      const body = {
        portId: handleDrowDown?.PortId,
        stationId: handleDrowDown?.stationId,
        customerId: handleDrowDown?.customerId,
        batteryNumber: formData?.batteryId,
      };
      const { data, status } = await axiosInstance.post(
        `battery/addBattery`,
        body
      );
      if (status === 200 || status === 201) {
        notifySuccess("battery added successfully !");
        handleClose();
      }
    } catch (error) {}
  };

  const handleCommanDialog = () => {
    setOpenComman(true);
  };

  const handleCommanConfirm = () => {
    handleClose();
    setOpenComman(false);
  };
  const handleCommanCancel = () => {
    setOpenComman(false);
  };

  const handleChange = (key, value) => {
    setHandleDropdown((prev) => ({
      ...prev,
      [key]: value,
    }));
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
      <Dialog open={open} maxWidth={"sm"} onClose={handleClose} fullWidth>
        <form onSubmit={handleSubmit(submitDetails)}>
          <DialogTitle>
            <Grid
              container
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Typography variant="h5">Add battery</Typography>
              <IconButton onClick={handleCommanDialog}>
                <CloseOutlinedIcon />
              </IconButton>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid container spacing={2} mt={0.5}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select port
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={handleDrowDown?.PortId}
                      label="Select port"
                      onChange={(e) => handleChange("PortId", e.target.value)}
                    >
                      {port &&
                        port?.map((item, index) => (
                          <MenuItem value={item?._id} key={index}>
                            {item?.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select station
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={handleDrowDown?.customerId}
                      label="Select station"
                      onChange={(e) =>
                        handleChange("customerId", e.target.value)
                      }
                    >
                      {station &&
                        station?.map((item, index) => (
                          <MenuItem value={item?._id} key={index}>
                            {item?.stationCode}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select customer
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={handleDrowDown?.stationId}
                      label="Select customer"
                      onChange={(e) =>
                        handleChange("stationId", e.target.value)
                      }
                    >
                      {customers &&
                        customers?.map((item, index) => (
                          <MenuItem value={item?._id} key={index}>
                            {item?.brandName}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="Enter Battery ID"
                    {...register("batteryId", {
                      required: "Battery Id is required!",
                    })}
                    name={"batteryId"}
                    error={!!errors.batteryId}
                    helperText={errors.batteryId?.message}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              Add Battery
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
