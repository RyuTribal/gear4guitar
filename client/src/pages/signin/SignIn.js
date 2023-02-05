import { Component } from "react";
import SignInView from "./components/SignIn";
import { store } from "../../redux/store";
import { connect } from "react-redux";
import { login } from "../../api_calls/users";
import withRouter from "../../components/routes";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    if (this.props.token) {
      this.props.router.navigate("/");
    }
  };

  handleLogin = async (user) => {
    let resp = await login(user.email, user.password);
    if (resp.status === 200) {
      this.props.addToken(resp.data.token);
      localStorage.setItem("token", resp.data.token);
      this.props.router.navigate("/");
    }
  };

  render() {
    return <SignInView login={(user) => this.handleLogin(user)} />;
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
