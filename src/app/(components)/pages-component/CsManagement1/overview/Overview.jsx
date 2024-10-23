"use client";
import { Grid, Divider, Typography, Button, Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Map from "@/app/(components)/map";
import { CustomGrid } from "../../../mui-components/CustomGrid";
import CustomTextField from "@/app/(components)/mui-components/Text-Field's/index";
import { PiCarBattery } from "react-icons/pi";
import Image from "next/image"; // Ensure to import Image
import noData from "../../../../../../public/Img/Nodata.svg";

const Overview = ({ fetchAllDetails }) => {
  const MapHeight = "630px";
  const iconUrls = ["./available.svg", "charger.svg"];
  const iconMapping = {
    sany: "./available.svg",
    delta: "./charger.svg",
  };
  const [activeMarker, setActiveMarker] = useState(null);
  const handleMapData = (index, point) => {
    setActiveMarker(index);
  };
  const [coordinates, setCoordinates] = useState([]);
  useEffect(() => {
    if (fetchAllDetails?.result) {
      const newCoordinates = fetchAllDetails?.result?.map((item) => ({
        lat: item?.location?.coordinates[1],
        log: item?.location?.coordinates[0],
        icon: iconMapping[item?.type],
      }));
      setCoordinates(newCoordinates);
    }
  }, [fetchAllDetails]);

  const onClose = () => {
    setActiveMarker(null);
  };

  const getBatteryStatus = (batterySoc) => {
    if (batterySoc <= 50) {
      return { color: "#FF0000", percent: `${batterySoc}%` };
    } else if (batterySoc > 50 && batterySoc < 90) {
      return { color: "#FFC300", percent: `${batterySoc}%` };
    } else {
      return { color: "#C0FE72", percent: "100%" };
    }
  };
  return (
    <Grid container>
      <CustomGrid>
        <Grid item xs={12} md={6} p={2}>
          <Grid mb={2}>
            <CustomTextField fullWidth type="search" placeholder="Search" />
          </Grid>

          <Divider />
          {fetchAllDetails?.result?.length > 0 ? (
            fetchAllDetails.result.map((item, index) => {
              const onlineStatusColor =
                item.status === "available" ? "#1CD28E" : "#FE7272";
              const batteryStates = [
                { index: 4 },
                { index: 3 },
                { index: 2 },
                { index: 1 },
              ];
              return (
                <Grid item xs={12} key={index} mt={1}>
                  <Card sx={{ backgroundColor: "transparent" }}>
                    <CardContent sx={{ padding: "5px", paddingBottom: "5px" }}>
                      <Grid container justifyContent="space-between" mb={1}>
                        <Typography sx={{ color: onlineStatusColor }}>
                          {item.status}
                        </Typography>
                        <Typography sx={{ color: "#1E1E65", fontWeight: 650 }}>
                          {item.type === "delta"
                            ? "Charging station"
                            : "Swapping station"}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems={"center"}
                        sx={{ padding: "0 10px" }}
                        mb={2}
                      >
                        <Typography variant="h6">{item.name}</Typography>
                        {item?.batterySoc && (
                          <Grid item>
                            <Box display="flex" gap={2}>
                              {batteryStates.map((state, index) => {
                                const batteryInfo = getBatteryStatus(
                                  item?.batterySoc[state.index]
                                );

                                return (
                                  <Tooltip
                                    title={batteryInfo.percent}
                                    key={index}
                                  >
                                    <Button
                                      size="small"
                                      sx={{ color: batteryInfo.color }}
                                      startIcon={
                                        <PiCarBattery
                                          color={batteryInfo.color}
                                        />
                                      }
                                    >
                                      {batteryInfo.percent}
                                    </Button>
                                  </Tooltip>
                                );
                              })}
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                      <Grid container sx={{ padding: "0 26px" }} rowGap={2}>
                        <Grid item xs={2}>
                          <RoomOutlinedIcon />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography>
                            {item.description || "Description not available"}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography>{item.distance || "N/A"}</Typography>
                        </Grid>
                        <Grid item xs={10}>
                          <Typography color={"secondary"}>
                            {item.queue.length > 0
                              ? `${item.queue?.length} Queue`
                              : "No Queue"}
                          </Typography>
                          <Typography color={"secondary"} mb={1}>
                            {item.queueSwapping || ""}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 200,
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  src={noData}
                  alt="No data available"
                  height={500}
                  width={500}
                />
                <Typography variant="h6" color="text">
                  No data available
                </Typography>
              </Grid>
            </Box>
          )}
        </Grid>
        <Grid item xl={6} md={6} xs={12}>
          <Map
            Height={MapHeight}
            handleMapData={handleMapData}
            iconUrls={iconUrls}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            coordinate={coordinates}
            onClose={onClose}
          />
        </Grid>
      </CustomGrid>
    </Grid>
  );
};

export default Overview;
