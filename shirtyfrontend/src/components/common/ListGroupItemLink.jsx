import React from "react";
import { Link } from "react-router-dom";

function ListGroupItemLink({ name, to }) {
  return (
    <div className="list-group-item border-0">
      <Link to={`/${to}`} className="text-primary">
        {name}
      </Link>
    </div>
  );
}

export default ListGroupItemLink;
