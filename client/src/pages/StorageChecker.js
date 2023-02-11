import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getBasket, isLoggedIn } from "../api_calls/users";

class StorageChecker extends React.Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem("token");
    axios.defaults.headers.common["X-Auth-Token"] = token;
  }

  componentDidMount = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      await isLoggedIn()
        .then(async (res) => {
          this.props.addToken(token);
          this.props.userAdmin(res.data.is_admin);
          let data = await getBasket();
          if (data.status === 200) {
            this.props.setCart(data.data);
          }
        })
        .catch((err) => {
          localStorage.removeItem("token");
          let cart = localStorage.getItem("cart");
          if (cart) {
            this.props.setCart(JSON.parse(cart));
          } else {
            this.props.setCart([]);
          }
        });
    } else {
      let cart = localStorage.getItem("cart");
      if (cart) {
        this.props.setCart(JSON.parse(cart));
      } else {
        this.props.setCart([]);
      }
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.token !== prevProps.token) {
      axios.defaults.headers.common["X-Auth-Token"] = this.props.token;
    }
  };

  render() {
    return this.props.children;
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

export default connect(mapStateToProps, mapDispatchToProps)(StorageChecker);
