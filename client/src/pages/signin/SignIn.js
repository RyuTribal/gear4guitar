import { Component } from "react";
import SignInView from "./components/SignIn";
import { connect } from "react-redux";
import { login } from "../../api_calls/users";
import withRouter from "../../components/routes";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {
        email: {
          error: false,
          message: "",
        },
        password: {
          error: false,
          message: "",
        },
      },
    };
  }

  componentDidMount = async () => {
    if (this.props.token) {
      this.props.router.navigate("/");
    }
  };

  handleLogin = async (user) => {
    let resp = await login(user.email, user.password).catch((err) => {
      return err.response;
    });
    if (resp.status === 200) {
      this.props.addToken(resp.data.token);
      this.props.setAdmin(resp.data.is_admin);
      localStorage.setItem("token", resp.data.token);
      this.props.router.navigate("/");
    } else if (resp.status === 400) {
      this.setState({
        errors: {
          email: {
            error: true,
            message: "Invalid email or password",
          },
          password: {
            error: true,
            message: "Invalid email or password",
          },
        },
      });
    }
  };

  render() {
    return (
      <SignInView
        email={this.state.email}
        password={this.state.password}
        setEmail={(value) =>
          this.setState({
            email: value,
            errors: {
              email: { error: false, message: "" },
              password: { error: false, message: "" },
            },
          })
        }
        setPassword={(value) =>
          this.setState({
            password: value,
            errors: {
              email: { error: false, message: "" },
              password: { error: false, message: "" },
            },
          })
        }
        login={(user) => this.handleLogin(user)}
        errors={this.state.errors}
        passwordError={this.state.errors.password}
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
    setAdmin: (is_admin) => dispatch({ type: "USER_ADMIN", value: is_admin }),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
