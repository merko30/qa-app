import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Icon({ icon, onClick }) {
  return (
    <span
      className="p-2"
      onClick={onClick}
      style={{ zIndex: 2 }}
      data-testid="icon"
    >
      <FontAwesomeIcon icon={icon} />
    </span>
  );
}

Icon.propTypes = {
  icon: PropTypes.any.isRequired,
  onClick: PropTypes.func
};

Icon.defaultProps = {
  onClick: () => {}
};
