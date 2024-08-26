"use client";
import React from "react";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Assign from "@/app/(components)/pages-component/userManagement/AddAccess/Assign";
import styled from "@emotion/styled";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import { FaEdit } from "react-icons/fa";
const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#6099EB",
  borderRadius: "16px",
  color: "#fff",
}));
const AddAccess = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.value === value);
    if (currentIndex !== -1 && currentIndex < tabs.length - 1) {
      setValue(tabs[currentIndex + 1].value);
    }
  };
  const handleBack = () => {
    const currentIndex = tabs.findIndex((tab) => tab.value === value);
    if (currentIndex !== -1 && currentIndex > 0) {
      setValue(tabs[currentIndex - 1].value);
    }
  };
  const tabs = [
    { label: "Assign", value: "1" },
    { label: "Dashboard", value: "2" },
    { label: "Fleet Management", value: "3" },
    { label: "CS/SS Management", value: "4" },
    { label: "Energy Management", value: "5" },
    { label: "Battery Analysis", value: "6" },
    { label: "Scheduling", value: "7" },
    { label: "Customer Management", value: "8" },
    { label: "Tariff Maangement", value: "9" },
  ];
  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "User-Management", link: "/userManagement" },
    { label: "Edit-Access", link: "/userManagement/editAccess" },
  ];
  return (
    <Grid container xs={12} rowGap={2}>
      <ManagementGrid
        moduleName={"Super Admin"}
        breadcrumbItems={breadcrumbItems}
      />
      <Grid item xs={12}>
        <CustomGrid container>
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <Skeleton variant="rectangular" width={80} height={80} />
            </Grid>
            <Grid item>
              <IconButton variant="contained">
                <FaEdit size={"15px"} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={2} mt={1}>
            <Grid item container xs={4} spacing={2}>
              <Grid item xs={6}>
                <Typography>User Name</Typography>
                <Typography>Location</Typography>
                <Typography>Assign Role</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>: Brooklyn Simmons</Typography>
                <Typography>: Delhi</Typography>
                <Typography>: Role Name</Typography>
              </Grid>
            </Grid>
            <Grid item container xs={4} spacing={2}>
              <Grid item xs={6}>
                <Typography>Mob. No.</Typography>
                <Typography>Sub - Admin</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>: 91+ 987613256</Typography>
                <Typography>: Super Admin (Name)</Typography>
              </Grid>
            </Grid>
            <Grid item container xs={4} spacing={2}>
              <Grid item xs={6}>
                <Typography>Email</Typography>
                <Typography>Role Manager</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>: rkManager@gmail.com</Typography>
                <Typography>: Super Admin (Name)</Typography>
              </Grid>
            </Grid>
          </Grid>
        </CustomGrid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid container sx={{}} xs={12} md={12}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    backgroundColor: "#0E0147",
                    borderRadius: "16px 16px 0px 0px",
                  }}
                >
                  <Typography variant="h3" p={2} sx={{ color: "#fff" }}>
                    Edit Access
                  </Typography>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ overflowX: "auto" }}
                  >
                    {tabs.map((tab) => (
                      <Tab
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                        sx={{
                          backgroundColor: "transparent",
                          color: "#fff",
                          "&.Mui-selected": {
                            backgroundColor: "transparent",
                            color: "#C0FE72",
                          },
                          "&.MuiTabs-indicator": {
                            color: "#C0FE72",
                          },
                        }}
                      />
                    ))}
                  </TabList>
                </Box>
                {tabs.map((tab) => (
                  <TabPanel
                    key={tab.value}
                    value={tab.value}
                    sx={{
                      backgroundColor: "#6099EB",
                      borderRadius: "0px 0px 16px 16px",
                      height: "600px",
                      position: "relative",
                    }}
                  >
                    <Assign value={tab.value} />
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                        mt: 20,
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                      }}
                    >
                      <Button
                        onClick={handleBack}
                        disabled={value === "1"}
                        variant="outlined"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        sx={{ ml: 2 }}
                        variant="contained"
                      >
                        {value === "9" ? "Submit" : "Next"}
                      </Button>
                    </Grid>
                  </TabPanel>
                ))}
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddAccess;
