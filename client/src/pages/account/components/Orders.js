import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import CarouselNav from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

export default function Orders(props) {
  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        {props.has_orders
          ? "Your Orders"
          : "You have no orders, please take a look at some products below:"}
      </Typography>
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
        {props.orders && props.orders.length > 0
          ? props.orders.map((order, index) => (
              <Box sx={{ maxWidth: "90%", display: "flex" }} key={index}>
                <CardDisplay
                  product={order}
                  index={index}
                  order_ref={order.order_id}
                  order_status={order.status}
                  quantity={order.quantity}
                  date={order.order_date}
                />
              </Box>
            ))
          : [...Array(3)].map((_, index) => (
              <Box sx={{ maxWidth: "90%", display: "flex" }} key={index}>
                <CardDisplay product={null} index={index} />
              </Box>
            ))}
      </CarouselNav>
    </Grid>
  );
}
