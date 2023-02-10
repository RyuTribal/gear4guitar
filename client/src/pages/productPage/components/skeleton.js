import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box, Grid, Typography } from "@mui/material";


export default function SkeletonText() {
  return (
    <Grid container spacing={3} sx={{ padding: "0px 20px" }}>
      <Grid item container xs={12} md={7} spacing={1}>
        <Grid item xs={12}>
          <Typography sx={{ color: "text.third" }} variant="h4">
            <Skeleton height={800} />
          </Typography>
        </Grid>
        <Grid sx={{ height: "auto" }} item xs={12}>
          <Box
            sx={{
              maxWidth: "100%",
              objectFit: "cover",
            }}
          >
            <Skeleton height={100} />
          </Box>
        </Grid>
      </Grid>
      <Grid item container xs={12} sm={5} spacing={2}>
        <Grid container item xs={12}></Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} md={4}>
            <Typography sx={{ color: "text.third" }} variant="h5">
              <Skeleton height={100} />
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography sx={{ color: "text.primary" }} variant="body1">
              <Skeleton height={200} />
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={4}>
            <Typography sx={{ color: "text.third" }} variant="h5">
              <Skeleton height={100} />
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Skeleton height={200} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
