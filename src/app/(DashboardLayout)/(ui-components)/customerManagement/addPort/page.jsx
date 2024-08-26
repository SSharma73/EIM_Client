"use client";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import { Grid, TextField, Typography, Button } from "@mui/material";
import React,{useState} from "react";
import styled from "@emotion/styled";
import Map from "@/app/(components)/map/map";
import Autocomplete from "@mui/material/Autocomplete";

const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#6099EB",
  borderRadius: "16px",
  color: "#fff",
}));

const iconUrls = [
  { icon: "/truck1.svg", color: "blue" },
  { icon: "/truck2.svg", color: "red" },
  { icon: "/truck3.svg", color: "green" },
  { icon: "/truck4.svg", color: "skyblue" },
];
// const coordinate = [
//   { lat: "28.51079782059423", log: "77.40362813493975" },
//   { lat: "28.510404514720925", log: "77.40712974097106" },
//   { lat: "28.512297585971584", log: "77.40356012099012" },
//   { lat: "28.510728275696316", log: "77.40199688895548" },
//   { lat: "28.511107212816803", log: "77.4063730115565" },
//   { lat: "28.512937158827324", log: "77.41783963937374" },
// ];
const buttonData = [
  { label: "Offline", color: "red" },
  { label: "Charging", color: "green" },
  { label: "Trip", color: "blue" },
  { label: "Parked", color: "skyblue" },
];
const FieldSection = ({ placeholder }) => (
  <Grid
    item
    md={4}
    sm={6}
    xs={12}
    sx={{ display: "flex", flexDirection: "column", gap: 4 }}
  >
    <TextField placeholder={placeholder} />
  </Grid>
);

const AutoCompleteSection = ({ label, options }) => (
  <Grid
    item
    md={4}
    xs={12}
    sm={6}
    sx={{ display: "flex", flexDirection: "column", gap: 4 }}
  >
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      fullWidth
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  </Grid>
);
const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Customer-Management", link: "/customerManagement" },
  { label: "Add-Port", link: "/customerManagement/addPort" },
];
const AddPort = () => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [icons, setIcons] = useState(null);

  const handleMapData = (index, point) => {
    console.log("point", index, point);
    setActiveMarker(index);
    setIcons(point);
  };
  const onClose = () => {
    setActiveMarker(null);
  };
  return (
    <Grid container rowGap={2}>
      <ManagementGrid breadcrumbItems={breadcrumbItems} moduleName="Add Port" />
      <CustomGrid container rowGap={3} columnGap={5}>
        <Grid
          item
          md={4}
          xs={12}
          sm={6}
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <TextField label="Location name" placeholder="Enter location name" />
        </Grid>
        <Grid item xs={12} height="380px">
        <Map
            handleMapData={handleMapData}
            iconUrls={iconUrls}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            onClose={onClose}
          />
        </Grid>
        <Grid
          item
          md={2}
          xs={12}
          sm={6}
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <TextField type="text" placeholder="Enter location name" />
        </Grid>
        <Grid container rowGap={3} columnGap={5}>
          <FieldSection placeholder="Region name (Auto-fill)" />
          <FieldSection placeholder="Location name (Auto-fill)" />
          <Grid
            item
            md={2}
            xs={12}
            sm={6}
            sx={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <TextField placeholder="Port name (Auto-fill)" />
          </Grid>
          <FieldSection placeholder="Pin code (Auto-fill)" />
          <FieldSection placeholder="State (Auto-fill)" />
          <Grid
            item
            md={2}
            xs={12}
            sm={6}
            sx={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <TextField placeholder="District (Auto-fill)" />
          </Grid>
          <AutoCompleteSection label="Select user" options={user} />
          <AutoCompleteSection label="Select tariff" options={Region} />
          <Grid
            item
            md={2}
            xs={12}
            sm={6}
            sx={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={tarif}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Assign E-tractor" />
              )}
            />
          </Grid>
        </Grid>
      </CustomGrid>
      <Grid container justifyContent={"flex-end"} columnGap={2}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Submit</Button>
      </Grid>
    </Grid>
  );
};

export default AddPort;

const user = [
  { label: "k.m", year: 1994 },
  { label: "birla", year: 1972 },
  { label: "huntmount", year: 1974 },
  { label: "Dark", year: 2008 },
  { label: "samay", year: 1957 },
  { label: "robert", year: 1993 },
  { label: "kim", year: 1994 },
  {
    label: "huikey",
    year: 2003,
  },
];

const Region = [
  { label: "tariff 1", year: 1994 },
  { label: "tariff 2", year: 1972 },
  { label: "tariff 3", year: 1974 },
  { label: "tariff 4", year: 2008 },
  { label: "tariff 5", year: 1957 },
  { label: "tariff 6", year: 1993 },
  { label: "tariff 7", year: 1994 },
  {
    label: "tariff 8",
    year: 2003,
  },
];
const tarif = [
  { label: "E-tractor1", year: 1994 },
  { label: "E-tractor2", year: 1972 },
  { label: "E-tractor3", year: 1974 },
  { label: "E-tractor4", year: 2008 },
  { label: "E-tractor5", year: 1957 },
  { label: "E-tractor6", year: 1993 },
  { label: "E-tractor7", year: 1994 },
];
