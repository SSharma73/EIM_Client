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
  backgroundColor: "#6099EB",
  borderRadius: "16px",
  color: "#fff",
}));

const TimeSlot = ({
  startTime,
  endTime,
  baseRate,
  adjustment,
  onAdjustmentChange,
}) => {
  return (
    <Grid container pt={2} sx={{ alignItems: "center" }}>
      <Grid item md={4} sm={4} xs={12}>
        <Typography>{`${startTime}:00 hr. - ${endTime}:00 hr.`}</Typography>
      </Grid>
      <Grid item md={4} sm={4} xs={12}>
        <TextField
          type="number"
          value={adjustment}
          onChange={(e) => onAdjustmentChange(startTime, e.target.value)}
          placeholder="Adjustment"
        />
      </Grid>
      <Grid item md={4} sm={4} xs={12}>
        <Typography>{adjustment}</Typography>
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

  const handleAdjustmentChange = (hour, value) => {
    const newAdjustments = [...adjustments];
    const parsedValue = Number(value);
    // Ensure only to add new adjustment values, not replace them
    if (!isNaN(parsedValue)) {
      newAdjustments[hour] = parsedValue; // Update the adjustment for the specific hour
    }
    setAdjustments(newAdjustments);
  };

  const timeSlots = Array.from({ length: 24 }, (_, index) => ({
    start: index,
    end: index + 1,
  }));

  useEffect(() => {
    if (baseRate) {
      setAdjustments(Array(24).fill(baseRate));
    } else {
      setAdjustments(Array(24).fill("0"));
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
      hourlyRate,
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
        <Grid item md={2} sm={4} xs={12}>
          <Typography>{baseRate}</Typography>
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
