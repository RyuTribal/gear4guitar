import React from "react";
import "./productPage.css";
import Product from "./components/product";
import withRouter from "../../components/routes";
import {
  getProductInfo,
  getComments,
  addComments,
  editComments,
  deleteComments,
  getProductVariations,
} from "../../api_calls/productInfo";

class productPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      comments: [],
    };
  }

  componentDidMount = async () => {
    this.link(this.props.router.params.id);
    this.comment(this.props.router.params.id);
    this.loadVariations(this.props.router.params.id);
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

  navigateProduct(id) {
    console.log(id);
  }

  submitButton = async (id, comment) => {
    if (comment === "") {
      return;
    }
    await addComments(id, comment);
    window.location.reload(false);
  };

  editComment = async (id, comment) => {
    if (comment === "") {
      return;
    }
    await editComments(id, comment);
    window.location.reload(false);
  };

  deleteComment = async (id) => {
    await deleteComments(id);
    window.location.reload(false);
  };

  render() {
    return (
      <Product
        submit={(id, comment) => this.submitButton(id, comment)}
        buttonFunction={(id) => this.navigateProduct(id)}
        product={this.state.product}
        comments={this.state.comments}
        variations={this.state.variations}
      />
    );
  }
}

export default withRouter(productPage);
