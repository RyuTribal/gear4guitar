import React from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import useWindowSize from "../../../redundant_functions/WindowSize";

export default function RenderCart(props) {
  const size = useWindowSize();
  if (props.cart.length === 0) {
    return (
      <Box>
        <Typography variant="h6">Your cart is empty</Typography>
      </Box>
    );
  }
  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {size.width <= 851 && (
        <Box>
          <Typography variant="h5">My cart</Typography>
          <Divider sx={{ backgroundColor: "text.primary" }} />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            maxHeight: size.width > 851 ? "920px" : "none",
            minHeight: size.width > 851 ? "920px" : "none",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {props.cart.map((item) => (
            <Grid key={item.id} container alignItems="start" spacing={1}>
              <Grid
                item
                xs={4}
                component="img"
                src={item.images[0]}
                alt="product-img"
              />
              <Grid
                sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                item
                xs={6}
              >
                <Typography
                  sx={{ color: "text.primary", fontWeight: "bold" }}
                  variant="subtitle"
                >
                  {item.title}
                </Typography>
                <Typography variant="subtitle">
                  Q-ty: {item.quantity ? item.quantity : 1}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ color: "text.primary", fontWeight: "bold" }}
                  variant="h7"
                >
                  {item.price} SEK
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography
            sx={{ color: "text.primary", fontWeight: "bold" }}
            variant="h6"
          >
            Total:
          </Typography>
          <Typography
            sx={{ color: "text.primary", fontWeight: "bold" }}
            variant="h6"
          >
            {props.total} SEK
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
