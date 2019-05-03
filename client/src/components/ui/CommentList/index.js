import React from "react";
import Comment from "../Comment";

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

export default CommentList;
