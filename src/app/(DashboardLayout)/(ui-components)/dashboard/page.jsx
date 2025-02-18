"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Avatar, useTheme, Skeleton } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import AutoBox from "@/app/(components)/mui-components/Autocomplete/autocomplete";
import Map from "@/app/(components)/map/index";
import MapDetails from "@/app/(components)/map/mapDetails";
import axiosInstance from "@/app/api/axiosInstanceImg";
import Analysis from "./analysis";
import Balance from "./balance";
import Balance2 from "./balance2";
import Team from "./team/page";
import Table from "./table";

const iconUrls = ["./SANY.svg", "./BYD.svg", "./foton.svg", "./truck4.svg"];
const iconMapping = {
  sany: "./SANY.svg",
  byd: "./BYD.svg",
  photon: "./foton.svg",
};
const coordinate = [];

const MainGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#000",
  borderRadius: "16px",
  padding: theme.spacing(1),
  height: "100px",
}));

function ShorterGrid() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [icons, setIcons] = useState(null);
  const [truckDetails, setTruckDetails] = useState(null);
  const theme = useTheme();

  const [state, setState] = useState({
    data: null,
    activeMarker: null,
    icons: null,
    brandName: "",
    brandId: null,
    fleetNumber: "",
    fleetId: null,
    region: "",
    coordinate: null,
  });

  const [mileage, setMileage] = useState(0);
  const [consumption, setConsumption] = useState(0);

  const handleBrandChange = (selectedBrand) => {
    if (selectedBrand) {
      setState((prev) => ({
        ...prev,
        brandName: selectedBrand?.title,
        brandId: selectedBrand?._id,
      }));
    } else {
      handleClearBrand();
    }
  };

  const handleFleetChange = (selectedFleet) => {
    if (selectedFleet) {
      setState((prev) => ({
        ...prev,
        fleetNumber: selectedFleet?.title,
        fleetId: selectedFleet?._id,
        coordinate: selectedFleet?.coordinate || [],
      }));
    } else {
      handleClearFleet();
    }
  };
  const handleRegionChange = (selectedRegion) => {
    if (selectedRegion) {
      setState((prev) => ({
        ...prev,
        region: selectedRegion?.title,
      }));
    } else {
      handleClearRegion();
    }
  };

  const handleClearFleet = () => {
    setState((prev) => ({
      ...prev,
      fleetNumber: "",
      fleetId: null,
      coordinate: null,
    }));
  };

  const handleClearRegion = () => {
    setState((prev) => ({
      ...prev,
      region: "",
    }));
  };

  const handleClearBrand = () => {
    setState((prev) => ({
      ...prev,
      brandName: "",
      brandId: null,
    }));
  };

  const fetchData = async () => {
    try {
      const regionsResponse = await axiosInstance.get("dashboard/regions");

      const customersResponse = await axiosInstance.get(
        `dashboard/customers?region=${state?.region ?? ""}`
      );

      const fleetsResponse = await axiosInstance.get(
        `fleet/fetchFleets?region=${state?.region ?? ""}&customerId=${
          state?.brandId ?? ""
        }`
      );
      const regions = regionsResponse?.data?.regions;
      const customers = customersResponse?.data?.customers;
      const fleets = fleetsResponse?.data?.data?.result;

      const fetchedData = [
        {
          label: "Region",
          value: state?.region ? "" : regions?.length,
          icon: "/Img/map.svg",
          data1: regions?.map((region) => ({ title: region })),
        },
        {
          label: "Customer",
          value: state?.brandName ? "" : customers?.length,
          icon: "/Img/id-card-solid.svg",
          data1: customers?.map((customer) => ({
            title: customer?.brandName,
            _id: customer?._id,
          })),
        },
        {
          label: "Tractor",
          value: state?.fleetNumber ? "" : fleets?.length,
          icon: "/Img/truck-moving-solid.svg",
          data1: fleets?.map((fleet) => {
            const coordinates = fleet?.location?.coordinates || [];

            return {
              title: fleet?.fleetNumber,
              _id: fleet?._id,
              coordinate: coordinates?.length
                ? [
                    {
                      lat: coordinates[0],
                      log: coordinates[1],
                      icon: iconMapping[fleet?.type],
                      _id: fleet?._id,
                      batteryPercentage: fleet?.batteryPercentage,
                      distanceTravelled: fleet?.distanceTravelled,
                      lastConnectedHeartBeat: fleet?.lastConnectedHeartBeat,
                      averageSpeed: fleet?.averageSpeed,
                      type: fleet?.type,
                      fleetNumber: fleet?.fleetNumber,
                      effectiveRange: fleet?.effectiveRange,
                      nearestCharger: fleet?.nearestCharger,
                    },
                  ]
                : [],
            };
          }),
        },

        {
          label: "Total Consumption",
          value: consumption || 0,
          icon: "/Img/road-solid.svg",
        },
        {
          label: "Total mileage accumulated",
          value: mileage || 0,
          icon: "/Img/route-solid.svg",
        },
      ];
      setState((prev) => ({ ...prev, data: fetchedData }));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const fetchMileageData = async () => {
    try {
      const mileageResponse = await axiosInstance.get(
        `dashboard/mileage?brandName=${state?.brandName}&fleetNumber=${state?.fleetNumber}&region=${state?.region}`
      );
      const totalDistance = mileageResponse?.data?.totalDistance || 0;
      setMileage(mileageResponse?.data?.totalDistance);
      setState((prev) => {
        if (Array.isArray(prev.data) && prev?.data?.length > 4) {
          return {
            ...prev,
            data: prev.data.map((item, index) =>
              index === 4
                ? {
                    label: "Total mileage accumulated",
                    value: totalDistance,
                    icon: "/Img/route-solid.svg",
                  }
                : item
            ),
          };
        }
        return prev;
      });
    } catch (error) {
      console.error("Error fetching mileage data: ", error);
    }
  };
  const fetchConsumptionData = async () => {
    try {
      const consumptionResponse = await axiosInstance.get(
        `dashboard/consumption?brandName=${state?.brandName}&fleetNumber=${state?.fleetNumber}&region=${state?.region}`
      );
      const consumptionRate = consumptionResponse?.data?.totalConsumption;
      setConsumption(consumptionResponse?.data?.totalConsumption);

      setState((prev) => {
        if (Array.isArray(prev?.data) && prev?.data?.length > 3) {
          return {
            ...prev,
            data: prev?.data?.map((item, index) =>
              index === 3
                ? {
                    label: "Total Consumption",
                    value: consumptionRate,
                    icon: "/Img/road-solid.svg",
                  }
                : item
            ),
          };
        }
        return prev;
      });
    } catch (error) {
      console.error("Error fetching consumption data: ", error);
    }
  };

  useEffect(() => {
    fetchData();

    fetchMileageData();
    fetchConsumptionData();
  }, [
    state?.brandName,
    state?.fleetNumber,
    state?.region,
    mileage,
    consumption,
  ]);

  const handleMapData = (index, point) => {
    setActiveMarker(index + 1);
    setIcons(point?.icon);
    setTruckDetails(point);
  };
  const onClose = () => {
    setActiveMarker(null);
  };
  return (
    <>
      <Grid container spacing={2}>
        {state?.data?.length > 0
          ? state.data.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={2.4}>
                <MainGrid>
                  <Grid container>
                    {index < 3 ? (
                      <>
                        <AutoBox
                          icon={item.icon}
                          place={item.label}
                          data={item.data1}
                          onChange={
                            item.label === "Region"
                              ? handleRegionChange
                              : item.label === "Customer"
                              ? handleBrandChange
                              : item.label === "Tractor"
                              ? handleFleetChange
                              : null
                          }
                          clearIcon={
                            item.label === "Region"
                              ? handleClearRegion
                              : item.label === "Customer"
                              ? handleClearBrand
                              : item.label === "Tractor"
                              ? handleClearFleet
                              : null
                          }
                        />
                        <Typography
                          variant="h3"
                          sx={{ pl: 8, fontWeight: "bold" }}
                        >
                          {item?.value}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Grid
                          container
                          alignItems="center"
                          sx={{ pt: 1.2, pl: 1 }}
                        >
                          <Grid item xs={2}>
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                backgroundColor: theme.palette.primary.main,
                              }}
                            >
                              {item.icon ? (
                                <Image
                                  width={30}
                                  height={30}
                                  src={item.icon}
                                  alt={item.label}
                                />
                              ) : (
                                <Skeleton
                                  variant="circular"
                                  width={30}
                                  height={30}
                                />
                              )}
                            </Avatar>
                          </Grid>
                          <Grid item xs={10}>
                            <Typography variant="h6" sx={{ pl: 2 }}>
                              {item?.label || <Skeleton width={80} />}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography
                          variant="h4"
                          sx={{
                            pl: { xs: 7, sm: 7, md: 7, lg: 7 },
                            mt: { sm: 1, md: 2, lg: 1 },
                          }}
                        >
                          {item?.value !== undefined ? (
                            item?.value?.toFixed(2)
                          ) : (
                            <Skeleton width={50} />
                          )}
                        </Typography>
                      </>
                    )}
                  </Grid>
                </MainGrid>
              </Grid>
            ))
          : // Render Skeletons when data is loading or unavailable
            Array.from(new Array(5)).map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={2.4}>
                <MainGrid>
                  <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid item xs={3}>
                      <Skeleton
                        variant="circular"
                        width="40px"
                        height={"40px"}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={30}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Skeleton width={60} height={30} sx={{ mt: 1, ml: 8 }} />
                    </Grid>
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
              coordinate={coordinate}
              onClose={onClose}
              center={state}
            />
          </Grid>
        ) : (
          <Grid item xs={12} height={"380px"}>
            <Map
              handleMapData={handleMapData}
              iconUrls={iconUrls}
              activeMarker={activeMarker}
              setActiveMarker={setActiveMarker}
              coordinate={coordinate}
              onClose={onClose}
              center={state}
            />
          </Grid>
        )}

        {activeMarker && activeMarker >= 0 && (
          <Grid item xl={3} xs={12} md={4} height={"380px"}>
            <MapDetails
              icons={icons}
              onClose={onClose}
              truckDetails={truckDetails}
            />
          </Grid>
        )}
      </Grid>
      <Analysis state={state} />
      <Grid container mt={1} spacing={2}>
        <Balance state={state} />
        <Balance2 state={state} />
        <Team state={state} />
      </Grid>
      <Table state={state} />
    </>
  );
}

export default ShorterGrid;
