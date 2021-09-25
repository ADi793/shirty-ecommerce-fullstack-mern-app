import React from "react";
import HeroSection from "./common/HeroSection";
import ProductsSection from "./ProductsSection";

function Home(props) {
  return (
    <React.Fragment>
      <HeroSection logo="Shirtly" product="t-shirts" heroImage="hero-img.svg" />
      <ProductsSection />
    </React.Fragment>
  );
}

export default Home;
