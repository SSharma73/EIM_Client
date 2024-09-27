"use client";
import React, { useEffect } from "react";
import { Grid, Typography, AppBar, styled } from "@mui/material";
import Breadcrumbs from "@/app/(components)/mui-components/Breadcrumbs/index";
import { Tabs, Tab, Button } from "@mui/material";
import { IoMdAddCircleOutline } from "react-icons/io";
import CustomDropdown from "./DropdownButton";
import { CustomDropdownEvent } from "./DropdownButton/dropDownEvent";
import ButtonGroup from "@mui/material/ButtonGroup";
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

const ChildBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  transition: "none",
  backgroundColor: "#6099EB",
  borderRadius: "8px",
}));
const getBorderRadius = (index, tabLength) => {
  let borderRadius = {};
  if (index === 0) {
    borderRadius = {
      borderTopLeftRadius: "8px",
      borderBottomLeftRadius: "8px",
    };
  } else if (index === tabLength - 1) {
    borderRadius = {
      borderTopRightRadius: "8px",
      borderBottomRightRadius: "8px",
    };
  }
  return borderRadius;
};
const HeaderGrid = ({
  type,
  moduleName,
  breadcrumbItems,
  CustomButtonGroup,
  value,
  handleChange,
  tabs,
  TabPanelList,
  handleTableData,
  button,
  handleClickOpen,
  tabCenter,
  dropDown,
  buttonItem,
  select,
  dropDownEvent,
  selectedItems,
  customerItems,
  setCustomerItems,
  handleDropdownSelect,
  buttonType,
  setButtonType,
}) => {
  const tabLength = tabs ? tabs.length : 0;
  const buttonLength = CustomButtonGroup ? CustomButtonGroup.length : 0;

  const [visibleStart, setVisibleStart] = React.useState(0);
  const visibleButtons =
    CustomButtonGroup?.slice(visibleStart, visibleStart + 6) || [];
  useEffect(() => {
    if (select) {
      setButtonType(select);
    }
  }, [select]);
  const handleNext = () => {
    if (visibleStart + 6 < CustomButtonGroup.length) {
      setVisibleStart(visibleStart + 1);
    }
  };

  const handlePrevious = () => {
    if (visibleStart > 0) {
      setVisibleStart(visibleStart - 1);
    }
  };
  const handleClick = (item) => {
    setButtonType(item);
    handleTableData({ role: item });
  };
  return (
    <>
      {breadcrumbItems && <Breadcrumbs breadcrumbItems={breadcrumbItems} />}
      {moduleName || buttonItem || tabs || dropDownEvent ? (
        <ChildBarStyled position="static">
          <Grid
            container
            sx={{ padding: "12px" }}
            justifyContent={"space-between"}
          >
            <Grid item>
              {moduleName && (
                <Typography component={"h2"} variant="h3" color="info">
                  {moduleName}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Grid container>
                {buttonItem && (
                  <Button variant="contained" size="large">
                    {buttonItem}
                  </Button>
                )}
                {!tabs
                  ? button && (
                      <Button
                        onClick={handleClickOpen}
                        endIcon={<IoMdAddCircleOutline color="#C0FE72" />}
                        variant="contained"
                        size="large"
                        type={type}
                      >
                        {button}
                      </Button>
                    )
                  : ""}
                {customerItems && (
                  <CustomDropdown
                    variant="contained"
                    size="large"
                    sx={{ ml: 2 }}
                    customers={dropDown}
                    customerItems={customerItems}
                    setCustomerItems={setCustomerItems}
                  />
                )}
                {dropDownEvent &&
                  dropDownEvent?.map((button, index) => (
                    <CustomDropdownEvent
                      key={index}
                      buttonname={selectedItems[button?.label] || button?.label}
                      menuitems={button?.menuItems}
                      onItemSelect={(item) =>
                        handleDropdownSelect(button?.label, item)
                      }
                      variant="contained"
                      sx={{ ml: 2 }}
                    />
                  ))}{" "}
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            {tabs && (
              <Grid
                container
                sx={{
                  p: "0px 12px 12px 12px",
                  justifyContent: tabCenter ?? "space-between",
                  alignItems: "center",
                }}
              >
                <Tabs
                  value={value}
                  variant="scrollable"
                  onChange={handleChange}
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {tabs.map((tab, index) => (
                    <Tab
                      key={index}
                      label={tab?.label}
                      {...a11yProps(index)}
                      sx={{
                        border: "1px solid #fff",
                        ...getBorderRadius(index, tabLength),
                        "&.Mui-selected": {
                          border: "1px solid #fff",
                          ...getBorderRadius(index, tabLength),
                        },
                      }}
                    />
                  ))}
                </Tabs>
                {button && (
                  <Button
                    onClick={handleClickOpen}
                    endIcon={<IoMdAddCircleOutline color="#C0FE72" />}
                    variant="contained"
                    size="large"
                    type={type}
                  >
                    {button}
                  </Button>
                )}
              </Grid>
            )}
            {CustomButtonGroup && (
              <Grid
                container
                sx={{
                  p: "0px 12px 12px 12px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid
                  item
                  display={"flex"}
                  alignItems="center"
                  sx={{ border: "1px solid #fff", borderRadius: "10px" }}
                >
                  {visibleButtons?.map((item, index) => {
                    const isLastVisibleButton =
                      index === visibleButtons.length - 1;
                    return (
                      <Grid
                        item
                        key={index}
                        sx={{
                          borderRadius: "0px",
                          borderRight: !isLastVisibleButton
                            ? "1px solid #fff"
                            : "",
                        }}
                      >
                        <ButtonGroup
                          aria-label="Basic button group"
                          variant="text"
                        >
                          <Button
                            variant={
                              buttonType == item?.name ? "contained" : ""
                            }
                            sx={{
                              borderRadius:
                                buttonLength === 1
                                  ? "10px"
                                  : index === 0 && visibleStart === 0
                                  ? "10px 0 0 10px"
                                  : isLastVisibleButton &&
                                    visibleStart + index === buttonLength - 1
                                  ? "0 10px 10px 0"
                                  : "0",
                              borderRight: !isLastVisibleButton
                                ? "1px solid #fff"
                                : "",
                              color: "#fff",
                            }}
                            onClick={(e) => {
                              handleClick(item?.name);
                            }}
                          >
                            {item?.name}
                          </Button>
                        </ButtonGroup>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            )}
          </Grid>
        </ChildBarStyled>
      ) : (
        ""
      )}
      {TabPanelList && (
        <Grid container sx={{ mt: 2 }}>
          {TabPanelList.map((panel, index) => (
            <TabPanel key={index} value={value} index={index}>
              {panel.component}
            </TabPanel>
          ))}
        </Grid>
      )}
    </>
  );
};
export default HeaderGrid;
