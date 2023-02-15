import React from "react";
import "./productPage.css";
import Product from "./components/product";
import withRouter from "../../components/routes";
import {
  getProductInfo,
  getProductVariations,
  getComments,
  addComments,
  deleteComments,
  editComments,
  addProducts,
  deleteProducts,
  editProducts,
} from "../../api_calls/productInfo";
import SkeletonText from "./components/skeleton";
import { connect } from "react-redux";
import { addBasket } from "../../api_calls/users";

class productPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      comments: [],
      loading: true,
    };
  }

  componentDidMount = async () => {
    await Promise.all([
      this.link(this.props.router.params.id),
      this.comment(this.props.router.params.id),
      this.loadVariations(this.props.router.params.id),
    ]);
    this.setState({ loading: false });
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.router.params.id !== prevProps.router.params.id) {
      this.setState({ loading: true });
      await Promise.all([
        this.link(this.props.router.params.id),
        this.comment(this.props.router.params.id),
        this.loadVariations(this.props.router.params.id),
      ]);
      this.setState({ loading: false });
    }
  };

  loadVariations = async (id) => {
    let res = await getProductVariations(id);
    if (res.status === 200) {
      this.setState({ variations: res.data });
    }
  };

  link = async (id) => {
    let res = await getProductInfo(id);
    if (res.status === 200) {
      this.setState({ product: res.data });
    }
  };

  comment = async (id) => {
    let res = await getComments(id);
    this.setState({ comments: res.data });
  };

  addComment = async (id, comment) => {
    if (comment === "") {
      return;
    }
    await addComments(id, comment);
    window.location.reload(false);
  };

  deleteComment = async (id) => {
    await deleteComments(id);
    window.location.reload(false);
  };

  editComment = async (id, comment) => {
    if (comment === "") {
      return;
    }
    await editComments(id, comment);
    window.location.reload(false);
  };

  addProduct = async (title, price) => {
    if (title === "" || price === "") {
      return;
    }
    await addProducts(title, price);
    window.location.reload(false);
  };

  deleteProduct = async (id) => {
    await deleteProducts(id);
    window.location.reload(false);
  };

  editProduct = async (id, title, price) => {
    if (title === "" || price === "") {
      return;
    }
    await editProducts(id, title, price);
    window.location.reload(false);
  };

  addToBasket = async () => {
    if (!this.props.token) {
      let cart = [...this.props.basket];
      let found = false;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === this.state.product.id) {
          found = true;
          if (cart[i].quantity) {
            cart[i].quantity++;
            break;
          } else {
            cart[i].quantity = 2;
            break;
          }
        }
      }
      if (!found) {
        cart.push(this.state.product);
      }
      this.props.setCart(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      let res_cart = await addBasket(this.state.product.id);
      if (res_cart.status === 200) {
        let cart = this.props.basket;
        cart.push(this.state.product);
        this.props.setCart(cart);
      }
    }
  };

  render() {
    if (this.state.loading) {
      return <SkeletonText />;
    } else {
      return (
        <Product
          submit={(id, comment) => this.submitButton(id, comment)}
          buttonFunction={(id) => this.navigateProduct(id)}
          product={this.state.product}
          comments={this.state.comments}
          variations={this.state.variations}
          addToBasket={() => this.addToBasket()}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.jwtReducer.jwt_token,
    basket: state.basketReducer.basket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToken: (token) => dispatch({ type: "JWT_ADD", value: token }),
    removeToken: () => dispatch({ type: "JWT_REMOVE" }),
    setCart: (cart) => dispatch({ type: "BASKET_SET", value: cart }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(productPage)
);
