import React from "react";

function Textarea({ name, value, label, onChange, error }) {
  return (
    <div className="form-floating mb-3">
      <textarea
        className="form-control"
        placeholder="Leave a comment here"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        style={{ height: "100px" }}
      ></textarea>
      <label htmlFor={name}>{label}</label>
      {error && (
        <div className="alert alert-danger border-0 bg-light">{error}</div>
      )}
    </div>
  );
}

export default Textarea;
