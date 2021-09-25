import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/Form";
import LinkButton from "./common/LinkButton";
import { getCategory, saveCategory } from "../services/categoryService";

class CategoryForm extends Form {
  state = {
    data: {
      name: "",
    },
    errors: {},
  };

  async componentDidMount() {
    try {
      const categoryId = this.props.match.params.id;
      if (categoryId === "new") return;

      const { data: category } = await getCategory(categoryId);

      this.setState({ data: category });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(5).max(255).required().label("Category"),
  };

  doSubmit = async () => {
    try {
      const { data: category } = this.state;

      await saveCategory(category);
      toast.success("Category is saved successfully.");
      this.props.history.push("/manage-categories");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = ex.response.data;
        this.setState({ errors });
        toast.success("An unexpected error occured.");
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6 py-4">
            <h2 className="pt-4 text-muted">Create a category here</h2>
            <h3 className="pt-3 pb-5 fs-5 text-muted letter-spacing">
              Add a new category for new tshirts:
            </h3>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("name", "Enter the category", "text", "true")}
              {this.renderButton("Save Category")}
            </form>
            <LinkButton
              label="Go back to Admin Dashboard"
              to="admindashboard"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryForm;
