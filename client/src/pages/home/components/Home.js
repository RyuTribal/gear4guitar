import { Box, Button, Grid, Typography } from "@mui/material";
import electric from "../images/electric.png";
import acoustic from "../images/acoustic.png";
import ukulele from "../images/ukulele.png";
import { Link } from "react-router-dom";
import CarouselNav from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useWindowSize from "../../../redundant_functions/WindowSize";
import CardDisplay from "../../../components/CardDisplay";

const responsive = {
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

export default function HomeView(props) {
  const size = useWindowSize();
  return (
    <Grid
      sx={{ height: "100%", width: "100%", margin: 0 }}
      container
      spacing={1}
    >
      <Grid
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${electric})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          gap: "20px",
          minHeight: "50vh",
        }}
        item
        xs={12}
      >
        <Typography
          marginLeft={size.width > 851 ? 5 : 0}
          fontWeight="bold"
          variant={size.width > 851 ? "h3" : "h5"}
          sx={{ color: "primary.main" }}
        >
          Plug in, rock out
        </Typography>
        <Typography
          marginLeft={size.width > 851 ? 5 : 0}
          sx={{ color: "text.primary" }}
          variant={size.width > 851 ? "h5" : "subtitle"}
        >
          Elevate your sound with electric power.
        </Typography>
        <Box
          marginLeft={size.width > 851 ? 5 : 0}
          marginBottom={size.width > 851 ? 5 : 1}
          sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
        >
          <Button component={Link} to="/search/2" variant="contained">
            Electric Guitars
          </Button>
          <Button component={Link} to="/search/7" variant="contained">
            Accessories
          </Button>
        </Box>
      </Grid>
      <Grid
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${acoustic})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          gap: "20px",
          minHeight: "30vh",
        }}
        item
        md={6}
        xs={12}
      >
        <Typography
          marginLeft={size.width > 851 ? 5 : 0}
          fontWeight="bold"
          variant={size.width > 851 ? "h3" : "h5"}
          sx={{ color: "primary.main" }}
        >
          Strum natural, play pure.
        </Typography>
        <Typography
          marginLeft={size.width > 851 ? 5 : 0}
          sx={{ color: "text.primary" }}
          variant={size.width > 851 ? "h5" : "subtitle"}
        >
          Discover the timeless beauty of acoustic sound.
        </Typography>
        <Box
          marginLeft={size.width > 851 ? 5 : 0}
          marginBottom={size.width > 851 ? 5 : 1}
          sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
        >
          <Button component={Link} to="/search/1" variant="contained">
            Acoustic Guitars
          </Button>
          <Button component={Link} to="/search/16740" variant="contained">
            Accessories
          </Button>
        </Box>
      </Grid>
      <Grid
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${ukulele})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          gap: "20px",
        }}
        item
        xs={12}
        md={6}
      >
        <Typography
          marginLeft={size.width > 851 ? 5 : 0}
          fontWeight="bold"
          variant={size.width > 851 ? "h3" : "h5"}
          sx={{ color: "primary.main" }}
        >
          Ukulele: a smile in every strum.
        </Typography>
        <Typography
          marginLeft={size.width > 851 ? 5 : 0}
          sx={{ color: "text.primary" }}
          variant={size.width > 851 ? "h5" : "subtitle"}
        >
          Bring happiness to your music with the ukulele.
        </Typography>
        <Box
          marginLeft={size.width > 851 ? 5 : 0}
          marginBottom={size.width > 851 ? 5 : 1}
          sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
        >
          <Button component={Link} to="/search/15486" variant="contained">
            Ukuleles
          </Button>
          <Button component={Link} to="/search/38301" variant="contained">
            Cases
          </Button>
        </Box>
      </Grid>
      <Grid
        sx={{ padding: "10px", height: "fit-content" }}
        item
        container
        xs={12}
        spacing={1}
      >
        <Grid item xs={12}>
          <Typography
            sx={{ fontSize: "1.5rem", color: "text.primary" }}
            textAlign="center"
          >
            BEST SELLERS
          </Typography>
        </Grid>
        <Grid sx={{ height: "100%" }} item xs={12}>
          <CarouselNav
            swipeable={true}
            draggable={false}
            responsive={responsive}
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
            {props.products
              ? props.products.map((product, index) => (
                  <Box sx={{ maxWidth: "90%", display: "flex" }} key={index}>
                    <CardDisplay product={product} index={index} />
                  </Box>
                ))
              : [...Array(4)].map((_, index) => (
                  <Box sx={{ maxWidth: "90%", display: "flex" }} key={index}>
                    <CardDisplay product={null} index={index} />
                  </Box>
                ))}
          </CarouselNav>
        </Grid>
      </Grid>
    </Grid>
  );
}
