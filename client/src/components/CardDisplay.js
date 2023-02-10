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
} from "@mui/material";

export default function CardDisplay(props) {
  const { product, index } = props;
  return (
    <Box sx={{ display: "flex" }} id={`product-${index}`}>
      <Card
        sx={{
          border: "1px solid #262725",
          "&:hover": {
            border: "1px solid #ffb800",
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
          to={`/productPage/${product.id}`}
        >
          <CardMedia
            component="img"
            image={product.images[0]}
            alt={product.title}
            sx={{ objectFit: "contain" }}
          />
          <Grid
            container
            sx={{
              width: "100%",
              height: "40%",
              backgroundColor: "secondary.main",
            }}
          >
            <Grid item xs={12}>
              <CardContent>
                <Typography variant="h6">{product.price} SEK</Typography>
                <Typography gutterBottom variant="title" component="div">
                  {product.title}
                </Typography>
              </CardContent>
            </Grid>
            <Grid sx={{alignSelf: "flex-end"}} item xs={12}>
              <CardActions sx={{ display: "flex", alignItems: "flex-end" }}>
                <Grid container>
                  <Grid sx={{ display: "flex" }} item xs={6}>
                    <Rating
                      name="product-rating"
                      value={parseFloat(product.rating)}
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
                    <Typography sx={{ marginLeft: "5px" }} variant="subtitle">
                      ({product.total_ratings})
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{display: "flex", justifyContent: "flex-end"}}>
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
                  </Grid>
                </Grid>
              </CardActions>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Box>
  );
}
