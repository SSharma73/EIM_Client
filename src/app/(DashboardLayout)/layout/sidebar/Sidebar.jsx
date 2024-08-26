import React from "react";
import { useMediaQuery, Box, Drawer } from "@mui/material";
import SidebarItems from "./SidebarItems";

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const [sidebarVariant, setSidebarVariant] = React.useState("permanent");
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const sidebarWidth = "270px";
  React.useEffect(() => {
    setSidebarVariant(lgUp ? "permanent" : "temporary");
  }, [lgUp]);
  return (
    <Box sx={{ width: sidebarWidth, flexShrink: 0, zIndex: 100 }}>
      <Drawer
        anchor="left"
        open={lgUp ? isSidebarOpen : isMobileSidebarOpen}
        onClose={!lgUp ? onSidebarClose : undefined}
        variant={sidebarVariant}
        PaperProps={{
          sx: {
            width: sidebarWidth,
            boxSizing: "border-box",
            border: "0",
            mt: lgUp ? "89px" : "0px",
            borderRadius: "0 10px 10px 0",
          },
        }}
      >
        <Box
          sx={{
            height: "100vh",
            overflowY: lgUp ? "auto" : mdUp ? "auto" : "auto",
            backgroundColor: "#6099EB",
            padding: "14px",
          }}
        >
          <Box mt={1}>
            <SidebarItems />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
