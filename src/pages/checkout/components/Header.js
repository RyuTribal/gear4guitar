import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import useWindowSize from "../../../redundant_functions/WindowSize";
export default function Header(props) {
  const size = useWindowSize();
  if (size.width > 851) {
    return (
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "20px 0px",
          }}
        >
          <Typography sx={{ width: "50%" }} variant="h5">
            Placing Order
          </Typography>
          <Typography variant="h5" sx={{ width: "50%" }}>
            My cart
          </Typography>
        </Box>
        <Divider />
      </Grid>
    );
  } else {
    return null;
  }
}
