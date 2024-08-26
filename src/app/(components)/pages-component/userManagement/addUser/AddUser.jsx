"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CommonDialog from "@/app/(components)/mui-components/Dialog";
import { Grid, IconButton, Stepper, Step, StepLabel } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddRole1 from "./AddRole";
import Permission from "./Permissions";
import axiosInstanceImg from "@/app/api/axiosInstanceImg";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index";
import axiosInstance from "@/app/api/axiosInstance";
import UserDetails from "./userDetails";
import { useForm, FormProvider } from "react-hook-form";

export default function AddUser({ open, setOpen, handleTableData }) {
  const methods = useForm();
  const { reset, getValues } = methods;
  const [open1, setOpen1] = React.useState(false);
  const [file, setFile] = useState(null);
  const [manager, setManager] = React.useState(null);
  const [selectManager, setSelectManager] = React.useState(null);
  const [progress, setProgress] = useState(0);
  const [role, setRole] = useState(null);
  const [selectRole, setSelectRole] = useState(null);
  const [subAdmin, setSubAdmin] = useState(null);
  const [selectSubAdmin, setSelectSubAdmin] = useState(null);
  const [modules, setModules] = React.useState(null);
  const [openComman, setOpenComman] = React.useState(false);
  const [customizeModule, setCustomizeModule] = React.useState(null);
  const steps = ["User Details", "Permission"];
  const [next, setNext] = useState(0);

  const handleSubAdmin = (event) => {
    setSelectSubAdmin(event.target.value);
    console.log("event submin", event.target.value);
  };
  const handleManager = (event) => {
    setSelectManager(event.target.value);
    console.log("event", event.target.value);
  };
  const handleRole = (event) => {
    setSelectRole(event.target.value);
    console.log("rolfgjgjdgje", event.target.value);
  };
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setProgress(0);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenComman(false);
    setFile();
    setManager();
    setSelectManager();
    setRole();
    setSubAdmin();
    setSelectSubAdmin();
    setSelectRole();
    setNext(0);
    reset();
  };

  const upLoadFile = async (formdata2) => {
    // console.log("customize,", customizeModule);
    const formData = new FormData();
    if (!file && selectRole?.toLowerCase() == "sub admin") {
      notifyError("file is required");
      return;
    }
    if (file) {
      formData.append("image", file);
    }
    // formData.append("modules", customizeModule);
    formData.append("userName", formdata2.userName);
    formData.append("emailId", formdata2.emailId);
    formData.append("mobileNumber", formdata2.mobileNumber);
    formData.append("level", formdata2.level);
    formData.append("role", formdata2.role);
    formData.append("address", formdata2.address);
    formData.append("employeeId", formdata2.employeeId);
    formData.append("parent", formdata2.parent);
    if (formdata2.subAdmin) {
      formData.append("subAdmin", formdata2.subAdmin);
    }
    try {
      const response = await axiosInstanceImg.post(
        "/user/createUser",
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
        notifySuccess(response?.data?.message);
        handleTableData();
        handleClose();
      } else {
        notifyError("Failed to upload file");
      }
    } catch (error) {
      notifyError(error?.response?.data?.message);
    }
  };
  const handleFormSubmission = async (formData2) => {
    if (next === 0) {
      nextStep();
    } else if (next === 1) {
      await upLoadFile(formData2);
    }
  };

  const AddRole = async (level) => {
    try {
      console.log("level", level);
      const response = await axiosInstance.get(
        `/role/getRolesWithLevel?level=${level}`
      );
      if (response?.status === 200 || response?.status === 201) {
        setRole(response?.data?.data);
        console.log("response", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const AddManager = async (level) => {
    try {
      const response = await axiosInstance.get(
        `/user/getAllParents?level=${level}`
      );
      if (response?.status === 200 || response?.status === 201) {
        setManager(response?.data?.data);
        console.log("manager", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const AddSubAdmin = async () => {
    try {
      const response = await axiosInstance.get(`/user/getAllSubAdmins`);
      if (response?.status === 200 || response?.status === 201) {
        setSubAdmin(response?.data?.data);
        console.log("subadmin", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLevel = (e) => {
    console.log("jfgks", e.target.value);
    AddRole(e.target.value);
    AddManager(e.target.value);
    setManager();
    setSelectManager();
    setRole();
    setSelectRole();
    setFile();
  };
  useEffect(() => {
    AddSubAdmin();
  }, [open]);

  const nextStep = () => {
    if (next < 1) setNext((currStep) => currStep + 1);
  };
  const previousStep = () => {
    if (next !== 0) setNext((currStep) => currStep - 1);
  };

  const getModules = async () => {
    try {
      const response = await axiosInstance.get("/module/getModules");
      if (response.status === 200 || response.status === 201) {
        console.log("module ", response);
        setModules(response?.data?.modules);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getModules();
  }, [open]);

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
        message="Are you sure you want to close this User?"
        color="error"
        onClose={handleCommanCancel}
        onConfirm={handleCommanConfirm}
      />
      {open1 && (
        <AddRole1
          open={open1}
          setOpen={setOpen1}
          handleTableData={handleTableData}
        />
      )}
      <Dialog open={open} maxWidth={"sm"} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ padding: "5px 24px" }}>
          <Grid container justifyContent="flex-end">
            <IconButton onClick={handleCommanDialog}>
              <CloseOutlinedIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleFormSubmission)}
            noValidate
          >
            <DialogContent sx={{ padding: "1px 24px" }}>
              <Grid container mb={5} justifyContent={"center"}>
                <Grid item xs={9}>
                  <Stepper activeStep={next} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
              </Grid>
              {next === 0 && (
                <UserDetails
                  handleTableData={handleTableData}
                  file={file}
                  subAdmin={subAdmin}
                  handleSubAdmin={handleSubAdmin}
                  selectSubAdmin={selectSubAdmin}
                  selectRole={selectRole}
                  manager={manager}
                  selectManager={selectManager}
                  role={role}
                  handleLevel={handleLevel}
                  handleRole={handleRole}
                  handleManager={handleManager}
                  onDrop={onDrop}
                  progress={progress}
                />
              )}
              {next === 1 && (
                <Permission
                  setCustomizeModule={setCustomizeModule}
                  modules={modules}
                  customizeModule={customizeModule}
                  setModules={setModules}
                  upLoadFile={upLoadFile}
                />
              )}
            </DialogContent>
            <DialogActions sx={{ mr: 2 }}>
              <Button
                variant="outlined"
                size="large"
                disabled={next === 0}
                onClick={() => previousStep()}
              >
                Back
              </Button>
              {next === 0 ? (
                <Button size="large" variant="contained" type="submit">
                  Next
                </Button>
              ) : (
                <Button size="large" variant="contained" type="submit">
                  Submit
                </Button>
              )}
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </React.Fragment>
  );
}
