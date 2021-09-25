import React, { Component } from "react";
import ListGroupItemLink from "./common/ListGroupItemLink";
import auth from '../services/authService';

class AdminDashboard extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.setState({ user: auth.getCurrentUser() || {} })
  }
  

  render() {
    const { user } = this.state;

    return (
      <div className="container my-3">
        <h1 className="fw-normal letter-spacing text-muted">
          Welcome to <span className="text-primary">Admin</span> area.
        </h1>
        <h2 className="fs-4 fw-normal letter-spacing text-muted pt-2">
          Manage all of your <span className="text-primary">products</span> and
          <span className="text-primary">orders</span> here.
        </h2>
        <div className="row mt-5 text-muted">
          <div className="col-lg-8">
            <h2 className="letter-spacing fs-4 py-3">Account</h2>
            <p>
              <strong>Name:</strong>{user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          <div className="col-lg-4 my-4 my-lg-0">
            <div className="list-group bg-light">
              <div className="list-group-item border-0">
                <h2 className="letter-spacing fs-4 text-muted my-0 my-2">MANAGE</h2>
              </div>
              <ListGroupItemLink name="Create Categories" to="categories/new" />
              <ListGroupItemLink name="Manage Categories" to="manage-categories" />
              <ListGroupItemLink name="Create Product" to="products/new" />
              <ListGroupItemLink name="Manage Products" to="manage-products" />
              <ListGroupItemLink name="Manage Orders" to="manage-orders" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
