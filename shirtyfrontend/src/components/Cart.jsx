import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import _ from "underscore";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  getCartProducts,
  deleteCartProduct,
  updateCartProduct,
} from "../services/cartService";
import { getProductImageUrl } from "../utils/image";
import PaymentCard from "./PaymentCard";

const promise = loadStripe(
  "pk_test_51JBzL3SFAGVxUoI4HMLxUv4jU1YB7BjJk5DrYZoVwDQbyAnFVa5YRpqmUUZuQAMqfgijlTjiRLEZunfvpSOMr9gx00UVYf6Ifo"
);

function Cart({ history, user }) {
  const [cartProducts, setCartProducts] = useState([]);
  const options = _.range(1, 100 + 1);

  useEffect(() => {
    setCartProducts(getCartProducts());
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    const updatedCartProducts = [...cartProducts];
    const index = input.getAttribute("data-index");

    updatedCartProducts[index] = { ...updatedCartProducts[index] };
    updatedCartProducts[index].quantity = input.value;

    setCartProducts(updatedCartProducts);
    updateCartProduct(updatedCartProducts[index]);
  };

  const handleDelete = (cartProduct) => {
    const filteredProducts = cartProducts.filter(
      (product) => product._id !== cartProduct._id
    );
    setCartProducts(filteredProducts);

    deleteCartProduct(cartProduct);
    toast.success("Product deleted from the cart.");
  };

  if (cartProducts.length === 0) {
    return (
      <div className="container-md">
        <h3 className="text-primary text-muted my-4">
          Haven't Found any items.
        </h3>
        <Link
          className="nav-link btn btn-primary text-white d-inline-block"
          to="/"
        >
          Add Products.
        </Link>
      </div>
    );
  }

  return (
    <div className="container-md">
      <div className="row my-4 special-container">
        <div className="col-lg-8">
          <h2>SHOPPING CART</h2>
          {cartProducts.map((cartProduct, index) => (
            <div key={index} className="row mt-4">
              <div className="col-lg-3">
                <img
                  src={getProductImageUrl(cartProduct._id)}
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-3">{cartProduct.name}</div>
              <div className="col-lg-2">{cartProduct.amount} Rs.</div>
              <div className="col-lg-2">
                <select
                  name="quantity"
                  value={cartProduct.quantity}
                  onChange={handleChange}
                  className="form-select bg-light"
                  data-index={index}
                >
                  {options.map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="col-lg-2">
                <button
                  className="btn"
                  onClick={() => handleDelete(cartProduct)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-4 py-5 py-lg-0">
          {user && (
            <Elements stripe={promise}>
              <PaymentCard cartProducts={cartProducts} history={history} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
