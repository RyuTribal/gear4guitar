import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../components/routes";
import { Box, Typography } from "@mui/material";
import Search from "./components/Search";
import { getStatus, getOrder, updateOrder } from "../../api_calls/users";
import OrderDetails from "./components/OrderDetails";

class EditOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      is_loading: false,
      error: null,
      status_list: [],
      og_status: "",
    };
  }
  componentDidMount = async () => {
    if (!this.props.isAdmin) {
      return this.props.router.navigate("/");
    }

    let status_res = await getStatus();
    if (status_res.status === 200) {
      let status_list = [];
      status_res.data.map((status) => status_list.push(status.unnest));
      this.setState({ status_list: status_list });
    }
  };

  searchOrders = async (query) => {
    this.setState({ is_loading: true });
    let res = await getOrder(query);
    if (res.status === 200) {
      this.setState({
        order: res.data[0],
        is_loading: false,
        og_status: res.data[0].status,
      });
    } else {
      this.setState({ order: null, is_loading: false });
      this.props.openAlert("error", "Order not found");
    }
  };

  saveOrder = async () => {
    this.setState({ is_loading: true });
    let order = this.state.order;
    order.og_status = this.state.og_status;
    let update_res = await updateOrder(this.state.order.id, order);
    if (update_res.status === 200) {
      this.props.showSnackBar({severity: "success", message: "Order updated"});
      this.setState({ is_loading: false, order: null });
    } else {
      this.props.showSnackBar({severity: "error", message: "Something went wrong"});
      this.setState({ is_loading: false });
    }
  };

  render() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "background.paper",
          alignItems: "center",
          padding: "50px 10px",
          minHeight: "100vh",
          gap: "20px",
        }}
      >
        <Box sx={{ maxWidth: "600px", width: "100%" }}>
          <Typography
            sx={{ width: "100%", textAlign: "center" }}
            variant="h4"
            component="h1"
            gutterBottom
          >
            Change order details
          </Typography>
          <Search search={(query) => this.searchOrders(query)} />
          <OrderDetails
            order={this.state.order}
            status_list={this.state.status_list}
            is_loading={this.state.is_loading}
            changeValue={(value, field) => {
              let order = this.state.order;
              order[field] = value;
              this.setState({ order: order });
            }}
            saveChanges={() => this.saveOrder()}
          />
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.jwtReducer.jwt_token,
    basket: state.basketReducer.basket,
    isAdmin: state.jwtReducer.isAdmin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToken: (token) => dispatch({ type: "JWT_ADD", value: token }),
    removeToken: () => dispatch({ type: "JWT_REMOVE" }),
    userAdmin: (is_admin) => dispatch({ type: "IS_ADMIN", value: is_admin }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditOrders)
);
