import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Divider, Grid, Alert } from "@mui/material";
import RenderCart from "./components/RenderCart";
import RenderAddress from "./components/RenderAddress";
import Header from "./components/Header";
import withRouter from "../../components/routes";
import { getUser, completeOrder, getAddress } from "../../api_calls/users";

function capitalizeFirstLetter(string) {
  if (string) {
    return string[0].toUpperCase() + string.slice(1);
  } else {
    return "";
  }
}

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      total: 0,
      address: {
        street: "",
        number: "",
        city: "",
        zip: "",
        country: "",
      },
      order_complete: false,
    };
  }

  componentDidMount = async () => {
    if (this.props.token) {
      const promise = await Promise.all([getAddress(), getUser()]);
      if (promise[0].status === 200 && promise[1].status === 200) {
        this.setState({
          address: {
            user_id: promise[1].data.id,
            first_name: capitalizeFirstLetter(promise[1].data.first_name),
            last_name: capitalizeFirstLetter(promise[1].data.last_name),
            email: promise[1].data.email,
            street: capitalizeFirstLetter(promise[0].data.street_name),
            number: promise[0].data.house_number,
            city: capitalizeFirstLetter(promise[0].data.city),
            zip: promise[0].data.postal_code,
            country: capitalizeFirstLetter(promise[0].data.country),

          },
        });
      }
    }
    if (this.props.basket) {
      let total = 0;
      this.props.basket.forEach((item) => {
        total += item.price * (item.quantity ? item.quantity : 1);
        total = Math.round(total);
      });
      this.setState({ cart: this.props.basket, total: total });
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.basket !== this.props.basket) {
      let total = 0;
      this.props.basket.forEach((item) => {
        total += item.price * (item.quantity ? item.quantity : 1);
        total = Math.round(total);
      });
      this.setState({ cart: this.props.basket, total: total });
    }
    if (prevProps.token !== this.props.token) {
      if (this.props.token) {
        let user_response = await getUser().catch((err) => {
          return err;
        });
        if (user_response.status === 200) {
          this.setState({
            address: {
              user_id: user_response.data.id,
              first_name: user_response.data.first_name,
              last_name: user_response.data.last_name,
              email: user_response.data.email,
            },
          });
        }
      }
    }
  };

  setAddress = (address) => {
    this.setState({ address: address });
  };

  handleOrder = async () => {
    let user_res = await getUser().catch((err) => {
      return err;
    });
    let user_id = null;
    if (user_res.status === 200) {
      user_id = user_res.data.id;
    }
    let user = {
      id: user_id,
      email: this.state.address.email,
      first_name: this.state.address.first_name,
      last_name: this.state.address.last_name,
    };

    let address = {
      street: this.state.address.street,
      number: this.state.address.number,
      city: this.state.address.city,
      zip: this.state.address.zip,
      country: this.state.address.country,
    };

    let products = [];
    this.state.cart.forEach((item) => {
      products.push({
        id: item.id,
        quantity: item.quantity ? item.quantity : 1,
        price: item.price,
      });
    });

    let order_res = await completeOrder(user, address, products);
    if (order_res.status === 200) {
      this.setState({ order_complete: true });
      this.props.resetCart();
      localStorage.removeItem("cart");
      this.props.router.navigate("/");
    }
  };

  render() {
    return (
      <Grid
        spacing={2}
        sx={{
          padding: "50px 10px 20px 10px",
          backgroundColor: "background.paper",
          minHeight: "100vh",
        }}
        container
        alignItems="start"
      >
        <Header />
        <RenderAddress
          address={this.state.address}
          setAddress={(address) => this.setAddress(address)}
        />
        <RenderCart cart={this.state.cart} total={this.state.total} />
        <Grid
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
          item
          xs={12}
        >
          <Divider sx={{ backgroundColor: "text.primary", width: "100%" }} />
          <Button
            onClick={() => this.handleOrder()}
            variant="contained"
            sx={{ width: "fit-content" }}
          >
            Confirm and pay
          </Button>
        </Grid>
        {this.state.order_complete && (
          <Alert severity="success">You order has been completed</Alert>
        )}
      </Grid>
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
    resetCart: () => dispatch({ type: "BASKET_REMOVE" }),
    userAdmin: (isAdmin) => dispatch({ type: "USER_ADMIN", value: isAdmin }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);
