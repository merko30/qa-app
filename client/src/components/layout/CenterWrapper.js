import React from "react";

export default function CenterWrapper({ children }) {
  return (
    <div className="d-flex align-items-center justify-items-center">
      {children}
    </div>
  );
}
