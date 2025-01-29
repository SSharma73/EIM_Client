"use client";
import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import PageContainer from "@/app/(components)/container/PageContainer";
import AuthLogin from "@/app/(components)/authentication/AuthLogin";
import Image from "next/image";
import Logo from "../../../../public/Img/loginLogo.svg";
import Truck from "../../../../public/Img/loginTruck.png";

const Login = () => {
  return (
    <>
      <PageContainer title={"Login"} description={"this is login page"}>
        <Grid
          container
          sx={{
            height: "100vh",
            position: "relative",
            width: "100%",
          }}
        >
          <Grid
            item
            xs={8}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#001B1E",
              height: "100%",
              display: "flex",
            }}
          >
            <Grid container justifyContent={"center"} xs={12}>
              <Stack rowGap={2}>
                <Stack rowGap={1}>
                  <Typography variant="h2" color={"#fff"}>
                    Log In
                  </Typography>
                  <Typography variant="body1" color={"#fff"}>
                    Please Log In to continue to your account
                  </Typography>
                </Stack>
                <AuthLogin
                  subtitle={
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                      mt={3}
                    />
                  }
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid
            xs={4}
            sx={{
              background:
                "linear-gradient(to bottom, lightgrey 20% , #38E0CF )",
            }}
          >
            <Grid container height={"100%"} display={"flex"} p={4}>
              <Image src={Logo} alt="image" />

              <Grid item mt={{ md: 20, xs: 10 }}>
                <Image src={Truck} alt="Truck image" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default Login;
