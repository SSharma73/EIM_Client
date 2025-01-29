import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#38E0CF",
      light: "#fff",
    },
    secondary: {
      main: "#4A515C",
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
