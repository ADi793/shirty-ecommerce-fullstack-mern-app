import React from "react";
import { Link } from "react-router-dom";
import { getProductImageUrl } from "../../utils/image";

function Card({ data, anchorText, onClick }) {
  return (
    <div
      className="w-100 my-4 my-lg-2 card border-0"
      style={{ width: "18rem" }}
    >
      <Link className="nav-link" to={`/product/${data._id}`}>
        <img
          src={getProductImageUrl(data._id)}
          className="card-img-top"
          alt="..."
        />
      </Link>

      <div className="card-body px-0 py-4">
        <h5 className="card-title fs-6 text-muted">{data.name}</h5>
        <h5 className="card-title fs-6 text-muted">Price: {data.amount}Rs.</h5>
        <p className="card-text fw-bold mb-1">{data.description}.</p>
        <a
          onClick={() => onClick(data)}
          style={{ background: "#1848a0" }}
          className="btn btn-unique text-white"
          href="#"
        >
          {anchorText}
        </a>
      </div>
    </div>
  );
}

export default Card;
