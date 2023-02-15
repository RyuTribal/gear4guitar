import React from "react";
import { getBestSellers } from "../../api_calls/search";
import withRouter from "../../components/routes";
import HomeView from "./components/Home";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount = async () => {
    let res = await getBestSellers();
    if (res.status === 200) {
      this.setState({ products: res.data });
    }
  };
  render() {
    return <HomeView products={this.state.products} />;
  }
}

export default withRouter(Home);
