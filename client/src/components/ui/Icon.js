import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Icon({ icon, onClick }) {
  return (
    <span className="p-2" onClick={onClick} style={{ zIndex: 2 }}>
      <FontAwesomeIcon icon={icon} />
    </span>
  );
}
