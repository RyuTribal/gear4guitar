import React, { Component } from "react";
import RegistrationView from "./components/Registration";

class Regitration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      name: "",
      errors: {},
    };
  }

  render() {
    return <RegistrationView />;
  }
}

export default Regitration;