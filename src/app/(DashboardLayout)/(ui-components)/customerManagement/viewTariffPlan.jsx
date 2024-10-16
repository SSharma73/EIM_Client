"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Dialog,
  IconButton,
  DialogTitle,
  Typography,
  Box,
  Paper,
  DialogContent,
  Divider,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import moment from "moment";
import axiosInstance from "@/app/api/axiosInstance";

export default function TariffPlan({ open, setOpen, rows }) {
  const [tariffData, setTariffData] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setTariffData(null);
  };
  useEffect(() => {
    if (open && rows && rows._id) {
      const fetchTariff = async () => {
        try {
          const response = await axiosInstance.get(
            `tariff/fetchTariffById/${rows._id}`
          );
          setTariffData(response.data);
        } catch (error) {
          console.error("Error fetching tariff data:", error);
        }
      };
      fetchTariff();
    }
  }, [open, rows]);

  const renderTimeSlots = () => {
    if (!tariffData || !tariffData.hourlyRate) {
      return (
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
            p: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="error" sx={{ mb: 1 }}>
            No Tariff Plan Assigned
          </Typography>
        </Box>
      );
    }

    const timePeriods = ["Morning", "Afternoon", "Evening", "Night"];
    const hourRanges = {
      Morning: [0, 8],
      Afternoon: [8, 12],
      Evening: [12, 16],
      Night: [16, 24],
    };

    return timePeriods.map((period, idx) => {
      const start = hourRanges[period][0];
      const end = hourRanges[period][1];
      return (
        <Box key={idx} sx={{ mb: 2 }}>
          <Typography variant="h6" color={"secondary"}>
            {period}
          </Typography>
          <Grid container spacing={2} pt={2}>
            {Array(end - start)
              .fill(null)
              .map((_, index) => {
                const hourIndex = start + index;
                const startTime = moment({ hour: hourIndex }).format("HH:00");
                const endTime = moment({ hour: hourIndex + 1 }).format("HH:00");
                const rate =
                  (tariffData.hourlyRate && tariffData.hourlyRate[hourIndex]) ||
                  0;
                return (
                  <Grid item xs={6} sm={3} key={hourIndex}>
                    <Paper
                      elevation={3}
                      mt={2}
                      sx={{
                        p: 1,
                        textAlign: "center",
                        borderRadius: 4,
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography
                          variant="body1"
                          display="flex"
                          alignItems="center"
                        >
                          <span>{`${startTime} hr. - ${endTime} hr`}</span>
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                              mx: 1,
                            }}
                          />
                          <span>{`Rate - ₹ ${rate}`}</span>
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      );
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        maxWidth={"lg"}
        onClose={handleClose}
        fullWidth
        BackdropProps={{
          style: {
            position: "fixed",
            backgroundColor: "transparent",
            transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)",
            WebkitTapHighlightColor: "transparent",
          },
        }}
      >
        <DialogTitle>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h4" color={"secondary"}>
              Tariff details
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>{renderTimeSlots()}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
