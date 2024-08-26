"use client";
import { Grid, Divider, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Map from "@/app/(components)/map/map";
import { CustomGrid } from "../../../mui-components/CustomGrid";
import CustomTextField from "@/app/(components)/mui-components/Text-Field's/index";
import { PiCarBattery } from "react-icons/pi";

const coordinate = [
  { lat: "28.51079782059423", log: "77.40362813493975" },
  { lat: "28.510404514720925", log: "77.40712974097106" },
  { lat: "28.512297585971584", log: "77.40356012099012" },
  { lat: "28.510728275696316", log: "77.40199688895548" },
  { lat: "28.511107212816803", log: "77.4063730115565" },
  { lat: "28.512937158827324", log: "77.41783963937374" },
];
const cardsData = [
  {
    onlineStatus: "Online",
    swappingStation: "Swapping station",
    ssIdentity: "SS Identity",
    batteryStatus: [
      {
        color: "#FF0000",
        percent: "24%",
      },
      {
        color: "#FFC300",
        percent: "40%",
      },
      {
        color: "#C0FE72",
        percent: "100%",
      },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore laborum",
    distance: "2 km",
    queueCharging: "2 Queue swapping",
    queueSwapping: "",
  },
  {
    onlineStatus: "Offline",
    swappingStation: "Charging station",
    ssIdentity: "CS Identity (Technical Issue)",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore laborum",
    distance: "5 km",
    queueCharging: "2 Queue in charging",
    queueSwapping: "",
  },
  {
    onlineStatus: "Offline",
    swappingStation: "Swapping station",
    ssIdentity: "SS Identity (No Energy)",
    batteryStatus: [
      {
        color: "#FF0000",
        percent: "24%",
      },
      {
        color: "#FFC300",
        percent: "40%",
      },
      {
        color: "#C0FE72",
        percent: "100%",
      },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore laborum",
    distance: "1 km",
    queueCharging: "1 Queue in swapping",
    queueSwapping: "",
  },
];
const Overview = () => {
  const MapHeight = "630px";
  const iconUrls = ["./available.svg", "charger.svg"];
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
    <Grid container>
      <CustomGrid>
        <Grid item xs={12} md={6} p={2}>
          <Grid mb={2}>
            <CustomTextField fullWidth type="search" placeholder="Search" />
          </Grid>

          <Divider />
          {cardsData?.map((card, index) => (
            <Grid item xs={12} key={index} mt={1}>
              <Card sx={{ backgroundColor: "transparent" }}>
                <CardContent sx={{ padding: "5px", paddingBottom: "5px" }}>
                  <Grid container justifyContent="space-between" mb={1}>
                    <Typography
                      sx={{
                        color:
                          card.onlineStatus === "Online"
                            ? "#1CD28E"
                            : "#FE7272",
                      }}
                    >
                      {card.onlineStatus}
                    </Typography>
                    <Typography sx={{ color: "#1E1E65", fontWeight: 650 }}>
                      {card.swappingStation}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems={"center"}
                    sx={{ padding: "0 10px" }}
                    mb={2}
                  >
                    <Typography variant="h6">{card.ssIdentity}</Typography>
                    <Grid item>
                      {card?.batteryStatus && (
                        <Box display="flex" gap={2}>
                          {card.batteryStatus.map((color, i) => (
                            <Button
                              size="small"
                              key={i}
                              sx={{ color: color }}
                              startIcon={<PiCarBattery color={color} />}
                            >
                              {color.percent}
                            </Button>
                          ))}
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container sx={{ padding: "0 26px" }} rowGap={2}>
                    <Grid item xs={2}>
                      <RoomOutlinedIcon />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography>{card.description}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>{card.distance}</Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography color={"secondary"}>
                        {card.queueCharging}
                      </Typography>
                      <Typography color={"secondary"} mb={1}>
                        {card.queueSwapping}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid item xl={6} md={6} xs={12}>
          <Map
            Height={MapHeight}
            handleMapData={handleMapData}
            iconUrls={iconUrls}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            coordinate={coordinate}
            onClose={onClose}
          />
        </Grid>
      </CustomGrid>
    </Grid>
  );
};
export default Overview;
