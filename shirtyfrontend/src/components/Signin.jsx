import React from "react";
import Joi from "joi-browser";
import { toast } from 'react-toastify';
import Form from "./common/Form";
import auth from "../services/authService";

class Signin extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  };

  doSubmit = async () => {
    try {
    await auth.signIn(this.state.data);

    // window.location = '/'
    this.props.settingUser(auth.getCurrentUser());
    toast.success('Sign In successfully.')
    this.props.history.replace('/');
    } catch(ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6 py-4">
            <h2 className="pt-4 text-muted">Sign in</h2>
            <h3 className="pt-3 pb-5 fs-5 text-muted">With your account:</h3>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Sign In")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
