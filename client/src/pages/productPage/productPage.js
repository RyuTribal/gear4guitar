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
  deleteProducts,
} from "../../api_calls/productInfo";
import SkeletonText from "./components/skeleton";
import { connect } from "react-redux";
import { addBasket } from "../../api_calls/users";
import { isLoggedIn } from "../../api_calls/users";

class productPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      comments: [],
      loading: true,
      isAdmin: false,
    };
  }

  componentDidMount = async (res) => {
    await Promise.all([
      this.link(this.props.router.params.id),
      this.comment(this.props.router.params.id),
      this.loadVariations(this.props.router.params.id),
    ]);
    this.setState({ loading: false });
    await isLoggedIn()
        .then(async (res) => {
          this.state.isAdmin = this.props.userAdmin(res.data.is_admin)
        })
    // console.log(this.state.isAdmin.value)
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

  deleteProduct = async (id) => {
    await deleteProducts(id);
  };

  editProduct = async (id) => {
    this.props.router.navigate("/edit_product/" + id);
    window.location.reload(false);
  };

  addToBasket = async () => {
    // Otherwise redux complains about mutability
    let cart = JSON.parse(JSON.stringify(this.props.basket));
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
    if (!this.props.token) {
      localStorage.setItem("cart", JSON.stringify(cart));
      if (!found) {
        cart.push(this.state.product);
      }
      this.props.setCart(cart);
    } else {
      let res_cart = await addBasket(this.state.product.id, 1).catch(
        (err) => {
          return err;
        }
      );
      if (res_cart.status === 200) {
        if (!found) {
          cart.push(this.state.product);
        }
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
          isAdmin={this.state.isAdmin}
          variations={this.state.variations}
          addToBasket={() => this.addToBasket()}
          deleteProduct={(id) => this.deleteProduct(id)}
          editProduct={(id) => this.editProduct(id)}
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
    userAdmin: (is_admin) => dispatch({ type: "IS_ADMIN", value: is_admin }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(productPage)
);
