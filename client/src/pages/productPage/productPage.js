import React, { Component } from 'react';
import './productPage.css';
import Product from './components/product';
import withRouter from '../../components/routes'
import { getProductInfo } from "../../api_calls/productInfo";

class productPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        }
    }

    componentDidMount = async () => {
        console.log(this.props.router.params.id)
        this.link(this.props.router.params.id);
    }

    link = async (id) => {
        let res = await getProductInfo(id);
        this.setState({ results: res });
        console.log(this.state.results)
    };

    navigateProduct(id) {
        console.log(id)
    }

    render() {
        return (
            <div>
                <Product buttonFunction={(id) => this.navigateProduct(id)} results={this.state.results} />
            </div>
        )
    }
}

export default withRouter(productPage);
