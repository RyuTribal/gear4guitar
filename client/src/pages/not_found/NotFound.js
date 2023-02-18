import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import not_found from "./images/404.png";
import useWindowSize from "../../redundant_functions/WindowSize";

export default function NotFound(props) {
  const size = useWindowSize();
  return (
    <Grid
      sx={{
        minHeight: "100vh",
        minWidth: "100%",
        padding: "50px 10px",
        backgroundColor: "#FEFEFB",
        backgroundSize: "cover",
      }}
      container
    >
      {size.width > 851 && (
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          item
          xs={12}
          md={6}
        >
          <Box component="img" src={not_found} sx={{ width: "100%" }} />
        </Grid>
      )}
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
        item
        xs={12}
        md={6}
      >
        <Typography textAlign="center" color="error" variant="h1">
          404
        </Typography>
        <Typography color="background.paper" textAlign="center" variant="h2">
          Page not found
        </Typography>
        <Button variant="contained" component={Link} to="/">
          Go back to home
        </Button>
      </Grid>
    </Grid>
  );
}
