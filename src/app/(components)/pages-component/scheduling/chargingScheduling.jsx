"use client";
import { Grid, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Map from "@/app/(components)/map";
import { Card, Divider, Avatar, Tooltip } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CustomGrid } from "../../mui-components/CustomGrid";
import CustomTextField from "../../mui-components/Text-Field's";
import MapImg from "../../../../../public/Img/Vector.svg";
import Image from "next/image";
import { PiCarBattery } from "react-icons/pi";
import axiosInstance from "@/app/api/axiosInstance";
import Nodata from "../../../../../public/Img/Nodata.svg";
import moment from "moment";

const iconUrls = ["./available.svg", "charger.svg"];
const iconMapping = {
  sany: "./available.svg",
  delta: "./charger.svg",
};
const buttonData = [
  { label: "All" },
  { label: "Charging : 3", color: "red" },
  { label: "Swapping : 4", color: "green" },
  { label: "Scheduled Swapping : 3", color: "blue" },
  { label: "Scheduled Charging : 6", color: "gray" },
];
const VehicleScheduling = () => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [icons, setIcons] = useState(null);

  const handleMapData = (index, point) => {
    setActiveMarker(index);
    setIcons(point);
  };
  const onClose = () => {
    setActiveMarker(null);
  };
  const [schedules, setSchedules] = useState([]);
  const [station, setStation] = useState([]);
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const { data, status } = await axiosInstance.get(
          "schedule/getAllSchedules"
        );
        const fleetLocations = data?.data?.result
          ?.filter(
            (fleet) =>
              fleet?.stationLat && fleet?.stationType && fleet?.stationLong
          )
          ?.map((fleet) => ({
            lat: fleet?.stationLat,
            log: fleet?.stationLong,
            icon: iconMapping[fleet?.stationType],
          }));
        setStation(fleetLocations);
        setSchedules(data?.data?.result);
      } catch (err) {
        console.log("Check  err");
      }
    };

    fetchSchedules();
  }, []);

  const InfoRow = ({ label, value }) => (
    <Grid container justifyContent="space-between" marginTop={2}>
      <Typography>{label}</Typography>
      <Typography>{value}</Typography>
    </Grid>
  );
  return (
    <Grid container xs={12} sm={12} md={12} rowGap={2}>
      <Grid container height={"380px"} xl={12}>
        <Map
          handleMapData={handleMapData}
          iconUrls={iconUrls}
          buttonData={buttonData}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          coordinate={station}
          onClose={onClose}
        />
      </Grid>
      <CustomGrid>
        <Grid item md={8} xs={12}>
          <Typography variant="h4" padding={2}>
            CS/SS Scheduling Overview{" "}
          </Typography>
        </Grid>
        <Grid item md={4} xs={12} sx={{ mt: 1 }}>
          <CustomTextField type={"search"} placeholder={"Search"} fullWidth />
        </Grid>
      </CustomGrid>
      <Grid container spacing={2}>
        {schedules.map((item, index) => {
          const eta = moment(item?.eta);
          const currentTime = moment();
          const minutesDifference = eta.diff(currentTime, "minutes");
          return (
            <Grid key={index} item xl={3} md={3} sm={12} xs={12}>
              <Card
                sx={{
                  maxWidth: "auto",

                  paddingTop: 3,
                  borderRadius: "10px",
                  position: "relative",
                }}
              >
                <Grid container justifyContent={"center"}>
                  {item.stationType === "delta" ? (
                    <Image
                      src="/on-charging.svg"
                      alt="on charging"
                      width={260}
                      height={140}
                      objectFit="contain"
                    />
                  ) : (
                    <Image
                      src="/not-charging.svg"
                      alt="not charging"
                      width={260}
                      height={140}
                      objectFit="contain"
                    />
                  )}
                </Grid>
                <CardContent
                  sx={{
                    backgroundColor:
                      item.stationType === "delta"
                        ? " rgba(0, 140, 219, 0.75)"
                        : "rgba(0, 150, 96, 0.75)",
                  }}
                >
                  {(item.title === "Swapping" ||
                    item.title === "Scheduled") && (
                    <Grid
                      sx={{
                        position: "absolute",
                        top: "138px",
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        width: "90%",
                        height: "22px",
                        right: "15px",
                        borderRadius: "8px",
                      }}
                    >
                      <Grid
                        container
                        justifyContent="center"
                        sx={{ color: "#000", alignItems: "center" }}
                      >
                        <Tooltip title="Discharged">
                          <Grid
                            item
                            xs={6}
                            md={3}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <PiCarBattery color={"#FF0000"} size={"20px"} />
                            24%
                          </Grid>
                        </Tooltip>
                        <Tooltip title="Charging">
                          <Grid
                            item
                            xs={6}
                            md={3}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <PiCarBattery color={"#FFC300"} size={"20px"} />
                            40%
                          </Grid>
                        </Tooltip>
                        <Tooltip title="Charged">
                          <Grid
                            item
                            xs={6}
                            md={3}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <PiCarBattery color={"#C0FE72"} size={"20px"} />
                            100%
                          </Grid>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  )}
                  <Grid container justifyContent={"space-between"}>
                    <Typography gutterBottom variant="h4" component="div">
                      {minutesDifference < 1 ? item?.requestType : "Scheduled"}

                      <br />
                      <span style={{ fontSize: "12px" }}>
                        CS/SS ID {`(${item?.stationCode})`}
                      </span>
                    </Typography>
                    <Avatar sx={{ borderRadius: "4px" }}>
                      <Image src={MapImg} alt="map" />
                    </Avatar>
                  </Grid>
                  <Divider sx={{ border: "0.1px solid #fff" }} />
                  <Grid container direction="column">
                    <InfoRow label="Tractor ID" value={item?.fleetNumber} />
                    <InfoRow
                      label="Expected arrival time"
                      value={`${
                        minutesDifference < 1 ? 0 : minutesDifference
                      } mins`}
                    />
                    <InfoRow
                      label={
                        item.requestType === "charging"
                          ? "Expected charging time"
                          : "Expected swapping time"
                      }
                      value={`${item?.AVG_CHARGING_TIME?.toFixed(2)} mins`}
                    />
                    <InfoRow label="Charge rate" value={item?.chargingRate} />
                    <InfoRow
                      label="Current SoC"
                      value={`${item?.batteryPercentage.toFixed(2)}%`}
                    />
                  </Grid>
                </CardContent>
                <CardActions
                  sx={{
                    backgroundColor:
                      item.stationType === "delta"
                        ? " rgba(0, 140, 219, 0.9)"
                        : "rgba(0, 150, 96, 0.90)",
                  }}
                >
                  <Typography variant="body2">
                    Reason : -- {item?.description}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {schedules?.length === 0 && (
        <Grid
          container
          p={2}
          bgcolor={"#fff"}
          borderRadius={"12px"}
          justifyContent={"center"}
        >
          <Grid item xs={12} display={"flex"} justifyContent={"center"}>
            <Image src={Nodata} alt="no data" height={"350"} />
          </Grid>
          <Grid item>
            <Typography variant="h5">
              No truck is currently scheduled or charging.
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
export default VehicleScheduling;
