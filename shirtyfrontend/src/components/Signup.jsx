import React from "react";
import Joi from "joi-browser";
import { toast } from 'react-toastify';
import Form from "./common/Form";
import { signUp } from "../services/signup";

class Signup extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  };

  doSubmit = async () => {
    try {
      await signUp(this.state.data);
      toast.success('Signup successfully.');
      this.props.history.replace('/signin');
    } catch (ex) {
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
            <h2 className="py-4 text-muted">No account? Sign up</h2>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("name", "Name")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Sign Up")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
