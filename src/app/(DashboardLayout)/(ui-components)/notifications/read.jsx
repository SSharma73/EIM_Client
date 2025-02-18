"use client";
import React from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Avatar,
  Button,
  Pagination,
} from "@mui/material";
import axiosInstance from "@/app/api/axiosInstance";
import moment from "moment";
import Image from "next/image";
import notificationImg from "../../../../../public/Img/bell.gif";
import ToastComponent, {
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar";
const Read = ({
  data,
  getData,
  tabsValue,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const handleResponse = async (notificationId, status) => {
    try {
      const res = await axiosInstance.post(
        `notification/notifications/response/${notificationId}`,
        { status }
      );
      if (res.status === 200 || res.status === 201) {
        notifySuccess(res?.data?.message);
        getData(tabsValue);
      }
    } catch (err) {
      console.error(`Error responding to notification ${notificationId}:`, err);
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <ToastComponent />
      <Grid md={12} lg={12}>
        <Box
          mt={2}
          sx={{
            backgroundColor: "#fff",
            padding: 2,
            borderRadius: "16px",
            height: "700px",
            overflowY: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            {data?.notifications?.length > 0 ? (
              <>
                {data?.notifications?.map((notification) => (
                  <Box key={notification._id}>
                    <Box display="flex" alignItems="center" p={2}>
                      <Avatar
                        sx={{
                          height: 45,
                          width: 45,
                          mr: 2,
                          backgroundColor: "#38E0CF",
                        }}
                      >
                        {notification?.requestType[0]}
                      </Avatar>
                      <Box flexGrow={1}>
                        {notification?.requestType === "Disconnected" ? (
                          <Typography variant="body1">
                            {notification?.fleetNumber} has been{" "}
                            {notification?.requestType} due to a{" "}
                            {notification?.reason}, Current battery:{" "}
                            {notification?.batteryPercentage?.toFixed(2)}%
                          </Typography>
                        ) : (
                          <Typography variant="body1">
                            {notification?.fleetNumber} is requesting for{" "}
                            {notification?.requestType}, Current battery:{" "}
                            {notification?.batteryPercentage?.toFixed(2)}%
                          </Typography>
                        )}
                        {notification.status === "pending" && (
                          <Box mt={1}>
                            <Button
                              variant="contained"
                              sx={{ mr: 2 }}
                              onClick={() =>
                                handleResponse(notification?._id, "approve")
                              }
                            >
                              Approve{" "}
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                handleResponse(notification?._id, "reject")
                              }
                            >
                              Reject
                            </Button>
                          </Box>
                        )}
                      </Box>
                      <Typography variant="body1" color="secondary">
                        {moment(notification.createdAt).fromNow()}
                      </Typography>
                    </Box>
                    <Divider />
                  </Box>
                ))}
                {/* Pagination */}
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  mt={2}
                  sx={{
                    position: "sticky",
                    bottom: -18,
                    zIndex: 1,
                    backgroundColor: "#fff",
                    p: 2,
                  }}
                >
                  <Pagination
                    count={data?.count}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              </>
            ) : (
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%", height: "600px" }}
                direction="column"
              >
                <Grid container justifyContent="center">
                  <Image
                    src={notificationImg}
                    alt="notification"
                    width={150}
                    height={150}
                  />
                </Grid>
                <Typography className="fs20px">
                  No notifications to show yet
                </Typography>
                <Typography
                  align="center"
                  className="fs16px"
                  sx={{ color: "#4A515C", width: "90%" }}
                >
                  You’ll see useful information here soon. Stay tuned!
                </Typography>
              </Grid>
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Read;
