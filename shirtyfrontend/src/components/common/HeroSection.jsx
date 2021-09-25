import React from "react";

function HeroSection({ logo, product, heroImage}) {
  return (
    <section className="hero">
      <div className="container-md">
        <div className="row">
          <div className="col-lg-5 order-1 order-lg-0 pt-lg-5">
            <h1 className="pt-lg-5 padding">
              Welcome to <span className="text-primary fs-1">{logo}</span>. <br />
              Buy amazing {product}.
            </h1>
            <p className="pt-5 pt-lg-5">
              Buy beautiful, amazing {product} with flexible <br />
              pricing with awesome quality.
            </p>
            <button className="btn btn-lg btn-primary">
              <a href="#allTshirts" className="text-white text-decoration-none">View all t-shirts</a>
            </button>
          </div>
          <div className="col-lg-7 py-5 order-0 order-lg-1">
            <img className="img-fluid" src={heroImage} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
