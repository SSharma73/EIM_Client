"use client";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import {
  Grid,
  TextField,
  Typography,
  Button,
  FormHelperText,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Map from "@/app/(components)/map/map";
import Autocomplete from "@mui/material/Autocomplete";
import axiosInstance from "@/app/api/axiosInstance";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#6099EB",
  borderRadius: "16px",
  color: "#fff",
}));

const FieldSection = ({ placeholder, register, name, error }) => (
  <Grid
    item
    md={4}
    sm={6}
    xs={12}
    sx={{ display: "flex", flexDirection: "column", gap: 4 }}
  >
    <TextField
      placeholder={placeholder}
      {...register(name, { required: "This field is required." })}
      error={!!error}
    />
    {error && <FormHelperText error>{error.message}</FormHelperText>}
  </Grid>
);

const AutoCompleteSection = ({
  label,
  options = [],
  register,
  name,
  error,
  setId,
}) => (
  <Grid
    item
    md={4}
    xs={12}
    sm={6}
    sx={{ display: "flex", flexDirection: "column", gap: 4 }}
  >
    <Autocomplete
      disablePortal
      size="medium"
      id={`${name}-autocomplete`}
      options={options}
      getOptionLabel={(option) => {
        if (name === "customerId") {
          return option.brandName || "";
        }
        if (name === "tariffId") {
          return option.name || "";
        }
        return "";
      }}
      onChange={(event, value) => {
        setId(value?._id);
        register(name)?.onChange(value ? value?._id : "");
      }}
      renderInput={(params) => (
        <>
          <TextField
            {...params}
            label={label}
            error={!!error}
            helperText={error ? error.message : ""}
          />
        </>
      )}
    />
  </Grid>
);

const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Customer-Management", link: "/customerManagement" },
  { label: "Add-Port", link: "/customerManagement/addPort" },
];

const AddPort = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [activeMarker, setActiveMarker] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [TaridId, setTaridId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [tariffs, setTariffs] = useState([]);

  const handleMapData = (index, point) => {
    setActiveMarker(index);
    register("location.latitude").onChange(point.latitude);
    register("location.longitude").onChange(point.longitude);
  };

  const fetchCustomers = async () => {
    try {
      const { data } = await axiosInstance.get(
        "customer/fetchCustomers?select=_id brandName"
      );
      setCustomers(data?.data?.result || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchTariffs = async () => {
    try {
      const { data } = await axiosInstance.get(
        `tariff/fetchTariffs?select=_id name`
      );
      setTariffs(data?.data?.result || []);
    } catch (error) {
      console.error("Error fetching tariffs:", error);
    }
  };

  const onSubmit = async (data) => {
    const { latitude, longitude, ...rest } = data;

    const payload = {
      ...rest,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      customerId: customerId,
      tariffId: TaridId,
    };

    try {
      const { status } = await axiosInstance.post("/port/addPort", payload);
      if (status === 200) {
        router.push("/customerManagement");
      }
    } catch (error) {
      console.error("Error adding port:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchTariffs();
  }, []);

  return (
    <Grid
      container
      rowGap={2}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ManagementGrid breadcrumbItems={breadcrumbItems} moduleName="Add Port" />
      <CustomGrid container rowGap={3} columnGap={5}>
        <Typography variant="h4">Mark Position</Typography>
        <Grid item xs={12} height="380px">
          <Map
            handleMapData={handleMapData}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
          />
        </Grid>
        <Grid container spacing={2}>
          <FieldSection
            placeholder="Port name (Auto-fill)"
            register={register}
            name="name"
            error={errors.name}
          />
          <FieldSection
            placeholder="Address line 1 (Auto-fill)"
            register={register}
            name="line1"
            error={errors.line1}
          />
          <FieldSection
            placeholder="Address line 2 (Auto-fill)"
            register={register}
            name="line2"
            error={errors.line2}
          />
          <FieldSection
            placeholder="Pin code (Auto-fill)"
            register={register}
            name="pincode"
            error={errors.pincode}
          />
          <FieldSection
            placeholder="District (Auto-fill)"
            register={register}
            name="city"
            error={errors.city}
          />
          <FieldSection
            placeholder="State (Auto-fill)"
            register={register}
            name="state"
            error={errors.state}
          />
          <FieldSection
            placeholder="Country (Auto-fill)"
            register={register}
            name="country"
            error={errors.country}
          />
          <FieldSection
            placeholder="Latitude (Auto-fill)"
            register={register}
            name="latitude"
            error={errors?.latitude}
          />
          <FieldSection
            placeholder="Longitude (Auto-fill)"
            register={register}
            name="longitude"
            error={errors?.longitude}
          />

          <AutoCompleteSection
            label="Select customer"
            options={customers}
            register={register}
            name="customerId"
            error={errors?.customerId}
            setId={setCustomerId}
          />
          <AutoCompleteSection
            label="Select tariff"
            options={tariffs}
            register={register}
            name="tariffId"
            error={errors?.tariffId}
            setId={setTaridId}
          />
        </Grid>
      </CustomGrid>
      <Grid container justifyContent={"flex-end"} columnGap={2}>
        <Button variant="outlined" type="button">
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddPort;
