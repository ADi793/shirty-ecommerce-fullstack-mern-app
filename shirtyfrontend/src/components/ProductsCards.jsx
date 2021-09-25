import React from "react";
import _ from 'underscore';
import { toast } from 'react-toastify';
import { saveToCart } from "../services/cartService";
import Card from "./common/Card";

function ProductsCards({ products }) {

  const handleAddToCart = data => {
    const product = _.pick(data, ['_id', 'name', 'amount']);
    saveToCart(product);
    toast.success('Product added to the cart');
  }

  return (
    <div className="cards row py-5">
      {products.map((product) => (
        <div key={product._id} className="col-md-6 col-lg-4">
          <Card
            data={product}
            anchorText="Add to cart"
            onClick={handleAddToCart}
          />
        </div>
      ))}
    </div>
  );
}

export default ProductsCards;
