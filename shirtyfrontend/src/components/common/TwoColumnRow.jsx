import React from "react";

function TwoColumnRow({ label, value }) {
  return (
    <div className="row">
      <div className="col">{label}</div>
      <div className="col">{value}</div>
    </div>
  );
}

export default TwoColumnRow;
