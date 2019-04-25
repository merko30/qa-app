import React from "react";

export default function FormWrapper({ children }) {
  return (
    <div className="row mt-4">
      <div className="col-md-8 col-xs-12 mx-auto">{children}</div>
    </div>
  );
}
