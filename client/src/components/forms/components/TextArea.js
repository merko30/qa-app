import React from "react";

const TextField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div className="form-group my-2">
    <textarea type="text" className="form-control" {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <small className="text-danger text-uppercase text-weight-bold">
        {errors[field.name]}
      </small>
    )}
  </div>
);

export default TextField;
