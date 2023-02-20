import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addBasket, removeBasket } from "../api_calls/users";
import useWindowSize from "../redundant_functions/WindowSize";
import { ClickAwayListener } from "@mui/base";
import MobileDrawer from "./mobileDrawer";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, Typography, Grid, IconButton, Button, Menu } from "@mui/material";

function RenderCart(props) {
  if (props.cart.length === 0) {
    return (
      <Box>
        <Typography variant="h6">Your cart is empty</Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "10px",
        maxHeight: "70vh",
        maxWidth: props.size.width > 851 ? "30vw" : "none",
      }}
    >
      <Typography variant="h6">{`My cart: ${props.cart.length} items`}</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflow: "auto",
          maxHeight: "70%",
        }}
      >
        {props.cart.map((item) => (
          <Grid key={item.id} container spacing={1}>
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
              <Typography variant="subtitle">{item.title}</Typography>
              <Typography variant="subtitle">{item.price.toFixed(2)} SEK</Typography>
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
              <IconButton
                sx={{
                  opacity:
                    item.quantity < item.in_stock || !item.quantity ? "1" : "0",
                }}
                color="primary"
                onClick={() => props.addItem(item)}
              >
                <ControlPointIcon />
              </IconButton>
              <Typography variant="subtitle">
                {item.quantity ? item.quantity : 1}
              </Typography>
              <IconButton
                color="primary"
                onClick={() => props.removeItem(item)}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Total: {props.total} SEK</Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/checkout"
          onClick={() => props.setOpen(false)}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
}

function Cart(props) {
  const [cart, setBasket] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(props.open);
  const [isUser, setIsUser] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    if (props.basket) {
      setBasket(props.basket);
    }
  }, [props.basket]);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * (item.quantity ? item.quantity : 1);
      total = Math.round(total);
    });
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  useEffect(() => {
    if (props.user) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [props.user]);

  const addItem = async (item) => {
    if (
      !item.quantity ||
      item.in_stock !== 0 ||
      item.quantity + 1 <= item.in_stock
    ) {
      // Otherwise redux complains about mutability
      let basket = JSON.parse(JSON.stringify(props.basket));
      let index = basket.findIndex((i) => i.id === item.id);
      if (index === -1) {
        basket.push({ ...item, quantity: 1 });
      } else {
        if (basket[index].quantity) {
          basket[index].quantity += 1;
        } else {
          basket[index].quantity = 1;
        }
      }
      if (isUser) {
        await addBasket(item.id, 1);
      }
      props.setCart(basket);
      localStorage.setItem("cart", JSON.stringify(basket));
    }
  };

  const removeItem = async (item) => {
    // Otherwise redux complains about mutability
    let basket = JSON.parse(JSON.stringify(props.basket));
    let index = basket.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      if (basket[index].quantity <= 1 || !basket[index].quantity) {
        basket.splice(index, 1);
      } else {
        basket[index].quantity -= 1;
      }
    }
    props.setCart(basket);
    let basket_resp = null;
    if (isUser && item.quantity !== 1 && item.quantity) {
      basket_resp = await addBasket(item.id, -1);
    } else if (isUser && (item.quantity === 1 || !item.quantity)) {
      basket_resp = await removeBasket(item.id);
    }
    if (basket_resp === null) {
      localStorage.setItem("cart", JSON.stringify(basket));
    }
  };

  if (size.width > 851) {
    return (
      <ClickAwayListener onClickAway={() => props.setOpen(false)}>
        <Menu
          id="cart-menu"
          MenuListProps={{
            "aria-labelledby": "cart-button",
            sx: {
              padding: 0,
            },
          }}
          anchorEl={props.anchorEl}
          open={open}
          onClose={() => props.setOpen(false)}
        >
          <RenderCart
            addItem={(item) => addItem(item)}
            removeItem={(item) => removeItem(item)}
            cart={cart}
            total={total}
            size={size}
            setOpen={(open) => props.setOpen(open)}
          />
        </Menu>
      </ClickAwayListener>
    );
  } else {
    return (
      <MobileDrawer
        open={open}
        onClose={() => props.setOpen(false)}
        side="right"
        PaperProps={{
          sx: {
            width: "80%",
            padding: "20px",
            backgroundColor: "secondary.main",
          },
        }}
      >
        <RenderCart
          addItem={(item) => addItem(item)}
          removeItem={(item) => removeItem(item)}
          cart={cart}
          total={total}
          size={size}
          setOpen={(open) => props.setOpen(open)}
        />
      </MobileDrawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.jwtReducer.jwt_token,
    basket: state.basketReducer.basket,
    isAdmin: state.basketReducer.isAdmin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToken: (token) => dispatch({ type: "JWT_ADD", value: token }),
    removeToken: () => dispatch({ type: "JWT_REMOVE" }),
    setCart: (cart) => dispatch({ type: "BASKET_SET", value: cart }),
    userAdmin: (isAdmin) => dispatch({ type: "USER_ADMIN", value: isAdmin }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
