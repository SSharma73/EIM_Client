"use client";
import { createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";
import theme from "../theme";

export const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const baselightTheme = createTheme({
  direction: "ltr",
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
    grey: {
      100: "#FFFFFF",
      200: "#EAEFF4",
      300: "#DFE5EF",
      400: "#7C8FAC",
      500: "#5A6A85",
      600: "#2a3547",
    },
    text: {
      primary: "#000000",
      secondary: "#2a3547",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#DFE5EF",
    },
    divider: "#e5eaef",
    background: {
      default: "#F7F8F9",
      paper: "#fff",
    },
  },

  typography: {
    fontFamily: poppins.style.fontFamily,
    h1: {
      fontWeight: 500,
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
    },
    h2: {
      fontWeight: 500,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.3125rem",
      lineHeight: "1.6rem",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.125rem",
      lineHeight: "1.6rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
    button: {
      textTransform: "capitalize",
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334rem",
    },
    body2: {
      fontSize: "0.75rem",
      letterSpacing: "0rem",
      fontWeight: 400,
      lineHeight: "1rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow:
            "rgba(145 158 171 / 30%) 0px 0px 2px 0px, rgba(145 158 171 / 12%) 0px 12px 24px -4px !important",
        },
        a: {
          textDecoration: "none",
        },
        ".MuiTimelineConnector-root": {
          width: "1px !important",
          backgroundColor: "rgba(0, 0, 0, 0.12) !important",
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: "8px",
        },
        outlined: {
          borderColor: "#38E0CF",
          color: "#4A515C",
          "&:hover": {
            borderColor: "#4A515C",
            backgroundColor: "rgba(72, 81, 92, 0.1)",
            color: "#4A515C",
          },
        },
      },
    },

    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTabs-indicator": {
            backgroundColor: theme.palette.secondary.main,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "& .MuiButtonBase-root": {
            borderRadius: "0px",
          },
          "&.Mui-selected": {
            fontWeight: 400,
            fontSize: "16px",
            color: "#000",
            borderRadius: "0px",
            backgroundColor: theme.palette.primary.main,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFF",
          borderRadius: "16px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.main,
          marginBottom: "12px",
          padding: "12px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          zIndex: 1300,
        },
        option: {
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
        },
        title: {
          fontSize: "1.125rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
          // color: "#fff",
          backgroundColor: "#fff",
          padding: "0",
          boxShadow: "0px 7px 30px 0px rgba(90, 114, 123, 0.11)",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {},
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            // color: theme.palette.secondary.main,
          },
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            // color: theme.palette.secondary.main,
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.primary.main,
            // color: theme.palette.secondary.main,
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "10px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid #e5eaef`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-child td": {
            borderBottom: 0,
          },
          color: "#fff",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[200],
          borderRadius: "6px",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#fff",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-error fieldset": {
            borderColor: theme.palette.error.main,
          },
          "&:hover fieldset": {
            borderColor: theme.palette.text.primary,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.grey[400],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.grey[300],
            borderColor: theme.palette.primary.main,
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: theme.palette.error,
            },
            "&.MuiInputLabel-shrink": {},
          },
        },
        input: {
          padding: "12px 14px",

          "&::placeholder": {
            opacity: 0.5,
          },
        },
        inputSizeSmall: {
          padding: "8px 14px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: theme.palette.primary.main,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary,
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        filledSuccess: {
          color: "white",
        },
        filledInfo: {
          color: "white",
        },
        filledError: {
          color: "white",
        },
        filledWarning: {
          color: "white",
        },
        standardSuccess: {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.main,
        },
        standardError: {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.main,
        },
        standardWarning: {
          backgroundColor: theme.palette.warning.light,
          color: theme.palette.warning.main,
        },
        standardInfo: {
          backgroundColor: theme.palette.info.light,
          color: theme.palette.info.main,
        },
        outlinedSuccess: {
          borderColor: theme.palette.success.main,
          color: theme.palette.success.main,
        },
        outlinedWarning: {
          borderColor: theme.palette.warning.main,
          color: theme.palette.warning.main,
        },
        outlinedError: {
          borderColor: theme.palette.error.main,
          color: theme.palette.error.main,
        },
        outlinedInfo: {
          borderColor: theme.palette.info.main,
          color: theme.palette.info.main,
        },
      },
    },
  },
});

export { baselightTheme };
