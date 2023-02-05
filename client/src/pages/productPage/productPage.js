import React from 'react';
import './productPage.css';
import Product from './components/product';
import withRouter from '../../components/routes'
import { getProductInfo, getComments, addComments, editComments, deleteComments, getUser } from "../../api_calls/productInfo";

class productPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            comments: [],
            user_info: [],
        }
    }

    componentDidMount = async () => {
        this.get_user();
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
        if (comment === "") {
            return;
        }
        await addComments(id, comment);
        window.location.reload(false);
    }

    edit_comment = async (id, comment) => {
        if (comment === "") {
            return;
        }
        await editComments(id, comment);
        window.location.reload(false);
    }

    delete_comment = async (id) => {
        await deleteComments(id);
        window.location.reload(false);
    }

    get_user = async () => {
        let res = await getUser();
        this.setState({ user_info: res });
        console.log(this.state.user_info)
        return res;
    }

    render() {
        return (
            <div>
                <Product commentDelete={(id) => this.delete_comment(id)} submit={(id, comment) => this.submitButton(id, comment)} buttonFunction={(id) => this.navigateProduct(id)} results={this.state.results} comments={this.state.comments} user_info={this.state.user_info} />
            </div>
        )
    }
}

export default withRouter(productPage);
