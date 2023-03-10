import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import ProductBasic from "../addProductPage/components/ProductBasic";
import ImageAdder from "../addProductPage/components/ImageAdder";
import Specs from "../addProductPage/components/Specs";
import withRouter from "../../components/routes";
import { connect } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import { getProductInfo, editProduct } from "../../api_calls/productInfo";
import Categories from "../addProductPage/components/Categories";

class EditProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: "",
      price: 0,
      description: "",
      in_stock: 0,
      color: "white",
      images: [],
      brand: "",
      isAdmin: false,
      specs: [],
      loading: true,
      button_loading: false,
      categories: [],
    };
  }

  componentDidMount = async (res) => {
    if (this.props.isAdmin === false) {
      this.props.router.navigate("/");
    } else {
      await this.getProducts(this.props.router.params.id);
      this.setState({
        id: this.props.router.params.id,
        isAdmin: true,
        loading: false,
      });
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.isAdmin !== this.props.isAdmin) {
      if (this.props.isAdmin === false) {
        this.props.router.navigate("/");
      } else {
        this.setState({ isAdmin: true });
      }
    }
  };

  getProducts = async (id) => {
    let res = await getProductInfo(id).catch((err) => {
      return err.response;
    });
    if (res.status === 200) {
      this.setState({
        title: res.data.title ? res.data.title : "",
        price: res.data.price ? res.data.price : 0,
        description: res.data.description ? res.data.description : "",
        in_stock: res.data.in_stock ? res.data.in_stock : 0,
        color: res.data.color ? res.data.color : "white",
        images: res.data.images ? res.data.images : [],
        brand: res.data.brand ? res.data.brand : "",
        specs: res.data.specs ? res.data.specs : [],
        categories: res.data.category_names ? res.data.category_names : [],
      });
    }
  };

  handleSubmit = async () => {
    this.setState({ button_loading: true });
    const { title, price, description, in_stock, color, images, specs, brand } =
      this.state;
    const product = {
      id: this.state.id,
      title,
      price,
      description,
      in_stock,
      color,
      images,
      specs,
      brand,
      categories: this.state.categories,
    };

    let res = await editProduct(product).catch((err) => {
      return err.response;
    });
    if (res.status === 200) {
      this.props.showSnackBar({
        message: "Product edited successfully",
        severity: "success",
        duration: 3000,
      });
      this.props.router.navigate("/productPage/" + this.state.id);
    } else if (res.status === 400) {
      this.props.showSnackBar({
        message: res.data.message,
        severity: "error",
        duration: 3000,
      });
    } else {
      this.props.showSnackBar({
        message: "Something went wrong",
        severity: "error",
        duration: 3000,
      });
    }
    this.setState({ button_loading: false });
  };

  render() {
    if (this.state.loading) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.paper",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "background.paper",
          alignItems: "center",
          padding: "50px 10px",
          minHeight: "100vh",
          gap: "20px",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Edit product: {this.state.id}
        </Typography>
        <ProductBasic
          title={this.state.title}
          price={this.state.price}
          description={this.state.description}
          in_stock={this.state.in_stock}
          color={this.state.color}
          brand={this.state.brand}
          setTitle={(title) => this.setState({ title })}
          setPrice={(price) => this.setState({ price })}
          setDescription={(description) => this.setState({ description })}
          setInStock={(in_stock) => this.setState({ in_stock })}
          setColor={(color) => this.setState({ color })}
          setBrand={(brand) => this.setState({ brand })}
        />
        <Categories
          categories={this.state.categories}
          setCategories={(categories) => {
            this.setState({ categories });
          }}
        />
        <ImageAdder
          images={this.state.images}
          setImages={(images) => this.setState({ images })}
        />
        <Specs
          specs={this.state.specs}
          setSpecs={(specs) => this.setState({ specs })}
        />
        <LoadingButton
          loading={this.state.button_loading}
          variant="contained"
          onClick={this.handleSubmit}
        >
          <span>Submit</span>
        </LoadingButton>
      </Box>
    );
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
    userAdmin: (is_admin) => dispatch({ type: "IS_ADMIN", value: is_admin }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditProductPage)
);
