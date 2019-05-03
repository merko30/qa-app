import React from "react";

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

export default Comment;
