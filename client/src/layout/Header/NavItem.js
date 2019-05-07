import React from "react";
import { Link } from "react-router-dom";

export default function NavItem({ to, children }) {
  return (
    <Link to={to} className="text-light no-underline mx-3 my-2">
      {children}
    </Link>
  );
}
