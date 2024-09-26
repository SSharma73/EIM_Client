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
import Image from "next/image"; // Ensure to import Image
import noData from "../../../../../../public/Img/Nodata.svg";
const coordinate = [
  { lat: "28.51079782059423", log: "77.40362813493975" },
  { lat: "28.510404514720925", log: "77.40712974097106" },
  { lat: "28.512297585971584", log: "77.40356012099012" },
  { lat: "28.510728275696316", log: "77.40199688895548" },
  { lat: "28.511107212816803", log: "77.4063730115565" },
  { lat: "28.512937158827324", log: "77.41783963937374" },
];

const Overview = ({ fetchAllDetails }) => {
  const MapHeight = "630px";
  const iconUrls = ["./available.svg", "charger.svg"];
  const [activeMarker, setActiveMarker] = useState(null);

  const handleMapData = (index, point) => {
    setActiveMarker(index);
  };

  const onClose = () => {
    setActiveMarker(null);
  };

  const getBatteryStatus = (batterySoc) => {
    const batteryStatus = [];
    if (batterySoc[1] <= 50) {
      batteryStatus.push({ color: "#FF0000", percent: `${batterySoc[1]}%` });
    } else if (batterySoc[2] > 50 && batterySoc[2] < 90) {
      batteryStatus.push({ color: "#FFC300", percent: `${batterySoc[2]}%` });
    } else {
      batteryStatus.push({ color: "#C0FE72", percent: "100%" });
    }
    return batteryStatus;
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
                item.status === "online" ? "#1CD28E" : "#FE7272";
              const batteryStatus =
                item?.batterySoc && getBatteryStatus(item?.batterySoc);
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
                              {batteryStatus.map((battery, i) => (
                                <Button
                                  size="small"
                                  key={i}
                                  sx={{ color: battery.color }}
                                  startIcon={
                                    <PiCarBattery color={battery.color} />
                                  }
                                >
                                  {battery.percent}
                                </Button>
                              ))}
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
                            {item.queue > 0
                              ? `${item.queue} Queue in charging`
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
            coordinate={coordinate}
            onClose={onClose}
          />
        </Grid>
      </CustomGrid>
    </Grid>
  );
};

export default Overview;
