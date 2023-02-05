import React, { Component } from "react";

import { get_user_cred } from "../../../api_calls/users"; 

class UserCards extends Component {
  state = {
    name: "",
    email: "",
    lastname: "",
    data: [],
    per: 1,
    page: 1,
    total_pages: null
  };

  uppercase = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  loadData = async () => {
    const { per, page, data, name, email, lastname} = this.state;
    const user_data=  await get_user_cred();
    console.log(user_data)
    const endpoint = `https://randomuser.me/api/?nat=us&results=${per}&page=${page}`;

    fetch(endpoint)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: [...data, ...json.results],
          name: user_data.first_name,
          email: user_data.email,
          lastname: user_data.last_name,
          scrolling: false,
          total_pages: json.info.results
        });
      });
  };


  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div className="clearfix">
        <div className="row">
          {this.state.data.map(data => (
            <div className="col-md-4 animated fadeIn" key={data.id.value}>
              <div className="card">
                <div className="card-body">
                  <div className="avatar">
                    <img
                      src={data.picture.large}
                      className="card-img-top"
                      alt=""
                    />
                  </div>
                  <h5 className="card-title">
                    {this.uppercase(this.state.name) +
                      " " +
                      this.uppercase(this.state.lastname)}
                  </h5>
                  <p className="card-text">
                    {"Email: " +
                      this.uppercase(this.state.email)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn btn-light btn-block w-50 mx-auto"
        >
          Logout
        </button>
      </div>
    );
  }
}

export default UserCards;
