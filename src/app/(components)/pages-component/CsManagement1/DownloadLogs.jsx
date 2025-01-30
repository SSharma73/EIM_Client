"use client";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Typography,
  Grid,
  IconButton,
  styled,
  Tooltip,
  FormControlLabel,
  CircularProgress,
  Box,
  Skeleton,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index";
import CommonDialog from "../../mui-components/Dialog";
import { useRadioGroup } from "@mui/material/RadioGroup";
import axiosInstance from "@/app/api/axiosInstance";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import dayjs from "dayjs";

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

export default function AddUser({ open, setOpen, type }) {
  const [openComman, setOpenComman] = useState(false);
  const [select, setSelect] = useState(null);
  const [logLists, setLogLists] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [progressState, setProgressState] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCommanDialog = () => {
    setOpenComman(true);
  };

  const handleCommanConfirm = () => {
    handleClose();
  };

  const handleCommanCancel = () => {
    setOpenComman(false);
  };
  const handleClose = () => {
    setOpenComman(false);
    setOpen(false);
  };

  const LogList = async () => {
    try {
      setLoading(true);
      const { data, status } = await axiosInstance.get(
        `logs/rawlogtypename?chargerType=${type}`
      );
      if (status === 200 || status === 201) {
        setLogLists(data);
        setLoading(false);
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  useEffect(() => {
    LogList();
  }, [open, type]);

  const handleDownload = async (itemId, index) => {
    setProgressState((prev) => ({ ...prev, [index]: 0 }));

    try {
      let intervalTime = 1000;
      const interval = setInterval(() => {
        setProgressState((prev) => {
          const newProgress = (prev[index] || 0) + 10;
          if (newProgress >= 90) {
            clearInterval(interval);
          }
          return { ...prev, [index]: Math.min(newProgress, 90) };
        });
      }, intervalTime);

      const { data, status } = await axiosInstance.get(
        `logs/rawlogs?chargerType=${type}&eventType=${itemId}&startDate=${
          startDate ? startDate.format("YYYY-MM-DD") : ""
        }&endDate=${endDate ? endDate.format("YYYY-MM-DD") : ""}`
      );
      if (status === 200 || status === 201) {
        intervalTime = 500;
      } else {
        intervalTime = 1500;
      }

      if (status === 200 || status === 201) {
        if (Array.isArray(data)) {
          const flattenObject = (obj, parentKey = "", separator = ".") => {
            return Object.keys(obj).reduce((acc, key) => {
              const newKey = parentKey ? `${parentKey}${separator}${key}` : key;
              if (typeof obj[key] === "object" && obj[key] !== null) {
                Object.assign(acc, flattenObject(obj[key], newKey, separator));
              } else {
                acc[newKey] = obj[key];
              }
              return acc;
            }, {});
          };

          const flattenedData = data.map((item) => flattenObject(item));
          const csv = Papa.unparse(flattenedData, {
            quotes: true,
            delimiter: ",",
            header: true,
          });

          const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

          clearInterval(interval);
          setProgressState((prev) => ({ ...prev, [index]: 100 }));
          saveAs(blob, `logs_${itemId}.csv`);
          notifySuccess("Downloaded Successfully");
        } else {
          throw new Error(
            "Unexpected data format from API. Expected an array."
          );
        }
      }
    } catch (error) {
      console.log("Error downloading file:", error);
      notifyError("Failed to download file");

      setProgressState((prev) => ({ ...prev, [index]: 0 }));
      clearInterval(interval);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const shouldDisableDate = (date) => {
    return false;
  };

  const curr = dayjs();

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
      <Dialog open={open} maxWidth={"md"} onClose={handleClose} fullWidth>
        <DialogTitle fullWidth>
          <Grid container justifyContent="space-between" alignItems={"center"}>
            <Typography variant="h5">Download CS Logs</Typography>
            <IconButton onClick={handleCommanDialog}>
              <CloseOutlinedIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent fullWidth>
          <Grid container>
            <Grid
              container
              justifyContent={"space-between"}
              mt={1}
              alignItems={"center"}
            >
              <Typography variant="h5">Select start and end date</Typography>
              <Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    shouldDisableDate={shouldDisableDate}
                    sx={{ mr: 2 }}
                    format="DD/MM/YYYY"
                    minDate={dayjs("2024-01-01")}
                    maxDate={curr}
                  />
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    disabled={!startDate}
                    onChange={handleEndDateChange}
                    shouldDisableDate={shouldDisableDate}
                    format="DD/MM/YYYY"
                    minDate={dayjs(startDate || "2024-01-01")}
                    maxDate={
                      startDate
                        ? dayjs(startDate).add(15, "day").isBefore(dayjs())
                          ? dayjs(startDate).add(15, "day")
                          : dayjs()
                        : dayjs("2028-12-31")
                    }
                  />
                </LocalizationProvider>
              </Grid>

              <Grid container mt={2}>
                {loading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <Grid
                        key={index}
                        item
                        sm={3.9}
                        sx={{
                          backgroundColor: "##F7F8F9",
                          border: "1px solid #ddd",
                          padding: "10px",
                          borderRadius: "8px",
                          marginBottom: "15px",
                        }}
                        display="flex"
                      >
                        <Skeleton
                          variant="circular"
                          width={40}
                          height={40}
                          sx={{ marginBottom: "10px", mr: 2 }}
                        />
                        <Skeleton
                          variant="text"
                          height={40}
                          sx={{ marginBottom: "10px", width: "80%" }}
                        />
                      </Grid>
                    ))
                  : logLists
                      ?.filter((item) => !(item === "reqPlcSignalEvt"))
                      .map((item, index) => (
                        <>
                          <Grid
                            key={index}
                            item
                            sm={3.9}
                            sx={{
                              backgroundColor: "##F7F8F9",
                              border: "1px solid #ddd",
                              padding: "10px",
                              borderRadius: "8px",
                              marginBottom: "15px",
                            }}
                            className="mt-20 assign-radio-grid"
                          >
                            <MyFormControlLabel
                              className="assign-formlable"
                              value={select}
                              label={
                                <Grid display={"flex"}>
                                  <Tooltip describeChild title={item} arrow>
                                    <Typography
                                      variant="subtitle1"
                                      sx={{
                                        width: "180px",
                                        overflow: "hidden",
                                        wordWrap: "break-word",
                                        whiteSpace: "normal",
                                      }}
                                    >
                                      {item}
                                    </Typography>
                                  </Tooltip>
                                </Grid>
                              }
                              control={
                                <>
                                  <Box
                                    sx={{
                                      position: "relative",
                                      display: "inline-flex",
                                      mt: 1,
                                      mr: 2,
                                      pl: 2,
                                    }}
                                  >
                                    <IconButton
                                      onClick={() => {
                                        if (!startDate || !endDate) {
                                          notifyError(
                                            "Please select start and end date first."
                                          );
                                        } else {
                                          handleDownload(item, index);
                                        }
                                      }}
                                      disabled={
                                        progressState[index] > 0 &&
                                        progressState[index] < 100
                                      }
                                    >
                                      <DownloadIcon color="primary" />
                                    </IconButton>
                                    {progressState[index] > 0 &&
                                      progressState[index] < 100 && (
                                        <CircularProgress
                                          variant="determinate"
                                          value={progressState[index]}
                                          size={38}
                                          thickness={2}
                                          sx={{
                                            position: "absolute",
                                            top: 2,
                                            left: 18,
                                            zIndex: 1,
                                            color: "primary.main",
                                          }}
                                        />
                                      )}
                                  </Box>
                                </>
                              }
                            />
                          </Grid>
                          <Grid item sm={0.1}></Grid>
                        </>
                      ))}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
