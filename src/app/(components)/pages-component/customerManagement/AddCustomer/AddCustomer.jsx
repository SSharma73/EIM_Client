"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  Typography,
  DialogActions,
  DialogContent,
} from "@mui/material";
import CommonDialog from "@/app/(components)/mui-components/Dialog";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import axiosInstanceImg from "@/app/api/axiosInstanceImg";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index";
import { useForm, FormProvider } from "react-hook-form";
import axiosInstance from "@/app/api/axiosInstance";
import CustomerDetails from "./customerDetails";

export default function AddUser({ id, open, setOpen, handleTableData }) {
  const methods = useForm();
  const { reset } = methods;
  const [file, setFile] = useState(null);
  const [role, setRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState({ id: null, name: "" });
  const [openComman, setOpenComman] = React.useState(false);
  const fetchRoles = async () => {
    try {
      const { data } = await axiosInstance.get("role/fetchUserRoles");
      setRole(data?.data?.result);
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  };
  useEffect(() => {
    if (open) {
      fetchRoles();
      0;
    }
  }, [open]);
  const handleRole = (e) => {
    const selectedValue = e.target.value;
    const selectedRole = role.find((item) => item._id === selectedValue);
    if (selectedRole) {
      setSelectedRole({ id: selectedRole._id, name: selectedRole.roleName });
    }
  };
  const handleClose = () => {
    reset();
    setFile();
    setRole();
    setOpen(false);
    setOpenComman(false);
  };

  const submitForm = async (item) => {
    if (!file) {
      notifyError("File is required");
      return;
    }
    const formData = new FormData();
    formData.append("file", item.image);
    try {
      const ImgResponse = await axiosInstanceImg.post("upload/image", formData);
      if (![200, 201].includes(ImgResponse.status)) {
        notifyError("Failed to upload file");
        return;
      }
      const { image, ...userData } = item;
      const body = {
        ...userData,
        customerId: id,
        picture: ImgResponse.data?.data,
      };
      const { status, data } = await axiosInstance.post("/user/addUser", body);
      if (![200, 201].includes(status)) {
        notifyError("Failed to create user");
        return;
      }
      notifySuccess(data?.msg);
      handleTableData();
      handleClose();
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      notifyError(errorMessage);
    }
  };

  const handleOpenDialog = () => {
    setOpenComman(true);
  };

  const handleConfirm = () => {
    handleClose();
  };
  const handleCancel = () => {
    setOpenComman(false);
  };
  return (
    <React.Fragment>
      <CommonDialog
        open={openComman}
        fullWidth={true}
        maxWidth={"xs"}
        title="Cancel"
        message="Are you sure you want to close this Customer?"
        color="error"
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
      <Dialog open={open} maxWidth={"sm"} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Add Customer</Typography>
            <IconButton onClick={handleOpenDialog}>
              <CloseOutlinedIcon />
            </IconButton>{" "}
          </Grid>
        </DialogTitle>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitForm)} noValidate>
            <DialogContent sx={{ padding: "1px 24px" }}>
              <CustomerDetails
                file={file}
                role={role}
                setFile={setFile}
                selectRole={selectedRole}
                handleRole={handleRole}
                handleTableData={handleTableData}
              />
            </DialogContent>
            <DialogActions sx={{ mr: 2 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={handleOpenDialog}
              >
                Cancel
              </Button>
              <Button size="large" variant="contained" type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </React.Fragment>
  );
}
