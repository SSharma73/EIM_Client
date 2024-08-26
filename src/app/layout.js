"use client";
import "./globals.css";
import "./customCss.scss";
import { ThemeProvider } from "@mui/material/styles";
import { baselightTheme } from "../utils/theme/DefaultColors";
import CssBaseline from "@mui/material/CssBaseline";
export default function RootLayout({ children }) {
  const theme = baselightTheme;
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
