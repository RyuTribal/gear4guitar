import React from "react";
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
  Popover,
} from "@mui/material";
import { Link } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import GetColorFromString from "../../../redundant_functions/colors";
import CircleIcon from "@mui/icons-material/Circle";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function Results(props) {
  const [hovered, setHovered] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <Grid
      alignItems="stretch"
      container
      item
      xs={12}
      spacing={3}
    >
      {props.products.map((product, index) => (
        <Grid sx={{ display: "flex" }} key={index} item xs={12} sm={6} md={4}>
          <Popover
            open={index === hovered}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              style: { width: "25vw" },
            }}
          >
            <Card
              wrap={index === hovered ? "wrap" : "nowrap"}
              sx={{
                border: "1px solid #262725",
              }}
              onMouseLeave={(e) => {
                setHovered(null);
                setAnchorEl(null);
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
                      <Typography variant="body2">
                        {product.specs[0] && (
                          <Box>
                            <Typography
                              key={index}
                              variant="title"
                              fontWeight="bold"
                            >
                              {product.specs[0].title}
                            </Typography>
                            {product.specs[0].content.map((content, index) => (
                              <Typography key={index} variant="body2">
                                {`\u2022 `}
                                {content}
                              </Typography>
                            ))}
                          </Box>
                        )}
                        <Box sx={{ marginTop: "10px" }}>
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
                        </Box>
                      </Typography>
                    </CardContent>
                  </Grid>
                  <Grid item xs={12}>
                    <CardActions
                      sx={{ display: "flex", alignItems: "flex-end" }}
                    >
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
                          <Typography
                            sx={{ marginLeft: "5px" }}
                            variant="subtitle"
                          >
                            ({product.total_ratings})
                          </Typography>
                        </Grid>
                        {product.color && (
                          <Grid
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                            item
                            xs={6}
                          >
                            <CircleIcon
                              style={{
                                color: GetColorFromString(product.color),
                              }}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </CardActions>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          </Popover>
          <Card
            sx={{
              border: "1px solid #262725",
              "&:hover": {
                border: "1px solid #ffb800",
              },
            }}
            onMouseOver={(e) => {
              setAnchorEl(e.currentTarget);
              setHovered(index);
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
                <Grid item xs={12}>
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
                        <Typography
                          sx={{ marginLeft: "5px" }}
                          variant="subtitle"
                        >
                          ({product.total_ratings})
                        </Typography>
                      </Grid>
                      {product.color && (
                        <Grid
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                          item
                          xs={6}
                        >
                          <CircleIcon
                            style={{
                              color: GetColorFromString(product.color),
                            }}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </CardActions>
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
