import React from "react";

function Input({ name, label, value, onChange, error, type = "text", showParagraph = false }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-describedby="emailHelp"
      />
      {error && (
        <div className="alert alert-danger border-0 bg-light">{error}</div>
      )}
      {(type === "email" || showParagraph) && (
        <div id="emailHelp" className="form-text">
          We'll never share your detail with anyone else.
        </div>
      )}
    </div>
  );
}

export default Input;
