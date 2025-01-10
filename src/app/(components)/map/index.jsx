"use client";
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";

const Page = ({
  Height,
  coordinate,
  setActiveMarker,
  handleMapData,
  center,
}) => {
  const defaultCenter = {
    lat: 18.9518307,
    lng: 72.9509779,
  };
  const defaultCenter1 = {
    lat: 28.51079782059423,
    lng: 77.40362813493975,
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
  const [center1, setCenter1] = useState(defaultCenter);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (center?.region) {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${center?.region}&key=AIzaSyBrsCdS1KEJ9QDOgnl5gwnemCuLJDKzp9Y`
          );
          console.log("resposne", response);

          if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location;
            console.log("loca", lat, lng);
            setCenter1({ lat, lng });
          } else {
            console.error("No results found for the specified location.");
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

  const getAllCoordinates = () => {
    const fleetData = center?.data?.find((item) => item?.label === "Fleet");

    const fleetCoordinates =
      fleetData?.data1?.flatMap((fleet) => fleet?.coordinate) || [];

    return [...fleetCoordinates, ...coordinate];
  };
  const [fleetSelection, setFleetSelection] = useState([]);

  useEffect(() => {
    const allCoordinates = getAllCoordinates();
    setFleetSelection(allCoordinates);
  }, [center, coordinate]);

  const coordinateSet = center?.coordinate ?? fleetSelection;
  return (
    <Grid container rowGap={2} xs={12} sx={{ borderRadius: "16px" }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center1 ? center1 : defaultCenter1 || defaultCenter}
          zoom={11}
          onUnmount={() => {
            setActiveMarker(null);
          }}
        >
          <div>
            {(coordinate || coordinateSet) &&
              (coordinateSet || coordinate)?.map((point, index) => (
                <Marker
                  key={index}
                  position={{
                    lat: point?.lat,
                    lng: point?.log,
                  }}
                  onClick={() => handleMapData(index, point?.icon)}
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
