"use client";
import  React,{useState} from "react";
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

export default function AddUser({ open, setOpen, handleTableData }) {
  const { register, handleSubmit, formState, reset, getValues } =useForm();
  const formData = getValues();
  const [openComman, setOpenComman] = useState(false);
  const { errors } = formState;
  const handleClose = () => {
    setOpen(false);
    reset();
    setOpenComman(false)
  };
  const onsubmit = async (formData) => {
    try {
      const res = await axiosInstance.post("/role/create", {
        name: formData.name,
        level: formData.level,
      });
      console.log(res?.data?.message);
      if (res.status == 201 || res.status == 200) {
        notifySuccess(res?.data?.message);
        handleTableData();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      notifyError(error?.response?.data?.message);
    }
  };
  const handleCommanDialog = () => {
    setOpenComman(true);
  };

  const handleCommanConfirm = () => {
    handleClose();
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
        onClose={handleCommanDialog}
        onConfirm={handleCommanConfirm}
      />
      <Dialog open={open} maxWidth={"sm"} onClose={handleClose} fullWidth>
        <form onSubmit={handleSubmit(onsubmit)} noValidate>
          <DialogTitle>
            <Grid
              container
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Typography variant="h5">Add New Role</Typography>
              <IconButton onClick={handleCommanDialog}>
                <CloseOutlinedIcon />
              </IconButton>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Grid container rowGap={3}>
                  <TextField
                    fullWidth
                    placeholder="Enter Role Name"
                    {...register("name", {
                      required: "role name is required!",
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container rowGap={3}>
                  <TextField
                    fullWidth
                    type="number"
                    placeholder="Enter level"
                    {...register("level", {
                      required: "level is required!",
                      min: { value: 1, message: "Level cannot be negative!" },
                      max: {
                        value: 6,
                        message: "level cannot be greater than 6 ",
                      },
                    })}
                    error={!!errors.level}
                    helperText={errors.level?.message}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              onClick={handleSubmit(onsubmit)}
            >
              Add Role
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
