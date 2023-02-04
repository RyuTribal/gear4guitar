import React, { Component } from 'react';
import './productPage.css';
import Product from './components/product';
import withRouter from '../../components/routes'
import { getProductInfo, getComments, addComments } from "../../api_calls/productInfo";

class productPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            comments: []
        }
    }

    componentDidMount = async () => {
        console.log(this.props.router.params.id)
        this.link(this.props.router.params.id);
        this.comment(this.props.router.params.id);
    }

    link = async (id) => {
        let res = await getProductInfo(id);
        this.setState({ results: res });
        console.log(this.state.results)
    };

    comment = async (id) => {
        let res = await getComments(id);
        this.setState({ comments: res });
        console.log(this.state.comments)
    };

    navigateProduct(id) {
        console.log(id)
    }

    submitButton = async (id, comment) => {
        console.log('id: ' + id + 'comment: ' + comment)
        let res = await addComments(id, comment);
    }

    render() {
        return (
            <div>
                <Product submit={(id, comment) => this.submitButton(id, comment)} buttonFunction={(id) => this.navigateProduct(id)} results={this.state.results} comments={this.state.comments} />
            </div>
        )
    }
}

export default withRouter(productPage);
