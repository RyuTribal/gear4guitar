import React from "react";
import withRouter from "../../components/routes";
import HomeView from "./components/Home";

class Home extends React.Component {

    componentDidMount = async () => {

    }
  render() {
    return <HomeView products={[]}/>;
  }
}

export default withRouter(Home);
