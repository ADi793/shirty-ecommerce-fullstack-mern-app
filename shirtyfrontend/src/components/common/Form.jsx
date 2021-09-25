import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Textarea from "./Textarea";
import Select from "./Select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validateProperty = (input) => {
    const objValue = input.type === "file" ? input.files[0] : input.value;
    const obj = { [input.name]: objValue };
    const schema = { [input.name]: this.schema[input.name] };

    const { error } = Joi.validate(obj, schema);
    if (!error) return null;

    if (!(input.type === "file")) return error.details[0].message;
    return "Image is required.";
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    data[input.name] = input.type === "file" ? input.files[0] : input.value;

    this.setState({ data, errors });
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    const errors = {};
    for (let error of result.error.details) {
      if (!errors[error.path[0]]) {
        errors[error.path[0]] =
          error.path[0] === "image" ? "Image is required" : error.message;
      }
    }
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
      return;
    }

    this.doSubmit();
  };

  renderInput(name, label, type = "text", showParagraph = false) {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        type={type}
        showParagraph={showParagraph}
      />
    );
  }

  renderFileInput(name, label, type = "file", showParagraph = false) {
    const { errors } = this.state;

    return (
      <Input
        name={name}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        type={type}
        showParagraph={showParagraph}
      />
    );
  }

  renderTextarea(name, label) {
    const { data, errors } = this.state;

    return (
      <Textarea
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        options={options}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-unique text-white"
      >
        {label}
      </button>
    );
  }
}

export default Form;
