import React, { Component } from 'react';
import './search.css';
import { getSearchFeed } from "../../api_calls/search";
import Results from './components/results';
import withRouter from '../../components/routes'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_results: [],
        }
    }

    componentDidMount = async () => {
        console.log(this.props.router.params.query)
        this.link(this.props.router.params.query);
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props.router.params.query !== prevProps.router.params.query) {
            console.log(this.props.router.params.query)
            this.link(this.props.router.params.query);
        }
    }

    link = async (query) => {
        let res = await getSearchFeed(query);
        this.setState({ search_results: res });
    };

    render() {
        return (
            <div>
                Balls 2.0
                <Results search_results={this.state.search_results} />
            </div>
        )
    }
}

export default withRouter(Search);
