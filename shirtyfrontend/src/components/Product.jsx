import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import _ from "underscore";
import { saveToCart } from "../services/cartService";
import { getProduct } from "../services/productService";
import { getProductImageUrl } from "../utils/image";

function Product({ match, history }) {
  const [product, setProduct] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(1);
  const options = _.range(1, 100 + 1);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: product } = await getProduct(match.params.id);
  
        setProduct(product);
        setTotalPrice(product.amount);
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          history.replace("/not-found");
        }
      }
    }

    fetchData();
  }, [history, match.params.id]);

  const handleChange = ({ currentTarget: input }) => {
    setTotalQuantity(input.value);
    setTotalPrice(input.value * product.amount);
  };

  const handleAddToCart = data => {
    const product = _.pick(data, ['_id', 'name', 'amount']);
    product.quantity = totalQuantity;
    saveToCart(product);
    toast.success('Product added to the cart.');
    history.push("/cart");
  }

  return (
    <div className="container-md">
      <div className="row my-4 special-container">
        <div className="col-lg-6 pe-lg-4">
          <img
            className="w-100 h-100"
            src={getProductImageUrl(product._id)}
            alt=""
          />
        </div>
        <div className="col-lg-6 pt-5">
          <div className="row">
            <div className="col-lg-6 text-muted">
              <h2 className="text-muted">{product.name}</h2>
              <hr />
              <h3>
                <span className="text-primary">Price</span>: {product.amount}Rs.
              </h3>
              <hr />
              <p>{product.description}</p>
            </div>
            <div className="col-lg-6 pe-lg-4">
              <ul className="list-group">
                <li className="list-group-item text-muted">
                  <div className="row">
                    <div className="col">
                      <span className="text-primary">Price:</span>
                    </div>
                    <div className="col">{totalPrice}</div>
                  </div>
                </li>
                <li className="list-group-item text-muted">
                  <div className="row">
                    <div className="col text-primary">Status:</div>
                    <div className="col">In Stock</div>
                  </div>
                </li>
                <li className="list-group-item text-muted">
                  <div className="row">
                    <div className="col text-primary">Qty</div>
                    <div className="col">
                      <select
                        name="quantity"
                        value={totalQuantity}
                        onChange={handleChange}
                        className="form-select bg-light"
                      >
                        {options.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </li>
                <li className="list-group-item text-muted">
                  <button onClick={() => handleAddToCart(product)} className="btn btn-primary w-100">ADD TO CART</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
