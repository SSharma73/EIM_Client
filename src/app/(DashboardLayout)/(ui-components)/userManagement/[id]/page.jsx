"use client";
import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import View from "@/app/(components)/pages-component/userManagement/AddAccess/view";
import styled from "@emotion/styled";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import axiosInstance from "@/app/api/axiosInstance";
const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#6099EB",
  borderRadius: "16px",
  color: "#fff",
}));
const AddAccess = ({ params }) => {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabs = data?.module?.modules || [];
  const handleNext = () => {
    if (value < tabs.length - 1) {
      setValue(value + 1);
    }
  };

  const handleBack = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };
  const handleView = async () => {
    // const response = await axiosInstance.get(`/user/getOne/${params.id}`);
    // console.log("responseView", response);
    // setData(response?.data?.data);
  };
  useEffect(() => {
    handleView();
  }, []);
  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "User-Management", link: "/userManagement" },
    { label: "View-Access", link: `/userManagement/${params.id}` },
  ];
  return (
    <Grid container xs={12} rowGap={2}>
      <ManagementGrid
        moduleName={"Super Admin"}
        breadcrumbItems={breadcrumbItems}
      />
      <Grid item xs={12}>
        <CustomGrid container>
          <Grid item xs={12}>
            <Skeleton variant="rectangular" width={80} height={80} />
          </Grid>
          <Grid item container xs={12} spacing={2} mt={1}>
            <Grid item container xs={4} spacing={2}>
              <Grid item xs={6}>
                <Typography>User Name</Typography>
                <Typography>Location</Typography>
                <Typography> Role</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>: {data?.userName}</Typography>
                <Typography>: {data?.address ?? "--"}</Typography>
                <Typography>: {data?.role}</Typography>
              </Grid>
            </Grid>
            <Grid item container xs={4} spacing={2}>
              <Grid item xs={6}>
                <Typography>Mob. No.</Typography>
                <Typography>Sub - Admin</Typography>
                <Typography>Reporting manager</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>: {data?.mobileNumber}</Typography>
                <Typography>
                  : {data?.subAdmin ? data?.subAdmin?.userName : "NA"}
                </Typography>
                <Typography>
                  : {data?.parent ? data?.parent?.userName : "NA"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={4} spacing={2}>
              <Grid item xs={6}>
                <Typography>Email</Typography>
                <Typography>Employee ID</Typography>
                <Typography>Level</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>: {data?.emailId}</Typography>
                <Typography>: {data?.employeeId}</Typography>
                <Typography>: {data?.level}</Typography>
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
                    View Access
                  </Typography>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ overflowX: "auto" }}
                  >
                    {data?.module?.modules?.map((tab, index) => (
                      <Tab
                        key={index}
                        label={tab.name}
                        value={index}
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
                {data?.module?.modules.map((tab, index) => (
                  <TabPanel
                    key={index}
                    value={index}
                    sx={{
                      backgroundColor: "#6099EB",
                      borderRadius: "0px 0px 16px 16px",
                      height: "600px",
                      position: "relative",
                    }}
                  >
                    <View
                      value={index}
                      label={tab?.name}
                      data={data?.module?.modules}
                    />
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
                        size="large"
                        onClick={handleBack}
                        disabled={index === 0}
                        variant="outlined"
                      >
                        Back
                      </Button>
                      <Button
                        size="large"
                        onClick={handleNext}
                        sx={{ ml: 2 }}
                        variant="contained"
                        disabled={value === data?.module?.modules.length - 1}
                      >
                        Next
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
