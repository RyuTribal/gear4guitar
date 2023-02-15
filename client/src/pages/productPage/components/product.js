import { Box, Typography, Button, Breadcrumbs } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { Link as MUILink, Grid, ButtonBase, Rating } from "@mui/material";
import CarouselNav from "react-multi-carousel";
import useWindowSize from "../../../redundant_functions/WindowSize";
import "react-multi-carousel/lib/styles.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CircleIcon from "@mui/icons-material/Circle";
import GetColorFromString from "../../../redundant_functions/colors";
import CardDisplay from "../../../components/CardDisplay";

// function convertJSON_toIslam(json) {
//   // Inshallah1   Inshallah2   Inshallah3
//   return json;
// }

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
};

function ProductMain(props) {
  const size = useWindowSize();
  const [selected, setSelected] = React.useState(0);
  if (props.product) {
    return (
      <Grid container spacing={3} sx={{ padding: "0px 20px" }}>
        <Grid item container xs={12} md={7} spacing={1}>
          <Grid item xs={12}>
            <Typography sx={{ color: "text.third" }} variant="h4">
              {props.product.title}
            </Typography>
          </Grid>
          <Grid sx={{ height: "auto" }} item xs={12}>
            <Box
              component="img"
              sx={{
                maxWidth: "100%",
                objectFit: "cover",
              }}
              src={props.product.images[selected]}
              alt={props.product.title}
            />
          </Grid>
          <Grid item xs={12}>
            <CarouselNav
              swipeable={true}
              draggable={false}
              responsive={responsive}
              infinite={false}
              autoPlay={false}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              deviceType={size.width > 1024 ? "desktop" : "mobile"}
              transitionDuration={500}
              containerClass="carousel-container"
              focusOnSelect={false}
              removeArrowOnDeviceType={["tablet", "mobile"]}
              onChange={(value) => setSelected(value)}
            >
              {props.product.images.map((image, index) => (
                <ButtonBase
                  onClick={() => setSelected(index)}
                  key={index}
                  sx={{
                    border:
                      index === selected
                        ? "2px solid #ffb800"
                        : "2px solid white",
                    maxHeight: "100%",
                    maxWidth: "90%",
                  }}
                >
                  <Box
                    key={index}
                    component="img"
                    sx={{
                      objectFit: "cover",
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                    src={image}
                    alt={props.product.title}
                  />
                </ButtonBase>
              ))}
            </CarouselNav>
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={5} spacing={2}>
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: size.width > 851 ? "column" : "row",
              alignItem: "flex-end",
              gap: "10px",
            }}
            xs={12}
          >
            <Typography
              sx={{
                textAlign: "end",
                color: "text.primary",
              }}
              variant="subtitle"
            >
              {`(Ref.id): ${props.product.id}`}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Rating
                name="product-rating"
                value={parseFloat(props.product.average_grade)}
                readOnly
                precision={0.2}
                size="large"
                emptyIcon={
                  <StarBorderIcon
                    style={{ color: "#ffb800" }}
                    fontSize="inherit"
                  />
                }
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography
                sx={{
                  textAlign: "end",
                  color: "text.primary",
                }}
                variant="subtitle"
              >
                {`In stock: ${props.product.in_stock}`}
              </Typography>
            </Box>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={6}>
              <Typography sx={{ color: "text.third" }} variant="h5">
                {props.product.price} SEK
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Button
                onClick={() => props.addToBasket()}
                variant="contained"
                sx={{
                  width: "100%",
                  "&:disabled": {
                    backgroundColor: "#cccccc",
                  },
                }}
                disabled={props.product.in_stock === 0}
              >
                Add to cart
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} md={4}>
              <Typography sx={{ color: "text.third" }} variant="h5">
                Description
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography sx={{ color: "text.primary" }} variant="body1">
                {props.product.description}
              </Typography>
            </Grid>
          </Grid>
          {props.product.color && (
            <Grid container item xs={12}>
              <Grid item xs={4}>
                <Typography sx={{ color: "text.third" }} variant="h5">
                  Color
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <CircleIcon
                  style={{ color: GetColorFromString(props.product.color) }}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

function ProductSpecs(props) {
  const bold_reg = /(\w+)(:.*?)(?=\s+\w+:|$)/g;
  if (props.product) {
    return (
      <Grid item xs={12} spacing={2} container sx={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography sx={{ color: "text.third" }} variant="h5">
            Details
          </Typography>
        </Grid>
        <Grid item container xs={12} spacing={1}>
          {props.product.specs && props.product.specs.map((spec, index) => {
            return (
              <Grid sx={{ padding: "20px" }} md={4} xs={12}>
                <Typography
                  key={index}
                  sx={{ color: "text.primary", fontWeight: "bold" }}
                >
                  {spec.title}
                </Typography>
                {spec.content.map((content, index) => {
                  let str = Array.from(content.matchAll(bold_reg), (m) => {
                    return (
                      <Typography
                        key={index}
                        sx={{ color: "text.primary", padding: 0 }}
                      >
                        {`\u2022 `}
                        <strong>{m[1]}</strong>
                        {m[2]}
                      </Typography>
                    );
                  });
                  return str;
                })}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

const responsive_variation = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function ProductVariations(props) {
  if (props.variations && props.variations.length > 0) {
    return (
      <Grid item xs={12} spacing={2} container>
        <Grid sx={{ display: "flex", justifyContent: "center" }} item xs={12}>
          <Typography sx={{ color: "text.third" }} variant="h5">
            Similar products
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ padding: "20px", margin: "0 auto" }}>
            <CarouselNav
              swipeable={true}
              draggable={false}
              responsive={responsive_variation}
              infinite={false}
              autoPlay={false}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              partialVisible={true}
              transitionDuration={500}
              containerClass="carousel-container"
              focusOnSelect={false}
              removeArrowOnDeviceType={["tablet", "mobile"]}
              itemClass="carousel-item-space"
            >
              {props.variations.map((variation, index) => (
                <Box key={index} sx={{ maxWidth: "90%" }}>
                  <CardDisplay product={variation} index={index} />
                </Box>
              ))}
            </CarouselNav>
          </Box>
          <Grid />
        </Grid>
      </Grid>
    );
  }
}

export default function Results(props) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        margin: 0,
        paddingTop: 5,
        backgroundColor: "secondary.main",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
        }}
      >
        {props.product && (
          <Breadcrumbs sx={{ marginLeft: "20px" }} aria-label="breadcrumb">
            <MUILink underline="hover" component={Link} color="inherit" to="/">
              <HomeIcon />
            </MUILink>
            {props.product.category_ids.map((category, index) => (
              <MUILink
                underline="hover"
                component={Link}
                color="inherit"
                to={"/search/" + category}
              >
                {props.product.category_names[index]}
              </MUILink>
            ))}
          </Breadcrumbs>
        )}

        <Grid sx={{ marginTop: "2rem" }} container spacing={2}>
          <Grid item container xs={12}>
            <ProductMain
              product={props.product}
              addToBasket={() => props.addToBasket()}
            />
          </Grid>
          <Grid item container xs={12}>
            <ProductSpecs product={props.product} />
          </Grid>
          <Grid item xs={12}>
            <ProductVariations variations={props.variations} />
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>

        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {renderComment(
            props.comments.data,
            anchorEl,
            setAnchorEl,
            open,
            handleClick,
            handleClose,
            chooseOption
          )}
        </Box> */}
      </Box>
    </Box>
  );
}
