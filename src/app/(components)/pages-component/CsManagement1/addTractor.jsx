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
import CommonDialog from "../../mui-components/Dialog";

export default function AddUser({ open, setOpen }) {
  const [openComman, setOpenComman] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [ports, setPorts] = useState([]);
  const { register, handleSubmit, control, formState, reset } = useForm();
  const { errors } = formState;
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await axiosInstance.get(
          "customer/fetchCustomers?select=_id brandName"
        );
        setCustomers(data?.data?.result);
      } catch (error) {
        notifyError(
          error?.response?.data?.message || "Failed to fetch customers"
        );
      }
    };

    const fetchPorts = async () => {
      try {
        const { data } = await axiosInstance.get(
          "port/fetchPorts?select=name _id"
        );
        setPorts(data?.data?.result);
      } catch (error) {
        notifyError(error?.response?.data?.message || "Failed to fetch ports");
      }
    };

    if (open) {
      fetchCustomers();
      fetchPorts();
      reset();
    }
  }, [open]);

  const handleClose = () => {
    setOpenComman(false);
    setOpen(false);
    setCustomers([]);
    reset();
  };

  const submitDetails = async (data) => {
    const payload = {
      stationCode: data.stationId,
      name: data.name,
      type: data.type,
      longitude: data.longitude,
      latitude: data.latitude,
      customerId: data.customer,
      portId: data.port,
    };

    try {
      const { data, status } = await axiosInstance.post(
        "charger/addCharger",
        payload
      );
      if (status === 200 || status === 201) {
        notifySuccess(data?.msg);
        handleClose();
      } else {
        notifyError("Failed to add station");
      }
    } catch (error) {
      notifyError(error?.response?.data?.msg);
    }
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
      <ToastComponent />
      <CommonDialog
        open={openComman}
        fullWidth={true}
        maxWidth={"xs"}
        title="Cancel"
        message="Are you sure you want to close this add-CS/SS?"
        color="error"
        onClose={handleCommanCancel}
        onConfirm={handleCommanConfirm}
      />
      <Dialog open={open} maxWidth={"sm"} onClose={handleClose}>
        <form onSubmit={handleSubmit(submitDetails)}>
          <DialogTitle fullWidth>
            <Grid
              container
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Typography variant="h5">Add CS/SS</Typography>
              <IconButton onClick={handleCommanDialog}>
                <CloseOutlinedIcon />
              </IconButton>
            </Grid>
          </DialogTitle>
          <DialogContent fullWidth>
            <Grid container mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Grid container rowGap={3}>
                    <TextField
                      fullWidth
                      placeholder="Station ID"
                      {...register("stationId", {
                        required: "Station ID is required!",
                      })}
                      error={!!errors.stationId}
                      helperText={errors.stationId?.message}
                    />
                    <TextField
                      fullWidth
                      placeholder="Longitude"
                      {...register("longitude", {
                        required: "Longitude is required!",
                      })}
                      error={!!errors.longitude}
                      helperText={errors.longitude?.message}
                    />
                    <FormControl fullWidth error={!!errors.type}>
                      <InputLabel>Select Type</InputLabel>
                      <Controller
                        name="type"
                        control={control}
                        rules={{ required: "Type is required!" }}
                        render={({ field }) => (
                          <Select {...field}>
                            <MenuItem value="delta">Delta</MenuItem>
                            <MenuItem value="sany">Sany</MenuItem>
                          </Select>
                        )}
                      />
                      {errors.type && (
                        <Typography color="error">
                          {errors.type.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container rowGap={3}>
                    <TextField
                      fullWidth
                      placeholder="Name"
                      {...register("name", { required: "Name is required!" })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                    <TextField
                      fullWidth
                      placeholder="Latitude"
                      {...register("latitude", {
                        required: "Latitude is required!",
                      })}
                      error={!!errors.latitude}
                      helperText={errors.latitude?.message}
                    />
                    <FormControl fullWidth error={!!errors.customer}>
                      <InputLabel>Select Customer</InputLabel>
                      <Controller
                        name="customer"
                        control={control}
                        rules={{ required: "Customer is required!" }}
                        render={({ field }) => (
                          <Select {...field}>
                            {customers?.length > 0 &&
                              customers.map((customer) => (
                                <MenuItem
                                  key={customer._id}
                                  value={customer._id}
                                >
                                  {customer.brandName}
                                </MenuItem>
                              ))}
                          </Select>
                        )}
                      />
                      {errors.customer && (
                        <Typography color="error">
                          {errors.customer.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <FormControl fullWidth error={!!errors.port}>
                    <InputLabel>Select Port</InputLabel>
                    <Controller
                      name="port"
                      control={control}
                      rules={{ required: "Port is required!" }}
                      render={({ field }) => (
                        <Select {...field}>
                          {ports?.length > 0 &&
                            ports.map((port) => (
                              <MenuItem key={port._id} value={port._id}>
                                {port.name}
                              </MenuItem>
                            ))}
                        </Select>
                      )}
                    />
                    {errors.port && (
                      <Typography color="error">
                        {errors.port.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button size="large" variant="contained" type="submit">
              Add CS/SS
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
