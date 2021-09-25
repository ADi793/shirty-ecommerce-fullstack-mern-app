import React from "react";
import { Link } from "react-router-dom";

function LinkButton({ label, to }) {
  return (
    <Link to={`/${to}`} className="btn btn-unique text-white my-5">
     {label}
    </Link>
  );
}

export default LinkButton;
