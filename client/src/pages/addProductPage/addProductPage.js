import React, { useState } from 'react';
import { Box } from "@mui/material";
import AddProduct from "./components/addProduct";
import withRouter from "../../components/routes";
import { connect } from "react-redux";
import { addProducts } from "../../api_calls/productInfo";
import { isLoggedIn } from "../../api_calls/users";
import { useNavigate } from "react-router-dom";
import axios from "axios";

class addProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            price: 0,
            description: "",
            in_stock: 0,
            color: null,
            images: [],
            brand: "",
            showAlert: false,
            isAdmin: false,
        };
    }

    componentDidMount = async (res) => {
        await isLoggedIn()
            .then(async (res) => {
                this.state.isAdmin = this.props.userAdmin(res.data.is_admin)
            })
        if (this.state.isAdmin.value === false) {
            this.props.router.navigate("/")
        }
    };

    componentDidUpdate = async (prevProps) => {
        if (this.state.isAdmin.value === false) {
            this.props.router.navigate("/")
        }
    };

    link = async (title, price, description, in_stock, color, images, brand) => {
        await addProducts(title, price, description, in_stock, color, images, brand);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Title: ${this.state.title}, Price: ${this.state.price}, Description: ${this.state.description}, In Stock: ${this.state.in_stock}, Color: ${this.state.color}, Images: ${this.state.images}, Brand: ${this.state.brand}`);

        this.link(this.state.title, this.state.price, this.state.description, this.state.in_stock, this.state.color, this.state.images, this.state.brand);

        // https://www.meme-arsenal.com/memes/83b538a30ec69ff45629c85c7cfa746f.jpg
        // https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fphotos%2Fimages%2Fnewsfeed%2F002%2F297%2F368%2F17f.jpg

        this.setState({
            title: "",
            price: 0,
            description: "",
            in_stock: 0,
            color: null,
            images: [],
            brand: "",
        });

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
                    <AddProduct
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
    connect(mapStateToProps, mapDispatchToProps)(addProductPage)
);
