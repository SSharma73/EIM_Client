"use client";
import { styled, Box, useMediaQuery, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import PageContainer from "@/app/(components)/container/PageContainer";
const MainWrapper = styled("div")(() => ({
  background: "linear-gradient(112.37deg, #589CFF 0%, #013376 116.12%)",
  minHeight: "100vh",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "104px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export default function RootLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  return (
    <MainWrapper>
      <PageContainer title="Fleet" description="">
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <PageWrapper sx={{ ml: { lg: `270px` } }}>
          <div>
            <Grid container mt={1}>
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                isMobileSidebarOpen={isMobileSidebarOpen}
                onSidebarClose={() => setMobileSidebarOpen(false)}
              />
              <Container key="content" maxWidth={"xl"}>
                {children}
              </Container>
            </Grid>
          </div>
        </PageWrapper>
      </PageContainer>
    </MainWrapper>
  );
}
