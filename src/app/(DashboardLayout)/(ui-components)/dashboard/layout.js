import { Grid, Stack } from "@mui/material";
export default function RootLayout({ children, balance, balance2,team, analysis ,table}) {
  return (
    <>
      <Stack rowGap={2}>
        <Grid container>
          {children}
        </Grid>
        <Grid container >
          {analysis}
        </Grid>
          <Grid container  spacing={2}>
            {balance}
            {balance2}
            {team}
          </Grid>
        <Grid container >
         {table}
        </Grid>
      </Stack>
    </>
  );
}