import React from "react";
import Comment from "../Comment";
import PropTypes from "prop-types";

import "./CommentList.css";

function CommentList({ comments }) {
  return (
    <div>
      {comments.map(comment => {
        return <Comment comment={comment} key={comment.id} />;
      })}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array
};

export default CommentList;
