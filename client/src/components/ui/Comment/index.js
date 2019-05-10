import React from "react";
import PropTypes from "prop-types";

import "./comment.css";

const Comment = ({
  comment: {
    user: { name },
    text
  }
}) => {
  return (
    <div className="my-1 border-bottom">
      <p className="m-0">{text}</p>
      <small className="font-weight-bold text-uppercase">{name}</small>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};

export default Comment;
