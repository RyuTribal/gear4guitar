import React, { Component } from 'react';
import './search.css';
import { getSearchFeed } from "../../api_calls/search";
import Results from './components/results';
import withRouter from '../../components/routes'
import { useNavigate } from 'react-router-dom';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.navigateProduct = this.navigateProduct.bind(this);
        this.state = {
            search_results: [],
        }
    }

    componentDidMount = async () => {
        this.link(this.props.router.params.query);
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props.router.params.query !== prevProps.router.params.query) {
            this.link(this.props.router.params.query);
        }
    }

    link = async (query) => {
        let res = await getSearchFeed(query);
        this.setState({ search_results: res });
    };

    navigateProduct(id) {
        this.props.navigate(`/productPage/${id}`)
    }

    render() {
        return (
            <div>
                <Results buttonFunction={(id) => this.navigateProduct(id)} search_results={this.state.search_results} />
            </div>
        )
    }
}

export default withRouter(Search);
