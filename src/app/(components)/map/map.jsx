"use client";
import { Grid, Badge, ButtonGroup, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

const defaultCenter = {
  lat: 28.51079782059423,
  lng: 77.40362813493975,
};
const Page = ({
  iconUrls,
  buttonData,
  Height,
  coordinate,
  activeMarker,
  setActiveMarker,
  onClose,
  handleMapData,
  center,
}) => {
  const containerStyle = {
    width: "100%",
    borderRadius: "16px",
    height: Height ? Height : "364px",
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBrsCdS1KEJ9QDOgnl5gwnemCuLJDKzp9Y",
  });

  const [snap, setSnap] = useState([]);
  const [center1, setCenter1] = useState(defaultCenter);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (center?.region) {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${center?.region}&key=AIzaSyBrsCdS1KEJ9QDOgnl5gwnemCuLJDKzp9Y`
          );

          if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location;
            setCenter1({ lat, lng });
          } else {
            // console.error("No results found for the specified location.");
          }
        } catch (error) {
          console.error("Error fetching geocoded coordinates:", error);
        }
      }
    };

    fetchCoordinates();
  }, [center?.region]);
  useEffect(() => {
    if (!center?.region) {
      setCenter1(defaultCenter);
    }
  }, [center?.region]);

  const fetchData = async () => {
    try {
      const path = coordinate
        .map((coord) => `${coord.lat},${coord.log}`)
        .join("|");
      const response = await axios.get(
        `https://roads.googleapis.com/v1/snapToRoads?path=${path}&key=AIzaSyBrsCdS1KEJ9QDOgnl5gwnemCuLJDKzp9Y`
      );
      const datasnap = response.data.snappedPoints;
      if (datasnap) {
        setSnap(datasnap);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [center]);

  const [activeButton, setActiveButton] = useState(null);
  const [filteredMarkers, setFilteredMarkers] = useState(null);

  useEffect(() => {
    if (activeButton !== null) {
      const filtered = snap.filter((point, index) => {
        const color1 = iconUrls[index % iconUrls.length].color;
        return color1 === buttonData[activeButton].color;
      });

      setFilteredMarkers(filtered);
    } else {
      setFilteredMarkers(snap);
    }
  }, [activeButton, snap]);

  const Badge1 = styled(Badge)(({ color }) => ({
    marginRight: "16px",
    "& .MuiBadge-badge": {
      backgroundColor: color,
    },
  }));
  return (
    <Grid container rowGap={2} xs={12} sx={{ borderRadius: "16px" }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center1 || defaultCenter}
          zoom={13}
          onUnmount={() => {
            setActiveMarker(null);
          }}
        >
          <div>
            {filteredMarkers &&
              filteredMarkers.map((point, index) => {
                const icon = iconUrls[index % iconUrls.length];
                return (
                  <Marker
                    key={index}
                    position={{
                      lat: point.location.latitude,
                      lng: point.location.longitude,
                    }}
                    onClick={() => handleMapData(index, icon)}
                    icon={{
                      url: iconUrls && iconUrls[index % iconUrls.length],
                      anchor: new google.maps.Point(17, 46),
                      scaledSize: new google.maps.Size(80, 80),
                    }}
                  ></Marker>
                );
              })}
            <Grid container xs={12} sx={{ position: "relative" }}>
              {buttonData && (
                <Box
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: 322,
                    display: "flex",
                    transform: "translateX(-50%)",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    mb: 0,
                  }}
                >
                  {buttonData && (
                    <ButtonGroup aria-label="Basic button group">
                      {buttonData.map((button, index) => (
                        <Button
                          variant="contained"
                          key={index}
                          // onClick={() => {
                          //   handleButtonClick(button);
                          // }}
                          sx={{
                            ".MuiButton-outlined": {
                              border: "1px solid #fff",
                              color: "#fff",
                            },
                            "&:hover": {
                              color: "#C0FE72",
                            },
                          }}
                          startIcon={
                            <Badge1
                              variant="dot"
                              color={
                                activeButton === index ? "black" : button.color
                              }
                            />
                          }
                        >
                          {button.label}
                        </Button>
                      ))}
                    </ButtonGroup>
                  )}
                </Box>
              )}
            </Grid>
          </div>
        </GoogleMap>
      )}
    </Grid>
  );
};
export default Page;
