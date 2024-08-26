"use client";
import { Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Map from "@/app/(components)/map/map";
import { Card, Divider, Avatar, Tooltip } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CustomGrid } from "../../mui-components/CustomGrid";
import CustomTextField from "../../mui-components/Text-Field's";
import MapImg from "../../../../../public/Img/Vector.svg";
import Image from "next/image";
import { PiCarBattery } from "react-icons/pi";

const coordinate = [
  { lat: "28.51079782059423", log: "77.40362813493975" },
  { lat: "28.510404514720925", log: "77.40712974097106" },
  { lat: "28.512297585971584", log: "77.40356012099012" },
  { lat: "28.510728275696316", log: "77.40199688895548" },
  { lat: "28.511107212816803", log: "77.4063730115565" },
  { lat: "28.512937158827324", log: "77.41783963937374" },
];
const iconUrls = ["./available.svg", "charger.svg"];
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
    console.log("point", index, point);
    setActiveMarker(index);
    setIcons(point);
  };
  const onClose = () => {
    setActiveMarker(null);
  };
  const data = [
    {
      title: "Available",
      id: "--",
      arrivalTime: "--",
      soc: "--",
      rate: "--",
      charge: "--",
      queue: "queue 0",
    },
    {
      title: "Scheduled",
      id: "GHVCD12",
      arrivalTime: "35 Min",
      soc: "78%",
      rate: "2 hrs",
      charge: "--",
      queue: "queue 3",
    },
    {
      title: "Available",
      id: "--",
      arrivalTime: "--",
      soc: "--",
      rate: "--",
      charge: "--",
      queue: "queue 0",
    },
    {
      title: "Scheduled",
      id: "GHVCD12",
      arrivalTime: "35 Min",
      soc: "78%",
      rate: "2 hrs",
      charge: "--",
      queue: "queue 3",
    },
  ];
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
          coordinate={coordinate}
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
        {data.map((item, index) => (
          <Grid key={index} item xl={3} md={3} sm={12} xs={12}>
            <Card
              sx={{
                maxWidth: "auto",
                backgroundColor: "#6099EB",
                paddingTop: 3,
                borderRadius: "10px",
                position: "relative",
              }}
            >
              <Grid container justifyContent={"center"}>
                {index % 2 === 0 ? (
                  <Image
                    src="/not-charging.svg"
                    alt="not charging"
                    width={260}
                    height={140}
                    objectFit="contain"
                  />
                ) : (
                  <Image
                    src="/on-charging.svg"
                    alt="on charging"
                    width={260}
                    height={140}
                    objectFit="contain"
                  />
                )}
              </Grid>

              <CardContent
                sx={{
                  backgroundColor: index % 2 === 0 ? "#009660" : "#0042C6",
                }}
              >
                {item.title === "Available" && (
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
                      <Tooltip title={"Discharged"}>
                        <Grid
                          item
                          xs={6}
                          md={3}
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <PiCarBattery color={"#FF0000"} size={"20px"} />
                          24%
                        </Grid>
                      </Tooltip>
                      <Tooltip title={"Charging"}>
                        <Grid
                          item
                          xs={6}
                          md={3}
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <PiCarBattery color={"#FFC300"} size={"20px"} />
                          40%
                        </Grid>
                      </Tooltip>
                      <Tooltip title={"Charged"}>
                        <Grid
                          item
                          xs={6}
                          md={3}
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
                    {item?.title} <br />
                    <span style={{ fontSize: "12px" }}>
                      CS/SS ID {`(${item?.queue})`}
                    </span>
                  </Typography>
                  <Avatar sx={{ borderRadius: "4px" }}>
                    <Image src={MapImg} alt="map" />
                  </Avatar>
                </Grid>
                <Divider sx={{ border: "0.1px solid #fff" }} />
                <Grid container direction="column">
                  <InfoRow label="Tractor ID" value={item?.id} />
                  <InfoRow
                    label="Expected arrival time"
                    value={item?.arrivalTime}
                  />
                  <InfoRow
                    label={
                      index === 0
                        ? "Expected swapping time"
                        : index === 2
                        ? "Expected swapping time"
                        : "Expected charging time"
                    }
                    value={item?.rate}
                  />
                  <InfoRow label="Charge rate" value={item?.charge} />
                  <InfoRow label="Current SoC" value={item?.soc} />
                </Grid>
              </CardContent>
              <CardActions
                sx={{
                  backgroundColor: index % 2 === 0 ? "#02BB78" : "#0042C6",
                }}
              >
                <Typography variant="body2">Reason : --</Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default VehicleScheduling;
