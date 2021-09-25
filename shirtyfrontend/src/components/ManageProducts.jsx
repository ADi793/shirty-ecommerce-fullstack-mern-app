import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProduct, getProducts } from "../services/productService";
import { getProductImageUrl } from "../utils/image";

function ManageProducts(props) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const { data: savedProducts } = await getProducts();
  
      setProducts(savedProducts);
    }

    fetchData();
  }, []);

  const handleDelete = async (product) => {
    const originalProducts = products;

    try {
      const filteredProducts = originalProducts.filter(
        (originalProduct) => originalProduct._id !== product._id
      );
      setProducts(filteredProducts);

      await deleteProduct(product._id);
      toast.success("Product is deleted successfully.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      toast.error("An unexpected error occured!");
      setProducts(originalProducts);
    }
  };

  return (
    <div className="container my-3 height-sixty">
      <h1 className="fw-normal letter-spacing">
        <span className="color-unique">Products</span>.
      </h1>
      {products.map((product) => (
        <React.Fragment key={product._id}>
          <div className="row mt-5 text-muted">
            <div className="col-md-2">
              <img
                src={getProductImageUrl(product._id)}
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-md-4">
              <h4 className="fw-normal">{product.name}</h4>
            </div>
            <div className="col-md-3">
              <Link
                to={`products/${product._id}`}
                className="btn btn-unique text-white"
              >
                Update Product
              </Link>
            </div>
            <div className="col-md-3">
              <button className="btn" onClick={() => handleDelete(product)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
}

export default ManageProducts;
