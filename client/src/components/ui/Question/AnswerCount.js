import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

export default function AnswerCount({ answers }) {
  return (
    <div className="position-relative" style={{ fontSize: "3rem" }}>
      <FontAwesomeIcon icon={faComment} />
      <h6 className="position-absolute count-position">{answers.length}</h6>
    </div>
  );
}
