import React from "react";

function Select({ name, label, value, options, error, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        { label }
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-select bg-light"
        aria-label="Default select example"
      >
        <option value="">
          Select Categories...
        </option>
        {options.map((option) => (
          <option value={option._id}>{option.name}</option>
        ))}
      </select>
      {error && (
        <div className="alert alert-danger border-0 bg-light">{error}</div>
      )}
    </div>
  );
}

export default Select;
