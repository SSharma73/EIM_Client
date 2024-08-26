import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(24, 36, 111, 1)",
      light: "rgba(52, 125, 0, 0.25)",
    },
    secondary: {
      main: "#C0FE72",
    },
    success: {
      main: "#347D00",
      light: "#CCDEBF",
    },
    info: {
      main: "#697077",
    },
    error: {
      main: "#FF0000",
    },
    warning: {
      main: "#ffb22b",
    },
  },
});

export default theme;
