"use client"
import { Button, Grid, Typography, Box, Tab, Divider, Badge } from '@mui/material'
import React from 'react'
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styled from '@emotion/styled';

const Index = ({ tabs, buttons, reportTitles,Search }) => {
    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const Badge1 = styled(Badge)(({ color }) => ({
        marginRight: "16px",
        "& .MuiBadge-badge": {
            backgroundColor: color,
        }
    }));
    return (
        <Grid container xs={12} md={12} >
            <Grid container alignItems={"center"}  xs={12} md={6}>
                {reportTitles && (
                <Grid container xs>
                    <Typography variant='h4'>
                        {reportTitles.map(report => (
                            value === report.value && report.title
                        ))}
                    </Typography>
                </Grid>)}
                {tabs && reportTitles && (
                    <Grid item  sx={{justifyContent: reportTitles?? "space-between"}} >
                        <Box >
                            <TabContext value={value} >
                                <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ borderRadius: "8px" ,}}>
                                    {tabs.map(tab => (
                                        <Tab key={tab.value} label={tab.label} value={tab.value} sx={{ minHeight:0}} />
                                    ))}
                                </TabList>
                            </TabContext>
                        </Box>
                    </Grid>
                )}
                <Divider/>
                {tabs && !reportTitles &&(
                    <Grid item xs sx={{justifyContent: reportTitles?? "space-between"}} >
                    <Box sx={{ width: "100%", }} >
                        <TabContext value={value} sx={{ padding: 1 }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ borderRadius: "8px" }}>
                                {tabs.map(tab => (
                                    <Tab key={tab.value} label={tab.label} value={tab.value} iconPosition='start' icon={<Badge1 variant="dot" color={tab.color} />} sx={{ minHeight:0}} ></Tab>
                                ))}            
                            </TabList>
                        </TabContext>
                    </Box>
                </Grid>
                )}
               {Search &&( <Grid item xs={!Search? 12 : 'auto'} columnGap={1} >
                        <Search/>
                </Grid>)}
               {buttons &&( <Grid item xs={!buttons? 12 : 'auto'} columnGap={1} >
                    {buttons.map((button, index) => (
                        <Button key={index} variant='outlined' sx={{mr:1}} startIcon={index <2 && button.icon} endIcon={index === 2 ? button.icon : null} onClick={button?.handleFuction1}  >
                            {button.label}
                        </Button>
                       
                    ))}
                </Grid>)}
            </Grid>
            <Grid container  xs={12} md={12}  >
                <TabContext value={value} >
              {tabs && (
                    tabs.map(tab => (
                        <TabPanel key={tab.value} value={tab.value} sx={{ width: "100%", padding: 0,mt:2 }}>
                     {  tab.datacontent &&  <Typography variant='h4' m={2} pb={2}>{tab.datacontent}</Typography>}
                            {tab.content}
                        </TabPanel>
                    ))
                )}
                </TabContext>
            </Grid>
        </Grid>
    )
}
export default Index