import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
} from "@mui/material";
import Image from "next/image";
import Tick from "../../../../../public/Img/tick.svg";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import FolderIcon from "@mui/icons-material/Folder";

const cardData = [
  {
    title: "Fusion A",
    description:
      "The basic plan offers essential features. With the basic plan, users can access standard navigation.",
    features: [
      "Fix Price $99,000 for 4800 kWh",
      "Above 4800 kWh, Pay As You Charge@ $ 15/kWh",
      "Monthly",
    ],
  },
  {
    title: "Fusion B",
    description:
      "The standard plan includes all basic features and additional functionalities for better management.",
    features: [
      "Fix Price $99,000 for 5200 kWh",
      "Above 5200 kWh, Pay As You Charge@ $ 25/kWh",
      "Monthly",
    ],
    chip: "Bestseller",
  },
  {
    title: "Fusion C",
    description:
      "The premium plan provides comprehensive features and top-tier support for enterprise needs.",
    features: [
      "Fix Price $99,000 for 5800 kWh",
      "Above 5800 kWh, Pay As You Charge@ $ 35/kWh",
      "Yearly",
    ],
  },
];
const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "EIM-Subscription", link: "/eimSubscriptions" },
];
function MyCards() {
  return (
    <Grid container rowGap={2}>
      <ManagementGrid
        moduleName={"EIM Subscriptions"}
        breadcrumbItems={breadcrumbItems}
      />
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#6099EB",
                borderRadius: "12px",
                mb: 2,
                p: 2,
              }}
            >
              <CardContent>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h3">{card.title}</Typography>
                  {card?.chip && (
                    <Chip
                      sx={{
                        minWidth: 100,
                        color: "#C0FE72",
                      }}
                      color="primary"
                      label={card?.chip}
                    />
                  )}
                </Grid>
                <Grid container spacing={1} mt={2}>
                  <Grid item xs={12}>
                    <Typography>{card.description}</Typography>
                  </Grid>
                  <Grid container spacing={1} mt={2}>
                    {card.features.map((feature, featureIndex) => (
                      <Grid item xs={12} key={featureIndex}>
                        <Grid item xs={12} md={6} >
                          <List >
                            <ListItem sx={{width:"200%",}}>
                              <ListItemAvatar>
                                <Avatar sx={{width:30,height:30,backgroundColor:"#171963"}}>
                                  <Image src={Tick} alt="tick"/>
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText 
                                primary={feature}
                                // secondary={feature}
                              />
                            </ListItem>
                          </List>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default MyCards;
