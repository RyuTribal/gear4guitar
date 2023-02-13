import React, { useState } from 'react';
import { Box } from "@mui/material";
import EditProduct from "./components/editProduct";
import withRouter from "../../components/routes";
import { connect } from "react-redux";
import { getProductInfo, editProducts } from "../../api_calls/productInfo";
import { isLoggedIn } from "../../api_calls/users";
import axios from "axios";

class editProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: null,
            price: null,
            description: null,
            in_stock: null,
            color: null,
            images: null,
            brand: null,
            showAlert: false,
            isAdmin: false,
            product: null,
        };
    }

    componentDidMount = async (res) => {
        await isLoggedIn()
            .then(async (res) => {
                this.state.isAdmin = this.props.userAdmin(res.data.is_admin)
            })
        if (this.state.isAdmin.value === false) {
            this.props.router.navigate("/")
        } else {
            await Promise.all([
                await this.getProducts(this.props.router.params.id),
            ]);
            this.state.id = this.props.router.params.id
            console.log(this.state.product)
        }
    };

    componentDidUpdate = async (prevProps) => {
        if (this.state.isAdmin.value === false) {
            this.props.router.navigate("/")
        }
    };

    getProducts = async (id) => {
        let res = await getProductInfo(id);
        if (res.status === 200) {
            this.setState({ product: res.data });
        }
    };

    link = async (id, title, price, description, in_stock, color, images, brand) => {
        if (title === null || title.length == 0) {
            title = this.state.product.title
        }
        if (price === null || price.length == 0) {
            price = this.state.product.price
        }
        if (description === null || description.length == 0) {
            description = this.state.product.description
        }
        if (in_stock === null || in_stock.length == 0) {
            in_stock = this.state.product.in_stock
        }
        if (color === null || color.length == 0) {
            color = this.state.product.color
        }
        if (images === null || images.length == 0 || images[0] === '') {
            images = this.state.product.images
        }
        if (brand === null || brand.length == 0) {
            brand = this.state.product.brand
        }
        await editProducts(id, title, price, description, in_stock, color, images, brand);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Id: ${this.state.id}, Title: ${this.state.title}, Price: ${this.state.price}, Description: ${this.state.description}, In Stock: ${this.state.in_stock}, Color: ${this.state.color}, Images: ${this.state.images}, Brand: ${this.state.brand}`);

        this.link(this.state.id, this.state.title, this.state.price, this.state.description, this.state.in_stock, this.state.color, this.state.images, this.state.brand);

        // https://www.meme-arsenal.com/memes/83b538a30ec69ff45629c85c7cfa746f.jpg
        // https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fphotos%2Fimages%2Fnewsfeed%2F002%2F297%2F368%2F17f.jpg

        this.setState({
            title: "",
            price: null,
            description: "",
            in_stock: null,
            color: "",
            images: null,
            brand: "",
        });

        // window.location.reload(false);

        this.setState({
            showAlert: true,
        });

        setTimeout(() => {
            this.setState({
                showAlert: false,
            });
        }, 3000);
    }

    render() {
        return (
            <Box>
                {this.state.isAdmin.value && (
                    <EditProduct
                        onSubmit={this.handleSubmit}
                        title={this.state.title}
                        setTitle={(title) => this.setState({ title })}
                        price={this.state.price}
                        setPrice={(price) => this.setState({ price })}
                        showAlert={this.state.showAlert}
                        description={this.state.description}
                        setDescription={(description) => this.setState({ description })}
                        in_stock={this.state.in_stock}
                        setInStock={(in_stock) => this.setState({ in_stock })}
                        color={this.state.color}
                        setColor={(color) => this.setState({ color })}
                        images={this.state.images}
                        setImages={(images) => this.setState({ images })}
                        brand={this.state.brand}
                        setBrand={(brand) => this.setState({ brand })}
                        product={this.state.product}
                    />
                )}
            </Box>
        );
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
        userAdmin: (is_admin) => dispatch({ type: "IS_ADMIN", value: is_admin }),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(editProductPage)
);
