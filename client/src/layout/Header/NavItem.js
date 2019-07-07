import React from "react";
import { Link } from "react-router-dom";

export default function NavItem({ to, children }) {
  return (
    <Link to={to} className="no-underline mx-3 my-2" style={{ color: "#333"}}>
      {children}
    </Link>
  );
}
