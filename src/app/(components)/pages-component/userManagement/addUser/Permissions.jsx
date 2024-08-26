"use client";
import * as React from "react";
import { Grid, FormControlLabel, Checkbox, Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Permission({ modules, setModules, upLoadFile,setCustomizeModule ,customizeModule}) {
  const [expanded, setExpanded] = React.useState(false);
  const handleChangeModule = (event, id) => {
    const isChecked = (event?.target?.checked);
    setCustomizeModule((prevModules) =>
      prevModules.map((modules) => ({
        ...modules,
        subModules: modules.subModules.map((subModule) => {
          console.log("skjdghkajd",subModule,id)
          if (subModule?._id === id) {
            return { ...subModule, isChecked };
          }
          return subModule;
        }),
      }))
    );
  };
  React.useEffect(() => {
    setCustomizeModule(modules);
  }, [open]);
  

  const handleChange = (panel) => (event, isExpanded) => {
    console.log("panel", panel);
    setExpanded(isExpanded ? panel : false);
  };
  const CustomAccordion = ({ title, content, ariaControls, id, moduleId }) => (
    <Accordion
      expanded={expanded === moduleId}
      onChange={handleChange(moduleId)}
      sx={{
        background:"linear-gradient(111.41deg, rgba(139, 153, 173, 0.36) 0%, rgba(255, 255, 255, 0.12) 100%)",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
        aria-controls={ariaControls}
        id={id}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>
        {content?.map((item, index) => (
          <Grid key={index} container>
            <FormControlLabel
              control={
                <Checkbox
                  checked={item?.isChecked}
                  onChange={(e) => {
                    handleChangeModule(e, item?._id);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={item?.name}
              sx={{ marginRight: 2 }}
            />
          </Grid>
        ))}
      </AccordionDetails>
    </Accordion>
  );

  return (
    <React.Fragment>
      <Grid container mb={2}>
        <Grid container spacing={2}>
          {customizeModule?.map((item, index) => (
            <Grid item xs={6} key={index}>
              <CustomAccordion
                moduleId={index}
                title={item?.name}
                content={item?.subModules}
                id={`panel${index}-header`}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
