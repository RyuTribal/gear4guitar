import React from "react";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
  CardActions,
  Skeleton,
  Badge,
} from "@mui/material";

const STATUS_MAP = {
  pending: {
    color: "warning.main",
  },
  shipped: {
    color: "info.main",
  },
  delivered: {
    color: "success.main",
  },
  cancelled: {
    color: "error.main",
  },
};

export default function CardDisplay(props) {
  const { product, index, order_ref, order_status, quantity, date } = props;
  return (
    <Box sx={{ display: "flex" }} id={`product-${index}`}>
      <Card
        sx={{
          border: "1px solid #262725",
          "&:hover": {
            border: product ? "1px solid #ffb800" : "none",
          },
        }}
      >
        <CardActionArea
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          component={Link}
          disabled={!product}
          to={product ? `/productPage/${product.id}` : "/"}
        >
          {quantity && quantity > 0 && (
            <Badge
              badgeContent={quantity}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  fontWeight: "bold",
                },
                position: "absolute",
                top: "3%",
                right: "5%",
              }}
            />
          )}
          {order_status && (
            <Badge
              badgeContent={
                <Typography
                  variant="subtitle"
                  sx={{
                    textTransform: "uppercase",
                    color:
                      order_status in STATUS_MAP
                        ? STATUS_MAP[order_status].color
                        : "warning.primary",
                  }}
                >
                  {order_status}
                </Typography>
              }
              color="secondary"
              sx={{
                "& .MuiBadge-badge": {
                  fontWeight: "bold",
                  textTransform: "uppercase",
                },
                position: "absolute",
                top: "3%",
                right: "87%",
              }}
            />
          )}
          {product ? (
            <CardMedia
              component="img"
              image={product.images[0]}
              alt={product.title}
              sx={{ objectFit: "contain" }}
            />
          ) : (
            <Skeleton
              sx={{ objectFit: "contain" }}
              variant="rectangular"
              width={300}
              height={200}
            />
          )}
          <Grid
            container
            sx={{
              width: "100%",
              height: "40%",
              backgroundColor: "secondary.main",
            }}
          >
            <Grid item xs={12}>
              {product ? (
                <CardContent>
                  <Typography variant="h6">
                    {product.price.toFixed(2)} SEK
                  </Typography>
                  <Typography gutterBottom variant="title" component="div">
                    {product.title
                      ? product.title
                      : "This product has been deleted"}
                  </Typography>
                </CardContent>
              ) : (
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </CardContent>
              )}
            </Grid>
            {order_ref && (
              <Grid sx={{ padding: "16px 16px 16px" }} item xs={4}>
                <Typography variant="subtitle">
                  Order ref: {order_ref}
                </Typography>
              </Grid>
            )}

            {date && (
              <Grid
                sx={{
                  padding: "16px 16px 16px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: "5px",
                }}
                item
                xs={8}
              >
                <Typography variant="subtitle">Added:</Typography>
                <Typography variant="subtitle">
                  {new Date(date).toDateString()}
                </Typography>
              </Grid>
            )}
            {!order_ref && (
              <Grid sx={{ alignSelf: "flex-end" }} item xs={12}>
                <CardActions sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Grid container>
                    <Grid sx={{ display: "flex" }} item xs={6}>
                      {product ? (
                        <Rating
                          name="product-rating"
                          value={parseFloat(product.average_grade)}
                          readOnly
                          precision={0.2}
                          size="medium"
                          emptyIcon={
                            <StarBorderIcon
                              style={{ color: "#ffb800" }}
                              fontSize="inherit"
                            />
                          }
                        />
                      ) : (
                        <Skeleton variant="text" width="90%" />
                      )}
                      {product && (
                        <Typography
                          sx={{ marginLeft: "5px" }}
                          variant="subtitle"
                        >
                          ({product.total_ratings})
                        </Typography>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {product ? (
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "text.third",
                          }}
                          variant="body2"
                        >
                          In stock:{" "}
                          {product.in_stock > 0 ? (
                            <CheckIcon sx={{ color: "primary.main" }} />
                          ) : (
                            <CloseIcon sx={{ color: "error.main" }} />
                          )}
                        </Typography>
                      ) : (
                        <Skeleton variant="text" width="90%" />
                      )}
                    </Grid>
                  </Grid>
                </CardActions>
              </Grid>
            )}
          </Grid>
        </CardActionArea>
      </Card>
    </Box>
  );
}
