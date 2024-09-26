import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography, Grid, TextField, IconButton } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useForm } from "react-hook-form";
import axiosInstance from "@/app/api/axiosInstance";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index";
import CommonDialog from "@/app/(components)/mui-components/Dialog";
import Permission from "./Permissions";

export default function AddUser({ id, open, setOpen }) {
  const { register, handleSubmit, formState, reset, setError, clearErrors } =
    useForm();
  const [openComman, setOpenComman] = useState(false);
  const { errors } = formState;
  const [customizeModule, setCustomizeModule] = useState([]);

  const handleClose = () => {
    setOpen(false);
    reset();
    setOpenComman(false);
    setCustomizeModule([]);
  };

  const modules = [
    { _id: "1", name: "fleet-management" },
    { _id: "2", name: "cs/ss-management" },
    { _id: "3", name: "cs/ss-efficiency" },
    { _id: "4", name: "battery-analysis" },
    { _id: "5", name: "customer-management" },
    { _id: "6", name: "eim-subscriptions" },
  ];

  const handleChangeModule = (event, module) => {
    const isChecked = event.target.checked;

    setCustomizeModule((prevModules) => {
      if (isChecked) {
        return [...prevModules, module.name];
      } else {
        return prevModules.filter((name) => name !== module.name);
      }
    });

    if (customizeModule.length > 0) {
      clearErrors("selectedModules");
    }
  };

  const onSubmit = async (formData) => {
    if (customizeModule.length === 0) {
      setError("selectedModules", {
        type: "manual",
        message: "At least one module must be selected.",
      });
      return;
    }

    try {
      const { data } = await axiosInstance.post("role/addRole", {
        roleName: formData.name,
        customerId: formData.level,
        permissions: customizeModule,
        customerId: id,
      });
      notifySuccess(data.msg);
      handleClose();
    } catch (error) {
      notifyError(error?.response?.data?.message);
    }
  };

  return (
    <React.Fragment>
      <CommonDialog
        open={openComman}
        fullWidth={true}
        maxWidth={"xs"}
        title="Cancel"
        message="Are you sure you want to cancel??"
        color="error"
        onClose={() => setOpenComman(false)}
        onConfirm={handleClose}
      />
      <Dialog open={open} maxWidth={"sm"} onClose={handleClose} fullWidth>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>
            <Grid
              container
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Typography variant="h5">Add New Role</Typography>
              <IconButton onClick={() => setOpenComman(true)}>
                <CloseOutlinedIcon />
              </IconButton>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid item>
              <TextField
                fullWidth
                placeholder="Enter Role Name"
                {...register("name", {
                  required: "Role name is required!",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item mt={4} ml={2}>
              <Permission
                modules={modules}
                customizeModule={customizeModule}
                handleChangeModule={handleChangeModule}
                error={errors.selectedModules}
              />
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button size="large" variant="contained" type="submit">
              Add Role
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
