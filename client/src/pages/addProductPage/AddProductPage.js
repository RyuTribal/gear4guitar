import React from "react";
import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import withRouter from "../../components/routes";
import { connect } from "react-redux";
import { addProducts } from "../../api_calls/productInfo";
import ProductBasic from "./components/ProductBasic";
import ImageAdder from "./components/ImageAdder";
import Specs from "./components/Specs";
import Categories from "./components/Categories";

class AddProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      price: 0,
      description: "",
      in_stock: 0,
      color: "white",
      images: [""],
      brand: "",
      showAlert: false,
      isAdmin: false,
      specs: [{ title: "", content: [""] }],
      loading: false,
      categories: [],
    };
  }

  componentDidMount = async () => {
    if (this.props.userAdmin === false) {
      this.props.router.navigate("/");
    } else {
      this.setState({ isAdmin: true });
    }
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.userAdmin !== prevProps.userAdmin) {
      if (this.props.userAdmin === false) {
        this.props.router.navigate("/");
      } else {
        this.setState({ isAdmin: true });
      }
    }
  };

  handleSubmit = async () => {
    this.setState({ loading: true });
    const { title, price, description, in_stock, color, images, specs, brand } =
      this.state;
    const product = {
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
    const response = await addProducts(product).catch((err) => {
      return err.response;
    });
    if (response.status === 200) {
      this.props.showSnackBar({
        snackbar: true,
        message: "Product added successfully",
        severity: "success",
        duration: 3000,
      });
      this.props.router.navigate("/productPage/" + response.data.id);
    } else if (response.status === 400) {
      this.props.showSnackBar({
        message: response.data.message,
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
    this.setState({ loading: false });
  };

  render() {
    if (this.state.isAdmin) {
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
            Add Product
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
            categories={this.state.categories}
          />
          <Categories
            categories={this.state.categories}
            setCategories={(categories) => this.setState({ categories })}
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
            loading={this.state.loading}
            variant="contained"
            onClick={this.handleSubmit}
          >
            <span>Submit</span>
          </LoadingButton>
        </Box>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.jwtReducer.jwt_token,
    basket: state.basketReducer.basket,
    userAdmin: state.jwtReducer.isAdmin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToken: (token) => dispatch({ type: "JWT_ADD", value: token }),
    removeToken: () => dispatch({ type: "JWT_REMOVE" }),
    admin: (is_admin) => dispatch({ type: "IS_ADMIN", value: is_admin }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddProductPage)
);
