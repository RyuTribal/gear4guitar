import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser, getOrders, updateUser } from "../../api_calls/users";
import { getBestSellers } from "../../api_calls/search";
import withRouter from "../../components/routes";
import { Button, Grid } from "@mui/material";
import UserDetails from "./components/UserDetails";
import Orders from "./components/Orders";

function capitalizeFirstLetter(string) {
  if (string) {
    return string[0].toUpperCase() + string.slice(1);
  } else {
    return "";
  }
}

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: null,
        is_admin: false,
      },
      prev_orders: [],
      has_orders: false,
    };
  }

  componentDidMount = async () => {
    let user_resp = await getUser().catch((err) => {
      return err;
    });
    if (user_resp.status === 200) {
      this.setState({
        user: {
          ...user_resp.data,
          first_name: capitalizeFirstLetter(user_resp.data.first_name),
          last_name: capitalizeFirstLetter(user_resp.data.last_name),
        },
      });
    } else {
      this.props.router.navigate("/sign_in");
    }
    let orders_resp = await getOrders();
    if (orders_resp.status === 200 && orders_resp.data.length > 0) {
      this.setState({ prev_orders: orders_resp.data, has_orders: true });
    } else {
      let best_sellers = await getBestSellers();
      if (best_sellers.status === 200) {
        this.setState({ prev_orders: best_sellers.data });
      }
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.token !== this.props.token) {
      let user_resp = await getUser();
      if (user_resp.status === 200) {
        this.setState({
          user: {
            ...user_resp.data,
            first_name: capitalizeFirstLetter(user_resp.data.first_name),
            last_name: capitalizeFirstLetter(user_resp.data.last_name),
          },
        });
      }
    }
  };

  logout = () => {
    localStorage.removeItem("token");
    this.props.resetCart();
    this.props.removeToken();
    this.props.userAdmin(false);
    this.props.router.navigate("/sign_in");
  };

  render() {
    return (
      <Grid
        container
        spacing={3}
        sx={{
          backgroundColor: "background.paper",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <UserDetails
          user={this.state.user}
          updateUser={() => {
            updateUser(this.state.user);
            let snackbar = {
              open: true,
              message: "User details updated",
              severity: "success",
              duration: 3000,
            };
            this.props.showSnackBar(snackbar);
            this.setState({ user: { ...this.state.user, password: null } });
          }}
          updateState={(user) => this.setState({ user: user })}
        />
        <Orders
          orders={this.state.prev_orders}
          has_orders={this.state.has_orders}
        />
        <Grid item xs={12}>
          <Button onClick={this.logout} color="error" variant="contained">
            Log out
          </Button>
        </Grid>
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
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
