import { Component } from "react";
import SignInView from "./components/SignIn";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return <SignInView />;
  }
}

export default SignIn;
