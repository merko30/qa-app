import React from "react";

export default function FormWrapper({ children }) {
  return (
    <div className="row align-items-center">
      <div className="col-md-6 col-sm-12 mx-auto p-5" style={style}>{children}</div>
    </div>
  );
}

const style = {
    boxShadow: "1px 1px 4px 0px rgba(0,0,0,0.15)",
    background: "whitesmoke",
    borderRadius: "10px",
    padding: "4em 0"
}