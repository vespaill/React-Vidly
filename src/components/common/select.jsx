import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <select {...rest} id={name} className="form-control" name={name}>
      <option value="" />
      {options.map(option => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </select>
    {error && <div className="alert alert-danger">{error}</div>}
  </div>
);

export default Select;
