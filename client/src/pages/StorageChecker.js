import React from "react";
import { connect } from "react-redux";
import axios from "axios";

class StorageChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    this.props.addToken(localStorage.getItem("token"));
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.token !== prevProps.token) {
      axios.defaults.headers.common['X-Auth-Token'] = this.props.token;
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.jwtReducer.jwt_token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToken: (token) => dispatch({ type: "JWT_ADD", value: token }),
    removeToken: () => dispatch({ type: "JWT_REMOVE" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StorageChecker);