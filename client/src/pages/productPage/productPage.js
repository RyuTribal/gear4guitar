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
      comment_offset: 10,
      page: 1,
      user_id: null,
    };
  }

  componentDidMount = async (res) => {
    await Promise.all([
      this.link(this.props.router.params.id),
      this.getComments(this.props.router.params.id),
      this.loadVariations(this.props.router.params.id),
    ]);
    await isLoggedIn()
      .then(async (res) => {
        let is_admin = this.props.userAdmin(res.data.is_admin);
        this.setState({
          loading: false,
          isAdmin: is_admin,
          user_id: res.data.id,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.router.params.id !== prevProps.router.params.id) {
      this.setState({ loading: true });
      await Promise.all([
        this.link(this.props.router.params.id),
        this.getComments(this.props.router.params.id),
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
    console.log(res)
    if (res.status === 200 && res.data) {
      this.setState({ product: res.data });
    } else {
      this.props.router.navigate("/");
    }
  };

  getComments = async (id) => {
    let res = await getComments(
      id,
      this.state.comment_offset * (this.state.page - 1)
    );
    this.setState({ comments: res.data });
  };

  deleteProduct = async (id) => {
    let delete_res = await deleteProducts(id).catch((err) => {
      return err.response;
    });
    console.log(delete_res);
    if (delete_res.status === 200) {
      this.props.showSnackBar({
        message: "Product deleted",
        severity: "success",
        duration: 3000,
      });
      this.props.router.navigate("/");
    } else {
      this.props.showSnackBar({
        message: "Product could not be deleted",
        severity: "error",
        duration: 3000,
      });
    }
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
      let res_cart = await addBasket(this.state.product.id, 1).catch((err) => {
        return err;
      });
      if (res_cart.status === 200) {
        if (!found) {
          cart.push(this.state.product);
        }
        this.props.setCart(cart);
      }
    }
  };

  changePage = async (page) => {
    this.setState({ page: page }, () => {
      this.getComments(this.props.router.params.id);
    });
  };

  addComment = async (comment) => {
    let res = await addComments(this.props.router.params.id, comment).catch(
      (err) => {
        return err;
      }
    );
    if (res.status === 200) {
      this.setState({
        product: {
          ...this.state.product,
          total_comments: parseInt(this.state.product.total_comments) + 1,
        },
      });
      this.getComments(this.props.router.params.id);
    } else if (res.response.status === 401) {
      this.props.router.navigate("/sign_in");
    }
  };

  deleteComment = async (id) => {
    let res = await deleteComments(id).catch((err) => {
      return err;
    });
    if (res.status === 200) {
      this.setState({
        product: {
          ...this.state.product,
          total_comments: parseInt(this.state.product.total_comments) - 1,
        },
      });
      this.getComments(this.props.router.params.id);
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
          user_id={this.state.user_id}
          variations={this.state.variations}
          addToBasket={() => this.addToBasket()}
          deleteProduct={(id) => this.deleteProduct(id)}
          editProduct={(id) => this.editProduct(id)}
          addComment={(comment) => this.addComment(comment)}
          deleteComment={(id) => this.deleteComment(id)}
          changePage={(page) => this.changePage(page)}
          page={this.state.page}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.jwtReducer.jwt_token,
    basket: state.basketReducer.basket,
    isAdmin: state.jwtReducer.isAdmin,
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
