"use client";
import React, { useState, useEffect } from "react";
import { Grid, TextField, Typography, Button } from "@mui/material";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axiosInstance from "@/app/api/axiosInstance";
import {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index";
import ToastComponent from "@/app/(components)/mui-components/Snackbar";

const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: "16px",
}));

const TimeSlot = ({
  startTime,
  endTime,
  baseRate,
  adjustment,
  onAdjustmentChange,
}) => {
  // Parse adjustment to handle empty or invalid cases
  const parsedAdjustment = Number(adjustment) || 0; // Default to 0 if NaN or empty
  const adjustedRate = Number(baseRate) + parsedAdjustment;

  // Ensure adjustedRate is not less than or equal to 0
  const displayRate = adjustedRate > 0 ? adjustedRate : 0.0;

  return (
    <Grid container pt={2} sx={{ alignItems: "center" }}>
      <Grid item md={4} sm={4} xs={12}>
        <Typography>{`${startTime}:00 hr. - ${endTime}:00 hr.`}</Typography>
      </Grid>
      <Grid item md={4} sm={4} xs={12}>
        <TextField
          type="text" // Keep as "text" to allow negative values
          value={adjustment}
          onChange={(e) =>
            onAdjustmentChange(startTime, e.target.value, baseRate)
          }
          placeholder="Adjustment"
        />
      </Grid>
      <Grid item md={4} sm={4} xs={12}>
        <Typography>{displayRate.toFixed(2)}</Typography>
      </Grid>
    </Grid>
  );
};

const CreateTariff = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [baseRate, setBaseRate] = useState("");
  const [adjustments, setAdjustments] = useState(Array(24).fill("0"));
  const handleAdjustmentChange = (hour, value, baseRate) => {
    // Allow an empty string (for deletion)
    if (value === "") {
      const newAdjustments = [...adjustments];
      newAdjustments[hour] = ""; // Allow empty for clearing
      setAdjustments(newAdjustments);
      return;
    }

    // Allow "-" as a valid input temporarily
    if (value === "-" || value === "-0") {
      const newAdjustments = [...adjustments];
      newAdjustments[hour] = value; // Set as negative input
      setAdjustments(newAdjustments);
      return;
    }

    // Parse the value
    const parsedValue = parseFloat(value);

    // Validate if the input is a number (including negative)
    if (!isNaN(parsedValue)) {
      const adjustedRate = Number(baseRate) + parsedValue;

      // Check if the adjusted rate is less than 1
      if (adjustedRate < 1) {
        notifyError("Adjustment results in rate below minimum of 1.");
        // Optionally, display an error message to the user (e.g., using state)
        return; // Prevent further action
      }

      const newAdjustments = [...adjustments];
      newAdjustments[hour] = parsedValue.toString(); // Store valid input
      setAdjustments(newAdjustments);
    } else {
      // For non-numeric input, keep the last valid value
      const newAdjustments = [...adjustments];
      newAdjustments[hour] = adjustments[hour]; // Keep the last valid value
      setAdjustments(newAdjustments);
    }
  };

  const timeSlots = Array.from({ length: 24 }, (_, index) => ({
    start: index,
    end: index + 1,
  }));

  useEffect(() => {
    if (baseRate) {
      setAdjustments(Array(24).fill("0")); // Reset adjustments to 0 when baseRate changes
    }
  }, [baseRate]);

  const onSubmit = async (data) => {
    const hourlyRate = Object.fromEntries(
      adjustments.map((adjustment, index) => [
        index.toString(),
        Number(adjustment),
      ])
    );

    const payload = {
      name: data.name,
      baseRate: Number(data.baseRate),
      hourlyRate: Object.fromEntries(
        adjustments.map((adjustment, index) => [
          index.toString(),
          Number(baseRate) + Number(adjustment),
        ])
      ),
    };

    try {
      const { status, data } = await axiosInstance.post(
        "tariff/addTariff",
        payload
      );
      if (status === 200) {
        notifySuccess(data?.msg || "Success to fetch data");
        router.push("/tariffManagement");
      }
    } catch (error) {
      notifyError(error?.response?.data?.msg || "Failed to fetch data");
    }
  };

  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "Tariff-Management", link: "/tariffManagement" },
    { label: "Create-Tariff", link: "/tariffManagement/createTariff" },
  ];

  return (
    <Grid container rowGap={2}>
      <ToastComponent />
      <ManagementGrid
        breadcrumbItems={breadcrumbItems}
        moduleName={"Create Tariff"}
      />
      <CustomGrid container sx={{ alignItems: "center" }}>
        <Grid item md={4} xs={12} sm={4}>
          <TextField
            label="Tariff Name"
            placeholder="Enter Tariff name"
            {...register("name", { required: "Tariff name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item md={4} xs={12} sm={4}>
          <TextField
            label="Base Rate"
            {...register("baseRate", {
              required: "Base rate is required",
              valueAsNumber: true,
            })}
            placeholder="Enter Base Rate"
            type="number"
            error={!!errors.baseRate}
            helperText={errors.baseRate?.message}
            onChange={(e) => setBaseRate(e.target.value)}
          />
        </Grid>
      </CustomGrid>
      <CustomGrid container>
        <Grid item xs={12} sx={{ height: "300px", overflowY: "scroll" }}>
          {timeSlots.map((slot, index) => (
            <TimeSlot
              key={index}
              startTime={slot.start}
              endTime={slot.end}
              baseRate={baseRate || "0"}
              adjustment={adjustments[slot.start]}
              onAdjustmentChange={handleAdjustmentChange}
            />
          ))}
        </Grid>
      </CustomGrid>
      <Grid container justifyContent={"flex-end"} columnGap={2} mr={3}>
        <Button
          variant="outlined"
          onClick={() => router.push("/tariffManagement")}
          size="large"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateTariff;
