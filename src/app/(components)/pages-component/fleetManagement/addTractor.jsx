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

export default function AddUser({ open, setOpen, handleTableData }) {
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
    setPorts([]);
    reset();
  };

  const submitDetails = async (data) => {
    const payload = {
      fleetNumber: data?.licencePlate,
      itv: data?.itv,
      vin: data?.vin,
      type: data?.eTractorType,
      customerId: data?.customer,
      portId: data?.port,
      description: data?.description,
    };

    try {
      const { data: responseData, status } = await axiosInstance.post(
        "fleet/addFleet",
        payload
      );
      if (status === 200 || status === 201) {
        notifySuccess(responseData?.msg);
        handleTableData();
        handleClose();
      } else {
        notifyError("Failed to add E-Tractor");
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
        message="Are you sure you want to close this add E-Tractor?"
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
              <Typography variant="h5">Add E-Tractor</Typography>
              <IconButton onClick={handleCommanDialog}>
                <CloseOutlinedIcon />
              </IconButton>
            </Grid>
          </DialogTitle>
          <DialogContent fullWidth>
            <Grid container mt={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Licence Plate Number"
                  {...register("licencePlate", {
                    required: "Licence plate number is required!",
                  })}
                  error={!!errors.licencePlate}
                  helperText={errors.licencePlate?.message}
                />
              </Grid>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="ITV"
                    {...register("itv", {
                      required: "ITV is required!",
                    })}
                    error={!!errors.itv}
                    helperText={errors.itv?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    placeholder="VIN"
                    {...register("vin", {
                      required: "VIN is required!",
                    })}
                    error={!!errors.vin}
                    helperText={errors.vin?.message}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth error={!!errors.eTractorType}>
                    <InputLabel>Select E-Tractor Type</InputLabel>
                    <Controller
                      name="eTractorType"
                      control={control}
                      rules={{ required: "E-Tractor type is required!" }}
                      render={({ field }) => (
                        <Select {...field} label="Select E-Tractor Type">
                          <MenuItem value="sany">Sany</MenuItem>
                          <MenuItem value="foton">Foton</MenuItem>
                          <MenuItem value="byd">Byd</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.eTractorType && (
                      <Typography color="error">
                        {errors.eTractorType.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth error={!!errors.customer}>
                    <InputLabel>Select Customer</InputLabel>
                    <Controller
                      name="customer"
                      control={control}
                      rules={{ required: "Customer is required!" }}
                      render={({ field }) => (
                        <Select {...field} label="Select Customer">
                          {customers?.length > 0 &&
                            customers.map((customer) => (
                              <MenuItem key={customer._id} value={customer._id}>
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
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.port}>
                    <InputLabel>Select Port</InputLabel>
                    <Controller
                      name="port"
                      control={control}
                      rules={{ required: "Port is required!" }}
                      render={({ field }) => (
                        <Select {...field} label="Select Port">
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    placeholder="Description"
                    {...register("description")}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button size="large" variant="contained" type="submit">
              Add E-Tractor
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
