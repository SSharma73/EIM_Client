"use client";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import { Grid, TextField, Typography, Button } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";

const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: "#6099EB",
  borderRadius: "16px",
  color: "#fff",
}));
const TimeRateSection = ({ ratePlaceholder }) => (
  <>
    <Grid
      item
      md={4}
      sm={4}
      xs={12}
      sx={{ display: "flex", flexDirection: "column", gap: 4 }}
    >
      <TextField type="number" placeholder={ratePlaceholder} />
    </Grid>
    <Grid
      item
      md={2}
      sm={2}
      xs={12}
      sx={{ display: "flex", flexDirection: "column", gap: 4 }}
    >
      <Typography>00</Typography>
    </Grid>
    <Grid
      item
      md={4}
      sm={4}
      xs={12}
      sx={{ display: "flex", flexDirection: "column", gap: 4 }}
    >
      <Typography>00:00 hr. - 06:00 hr. & 22:00 hr. - 24:00 hr.</Typography>
    </Grid>
  </>
);
const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Tariff-Management", link: "/tariffManagement" },
  { label: "Create-Tariff", link: "/tariffManagement/createTariff" },
];
const CreateTariff = () => {
  const router = useRouter();
  const handleBack = () => {
    router.push("/tariffManagement");
  };
  return (
    <Grid container rowGap={2}>
      <ManagementGrid
        breadcrumbItems={breadcrumbItems}
        moduleName={"Create Tariff"}
      />
      <CustomGrid container rowGap={5} columnGap={5}>
        <Grid
          item
          md={4}
          xs={12}
          sm={4}
          sx={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <TextField label="Tariff name" placeholder="Enter Tariff name" />
        </Grid>{" "}
        <TimeRateSection ratePlaceholder="Base Rate - (- 1.50 )" />
        <TimeRateSection ratePlaceholder="Rate - (0.00)" />
        <TimeRateSection ratePlaceholder="Rate - (0.00)" />
        <TimeRateSection ratePlaceholder="Rate - (0.00)" />
        <TimeRateSection ratePlaceholder="Rate - (0.00)" />
      </CustomGrid>

      <Grid container justifyContent={"flex-end"} columnGap={2} mr={3}>
        <Button variant="outlined" onClick={handleBack} size="large">
          Cancel
        </Button>
        <Button variant="contained" size="large">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateTariff;
