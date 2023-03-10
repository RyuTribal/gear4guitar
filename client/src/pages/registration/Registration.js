import React, { Component } from "react";
import { register, login } from "../../api_calls/users";
import RegistrationView from "./components/Registration";
import { connect } from "react-redux";
import withRouter from "../../components/routes";

class Regitration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      name: "",
      errors: {},
      loading: false,
    };
  }

  handleRegistration = async (user) => {
    this.setState({ loading: true });
    let resp = await register(
      user.email,
      user.password,
      user.firstName,
      user.lastName
    ).catch((err) => {
      return err.response;
    });
    if (resp.status === 200) {
      let resp_log = await login(user.email, user.password);
      if (resp_log.status === 200) {
        this.props.addToken(resp_log.data.token);
        localStorage.setItem("token", resp_log.data.token);
        this.props.router.navigate("/");
      }
    } else if (resp.status === 400) {
      let snackbar = {
        open: true,
        message: "Missing credentials",
        severity: "error",
        duration: 3000,
      };
      this.props.showSnackBar(snackbar);
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <RegistrationView
        loading={this.state.loading}
        register={(user) => this.handleRegistration(user)}
      />
    );
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Regitration)
);
