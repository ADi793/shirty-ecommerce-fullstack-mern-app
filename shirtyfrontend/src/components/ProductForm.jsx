import React from "react";
import Joi from "joi-browser";
import { toast } from 'react-toastify';
import Form from "./common/Form";
import LinkButton from "./common/LinkButton";
import { getProduct, saveProduct } from "../services/productService";
import { getCategories } from "../services/categoryService";

class ProductForm extends Form {
  state = {
    data: {
      name: "",
      image: "",
      description: "",
      amount: "",
      categoryId: "",
      stock: "",
    },
    categories: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(5).max(55).required(),
    image: Joi.object().required(),
    description: Joi.string().min(5).max(2048).required(),
    amount: Joi.number().min(0).required(),
    categoryId: Joi.string().required(),
    stock: Joi.number().min(0).required(),
  };

  async componentDidMount() {
    const { data: savedCategories } = await getCategories();
    console.log(savedCategories)
    this.setState({ categories: savedCategories });

    try {
      const productId = this.props.match.params.id;
      if (productId === "new") return;

      const { data: product } = await getProduct(productId);
      this.setState({ data: this.mapToViewModel(product) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
    
  }

  mapToViewModel(product) {
    return {
      _id: product._id,
      name: product.name,
      image: "",
      description: product.description,
      amount: product.amount,
      categoryId: product.category._id,
      stock: product.stock,
    };
  }

  doSubmit = async () => {
    let product = new FormData();

    for (let key in this.state.data) {
      product.set(key, this.state.data[key]);
    }

    await saveProduct(product);
    toast.success('Product saved successfuly.')
    window.location = '/manage-products';
    // this.props.history.replace('/manage-products');
  };

  render() {
    const { categories } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6 py-4">
            <h2 className="pt-4 text-muted">Create a product here</h2>
            <h3 className="pt-3 pb-5 fs-5 text-muted letter-spacing">
              Add a new product for amazing users:
            </h3>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("name", "Name", "text", "true")}
              {this.renderFileInput("image", "Product Image")}
              {this.renderTextarea("description", "Description")}
              {this.renderInput("amount", "Amount")}
              {this.renderSelect("categoryId", "Category", categories)}
              {this.renderInput("stock", "Stock")}
              {this.renderButton("Save Product")}
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

export default ProductForm;
