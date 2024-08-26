"use client";
import React, { useState } from "react";
import { Grid, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import AutoBox from "@/app/(components)/mui-components/Autocomplete/index";
import Map from "@/app/(components)/map/map";
import MapDetails from "@/app/(components)/map/mapDetails";

const iconUrls = [
  "./truck1.svg",
  "./truck2.svg",
  "./truck3.svg",
  "./truck4.svg",
];
const coordinate = [
  { lat: "28.51079782059423", log: "77.40362813493975" },
  { lat: "28.510404514720925", log: "77.40712974097106" },
  { lat: "28.512297585971584", log: "77.40356012099012" },
  { lat: "28.510728275696316", log: "77.40199688895548" },
  { lat: "28.511107212816803", log: "77.4063730115565" },
  { lat: "28.512937158827324", log: "77.41783963937374" },
];
const buttonData = [
  { label: "Charging : 3", color: "red" },
  { label: "Swapping : 4", color: "green" },
  { label: "Scheduled CS : 3", color: "blue" },
  { label: "Scheduled SS : 6", color: "gray" },
];

const MainGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: "#6099EB",
  color: "#fff",
  borderRadius: "16px",
  padding: theme.spacing(1),
}));

function ShorterGrid() {
  const data = [
    {
      label: "Region",
      value: "All",
      icon: "/Img/map.svg",
      data1: [
        { title: "Mumbai" },
        { title: "Delhi" },
        { title: "Agra" },
        { title: "Jaipur" },
        { title: "Kolkata" },
        { title: "Assam" },
      ],
    },
    {
      label: "Customer",
      value: 1250,
      icon: "/Img/id-card-solid.svg",
      data1: [
        { title: "customer 1" },
        { title: "customer 2" },
        { title: "customer 3" },
        { title: "customer 4" },
        { title: "customer 5" },
        { title: "customer 6" },
      ],
    },
    {
      label: "Fleet",
      value: 150,
      icon: "/Img/truck-moving-solid.svg",
      data1: [
        { title: "56" },
        { title: "63" },
        { title: "8" },
        { title: "9" },
        { title: "3" },
      ],
    },
    {
      label: "Consumption rate",
      value: "650 kWh/km",
      icon: "/Img/road-solid.svg",
    },
    {
      label: "Total mileage accumulated",
      value: "11,121 km",
      icon: "/Img/route-solid.svg",
    },
  ];

  const [activeMarker, setActiveMarker] = useState(null);
  const [icons, setIcons] = useState(null);

  const handleMapData = (index, point, color) => {
    console.log("check point", point);
    console.log("check index", index);

    setActiveMarker(index);
    setIcons(point);
  };

  const onClose = () => {
    setActiveMarker(null);
  };

  const formatValue = (value) => {
    // Split the value into number and unit parts
    return (
      <>
        <span style={{ fontSize: "23px", fontWeight: "bold" }}>
          {value.split(" ")[0]}
        </span>
        <span style={{ fontSize: "15px", fontWeight: "normal" }}>
          {value.split(" ")[1]}
        </span>
      </>
    );
  };

  return (
    <Grid container spacing={2}>
      {data.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={2.4}>
          <MainGrid>
            <Grid container>
              {index < 3 && (
                <AutoBox
                  icon={item?.icon}
                  place={item?.label}
                  data={item?.data1}
                />
              )}
              {index < 3 && (
                <Typography variant="h3" sx={{ pl: 8, fontWeight: "bold" }}>
                  {item?.value}
                </Typography>
              )}
              {index >= 3 && (
                <Grid container alignItems="center" sx={{ pt: 1.2, pl: 1 }}>
                  <Grid item xs={2}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: "rgba(193, 255, 114, 0.13)",
                      }}
                    >
                      {item.icon && (
                        <Image
                          width={30}
                          height={30}
                          src={item.icon}
                          alt={item.label}
                        />
                      )}
                    </Avatar>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="h6" sx={{ pl: 2 }}>
                      {item?.label}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              {index >= 3 && (
                <Typography
                  variant="h4"
                  sx={{
                    pl: { xs: 7, sm: 7, md: 7, lg: 7 },
                    mt: { sm: 1, md: 2, lg: 1 },
                  }}
                >
                  {formatValue(item?.value)}
                </Typography>
              )}
            </Grid>
          </MainGrid>
        </Grid>
      ))}
      {activeMarker && activeMarker !== null ? (
        <Grid item xl={9} xs={12} md={8} height={"380px"}>
          <Map
            handleMapData={handleMapData}
            iconUrls={iconUrls}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            buttonData={buttonData}
            coordinate={coordinate}
            onClose={onClose}
          />
        </Grid>
      ) : (
        <Grid item xs={12} height={"380px"}>
          <Map
            handleMapData={handleMapData}
            iconUrls={iconUrls}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            buttonData={buttonData}
            coordinate={coordinate}
            onClose={onClose}
          />
        </Grid>
      )}
      {activeMarker && activeMarker !== null && (
        <Grid item xl={3} xs={12} md={4} height={"380px"}>
          <MapDetails icons={icons} onClose={onClose} />
        </Grid>
      )}
    </Grid>
  );
}

export default ShorterGrid;
