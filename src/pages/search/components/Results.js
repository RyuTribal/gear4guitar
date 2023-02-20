import React from "react";
import { Grid } from "@mui/material";
import CardDisplay from "../../../components/CardDisplay";

export default function Results(props) {
  return (
    <Grid alignItems="stretch" container item xs={12} spacing={3}>
      {props.products
        ? props.products.map((product, index) => (
            <Grid
              sx={{ display: "flex" }}
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <CardDisplay product={product} index={index} />
            </Grid>
          ))
        : [...Array(10)].map((_, index) => (
            <Grid
              sx={{ display: "flex" }}
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <CardDisplay product={null} index={index} />
            </Grid>
          ))}
    </Grid>
  );
}
