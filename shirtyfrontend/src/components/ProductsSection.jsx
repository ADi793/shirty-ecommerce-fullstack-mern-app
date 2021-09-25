import React, { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import ProductsCards from "./ProductsCards";

function ProductsSection(props) {
  const [products, setProducts] =  useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: products } = await getProducts(); 
      
      setProducts(products);
    }

    fetchData();
  }, [])

  return (
    <section className="t-shirts" id="allTshirts">
      <div className="container-md py-5">
        <header className="mt-5">
          <h3 className="text-muted">TOP CHOICES</h3>
          <h2>Popular this week</h2>
          <p className="text-muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, porro
            ab facere sunt inventore rerum?
          </p>
        </header>
        <ProductsCards products={products} />
      </div>
    </section>
  );
}

export default ProductsSection;
