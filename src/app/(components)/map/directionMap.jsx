"use client";
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const Page = ({ Height, setActiveMarker, coordinates = [] }) => {
  const defaultCenter = {
    lat: 18.953870130541112,
    lng: 72.95062312220173,
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

  const [terminalCoordinates] = useState(defaultCenter);

  useEffect(() => {}, [isLoaded]);

  return (
    <Grid container rowGap={2} xs={12} sx={{ borderRadius: "16px" }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={terminalCoordinates}
          zoom={15}
          onUnmount={() => setActiveMarker(null)}
        >
          <Marker position={terminalCoordinates} />

          {coordinates &&
            coordinates.length > 0 &&
            coordinates.map((truck) => (
              <Marker
                key={truck._id}
                position={{ lat: truck.lon, lng: truck.lat }}
                icon={{
                  url: truck.icon,
                  scaledSize: new window.google.maps.Size(180, 100),
                }}
              />
            ))}

          {coordinates &&
            coordinates.length > 0 &&
            coordinates.map((truck) => (
              <Polyline
                key={truck._id}
                path={[terminalCoordinates, { lat: truck.lon, lng: truck.lat }]}
                options={{
                  strokeColor: "#000",
                  strokeOpacity: 1,
                  strokeWeight: 4,
                }}
              />
            ))}
        </GoogleMap>
      )}
    </Grid>
  );
};

export default Page;
