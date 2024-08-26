"use client";
import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import PageContainer from "@/app/(components)/container/PageContainer";
import AuthLogin from "@/app/(components)/authentication/AuthLogin";

const Login = () => {
  return (
    <>
      <PageContainer title={"Login"} description={"this is login page"}>
        <Grid
          container
          alignItems={"center"}
          sx={{
            height: "100vh",
            backgroundImage: "url('/loginImagepng1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed", 
            backgroundRepeat: "no-repeat",
            position: "relative",
            width: "100%",
          }}
        >
          <Grid
            item
            sx={{
              backgroundColor: "rgba(11, 62, 133, 0.6)",
              display: "flex",
              borderRadius: "16px",
              justifyContent: "center",
              alignItems: "center",
              padding: { xs: 3, md: 4 },
              marginLeft: { md: 10, xs: 3, sm: 3 },
            }}
          >
            <Stack rowGap={2}>
              <Stack rowGap={1}>
                <Typography
                  variant="h2"
                  color="secondary"
                  sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
                >
                  Log In
                </Typography>
                <Typography variant="body1">
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
      </PageContainer>
    </>
  );
};

export default Login;
