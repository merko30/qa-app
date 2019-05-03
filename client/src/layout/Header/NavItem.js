import React from "react";
import { Link } from "react-router-dom";

export default function NavItem({ to, children }) {
  return (
    <Link to={to} className="text-light no-underline m-2">
      {children}
    </Link>
  );
}
