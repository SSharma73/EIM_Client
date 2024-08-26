"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Avatar,
  Button,
} from "@mui/material";
import axiosInstance from "@/app/api/axiosInstance";
import moment from "moment";

const Read = () => {
  const [data, setData] = useState(null);
  const getData = async () => {
    try {
      // const res = await axiosInstance.get(`/api/notification?limit=200`);
      // if (res.status === 200 || res.status === 201) {
      //   console.log(res);
      //   setData(res?.data?.data?.result);
      // }
      console.log("wekjg");
    } catch (err) {}
  };
  // useEffect(() => {
  //   getData();
  // }, []);
  return (
    <Grid md={12} lg={12}>
      <Box
        mt={2}
        sx={{
          backgroundColor: "#6099EB",
          padding: 2,
          backgroundColor: "#6099EB",
          borderRadius: "16px",
        }}
      >
        <Box>
          <Box display="flex" alignItems="center" p={2}>
            <Avatar
              sx={{
                height: 45,
                width: 45,
                mr: 2,
                backgroundColor: "#fff",
                color: "gray",
              }}
            >
              M
            </Avatar>
            <Box flexGrow={1}>
              <Typography variant="body1">
              Ashwin Bose is requesting for battery charging , Current battery : 52%
              </Typography>
              <Box mt={1}>
                <Button variant="contained" sx={{ mr: 2 }}>
                  Accept
                </Button>
                <Button variant="outlined">Decline</Button>
              </Box>
            </Box>
            <Typography variant="body1" color="secondary">
              2m ago
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" alignItems="center" p={2}>
            <Avatar
              sx={{
                height: 45,
                width: 45,
                mr: 2,
                backgroundColor: "#fff",
                color: "gray",
              }}
            >
              M
            </Avatar>
            <Box flexGrow={1}>
              <Typography variant="body1">
              Rajat Singh is requesting for battery swapping , Current battery : 12%
              </Typography>
              <Box mt={1}>
                <Button variant="contained" sx={{ mr: 2 }}>
                  Accept
                </Button>
                <Button variant="outlined">Decline</Button>
              </Box>
            </Box>
            <Typography variant="body1" color="secondary">
              2m ago
            </Typography>
          </Box>
         
        </Box>
      </Box>
    </Grid>
  );
};

export default Read;
