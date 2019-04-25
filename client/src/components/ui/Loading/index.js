import React from "react";

import "./loading.css";

export default function Loading() {
  return (
    <div className="spinner">
      <div className="double-bounce1" />
      <div className="double-bounce2" />
    </div>
  );
}
