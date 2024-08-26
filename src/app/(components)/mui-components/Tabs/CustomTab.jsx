// CommonTabs.tsx
import React from "react";
import { Tabs, Tab, Grid, Box, useMediaQuery } from "@mui/material";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ width: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomTab = ({
  value,
  tabs,
  handleChange,
  TabPanelList,
  authRole,
  tabPanelStyle
}) => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const isSm = useMediaQuery((theme) => theme.breakpoints.only("sm"));
  return (
    <>
      <Box
        sx={{
          borderRadius: "8px",
          width: "auto",
          borderRadius: "8px",
          zIndex: 1111,
        }}

      >
        <Tabs
          value={value}
          onChange={handleChange}
        >
          {tabs.map((tab, index) => (
            <Tab
              sx={{   border: "1px solid #fff", borderTopLeftRadius: index === 0 ? "8px" : "0px", borderBottomLeftRadius: index === 0 ? "8px" : "0px" }}
              key={index}
              label={tab.label}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ marginTop: "30px", ...tabPanelStyle, }} > {/* Add a gap of 20px between Tabs and TabPanel */}
        {TabPanelList.map((panel, index) => (
          <TabPanel key={index} value={value} index={index}>
            {panel.component}
          </TabPanel>
        ))}
      </Box>
    </>
  );
};

export default CustomTab;
