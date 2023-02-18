import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ProductBasic from "../addProductPage/components/ProductBasic";
import ImageAdder from "../addProductPage/components/ImageAdder";
import Specs from "../addProductPage/components/Specs";
import withRouter from "../../components/routes";
import { connect } from "react-redux";
import { getProductInfo, editProduct } from "../../api_calls/productInfo";

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
    };
  }

  componentDidMount = async (res) => {
    if (this.props.isAdmin === false) {
      this.props.router.navigate("/");
    } else {
      await this.getProducts(this.props.router.params.id);
      this.setState({ id: this.props.router.params.id, isAdmin: true });
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
        title: res.data.title,
        price: res.data.price,
        description: res.data.description,
        in_stock: res.data.in_stock,
        color: res.data.color,
        images: res.data.images,
        brand: res.data.brand,
        specs: res.data.specs,
      });
    }
  };

  handleSubmit = async () => {
    const { title, price, description, in_stock, color, images, specs } =
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
    }
  };

  render() {
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
          setTitle={(title) => this.setState({ title })}
          setPrice={(price) => this.setState({ price })}
          setDescription={(description) => this.setState({ description })}
          setInStock={(in_stock) => this.setState({ in_stock })}
          setColor={(color) => this.setState({ color })}
        />
        <ImageAdder
          images={this.state.images}
          setImages={(images) => this.setState({ images })}
        />
        <Specs
          specs={this.state.specs}
          setSpecs={(specs) => this.setState({ specs })}
        />
        <Button variant="contained" onClick={this.handleSubmit}>
          Submit
        </Button>
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
