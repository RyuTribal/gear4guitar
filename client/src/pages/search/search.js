import React, { Component } from 'react';
import './search.css';
import { getSearchFeed } from "../../api_calls/search";
import Results from './components/results';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_results: [],
        }
    }

    componentDidMount = async () => {
        let res = await getSearchFeed('balls');
        this.setState({ search_results: res });
        console.log(this.state.search_results)
    }

    render() {
        return (
            <div>
                <h2>test</h2>
            </div>
        )
    }
}

// <Results results={this.state.search_results} />

export default Search;
