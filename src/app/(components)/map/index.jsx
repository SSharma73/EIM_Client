"use client";
import React from "react";
import { Grid } from "@mui/material";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Page = ({ Height, coordinate, setActiveMarker, handleMapData }) => {
  const center = {
    lat: 18.952562936092274,
    lng: 72.96160108171976,
  };

  const containerStyle = {
    width: "100%",
    borderRadius: "16px",
    height: Height ? Height : "364px",
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBrsCdS1KEJ9QDOgnl5gwnemCuLJDKzp9Y",
  });

  return (
    <Grid container rowGap={2} xs={12} sx={{ borderRadius: "16px" }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onUnmount={() => {
            setActiveMarker(null);
          }}
        >
          <div>
            {coordinate &&
              coordinate?.map((point, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: point?.lat,
                    lng: point?.log,
                  }}
                  onClick={() => handleMapData(index, point.icon)}
                  icon={{
                    url: point?.icon,
                    anchor: new google.maps.Point(17, 46),
                    scaledSize: new google.maps.Size(80, 80),
                  }}
                ></Marker>
              ))}
          </div>
        </GoogleMap>
      )}
    </Grid>
  );
};
export default Page;
