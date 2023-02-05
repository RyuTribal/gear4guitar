import React from 'react';
import CreateProductPage from './components/CreateProductPage';
import withRouter from '../../components/routes'
import { getProductInfo} from "../../api_calls/productInfo";

class CreateProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        }
    }

    componentDidMount = async () => {
        this.link(this.props.router.params.id);
    }

    link = async (id) => {
        // let res = await getProductInfo(id);
        // this.setState({ results: res });
        // console.log(this.state.results)
    };

    navigateProduct(id) {
        console.log(id)
    }

    render() {
        return (
            <div>
                <CreateProductPage buttonFunction={(id) => this.navigateProduct(id)} results={this.state.results} />
            </div>
        )
    }
}

export default withRouter(CreateProduct);
