"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
} from "@mui/material";
import Image from "next/image";
import Tick from "../../../../../public/Img/tick.svg";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import axiosInstance from "@/app/api/axiosInstance";

const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "EIM-Subscription", link: "/eimSubscriptions" },
];

function MyCards() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubscriptions = async () => {
    try {
      const response = await axiosInstance.get(
        "subscription/fetchSubscriptions"
      );
      setSubscriptions(response.data?.data);
      y;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <Grid container rowGap={2}>
      <ManagementGrid
        moduleName={"EIM Subscriptions"}
        breadcrumbItems={breadcrumbItems}
      />
      <Grid container spacing={3}>
        {subscriptions?.map((subscription, index) => {
          const features = [
            `Base Price Rs ${subscription.basePrice}`,
            `Limit ${subscription.limit} kWh`,
            `Extra Charge Rs ${subscription.extraCharge}/kWh`,
            `Duration: ${subscription.duration}`,
          ];

          return (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "12px",
                  mb: 2,
                  p: 2,
                }}
              >
                <CardContent>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h3">{subscription.name}</Typography>
                  </Grid>
                  <Grid container spacing={1} mt={2}>
                    <Grid item xs={12}>
                      <Typography>{`Subscription Plan: ${subscription.name}`}</Typography>
                    </Grid>
                    <Grid container spacing={1} mt={2}>
                      {features.map((feature, featureIndex) => (
                        <Grid item xs={12} key={featureIndex}>
                          <Grid item xs={12} md={6}>
                            <List>
                              <ListItem sx={{ width: "200%" }}>
                                <ListItemAvatar>
                                  <Avatar
                                    sx={{
                                      width: 30,
                                      height: 30,
                                      backgroundColor: "#38E0CF",
                                    }}
                                  >
                                    <Image src={Tick} alt="tick" />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={feature} />
                              </ListItem>
                            </List>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default MyCards;
