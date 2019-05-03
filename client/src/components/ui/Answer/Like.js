import React from "react";
import Icon from "../../Icon";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

export default function Like({ loggedIn, onLike, onDislike, answer }) {
  const userID = parseInt(localStorage.getItem("userId"));
  const userLiked =
    loggedIn && answer.likes.filter(like => like.userId === userID).length > 0;
  return (
    <div className="d-flex align-items-center">
      {!userLiked ? (
        <Icon icon={faThumbsUp} onClick={onLike} />
      ) : (
        <Icon icon={faThumbsDown} onClick={onDislike} />
      )}
      <small className="text-muted d-inline mb-1">
        {answer.likes.length > 0
          ? answer.likes.length === 1
            ? "One person likes this answer"
            : `${answer.likes.length} people like this answer`
          : "Do you find this answer helpful ?"}
      </small>
    </div>
  );
}
